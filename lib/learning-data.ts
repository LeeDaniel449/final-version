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
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "Your Financial Journey Starts Here",
          },
          {
            type: "paragraph",
            content:
              "Personal finance is the art and science of managing your money to achieve your life goals. Whether you want to buy a home, start a business, travel the world, or retire comfortably, understanding the fundamentals of money management is your first step toward financial freedom and security.",
          },
          {
            type: "list",
            content: "The six pillars of personal finance:",
            items: [
              "Budgeting: Creating a plan for how you'll spend and save your money",
              "Saving: Setting aside money for future needs and emergencies",
              "Investing: Growing your wealth through various investment vehicles",
              "Insurance: Protecting against financial risks and unexpected events",
              "Debt management: Handling borrowed money responsibly and strategically",
              "Tax planning: Minimizing what you owe while maximizing your wealth",
            ],
          },
          {
            type: "calculation",
            content: "The power of starting early:",
            formula: "Future Value = Present Value × (1 + Interest Rate)^Years",
            variables: {
              "Example": "Saving $100/month starting at age 25 vs 35",
              "Age 25 start": "$100/month for 40 years at 7% = $262,481",
              "Age 35 start": "$100/month for 30 years at 7% = $121,997",
              "Difference": "Starting 10 years earlier = $140,484 more",
            },
          },
          {
            type: "example",
            content:
              "Real-world application: Sarah, 22, starts saving $200/month in a retirement account earning 8% annually. By age 65, she'll have $1.4 million. Her friend Mike waits until 32 to start the same plan and accumulates only $650,000 - half as much despite only waiting 10 years.",
          },
          {
            type: "list",
            content: "Common financial mistakes to avoid:",
            items: [
              "Living paycheck to paycheck without an emergency fund",
              "Carrying high-interest credit card debt month to month",
              "Not taking advantage of employer 401(k) matching",
              "Buying too much house or car relative to income",
              "Not having adequate insurance coverage",
              "Procrastinating on financial planning and investing",
            ],
          },
          {
            type: "case-study",
            content:
              "The Johnson Family Transformation: The Johnsons were living paycheck to paycheck despite earning $75,000 annually. After creating a budget, they discovered they were spending $800/month on dining out and subscriptions. By reducing this to $300/month, they freed up $500/month for an emergency fund and retirement savings, completely transforming their financial trajectory.",
          },
          {
            type: "tip",
            content:
              "Start with the 50/30/20 rule as a baseline: 50% of after-tax income for needs, 30% for wants, and 20% for savings and debt repayment. Adjust these percentages based on your specific situation and goals.",
          },
          {
            type: "warning",
            content:
              "Don't try to implement every financial strategy at once. Start with one area (like budgeting or emergency savings) and build momentum before tackling more complex topics like investing or tax optimization.",
          },
        ],
        keyTakeaways: [
          "Personal finance encompasses budgeting, saving, investing, insurance, debt management, and taxes",
          "Starting early with financial planning creates exponential benefits through compound growth",
          "Small changes in spending habits can free up significant money for savings and investments",
          "The 50/30/20 rule provides a simple framework for allocating income",
          "Avoiding common financial mistakes is as important as implementing good strategies",
        ],
        quiz: {
          questions: [
            {
              question: "According to the compound interest example, how much more money does someone have by starting to save 10 years earlier?",
              options: [
                "$50,000 more",
                "$100,000 more",
                "$140,484 more",
                "$200,000 more",
              ],
              correctAnswer: "$140,484 more",
              explanation:
                "Starting to save $100/month at age 25 instead of 35 results in $140,484 more by retirement, demonstrating the powerful impact of starting early due to compound interest.",
            },
            {
              question: "What is the 50/30/20 rule?",
              options: [
                "50% stocks, 30% bonds, 20% cash for investing",
                "50% for needs, 30% for wants, 20% for savings/debt repayment",
                "50% salary, 30% bonus, 20% side income",
                "50% checking, 30% savings, 20% investments",
              ],
              correctAnswer: "50% for needs, 30% for wants, 20% for savings/debt repayment",
              explanation:
                "The 50/30/20 rule is a budgeting framework where 50% of after-tax income goes to needs, 30% to wants, and 20% to savings and debt repayment.",
            },
          ],
        },
        practiceExercise: {
          title: "Personal Finance Assessment",
          scenario: "You earn $4,000 per month after taxes. Use the 50/30/20 rule to create a basic budget allocation.",
          questions: [
            {
              question: "How much should you allocate for needs (housing, food, utilities, minimum debt payments)?",
              type: "calculate",
              correctAnswer: 2000,
              explanation: "50% of $4,000 = $2,000 for needs including housing, food, utilities, and minimum debt payments.",
            },
            {
              question: "How much should you allocate for wants (entertainment, dining out, hobbies)?",
              type: "calculate",
              correctAnswer: 1200,
              explanation: "30% of $4,000 = $1,200 for wants like entertainment, dining out, and hobbies.",
            },
            {
              question: "How much should you save and put toward extra debt payments?",
              type: "calculate",
              correctAnswer: 800,
              explanation: "20% of $4,000 = $800 for savings and extra debt payments beyond minimums.",
            },
          ],
        },
      },
      {
        title: "Setting Financial Goals",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Creating Your Financial Roadmap",
          },
          {
            type: "paragraph",
            content:
              "Financial goals provide direction and motivation for your money management decisions. Without clear goals, it's easy to spend aimlessly and wonder where your money went. Effective goal setting involves making your objectives specific, measurable, achievable, relevant, and time-bound (SMART).",
          },
          {
            type: "list",
            content: "Types of financial goals by timeline:",
            items: [
              "Short-term (1 year or less): Emergency fund, vacation, small purchases",
              "Medium-term (1-5 years): Car purchase, home down payment, wedding",
              "Long-term (5+ years): Retirement, children's education, paying off mortgage",
              "Ongoing goals: Debt reduction, increasing income, improving credit score",
            ],
          },
          {
            type: "calculation",
            content: "Goal-based savings calculation:",
            formula: "Monthly Savings Needed = Goal Amount ÷ Months Until Goal",
            variables: {
              "Example": "Save $20,000 for home down payment in 3 years",
              "Total months": "3 years × 12 months = 36 months",
              "Monthly savings": "$20,000 ÷ 36 = $556 per month",
              "With 5% annual return": "Need only $510/month with investment growth",
            },
          },
          {
            type: "example",
            content:
              "SMART Goal Example: Instead of 'I want to save money,' try 'I will save $15,000 for a car down payment by December 2025 by setting aside $500 per month in a high-yield savings account.' This goal is Specific ($15,000 for car), Measurable ($500/month), Achievable (based on budget), Relevant (need reliable transportation), and Time-bound (by December 2025).",
          },
          {
            type: "list",
            content: "Goal prioritization framework:",
            items: [
              "Priority 1: Emergency fund (3-6 months expenses)",
              "Priority 2: High-interest debt elimination (credit cards, personal loans)",
              "Priority 3: Employer 401(k) match (free money)",
              "Priority 4: Medium-term goals (house, car, wedding)",
              "Priority 5: Additional retirement savings",
              "Priority 6: Other long-term goals and wants",
            ],
          },
          {
            type: "case-study",
            content:
              "Multi-Goal Strategy: Alex, 28, wants to buy a house ($25,000 down payment needed in 2 years), pay off $8,000 in credit card debt, and boost retirement savings. Strategy: First, pay minimum on credit cards while building $1,000 emergency fund. Then attack credit card debt aggressively. Once debt-free, redirect those payments plus additional savings toward the house down payment while contributing enough to 401(k) to get full employer match.",
          },
          {
            type: "list",
            content: "Strategies for achieving financial goals:",
            items: [
              "Automate savings: Set up automatic transfers to goal-specific accounts",
              "Use separate accounts: Keep goal money separate from spending money",
              "Track progress visually: Use charts, apps, or spreadsheets to monitor progress",
              "Celebrate milestones: Acknowledge progress at 25%, 50%, 75% completion",
              "Adjust as needed: Review and modify goals quarterly",
              "Find accountability: Share goals with trusted friends or family",
            ],
          },
          {
            type: "tip",
            content:
              "Use the 'pay yourself first' principle: treat savings like a non-negotiable bill. Set up automatic transfers to occur right after payday, before you have a chance to spend the money elsewhere.",
          },
          {
            type: "warning",
            content:
              "Don't set too many goals at once. Focus on 2-3 primary goals to avoid spreading your resources too thin and losing motivation. You can always add new goals as you achieve existing ones.",
          },
        ],
        keyTakeaways: [
          "SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) are more likely to be achieved",
          "Prioritize goals based on financial impact and urgency",
          "Emergency funds and high-interest debt should typically be top priorities",
          "Automation and separate accounts help maintain focus on goals",
          "Regular review and adjustment of goals is essential for success",
        ],
        quiz: {
          questions: [
            {
              question: "What does the 'T' in SMART goals stand for?",
              options: [
                "Trackable",
                "Time-bound",
                "Tangible",
                "Thoughtful",
              ],
              correctAnswer: "Time-bound",
              explanation:
                "The 'T' in SMART goals stands for Time-bound, meaning the goal should have a specific deadline or timeframe for completion.",
            },
            {
              question: "According to the goal prioritization framework, what should be your first financial priority?",
              options: [
                "Paying off all debt",
                "Maximizing retirement contributions",
                "Building an emergency fund",
                "Saving for a house down payment",
              ],
              correctAnswer: "Building an emergency fund",
              explanation:
                "An emergency fund (3-6 months of expenses) should be the first priority as it provides financial stability and prevents you from going into debt when unexpected expenses arise.",
            },
          ],
        },
      },
      {
        title: "Understanding Cash Flow",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Mastering Money In and Money Out",
          },
          {
            type: "paragraph",
            content:
              "Cash flow is the movement of money into and out of your accounts. Positive cash flow means you're earning more than you're spending, while negative cash flow means you're spending more than you earn. Understanding and optimizing your cash flow is fundamental to financial success.",
          },
          {
            type: "list",
            content: "Components of cash flow:",
            items: [
              "Income: Salary, wages, bonuses, side hustles, investment returns",
              "Fixed expenses: Rent/mortgage, insurance, loan payments, subscriptions",
              "Variable expenses: Food, utilities, entertainment, clothing",
              "Periodic expenses: Annual fees, quarterly taxes, seasonal costs",
              "Savings and investments: Money set aside for future goals",
            ],
          },
          {
            type: "calculation",
            content: "Monthly cash flow calculation:",
            formula: "Net Cash Flow = Total Income - Total Expenses",
            variables: {
              "Example": "Monthly income $5,000, expenses $4,200",
              "Net Cash Flow": "$5,000 - $4,200 = +$800",
              "Annual surplus": "$800 × 12 = $9,600 available for goals",
              "Savings rate": "$800 ÷ $5,000 = 16% savings rate",
            },
          },
          {
            type: "example",
            content:
              "Cash Flow Optimization: Maria discovered her cash flow was negative by $200/month. She identified $150 in unused subscriptions, negotiated her phone bill down $30/month, and started meal prepping to save $100/month on food. These changes created a positive cash flow of $80/month, allowing her to start building an emergency fund.",
          },
          {
            type: "list",
            content: "Strategies to improve cash flow:",
            items: [
              "Increase income: Ask for raises, develop new skills, start side hustles",
              "Reduce fixed costs: Refinance loans, negotiate bills, downsize housing",
              "Optimize variable expenses: Use budgeting apps, meal plan, comparison shop",
              "Eliminate waste: Cancel unused subscriptions, reduce impulse purchases",
              "Time expenses strategically: Spread large purchases across months",
              "Automate savings: Pay yourself first before expenses",
            ],
          },
          {
            type: "case-study",
            content:
              "Seasonal Cash Flow Management: Teacher Jennifer earns $45,000 annually but only receives paychecks during the school year. She calculates her monthly expenses at $3,200 and sets aside $800/month during the school year to cover summer months when she has no income. This forward planning prevents her from relying on credit cards during summer break.",
          },
          {
            type: "tip",
            content:
              "Track your cash flow for at least 3 months to identify patterns. Many people are surprised by where their money actually goes versus where they think it goes.",
          },
          {
            type: "warning",
            content:
              "Beware of lifestyle inflation - as your income increases, avoid automatically increasing your spending proportionally. Instead, direct raises and bonuses toward savings and debt reduction.",
          },
        ],
        keyTakeaways: [
          "Positive cash flow is essential for building wealth and achieving financial goals",
          "Track both regular and periodic expenses to get an accurate picture",
          "Small optimizations in multiple categories can significantly improve cash flow",
          "Seasonal income requires careful planning and cash reserves",
          "Automate savings to ensure positive cash flow translates to wealth building",
        ],
        quiz: {
          questions: [
            {
              question: "If your monthly income is $4,500 and expenses are $4,100, what is your savings rate?",
              options: [
                "8.9%",
                "9.8%",
                "10.2%",
                "11.1%",
              ],
              correctAnswer: "8.9%",
              explanation:
                "Net cash flow is $4,500 - $4,100 = $400. Savings rate is $400 ÷ $4,500 = 8.9%.",
            },
          ],
        },
      },
      {
        title: "Building an Emergency Fund",
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "Your Financial Safety Net",
          },
          {
            type: "paragraph",
            content:
              "An emergency fund is money set aside specifically for unexpected expenses or financial emergencies. It's your first line of defense against going into debt when life throws you curveballs like job loss, medical bills, car repairs, or home maintenance issues.",
          },
          {
            type: "list",
            content: "What constitutes a financial emergency:",
            items: [
              "Job loss or significant reduction in income",
              "Unexpected medical or dental expenses",
              "Major car repairs or replacement",
              "Essential home repairs (roof, HVAC, plumbing)",
              "Emergency travel for family situations",
              "NOT: vacations, shopping, planned purchases, or wants",
            ],
          },
          {
            type: "calculation",
            content: "Emergency fund size calculation:",
            formula: "Emergency Fund = Monthly Essential Expenses × Number of Months",
            variables: {
              "Essential expenses": "Housing, food, utilities, insurance, minimum debt payments",
              "Starter emergency fund": "$1,000 or 1 month of expenses",
              "Full emergency fund": "3-6 months for stable jobs, 6-12 months for variable income",
              "Example": "$3,500 monthly essentials × 6 months = $21,000 target",
            },
          },
          {
            type: "example",
            content:
              "Emergency Fund in Action: Tom's car transmission failed, requiring a $2,800 repair. Instead of putting it on a credit card at 22% interest, he used his emergency fund. This saved him from months of high-interest debt payments and the stress of financial strain. He then focused on replenishing the emergency fund over the next few months.",
          },
          {
            type: "list",
            content: "Where to keep your emergency fund:",
            items: [
              "High-yield savings account: Easy access, earns interest, FDIC insured",
              "Money market account: Slightly higher rates, may have check-writing",
              "Short-term CDs: Higher rates but less liquid, consider CD ladders",
              "NOT in: Checking accounts (too easy to spend), stocks (too volatile)",
              "Consider: Keeping $500-1000 in checking for immediate access",
            ],
          },
          {
            type: "case-study",
            content:
              "Building Strategy: Sarah needed to build a $15,000 emergency fund but could only save $300/month. She started with a $1,000 starter fund first (achieved in 3.5 months), then continued saving $300/month for the full fund. She automated the transfer and treated it like a bill. She also added windfalls like tax refunds and bonuses, completing her goal in 18 months instead of 50.",
          },
          {
            type: "list",
            content: "Strategies for building your emergency fund faster:",
            items: [
              "Start small: Aim for $500-1000 first, then build to full amount",
              "Automate transfers: Set up automatic savings right after payday",
              "Use windfalls: Tax refunds, bonuses, gifts go directly to emergency fund",
              "Sell unused items: Declutter and fund your safety net",
              "Temporary side hustles: Drive for rideshare, freelance, part-time work",
              "Reduce expenses temporarily: Cut non-essentials until fund is built",
            ],
          },
          {
            type: "list",
            content: "Emergency fund maintenance:",
            items: [
              "Review fund size annually: Adjust for changes in expenses or income",
              "Replenish immediately after use: Make it a top priority",
              "Keep it separate: Don't mix with other savings goals",
              "Don't over-save: Once adequate, focus on other financial goals",
              "Consider inflation: Increase fund size as living costs rise",
            ],
          },
          {
            type: "tip",
            content:
              "If saving the full emergency fund feels overwhelming, start with $1,000. This covers most minor emergencies and builds the savings habit. Then work toward the full 3-6 months of expenses.",
          },
          {
            type: "warning",
            content:
              "Don't invest your emergency fund in stocks or other volatile investments. The purpose is stability and immediate access, not growth. You need this money to be there when emergencies strike.",
          },
        ],
        keyTakeaways: [
          "Emergency funds prevent debt accumulation during unexpected financial challenges",
          "Start with $1,000, then build to 3-6 months of essential expenses",
          "Keep emergency funds in easily accessible, low-risk accounts",
          "Automate contributions and use windfalls to build the fund faster",
          "Replenish immediately after use and review size annually",
        ],
        quiz: {
          questions: [
            {
              question: "How much should you typically have in a full emergency fund?",
              options: [
                "1-2 months of expenses",
                "3-6 months of expenses",
                "12 months of expenses",
                "$10,000 regardless of expenses",
              ],
              correctAnswer: "3-6 months of expenses",
              explanation:
                "A full emergency fund should cover 3-6 months of essential expenses for most people with stable jobs. Those with variable income may need 6-12 months.",
            },
            {
              question: "Which of these is NOT a good place to keep your emergency fund?",
              options: [
                "High-yield savings account",
                "Money market account",
                "Stock market investments",
                "Short-term certificates of deposit",
              ],
              correctAnswer: "Stock market investments",
              explanation:
                "Emergency funds should not be invested in stocks because they're too volatile. You need guaranteed access to the full amount when emergencies arise.",
            },
          ],
        },
      },
      {
        title: "Banking Basics and Account Types",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Choosing the Right Banking Products",
          },
          {
            type: "paragraph",
            content:
              "Banking is the foundation of your financial life. Understanding different account types, fees, and features helps you choose the right products for your needs while minimizing costs and maximizing benefits. The right banking setup can save you hundreds of dollars annually in fees.",
          },
          {
            type: "list",
            content: "Types of bank accounts:",
            items: [
              "Checking accounts: Daily transactions, bill payments, debit card access",
              "Savings accounts: Emergency funds, short-term goals, earns interest",
              "Money market accounts: Higher interest rates, limited transactions",
              "Certificates of deposit (CDs): Fixed terms, higher rates, penalties for early withdrawal",
              "High-yield online accounts: Better rates, limited physical locations",
            ],
          },
          {
            type: "calculation",
            content: "Banking fee impact analysis:",
            formula: "Annual Fee Cost = Monthly Fees × 12 + Transaction Fees",
            variables: {
              "Traditional bank": "$12 monthly fee + $3 ATM fees × 8 = $168/year",
              "Online bank": "$0 monthly fee + $0 ATM fees = $0/year",
              "Credit union": "$5 monthly fee + $1 ATM fees × 4 = $64/year",
              "Savings over 10 years": "$168 × 10 = $1,680 in avoided fees",
            },
          },
          {
            type: "example",
            content:
              "Banking Optimization: Jake was paying $15/month in checking account fees plus $35/month in ATM fees at his big bank. He switched to an online bank with no monthly fees and ATM fee reimbursement, saving $600 annually. He kept a small account at a local credit union for the occasional need for in-person service.",
          },
          {
            type: "list",
            content: "Key features to compare:",
            items: [
              "Monthly maintenance fees and how to avoid them",
              "ATM access and fee reimbursement policies",
              "Interest rates on savings and checking accounts",
              "Minimum balance requirements",
              "Online and mobile banking capabilities",
              "Customer service quality and availability",
              "Branch and ATM network size",
              "Additional services (loans, investment accounts, financial advice)",
            ],
          },
          {
            type: "case-study",
            content:
              "Multi-Bank Strategy: Lisa uses three different institutions: (1) Online bank for high-yield savings and primary checking (no fees, great rates), (2) Local credit union for car loans and mortgage (better rates for members), (3) Large national bank for travel (extensive ATM network). This strategy maximizes benefits while minimizing costs.",
          },
          {
            type: "list",
            content: "Banking safety and security:",
            items: [
              "FDIC insurance: Protects deposits up to $250,000 per account type per bank",
              "NCUA insurance: Credit union equivalent of FDIC protection",
              "Strong passwords and two-factor authentication for online banking",
              "Regular account monitoring for unauthorized transactions",
              "Secure internet connections for online banking",
              "Prompt reporting of lost or stolen cards",
            ],
          },
          {
            type: "list",
            content: "Red flags to avoid:",
            items: [
              "Excessive fees with no way to avoid them",
              "Poor customer service or long wait times",
              "Limited ATM access or high ATM fees",
              "Lack of FDIC or NCUA insurance",
              "Predatory practices or high-pressure sales tactics",
              "Unclear fee structures or terms",
            ],
          },
          {
            type: "tip",
            content:
              "Consider using multiple banks to optimize your banking experience. An online bank for high-yield savings, a local credit union for loans, and a national bank for travel can give you the best of all worlds.",
          },
          {
            type: "warning",
            content:
              "Always verify FDIC or NCUA insurance before opening accounts. Some online-only institutions may not be properly insured, putting your deposits at risk.",
          },
        ],
        keyTakeaways: [
          "Different account types serve different purposes in your financial plan",
          "Banking fees can cost hundreds of dollars annually if not managed properly",
          "Online banks often offer better rates and lower fees than traditional banks",
          "FDIC/NCUA insurance protects your deposits up to $250,000 per account type",
          "Using multiple banks strategically can maximize benefits and minimize costs",
        ],
        quiz: {
          questions: [
            {
              question: "What is the FDIC insurance limit per depositor per bank?",
              options: [
                "$100,000",
                "$250,000",
                "$500,000",
                "$1,000,000",
              ],
              correctAnswer: "$250,000",
              explanation:
                "FDIC insurance protects deposits up to $250,000 per depositor, per insured bank, for each account ownership category.",
            },
            {
              question: "Which type of account typically offers the highest interest rates?",
              options: [
                "Regular checking account",
                "Traditional savings account",
                "High-yield online savings account",
                "Money market account",
              ],
              correctAnswer: "High-yield online savings account",
              explanation:
                "High-yield online savings accounts typically offer the highest interest rates because online banks have lower overhead costs than traditional brick-and-mortar banks.",
            },
          ],
        },
      },
      {
        title: "Credit Basics and Building Credit",
        duration: "9 min",
        points: 27,
        content: [
          {
            type: "heading",
            content: "Understanding and Building Your Credit Profile",
          },
          {
            type: "paragraph",
            content:
              "Credit is your financial reputation - it shows lenders how reliably you've managed borrowed money in the past. A strong credit profile opens doors to better interest rates on loans, lower insurance premiums, easier apartment rentals, and sometimes even better job opportunities. Building good credit takes time, but the financial benefits last a lifetime.",
          },
          {
            type: "list",
            content: "What makes up your credit score:",
            items: [
              "Payment history (35%): On-time payments vs. late or missed payments",
              "Credit utilization (30%): How much credit you use vs. available credit",
              "Length of credit history (15%): How long you've had credit accounts",
              "Credit mix (10%): Variety of credit types (cards, loans, mortgage)",
              "New credit inquiries (10%): Recent applications for new credit",
            ],
          },
          {
            type: "calculation",
            content: "Credit utilization impact:",
            formula: "Utilization Rate = Total Balances ÷ Total Credit Limits",
            variables: {
              "Example": "$2,000 balance on $10,000 total limits = 20% utilization",
              "Excellent": "Under 10% utilization",
              "Good": "10-30% utilization",
              "Poor": "Over 30% utilization",
              "Impact": "Lowering from 30% to 10% can increase score by 20-50 points",
            },
          },
          {
            type: "example",
            content:
              "Credit Building Success: Maria, 22, started with no credit history. She got a secured credit card with a $500 limit, used it for small purchases, and paid the full balance monthly. After 6 months, she was approved for a regular credit card. After 18 months of responsible use, her credit score reached 720, qualifying her for excellent rates on her first car loan.",
          },
          {
            type: "list",
            content: "Strategies for building credit from scratch:",
            items: [
              "Secured credit card: Put down a deposit that becomes your credit limit",
              "Become an authorized user: Added to someone else's account with good history",
              "Credit-builder loan: Small loan designed specifically to build credit",
              "Student credit card: Designed for college students with limited history",
              "Store credit card: Often easier to qualify for but use carefully",
              "Pay all bills on time: Some services report utility and rent payments",
            ],
          },
          {
            type: "case-study",
            content:
              "Credit Repair Journey: David's credit score was 580 due to missed payments and high balances. His strategy: (1) Paid all accounts current, (2) Paid down credit card balances from 80% to 15% utilization, (3) Disputed errors on his credit report, (4) Kept old accounts open to maintain credit history length. After 12 months, his score improved to 680, saving him $3,000 annually on loan interest.",
          },
          {
            type: "list",
            content: "Credit monitoring and maintenance:",
            items: [
              "Check credit reports annually from all three bureaus (free at annualcreditreport.com)",
              "Monitor credit scores monthly through free services or credit cards",
              "Dispute errors immediately - they can significantly impact your score",
              "Set up account alerts for payment due dates and unusual activity",
              "Keep old accounts open to maintain credit history length",
              "Limit new credit applications to avoid multiple hard inquiries",
            ],
          },
          {
            type: "list",
            content: "Common credit mistakes to avoid:",
            items: [
              "Making only minimum payments and carrying high balances",
              "Closing old credit cards (reduces available credit and history length)",
              "Applying for multiple credit cards in a short period",
              "Ignoring credit reports and not disputing errors",
              "Using credit cards for cash advances (high fees and interest)",
              "Cosigning loans without understanding the risks",
            ],
          },
          {
            type: "tip",
            content:
              "Set up automatic payments for at least the minimum amount due on all credit accounts. Payment history is the most important factor in your credit score, and even one missed payment can cause significant damage.",
          },
          {
            type: "warning",
            content:
              "Avoid credit repair companies that promise to 'fix' your credit quickly for a fee. Most legitimate credit repair can be done yourself for free, and companies that promise to remove accurate negative information are likely scams.",
          },
        ],
        keyTakeaways: [
          "Credit scores are based on payment history, utilization, history length, credit mix, and new inquiries",
          "Keep credit utilization below 30%, ideally under 10% for best scores",
          "Building credit takes time - start early and be consistent with good habits",
          "Monitor your credit regularly and dispute errors immediately",
          "Avoid common mistakes like closing old accounts or applying for too much credit at once",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most important factor in determining your credit score?",
              options: [
                "Credit utilization ratio",
                "Payment history",
                "Length of credit history",
                "Types of credit accounts",
              ],
              correctAnswer: "Payment history",
              explanation:
                "Payment history accounts for 35% of your credit score and is the most important factor. It shows lenders whether you pay your bills on time consistently.",
            },
            {
              question: "What credit utilization ratio is considered excellent?",
              options: [
                "Under 50%",
                "Under 30%",
                "Under 10%",
                "Under 5%",
              ],
              correctAnswer: "Under 10%",
              explanation:
                "While under 30% is generally considered good, keeping utilization under 10% is considered excellent and can help maximize your credit score.",
            },
            {
              question: "Which strategy is best for someone with no credit history?",
              options: [
                "Apply for multiple credit cards at once",
                "Get a secured credit card and use it responsibly",
                "Take out a large personal loan",
                "Wait until you're older to start building credit",
              ],
              correctAnswer: "Get a secured credit card and use it responsibly",
              explanation:
                "A secured credit card is often the best way to start building credit because it requires a deposit that serves as collateral, making approval easier for those with no credit history.",
            },
          ],
        },
      },
      {
        title: "Financial Apps and Tools",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Leveraging Technology for Financial Success",
          },
          {
            type: "paragraph",
            content:
              "Modern technology offers powerful tools to automate, track, and optimize your finances. The right combination of apps and tools can save you time, help you stick to your budget, and provide insights into your spending patterns that would be difficult to achieve manually.",
          },
          {
            type: "list",
            content: "Categories of financial apps:",
            items: [
              "Budgeting apps: Track spending, categorize expenses, set spending limits",
              "Investment apps: Buy/sell stocks, ETFs, manage portfolios",
              "Banking apps: Mobile deposits, transfers, account management",
              "Credit monitoring: Track credit scores, monitor for identity theft",
              "Bill management: Track due dates, automate payments",
              "Savings apps: Round-up purchases, automate micro-investing",
            ],
          },
          {
            type: "example",
            content:
              "App Integration Success: Jennifer uses Mint to track all her accounts in one place, YNAB for detailed budgeting, Acorns to invest spare change, and Credit Karma to monitor her credit score. This ecosystem helps her stay on top of her finances with minimal daily effort while maximizing her savings and investment growth.",
          },
          {
            type: "list",
            content: "Popular budgeting apps and their strengths:",
            items: [
              "Mint: Free, comprehensive tracking, connects to all accounts",
              "YNAB (You Need A Budget): Proactive budgeting, excellent for debt payoff",
              "Personal Capital: Great for investment tracking and net worth monitoring",
              "PocketGuard: Simple interface, prevents overspending",
              "Goodbudget: Envelope budgeting method, good for cash-based budgets",
              "Tiller: Spreadsheet-based, highly customizable",
            ],
          },
          {
            type: "case-study",
            content:
              "Automation Success Story: Mark set up automatic transfers of $500/month to savings, $200/month to his Roth IRA, and automated all his bill payments. He uses a budgeting app to track spending and gets alerts when he's approaching category limits. This automation helped him save $8,000 in his first year while reducing financial stress and late payment fees.",
          },
          {
            type: "list",
            content: "Security considerations for financial apps:",
            items: [
              "Use strong, unique passwords for each financial app",
              "Enable two-factor authentication whenever available",
              "Only download apps from official app stores",
              "Read privacy policies to understand how your data is used",
              "Regularly review connected accounts and permissions",
              "Log out of apps when not in use, especially on shared devices",
            ],
          },
          {
            type: "list",
            content: "Features to look for in financial apps:",
            items: [
              "Bank-level security and encryption",
              "Automatic transaction categorization",
              "Goal setting and progress tracking",
              "Bill reminders and payment scheduling",
              "Spending alerts and budget notifications",
              "Export capabilities for tax preparation",
              "Multi-device synchronization",
              "Customer support and regular updates",
            ],
          },
          {
            type: "tip",
            content:
              "Start with one or two apps rather than trying to use everything at once. Master the basics of budgeting and tracking before adding investment or specialized apps to your toolkit.",
          },
          {
            type: "warning",
            content:
              "Be cautious about connecting all your financial accounts to third-party apps. While most reputable apps use bank-level security, you're still sharing sensitive financial information. Only use well-established apps with strong security reputations.",
          },
        ],
        keyTakeaways: [
          "Financial apps can automate and simplify money management tasks",
          "Choose apps based on your specific needs and financial goals",
          "Security should be a top priority when selecting financial apps",
          "Automation can help you save consistently and avoid late fees",
          "Start simple and gradually add more sophisticated tools as needed",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most important security feature to enable on financial apps?",
              options: [
                "Automatic logout",
                "Two-factor authentication",
                "Password saving",
                "Push notifications",
              ],
              correctAnswer: "Two-factor authentication",
              explanation:
                "Two-factor authentication adds an extra layer of security by requiring a second form of verification beyond just your password, significantly reducing the risk of unauthorized access.",
            },
          ],
        },
      },
      {
        title: "Common Financial Mistakes",
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "Learning from Others' Financial Missteps",
          },
          {
            type: "paragraph",
            content:
              "Understanding common financial mistakes can help you avoid costly errors that derail your financial progress. Many of these mistakes are behavioral rather than mathematical - they stem from emotions, lack of planning, or simply not knowing better. Learning to recognize and avoid these pitfalls can save you thousands of dollars and years of financial stress.",
          },
          {
            type: "list",
            content: "Top financial mistakes by category:",
            items: [
              "Spending mistakes: Lifestyle inflation, impulse purchases, keeping up with others",
              "Debt mistakes: Carrying credit card balances, taking on too much debt",
              "Saving mistakes: Not starting early, not having emergency funds",
              "Investment mistakes: Trying to time the market, not diversifying",
              "Insurance mistakes: Being underinsured or overinsured",
              "Tax mistakes: Not taking advantage of tax-advantaged accounts",
            ],
          },
          {
            type: "calculation",
            content: "Cost of common mistakes:",
            formula: "Opportunity Cost = Money Lost + Potential Growth Foregone",
            variables: {
              "Credit card debt": "$5,000 at 22% APR costs $1,100/year in interest",
              "Delayed investing": "Starting at 35 vs 25 costs $140,000 in retirement",
              "No emergency fund": "One $3,000 emergency on credit cards costs $600+ in interest",
              "Lifestyle inflation": "Spending raises instead of saving costs compound growth",
            },
          },
          {
            type: "example",
            content:
              "The Expensive Car Mistake: Alex bought a $45,000 car with a $500/month payment when a $25,000 car would have met his needs with a $300/month payment. The extra $200/month invested at 7% for 30 years would have grown to $246,000 - enough for a comfortable retirement upgrade.",
          },
          {
            type: "case-study",
            content:
              "Lifestyle Inflation Recovery: When Sarah got promoted and her salary increased from $50,000 to $70,000, she immediately upgraded her apartment, car, and lifestyle, spending the entire raise. After realizing she wasn't building wealth despite earning more, she moved to a modest apartment and used the extra $1,000/month to max out her 401(k) and build an investment portfolio.",
          },
          {
            type: "list",
            content: "Behavioral finance traps:",
            items: [
              "Present bias: Overvaluing immediate rewards vs. future benefits",
              "Loss aversion: Fear of losses preventing smart financial decisions",
              "Anchoring: Relying too heavily on first piece of information",
              "Confirmation bias: Seeking information that confirms existing beliefs",
              "Herd mentality: Following what others do without independent analysis",
              "Overconfidence: Believing you can beat the market or time investments",
            ],
          },
          {
            type: "list",
            content: "Strategies to avoid financial mistakes:",
            items: [
              "Automate good behaviors: Set up automatic savings and investments",
              "Use the 24-hour rule: Wait a day before making large purchases",
              "Track net worth monthly: Focus on wealth building, not just income",
              "Educate yourself continuously: Read books, take courses, seek advice",
              "Have accountability: Share goals with trusted friends or advisors",
              "Regular financial check-ups: Review and adjust your plan quarterly",
            ],
          },
          {
            type: "list",
            content: "Recovery strategies when mistakes happen:",
            items: [
              "Acknowledge the mistake without dwelling on regret",
              "Calculate the true cost and create a recovery plan",
              "Adjust your budget to prevent similar mistakes",
              "Learn from the experience and share lessons with others",
              "Focus on future decisions rather than past mistakes",
              "Consider professional help for major financial setbacks",
            ],
          },
          {
            type: "tip",
            content:
              "Create 'speed bumps' for spending decisions. For purchases over $100, wait 24 hours. For purchases over $1,000, wait a week. This simple delay often prevents impulse purchases you'll later regret.",
          },
          {
            type: "warning",
            content:
              "Don't let perfectionism paralyze you. Making some financial mistakes is normal and part of the learning process. The key is to learn from them quickly and adjust your behavior going forward.",
          },
        ],
        keyTakeaways: [
          "Most financial mistakes are behavioral and can be prevented with awareness",
          "Small mistakes compound over time and can cost significant money",
          "Automation and systems help prevent emotional financial decisions",
          "Learning from others' mistakes is cheaper than making them yourself",
          "Recovery from financial mistakes is possible with discipline and planning",
        ],
        quiz: {
          questions: [
            {
              question: "What is lifestyle inflation?",
              options: [
                "When prices of goods increase over time",
                "When you increase spending as your income increases",
                "When you borrow money to maintain your lifestyle",
                "When your expenses exceed your income",
              ],
              correctAnswer: "When you increase spending as your income increases",
              explanation:
                "Lifestyle inflation occurs when people automatically increase their spending as their income rises, preventing them from building wealth despite earning more money.",
            },
            {
              question: "According to behavioral finance, what is 'present bias'?",
              options: [
                "Focusing only on current financial statements",
                "Overvaluing immediate rewards vs. future benefits",
                "Being biased toward present-day investment options",
                "Preferring cash over investments",
              ],
              correctAnswer: "Overvaluing immediate rewards vs. future benefits",
              explanation:
                "Present bias is the tendency to overvalue immediate rewards and undervalue future benefits, leading to decisions like spending now instead of saving for retirement.",
            },
          ],
        },
      },
    ],
    "budgeting": [
      {
        title: "Budgeting Fundamentals",
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "The Foundation of Financial Success",
          },
          {
            type: "paragraph",
            content:
              "A budget is simply a plan for your money - it tells every dollar where to go before you spend it. Far from being restrictive, a well-crafted budget actually gives you more freedom by ensuring your money aligns with your values and goals. It's the difference between wondering where your money went and telling it where to go.",
          },
          {
            type: "list",
            content: "Core budgeting principles:",
            items: [
              "Income minus expenses should equal zero (zero-based budgeting)",
              "Every dollar should have a purpose before you spend it",
              "Track actual spending against your planned budget",
              "Adjust categories based on real-world experience",
              "Prioritize needs over wants, but include some fun money",
              "Build in buffers for unexpected expenses",
            ],
          },
          {
            type: "calculation",
            content: "Basic budget equation:",
            formula: "Income - Fixed Expenses - Variable Expenses - Savings = $0",
            variables: {
              "Example": "Monthly income $4,000, expenses $2,200 (rent, insurance, loans)",
              "Fixed expenses": "$2,200 (rent, insurance, loans)",
              "Variable expenses": "$1,200 (food, utilities, entertainment)",
              "Savings/investments": "$600 (15% of income)",
              "Result": "$4,000 - $2,200 - $1,200 - $600 = $0",
            },
          },
          {
            type: "example",
            content:
              "Budget Transformation: Mike was spending $800/month on dining out without realizing it. After tracking expenses for a month, he was shocked. He set a realistic dining budget of $300/month and redirected the $500 savings to his emergency fund and retirement account. Within a year, he had a $3,000 emergency fund and was on track for a comfortable retirement.",
          },
          {
            type: "list",
            content: "Types of budgeting methods:",
            items: [
              "50/30/20 budget: 50% needs, 30% wants, 20% savings/debt",
              "Zero-based budget: Every dollar assigned a purpose",
              "Envelope method: Cash allocated to spending categories",
              "Pay yourself first: Save before spending on anything else",
              "Percentage-based: Allocate percentages to different categories",
              "Priority-based: Fund most important goals first",
            ],
          },
          {
            type: "case-study",
            content:
              "Family Budget Success: The Rodriguez family of four was living paycheck to paycheck on $75,000 annually. They implemented zero-based budgeting, discovered they were spending $400/month on subscriptions and impulse purchases, and redirected this money to savings. They built a $5,000 emergency fund in 10 months and started investing $300/month for retirement.",
          },
          {
            type: "list",
            content: "Common budgeting challenges and solutions:",
            items: [
              "Irregular income: Budget based on lowest month, save excess in good months",
              "Overspending categories: Use cash envelopes or separate accounts",
              "Forgetting expenses: Track everything for 30 days first",
              "Being too restrictive: Include reasonable fun money",
              "Partner disagreements: Have monthly budget meetings",
              "Giving up too quickly: Start simple and adjust gradually",
            ],
          },
          {
            type: "list",
            content: "Budget success strategies:",
            items: [
              "Start with tracking current spending before creating restrictions",
              "Use the 80/20 rule: Focus on the biggest expense categories first",
              "Automate fixed expenses and savings to reduce decision fatigue",
              "Review and adjust monthly - budgets should evolve",
              "Celebrate small wins to maintain motivation",
              "Use technology to simplify tracking and categorization",
            ],
          },
          {
            type: "tip",
            content:
              "Don't aim for perfection in your first budget. Start with broad categories and reasonable estimates. You'll refine it over time as you learn your actual spending patterns.",
          },
          {
            type: "warning",
            content:
              "Avoid making your budget so restrictive that it's impossible to follow. Include some money for entertainment and personal spending, or you'll likely abandon the budget entirely.",
          },
        ],
        keyTakeaways: [
          "Budgets are plans that give your money purpose and direction",
          "Zero-based budgeting ensures every dollar has a job",
          "Start by tracking current spending before making major changes",
          "Choose a budgeting method that fits your personality and lifestyle",
          "Regular review and adjustment are essential for budget success",
        ],
        quiz: {
          questions: [
            {
              question: "What does zero-based budgeting mean?",
              options: [
                "You have zero dollars left over",
                "You start with zero and add expenses",
                "Every dollar is assigned a purpose so income minus all allocations equals zero",
                "You spend zero money on wants",
              ],
              correctAnswer: "Every dollar is assigned a purpose so income minus all allocations equals zero",
              explanation:
                "Zero-based budgeting means you assign every dollar of income to a specific category (expenses, savings, debt payment) so that your income minus all allocations equals zero.",
            },
            {
              question: "What should you do before creating your first budget?",
              options: [
                "Cut all unnecessary expenses",
                "Track your current spending for at least a month",
                "Open new bank accounts",
                "Pay off all debt",
              ],
              correctAnswer: "Track your current spending for at least a month",
              explanation:
                "Before creating a budget, you should track your current spending to understand where your money actually goes. This provides a realistic foundation for creating a workable budget.",
            },
          ],
        },
      },
      {
        title: "Income Tracking and Optimization",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Maximizing and Managing Your Income Streams",
          },
          {
            type: "paragraph",
            content:
              "Understanding and optimizing your income is the first step in effective budgeting. This includes not just your primary job, but all sources of money coming in. Many people focus solely on cutting expenses, but increasing income can have an even bigger impact on your financial situation.",
          },
          {
            type: "list",
            content: "Types of income to track:",
            items: [
              "Primary employment: Salary, wages, tips, commissions",
              "Secondary employment: Part-time jobs, freelancing, consulting",
              "Passive income: Rental properties, dividends, interest",
              "Government benefits: Social Security, unemployment, disability",
              "Other sources: Gifts, tax refunds, bonuses, side hustles",
              "Variable income: Seasonal work, project-based income",
            ],
          },
          {
            type: "calculation",
            content: "True hourly wage calculation:",
            formula: "True Hourly Wage = (Annual Income - Work Expenses) ÷ Total Work Hours",
            variables: {
              "Example": "$50,000 salary, $3,000 work expenses, 2,080 hours",
              "Work expenses": "Commuting, work clothes, meals, parking",
              "Total hours": "Work hours + commute + preparation time",
              "True wage": "($50,000 - $3,000) ÷ 2,080 = $22.60/hour",
            },
          },
          {
            type: "example",
            content:
              "Income Optimization Success: Lisa was earning $45,000 at her day job. She started freelance graphic design for 10 hours/week at $40/hour, adding $20,800 annually. She used this extra income to pay off $15,000 in student loans in 18 months instead of 10 years, saving over $8,000 in interest.",
          },
          {
            type: "list",
            content: "Strategies to increase income:",
            items: [
              "Skill development: Learn high-demand skills through courses or certifications",
              "Career advancement: Seek promotions, negotiate raises, change companies",
              "Side hustles: Freelancing, consulting, gig economy work",
              "Passive income: Invest in dividend stocks, rental properties, REITs",
              "Monetize hobbies: Turn skills into income streams",
              "Education: Pursue degrees or certifications that increase earning potential",
            ],
          },
          {
            type: "case-study",
            content:
              "Multiple Income Streams: David built a diversified income portfolio: $60,000 from his day job, $15,000 from weekend real estate photography, $8,000 from dividend investments, and $5,000 from selling online courses. This diversification provided financial security and accelerated his wealth building.",
          },
          {
            type: "list",
            content: "Managing irregular income:",
            items: [
              "Calculate your lowest monthly income over the past year",
              "Base your budget on this conservative estimate",
              "Save excess income in good months for lean months",
              "Build a larger emergency fund (6-12 months vs. 3-6 months)",
              "Consider income smoothing through separate savings account",
              "Track income patterns to predict seasonal variations",
            ],
          },
          {
            type: "list",
            content: "Tax considerations for income:",
            items: [
              "Understand the difference between gross and net income",
              "Factor in federal, state, and local taxes",
              "Consider FICA taxes (Social Security and Medicare)",
              "Plan for quarterly estimated taxes if self-employed",
              "Maximize tax-advantaged accounts to reduce taxable income",
              "Keep detailed records for business income and expenses",
            ],
          },
          {
            type: "tip",
            content:
              "When budgeting with irregular income, use your lowest monthly income as your baseline budget. Treat higher-income months as bonuses to accelerate savings and debt payoff goals.",
          },
          {
            type: "warning",
            content:
              "Don't count on variable income sources (bonuses, overtime, side hustles) for essential expenses. Build your core budget around guaranteed income and use variable income for goals and extras.",
          },
        ],
        keyTakeaways: [
          "Track all income sources, not just your primary job",
          "Calculate your true hourly wage including work-related expenses",
          "Diversifying income streams provides financial security",
          "Budget based on conservative income estimates for irregular earners",
          "Increasing income can be more impactful than cutting expenses",
        ],
        quiz: {
          questions: [
            {
              question: "What should you base your budget on if you have irregular income?",
              options: [
                "Your highest monthly income",
                "Your average monthly income",
                "Your lowest monthly income",
                "Your most recent month's income",
              ],
              correctAnswer: "Your lowest monthly income",
              explanation:
                "When you have irregular income, you should base your budget on your lowest monthly income to ensure you can always cover essential expenses, even in lean months.",
            },
          ],
        },
      },
      {
        title: "Expense Categories and Tracking",
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "Understanding Where Your Money Goes",
          },
          {
            type: "paragraph",
            content:
              "Effective expense tracking is the cornerstone of successful budgeting. You can't manage what you don't measure. By categorizing and tracking your expenses, you'll discover spending patterns, identify areas for improvement, and make informed decisions about where to allocate your money.",
          },
          {
            type: "list",
            content: "Major expense categories:",
            items: [
              "Housing: Rent/mortgage, utilities, maintenance, property taxes",
              "Transportation: Car payments, gas, insurance, maintenance, public transit",
              "Food: Groceries, dining out, work lunches, coffee",
              "Healthcare: Insurance premiums, copays, medications, dental",
              "Personal: Clothing, haircuts, gym memberships, subscriptions",
              "Entertainment: Movies, concerts, hobbies, streaming services",
            ],
          },
          {
            type: "calculation",
            content: "Expense ratio analysis:",
            formula: "Category Percentage = Category Spending ÷ Total Income × 100",
            variables: {
              "Housing example": "$1,500 rent ÷ $4,000 income = 37.5%",
              "Recommended housing": "25-30% of gross income",
              "Transportation": "10-15% of gross income",
              "Food": "10-15% of gross income",
            },
          },
          {
            type: "example",
            content:
              "Expense Discovery: When Janet started tracking expenses, she discovered she was spending $450/month on food delivery and coffee shops - money she didn't even realize she was spending. By meal prepping and making coffee at home, she reduced this to $150/month, freeing up $300 for her emergency fund.",
          },
          {
            type: "list",
            content: "Fixed vs. variable expenses:",
            items: [
              "Fixed expenses: Same amount each month (rent, insurance, loan payments)",
              "Variable expenses: Change monthly (utilities, groceries, gas)",
              "Periodic expenses: Occur irregularly (car registration, gifts, vacations)",
              "Discretionary expenses: Optional spending (entertainment, dining out)",
              "Emergency expenses: Unexpected costs (car repairs, medical bills)",
            ],
          },
          {
            type: "case-study",
            content:
              "Subscription Audit Success: Mark discovered he was paying for 12 different subscriptions totaling $180/month, including three streaming services he rarely used and a gym membership he hadn't used in months. By canceling unused subscriptions, he saved $120/month ($1,440 annually) without impacting his lifestyle.",
          },
          {
            type: "list",
            content: "Expense tracking methods:",
            items: [
              "Manual tracking: Write down every expense in a notebook or spreadsheet",
              "Bank/credit card statements: Review monthly statements and categorize",
              "Budgeting apps: Automatically categorize transactions",
              "Receipt collection: Save and categorize all receipts weekly",
              "Cash envelope system: Use cash for variable categories",
              "Hybrid approach: Combine multiple methods for accuracy",
            ],
          },
          {
            type: "list",
            content: "Common expense tracking mistakes:",
            items: [
              "Not tracking small purchases (coffee, snacks, apps)",
              "Forgetting cash transactions",
              "Inconsistent categorization of similar expenses",
              "Not accounting for annual or quarterly expenses",
              "Giving up after a few weeks of tracking",
              "Being too detailed initially and getting overwhelmed",
            ],
          },
          {
            type: "list",
            content: "Strategies for reducing expenses:",
            items: [
              "The 24-hour rule: Wait before making non-essential purchases",
              "Subscription audit: Review and cancel unused services monthly",
              "Comparison shopping: Research before major purchases",
              "Generic alternatives: Try store brands and generic products",
              "Negotiate bills: Call providers to ask for better rates",
              "DIY approach: Learn to do things yourself when practical",
            ],
          },
          {
            type: "tip",
            content:
              "Start with broad categories when tracking expenses. You can always get more detailed later. The goal is to build the habit first, then refine your system over time.",
          },
          {
            type: "warning",
            content:
              "Don't try to track every penny from day one - it's overwhelming and unsustainable. Focus on the big categories first, then gradually add detail as the habit becomes natural.",
          },
        ],
        keyTakeaways: [
          "Categorizing expenses helps identify spending patterns and opportunities",
          "Track both fixed and variable expenses for a complete picture",
          "Small, frequent expenses can add up to significant amounts",
          "Regular expense audits can reveal forgotten subscriptions and waste",
          "Start simple with tracking and add complexity gradually",
        ],
        quiz: {
          questions: [
            {
              question: "What percentage of gross income is typically recommended for housing expenses?",
              options: [
                "20-25%",
                "25-30%",
                "35-40%",
                "40-45%",
              ],
              correctAnswer: "25-30%",
              explanation:
                "Financial experts typically recommend spending no more than 25-30% of gross income on housing to maintain a healthy budget and leave room for other important expenses and savings.",
            },
            {
              question: "What are periodic expenses?",
              options: [
                "Expenses that occur every month",
                "Expenses that change in amount each month",
                "Expenses that occur irregularly throughout the year",
                "Expenses that are optional",
              ],
              correctAnswer: "Expenses that occur irregularly throughout the year",
              explanation:
                "Periodic expenses are those that don't occur monthly but happen irregularly throughout the year, such as car registration, insurance premiums, holiday gifts, or annual subscriptions.",
            },
          ],
        },
      },
      {
        title: "The 50/30/20 Budget Method",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "A Simple Framework for Financial Balance",
          },
          {
            type: "paragraph",
            content:
              "The 50/30/20 budget is a simple, flexible framework that divides your after-tax income into three categories: 50% for needs, 30% for wants, and 20% for savings and debt repayment. This method provides structure while allowing flexibility, making it perfect for budgeting beginners or those who want a straightforward approach.",
          },
          {
            type: "list",
            content: "Breaking down the 50/30/20 rule:",
            items: [
              "50% Needs: Essential expenses you can't avoid (housing, utilities, groceries, minimum debt payments)",
              "30% Wants: Discretionary spending that enhances your lifestyle (dining out, entertainment, hobbies)",
              "20% Savings & Debt: Emergency fund, retirement savings, extra debt payments beyond minimums",
            ],
          },
          {
            type: "calculation",
            content: "50/30/20 budget example:",
            formula: "After-tax Income × Percentage = Category Budget",
            variables: {
              "Monthly after-tax income": "$4,000",
              "Needs (50%)": "$4,000 × 0.50 = $2,000",
              "Wants (30%)": "$4,000 × 0.30 = $1,200",
              "Savings & Debt (20%)": "$4,000 × 0.20 = $800",
            },
          },
          {
            type: "example",
            content:
              "50/30/20 Success Story: Emma earns $5,000 monthly after taxes. She allocates $2,500 to needs (rent, utilities, groceries, car payment), $1,500 to wants (dining out, shopping, entertainment), and $1,000 to savings and extra debt payments. This structure helped her pay off $20,000 in student loans in 3 years while still enjoying life.",
          },
          {
            type: "list",
            content: "What counts as 'needs' vs 'wants':",
            items: [
              "Needs: Housing, utilities, groceries, transportation, insurance, minimum debt payments, basic clothing",
              "Wants: Dining out, entertainment, cable TV, gym memberships, hobbies, shopping, premium brands",
              "Gray areas: Internet (need for work, want for entertainment), phone (basic plan = need, premium = want)",
            ],
          },
          {
            type: "case-study",
            content:
              "Adapting the Rule: John's housing costs were 40% of his income due to living in an expensive city. He modified the rule to 60/20/20, reducing his wants category but maintaining his 20% savings rate. After two years, he moved to a lower-cost area and returned to the standard 50/30/20 allocation.",
          },
          {
            type: "list",
            content: "Advantages of the 50/30/20 method:",
            items: [
              "Simple to understand and implement",
              "Flexible - percentages can be adjusted for your situation",
              "Balances financial responsibility with lifestyle enjoyment",
              "Automatically prioritizes savings and debt repayment",
              "Works with any income level",
              "Reduces decision fatigue about spending categories",
            ],
          },
          {
            type: "list",
            content: "When to modify the 50/30/20 rule:",
            items: [
              "High-cost living areas: May need 60/20/20 temporarily",
              "Aggressive debt payoff: Consider 50/20/30 to accelerate payments",
              "High income earners: Can often do 50/20/30 or better",
              "Low income situations: Focus on needs first, adjust percentages as income grows",
              "Major life changes: Temporarily adjust during transitions",
            ],
          },
          {
            type: "tip",
            content:
              "If you can't make the 50/30/20 percentages work initially, start with any savings rate you can manage and gradually work toward the 20% goal as you optimize your spending.",
          },
          {
            type: "warning",
            content:
              "Don't sacrifice the 20% savings category to fund wants. If money is tight, reduce the wants category first. Your future self will thank you for prioritizing savings.",
          },
        ],
        keyTakeaways: [
          "The 50/30/20 rule provides a simple framework for balanced budgeting",
          "50% for needs, 30% for wants, 20% for savings and debt repayment",
          "The rule can be modified based on your specific circumstances",
          "Distinguishing between needs and wants is crucial for success",
          "Prioritize the 20% savings category even if other percentages need adjustment",
        ],
        quiz: {
          questions: [
            {
              question: "In the 50/30/20 budget, what should you do if your needs exceed 50% of your income?",
              options: [
                "Reduce your savings to 10%",
                "Eliminate the wants category entirely",
                "Look for ways to reduce your needs or increase income",
                "Ignore the rule completely",
              ],
              correctAnswer: "Look for ways to reduce your needs or increase income",
              explanation:
                "If your needs exceed 50%, you should look for ways to reduce essential expenses (like housing costs) or increase your income, rather than sacrificing savings or completely eliminating discretionary spending.",
            },
            {
              question: "Which of these would be considered a 'want' in the 50/30/20 budget?",
              options: [
                "Rent payment",
                "Grocery shopping",
                "Netflix subscription",
                "Car insurance",
              ],
              correctAnswer: "Netflix subscription",
              explanation:
                "A Netflix subscription is considered a 'want' because it's discretionary entertainment spending, not an essential expense needed for basic living.",
            },
          ],
        },
      },
      {
        title: "Zero-Based Budgeting",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Giving Every Dollar a Purpose",
          },
          {
            type: "paragraph",
            content:
              "Zero-based budgeting is a method where you assign every dollar of income to a specific category before the month begins, so that your income minus all your planned expenses and savings equals zero. This doesn't mean you spend everything - it means every dollar has a job, whether that's paying bills, building savings, or funding goals.",
          },
          {
            type: "list",
            content: "Core principles of zero-based budgeting:",
            items: [
              "Income - Expenses - Savings = $0",
              "Every dollar is assigned before you spend it",
              "Categories are funded based on priorities, not past spending",
              "Unused money in categories stays in the budget for next month",
              "Regular review and adjustment of category allocations",
              "Focus on intentional spending aligned with goals",
            ],
          },
          {
            type: "calculation",
            content: "Zero-based budget example:",
            formula: "Income - All Allocations = $0",
            variables: {
              "Monthly income": "$4,500",
              "Fixed expenses": "$2,800 (rent, utilities, insurance, loans)",
              "Variable expenses": "$900 (food, gas, personal care)",
              "Savings": "$600 (emergency fund, retirement)",
              "Fun money": "$200 (entertainment, dining out)",
              "Check": "$4,500 - $2,800 - $900 - $600 - $200 = $0 ✓",
            },
          },
          {
            type: "example",
            content:
              "Zero-Based Success: Maria implemented zero-based budgeting and discovered she had been unconsciously spending $300/month on miscellaneous items. By assigning every dollar a purpose, she redirected this money to specific goals: $150 to her vacation fund, $100 to extra mortgage payments, and $50 to a clothing fund.",
          },
          {
            type: "list",
            content: "Steps to create a zero-based budget:",
            items: [
              "List your total monthly income from all sources",
              "List all fixed expenses (same amount each month)",
              "Estimate variable expenses based on past spending",
              "Assign money to savings goals and debt payments",
              "Allocate remaining money to discretionary categories",
              "Adjust allocations until income minus all categories equals zero",
            ],
          },
          {
            type: "case-study",
            content:
              "Debt Payoff Acceleration: Using zero-based budgeting, the Thompson family found an extra $400/month they were previously spending unconsciously. They allocated this entirely to debt payments, allowing them to pay off $25,000 in credit card debt in 18 months instead of the minimum payment timeline of 8+ years.",
          },
          {
            type: "list",
            content: "Common zero-based budgeting challenges:",
            items: [
              "Perfectionism: Trying to get exact amounts from the start",
              "Over-categorization: Creating too many specific categories",
              "Rigidity: Not adjusting when life changes",
              "Guilt about fun money: Feeling bad about entertainment spending",
              "Partner disagreements: Different priorities for money allocation",
              "Irregular income: Difficulty planning when income varies",
            ],
          },
          {
            type: "list",
            content: "Zero-based budgeting best practices:",
            items: [
              "Start with broad categories and refine over time",
              "Include a 'miscellaneous' category for unexpected small expenses",
              "Review and adjust monthly based on actual spending",
              "Use last month's income to fund this month's budget",
              "Automate fixed expenses and savings to reduce decisions",
              "Have regular budget meetings if you share finances",
            ],
          },
          {
            type: "tip",
            content:
              "If you have money left over after assigning all categories, don't just leave it unallocated. Put it toward your highest priority goal, whether that's debt payoff, emergency fund, or investments.",
          },
          {
            type: "warning",
            content:
              "Don't make your zero-based budget so detailed that it becomes overwhelming to maintain. Start simple and add complexity only if it helps you make better financial decisions.",
          },
        ],
        keyTakeaways: [
          "Zero-based budgeting assigns every dollar a specific purpose",
          "Income minus all allocations should equal zero",
          "This method promotes intentional spending aligned with priorities",
          "Start simple and refine categories over time",
          "Regular review and adjustment are essential for success",
        ],
        quiz: {
          questions: [
            {
              question: "In zero-based budgeting, what does it mean when income minus expenses equals zero?",
              options: [
                "You have no money left to spend",
                "You've spent all your money",
                "Every dollar has been assigned a purpose",
                "You're living paycheck to paycheck",
              ],
              correctAnswer: "Every dollar has been assigned a purpose",
              explanation:
                "When income minus expenses equals zero in zero-based budgeting, it means every dollar has been intentionally assigned to a category (including savings), not that you've spent everything.",
            },
          ],
        },
      },
      {
        title: "Envelope Budgeting System",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Physical Boundaries for Spending Control",
          },
          {
            type: "paragraph",
            content:
              "The envelope budgeting system uses physical cash divided into labeled envelopes for different spending categories. When an envelope is empty, you're done spending in that category for the month. This method provides tangible spending limits and helps prevent overspending through the psychological impact of handling physical money.",
          },
          {
            type: "list",
            content: "How envelope budgeting works:",
            items: [
              "Determine your budget for variable expense categories",
              "Withdraw cash for these categories at the beginning of each month",
              "Put cash into labeled envelopes for each category",
              "Spend only from the appropriate envelope for each purchase",
              "When an envelope is empty, you're done spending in that category",
              "Any leftover money can be saved or moved to next month",
            ],
          },
          {
            type: "example",
            content:
              "Envelope Success Story: After years of overspending on groceries and entertainment, Lisa switched to envelope budgeting for these categories. She allocated $400 for groceries and $200 for entertainment monthly. The physical limitation of cash helped her stick to her budget, and she saved $300/month compared to her previous card-based spending.",
          },
          {
            type: "list",
            content: "Best categories for envelope budgeting:",
            items: [
              "Groceries: Easy to overspend with cards, cash creates awareness",
              "Entertainment: Movies, concerts, bars, recreational activities",
              "Dining out: Restaurants, coffee shops, takeout orders",
              "Personal care: Haircuts, cosmetics, clothing",
              "Gas: If you tend to overspend on premium fuel or extras",
              "Miscellaneous: Small purchases that add up over time",
            ],
          },
          {
            type: "case-study",
            content:
              "Family Envelope System: The Martinez family struggled with overspending on groceries and kids' activities. They implemented envelopes for groceries ($600), kids' activities ($300), and family entertainment ($200). The visual nature helped their children understand spending limits, and the family saved $400/month while still enjoying activities.",
          },
          {
            type: "list",
            content: "Modern envelope variations:",
            items: [
              "Digital envelopes: Apps that simulate envelope budgeting with cards",
              "Multiple checking accounts: Separate accounts for different categories",
              "Prepaid cards: Load specific amounts for different spending categories",
              "Hybrid system: Cash for some categories, digital tracking for others",
              "Weekly envelopes: Divide monthly amounts into weekly portions",
            ],
          },
          {
            type: "list",
            content: "Envelope budgeting pros and cons:",
            items: [
              "Pros: Prevents overspending, increases spending awareness, simple to understand",
              "Pros: Helps break credit card dependence, teaches delayed gratification",
              "Cons: Inconvenient for online purchases, security concerns with cash",
              "Cons: Doesn't work for all expense categories, requires discipline to maintain",
            ],
          },
          {
            type: "tip",
            content:
              "Start with just 2-3 categories where you tend to overspend most. Once you master those, you can expand to other categories if desired.",
          },
          {
            type: "warning",
            content:
              "Don't carry large amounts of cash or leave envelopes unsecured. Consider using a safe or bank deposit box for storing envelope money at home.",
          },
        ],
        keyTakeaways: [
          "Envelope budgeting uses physical cash to create spending boundaries",
          "When the envelope is empty, spending stops for that category",
          "Works best for variable expenses where overspending is common",
          "Modern variations include digital envelopes and separate accounts",
          "The psychological impact of cash helps reduce overspending",
        ],
        quiz: {
          questions: [
            {
              question: "What happens when an envelope is empty in envelope budgeting?",
              options: [
                "You borrow from another envelope",
                "You stop spending in that category for the month",
                "You use your credit card instead",
                "You withdraw more cash from the bank",
              ],
              correctAnswer: "You stop spending in that category for the month",
              explanation:
                "The core principle of envelope budgeting is that when an envelope is empty, you stop spending in that category until the next month when you refill the envelopes.",
            },
          ],
        },
      },
      {
        title: "Budgeting for Irregular Income",
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "Managing Money When Income Fluctuates",
          },
          {
            type: "paragraph",
            content:
              "Budgeting with irregular income requires a different approach than traditional monthly budgeting. Whether you're freelancing, working on commission, running a seasonal business, or have variable hours, you need strategies that account for income fluctuations while ensuring your essential expenses are always covered.",
          },
          {
            type: "list",
            content: "Common sources of irregular income:",
            items: [
              "Freelancing and consulting work",
              "Commission-based sales jobs",
              "Seasonal employment (retail, tourism, agriculture)",
              "Small business ownership",
              "Gig economy work (rideshare, delivery, task-based)",
              "Investment income and rental properties",
            ],
          },
          {
            type: "calculation",
            content: "Baseline budget calculation:",
            formula: "Baseline Budget = Lowest Monthly Income in Past 12 Months",
            variables: {
              "Example income range": "$2,000 - $6,000 per month",
              "Baseline budget": "$2,000 (lowest month)",
              "Essential expenses": "$1,800 (housing, food, utilities, insurance)",
              "Buffer": "$200 for small emergencies",
              "Excess income strategy": "Save high-income months for low-income months",
            },
          },
          {
            type: "example",
            content:
              "Freelancer Success: Jake's income ranges from $3,000-$8,000 monthly. He built his budget around $3,000 and saves excess income in good months. He maintains a separate 'income smoothing' account with 3 months of expenses ($9,000) to cover shortfalls, allowing him to maintain consistent spending despite variable income.",
          },
          {
            type: "list",
            content: "Irregular income budgeting strategies:",
            items: [
              "Build budget around lowest expected monthly income",
              "Create an income smoothing account for excess earnings",
              "Prioritize expenses: essentials first, wants only with excess income",
              "Build a larger emergency fund (6-12 months vs. 3-6 months)",
              "Use percentage-based budgeting instead of fixed dollar amounts",
              "Track income patterns to predict seasonal variations",
            ],
          },
          {
            type: "case-study",
            content:
              "Seasonal Business Management: Sarah runs a landscaping business earning $15,000/month in summer but only $2,000/month in winter. She saves 60% of summer income to cover winter expenses and maintains her lifestyle year-round. She also uses winter months to plan, market, and prepare for the next season.",
          },
          {
            type: "list",
            content: "Income smoothing account strategy:",
            items: [
              "Open a separate high-yield savings account for income smoothing",
              "Deposit excess income above your baseline budget",
              "Withdraw from this account during low-income months",
              "Aim to maintain 3-6 months of baseline expenses in this account",
              "Don't touch this money for wants or non-essential purchases",
              "Replenish immediately when income increases again",
            ],
          },
          {
            type: "list",
            content: "Percentage-based budgeting for irregular income:",
            items: [
              "Allocate percentages instead of fixed dollar amounts",
              "Example: 40% needs, 20% taxes, 20% savings, 20% wants",
              "Adjust percentages based on income level each month",
              "Higher income months: Increase savings percentage",
              "Lower income months: Focus on needs, reduce wants",
              "Always set aside money for taxes if self-employed",
            ],
          },
          {
            type: "tip",
            content:
              "Track your income patterns for at least a year to identify seasonal trends. This helps you predict and prepare for naturally lower-income periods.",
          },
          {
            type: "warning",
            content:
              "Don't increase your lifestyle expenses during high-income months. Lifestyle inflation is especially dangerous with irregular income because it makes low-income periods much more stressful.",
          },
        ],
        keyTakeaways: [
          "Base your budget on your lowest expected monthly income",
          "Create an income smoothing account to handle fluctuations",
          "Build a larger emergency fund for irregular income situations",
          "Use percentage-based budgeting instead of fixed dollar amounts",
          "Track income patterns to predict and prepare for variations",
        ],
        quiz: {
          questions: [
            {
              question: "What should you base your budget on if you have irregular income?",
              options: [
                "Your highest monthly income",
                "Your average monthly income over the past year",
                "Your lowest monthly income in the past 12 months",
                "Your most recent month's income",
              ],
              correctAnswer: "Your lowest monthly income in the past 12 months",
              explanation:
                "You should base your budget on your lowest monthly income to ensure you can always cover essential expenses, even in your worst-earning months.",
            },
            {
              question: "How large should your emergency fund be with irregular income?",
              options: [
                "1-2 months of expenses",
                "3-4 months of expenses",
                "6-12 months of expenses",
                "$10,000 regardless of expenses",
              ],
              correctAnswer: "6-12 months of expenses",
              explanation:
                "People with irregular income should maintain larger emergency funds (6-12 months) compared to those with steady income (3-6 months) due to the unpredictability of their earnings.",
            },
          ],
        },
      },
      {
        title: "Budget Review and Adjustment",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Keeping Your Budget Relevant and Effective",
          },
          {
            type: "paragraph",
            content:
              "A budget is not a set-it-and-forget-it tool. Regular review and adjustment are essential for maintaining an effective budget that adapts to your changing life circumstances, income fluctuations, and evolving financial goals. The most successful budgeters treat their budget as a living document that grows and changes with them.",
          },
          {
            type: "list",
            content: "When to review your budget:",
            items: [
              "Monthly: Compare actual spending to budgeted amounts",
              "Quarterly: Assess progress toward financial goals",
              "Annually: Major review of all categories and goals",
              "Life changes: Job changes, marriage, divorce, new baby",
              "Income changes: Raises, bonuses, job loss, side hustle income",
              "Goal completion: When you achieve or abandon financial goals",
            ],
          },
          {
            type: "calculation",
            content: "Budget variance analysis:",
            formula: "Variance = Actual Spending - Budgeted Amount",
            variables: {
              "Example": "Groceries budgeted $400, actual $480",
              "Variance": "$480 - $400 = +$80 (over budget)",
              "Percentage over": "$80 ÷ $400 = 20% over budget",
              "Action needed": "Investigate cause and adjust budget or behavior",
            },
          },
          {
            type: "example",
            content:
              "Budget Evolution: When Tom got married, his budget needed major adjustments. His housing costs decreased (shared rent), but food and entertainment costs increased. He also added new categories for joint savings goals and adjusted his individual goals to family goals. Regular monthly reviews helped them find the right balance.",
          },
          {
            type: "list",
            content: "Key metrics to track during reviews:",
            items: [
              "Spending variance by category (over/under budget)",
              "Savings rate percentage (savings ÷ income)",
              "Debt-to-income ratio for debt payoff progress",
              "Emergency fund months of coverage",
              "Progress toward specific financial goals",
              "Overall cash flow (positive or negative)",
            ],
          },
          {
            type: "case-study",
            content:
              "Budget Adjustment Success: Maria's initial budget allocated $300/month for dining out, but she consistently spent $500. Instead of feeling guilty, she analyzed her spending and realized she valued social dining experiences. She adjusted by reducing her clothing budget from $200 to $100 and increasing dining to $400, creating a sustainable budget aligned with her values.",
          },
          {
            type: "list",
            content: "Common reasons for budget adjustments:",
            items: [
              "Underestimating category amounts initially",
              "Life changes requiring new expense categories",
              "Seasonal variations in spending patterns",
              "Income increases allowing for goal acceleration",
              "Inflation affecting fixed and variable expenses",
              "Changing priorities and values over time",
            ],
          },
          {
            type: "list",
            content: "Budget review process:",
            items: [
              "Gather all financial statements and receipts",
              "Compare actual spending to budgeted amounts by category",
              "Identify categories with significant variances",
              "Analyze reasons for overspending or underspending",
              "Adjust budget amounts or spending behavior as needed",
              "Update financial goals and timelines if necessary",
            ],
          },
          {
            type: "list",
            content: "Signs your budget needs adjustment:",
            items: [
              "Consistently overspending in multiple categories",
              "Feeling deprived or restricted by budget limits",
              "Not making progress toward financial goals",
              "Frequently borrowing from other categories",
              "Major life changes affecting income or expenses",
              "Budget categories no longer reflect your priorities",
            ],
          },
          {
            type: "tip",
            content:
              "Don't abandon your budget if you overspend in a category. Instead, analyze why it happened and adjust either the budget amount or your spending behavior. Flexibility is key to long-term success.",
          },
          {
            type: "warning",
            content:
              "Avoid constantly adjusting your budget to justify overspending. Some discipline is required. Only make adjustments when there's a legitimate reason, not just because you want to spend more.",
          },
        ],
        keyTakeaways: [
          "Regular budget reviews are essential for maintaining effectiveness",
          "Track key metrics like spending variance and savings rate",
          "Adjust budgets for life changes, not just to justify overspending",
          "Flexibility and adaptation are key to long-term budgeting success",
          "Use variance analysis to identify areas needing attention",
        ],
        quiz: {
          questions: [
            {
              question: "How often should you review your budget in detail?",
              options: [
                "Weekly",
                "Monthly",
                "Quarterly",
                "Annually",
              ],
              correctAnswer: "Monthly",
              explanation:
                "You should review your budget monthly to compare actual spending to budgeted amounts and make necessary adjustments. This frequency allows you to catch issues early while not being overly burdensome.",
            },
            {
              question: "What should you do if you consistently overspend in a budget category?",
              options: [
                "Ignore it and hope it gets better",
                "Abandon budgeting entirely",
                "Analyze the reason and adjust the budget or behavior",
                "Feel guilty and restrict spending in other areas",
              ],
              correctAnswer: "Analyze the reason and adjust the budget or behavior",
              explanation:
                "Consistent overspending indicates either an unrealistic budget amount or a spending behavior that needs addressing. Analyze the cause and make appropriate adjustments to either the budget or your habits.",
            },
          ],
        },
      },
      {
        title: "Budgeting Tools and Apps",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Technology to Simplify Budget Management",
          },
          {
            type: "paragraph",
            content:
              "Modern budgeting tools and apps can automate much of the tedious work involved in budget management, from categorizing transactions to tracking progress toward goals. The key is choosing tools that match your budgeting style and actually help you stick to your financial plan rather than adding complexity.",
          },
          {
            type: "list",
            content: "Types of budgeting tools:",
            items: [
              "Comprehensive apps: All-in-one budgeting, tracking, and goal management",
              "Bank-specific tools: Built into your bank's mobile app or website",
              "Spreadsheet templates: Customizable Excel or Google Sheets budgets",
              "Envelope apps: Digital versions of envelope budgeting",
              "Expense tracking apps: Focus on categorizing and tracking spending",
              "Goal-specific apps: Designed for debt payoff or savings goals",
            ],
          },
          {
            type: "example",
            content:
              "Tool Selection Success: After trying several complex budgeting apps, Jennifer found success with a simple combination: her bank's app for expense tracking and categorization, plus a basic spreadsheet for goal tracking and monthly budget planning. This simple setup reduced her budget management time from 2 hours to 30 minutes monthly.",
          },
          {
            type: "list",
            content: "Popular budgeting apps and their strengths:",
            items: [
              "Mint: Free, comprehensive, connects all accounts, good for beginners",
              "YNAB: Proactive budgeting philosophy, excellent for debt payoff",
              "Personal Capital: Strong investment tracking, net worth focus",
              "PocketGuard: Simple interface, prevents overspending",
              "Goodbudget: Envelope budgeting method, good for cash users",
              "EveryDollar: Zero-based budgeting, created by Dave Ramsey team",
            ],
          },
          {
            type: "case-study",
            content:
              "App Integration Strategy: The Rodriguez family uses Mint to automatically categorize transactions and track spending, YNAB for detailed monthly budget planning, and Personal Capital to monitor their investment accounts and net worth. Each app serves a specific purpose in their comprehensive financial management system.",
          },
          {
            type: "list",
            content: "Features to look for in budgeting tools:",
            items: [
              "Automatic transaction import and categorization",
              "Goal setting and progress tracking
