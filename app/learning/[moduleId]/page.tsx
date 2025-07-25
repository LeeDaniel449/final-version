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

  // Load initial progress
  useEffect(() => {
    console.log(`🔄 Loading progress for module: ${moduleId}`)
    const savedProgress = userDataManager.getModuleLessonProgress(moduleId)
    console.log(`📊 Loaded progress:`, savedProgress)
    setCompletedLessons([...savedProgress.completedLessons])
    setCurrentLesson(savedProgress.currentLesson)
  }, [moduleId])

  const saveProgress = (lessonIndex: number, isCompleted: boolean) => {
    console.log(`💾 Saving progress: lesson ${lessonIndex}, completed: ${isCompleted}`)

    // Update progress through userDataManager
    userDataManager.updateLessonProgress(moduleId, lessonIndex, isCompleted)

    // Update local state immediately for responsive UI
    const updatedProgress = userDataManager.getModuleLessonProgress(moduleId)
    setCompletedLessons([...updatedProgress.completedLessons])
    setCurrentLesson(updatedProgress.currentLesson)

    // Dispatch multiple events to ensure dashboard updates
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("lessonCompleted", {
          detail: { moduleId, lessonIndex, isCompleted },
        }),
      )

      window.dispatchEvent(
        new CustomEvent("progressUpdated", {
          detail: { moduleId, lessonIndex, isCompleted },
        }),
      )

      // Also dispatch a storage event to trigger updates
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "wealthwise_user_progress",
          newValue: JSON.stringify(userDataManager.getUserProgress()),
        }),
      )
    }
  }

  const handleLessonComplete = () => {
    console.log(`✅ Completing lesson ${currentLesson}`)

    // Mark lesson as completed immediately in local state
    const newCompletedLessons = [...completedLessons]
    if (!newCompletedLessons.includes(currentLesson)) {
      newCompletedLessons.push(currentLesson)
      newCompletedLessons.sort((a, b) => a - b)
      setCompletedLessons(newCompletedLessons)
    }

    // Save progress to persistent storage
    saveProgress(currentLesson, true)

    if (lessonContent?.quiz && !quizCompleted) {
      setShowQuiz(true)
    } else {
      handleNextLesson()
    }
  }

  const handleNextLesson = () => {
    if (module && currentLesson < module.lessons - 1) {
      const nextLesson = currentLesson + 1
      console.log(`➡️ Moving to next lesson: ${nextLesson}`)

      setCurrentLesson(nextLesson)
      setShowQuiz(false)
      setSelectedAnswer("")
      setShowExplanation(false)
      setQuizCompleted(false)

      // Save current lesson progress (position, not completed)
      saveProgress(nextLesson, false)
    } else {
      console.log(`🏁 Module completed`)
      // Module completed - mark the module as completed
      const progress = userDataManager.getUserProgress()
      if (progress.modules && progress.modules[moduleId]) {
        progress.modules[moduleId].completed = true
        userDataManager.saveUserProgress(progress)
      }
      router.push("/learning")
    }
  }

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      const prevLesson = currentLesson - 1
      console.log(`⬅️ Moving to previous lesson: ${prevLesson}`)
      setCurrentLesson(prevLesson)
      setShowQuiz(false)
      setSelectedAnswer("")
      setShowExplanation(false)
      setQuizCompleted(false)

      // Save current lesson progress (not completed, just current position)
      saveProgress(prevLesson, false)
    }
  }

  const handleQuizComplete = () => {
    setQuizCompleted(true)
    setShowExplanation(false)
    setSelectedAnswer("")
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
            <Button
              variant="ghost"
              onClick={() => {
                // Save current lesson progress before leaving
                saveProgress(currentLesson, completedLessons.includes(currentLesson))
                router.push("/learning")
              }}
              className="flex items-center gap-2"
            >
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

                {/* Quiz Section */}
                {showQuiz && lessonContent.quiz && (
                  <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Knowledge Check</h3>
                    <div className="space-y-4">
                      <p className="text-blue-800 font-medium">{lessonContent.quiz.questions[0].question}</p>
                      <div className="space-y-2">
                        {lessonContent.quiz.questions[0].options.map((option, index) => (
                          <label key={index} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name="quiz-answer"
                              value={option}
                              checked={selectedAnswer === option}
                              onChange={(e) => setSelectedAnswer(e.target.value)}
                              className="text-blue-600"
                            />
                            <span className="text-blue-800">{option}</span>
                          </label>
                        ))}
                      </div>

                      {!showExplanation && (
                        <Button onClick={() => setShowExplanation(true)} disabled={!selectedAnswer} className="mt-4">
                          Submit Answer
                        </Button>
                      )}

                      {showExplanation && (
                        <div className="mt-4 p-4 bg-white rounded border">
                          <div className="flex items-center gap-2 mb-2">
                            {selectedAnswer === lessonContent.quiz.questions[0].correctAnswer ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <div className="h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
                                <span className="text-white text-xs">✗</span>
                              </div>
                            )}
                            <span className="font-medium">
                              {selectedAnswer === lessonContent.quiz.questions[0].correctAnswer
                                ? "Correct!"
                                : "Not quite right"}
                            </span>
                          </div>
                          <p className="text-gray-700 text-sm">{lessonContent.quiz.questions[0].explanation}</p>
                          <Button onClick={handleQuizComplete} className="mt-4">
                            Continue
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation */}
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

                  {!showQuiz && (
                    <Button
                      onClick={handleLessonComplete}
                      className={`flex items-center gap-2 transition-all duration-300 ${
                        completedLessons.includes(currentLesson)
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {completedLessons.includes(currentLesson) ? (
                        <>
                          <CheckCircle className="h-4 w-4" />
                          Lesson Completed ✓
                        </>
                      ) : (
                        <>
                          Complete Lesson
                          <ChevronRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
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
                      onClick={() => {
                        console.log(`🎯 Navigating to lesson ${index}`)
                        setCurrentLesson(index)
                        // Save progress when navigating to a lesson
                        saveProgress(index, completedLessons.includes(index))
                      }}
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
