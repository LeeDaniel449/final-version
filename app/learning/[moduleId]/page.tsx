"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react"
import { getLessonContent, getModuleById, type LessonContent } from "@/lib/learning-data"
import { userDataManager } from "@/lib/user-data"

export default function ModulePage() {
  const params = useParams()
  const router = useRouter()
  const moduleId = params.moduleId as string

  const [currentLesson, setCurrentLesson] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<number[]>([])
  const [showQuiz, setShowQuiz] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [showExplanation, setShowExplanation] = useState(false)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const module = getModuleById(moduleId)
  const lessonContent = getLessonContent(moduleId, currentLesson)

  // Load initial progress from storage ONCE when the component mounts.
  useEffect(() => {
    console.log(`🔄 Loading initial progress for module: ${moduleId}`)
    const savedProgress = userDataManager.getModuleLessonProgress(moduleId)
    setCompletedLessons([...savedProgress.completedLessons])
    setCurrentLesson(savedProgress.currentLesson)
  }, [moduleId])

  // Function to persist the current state to the user data manager.
  const persistProgress = (lessonIdx: number, completed: number[]) => {
    console.log(`💾 Persisting progress: lesson ${lessonIdx}, completed: [${completed.join(", ")}]`)
    // This assumes updateLessonProgress can handle the full state.
    // A better API would be saveModuleProgress(moduleId, { currentLesson, completedLessons })
    // But working with the existing API:
    userDataManager.updateLessonProgress(moduleId, lessonIdx, completed.includes(lessonIdx))

    // We also need to ensure any newly completed lessons are saved.
    completed.forEach((completedIndex) => {
      userDataManager.updateLessonProgress(moduleId, completedIndex, true)
    })

    // Set current lesson position
    userDataManager.updateLessonProgress(moduleId, lessonIdx, completed.includes(lessonIdx))

    // Dispatch events for other components
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("progressUpdated"))
    }
  }

  // Centralized navigation logic that ONLY updates state. Persistence is handled separately.
  const navigateToLesson = (lessonIndex: number) => {
    console.log(`🎯 Navigating to lesson ${lessonIndex}`)
    setShowQuiz(false)
    setSelectedAnswer("")
    setShowExplanation(false)
    setQuizCompleted(false)

    setCurrentLesson(lessonIndex)
    persistProgress(lessonIndex, completedLessons)
  }

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      navigateToLesson(currentLesson - 1)
    }
  }

  const handleNextLesson = () => {
    if (module && currentLesson < module.lessons - 1) {
      navigateToLesson(currentLesson + 1)
    } else {
      console.log(`🏁 Module completed`)
      const progress = userDataManager.getUserProgress()
      if (progress.modules && progress.modules[moduleId]) {
        progress.modules[moduleId].completed = true
        userDataManager.saveUserProgress(progress)
      }
      router.push("/learning")
    }
  }

  const handleLessonComplete = () => {
    console.log(`✅ Completing lesson ${currentLesson}`)

    // If there's a quiz and it hasn't been completed, show it first
    if (lessonContent?.quiz && !quizCompleted) {
      setShowQuiz(true)
      return
    }

    // Mark lesson as completed
    let updatedCompletedLessons = [...completedLessons]
    if (!completedLessons.includes(currentLesson)) {
      updatedCompletedLessons = [...completedLessons, currentLesson].sort((a, b) => a - b)
      setCompletedLessons(updatedCompletedLessons)
    }

    persistProgress(currentLesson, updatedCompletedLessons)
    handleNextLesson()
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true)

    // Mark lesson as completed after quiz
    let updatedCompletedLessons = [...completedLessons]
    if (!completedLessons.includes(currentLesson)) {
      updatedCompletedLessons = [...completedLessons, currentLesson].sort((a, b) => a - b)
      setCompletedLessons(updatedCompletedLessons)
    }

    persistProgress(currentLesson, updatedCompletedLessons)

    // Reset quiz state
    setShowExplanation(false)
    setSelectedAnswer("")
    setShowQuiz(false)

    handleNextLesson()
  }

  const renderContent = (content: LessonContent["content"]) => {
    return content.map((item, index) => {
      switch (item.type) {
        case "heading":
          return (
            <h2 key={index} className="text-2xl font-bold text-gray-900 mb-4">
              {item.content}
            </h2>
          )
        case "paragraph":
          return (
            <p key={index} className="text-gray-700 mb-4 leading-relaxed">
              {item.content}
            </p>
          )
        case "list":
          return (
            <div key={index} className="mb-4">
              <p className="text-gray-700 mb-2 font-medium">{item.content}</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                {item.items?.map((listItem, listIndex) => (
                  <li key={listIndex} className="text-gray-600">
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>
          )
        case "example":
          return (
            <div key={index} className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
              <div className="flex items-start">
                <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-blue-800 text-sm">
                  <strong>Example:</strong> {item.content}
                </p>
              </div>
            </div>
          )
        case "tip":
          return (
            <div key={index} className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
              <div className="flex items-start">
                <Target className="h-5 w-5 text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-green-800 text-sm">
                  <strong>Tip:</strong> {item.content}
                </p>
              </div>
            </div>
          )
        default:
          return null
      }
    })
  }

  if (!module || !lessonContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Module not found</h1>
          <Button onClick={() => router.push("/learning")}>Back to Learning</Button>
        </div>
      </div>
    )
  }

  const progressPercentage = ((currentLesson + 1) / module.lessons) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => router.push("/learning")} className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Learning
            </Button>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              {lessonContent.points} points
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{module.title}</h1>
              <p className="text-gray-600">
                Lesson {currentLesson + 1} of {module.lessons}: {lessonContent.title}
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              {lessonContent.duration}
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}% complete</span>
            </div>
            <Progress
              value={progressPercentage}
              className="h-2 bg-blue-100 [&>div]:bg-blue-600 [&>div]:transition-all [&>div]:duration-500"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {lessonContent.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="lesson" className="w-full">
                  <TabsList className="grid w-full grid-cols-1">
                    <TabsTrigger value="lesson">Lesson Content</TabsTrigger>
                  </TabsList>

                  <TabsContent value="lesson" className="mt-6">
                    <div className="prose max-w-none">{renderContent(lessonContent.content)}</div>

                    {lessonContent.keyTakeaways && (
                      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5" />
                          Key Takeaways
                        </h3>
                        <ul className="space-y-2">
                          {lessonContent.keyTakeaways.map((takeaway, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{takeaway}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>

                {showQuiz && lessonContent.quiz && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-300 shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Award className="h-6 w-6 text-blue-600" />
                      <h3 className="text-xl font-bold text-blue-900">Knowledge Check Required</h3>
                    </div>
                    <p className="text-blue-700 mb-6 text-sm">
                      Complete this quiz to proceed to the next lesson and earn your points!
                    </p>
                    <div className="space-y-4 bg-white p-6 rounded-lg">
                      <p className="text-gray-900 font-semibold text-lg">{lessonContent.quiz.questions[0].question}</p>
                      <div className="space-y-3">
                        {lessonContent.quiz.questions[0].options.map((option, index) => (
                          <label
                            key={index}
                            className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                              selectedAnswer === option
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="quiz-answer"
                              value={option}
                              checked={selectedAnswer === option}
                              onChange={(e) => setSelectedAnswer(e.target.value)}
                              className="w-4 h-4 text-blue-600"
                              disabled={showExplanation}
                            />
                            <span className="text-gray-800 font-medium">{option}</span>
                          </label>
                        ))}
                      </div>

                      {!showExplanation && (
                        <Button
                          onClick={() => setShowExplanation(true)}
                          disabled={!selectedAnswer}
                          className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                          size="lg"
                        >
                          Submit Answer
                        </Button>
                      )}

                      {showExplanation && (
                        <div
                          className={`mt-4 p-6 rounded-lg border-2 ${
                            selectedAnswer === lessonContent.quiz.questions[0].correctAnswer
                              ? "bg-green-50 border-green-300"
                              : "bg-amber-50 border-amber-300"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-3">
                            {selectedAnswer === lessonContent.quiz.questions[0].correctAnswer ? (
                              <>
                                <CheckCircle className="h-6 w-6 text-green-600" />
                                <span className="font-bold text-green-900 text-lg">Correct! Well done! 🎉</span>
                              </>
                            ) : (
                              <>
                                <div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center">
                                  <span className="text-white text-sm font-bold">✗</span>
                                </div>
                                <span className="font-bold text-amber-900 text-lg">Not quite right</span>
                              </>
                            )}
                          </div>
                          <p className="text-gray-800 mb-4">{lessonContent.quiz.questions[0].explanation}</p>
                          {selectedAnswer !== lessonContent.quiz.questions[0].correctAnswer && (
                            <p className="text-sm text-gray-700 mb-4">
                              <strong>Correct answer:</strong> {lessonContent.quiz.questions[0].correctAnswer}
                            </p>
                          )}
                          <Button
                            onClick={handleQuizComplete}
                            className="w-full bg-green-600 hover:bg-green-700"
                            size="lg"
                          >
                            Continue to Next Lesson
                            <ChevronRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!showQuiz && (
                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={handlePreviousLesson}
                      disabled={currentLesson === 0}
                      className="flex items-center gap-2 bg-transparent"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>

                    <Button
                      onClick={handleLessonComplete}
                      className={`flex items-center gap-2 transition-all duration-300 ${
                        completedLessons.includes(currentLesson)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                      size="lg"
                    >
                      {completedLessons.includes(currentLesson) ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Completed ✓
                        </>
                      ) : lessonContent?.quiz ? (
                        <>
                          Take Quiz
                          <Award className="h-4 w-4" />
                        </>
                      ) : (
                        <>
                          Complete Lesson
                          <ChevronRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Module Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({ length: module.lessons }, (_, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        index === currentLesson
                          ? "bg-blue-100 border border-blue-200 shadow-sm"
                          : completedLessons.includes(index)
                            ? "bg-green-50 border border-green-200"
                            : "hover:bg-gray-50"
                      }`}
                      onClick={() => navigateToLesson(index)}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 ${
                          completedLessons.includes(index)
                            ? "bg-green-500 text-white shadow-md"
                            : index === currentLesson
                              ? "bg-blue-500 text-white shadow-md animate-pulse"
                              : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {completedLessons.includes(index) ? <CheckCircle className="h-4 w-4" /> : index + 1}
                      </div>
                      <span
                        className={`text-sm transition-colors duration-300 ${
                          index === currentLesson ? "font-medium text-blue-900" : "text-gray-700"
                        }`}
                      >
                        Lesson {index + 1}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {completedLessons.length}/{module.lessons}
                    </div>
                    <div className="text-sm text-gray-600">Lessons Completed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
