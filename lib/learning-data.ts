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
    "debt-management": [
      {
        title: "Understanding Different Types of Debt",
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "The Complete Debt Landscape",
          },
          {
            type: "paragraph",
            content:
              "Not all debt is created equal. Understanding the different types of debt, their characteristics, and how they impact your financial health is crucial for making informed borrowing decisions and creating effective payoff strategies.",
          },
          {
            type: "list",
            content: "Secured vs. Unsecured Debt:",
            items: [
              "Secured debt: Backed by collateral (home, car, etc.)",
              "Lower interest rates due to reduced lender risk",
              "Collateral can be repossessed if payments are missed",
              "Examples: Mortgages, auto loans, home equity loans",
              "Unsecured debt: No collateral backing the loan",
              "Higher interest rates due to increased lender risk",
              "Examples: Credit cards, personal loans, student loans",
            ],
          },
          {
            type: "list",
            content: "Good Debt vs. Bad Debt:",
            items: [
              "Good debt: Helps build wealth or increase income potential",
              "Mortgages: Build equity and provide tax benefits",
              "Student loans: Invest in education and earning potential",
              "Business loans: Generate income and build assets",
              "Bad debt: Depreciating assets or consumption",
              "Credit card debt: High interest, no asset backing",
              "Auto loans: Depreciating asset, though sometimes necessary",
              "Payday loans: Extremely high interest, predatory terms",
            ],
          },
          {
            type: "calculation",
            content: "Debt-to-Income Ratio Calculation:",
            formula: "DTI = (Total Monthly Debt Payments ÷ Gross Monthly Income) × 100",
            variables: {
              "Total Monthly Debt Payments": "All minimum debt payments",
              "Gross Monthly Income": "Income before taxes",
              "Good DTI": "Below 36% total, below 28% for housing",
              "Concerning DTI": "Above 40%",
            },
          },
          {
            type: "example",
            content:
              "Debt Portfolio Analysis: Sarah has a $1,500 mortgage (good debt building equity), $300 student loan (good debt from education), $200 car payment (necessary but depreciating), and $150 credit card minimum (bad debt from consumption). Total: $2,150 monthly on $6,000 income = 36% DTI.",
          },
          {
            type: "list",
            content: "Common types of consumer debt:",
            items: [
              "Credit cards: Revolving credit, variable rates (15-25% APR)",
              "Personal loans: Fixed payments, fixed rates (6-36% APR)",
              "Auto loans: Secured by vehicle (3-10% APR)",
              "Student loans: Federal (3-6% APR) vs. Private (4-12% APR)",
              "Home equity loans/HELOC: Secured by home (4-8% APR)",
              "Payday loans: Short-term, extremely high cost (400%+ APR)",
            ],
          },
          {
            type: "list",
            content: "Debt characteristics to evaluate:",
            items: [
              "Interest rate (APR): Total cost of borrowing",
              "Payment terms: Length and flexibility of repayment",
              "Fees: Origination, late payment, prepayment penalties",
              "Tax implications: Deductible interest vs. non-deductible",
              "Collateral requirements: What you risk losing",
              "Credit impact: How it affects your credit score",
            ],
          },
          {
            type: "case-study",
            content:
              "Debt Prioritization: Mark had $5,000 in credit cards (22% APR), $15,000 student loans (4% APR), and $200,000 mortgage (3.5% APR). He focused extra payments on credit cards first due to high interest, while maintaining minimums on the lower-rate 'good debt.'",
          },
          {
            type: "warning",
            content:
              "Avoid payday loans, title loans, and other predatory lending products. These often trap borrowers in cycles of debt with extremely high costs and aggressive collection practices.",
          },
          {
            type: "tip",
            content:
              "Before taking on any new debt, calculate the total cost over the life of the loan, not just the monthly payment. A longer loan term might have lower payments but much higher total interest costs.",
          },
        ],
        keyTakeaways: [
          "Secured debt typically has lower rates but puts collateral at risk",
          "Good debt builds wealth; bad debt finances consumption",
          "Interest rates and terms vary dramatically between debt types",
          "Debt-to-income ratio is a key measure of financial health",
        ],
        quiz: {
          questions: [
            {
              question: "Which of the following is typically considered 'good debt'?",
              options: [
                "Credit card debt for vacation expenses",
                "A mortgage on your primary residence",
                "A payday loan for emergency expenses",
                "An auto loan for a luxury car",
              ],
              correctAnswer: "A mortgage on your primary residence",
              explanation:
                "A mortgage is considered good debt because it helps you build equity in an appreciating asset (your home) and often provides tax benefits through deductible interest.",
            },
          ],
        },
      },
      {
        title: "Debt Avalanche vs. Debt Snowball Methods",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Strategic Debt Payoff Methods",
          },
          {
            type: "paragraph",
              content:
                "The debt avalanche and debt snowball are two proven strategies for paying off multiple debts. Each has distinct advantages and works better for different personality types and financial situations. Understanding both helps you choose the right approach.",
          },
          {
            type: "list",
            content: "Debt Avalanche Method:",
            items: [
              "Pay minimums on all debts",
              "Put extra money toward highest interest rate debt first",
              "Once highest rate debt is paid off, move to next highest",
              "Mathematically optimal - saves the most money",
              "Best for disciplined people motivated by numbers",
              "Can take longer to see initial progress",
            ],
          },
          {
            type: "list",
            content: "Debt Snowball Method:",
            items: [
              "Pay minimums on all debts",
              "Put extra money toward smallest balance first",
              "Once smallest debt is paid off, move to next smallest",
              "Provides quick psychological wins",
              "Best for people motivated by visible progress",
              "May cost more in total interest over time",
            ],
          },
          {
            type: "calculation",
            content: "Comparing payoff methods:",
            formula: "Total Interest = Sum of (Balance × Rate × Time) for each debt",
            variables: {
              Balance: "Outstanding amount owed",
              Rate: "Annual interest rate",
              Time: "Years to pay off",
              "Avalanche": "Usually results in lower total interest",
              "Snowball": "May result in higher total interest but faster motivation",
            },
          },
          {
            type: "example",
            content:
              "Method Comparison: $2,000 credit card (24% APR), $5,000 personal loan (12% APR), $1,500 store card (18% APR). Avalanche order: Credit card → Store card → Personal loan. Snowball order: Store card → Credit card → Personal loan.",
          },
          {
            type: "case-study",
            content:
              "Real-World Results: Twin sisters with identical $25,000 debt loads. Amy used avalanche method, saved $2,100 in interest over 3 years. Beth used snowball, paid $1,800 more in interest but stayed motivated and finished 2 months faster due to consistency.",
          },
          {
            type: "list",
            content: "Hybrid approaches:",
            items: [
              "Avalanche with small debt exception: Pay off debts under $500 first",
              "Snowball with high-rate exception: Tackle rates over 25% first",
              "Emotional debt first: Pay off debts causing the most stress",
              "Time-based hybrid: Switch methods after achieving early wins",
              "Balance-adjusted avalanche: Consider both rate and balance size",
              "Seasonal approach: Use tax refunds/bonuses for largest impact",
            ],
          },
          {
            type: "list",
            content: "Choosing the right method for you:",
            items: [
              "Avalanche if: You're motivated by math and saving money",
              "Avalanche if: You have discipline and long-term focus",
              "Snowball if: You need quick wins to stay motivated",
              "Snowball if: You've failed at debt payoff before",
              "Hybrid if: You want to balance math and psychology",
              "Consider your personality and past financial behavior",
            ],
          },
          {
            type: "list",
            content: "Maximizing either method:",
            items: [
              "List all debts with balances, rates, and minimum payments",
              "Find extra money through budgeting and expense reduction",
              "Automate minimum payments to avoid late fees",
              "Put any windfall money toward debt payoff",
              "Track progress visually with charts or apps",
              "Celebrate milestones to maintain motivation",
            ],
          },
          {
            type: "list",
            content: "Common mistakes with both methods:",
            items: [
              "Not making minimum payments on all debts",
              "Adding new debt while paying off existing debt",
              "Switching methods frequently without giving one a chance",
              "Not having a plan for extra payments",
              "Ignoring the psychological aspects of debt payoff",
              "Stopping the plan when motivation wanes",
            ],
          },
          {
            type: "tip",
            content:
              "The best debt payoff method is the one you'll actually stick with. If you're unsure, try the snowball method first for quick wins, then switch to avalanche once you build momentum and confidence.",
          },
        ],
        keyTakeaways: [
          "Debt avalanche saves more money by targeting highest interest rates first",
          "Debt snowball provides quicker psychological wins by eliminating small debts",
          "Hybrid approaches can balance mathematical optimization with motivation",
          "The best method is the one you'll consistently follow",
        ],
        quiz: {
          questions: [
            {
              question: "What is the primary advantage of the debt avalanche method?",
              options: [
                "It provides quick psychological wins",
                "It's easier to understand and follow",
                "It saves the most money in total interest",
                "It works better for people with many small debts",
              ],
              correctAnswer: "It saves the most money in total interest",
              explanation:
                "The debt avalanche method is mathematically optimal because it targets the highest interest rate debts first, minimizing the total amount of interest paid over time.",
            },
          ],
        },
      },
      {
        title: "Creating a Debt Payoff Plan",
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "Building Your Debt Freedom Roadmap",
          },
          {
            type: "paragraph",
              content:
                "A successful debt payoff plan requires more than just choosing avalanche or snowball. You need a comprehensive strategy that includes budgeting, timeline planning, motivation systems, and contingency plans for setbacks.",
          },
          {
            type: "list",
            content: "Step 1: Complete debt inventory:",
            items: [
              "List every debt with current balance",
              "Record interest rates (APR) for each debt",
              "Note minimum monthly payments",
              "Include account numbers and contact information",
              "Calculate total debt amount",
              "Identify secured vs. unsecured debts",
            ],
          },
          {
            type: "calculation",
            content: "Debt payoff timeline calculation:",
            formula: "Months to Payoff = -log(1 - (Balance × Rate/12) / Payment) / log(1 + Rate/12)",
            variables: {
              Balance: "Current debt balance",
              Rate: "Annual interest rate (as decimal)",
              Payment: "Monthly payment amount",
              Result: "Number of months to pay off debt",
            },
          },
          {
            type: "example",
            content:
              "Debt Inventory Example: Credit Card A: $3,500 balance, 22% APR, $105 minimum. Credit Card B: $1,200 balance, 18% APR, $36 minimum. Personal Loan: $8,000 balance, 12% APR, $200 minimum. Total debt: $12,700, Total minimums: $341/month.",
          },
          {
            type: "list",
            content: "Step 2: Analyze your budget for extra payments:",
            items: [
              "Review monthly income and expenses",
              "Identify areas to cut spending temporarily",
              "Look for ways to increase income",
              "Calculate available money for extra debt payments",
              "Set realistic but aggressive payment goals",
              "Plan for irregular income or expenses",
            ],
          },
          {
            type: "list",
            content: "Step 3: Choose and implement your strategy:",
            items: [
              "Select avalanche, snowball, or hybrid method",
              "Create payment schedule and timeline",
              "Set up automatic payments for minimums",
              "Plan how to allocate extra payments",
              "Create visual tracking system",
              "Set milestone rewards and celebrations",
            ],
          },
          {
            type: "case-study",
            content:
              "Complete Plan Example: Maria had $18,000 in debt across 4 accounts. She found $400/month extra through budgeting, chose debt avalanche, and created a 3.5-year payoff plan. She automated minimums, tracked progress monthly, and celebrated each debt elimination.",
          },
          {
            type: "list",
            content: "Step 4: Build motivation and accountability systems:",
            items: [
              "Share goals with supportive friends or family",
              "Join online debt payoff communities",
              "Create visual progress charts or thermometers",
              "Set up milestone rewards (non-debt creating)",
              "Track multiple metrics (balance, payments made, interest saved)",
              "Plan how to handle setbacks and maintain motivation",
            ],
          },
          {
            type: "list",
            content: "Step 5: Plan for obstacles and setbacks:",
            items: [
              "Build small emergency fund ($1,000) before aggressive payoff",
              "Plan for irregular expenses that might derail progress",
              "Have strategies for income loss or reduction",
              "Know when to pause debt payoff for true emergencies",
              "Prepare mentally for the length of the journey",
              "Have backup plans if primary strategy isn't working",
            ],
          },
          {
            type: "list",
            content: "Tools and resources for debt payoff:",
            items: [
              "Debt payoff calculators and apps",
              "Spreadsheet templates for tracking",
              "Automatic payment systems",
              "Budgeting apps that track debt progress",
              "Online communities and support groups",
              "Financial counseling services (often free)",
            ],
          },
          {
            type: "list",
            content: "Monitoring and adjusting your plan:",
            items: [
              "Review progress monthly",
              "Adjust timeline based on actual results",
              "Celebrate milestones and victories",
              "Modify strategy if life circumstances change",
              "Track total interest saved",
              "Plan for life after debt payoff",
            ],
          },
          {
            type: "warning",
            content:
              "Don't sacrifice your emergency fund or retirement contributions for debt payoff unless the debt is extremely high interest (over 25% APR). Balance debt payoff with other financial priorities.",
          },
          {
            type: "tip",
            content:
              "Create a 'debt thermometer' visual showing your progress. Color in sections as you pay off debt - this simple visual can provide powerful motivation during difficult months.",
          },
        ],
        keyTakeaways: [
          "A complete debt inventory is the foundation of any payoff plan",
          "Find extra payment money through budgeting and income increases",
          "Build motivation systems and plan for obstacles",
          "Regular monitoring and adjustment keep you on track",
        ],
        quiz: {
          questions: [
            {
              question: "What should be your first step when creating a debt payoff plan?",
              options: [
                "Choose between avalanche and snowball methods",
                "Create a complete inventory of all your debts",
                "Cut all discretionary spending immediately",
                "Apply for a debt consolidation loan",
              ],
              correctAnswer: "Create a complete inventory of all your debts",
              explanation:
                "You can't create an effective payoff strategy without knowing exactly what you owe, the interest rates, and minimum payments for each debt. This inventory is the foundation of your plan.",
            },
          ],
        },
      },
      {
        title: "Debt Consolidation Options",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Simplifying and Reducing Your Debt Burden",
          },
          {
            type: "paragraph",
              content:
                "Debt consolidation can simplify payments and potentially reduce interest costs by combining multiple debts into a single payment. However, consolidation isn't always the best solution and requires careful evaluation of terms, costs, and your ability to avoid accumulating new debt.",
          },
          {
            type: "list",
            content: "Types of debt consolidation:",
            items: [
              "Personal loans: Unsecured loans to pay off multiple debts",
              "Balance transfer credit cards: 0% or low APR promotional rates",
              "Home equity loans/HELOC: Use home equity to pay off debt",
              "401(k) loans: Borrow from retirement savings",
              "Debt management plans: Work with credit counseling agency",
              "Debt settlement: Negotiate reduced payoffs (damages credit)",
            ],
          },
          {
            type: "calculation",
            content: "Consolidation savings calculation:",
            formula: "Monthly Savings = Current Total Payments - New Consolidated Payment",
            variables: {
              "Current Total Payments": "Sum of all current minimum payments",
              "New Consolidated Payment": "Payment on consolidation loan",
              "Interest Savings": "Difference in total interest over loan life",
              "Break-even Point": "When savings exceed consolidation costs",
            },
          },
          {
            type: "example",
            content:
              "Consolidation Example: $15,000 across 3 credit cards averaging 20% APR with $450 total minimums. Personal loan at 12% APR for $15,000 = $334 monthly payment. Monthly savings: $116, plus significant interest savings over time.",
          },
          {
            type: "list",
            content: "Personal loan consolidation:",
            items: [
              "Pros: Fixed rate, fixed payment, clear payoff date",
              "Pros: Often lower rates than credit cards",
              "Cons: May require good credit for best rates",
              "Cons: Origination fees (1-8% of loan amount)",
              "Best for: People with good credit and high-rate debt",
              "Typical rates: 6-36% APR depending on credit",
            ],
          },
          {
            type: "list",
            content: "Balance transfer credit cards:",
            items: [
              "Pros: 0% APR promotional periods (12-21 months)",
              "Pros: Can provide significant interest savings",
              "Cons: Balance transfer fees (3-5% of amount)",
              "Cons: High rates after promotional period ends",
              "Best for: People who can pay off debt during 0% period",
              "Requires: Good credit and disciplined payoff plan",
            ],
          },
          {
            type: "case-study",
            content:
              "Balance Transfer Success: Jake transferred $8,000 in credit card debt to a 0% APR card for 18 months. With a 3% transfer fee ($240), he saved over $2,000 in interest by paying off the debt during the promotional period.",
          },
          {
            type: "list",
            content: "Home equity consolidation:",
            items: [
              "Pros: Lowest interest rates, tax-deductible interest",
              "Pros: Large borrowing capacity",
              "Cons: Home is collateral - risk of foreclosure",
              "Cons: Closing costs and fees",
              "Best for: Homeowners with significant equity",
              "Warning: Don't use home equity for consumption debt",
            ],
          },
          {
            type: "list",
            content: "When consolidation makes sense:",
            items: [
              "You qualify for significantly lower interest rates",
              "You can simplify multiple payments into one",
              "You have a plan to avoid accumulating new debt",
              "The total cost (including fees) is lower than current debt",
              "You're committed to paying off the consolidated debt",
              "You have stable income to make the new payments",
            ],
          },
          {
            type: "list",
            content: "When to avoid consolidation:",
            items: [
              "You haven't addressed the spending habits that created debt",
              "The new loan has higher total costs than current debt",
              "You're considering risky options like 401(k) loans",
              "You're likely to accumulate new debt on paid-off cards",
              "The consolidation loan has variable rates that could increase",
              "You're using secured debt to pay off unsecured debt",
            ],
          },
          {
            type: "warning",
            content:
              "Consolidation only works if you change the behaviors that created the debt. Many people consolidate debt only to accumulate new debt on the paid-off credit cards, making their situation worse.",
          },
          {
            type: "tip",
            content:
              "If you consolidate credit card debt, consider closing the paid-off cards or reducing their credit limits to prevent the temptation to accumulate new debt.",
          },
        ],
        keyTakeaways: [
          "Consolidation can reduce rates and simplify payments",
          "Balance transfer cards offer temporary 0% rates for qualified borrowers",
          "Home equity options have low rates but put your home at risk",
          "Success requires changing spending habits, not just moving debt around",
        ],
        quiz: {
          questions: [
            {
              question: "What is the biggest risk of debt consolidation?",
              options: [
                "Higher interest rates on the new loan",
                "Accumulating new debt on paid-off credit cards",
                "Longer repayment terms",
                "Balance transfer fees",
              ],
              correctAnswer: "Accumulating new debt on paid-off credit cards",
              explanation:
                "The biggest risk is that people consolidate debt but don't change their spending habits, leading to new debt accumulation on the paid-off credit cards while still owing the consolidation loan.",
            },
          ],
        },
      },
      {
        title: "Negotiating with Creditors",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Working with Creditors to Find Solutions",
          },
          {
            type: "paragraph",
              content:
                "When facing financial hardship, negotiating with creditors can provide relief through modified payment plans, reduced interest rates, or other accommodations. Creditors often prefer working with you rather than dealing with defaults and collections.",
          },
          {
            type: "list",
            content: "When to contact creditors:",
            items: [
              "Before you miss any payments (proactive approach)",
              "When you anticipate income reduction or job loss",
              "After a major life event (medical emergency, divorce)",
              "When current payments are unsustainable",
              "If you're considering bankruptcy",
              "When you have a lump sum available for settlement",
            ],
          },
          {
            type: "list",
            content: "Types of hardship programs:",
            items: [
              "Payment deferrals: Temporary pause on payments",
              "Reduced payment plans: Lower monthly payments",
              "Interest rate reductions: Temporary or permanent rate cuts",
              "Fee waivers: Elimination of late fees or penalties",
              "Extended payment terms: Longer repayment period",
              "Principal reductions: Rare, but possible in extreme cases",
            ],
          },
          {
            type: "example",
            content:
              "Negotiation Success: After job loss, Tom contacted his credit card company before missing payments. They offered a 6-month hardship program with 50% reduced payments and 0% interest, giving him time to find new employment.",
          },
          {
            type: "list",
            content: "Preparation for creditor negotiations:",
            items: [
              "Gather all account information and payment history",
              "Document your financial hardship with specific details",
              "Calculate what you can realistically afford to pay",
              "Research the creditor's typical hardship programs",
              "Prepare a specific proposal or request",
              "Have alternative proposals ready if first is rejected",
            ],
          },
          {
            type: "list",
            content: "Negotiation strategies and tips:",
            items: [
              "Be honest about your situation and provide documentation",
              "Emphasize your desire to pay and avoid default",
              "Ask to speak with the hardship or retention department",
              "Be persistent but polite - you may need multiple calls",
              "Get any agreement in writing before making payments",
              "Keep detailed records of all communications",
            ],
          },
          {
            type: "case-study",
            content:
              "Medical Debt Negotiation: After a $25,000 hospital bill, Sarah negotiated a payment plan of $200/month with no interest. When she received an inheritance, she negotiated a lump-sum settlement for $15,000, saving $10,000.",
          },
          {
            type: "list",
            content: "What creditors want to hear:",
            items: [
              "Specific reasons for your financial hardship",
              "Your commitment to paying what you owe",
              "A realistic timeline for when your situation will improve",
              "Specific payment amounts you can afford",
              "Documentation supporting your hardship claims",
              "Your preference to work with them rather than default",
            ],
          },
          {
            type: "list",
            content: "Settlement negotiations:",
            items: [
              "Typically only available for severely delinquent accounts",
              "May require lump-sum payment of reduced amount",
              "Can significantly damage your credit score",
              "May result in taxable income for forgiven debt",
              "Should be last resort before bankruptcy",
              "Get settlement terms in writing before paying",
            ],
          },
          {
            type: "list",
            content: "Common negotiation mistakes:",
            items: [
              "Waiting until after missing payments to contact creditors",
              "Not getting agreements in writing",
              "Agreeing to payments you can't actually afford",
              "Not understanding the credit impact of settlements",
              "Failing to follow through on negotiated agreements",
              "Not keeping detailed records of conversations",
            ],
          },
          {
            type: "warning",
            content:
              "Be cautious of debt settlement companies that charge fees to negotiate on your behalf. You can negotiate directly with creditors for free, and many settlement companies make situations worse.",
          },
          {
            type: "tip",
            content:
              "Call creditors during business hours on weekdays when you're more likely to reach experienced representatives who have authority to approve hardship programs.",
          },
        ],
        keyTakeaways: [
          "Contact creditors before missing payments for best negotiation outcomes",
          "Hardship programs can provide temporary relief during financial difficulties",
          "Be prepared with documentation and realistic payment proposals",
          "Get all agreements in writing before making any payments",
        ],
        quiz: {
          questions: [
            {
              question: "When is the best time to contact creditors about payment difficulties?",
              options: [
                "After missing several payments",
                "Before you miss any payments",
                "Only when accounts go to collections",
                "After consulting with a debt settlement company",
              ],
              correctAnswer: "Before you miss any payments",
              explanation:
                "Contacting creditors proactively, before missing payments, shows good faith and makes them more likely to work with you on hardship programs or modified payment plans.",
            },
          ],
        },
      },
      {
        title: "Avoiding Debt Traps and Predatory Lending",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Protecting Yourself from Dangerous Debt Products",
          },
          {
            type: "paragraph",
              content:
                "Predatory lenders target vulnerable consumers with high-cost, high-risk debt products that can trap borrowers in cycles of debt. Understanding these products and their alternatives helps you avoid financial traps that can take years to escape.",
          },
          {
            type: "list",
            content: "Common predatory lending products:",
            items: [
              "Payday loans: Short-term, extremely high-cost loans",
              "Title loans: Secured by vehicle title, risk losing car",
              "Rent-to-own agreements: Extremely high effective interest rates",
              "Cash advances: High fees and immediate interest charges",
              "Subprime credit cards: High fees and rates for poor credit",
              "Installment loans: High-rate loans marketed to poor credit borrowers",
            ],
          },
          {
            type: "calculation",
            content: "True cost of payday loans:",
            formula: "APR = (Fee ÷ Loan Amount) × (365 ÷ Loan Term) × 100",
            variables: {
              Fee: "Cost to borrow (e.g., $15 per $100)",
              "Loan Amount": "Amount borrowed",
              "Loan Term": "Days until repayment",
              "Typical APR": "300-400% for payday loans",
            },
          },
          {
            type: "example",
            content:
              "Payday Loan Trap: $300 loan with $45 fee due in 14 days = 391% APR. If you can't repay, you pay another $45 to roll over. After 6 rollovers, you've paid $315 in fees on a $300 loan and still owe the principal.",
          },
          {
            type: "list",
            content: "Red flags of predatory lending:",
            items: [
              "Extremely high interest rates or fees",
              "Pressure to sign immediately without time to review",
              "No credit check or 'guaranteed approval' claims",
              "Balloon payments or unaffordable payment schedules",
              "Encouragement to lie on applications",
              "Aggressive sales tactics or door-to-door solicitation",
            ],
          },
          {
            type: "list",
            content: "Alternatives to predatory loans:",
            items: [
              "Credit union small-dollar loans (PALs)",
              "Payment plans with creditors or service providers",
              "Employer paycheck advances",
              "Borrowing from family or friends",
              "Community assistance programs",
              "Selling items or taking on extra work",
            ],
          },
          {
            type: "case-study",
            content:
              "Payday Loan Escape: Maria was trapped in a payday loan cycle, paying $50 every two weeks on a $300 loan. She contacted a credit union, got a $500 PAL at 18% APR, paid off the payday loan, and saved over $1,000 annually.",
          },
          {
            type: "list",
            content: "Credit card debt traps to avoid:",
            items: [
              "Making only minimum payments on high balances",
              "Cash advances with immediate interest and high fees",
              "Balance transfer offers with high post-promotional rates",
              "Store cards with deferred interest promotions",
              "Credit limit increases that encourage more spending",
              "Multiple cards from the same issuer (shared limits)",
            ],
          },
          {
            type: "list",
            content: "Building emergency alternatives:",
            items: [
              "Start with $25-50 emergency fund",
              "Use automatic savings to build gradually",
              "Keep emergency fund in separate account",
              "Consider credit union membership for better loan options",
              "Build relationships with family/friends for emergency help",
              "Develop multiple income streams for stability",
            ],
          },
          {
            type: "list",
            content: "Legal protections and resources:",
            items: [
              "Truth in Lending Act requires disclosure of loan terms",
              "Fair Debt Collection Practices Act limits collector behavior",
              "State laws may cap interest rates or regulate lenders",
              "Consumer Financial Protection Bureau accepts complaints",
              "Legal aid societies provide free legal assistance",
              "Credit counseling agencies offer free debt advice",
            ],
          },
          {
            type: "list",
            content: "Escaping existing debt traps:",
            items: [
              "Stop the cycle - don't renew or roll over loans",
              "Seek help from nonprofit credit counseling",
              "Consider debt management plans",
              "Look into local emergency assistance programs",
              "Negotiate payment plans with original creditors",
              "Consult with bankruptcy attorney if situation is severe",
            ],
          },
          {
            type: "warning",
            content:
              "Never use one high-cost loan to pay off another. This creates a dangerous cycle that becomes increasingly difficult to escape and can lead to financial ruin.",
          },
          {
            type: "tip",
            content:
              "If you're considering a payday loan, try asking your employer for a paycheck advance first. Many employers will advance a portion of earned wages at no cost.",
          },
        ],
        keyTakeaways: [
          "Predatory loans have extremely high costs and can trap borrowers in debt cycles",
          "Always calculate the true APR of any loan before borrowing",
          "Build emergency savings and explore alternatives before using high-cost loans",
          "Legal protections exist, and free help is available through nonprofit agencies",
        ],
        quiz: {
          questions: [
            {
              question: "What is the typical APR range for payday loans?",
              options: ["25-50%", "75-150%", "200-300%", "300-400%"],
              correctAnswer: "300-400%",
              explanation:
                "Payday loans typically have APRs of 300-400% or higher when fees are calculated on an annual basis, making them one of the most expensive forms of credit available.",
            },
          ],
        },
      },
      {
        title: "Building Wealth After Debt Freedom",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Transitioning from Debt Payoff to Wealth Building",
          },
          {
            type: "paragraph",
              content:
                "Achieving debt freedom is a major milestone, but it's just the beginning of your wealth-building journey. The discipline and habits you developed during debt payoff can be redirected toward building assets and achieving financial independence.",
          },
          {
            type: "list",
            content: "Immediate steps after debt payoff:",
            items: [
              "Celebrate your achievement - you've accomplished something major!",
              "Redirect debt payments to emergency fund completion",
              "Increase retirement contributions significantly",
              "Review and update your budget for new priorities",
              "Consider increasing insurance coverage",
              "Set new financial goals beyond debt elimination",
            ],
          },
          {
            type: "calculation",
            content: "Wealth building acceleration:",
            formula: "Monthly Wealth Building = Former Debt Payments + Additional Savings",
            variables: {
              "Former Debt Payments": "Money previously going to debt",
              "Additional Savings": "Extra money from lifestyle optimization",
              "Wealth Building Rate": "Percentage of income going to assets",
              "Time to FI": "Years to financial independence",
            },
          },
          {
            type: "example",
            content:
              "Post-Debt Transition: Sarah was paying $800/month toward debt. After payoff, she allocated $400 to emergency fund completion, $300 to retirement investing, and $100 to a vacation fund. Her wealth building accelerated dramatically.",
          },
          {
            type: "list",
            content: "Priority order for post-debt money:",
            items: [
              "Complete emergency fund (3-6 months expenses)",
              "Maximize employer 401(k) match if not already",
              "Pay off any remaining low-balance, high-interest debt",
              "Increase retirement contributions to 15% of income",
              "Save for other financial goals (down payment, education)",
              "Invest in diversified portfolio for long-term growth",
            ],
          },
          {
            type: "list",
            content: "Advanced wealth building strategies:",
            items: [
              "Real estate investing (rental properties, REITs)",
              "Business ownership and entrepreneurship",
              "Tax-advantaged investing (HSA, 529 plans)",
              "Alternative investments (private equity, angel investing)",
              "Financial education and professional development",
              "Estate planning and wealth transfer strategies",
            ],
          },
          {
            type: "list",
            content: "Avoiding debt relapse:",
            items: [
              "Maintain a detailed budget and track expenses",
              "Avoid lifestyle inflation as income increases",
              "Use credit cards responsibly (pay in full, low utilization)",
              "Set clear financial boundaries with family and friends",
              "Automate savings and investments",
              "Regularly review and update your financial plan",
            ],
          },
          {
            type: "case-study",
            content:
              "Wealth Building Success: After paying off $40,000 in debt, Tom redirected his $1,000 monthly payments to real estate investing. He bought a rental property, generating passive income and building long-term wealth.",
          },
          {
            type: "list",
            content: "Long-term financial independence:",
            items: [
              "Calculate your financial independence number (25x annual expenses)",
              "Track your progress toward FI with net worth and savings rate",
              "Consider early retirement or semi-retirement options",
              "Plan for healthcare and long-term care expenses",
              "Create a fulfilling and meaningful life beyond work",
              "Give back to your community and support causes you care about",
            ],
          },
          {
            type: "warning",
            content:
              "Don't let debt freedom lead to overconfidence or reckless spending. Maintain the discipline and habits that got you out of debt to build lasting wealth.",
          },
          {
            type: "tip",
            content:
              "Celebrate your debt payoff by treating yourself to something you've wanted, but don't let it derail your long-term financial goals. A small reward can reinforce positive behavior.",
          },
        ],
        keyTakeaways: [
          "Redirect debt payments to emergency fund and retirement savings",
          "Increase savings rate and invest for long-term growth",
          "Avoid lifestyle inflation and maintain good financial habits",
          "Plan for financial independence and a fulfilling life beyond debt",
        ],
        quiz: {
          questions: [
            {
              question: "What should be your first priority after paying off debt?",
              options: [
                "Buying a new car or house",
                "Taking a long vacation",
                "Completing your emergency fund",
                "Investing in high-risk stocks",
              ],
              correctAnswer: "Completing your emergency fund",
              explanation:
                "Completing your emergency fund provides a financial safety net and prevents you from going back into debt for unexpected expenses. It's the foundation for building long-term wealth.",
            },
          ],
        },
      },
    ],
    loans: [
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
              "Collateral: Assets pledged to secure the loan (if secured)",
              "Amortization: The repayment schedule (how principal and interest are paid)",
            ],
          },
          {
            type: "list",
            content: "Types of loans:",
            items: [
              "Secured loans: Backed by collateral (mortgages, auto loans)",
              "Unsecured loans: Not backed by collateral (personal loans, credit cards)",
              "Installment loans: Fixed payments over a set term",
              "Revolving credit: Credit cards with variable balances and payments",
              "Fixed-rate loans: Interest rate remains constant",
              "Variable-rate loans: Interest rate fluctuates with market conditions",
            ],
          },
          {
            type: "calculation",
            content: "Loan payment calculation:",
            formula: "M = P [ i(1 + i)^n ] / [ (1 + i)^n – 1]",
            variables: {
              M: "Monthly payment",
              P: "Principal loan amount",
              i: "Monthly interest rate (annual rate ÷ 12)",
              n: "Number of months (loan term in years × 12)",
            },
          },
          {
            type: "example",
            content:
              "Loan Example: $10,000 loan at 8% APR for 5 years = $202.76 monthly payment. Total paid: $12,165.60. Total interest: $2,165.60.",
          },
          {
            type: "list",
            content: "Factors affecting loan eligibility:",
            items: [
              "Credit score: Lenders use scores to assess risk",
              "Income: Ability to repay the loan",
              "Debt-to-income ratio: Existing debt vs. income",
              "Employment history: Stability and reliability",
              "Collateral: Value and liquidity of assets (if secured)",
              "Loan purpose: How the money will be used",
            ],
          },
          {
            type: "list",
            content: "Loan application process:",
            items: [
              "Research lenders and compare terms",
              "Gather required documentation (income, assets, ID)",
              "Complete application online or in person",
              "Undergo credit check and verification",
              "Receive loan approval or denial",
              "Review loan agreement and sign",
            ],
          },
          {
            type: "warning",
            content:
              "Avoid borrowing more than you can comfortably afford to repay. Overborrowing can lead to financial stress, missed payments, and damage to your credit score.",
          },
          {
            type: "tip",
            content:
              "Shop around with multiple lenders to compare interest rates and terms. Even a small difference in APR can save you thousands of dollars over the life of the loan.",
          },
        ],
        keyTakeaways: [
          "Loans involve borrowing principal and repaying with interest",
          "Secured loans have lower rates but put collateral at risk",
          "Credit score, income, and DTI affect loan eligibility",
          "Shop around and compare terms before taking out a loan",
        ],
        quiz: {
          questions: [
            {
              question: "What is the primary difference between a secured and unsecured loan?",
              options: [
                "Secured loans have lower interest rates",
                "Secured loans require collateral",
                "Unsecured loans have longer repayment terms",
                "Unsecured loans are easier to qualify for",
              ],
              correctAnswer: "Secured loans require collateral",
              explanation:
                "Secured loans are backed by collateral, such as a home or car, which the lender can repossess if you fail to repay the loan. Unsecured loans have no collateral.",
            },
          ],
        },
      },
      {
        title: "Auto Loans: Financing Your Vehicle",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Navigating Auto Financing",
          },
          {
            type: "paragraph",
              content:
                "Auto loans are used to finance the purchase of a vehicle. Understanding the factors that affect auto loan rates, the different types of lenders, and strategies for negotiating the best deal can save you thousands of dollars over the life of the loan.",
          },
          {
            type: "list",
            content: "Factors affecting auto loan rates:",
            items: [
              "Credit score: Higher scores get lower rates",
              "Loan term: Shorter terms have lower rates",
              "Down payment: Larger down payments reduce risk",
              "Vehicle type: New cars often have better rates",
              "Lender type: Banks, credit unions, dealerships",
              "Market interest rates: Overall economic conditions",
            ],
          },
          {
            type: "list",
            content: "Types of auto loan lenders:",
            items: [
              "Banks: Offer competitive rates, require good credit",
              "Credit unions: Often have lower rates for members",
              "Dealerships: Convenient, but rates may be higher",
              "Online lenders: Offer quick approvals and competitive rates",
              "Finance companies: Specialize in loans for borrowers with poor credit",
              "Buy-here-pay-here dealerships: High rates, last resort option",
            ],
          },
          {
            type: "calculation",
            content: "Impact of interest rate on total cost:",
            formula: "Total Paid = Monthly Payment × Loan Term",
            variables: {
              "Monthly Payment": "Calculated using loan payment formula",
              "Loan Term": "Number of months to repay the loan",
              "Interest Savings": "Difference in total paid with lower rate",
            },
          },
          {
            type: "example",
            content:
              "Rate Impact: $25,000 auto loan for 60 months. At 4% APR, total paid = $28,317. At 8% APR, total paid = $30,417. A 4% rate difference costs $2,100 more.",
          },
          {
            type: "list",
            content: "Strategies for negotiating auto loans:",
            items: [
              "Get pre-approved from a bank or credit union",
              "Shop around with multiple lenders",
              "Negotiate the vehicle price separately from financing",
              "Make a large down payment",
              "Choose a shorter loan term",
              "Consider a certified pre-owned vehicle",
            ],
          },
          {
            type: "list",
            content: "Auto loan red flags:",
            items: [
              "High-pressure sales tactics",
              "Hidden fees or add-ons",
              "Long loan terms (over 60 months)",
              "Interest rates significantly above market average",
              "Negative equity rollovers (adding old loan to new loan)",
              "Spot delivery scams (signing before financing is approved)",
            ],
          },
          {
            type: "warning",
            content:
              "Avoid long auto loan terms (over 60 months). While they lower monthly payments, you'll pay significantly more in interest and risk being upside down on your loan (owing more than the car is worth).",
          },
          {
            type: "tip",
            content:
              "Focus on the out-the-door price, not just the monthly payment. Dealers often manipulate loan terms to make payments seem lower while increasing the total cost.",
          },
        ],
        keyTakeaways: [
          "Credit score, loan term, and down payment affect auto loan rates",
          "Shop around with multiple lenders to compare offers",
          "Negotiate the vehicle price separately from financing",
          "Avoid long loan terms and high-pressure sales tactics",
        ],
        quiz: {
          questions: [
            {
              question: "What is the best strategy for negotiating an auto loan?",
              options: [
                "Focus solely on the monthly payment",
                "Let the dealer handle all financing",
                "Get pre-approved from a bank or credit union",
                "Choose the longest loan term possible",
              ],
              correctAnswer: "Get pre-approved from a bank or credit union",
              explanation:
                "Getting pre-approved gives you a baseline interest rate and allows you to negotiate from a position of strength, knowing you have financing options outside the dealership.",
            },
          ],
        },
      },
      {
        title: "Student Loans: Funding Your Education",
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "Understanding Student Loan Options",
          },
          {
            type: "paragraph",
              content:
                "Student loans help finance higher education, but they can also create a significant debt burden. Understanding the different types of student loans, repayment options, and strategies for managing debt is crucial for long-term financial success.",
          },
          {
            type: "list",
            content: "Federal vs. Private Student Loans:",
            items: [
              "Federal loans: Government-backed, fixed rates, income-driven repayment",
              "Private loans: From banks or credit unions, variable or fixed rates",
              "Federal loans offer more borrower protections and flexibility",
              "Private loans may have higher rates and stricter terms",
              "Maximize federal loans before considering private options",
              "Compare terms and rates carefully before borrowing",
            ],
          },
          {
            type: "list",
            content: "Types of federal student loans:",
            items: [
              "Direct Subsidized Loans: Interest doesn't accrue during school",
              "Direct Unsubsidized Loans: Interest accrues during school",
              "Direct PLUS Loans: For parents or graduate students",
              "Perkins Loans: Low-interest loans for high-need students (discontinued)",
              "Federal loans have borrowing limits based on year in school",
              "Complete FAFSA to determine eligibility for federal aid",
            ],
          },
          {
            type: "list",
            content: "Student loan repayment options:",
            items: [
              "Standard Repayment: Fixed payments over 10 years",
              "Graduated Repayment: Payments start low, increase over time",
              "Extended Repayment: Fixed or graduated payments over 25 years",
              "Income-Driven Repayment (IDR): Payments based on income and family size",
              "IDR options: IBR, PAYE, REPAYE, ICR",
              "Public Service Loan Forgiveness (PSLF): For qualifying public service jobs",
            ],
          },
          {
            type: "calculation",
            content: "Income-Driven Repayment (IDR) calculation:",
            formula: "Annual Payment = Discretionary Income × Percentage",
            variables: {
              "Discretionary Income": "Income above a certain threshold",
              Percentage: "10-20% depending on IDR plan",
              "Loan Forgiveness": "Balance forgiven after 20-25 years",
            },
          },
          {
            type: "example",
            content:
              "IDR Example: $50,000 loan, $60,000 income, $30,000 discretionary income. At 10% IBR, annual payment = $3,000 or $250/month. Remaining balance forgiven after 20 years.",
          },
          {
            type: "list",
            content: "Strategies for managing student loan debt:",
            items: [
              "Choose the repayment plan that best fits your income and goals",
              "Make extra payments when possible to reduce principal",
              "Consider loan consolidation to simplify payments",
              "Explore loan forgiveness programs if eligible",
              "Refinance private loans to lower interest rates",
              "Avoid deferment and forbearance unless absolutely necessary",
            ],
          },
          {
            type: "list",
            content: "Student loan red flags:",
            items: [
              "Borrowing more than you need",
              "Using student loans for non-educational expenses",
              "Ignoring loan terms and repayment options",
              "Defaulting on student loans (severe consequences)",
              "Consolidating federal loans into private loans (losing protections)",
              "Paying for 'student loan forgiveness' services (often scams)",
            ],
          },
          {
            type: "warning",
            content:
              "Defaulting on student loans can have severe consequences, including wage garnishment, tax refund offset, and damage to your credit score. Contact your loan servicer immediately if you're struggling to make payments.",
          },
          {
            type: "tip",
            content:
              "Use the Education Department's Loan Simulator to estimate your monthly payments and loan forgiveness eligibility under different repayment plans.",
          },
        ],
        keyTakeaways: [
          "Federal loans offer more borrower protections than private loans",
          "Income-driven repayment plans can lower monthly payments",
          "Loan forgiveness programs are available for certain professions",
          "Avoid defaulting on student loans - explore all repayment options",
        ],
        quiz: {
          questions: [
            {
              question: "Which type of student loan generally offers the most borrower protections and flexible repayment options?",
              options: [
                "Private student loans",
                "Direct Subsidized Loans",
                "Direct PLUS Loans",
                "Perkins Loans",
              ],
              correctAnswer: "Direct Subsidized Loans",
              explanation:
                "Direct Subsidized Loans, along with other federal student loans, offer more borrower protections such as income-driven repayment plans and potential loan forgiveness options.",
            },
          ],
        },
      },
      {
        title: "Personal Loans: Borrowing for Various Needs",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Understanding Personal Loan Options",
          },
          {
            type: "paragraph",
              content:
                "Personal loans are unsecured installment loans that can be used for various purposes, such as debt consolidation, home improvements, or unexpected expenses. Understanding the terms, rates, and fees associated with personal loans is crucial for making informed borrowing decisions.",
          },
          {
            type: "list",
            content: "Common uses for personal loans:",
            items: [
              "Debt consolidation: Paying off high-interest debt",
              "Home improvements: Renovations or repairs",
              "Unexpected expenses: Medical bills, car repairs",
              "Major purchases: Furniture, appliances",
              "Wedding expenses: Funding a wedding or honeymoon",
              "Moving expenses: Relocation costs",
            ],
          },
          {
            type: "list",
            content: "Factors affecting personal loan rates:",
            items: [
              "Credit score: Higher scores get lower rates",
              "Income: Ability to repay the loan",
              "Debt-to-income ratio: Existing debt vs. income",
              "Loan amount: Larger loans may have higher rates",
              "Loan term: Shorter terms often have lower rates",
              "Lender type: Banks, credit unions, online lenders",
            ],
          },
          {
            type: "calculation",
            content: "Personal loan affordability calculation:",
            formula: "Affordable Payment = (Gross Monthly Income × DTI Limit) - Existing Debt Payments",
            variables: {
              "Gross Monthly Income": "Income before taxes",
              "DTI Limit": "Maximum acceptable debt-to-income ratio (36-43%)",
              "Existing Debt Payments": "All current monthly debt payments",
              "Affordable Loan Amount": "Maximum loan you can afford",
            },
          },
          {
            type: "example",
            content:
              "Affordability Example: $5,000 monthly income, 36% DTI limit, $1,000 existing debt payments. Affordable payment = ($5,000 × 0.36) - $1,000 = $800/month. Use loan calculator to find maximum loan amount with $800 payment.",
          },
          {
            type: "list",
            content: "Personal loan application process:",
            items: [
              "Check credit score and review credit reports",
              "Shop around with multiple lenders",
              "Gather required documentation (income, ID, bank statements)",
              "Complete application online or in person",
              "Receive loan approval or denial",
              "Review loan agreement and sign",
            ],
          },
          {
            type: "list",
            content: "Personal loan red flags:",
            items: [
              "High interest rates (over 36% APR)",
              "Origination fees exceeding 5% of loan amount",
              "Prepayment penalties",
              "Variable interest rates",
              "Unnecessary add-on products (credit insurance)",
              "High-pressure sales tactics",
            ],
          },
          {
            type: "warning",
            content:
              "Avoid using personal loans for discretionary spending or purchases you can't afford. Personal loans should be used for needs, not wants.",
          },
          {
            type: "tip",
            content:
              "Check your credit score before applying for a personal loan. Knowing your score helps you understand what interest rates you're likely to qualify for.",
          },
        ],
        keyTakeaways: [
          "Personal loans can be used for various purposes",
          "Credit score, income, and DTI affect personal loan rates",
          "Shop around and compare terms before borrowing",
          "Avoid high-interest rates, fees, and unnecessary add-ons",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most important factor in determining your personal loan interest rate?",
              options: [
                "Your income",
                "Your credit score",
                "The loan amount",
                "The loan term",
              ],
              correctAnswer: "Your credit score",
              explanation:
                "Your credit score is the primary factor lenders use to assess risk and determine your interest rate. Higher credit scores qualify for lower rates.",
            },
          ],
        },
      },
      {
        title: "Mortgages: Financing Your Home",
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "Understanding Mortgage Options",
          },
          {
            type: "paragraph",
              content:
                "Mortgages are used to finance the purchase of a home. Understanding the different types of mortgages, loan terms, and factors that affect mortgage rates is crucial for making informed home buying decisions.",
          },
          {
            type: "list",
            content: "Types of mortgages:",
            items: [
              "Fixed-rate mortgages: Interest rate remains constant",
              "Adjustable-rate mortgages (ARMs): Rate adjusts periodically",
              "Conventional mortgages: Not government-backed",
              "FHA loans: Insured by Federal Housing Administration",
              "VA loans: Guaranteed by Department of Veterans Affairs",
              "USDA loans: For rural and suburban homebuyers",
            ],
          },
          {
            type: "list",
            content: "Key mortgage terms:",
            items: [
              "Principal: The amount borrowed",
              "Interest rate: The cost of borrowing",
              "Loan term: Length of time to repay",
              "Down payment: Percentage of purchase price paid upfront",
              "Closing costs: Fees for processing the loan",
              "Private mortgage insurance (PMI): Required with low down payments",
            ],
          },
          {
            type: "calculation",
            content: "Mortgage affordability calculation:",
            formula: "Affordable Home Price = (Gross Annual Income × Housing Ratio) ÷ (Mortgage Factor)",
            variables: {
              "Gross Annual Income": "Income before taxes",
              "Housing Ratio": "Maximum income for housing costs (28%)",
              "Mortgage Factor": "Based on interest rate and loan term",
              "Affordable Home Price": "Maximum home price you can afford",
            },
          },
          {
            type: "example",
            content:
              "Affordability Example: $80,000 annual income, 28% housing ratio, 6% interest rate, 30-year term. Affordable home price = ($80,000 × 0.28) ÷ 0.006 = $373,333.",
          },
          {
            type: "list",
            content: "Steps in the home buying process:",
            items: [
              "Get pre-approved for a mortgage",
              "Work with a real estate agent",
              "Search for homes and make an offer",
              "Undergo home inspection and appraisal",
              "Secure financing and finalize loan",
              "Close the deal and take ownership",
            ],
          },
          {
            type: "list",
            content: "Mortgage red flags:",
            items: [
              "High interest rates or fees",
              "Pressure to sign quickly without reviewing",
              "Hidden costs or balloon payments",
              "Lenders who don't verify income or assets",
              "Encouragement to take on more debt than you can afford",
              "Steering towards subprime loans",
            ],
          },
          {
            type: "warning",
            content:
              "Avoid taking out a mortgage that exceeds your ability to repay. Foreclosure can have devastating financial and emotional consequences.",
          },
          {
            type: "tip",
            content:
              "Save a down payment of at least 20% to avoid private mortgage insurance (PMI) and secure a lower interest rate.",
          },
        ],
        keyTakeaways: [
          "Fixed-rate mortgages offer predictable payments",
          "FHA and VA loans help first-time homebuyers",
          "Down payment and credit score affect mortgage rates",
          "Shop around and get pre-approved before house hunting",
        ],
        quiz: {
          questions: [
            {
              question: "What is the primary benefit of a fixed-rate mortgage?",
              options: [
                "Lower initial interest rates",
                "Predictable monthly payments",
                "Faster equity building",
                "Tax deductions on interest",
              ],
              correctAnswer: "Predictable monthly payments",
              explanation:
                "Fixed-rate mortgages offer the stability of knowing your interest rate and monthly payments will remain constant throughout the loan term, making budgeting easier.",
            },
          ],
        },
      },
    ],
    investing: [
      {
        title: "Investment Fundamentals",
        duration: "7 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "The Basics of Investing",
          },
          {
            type: "paragraph",
              content:
                "Investing is the process of allocating money with the expectation of generating future income or profit. Understanding the basic principles of investing, including risk, return, and diversification, is crucial for building long-term wealth.",
          },
          {
            type: "list",
            content: "Key investment concepts:",
            items: [
              "Risk: The possibility of losing money",
              "Return: The profit or income generated from an investment",
              "Diversification: Spreading investments across different asset classes",
              "Asset allocation: Dividing investments based on risk tolerance and goals",
              "Compounding: Earning returns on both principal and interest",
              "Inflation: The rate at which the general level of prices for goods and services is rising",
            ],
          },
          {
            type: "list",
            content: "Common investment asset classes:",
            items: [
              "Stocks: Represent ownership in a company",
              "Bonds: Represent debt owed by a government or corporation",
              "Real estate: Physical property that can generate income",
              "Commodities: Raw materials like oil, gold, and agricultural products",
              "Mutual funds: Pools of money invested in a variety of assets",
              "Exchange-Traded Funds (ETFs): Similar to mutual funds but trade like stocks",
            ],
          },
          {
            type: "calculation",
            content: "Calculating investment return:",
            formula: "Return = (Ending Value - Beginning Value + Income) ÷ Beginning Value × 100",
            variables: {
              "Ending Value": "Value of investment at the end of the period",
              "Beginning Value": "Value of investment at the start of the period",
              Income: "Dividends, interest, or other income received",
              Return: "Percentage return on investment",
            },
          },
          {
            type: "example",
            content:
              "Return Example: $1,000 investment grows to $1,200 and pays $50 in dividends. Return = ($1,200 - $1,000 + $50) ÷ $1,000 × 100 = 25%.",
          },
          {
            type: "list",
            content: "Risk tolerance assessment:",
            items: [
              "Conservative: Low risk, low return (bonds, CDs)",
              "Moderate: Balanced risk and return (mix of stocks and bonds)",
              "Aggressive: High risk, high return (primarily stocks)",
              "Time horizon: Longer time horizons allow for more risk",
              "Financial goals: Higher goals require more risk",
              "Personal comfort level: How well you handle market volatility",
            ],
          },
          {
            type: "list",
            content: "Investment account types:",
            items: [
              "Taxable accounts: No tax advantages, but flexible",
              "401(k)s: Employer-sponsored retirement plans",
              "IRAs: Individual retirement accounts (Traditional and Roth)",
              "HSAs: Health Savings Accounts (triple tax advantage)",
              "529 plans: Education savings accounts",
              "UTMAs/UGMAs: Custodial accounts for minors",
            ],
          },
          {
            type: "warning",
            content:
              "Avoid investing in products you don't understand. Research thoroughly and seek professional advice before investing in complex or high-risk investments.",
          },
          {
            type: "tip",
            content:
              "Start investing early, even with small amounts. The power of compounding can significantly increase your returns over time.",
          },
        ],
        keyTakeaways: [
          "Investing involves risk, return, and diversification",
          "Asset allocation depends on risk tolerance and goals",
          "Compounding is a powerful force for wealth building",
          "Choose investment accounts that align with your tax situation",
        ],
        quiz: {
          questions: [
            {
              question: "What is diversification in investing?",
              options: [
                "Investing in a single stock",
                "Investing in a variety of asset classes",
                "Investing only in low-risk assets",
                "Investing only in high-growth stocks",
              ],
              correctAnswer: "Investing in a variety of asset classes",
              explanation:
                "Diversification involves spreading your investments across different asset classes, such as stocks, bonds, and real estate, to reduce risk and improve potential returns.",
            },
          ],
        },
      },
      {
        title: "Stocks: Ownership in Companies",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Understanding Stocks and the Stock Market",
          },
          {
            type: "paragraph",
              content:
                "Stocks represent ownership in a company and offer the potential for capital appreciation and dividend income. Understanding how stocks are valued, the different types of stocks, and strategies for investing in the stock market is crucial for building long-term wealth.",
          },
          {
            type: "list",
            content: "Key stock market concepts:",
            items: [
              "Shares: Units of ownership in a company",
              "Market capitalization: Total value of a company's outstanding shares",
              "Stock exchanges: Marketplaces for buying and selling stocks",
              "Stock indexes: Measure the performance of a group of stocks",
              "Dividends: Payments made to shareholders from company profits",
              "Capital gains: Profit from selling a stock for more than you paid",
            ],
          },
          {
            type: "list",
            content: "Types of stocks:",
            items: [
              "Common stock: Most common type, voting rights",
              "Preferred stock: No voting rights, but higher dividend priority",
              "Large-cap stocks: Companies with large market capitalization",
              "Small-cap stocks: Companies with small market capitalization",
              "Growth stocks: Companies expected to grow rapidly",
              "Value stocks: Companies undervalued by the market",
            ],
          },
          {
            type: "calculation",
            content: "Price-to-Earnings (P/E) Ratio:",
            formula: "P/E Ratio = Stock Price ÷ Earnings per Share",
            variables: {
              "Stock Price": "Current market price of one share",
              "Earnings per Share": "Company's profit divided by outstanding shares",
              "High P/E": "May indicate overvaluation",
              "Low P/E": "May indicate undervaluation",
            },
          },
          {
            type: "example",
            content:
              "P/E Ratio Example: Stock trading at $50 with $2 earnings per share. P/E Ratio = $50 ÷ $2 = 25. Compare to industry average to determine if overvalued or undervalued.",
          },
          {
            type: "list",
            content: "Strategies for investing in stocks:",
            items: [
              "Buy and hold: Purchase stocks and hold for the long term",
              "Dollar-cost averaging: Invest a fixed amount regularly",
              "Value investing: Buy undervalued stocks with strong fundamentals",
              "Growth investing: Buy stocks with high growth potential",
              "Dividend investing: Buy stocks that pay consistent dividends",
              "Index investing: Invest in a broad market index like the S&P 500",
            ],
          },
          {
            type: "list",
            content: "Stock market risks:",
            items: [
              "Market risk: Overall market decline",
              "Company-specific risk: Problems with a particular company",
              "Volatility: Price fluctuations",
              "Inflation risk: Loss of purchasing power",
              "Interest rate risk: Rising rates can lower stock values",
              "Liquidity risk: Difficulty selling stocks quickly",
            ],
          },
          {
            type: "warning",
            content:
              "The stock market can be volatile. Be prepared for fluctuations and avoid making emotional decisions based on short-term market movements.",
          },
          {
            type: "tip",
            content:
              "Diversify your stock portfolio across different sectors and industries to reduce risk.",
          },
        ],
        keyTakeaways: [
          "Stocks represent ownership in companies",
          "Different types of stocks have different characteristics",
          "P/E ratio helps assess stock valuation",
          "Diversification reduces stock market risk",
        ],
        quiz: {
          questions: [
            {
              question: "What does a stock index measure?",
              options: [
                "The value of a single stock",
                "The performance of a group of stocks",
                "The overall economy",
                "The interest rates on bonds",
              ],
              correctAnswer: "The performance of a group of stocks",
              explanation:
                "A stock index, such as the S&P 500 or Dow Jones Industrial Average, measures the performance of a selected group of stocks, providing a benchmark for the overall stock market.",
            },
          ],
        },
      },
      {
        title: "Bonds: Lending to Governments and Corporations",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Understanding Bonds and Fixed Income",
          },
          {
            type: "paragraph",
              content:
                "Bonds represent debt owed by a government or corporation and offer a fixed income stream through interest payments. Understanding bond yields, ratings, and risks is crucial for incorporating bonds into a diversified investment portfolio.",
          },
          {
            type: "list",
            content: "Key bond concepts:",
            items: [
              "Principal: The amount borrowed by the issuer",
              "Coupon rate: The annual interest rate paid on the bond",
              "Maturity date: The date when the principal is repaid",
              "Yield: The return on investment, taking into account the purchase price",
              "Bond rating: Assessment of creditworthiness by rating agencies",
              "Bond prices: Inversely related to interest rates",
            ],
          },
          {
            type: "list",
            content: "Types of bonds:",
            items: [
              "Government bonds: Issued by national governments (Treasury bonds)",
              "Municipal bonds: Issued by state and local governments",
              "Corporate bonds: Issued by corporations",
              "High-yield bonds: Higher risk, higher return (junk bonds)",
              "Inflation-protected bonds: Protect against inflation (TIPS)",
              "Zero-coupon bonds: No interest payments, sold at a discount",
            ],
          },
          {
            type: "calculation",
            content: "Current Yield Calculation:",
            formula: "Current Yield = Annual Interest Payment ÷ Current Bond Price × 100",
            variables: {
              "Annual Interest Payment": "Total interest paid per year",
              "Current Bond Price": "Market price of the bond",
              "Current Yield": "Percentage return based on current price",
            },
          },
          {
            type: "example",
            content:
              "Current Yield Example: Bond with $1,000 face value, 5% coupon rate, and current price of $950. Current Yield = $50 ÷ $950 × 100 = 5.26%.",
          },
          {
            type: "list",
            content: "Factors affecting bond prices:",
            items: [
              "Interest rate changes: Rising rates lower bond prices",
              "Inflation: Higher inflation erodes bond returns",
              "Credit rating changes: Downgrades lower bond prices",
              "Economic conditions: Recession can lower bond prices",
              "Supply and demand: Market forces affect bond prices",
              "Maturity date: Longer-term bonds are more sensitive to rate changes",
            ],
          },
          {
            type: "list",
            content: "Bond investment strategies:",
            items: [
              "Buy and hold: Purchase bonds and hold until maturity",
              "Bond laddering: Stagger bond maturities for regular income",
              "Diversify across different bond types",
              "Consider bond funds or ETFs for diversification",
              "Reinvest interest payments to compound returns",
              "Monitor credit ratings and economic conditions",
            ],
          },
          {
            type: "warning",
            content:
              "Bond prices can fluctuate, especially with longer-term bonds. Be prepared for potential losses if you need to sell bonds before maturity.",
          },
          {
            type: "tip",
            content:
              "Consider investing in Treasury Inflation-Protected Securities (TIPS) to protect your bond portfolio from inflation.",
          },
        ],
        keyTakeaways: [
          "Bonds represent debt owed by governments or corporations",
          "Bond yields and prices are inversely related",
          "Bond ratings assess creditworthiness",
          "Diversification reduces bond portfolio risk",
        ],
        quiz: {
          questions: [
            {
              question: "What happens to bond prices when interest rates rise?",
              options: [
                "Bond prices increase",
                "Bond prices decrease",
                "Bond prices remain the same",
                "Bond prices become more volatile",
              ],
              correctAnswer: "Bond prices decrease",
              explanation:
                "Bond prices and interest rates have an inverse relationship. When interest rates rise, existing bonds with lower coupon rates become less attractive, causing their prices to fall.",
            },
          ],
        },
      },
      {
        title: "Mutual Funds and ETFs: Diversified Investing",
        duration: "8 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "Understanding Pooled Investments",
          },
          {
            type: "paragraph",
              content:
                "Mutual funds and Exchange-Traded Funds (ETFs) offer diversified investment portfolios managed by professionals. Understanding the different types of funds, their fees, and strategies for selecting the right funds is crucial for building a well-rounded investment portfolio.",
          },
          {
            type: "list",
            content: "Mutual fund basics:",
            items: [
              "Pools money from many investors",
              "Invests in a variety of assets (stocks, bonds, etc.)",
              "Managed by professional fund managers",
              "Net Asset Value (NAV) calculated daily",
              "Can be actively or passively managed",
              "Offer diversification and convenience",
            ],
          },
          {
            type: "list",
            content: "Types of mutual funds:",
            items: [
              "Stock funds: Invest primarily in stocks",
              "Bond funds: Invest primarily in bonds",
              "Balanced funds: Invest in a mix of stocks and bonds",
              "Target-date funds: Automatically adjust asset allocation over time",
              "Index funds: Track a specific market index (S&P 500)",
              "Sector funds: Focus on a specific industry or sector",
            ],
          },
          {
            type: "list",
            content: "Exchange-Traded Funds (ETFs):",
            items: [
              "Similar to mutual funds but trade like stocks",
              "Lower expense ratios than many mutual funds",
              "More tax-efficient than mutual funds",
              "Can be bought and sold throughout the day",
              "Offer diversification and flexibility",
              "Can track indexes, sectors, or specific investment strategies",
            ],
          },
          {
            type: "calculation",
            content: "Expense Ratio Calculation:",
            formula: "Expense Ratio = (Total Fund Expenses ÷ Average Fund Assets) × 100",
            variables: {
              "Total Fund Expenses": "Annual operating expenses of the fund",
              "Average Fund Assets": "Average value of assets managed by the fund",
              "Expense Ratio": "Percentage of assets used to cover expenses",
            },
          },
          {
            type: "example",
            content:
              "Expense Ratio Example: Fund with $100 million in assets and $500,000 in expenses. Expense Ratio = ($500,000 ÷ $100,000,000) × 100 = 0.5%.",
          },
          {
            type: "list",
            content: "Factors to consider when choosing funds:",
            items: [
              "Expense ratio: Lower is better",
              "Investment objective: Aligns with your goals",
              "Past performance: Not a guarantee of future results",
              "Fund manager experience: Track record and expertise",
              "Asset allocation: Matches your risk tolerance",
              "Tax efficiency: Minimizes taxable distributions",
            ],
          },
          {
            type: "list",
            content: "Strategies for investing in funds:",
            items: [
              "Dollar-cost averaging: Invest a fixed amount regularly",
              "Diversify across different fund types",
              "Rebalance portfolio periodically",
              "Consider tax-advantaged accounts",
              "Monitor fund performance and make adjustments",
              "Avoid chasing hot funds or market trends",
            ],
          },
          {
            type: "warning",
            content:
              "High expense ratios can significantly erode your investment returns over time. Choose low-cost index funds or ETFs whenever possible.",
          },
          {
            type": "tip",
            content:
              "Use online tools like Morningstar or
              "High expense ratios can significantly erode your investment returns over time. Choose low-cost index funds or ETFs whenever possible.",
          },
          {
            type": "tip",
            content:
              "Use online tools like Morningstar or fund company websites to research and compare mutual funds and ETFs before investing.",
          },
        ],
        keyTakeaways: [
          "Mutual funds and ETFs offer diversified investment portfolios",
          "ETFs typically have lower expense ratios than mutual funds",
          "Consider expense ratios, investment objectives, and tax efficiency",
          "Dollar-cost averaging and diversification are effective strategies",
        ],
        quiz: {
          questions: [
            {
              question: "What is the primary advantage of investing in mutual funds or ETFs?",
              options: [
                "Guaranteed returns",
                "No investment risk",
                "Instant diversification",
                "Tax-free income",
              ],
              correctAnswer: "Instant diversification",
              explanation:
                "Mutual funds and ETFs provide instant diversification by pooling money from many investors to buy a variety of assets, reducing the risk associated with investing in individual stocks or bonds.",
            },
          ],
        },
      },
      {
        title: "Index Funds: Passive Investing Strategy",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "The Power of Index Investing",
          },
          {
            type: "paragraph",
              content:
                "Index funds are a type of mutual fund or ETF that tracks a specific market index, such as the S&P 500. They offer broad market exposure, low costs, and consistent performance, making them an excellent choice for long-term investors.",
          },
          {
            type: "list",
            content: "Index fund characteristics:",
            items: [
              "Passive management: No active stock picking",
              "Low expense ratios: Typically 0.03% to 0.20%",
              "Broad diversification: Hundreds or thousands of stocks",
              "Market returns: Matches the performance of the underlying index",
              "Tax efficiency: Low portfolio turnover",
              "Simplicity: Easy to understand and invest in",
            ],
          },
          {
            type: "list",
            content: "Popular market indexes:",
            items: [
              "S&P 500: 500 largest U.S. companies",
              "Total Stock Market: Entire U.S. stock market",
              "FTSE Developed Markets: International developed markets",
              "Emerging Markets: Developing countries",
              "Bond Index: U.S. bond market",
              "Real Estate Investment Trust (REIT) Index: Real estate sector",
            ],
          },
          {
            type: "calculation",
            content: "Cost savings of index funds:",
            formula: "Annual Savings = (Active Fund Expense Ratio - Index Fund Expense Ratio) × Investment Amount",
            variables: {
              "Active Fund Expense Ratio": "Typical 0.5% to 1.5%",
              "Index Fund Expense Ratio": "Typical 0.03% to 0.20%",
              "Investment Amount": "Total amount invested",
              "Annual Savings": "Money saved per year in fees",
            },
          },
          {
            type: "example",
            content:
              "Cost Savings Example: $100,000 investment. Active fund (1.0% expense ratio) vs. Index fund (0.05% expense ratio). Annual savings = (1.0% - 0.05%) × $100,000 = $950 per year.",
          },
          {
            type: "list",
            content: "Benefits of index investing:",
            items: [
              "Low costs: More of your money stays invested",
              "Diversification: Reduces individual stock risk",
              "Consistent performance: Matches market returns",
              "Tax efficiency: Minimal taxable distributions",
              "Simplicity: No need to research fund managers",
              "Long-term focus: Encourages buy-and-hold strategy",
            ],
          },
          {
            type: "list",
            content: "Building an index fund portfolio:",
            items: [
              "Start with a broad market index (S&P 500 or Total Stock Market)",
              "Add international diversification (Developed and Emerging Markets)",
              "Include bonds for stability (Bond Index)",
              "Consider real estate exposure (REIT Index)",
              "Rebalance periodically to maintain target allocation",
              "Stay the course during market volatility",
            ],
          },
          {
            type: "warning",
            content:
              "Index funds will never outperform the market because they are designed to match market returns. However, they consistently outperform most actively managed funds over the long term.",
          },
          {
            type: "tip",
            content:
              "Consider using a three-fund portfolio: Total Stock Market Index, International Stock Index, and Bond Index for simple, effective diversification.",
          },
        ],
        keyTakeaways: [
          "Index funds offer broad diversification at low cost",
          "They consistently outperform most actively managed funds",
          "Popular indexes include S&P 500 and Total Stock Market",
          "A simple three-fund portfolio can provide effective diversification",
        ],
        quiz: {
          questions: [
            {
              question: "What is the primary advantage of index funds over actively managed funds?",
              options: [
                "Higher returns",
                "Lower expense ratios",
                "Better stock selection",
                "More frequent trading",
              ],
              correctAnswer: "Lower expense ratios",
              explanation:
                "Index funds have significantly lower expense ratios than actively managed funds because they don't require expensive research teams or frequent trading, allowing more of your money to stay invested.",
            },
          ],
        },
      },
      {
        title: "Asset Allocation and Diversification",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Building a Balanced Investment Portfolio",
          },
          {
            type: "paragraph",
              content:
                "Asset allocation is the process of dividing your investment portfolio among different asset classes, such as stocks, bonds, and real estate. Proper diversification helps reduce risk and optimize returns based on your risk tolerance, time horizon, and financial goals.",
          },
          {
            type: "list",
            content: "Key asset classes:",
            items: [
              "Stocks (Equities): Higher risk, higher potential return",
              "Bonds (Fixed Income): Lower risk, steady income",
              "Real Estate: Inflation hedge, income generation",
              "Commodities: Inflation protection, portfolio diversification",
              "Cash and Cash Equivalents: Liquidity, capital preservation",
              "Alternative Investments: Private equity, hedge funds, etc.",
            ],
          },
          {
            type: "list",
            content: "Factors affecting asset allocation:",
            items: [
              "Age: Younger investors can take more risk",
              "Risk tolerance: Comfort level with volatility",
              "Time horizon: Longer horizons allow for more risk",
              "Financial goals: Retirement, education, home purchase",
              "Income stability: Steady income allows for more risk",
              "Existing assets: Consider all investments and savings",
            ],
          },
          {
            type: "calculation",
            content: "Age-based asset allocation rule:",
            formula: "Stock Allocation = 100 - Your Age",
            variables: {
              "Stock Allocation": "Percentage of portfolio in stocks",
              "Bond Allocation": "Remaining percentage in bonds",
              "Example": "30-year-old: 70% stocks, 30% bonds",
              "Adjustment": "Modify based on risk tolerance",
            },
          },
          {
            type: "example",
            content:
              "Asset Allocation Example: 35-year-old with moderate risk tolerance. Allocation: 65% stocks (40% U.S., 25% international), 30% bonds, 5% real estate. Adjust based on market conditions and life changes.",
          },
          {
            type: "list",
            content: "Diversification strategies:",
            items: [
              "Geographic diversification: U.S. and international markets",
              "Sector diversification: Different industries and sectors",
              "Company size diversification: Large, mid, and small-cap stocks",
              "Style diversification: Growth and value stocks",
              "Time diversification: Dollar-cost averaging",
              "Asset class diversification: Stocks, bonds, real estate, etc.",
            ],
          },
          {
            type: "list",
            content: "Rebalancing your portfolio:",
            items: [
              "Review portfolio allocation quarterly or annually",
              "Rebalance when allocations drift significantly (5-10%)",
              "Sell overweight assets and buy underweight assets",
              "Use new contributions to rebalance",
              "Consider tax implications in taxable accounts",
              "Automate rebalancing with target-date funds",
            ],
          },
          {
            type: "warning",
            content:
              "Don't put all your eggs in one basket. Diversification is crucial for reducing risk and protecting your portfolio from market volatility.",
          },
          {
            type: "tip",
            content:
              "Consider using target-date funds for automatic asset allocation and rebalancing based on your expected retirement date.",
          },
        ],
        keyTakeaways: [
          "Asset allocation divides investments among different asset classes",
          "Age, risk tolerance, and time horizon affect allocation decisions",
          "Diversification reduces risk and optimizes returns",
          "Regular rebalancing maintains target allocation",
        ],
        quiz: {
          questions: [
            {
              question: "According to the age-based asset allocation rule, what percentage of stocks should a 40-year-old have?",
              options: ["40%", "50%", "60%", "70%"],
              correctAnswer: "60%",
              explanation:
                "The age-based rule suggests stock allocation = 100 - your age. For a 40-year-old, this would be 100 - 40 = 60% in stocks, with the remaining 40% in bonds.",
            },
          ],
        },
      },
      {
        title: "Dollar-Cost Averaging and Investment Timing",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Systematic Investment Strategies",
          },
          {
            type: "paragraph",
              content:
                "Dollar-cost averaging is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of market conditions. This approach helps reduce the impact of market volatility and removes the emotion from investment timing decisions.",
          },
          {
            type: "list",
            content: "Dollar-cost averaging benefits:",
            items: [
              "Reduces impact of market volatility",
              "Eliminates need to time the market",
              "Builds disciplined investing habits",
              "Reduces average cost per share over time",
              "Removes emotional decision-making",
              "Works well with automatic investing",
            ],
          },
          {
            type: "calculation",
            content: "Dollar-cost averaging example:",
            formula: "Average Cost per Share = Total Amount Invested ÷ Total Shares Purchased",
            variables: {
              "Total Amount Invested": "Sum of all investments",
              "Total Shares Purchased": "Sum of all shares bought",
              "Average Cost": "Average price paid per share",
              "Market Timing": "Trying to buy low and sell high",
            },
          },
          {
            type: "example",
            content:
              "DCA Example: Invest $500 monthly. Month 1: $500 buys 10 shares at $50. Month 2: $500 buys 12.5 shares at $40. Month 3: $500 buys 8.33 shares at $60. Average cost = $1,500 ÷ 30.83 shares = $48.65 per share.",
          },
          {
            type: "list",
            content: "Market timing challenges:",
            items: [
              "Impossible to consistently predict market movements",
              "Emotional decisions often lead to poor timing",
              "Missing the best days can significantly hurt returns",
              "Transaction costs increase with frequent trading",
              "Tax implications of frequent buying and selling",
              "Time and stress involved in constant monitoring",
            ],
          },
          {
            type: "list",
            content: "When to consider lump-sum investing:",
            items: [
              "You have a large amount to invest (inheritance, bonus)",
              "You're comfortable with market volatility",
              "You have a long investment time horizon",
              "You want to maximize time in the market",
              "You can resist the urge to time the market",
              "You understand the risks involved",
            ],
          },
          {
            type: "list",
            content: "Implementing dollar-cost averaging:",
            items: [
              "Set up automatic investments from your bank account",
              "Choose a consistent investment amount and frequency",
              "Select low-cost index funds or ETFs",
              "Stick to your plan regardless of market conditions",
              "Increase investment amounts as your income grows",
              "Review and adjust your strategy annually",
            ],
          },
          {
            type: "warning",
            content:
              "While dollar-cost averaging reduces volatility, it may result in lower returns compared to lump-sum investing in rising markets. However, it provides peace of mind and disciplined investing.",
          },
          {
            type: "tip",
            content:
              "Combine dollar-cost averaging with automatic investing to build wealth consistently without having to think about market timing.",
          },
        ],
        keyTakeaways: [
          "Dollar-cost averaging reduces market volatility impact",
          "It eliminates the need to time the market",
          "Automatic investing builds disciplined habits",
          "Lump-sum investing may be better in rising markets",
        ],
        quiz: {
          questions: [
            {
              question: "What is the primary benefit of dollar-cost averaging?",
              options: [
                "Guarantees higher returns",
                "Reduces impact of market volatility",
                "Eliminates all investment risk",
                "Allows perfect market timing",
              ],
              correctAnswer: "Reduces impact of market volatility",
              explanation:
                "Dollar-cost averaging reduces the impact of market volatility by spreading purchases over time, which can result in a lower average cost per share compared to investing a lump sum at the wrong time.",
            },
          ],
        },
      },
      {
        title: "Tax-Efficient Investing Strategies",
        duration: "7 min",
        points: 21,
        content: [
          {
            type: "heading",
            content: "Maximizing After-Tax Investment Returns",
          },
          {
            type: "paragraph",
              content:
                "Tax-efficient investing involves strategies to minimize the tax impact on your investment returns. Understanding how different investments are taxed and utilizing tax-advantaged accounts can significantly improve your long-term wealth accumulation.",
          },
          {
            type: "list",
            content: "Types of investment taxes:",
            items: [
              "Capital gains tax: Tax on profits from selling investments",
              "Dividend tax: Tax on dividend income",
              "Interest tax: Tax on interest income (bonds, CDs)",
              "Short-term capital gains: Taxed as ordinary income (held < 1 year)",
              "Long-term capital gains: Lower tax rates (held > 1 year)",
              "Tax-loss harvesting: Using losses to offset gains",
            ],
          },
          {
            type: "list",
            content: "Tax-advantaged account types:",
            items: [
              "401(k): Employer-sponsored, tax-deferred growth",
              "Traditional IRA: Tax-deductible contributions, taxed in retirement",
              "Roth IRA: After-tax contributions, tax-free growth and withdrawals",
              "HSA: Triple tax advantage (deductible, growth, withdrawals)",
              "529 Plans: Tax-free growth for education expenses",
              "Taxable accounts: No contribution limits, more flexibility",
            ],
          },
          {
            type: "calculation",
            content: "Tax savings calculation:",
            formula: "Tax Savings = Tax-Deferred Growth - Taxable Growth",
            variables: {
              "Tax-Deferred Growth": "Growth in tax-advantaged account",
              "Taxable Growth": "After-tax growth in taxable account",
              "Tax Rate": "Your marginal tax rate",
              "Time Horizon": "Years until withdrawal",
            },
          },
          {
            type: "example",
            content:
              "Tax Efficiency Example: $10,000 investment earning 7% annually. In taxable account (25% tax rate): $19,348 after 10 years. In tax-deferred account: $19,672 after 10 years (before withdrawal taxes).",
          },
          {
            type: "list",
            content: "Asset location strategies:",
            items: [
              "Hold tax-inefficient investments in tax-advantaged accounts",
              "Hold tax-efficient investments in taxable accounts",
              "Bonds and REITs: Better in tax-advantaged accounts",
              "Index funds and ETFs: More tax-efficient in taxable accounts",
              "High-turnover funds: Better in tax-advantaged accounts",
              "Individual stocks: Can be tax-efficient in taxable accounts",
            ],
          },
          {
            type: "list",
            content: "Tax-loss harvesting strategies:",
            items: [
              "Sell losing investments to offset gains",
              "Use losses to offset up to $3,000 of ordinary income",
              "Carry forward unused losses to future years",
              "Avoid wash sale rule (30-day repurchase restriction)",
              "Consider tax-loss harvesting in taxable accounts only",
              "Automate with robo-advisors for efficiency",
            ],
          },
          {
            type: "list",
            content: "Tax-efficient fund selection:",
            items: [
              "Choose index funds over actively managed funds",
              "Look for funds with low turnover ratios",
              "Consider ETFs for better tax efficiency",
              "Avoid funds with high dividend yields in taxable accounts",
              "Check fund tax efficiency ratings",
              "Consider municipal bonds for high earners",
            ],
          },
          {
            type: "warning",
            content:
              "Don't let tax considerations override good investment decisions. Focus on after-tax returns, but don't sacrifice diversification or risk management for tax efficiency.",
          },
          {
            type: "tip",
            content:
              "Maximize contributions to tax-advantaged accounts before investing in taxable accounts, especially if you're in a high tax bracket.",
          },
        ],
        keyTakeaways: [
          "Tax-efficient investing can significantly improve returns",
          "Use tax-advantaged accounts for tax-inefficient investments",
          "Tax-loss harvesting can reduce taxable gains",
          "Index funds and ETFs are generally more tax-efficient",
        ],
        quiz: {
          questions: [
            {
              question: "Which type of investment account offers a triple tax advantage?",
              options: ["401(k)", "Traditional IRA", "Roth IRA", "HSA"],
              correctAnswer: "HSA",
              explanation:
                "Health Savings Accounts (HSAs) offer a triple tax advantage: tax-deductible contributions, tax-free growth, and tax-free withdrawals for qualified medical expenses.",
            },
          ],
        },
      },
      {
        title: "Common Investment Mistakes to Avoid",
        duration: "6 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Learning from Investment Pitfalls",
          },
          {
            type: "paragraph",
              content:
                "Even experienced investors make mistakes that can hurt their long-term returns. Understanding common investment pitfalls and how to avoid them can help you stay on track toward your financial goals and build wealth more effectively.",
          },
          {
            type: "list",
            content: "Emotional investing mistakes:",
            items: [
              "Panic selling during market downturns",
              "FOMO buying during market peaks",
              "Chasing hot investment trends",
              "Overconfidence after early success",
              "Analysis paralysis - never starting to invest",
              "Letting emotions drive investment decisions",
            ],
          },
          {
            type: "list",
            content: "Timing and strategy mistakes:",
            items: [
              "Trying to time the market consistently",
              "Frequent trading and portfolio churning",
              "Lack of diversification - putting all eggs in one basket",
              "Ignoring fees and expense ratios",
              "Not having a clear investment plan",
              "Failing to rebalance portfolio regularly",
            ],
          },
          {
            type: "example",
            content:
              "Costly Mistake Example: Investor sells all stocks during 2008 crisis at 50% loss, then waits until 2012 to reinvest, missing the entire recovery. A buy-and-hold investor would have recovered by 2013.",
          },
          {
            type: "list",
            content: "Research and due diligence mistakes:",
            items: [
              "Investing in products you don't understand",
              "Following hot tips from friends or media",
              "Ignoring investment fundamentals",
              "Not reading fund prospectuses or annual reports",
              "Falling for investment scams or get-rich-quick schemes",
              "Overestimating your investment knowledge",
            ],
          },
          {
            type: "list",
            content: "Portfolio management mistakes:",
            items: [
              "Not starting early enough - missing compound growth",
              "Inadequate emergency fund before investing",
              "Ignoring tax implications of investment decisions",
              "Not maximizing employer 401(k) match",
              "Lifestyle inflation eating into investment contributions",
              "Not adjusting strategy as life circumstances change",
            ],
          },
          {
            type: "list",
            content: "How to avoid investment mistakes:",
            items: [
              "Develop a written investment plan and stick to it",
              "Automate investments to remove emotion",
              "Focus on low-cost, diversified index funds",
              "Educate yourself continuously about investing",
              "Work with a fee-only financial advisor if needed",
              "Review and adjust portfolio annually, not daily",
            ],
          },
          {
            type: "case-study",
            content:
              "Recovery Strategy: After losing 60% day-trading individual stocks, Mark switched to a simple three-fund portfolio with automatic monthly investments. Over 10 years, he recovered his losses and built substantial wealth through disciplined, long-term investing.",
          },
          {
            type: "warning",
            content:
              "The biggest investment mistake is not investing at all. Even a simple, low-cost index fund strategy will outperform most complex investment schemes over the long term.",
          },
          {
            type: "tip",
            content:
              "Keep a investment journal to track your decisions and emotions. This helps you learn from mistakes and avoid repeating them in the future.",
          },
        ],
        keyTakeaways: [
          "Emotional decisions are the biggest threat to investment success",
          "Market timing and frequent trading usually hurt returns",
          "Simple, diversified strategies often outperform complex ones",
          "Starting early and staying consistent is more important than perfect timing",
        ],
        quiz: {
          questions: [
            {
              question: "What is often considered the biggest investment mistake?",
              options: [
                "Choosing the wrong stocks",
                "Not investing at all",
                "Paying high fees",
                "Poor market timing",
              ],
              correctAnswer: "Not investing at all",
              explanation:
                "The biggest investment mistake is not investing at all. Even imperfect investing strategies will generally outperform keeping money in low-yield savings accounts over the long term due to the power of compound growth.",
            },
          ],
        },
      },
    ],
  }

  const lesson = lessons[moduleId]?.[lessonIndex]
  return lesson || null
}
