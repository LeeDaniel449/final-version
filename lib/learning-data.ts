export interface LessonContent {
  title: string
  duration: string
  points: number
  videoUrl?: string
  content: Array<{
    type: "heading" | "paragraph" | "list" | "example" | "tip" | "chart" | "case-study" | "calculation" | "warning"
    content: string
    items?: string[]
    formula?: string
    variables?: Record<string, string>
  }>
  keyTakeaways?: string[]
  quiz?: {
    questions: Array<{
      question: string
      options: string[]
      correctAnswer: string
      explanation: string
    }>
  }
  practiceExercise?: {
    title: string
    scenario: string
    questions: Array<{
      question: string
      type: "input" | "select" | "calculate"
      options?: string[]
      correctAnswer: string | number
      explanation: string
    }>
  }
}

export interface LearningModule {
  id: string
  title: string
  description: string
  duration: string
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  progress: number
  lessons: number
  points: number
  icon: any
  color: string
  completed: boolean
  category: string
  prerequisites?: string[]
}

export const learningModules: LearningModule[] = [
  {
    id: "basics",
    title: "Money Management Basics",
    description: "Learn the fundamentals of managing your money and building good financial habits",
    duration: "45 min",
    difficulty: "Beginner",
    progress: 0,
    lessons: 8,
    points: 120,
    icon: null,
    color: "bg-blue-500",
    completed: false,
    category: "Fundamentals",
  },
  {
    id: "budgeting",
    title: "Budgeting Mastery",
    description: "Create and manage budgets that actually work for your lifestyle and goals",
    duration: "55 min",
    difficulty: "Beginner",
    progress: 0,
    lessons: 9,
    points: 135,
    icon: null,
    color: "bg-green-500",
    completed: false,
    category: "Fundamentals",
  },
  {
    id: "saving-emergency-funds",
    title: "Saving & Emergency Funds",
    description: "Master the art of saving money and building financial security through emergency funds",
    duration: "50 min",
    difficulty: "Beginner",
    progress: 0,
    lessons: 8,
    points: 120,
    icon: null,
    color: "bg-purple-500",
    completed: false,
    category: "Fundamentals",
  },
  {
    id: "credit-scores",
    title: "Credit Scores & Reports",
    description: "Understand credit scores, improve your credit, and leverage credit responsibly",
    duration: "40 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 7,
    points: 105,
    icon: null,
    color: "bg-indigo-500",
    completed: false,
    category: "Credit & Debt",
  },
  {
    id: "debt-management",
    title: "Debt Management & Payoff",
    description: "Learn proven strategies to pay off debt faster and avoid future debt traps",
    duration: "60 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 10,
    points: 150,
    icon: null,
    color: "bg-red-500",
    completed: false,
    category: "Credit & Debt",
  },
  {
    id: "loans",
    title: "Loans (Auto, Student, Personal)",
    description: "Navigate different types of loans and make smart borrowing decisions",
    duration: "45 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 8,
    points: 120,
    icon: null,
    color: "bg-orange-500",
    completed: false,
    category: "Credit & Debt",
  },
  {
    id: "mortgages",
    title: "Mortgages & Home Buying",
    description: "Everything you need to know about mortgages and the home buying process",
    duration: "70 min",
    difficulty: "Advanced",
    progress: 0,
    lessons: 12,
    points: 180,
    icon: null,
    color: "bg-teal-500",
    completed: false,
    category: "Major Purchases",
  },
  {
    id: "investing",
    title: "Investment Fundamentals",
    description: "Build wealth through smart investing with index funds and diversification",
    duration: "65 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 11,
    points: 165,
    icon: null,
    color: "bg-indigo-600",
    completed: false,
    category: "Investing",
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning (401k, IRA, Roth IRA)",
    description: "Secure your financial future with comprehensive retirement planning strategies",
    duration: "80 min",
    difficulty: "Advanced",
    progress: 0,
    lessons: 14,
    points: 210,
    icon: null,
    color: "bg-emerald-600",
    completed: false,
    category: "Retirement",
  },
  {
    id: "hsa",
    title: "Health Savings Accounts (HSA)",
    description: "Maximize the triple tax advantage of HSAs for healthcare and retirement",
    duration: "30 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 6,
    points: 90,
    icon: null,
    color: "bg-cyan-500",
    completed: false,
    category: "Tax-Advantaged Accounts",
  },
  {
    id: "insurance",
    title: "Insurance (Life, Health, Auto, Home)",
    description: "Protect your wealth and family with the right insurance coverage",
    duration: "55 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 9,
    points: 135,
    icon: null,
    color: "bg-slate-600",
    completed: false,
    category: "Protection",
  },
  {
    id: "taxes",
    title: "Tax Planning & Filing",
    description: "Navigate the tax system, maximize deductions, and plan for tax efficiency",
    duration: "60 min",
    difficulty: "Advanced",
    progress: 0,
    lessons: 10,
    points: 150,
    icon: null,
    color: "bg-amber-600",
    completed: false,
    category: "Tax Planning",
  },
  {
    id: "estate-planning",
    title: "Estate Planning Basics",
    description: "Protect your legacy and ensure your wishes are carried out",
    duration: "45 min",
    difficulty: "Advanced",
    progress: 0,
    lessons: 8,
    points: 120,
    icon: null,
    color: "bg-stone-600",
    completed: false,
    category: "Advanced Planning",
  },
  {
    id: "financial-advisors",
    title: "Working with Financial Advisors",
    description: "Learn when and how to work with financial professionals",
    duration: "35 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 6,
    points: 90,
    icon: null,
    color: "bg-violet-600",
    completed: false,
    category: "Professional Help",
  },
  {
    id: "sustainable-impact-investing",
    title: "Sustainable & Impact Investing",
    description: "Align your investments with your values while building wealth responsibly",
    duration: "40 min",
    difficulty: "Advanced",
    progress: 0,
    lessons: 7,
    points: 105,
    icon: null,
    color: "bg-emerald-700",
    completed: false,
    category: "Advanced Investing",
  },
]

export function getModuleById(moduleId: string): LearningModule | null {
  return learningModules.find((module) => module.id === moduleId) || null
}

export function getLessonContent(moduleId: string, lessonIndex: number): LessonContent | null {
  const lessons: Record<string, LessonContent[]> = {
    "basics": [
      {
        title: "Introduction to Personal Finance",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Your Financial Journey Starts Here",
          },
          {
            type: "paragraph",
            content:
              "Personal finance is about managing your money to achieve your life goals. Whether you want to buy a home, start a business, or retire comfortably, understanding the basics of money management is your first step toward financial success.",
          },
          {
            type: "list",
            content: "Core areas of personal finance:",
            items: [
              "Budgeting: Planning how to spend your money",
              "Saving: Setting aside money for future needs",
              "Investing: Growing your wealth over time",
              "Insurance: Protecting against financial risks",
              "Debt management: Handling borrowed money responsibly",
              "Tax planning: Minimizing what you owe to the government",
            ],
          },
          {
            type: "tip",
            content:
              "Start with small, manageable changes to your financial habits. Even saving $25 per week can add up to over $1,300 in a year!",
          },
        ],
        keyTakeaways: [
          "Personal finance covers budgeting, saving, investing, and more",
          "Small changes in financial habits can have big impacts over time",
          "Everyone can improve their financial situation with the right knowledge",
          "The earlier you start, the more time your money has to grow",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most important first step in personal finance?",
              options: [
                "Investing in stocks",
                "Creating a budget",
                "Buying insurance",
                "Getting a credit card",
              ],
              correctAnswer: "Creating a budget",
              explanation:
                "Creating a budget is the foundation of personal finance because it helps you understand where your money goes and allows you to make informed decisions about spending and saving.",
            },
          ],
        },
      },
    ],
    "loans": [
      {
        title: "Understanding Loans: An Overview",
        duration: "7 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "The Basics of Borrowing",
          },
          {
            type: "paragraph",
            content:
              "Loans are a fundamental part of the financial landscape, enabling individuals and businesses to make large purchases or investments they couldn't otherwise afford. Understanding the mechanics of loans, including interest rates, terms, and fees, is crucial for making informed borrowing decisions.",
          },
          {
            type: "list",
            content: "Key loan components:",
            items: [
              "Principal: The original amount borrowed",
              "Interest rate: The cost of borrowing, expressed as APR",
              "Loan term: The length of time to repay the loan",
              "Fees: Origination, late payment, prepayment penalties",
              "Collateral: Assets securing the loan (for secured loans)",
              "Monthly payment: Regular payment amount due",
            ],
          },
          {
            type: "calculation",
            content: "Monthly payment calculation:",
            formula: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
            variables: {
              "M": "Monthly payment",
              "P": "Principal loan amount",
              "r": "Monthly interest rate (annual rate ÷ 12)",
              "n": "Total number of payments",
            },
          },
          {
            type: "example",
            content:
              "Loan Example: $20,000 auto loan at 6% APR for 5 years. Monthly payment = $386.66. Total paid = $23,199.43. Total interest = $3,199.43.",
          },
          {
            type: "tip",
            content:
              "Always compare the Annual Percentage Rate (APR) when shopping for loans, not just the interest rate. APR includes fees and gives you the true cost of borrowing.",
          },
        ],
        keyTakeaways: [
          "Loans allow you to make purchases you couldn't afford with cash",
          "APR includes both interest rate and fees for true cost comparison",
          "Loan terms significantly impact total cost and monthly payments",
          "Understanding loan components helps you make better borrowing decisions",
        ],
        quiz: {
          questions: [
            {
              question: "What does APR stand for and why is it important?",
              options: [
                "Annual Payment Rate - shows monthly payment amount",
                "Annual Percentage Rate - includes interest and fees for true cost",
                "Approved Payment Rate - determines if you qualify",
                "Average Principal Rate - shows typical loan amounts",
              ],
              correctAnswer: "Annual Percentage Rate - includes interest and fees for true cost",
              explanation:
                "APR (Annual Percentage Rate) includes both the interest rate and fees, giving you the true annual cost of borrowing. This makes it the best metric for comparing different loan offers.",
            },
          ],
        },
      },
    ],
  }

  const moduleContent = lessons[moduleId]
  if (!moduleContent || lessonIndex >= moduleContent.length) {
    return null
  }

  return moduleContent[lessonIndex]
}
