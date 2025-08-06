export interface LessonContent {
  title: string
  duration: string
  points: number
  videoUrl?: string
  content: Array<{
    type: "heading" | "paragraph" | "list" | "example" | "tip" | "chart"
    content: string
    items?: string[]
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
  keyTopics?: string[]
}

export const learningModules: LearningModule[] = [
  {
    id: "basics",
    title: "Money Management Basics",
    description: "Learn the fundamentals of managing your money and building good financial habits",
    duration: "15 min",
    difficulty: "Beginner",
    progress: 100,
    lessons: 5,
    points: 50,
    icon: null,
    color: "bg-blue-500",
    completed: true,
    keyTopics: ["Money Flow", "Needs vs Wants", "Saving", "Mindset"],
  },
  {
    id: "budgeting",
    title: "Budgeting Mastery",
    description: "Create and manage budgets that actually work for your lifestyle and goals",
    duration: "22 min",
    difficulty: "Beginner",
    progress: 60,
    lessons: 6,
    points: 85,
    icon: null,
    color: "bg-green-500",
    completed: false,
    keyTopics: ["50/30/20 Rule", "Zero-Based Budgeting", "Tracking Spending", "Irregular Expenses"],
  },
  {
    id: "saving",
    title: "Smart Saving Strategies",
    description: "Master the art of saving money with practical techniques and automation",
    duration: "25 min",
    difficulty: "Beginner",
    progress: 0,
    lessons: 6,
    points: 90,
    icon: null,
    color: "bg-purple-500",
    completed: false,
    keyTopics: ["Automation", "High-Yield Accounts", "52-Week Challenge", "Multiple Goals"],
  },
  {
    id: "debt-management",
    title: "Debt Management & Payoff",
    description: "Learn proven strategies to pay off debt faster and avoid future debt traps",
    duration: "30 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 7,
    points: 105,
    icon: null,
    color: "bg-red-500",
    completed: false,
    keyTopics: ["Debt Types", "Snowball Method", "Avalanche Method", "Consolidation", "Negotiation"],
  },
  {
    id: "credit-scores",
    title: "Credit Scores & Reports",
    description: "Understand credit scores, reports, and how to improve your credit health",
    duration: "28 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 6,
    points: 95,
    icon: null,
    color: "bg-yellow-500",
    completed: false,
    keyTopics: ["Credit Scores", "Credit Reports", "Credit Improvement", "Credit Monitoring"],
  },
  {
    id: "loans",
    title: "Loans (Auto, Student, Personal)",
    description: "Navigate auto, student, and personal loans with confidence",
    duration: "32 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 7,
    points: 110,
    icon: null,
    color: "bg-lime-500",
    completed: false,
    keyTopics: ["Auto Loans", "Student Loans", "Personal Loans", "Loan Comparison"],
  },
  {
    id: "mortgages",
    title: "Mortgages",
    description: "Learn about mortgages, home buying, and refinancing",
    duration: "35 min",
    difficulty: "Advanced",
    progress: 0,
    lessons: 8,
    points: 125,
    icon: null,
    color: "bg-sky-500",
    completed: false,
    keyTopics: ["Mortgage Types", "Home Buying", "Refinancing", "Down Payments"],
  },
  {
    id: "retirement-planning",
    title: "Retirement Planning (401(k), IRA, Roth IRA)",
    description: "Plan for retirement with 401(k), IRA, and Roth IRA strategies",
    duration: "40 min",
    difficulty: "Advanced",
    progress: 0,
    lessons: 9,
    points: 140,
    icon: null,
    color: "bg-fuchsia-500",
    completed: false,
    keyTopics: ["401(k)", "Traditional IRA", "Roth IRA", "Retirement Strategies"],
  },
  {
    id: "hsa",
    title: "Health Savings Accounts (HSA)",
    description: "Understand the benefits and uses of Health Savings Accounts",
    duration: "20 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 5,
    points: 75,
    icon: null,
    color: "bg-teal-500",
    completed: false,
    keyTopics: ["HSA Basics", "HSA Benefits", "HSA Investments", "HSA Strategies"],
  },
  {
    id: "insurance",
    title: "Insurance (Life, Health, Auto, Home)",
    description: "Learn about different types of insurance and how to choose the right policies",
    duration: "35 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 7,
    points: 115,
    icon: null,
    color: "bg-rose-500",
    completed: false,
    keyTopics: ["Life Insurance", "Health Insurance", "Auto Insurance", "Home Insurance"],
  },
  {
    id: "bill-negotiation",
    title: "Negotiating Bills & Expenses",
    description: "Discover how to lower your monthly bills through negotiation and smart shopping",
    duration: "25 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 6,
    points: 90,
    icon: null,
    color: "bg-orange-500",
    completed: false,
    keyTopics: ["Negotiation Tactics", "Service Alternatives", "Tracking Savings"],
  },
  {
    id: "investing",
    title: "Investment Fundamentals",
    description: "Build wealth through smart investing with index funds and diversification",
    duration: "30 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 8,
    points: 120,
    icon: null,
    color: "bg-indigo-500",
    completed: false,
    keyTopics: ["Risk and Return", "Index Funds", "Dollar-Cost Averaging", "Rebalancing"],
  },
  {
    id: "emergency-fund",
    title: "Emergency Fund Building",
    description: "Create a financial safety net to protect yourself from unexpected expenses",
    duration: "15 min",
    difficulty: "Beginner",
    progress: 0,
    lessons: 4,
    points: 60,
    icon: null,
    color: "bg-teal-500",
    completed: false,
    keyTopics: ["Emergency Fund Basics", "How Much to Save", "Where to Keep Funds"],
  },
  {
    id: "financial-goals",
    title: "Setting Financial Goals",
    description: "Learn to set and achieve realistic financial goals that motivate you",
    duration: "12 min",
    difficulty: "Beginner",
    progress: 0,
    lessons: 3,
    points: 45,
    icon: null,
    color: "bg-pink-500",
    completed: false,
    keyTopics: ["SMART Goals", "Prioritizing Goals"],
  },
  {
    id: "sustainable-impact-investing",
    title: "Sustainable & Impact Investing",
    description: "Align your investments with your values while building wealth responsibly",
    duration: "25 min",
    difficulty: "Beginner",
    progress: 0,
    lessons: 5,
    points: 90,
    icon: null,
    color: "bg-emerald-700",
    completed: false,
    keyTopics: ["ESG Investing", "Impact Investing", "Green Bonds", "SRI"],
  },
  {
    id: "taxes",
    title: "Filing Your Taxes",
    description: "Learn how to file your taxes correctly and maximize your returns",
    duration: "35 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 7,
    points: 110,
    icon: null,
    color: "bg-amber-500",
    completed: false,
    keyTopics: ["Tax Basics", "Tax Forms", "Deductions", "Credits"],
  },
  {
    id: "estate-planning",
    title: "Estate Planning",
    description: "Plan for the future with wills, trusts, and estate planning strategies",
    duration: "40 min",
    difficulty: "Advanced",
    progress: 0,
    lessons: 8,
    points: 130,
    icon: null,
    color: "bg-stone-500",
    completed: false,
    keyTopics: ["Wills", "Trusts", "Estate Taxes", "Beneficiaries"],
  },
  {
    id: "financial-advisors",
    title: "Financial Advisors",
    description: "Learn how to choose and work with financial advisors",
    duration: "20 min",
    difficulty: "Intermediate",
    progress: 0,
    lessons: 4,
    points: 70,
    icon: null,
    color: "bg-slate-500",
    completed: false,
    keyTopics: ["Advisor Types", "Fees", "Finding Advisors", "Working with Advisors"],
  },
]

export function getModuleById(moduleId: string): LearningModule | null {
  return learningModules.find((module) => module.id === moduleId) || null
}

export function getLessonContent(moduleId: string, lessonIndex: number): LessonContent | null {
  const lessons: Record<string, LessonContent[]> = {
    "credit-scores": [
      {
        title: "Understanding Credit Scores: The Complete Guide",
        duration: "8 min",
        points: 25,
        content: [
          {
            type: "heading",
            content: "What is a Credit Score and Why It Matters",
          },
          {
            type: "paragraph",
            content:
              "A credit score is a three-digit number ranging from 300 to 850 that represents your creditworthiness based on your credit history. This number affects your ability to get loans, credit cards, apartments, and even jobs. Understanding how it works is crucial for your financial future.",
          },
          {
            type: "list",
            content: "Credit score ranges and their meanings:",
            items: [
              "800-850: Exceptional credit - Best rates and terms available",
              "740-799: Very good credit - Access to favorable rates",
              "670-739: Good credit - Most lenders will approve you",
              "580-669: Fair credit - Higher rates, limited options",
              "300-579: Poor credit - Difficulty getting approved",
            ],
          },
          {
            type: "list",
            content: "The five factors that determine your credit score:",
            items: [
              "Payment history (35%): On-time vs. late payments",
              "Credit utilization (30%): How much credit you're using",
              "Length of credit history (15%): Age of your accounts",
              "Credit mix (10%): Types of credit accounts you have",
              "New credit inquiries (10%): Recent applications for credit",
            ],
          },
          {
            type: "example",
            content:
              "Sarah has a 780 credit score because she pays all bills on time (perfect payment history), keeps her credit card balances below 10% of limits (low utilization), has accounts open for 8+ years (long history), has both credit cards and a car loan (good mix), and only applies for new credit when necessary.",
          },
          {
            type: "list",
            content: "Different credit scoring models:",
            items: [
              "FICO Score: Most widely used by lenders (90% of top lenders)",
              "VantageScore: Created by credit bureaus, gaining popularity",
              "Industry-specific scores: Auto loans, mortgages, credit cards",
              "FICO Score versions: FICO 8, FICO 9, FICO 10T (newest)",
              "Score variations: Can differ by 50+ points between models",
            ],
          },
          {
            type: "list",
            content: "How credit scores impact your financial life:",
            items: [
              "Loan approval: Higher scores = easier approval",
              "Interest rates: Can save thousands on mortgages and loans",
              "Credit card offers: Better rewards and lower APRs",
              "Insurance premiums: Some states allow credit-based pricing",
              "Employment: Some employers check credit for certain positions",
              "Housing: Landlords often require minimum credit scores",
            ],
          },
          {
            type: "tip",
            content:
              "Your credit score is not permanent. With consistent good habits, you can improve a poor score to excellent within 12-24 months. Focus on payment history and utilization first for the biggest impact.",
          },
        ],
        keyTakeaways: [
          "Credit scores range from 300-850 and significantly impact your financial opportunities",
          "Payment history (35%) and credit utilization (30%) are the most important factors",
          "Different scoring models exist, with FICO being most common",
          "Good credit can save you thousands of dollars in interest over your lifetime",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most important factor in determining your credit score?",
              options: ["Credit utilization", "Payment history", "Length of credit history", "Credit mix"],
              correctAnswer: "Payment history",
              explanation: "Payment history accounts for 35% of your credit score, making it the single most important factor. Consistently paying bills on time is crucial for maintaining good credit.",
            },
            {
              question: "What credit score range is considered 'excellent' credit?",
              options: ["700-749", "750-799", "800-850", "680-739"],
              correctAnswer: "800-850",
              explanation: "A credit score of 800-850 is considered exceptional/excellent credit, giving you access to the best interest rates and loan terms available.",
            },
          ],
        },
      },
      {
        title: "Reading and Understanding Your Credit Report",
        duration: "7 min",
        points: 22,
        content: [
          {
            type: "heading",
            content: "Decoding Your Credit Report: A Line-by-Line Analysis",
          },
          {
            type: "paragraph",
            content:
              "Your credit report is a detailed record of your credit history maintained by three major credit bureaus: Experian, Equifax, and TransUnion. Understanding how to read this document is essential for monitoring your credit health and catching errors that could hurt your score.",
          },
          {
            type: "list",
            content: "The four main sections of your credit report:",
            items: [
              "Personal Information: Name, addresses, SSN, employment history",
              "Credit Accounts: All current and past credit accounts",
              "Public Records: Bankruptcies, tax liens, civil judgments",
              "Inquiries: Who has accessed your credit report recently",
            ],
          },
          {
            type: "list",
            content: "Understanding credit account information:",
            items: [
              "Account type: Revolving (credit cards) vs. installment (loans)",
              "Credit limit/loan amount: Maximum you can borrow",
              "Current balance: How much you currently owe",
              "Payment history: Record of on-time and late payments",
              "Account status: Open, closed, paid as agreed, delinquent",
              "Date opened/closed: When the account was established/terminated",
            ],
          },
          {
            type: "example",
            content:
              "John's credit report shows a Chase credit card with a $5,000 limit, $1,200 current balance (24% utilization), and payment history showing '30 days late' twice in the past year. This high utilization and late payments are likely hurting his credit score significantly.",
          },
          {
            type: "list",
            content: "Common credit report errors to watch for:",
            items: [
              "Accounts that don't belong to you (identity theft)",
              "Incorrect payment history or late payment dates",
              "Wrong account balances or credit limits",
              "Accounts showing as open when they're closed",
              "Duplicate accounts listed multiple times",
              "Outdated negative information (should fall off after 7 years)",
            ],
          },
          {
            type: "list",
            content: "How to get your free credit reports:",
            items: [
              "AnnualCreditReport.com: Official site for free annual reports",
              "One report per bureau per year (3 total free reports)",
              "Stagger requests: Get one every 4 months for monitoring",
              "Credit monitoring services: Many offer free monthly reports",
              "Credit card companies: Many provide free FICO scores",
              "During COVID-19: Weekly free reports through April 2022",
            ],
          },
          {
            type: "list",
            content: "Understanding credit inquiries:",
            items: [
              "Hard inquiries: When you apply for credit (can lower score)",
              "Soft inquiries: Background checks, pre-approvals (no impact)",
              "Rate shopping: Multiple inquiries for same loan type count as one",
              "Inquiry impact: Usually 5 points or less, temporary effect",
              "Time limits: Auto/mortgage shopping window is 14-45 days",
            ],
          },
          {
            type: "tip",
            content:
              "Set up a calendar reminder to check each credit report every 4 months. This gives you year-round monitoring while staying within the free annual limit. Look for changes, errors, or signs of identity theft.",
          },
        ],
        keyTakeaways: [
          "Credit reports contain four main sections: personal info, accounts, public records, and inquiries",
          "You're entitled to one free report per bureau per year at AnnualCreditReport.com",
          "Common errors include wrong balances, incorrect payment history, and accounts that aren't yours",
          "Hard inquiries can temporarily lower your score, but rate shopping is protected",
        ],
        quiz: {
          questions: [
            {
              question: "How often can you get a free credit report from each bureau?",
              options: ["Monthly", "Quarterly", "Annually", "Every two years"],
              correctAnswer: "Annually",
              explanation: "You are entitled to one free credit report per year from each of the three major credit bureaus (Experian, Equifax, TransUnion) through AnnualCreditReport.com.",
            },
            {
              question: "What's the difference between hard and soft credit inquiries?",
              options: [
                "Hard inquiries are for loans, soft inquiries are for credit cards",
                "Hard inquiries can lower your score, soft inquiries cannot",
                "There is no difference",
                "Soft inquiries are more damaging than hard inquiries",
              ],
              correctAnswer: "Hard inquiries can lower your score, soft inquiries cannot",
              explanation: "Hard inquiries occur when you apply for credit and can temporarily lower your credit score. Soft inquiries are for background checks or pre-approvals and don't affect your score.",
            },
          ],
        },
      },
      {
        title: "Credit Improvement Strategies That Actually Work",
        duration: "9 min",
        points: 28,
        content: [
          {
            type: "heading",
            content: "Proven Methods to Boost Your Credit Score",
          },
          {
            type: "paragraph",
            content:
              "Improving your credit score requires a strategic approach targeting the factors that matter most. While there are no overnight fixes, these proven strategies can help you see meaningful improvements within 3-6 months when applied consistently.",
          },
          {
            type: "list",
            content: "The 30% utilization rule and optimization strategies:",
            items: [
              "Keep total utilization below 30% of all credit limits",
              "Optimal utilization: 1-9% for highest scores",
              "Per-card utilization: Keep each card below 30%",
              "Pay down balances before statement dates",
              "Request credit limit increases to lower utilization",
              "Consider multiple payments per month to keep balances low",
            ],
          },
          {
            type: "example",
            content:
              "Maria has three credit cards with limits of $3,000, $5,000, and $2,000 (total $10,000). To optimize her score, she keeps total balances under $1,000 (10% utilization) and ensures no single card exceeds $300. This strategy raised her score from 680 to 740 in six months.",
          },
          {
            type: "list",
            content: "Advanced payment timing strategies:",
            items: [
              "Understand statement dates vs. due dates",
              "Pay balances before statement closes for 0% reported utilization",
              "Leave small balances (1-2%) on one card to show active use",
              "Set up automatic payments for at least minimum amounts",
              "Pay multiple times per month to keep running balances low",
              "Use balance alerts to monitor utilization in real-time",
            ],
          },
          {
            type: "list",
            content: "Building credit history length strategically:",
            items: [
              "Keep old accounts open, even if you don't use them",
              "Use old cards occasionally to prevent closure",
              "Become an authorized user on someone else's old account",
              "Consider product changes instead of closing accounts",
              "Understand that closed accounts continue aging for 10 years",
              "Focus on average account age, not just oldest account",
            ],
          },
          {
            type: "list",
            content: "Optimizing your credit mix:",
            items: [
              "Maintain both revolving (credit cards) and installment (loans) credit",
              "Don't take on debt just to improve credit mix",
              "Consider a credit-builder loan if you have limited history",
              "Auto loans and mortgages positively impact credit mix",
              "Store cards can help but often have high interest rates",
              "Credit mix is less important than payment history and utilization",
            ],
          },
          {
            type: "list",
            content: "Dealing with negative marks:",
            items: [
              "Dispute inaccurate information with credit bureaus",
              "Request goodwill deletions for isolated late payments",
              "Negotiate pay-for-delete agreements with collection agencies",
              "Consider debt validation for questionable collections",
              "Understand statute of limitations vs. credit reporting limits",
              "Focus on adding positive information, not just removing negative",
            ],
          },
          {
            type: "list",
            content: "Rapid rescoring techniques for major purchases:",
            items: [
              "Pay down credit card balances to 0% utilization",
              "Request rapid rescoring through mortgage lender",
              "Get credit limit increases from existing cards",
              "Become authorized user on spouse's account",
              "Pay off small collections or charge-offs",
              "Dispute any questionable items before applying",
            ],
          },
          {
            type: "tip",
            content:
              "The fastest way to improve your credit score is to pay down credit card balances below 10% utilization and ensure all payments are made on time. These two factors alone account for 65% of your score.",
          },
        ],
        keyTakeaways: [
          "Keep credit utilization below 10% for optimal scores, never above 30%",
          "Payment timing matters - pay before statement dates for lower reported balances",
          "Keep old accounts open to maintain credit history length",
          "Focus on payment history and utilization before worrying about credit mix",
        ],
        quiz: {
          questions: [
            {
              question: "What is the optimal credit utilization rate for the highest credit scores?",
              options: ["Under 30%", "Under 20%", "1-9%", "Exactly 0%"],
              correctAnswer: "1-9%",
              explanation: "While keeping utilization under 30% is good, the highest credit scores typically have utilization rates between 1-9%. This shows you use credit but manage it responsibly.",
            },
            {
              question: "When should you pay your credit card balance to minimize reported utilization?",
              options: ["On the due date", "Before the statement date", "After the statement date", "It doesn't matter when"],
              correctAnswer: "Before the statement date",
              explanation: "Credit card companies report your balance to credit bureaus on your statement date, not your due date. Paying before the statement date ensures a lower balance is reported.",
            },
          ],
        },
      },
      {
        title: "Credit Monitoring and Protection",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Protecting Your Credit from Fraud and Identity Theft",
          },
          {
            type: "paragraph",
            content:
              "Credit monitoring and protection are essential in today's digital world where identity theft affects millions of people annually. Understanding how to monitor your credit and protect yourself from fraud can save you years of financial headaches.",
          },
          {
            type: "list",
            content: "Types of credit monitoring services:",
            items: [
              "Free services: Credit Karma, Credit Sesame, bank/card company alerts",
              "Paid services: Identity Guard, LifeLock, Experian IdentityWorks",
              "Credit bureau services: Experian, Equifax, TransUnion monitoring",
              "Bank-provided monitoring: Many banks offer free credit score tracking",
              "Credit card monitoring: Many cards provide free FICO scores",
              "Comprehensive identity protection: Monitoring plus insurance",
            ],
          },
          {
            type: "list",
            content: "Key features to look for in monitoring services:",
            items: [
              "Real-time alerts for new accounts, inquiries, and changes",
              "Monthly credit score updates from all three bureaus",
              "Dark web monitoring for personal information",
              "Identity theft insurance coverage",
              "Credit report analysis and improvement recommendations",
              "Social Security number and public records monitoring",
            ],
          },
          {
            type: "example",
            content:
              "Tom received an alert that a new credit card was opened in his name at a store he'd never visited. Because he had monitoring in place, he was able to contact the store and credit bureaus within hours, preventing thousands in fraudulent charges and minimizing damage to his credit.",
          },
          {
            type: "list",
            content: "Credit freeze vs. credit lock explained:",
            items: [
              "Credit freeze: Free, legally mandated, prevents new account openings",
              "Credit lock: Often paid service, similar protection with easier management",
              "Freeze benefits: Strongest protection, can't be overridden",
              "Lock benefits: Easier to turn on/off, often includes monitoring",
              "When to use: Before travel, after data breaches, proactively",
              "Temporary lifts: Both allow temporary access for legitimate applications",
            ],
          },
          {
            type: "list",
            content: "Signs of identity theft to watch for:",
            items: [
              "Unexpected credit score drops without explanation",
              "New accounts or inquiries you didn't authorize",
              "Bills or statements for accounts you didn't open",
              "Missing mail or redirected mail notifications",
              "Calls from debt collectors about unknown debts",
              "Denied credit applications due to information you don't recognize",
            ],
          },
          {
            type: "list",
            content: "Steps to take if your identity is stolen:",
            items: [
              "Place fraud alerts with all three credit bureaus immediately",
              "File a report with the Federal Trade Commission (IdentityTheft.gov)",
              "Contact financial institutions and close compromised accounts",
              "File a police report and get a copy for your records",
              "Document everything: dates, names, reference numbers",
              "Consider hiring a credit repair attorney for complex cases",
            ],
          },
          {
            type: "tip",
            content:
              "Set up a free credit monitoring service at minimum, and consider freezing your credit if you're not actively applying for new accounts. The peace of mind is worth the minor inconvenience of temporarily lifting freezes when needed.",
          },
        ],
        keyTakeaways: [
          "Credit monitoring provides early warning of potential identity theft",
          "Credit freezes offer the strongest protection against new account fraud",
          "Free monitoring services are available, but paid services offer more comprehensive protection",
          "Quick action is crucial if you discover identity theft - document everything",
        ],
        quiz: {
          questions: [
            {
              question: "What's the difference between a credit freeze and a credit lock?",
              options: [
                "Freezes are paid, locks are free",
                "Freezes are stronger protection, locks are more convenient",
                "There is no difference",
                "Locks are only available from credit bureaus",
              ],
              correctAnswer: "Freezes are stronger protection, locks are more convenient",
              explanation: "Credit freezes are free, legally mandated, and provide the strongest protection. Credit locks are often paid services that offer similar protection but with easier management and additional features.",
            },
          ],
        },
      },
      {
        title: "Building Credit from Scratch",
        duration: "7 min",
        points: 23,
        content: [
          {
            type: "heading",
            content: "Establishing Credit When You Have No Credit History",
          },
          {
            type: "paragraph",
            content:
              "Building credit from scratch can feel like a catch-22: you need credit to get credit. However, there are several proven strategies to establish credit history even if you're starting with no credit score at all.",
          },
          {
            type: "list",
            content: "Starter credit products for beginners:",
            items: [
              "Secured credit cards: Your deposit becomes your credit limit",
              "Student credit cards: Designed for college students with limited income",
              "Store credit cards: Easier approval but often high interest rates",
              "Credit-builder loans: Designed specifically to build credit history",
              "Authorized user status: Piggyback on someone else's good credit",
              "Alternative credit cards: Use bank account history for approval",
            ],
          },
          {
            type: "list",
            content: "How secured credit cards work:",
            items: [
              "Deposit requirement: Usually $200-$500 minimum deposit",
              "Credit limit equals deposit in most cases",
              "Reports to credit bureaus like a regular credit card",
              "Graduation path: Many convert to unsecured cards after 6-12 months",
              "Deposit refund: Get your deposit back when you close or graduate",
              "Best options: Discover it Secured, Capital One Secured, Citi Secured",
            ],
          },
          {
            type: "example",
            content:
              "Jessica, a college student with no credit history, got a secured credit card with a $300 deposit. She used it for small purchases like gas and groceries, paid the full balance monthly, and after 8 months her score reached 720. The card company then converted it to an unsecured card and returned her deposit.",
          },
          {
            type: "list",
            content: "Becoming an authorized user strategically:",
            items: [
              "Choose someone with excellent payment history and low utilization",
              "Ensure the account reports authorized users to credit bureaus",
              "Understand you're not legally responsible for the debt",
              "Consider family members or trusted friends with good credit",
              "Monitor the account to ensure it remains in good standing",
              "Have an exit strategy if the primary user's habits change",
            ],
          },
          {
            type: "list",
            content: "Alternative credit building methods:",
            items: [
              "Experian Boost: Add utility and phone payments to credit report",
              "UltraFICO: Include bank account history in credit decisions",
              "Rent reporting services: Get credit for on-time rent payments",
              "Self Credit Builder Account: Combines savings and credit building",
              "Credit Strong: Installment loan that builds credit and savings",
              "Kikoff: Small credit line for building payment history",
            ],
          },
          {
            type: "list",
            content: "Timeline for building credit from scratch:",
            items: [
              "Month 1-3: Apply for starter credit products, become authorized user",
              "Month 3-6: First credit score appears, typically 600-650 range",
              "Month 6-12: Score stabilizes and begins improving with good habits",
              "Month 12-18: Qualify for better credit products and higher limits",
              "Month 18-24: Achieve good credit (700+) with consistent management",
              "Year 2+: Access to premium credit cards and best rates",
            ],
          },
          {
            type: "tip",
            content:
              "Start with a secured credit card and authorized user status simultaneously for faster credit building. Use the secured card for small, regular purchases and pay in full monthly. This dual approach can help you reach a 700+ score within 12-18 months.",
          },
        ],
        keyTakeaways: [
          "Secured credit cards are the most reliable way to start building credit",
          "Authorized user status can jumpstart your credit history",
          "Alternative methods like Experian Boost can help thin credit files",
          "Building good credit from scratch typically takes 12-18 months",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main advantage of a secured credit card for building credit?",
              options: [
                "No interest charges",
                "Higher credit limits",
                "Easier approval with no credit history",
                "Better rewards programs",
              ],
              correctAnswer: "Easier approval with no credit history",
              explanation: "Secured credit cards are easier to get approved for because your deposit reduces the lender's risk. They report to credit bureaus just like regular cards, making them ideal for building credit from scratch.",
            },
          ],
        },
      },
      {
        title: "Advanced Credit Optimization",
        duration: "8 min",
        points: 26,
        content: [
          {
            type: "heading",
            content: "Expert-Level Strategies for Maximum Credit Scores",
          },
          {
            type: "paragraph",
            content:
              "Once you understand credit basics, advanced optimization techniques can help you achieve and maintain scores in the 800+ range. These strategies require more sophisticated understanding of credit algorithms and timing.",
          },
          {
            type: "list",
            content: "Advanced utilization optimization:",
            items: [
              "All Zero Except One (AZEO): 0% utilization on all cards except one with 1-2%",
              "Per-card optimization: Keep each individual card under 10%",
              "Statement date manipulation: Time payments to optimize reported balances",
              "Multiple payment strategy: Make several payments per month",
              "Credit limit cycling: Request increases every 6 months",
              "Balance transfer optimization: Use 0% APR offers strategically",
            ],
          },
          {
            type: "list",
            content: "Credit portfolio management:",
            items: [
              "Card diversification: Mix of bank cards, credit unions, and store cards",
              "Limit management: Maintain high total available credit",
              "Account aging: Keep oldest accounts active with small purchases",
              "Product changes: Upgrade cards instead of closing and opening new ones",
              "Business credit separation: Keep business and personal credit separate",
              "Authorized user optimization: Add family members to boost their scores",
            ],
          },
          {
            type: "example",
            content:
              "David maintains an 820+ credit score using advanced techniques: He has 8 credit cards with $80,000 total limits, keeps 7 cards at 0% utilization, maintains 1% utilization on his oldest card, and makes payments twice monthly. He requests limit increases every 6 months and has never closed an account in 15 years.",
          },
          {
            type: "list",
            content: "Inquiry management strategies:",
            items: [
              "Rate shopping windows: Understand 14-45 day shopping periods",
              "Inquiry timing: Space applications at least 3 months apart",
              "Pre-qualification tools: Use soft pull pre-approvals",
              "Application combining: Apply for multiple cards from same bank on same day",
              "Reconsideration lines: Call to overturn denials without new inquiries",
              "Business card strategy: Business inquiries often don't affect personal scores",
            ],
          },
          {
            type: "list",
            content: "Credit score version optimization:",
            items: [
              "FICO 8 vs FICO 9: Understand differences in scoring models",
              "Industry-specific scores: Auto and mortgage scores differ from general FICO",
              "VantageScore considerations: Some lenders use VantageScore instead of FICO",
              "Score monitoring: Track multiple score versions for complete picture",
              "Lender preferences: Research which scores your target lenders use",
              "Score alerts: Set up monitoring for all major score versions",
            ],
          },
          {
            type: "list",
            content: "Advanced dispute strategies:",
            items: [
              "Method of verification disputes: Challenge how information was verified",
              "Procedural disputes: Challenge credit bureau investigation procedures",
              "Furnisher disputes: Go directly to the data furnisher",
              "Goodwill letters: Request removal of accurate but negative information",
              "Executive escalation: Contact executive offices for complex issues",
              "Legal consultation: When to involve credit repair attorneys",
            ],
          },
          {
            type: "tip",
            content:
              "The AZEO (All Zero Except One) strategy can boost scores by 20-40 points temporarily. Use this technique before applying for major loans like mortgages, but maintain normal utilization patterns for long-term credit health.",
          },
        ],
        keyTakeaways: [
          "Advanced utilization strategies like AZEO can provide significant score boosts",
          "Credit portfolio management involves optimizing multiple cards and limits",
          "Understanding different FICO versions helps target specific lending decisions",
          "Advanced dispute strategies can remove difficult negative items",
        ],
        quiz: {
          questions: [
            {
              question: "What does the AZEO strategy stand for?",
              options: [
                "All Zero Except One",
                "Always Zero Every Option",
                "Automatic Zero Electronic Optimization",
                "Annual Zero Expense Optimization",
              ],
              correctAnswer: "All Zero Except One",
              explanation: "AZEO (All Zero Except One) is an advanced credit optimization strategy where you maintain 0% utilization on all credit cards except one, which carries a small balance of 1-2% to show active credit use.",
            },
          ],
        },
      },
    ],
    loans: [
      {
        title: "Auto Loans: Getting the Best Deal on Your Vehicle",
        duration: "9 min",
        points: 28,
        content: [
          {
            type: "heading",
            content: "Understanding Auto Loans and Financing Options",
          },
          {
            type: "paragraph",
            content:
              "Auto loans are secured loans where the vehicle serves as collateral. Understanding how auto financing works, where to get the best rates, and how to negotiate effectively can save you thousands of dollars over the life of your loan.",
          },
          {
            type: "list",
            content: "Types of auto loans and lenders:",
            items: [
              "Bank loans: Traditional banks often offer competitive rates for qualified borrowers",
              "Credit union loans: Often have the lowest rates and better terms",
              "Dealer financing: Convenient but may have higher rates or markups",
              "Online lenders: Competitive rates with quick pre-approval processes",
              "Manufacturer financing: Special promotional rates from car companies",
              "Buy-here-pay-here lots: High-risk, high-rate financing for poor credit",
            ],
          },
          {
            type: "list",
            content: "Factors that affect your auto loan rate:",
            items: [
              "Credit score: Higher scores get better rates (720+ for best rates)",
              "Loan term: Shorter terms typically have lower interest rates",
              "Down payment: Larger down payments reduce risk and rates",
              "Vehicle age: Newer cars often qualify for better rates",
              "Loan amount: Very small or very large loans may have higher rates",
              "Debt-to-income ratio: Lower ratios improve approval odds and rates",
            ],
          },
          {
            type: "example",
            content:
              "Sarah with a 750 credit score gets pre-approved at her credit union for 3.5% APR on a $25,000 car loan. The dealer offers 5.5% financing. By using her credit union loan, she saves $1,200 in interest over the 5-year loan term.",
          },
          {
            type: "list",
            content: "New vs. used car financing considerations:",
            items: [
              "New car rates: Typically 0.5-2% lower than used car rates",
              "Manufacturer incentives: 0% APR promotions vs. cash rebates",
              "Certified pre-owned: Often qualify for new car rates",
              "Used car age limits: Many lenders won't finance cars over 7-10 years old",
              "Mileage restrictions: High-mileage vehicles may not qualify",
              "Inspection requirements: Some lenders require mechanical inspections",
            ],
          },
          {
            type: "list",
            content: "Loan term considerations and trade-offs:",
            items: [
              "36-48 months: Higher payments but less interest paid overall",
              "60 months: Most common term, balance of payment and interest",
              "72-84 months: Lower payments but much more interest paid",
              "Negative equity risk: Longer terms increase underwater loan risk",
              "Total cost analysis: Always calculate total interest paid",
              "Early payoff: Shorter terms make early payoff more feasible",
            ],
          },
          {
            type: "list",
            content: "Down payment strategies:",
            items: [
              "20% down: Traditional recommendation to avoid negative equity",
              "10% minimum: Reduces monthly payments and interest rates",
              "Trade-in value: Can be applied as down payment",
              "Cash vs. financing: Sometimes 0% APR beats using cash",
              "Gap insurance: Consider if putting less than 20% down",
              "Emergency fund: Don't deplete savings completely for down payment",
            ],
          },
          {
            type: "tip",
            content:
              "Get pre-approved for financing before shopping for a car. This gives you negotiating power, helps you set a realistic budget, and prevents dealers from marking up interest rates. Credit unions often offer the best rates.",
          },
        ],
        keyTakeaways: [
          "Credit unions typically offer the best auto loan rates",
          "Get pre-approved before shopping to strengthen your negotiating position",
          "Shorter loan terms save money on interest despite higher monthly payments",
          "A 20% down payment helps avoid negative equity situations",
        ],
        quiz: {
          questions: [
            {
              question: "What typically offers the lowest auto loan interest rates?",
              options: ["Dealer financing", "Credit unions", "Online lenders", "Buy-here-pay-here lots"],
              correctAnswer: "Credit unions",
              explanation: "Credit unions are member-owned, non-profit organizations that typically offer the most competitive auto loan rates and terms to their members.",
            },
            {
              question: "What is the main risk of choosing a longer loan term (72-84 months)?",
              options: [
                "Higher monthly payments",
                "Paying much more interest overall",
                "Difficulty getting approved",
                "Higher down payment requirements",
              ],
              correctAnswer: "Paying much more interest overall",
              explanation: "While longer terms reduce monthly payments, they significantly increase the total interest paid over the life of the loan and increase the risk of being underwater on the loan.",
            },
          ],
        },
      },
      {
        title: "Student Loans: Navigating Education Financing",
        duration: "10 min",
        points: 32,
        content: [
          {
            type: "heading",
            content: "Federal vs. Private Student Loans: Making Smart Choices",
          },
          {
            type: "paragraph",
            content:
              "Student loans are a significant financial decision that can impact your finances for decades. Understanding the differences between federal and private loans, repayment options, and forgiveness programs is crucial for making informed decisions about education financing.",
          },
          {
            type: "list",
            content: "Federal student loan types and features:",
            items: [
              "Direct Subsidized Loans: Government pays interest while in school (undergrad only)",
              "Direct Unsubsidized Loans: Interest accrues from disbursement (all students)",
              "Direct PLUS Loans: For parents and graduate students, higher limits and rates",
              "Perkins Loans: Low-rate loans for exceptional need (program ended 2017)",
              "Fixed interest rates: Rates set annually, never change once borrowed",
              "No credit check: Most federal loans don't require credit approval",
            ],
          },
          {
            type: "list",
            content: "Federal loan borrowing limits (2023-2024):",
            items: [
              "Freshman: $5,500 ($3,500 subsidized max)",
              "Sophomore: $6,500 ($4,500 subsidized max)",
              "Junior/Senior: $7,500 ($5,500 subsidized max)",
              "Graduate students: $20,500 unsubsidized only",
              "Lifetime limits: $31,000 undergrad, $138,500 graduate",
              "PLUS loans: Up to cost of attendance minus other aid",
            ],
          },
          {
            type: "example",
            content:
              "Mike borrows the maximum federal loans for his 4-year degree: $27,000 total ($19,000 subsidized, $8,000 unsubsidized). His parents take a $15,000 PLUS loan. Total family debt is $42,000, but Mike's portion has better terms and repayment options than his parents' PLUS loan.",
          },
          {
            type: "list",
            content: "Private student loan characteristics:",
            items: [
              "Credit-based approval: Requires good credit or cosigner",
              "Variable or fixed rates: Rates can change over time with variable options",
              "Higher borrowing limits: Can cover full cost of attendance",
              "Fewer protections: Limited deferment, forbearance, and forgiveness options",
              "Cosigner release: Some lenders allow cosigner removal after payments",
              "Rate shopping: Can compare offers from multiple lenders",
            ],
          },
          {
            type: "list",
            content: "Federal loan repayment plans:",
            items: [
              "Standard: Fixed payments over 10 years, lowest total interest",
              "Graduated: Payments start low and increase every 2 years",
              "Extended: Lower payments over 25 years, more interest paid",
              "Income-Driven Repayment (IDR): Payments based on income and family size",
              "Income-Based Repayment (IBR): 10-15% of discretionary income",
              "Pay As You Earn (PAYE): 10% of discretionary income, newer borrowers only",
            ],
          },
          {
            type: "list",
            content: "Student loan forgiveness programs:",
            items: [
              "Public Service Loan Forgiveness (PSLF): 120 payments in public service",
              "Teacher Loan Forgiveness: Up to $17,500 for qualifying teachers",
              "IDR forgiveness: Remaining balance forgiven after 20-25 years",
              "Military service forgiveness: Various programs for service members",
              "State-specific programs: Many states offer loan forgiveness incentives",
              "Professional programs: Some careers offer loan repayment assistance",
            ],
          },
          {
            type: "list",
            content: "Smart borrowing strategies:",
            items: [
              "Exhaust federal options first before considering private loans",
              "Borrow only what you need, not the maximum available",
              "Consider community college for first two years",
              "Apply for scholarships and grants continuously",
              "Work part-time to reduce borrowing needs",
              "Choose majors with strong earning potential relative to debt",
            ],
          },
          {
            type: "tip",
            content:
              "Always complete the FAFSA (Free Application for Federal Student Aid) every year, even if you think you won't qualify for aid. Many scholarships and state aid programs require FAFSA completion, and eligibility can change based on family circumstances.",
          },
        ],
        keyTakeaways: [
          "Federal loans offer better protections and repayment options than private loans",
          "Income-driven repayment plans can make federal loans more manageable",
          "Public Service Loan Forgiveness can eliminate debt for qualifying public servants",
          "Borrow only what you need and exhaust federal options before considering private loans",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main advantage of federal student loans over private loans?",
              options: [
                "Lower interest rates always",
                "Higher borrowing limits",
                "Better repayment options and protections",
                "No interest charges",
              ],
              correctAnswer: "Better repayment options and protections",
              explanation: "Federal loans offer income-driven repayment plans, deferment and forbearance options, and forgiveness programs that private loans typically don't provide.",
            },
            {
              question: "How many qualifying payments are required for Public Service Loan Forgiveness?",
              options: ["60 payments", "120 payments", "180 payments", "240 payments"],
              correctAnswer: "120 payments",
              explanation: "Public Service Loan Forgiveness requires 120 qualifying monthly payments (10 years) while working full-time for a qualifying public service employer.",
            },
          ],
        },
      },
      {
        title: "Personal Loans: When and How to Use Them",
        duration: "8 min",
        points: 26,
        content: [
          {
            type: "heading",
            content: "Understanding Personal Loans and Their Best Uses",
          },
          {
            type: "paragraph",
            content:
              "Personal loans are unsecured installment loans that can be used for almost any purpose. They typically offer fixed rates and terms, making them predictable alternatives to credit cards for large expenses or debt consolidation.",
          },
          {
            type: "list",
            content: "Types of personal loans:",
            items: [
              "Unsecured personal loans: No collateral required, based on creditworthiness",
              "Secured personal loans: Backed by collateral like savings or CD",
              "Debt consolidation loans: Specifically marketed for combining debts",
              "Home improvement loans: May offer better rates for property improvements",
              "Medical loans: Specialized loans for healthcare expenses",
              "Peer-to-peer loans: Funded by individual investors through platforms",
            ],
          },
          {
            type: "list",
            content: "Best uses for personal loans:",
            items: [
              "Debt consolidation: Combine high-interest credit card debt",
              "Home improvements: Add value to your property",
              "Major purchases: Appliances, furniture, or equipment",
              "Medical expenses: Large medical bills or procedures",
              "Emergency expenses: When emergency fund is insufficient",
              "Wedding or major events: Fixed-cost celebrations",
            ],
          },
          {
            type: "example",
            content:
              "Jennifer has $15,000 in credit card debt across 4 cards with rates from 18-24%. She qualifies for a personal loan at 12% APR, saving her $2,400 in interest over 4 years while simplifying her payments to just one monthly bill.",
          },
          {
            type: "list",
            content: "Personal loan qualification factors:",
            items: [
              "Credit score: 600+ for approval, 700+ for best rates",
              "Income verification: Steady employment and sufficient income",
              "Debt-to-income ratio: Typically must be below 40-50%",
              "Employment history: Stable job history preferred",
              "Bank relationship: Existing customers may get better rates",
              "Loan purpose: Some lenders offer better rates for specific uses",
            ],
          },
          {
            type: "list",
            content: "Personal loan terms and features:",
            items: [
              "Loan amounts: Typically $1,000 to $100,000",
              "Interest rates: 6% to 36% APR depending on credit",
              "Loan terms: Usually 2 to 7 years",
              "Fixed payments: Same payment amount throughout the term",
              "No collateral: Unsecured loans don't require assets as security",
              "Origination fees: Some lenders charge 1-8% upfront fees",
            ],
          },
          {
            type: "list",
            content: "When NOT to use personal loans:",
            items: [
              "Discretionary spending: Vacations, luxury items, entertainment",
              "Investments: Never borrow to invest in stocks or crypto",
              "Small amounts: Credit cards may be better for amounts under $1,000",
              "Short-term needs: If you can pay off quickly, credit cards may be cheaper",
              "When you can't afford payments: Don't borrow if budget is already tight",
              "To pay other loans: Unless consolidating at a significantly lower rate",
            ],
          },
          {
            type: "list",
            content: "Shopping for personal loans:",
            items: [
              "Compare APRs: Look at total cost, not just interest rate",
              "Check for fees: Origination, prepayment, and late fees",
              "Pre-qualification: Many lenders offer soft credit pulls",
              "Read terms carefully: Understand all conditions and requirements",
              "Consider your bank first: Existing relationships may offer benefits",
              "Online vs. traditional: Online lenders often have competitive rates",
            ],
          },
          {
            type: "tip",
            content:
              "Personal loans work best for debt consolidation when you can get a rate at least 3-5 percentage points lower than your current debt. Always calculate the total cost over the life of the loan, not just the monthly payment.",
          },
        ],
        keyTakeaways: [
          "Personal loans are best for debt consolidation and large, planned expenses",
          "Fixed rates and terms make personal loans predictable and manageable",
          "Good credit (700+) is essential for competitive personal loan rates",
          "Always compare total costs, including fees, not just interest rates",
        ],
        quiz: {
          questions: [
            {
              question: "What is the best use case for a personal loan?",
              options: [
                "Vacation expenses",
                "Stock market investments",
                "High-interest credit card debt consolidation",
                "Emergency fund building",
              ],
              correctAnswer: "High-interest credit card debt consolidation",
              explanation: "Personal loans are ideal for consolidating high-interest credit card debt because they typically offer lower fixed rates and structured repayment terms.",
            },
            {
              question: "What credit score typically qualifies for the best personal loan rates?",
              options: ["600+", "650+", "700+", "750+"],
              correctAnswer: "700+",
              explanation: "While you can qualify for personal loans with scores around 600, the best rates and terms are typically reserved for borrowers with credit scores of 700 or higher.",
            },
          ],
        },
      },
      {
        title: "Loan Comparison and Shopping Strategies",
        duration: "7 min",
        points: 24,
        content: [
          {
            type: "heading",
            content: "How to Compare Loans and Find the Best Deal",
          },
          {
            type: "paragraph",
            content:
              "Shopping for loans requires understanding how to compare different offers, what terms matter most, and how to negotiate effectively. The right approach can save you thousands of dollars over the life of your loan.",
          },
          {
            type: "list",
            content: "Key loan terms to compare:",
            items: [
              "Annual Percentage Rate (APR): True cost including fees and interest",
              "Interest rate: The base rate before fees are added",
              "Loan term: Length of time to repay the loan",
              "Monthly payment: What you'll pay each month",
              "Total interest paid: Total cost over the life of the loan",
              "Fees: Origination, application, prepayment, and late fees",
            ],
          },
          {
            type: "list",
            content: "Understanding APR vs. interest rate:",
            items: [
              "Interest rate: The cost of borrowing the principal amount",
              "APR: Interest rate plus fees, expressed as yearly rate",
              "APR is higher: Always higher than interest rate when fees are involved",
              "True comparison tool: APR allows accurate comparison between lenders",
              "Regulation requirement: Lenders must disclose APR by law",
              "Focus on APR: Use APR for comparing loan offers",
            ],
          },
          {
            type: "example",
            content:
              "Lender A offers 8% interest with 2% origination fee (8.5% APR). Lender B offers 8.3% interest with no fees (8.3% APR). Despite the higher interest rate, Lender B is cheaper because the APR is lower.",
          },
          {
            type: "list",
            content: "Pre-qualification vs. pre-approval:",
            items: [
              "Pre-qualification: Soft credit pull, estimate based on self-reported info",
              "Pre-approval: Hard credit pull, verified income and credit check",
              "Pre-qualification benefits: No credit impact, quick process",
              "Pre-approval benefits: More accurate rates, stronger negotiating position",
              "Rate shopping period: Multiple auto/mortgage inquiries count as one",
              "Timing strategy: Get pre-approved before serious shopping",
            ],
          },
          {
            type: "list",
            content: "Loan shopping timeline and strategy:",
            items: [
              "Week 1: Research lenders and get pre-qualified with 3-5 lenders",
              "Week 2: Submit formal applications within 14-day window",
              "Week 3: Compare final offers and negotiate terms",
              "Week 4: Make final decision and complete loan process",
              "Rate lock: Some lenders offer rate locks during shopping",
              "Documentation: Keep all offers for comparison",
            ],
          },
          {
            type: "list",
            content: "Negotiation strategies:",
            items: [
              "Use competing offers: Show better rates from other lenders",
              "Highlight your strengths: Good credit, stable income, relationship",
              "Ask about rate matching: Many lenders will match competitor rates",
              "Consider relationship discounts: Existing customers often get breaks",
              "Timing matters: End of month/quarter may yield better deals",
              "Be prepared to walk away: Don't accept unfavorable terms",
            ],
          },
          {
            type: "list",
            content: "Red flags to avoid:",
            items: [
              "Guaranteed approval: Legitimate lenders don't guarantee approval",
              "No credit check: Legitimate loans require credit verification",
              "Upfront fees: Never pay fees before receiving loan funds",
              "Pressure tactics: Legitimate lenders don't pressure immediate decisions",
              "Unsolicited offers: Be wary of loans you didn't apply for",
              "Too good to be true: Extremely low rates may have hidden catches",
            ],
          },
          {
            type: "tip",
            content:
              "Always shop for loans within a concentrated time period (14-45 days for auto/mortgage loans) to minimize credit score impact. Get at least 3 quotes and use the best offer to negotiate with your preferred lender.",
          },
        ],
        keyTakeaways: [
          "Compare APR, not just interest rates, for accurate loan cost comparison",
          "Shop multiple lenders within a short timeframe to minimize credit impact",
          "Pre-approval gives you stronger negotiating power than pre-qualification",
          "Use competing offers to negotiate better terms with your preferred lender",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most accurate way to compare loan costs between lenders?",
              options: ["Interest rate", "Monthly payment", "APR", "Loan term"],
              correctAnswer: "APR",
              explanation: "APR (Annual Percentage Rate) includes both the interest rate and fees, making it the most accurate way to compare the true cost of loans from different lenders.",
            },
            {
              question: "What is the benefit of shopping for loans within a short time period?",
              options: [
                "Better interest rates",
                "Faster approval",
                "Minimal impact on credit score",
                "Lower fees",
              ],
              correctAnswer: "Minimal impact on credit score",
              explanation: "Multiple loan inquiries for the same type of loan (auto, mortgage) within 14-45 days are treated as a single inquiry for credit scoring purposes, minimizing the impact on your credit score.",
            },
          ],
        },
      },
    ],
    mortgages: [
      {
        title: "Mortgage Basics: Understanding Home Loans",
        duration: "10 min",
        points: 32,
        content: [
          {
            type: "heading",
            content: "The Foundation of Home Financing",
          },
          {
            type: "paragraph",
            content:
              "A mortgage is a secured loan used to purchase real estate, where the property itself serves as collateral. Understanding mortgage basics is crucial since this will likely be the largest financial commitment of your lifetime, potentially lasting 15-30 years.",
          },
          {
            type: "list",
            content: "Key mortgage components (PITI):",
            items: [
              "Principal: The amount borrowed to purchase the home",
              "Interest: The cost of borrowing money, expressed as an annual rate",
              "Taxes: Property taxes collected by local government",
              "Insurance: Homeowners insurance and possibly PMI",
              "HOA fees: Homeowners association dues (if applicable)",
              "Total monthly payment: PITI plus any HOA fees",
            ],
          },
          {
            type: "list",
            content: "Types of mortgage lenders:",
            items: [
              "Banks: Traditional lenders with physical branches",
              "Credit unions: Member-owned institutions often with competitive rates",
              "Mortgage companies: Specialize in home loans, may sell loans after closing",
              "Online lenders: Digital-first lenders with streamlined processes",
              "Mortgage brokers: Intermediaries who shop multiple lenders for you",
              "Government programs: FHA, VA, USDA direct lending programs",
            ],
          },
          {
            type: "example",
            content:
              "On a $300,000 home with 20% down ($60,000), your mortgage would be $240,000. With a 6.5% interest rate on a 30-year loan, your monthly payment would be approximately $1,517 for principal and interest, plus taxes and insurance.",
          },
          {
            type: "list",
            content: "Mortgage qualification factors:",
            items: [
              "Credit score: 620+ for conventional, 580+ for FHA, 740+ for best rates",
              "Debt-to-income ratio: Total monthly debts ÷ gross monthly income",
              "Employment history: 2+ years of stable employment preferred",
              "Down payment: 3-20% depending on loan type",
              "Assets: Cash reserves for closing costs and emergencies",
              "Property appraisal: Home must appraise for at least the purchase price",
            ],
          },
          {
            type: "list",
            content: "Debt-to-income ratio guidelines:",
            items: [
              "Front-end ratio: Housing payment ÷ gross income (28% max typically)",
              "Back-end ratio: Total monthly debts ÷ gross income (36-43% max)",
              "Conventional loans: Usually 28/36 ratios",
              "FHA loans: Allow up to 31/43 ratios",
              "Compensating factors: Higher ratios possible with strong credit/assets",
              "Manual underwriting: Human review for borderline cases",
            ],
          },
          {
            type: "list",
            content: "The mortgage application process:",
            items: [
              "Pre-qualification: Initial estimate based on basic financial info",
              "Pre-approval: Verified income/assets, conditional loan commitment",
              "Home shopping: Look for homes within your approved price range",
              "Purchase contract: Signed agreement with seller",
              "Formal application: Complete loan application with all documentation",
              "Processing and underwriting: Lender verifies all information",
              "Closing: Final loan documents signed, keys transferred",
            ],
          },
          {
            type: "list",
            content: "Required documentation for mortgage application:",
            items: [
              "Income verification: Pay stubs, W-2s, tax returns",
              "Asset verification: Bank statements, investment accounts",
              "Employment verification: Letter from employer or HR",
              "Credit authorization: Permission to pull credit report",
              "Property information: Purchase contract, property details",
              "Additional docs: Divorce decrees, gift letters, etc.",
            ],
          },
          {
            type: "tip",
            content:
              "Get pre-approved before house hunting, not just pre-qualified. Pre-approval involves income and asset verification, giving you a realistic budget and making your offers more competitive with sellers.",
          },
        ],
        keyTakeaways: [
          "Mortgages are secured loans where the property serves as collateral",
          "PITI (Principal, Interest, Taxes, Insurance) makes up your monthly payment",
          "Debt-to-income ratios are crucial for qualification (typically 28/36 limits)",
          "Pre-approval is stronger than pre-qualification for serious home shopping",
        ],
        quiz: {
          questions: [
            {
              question: "What does PITI stand for in mortgage terms?",
              options: [
                "Principal, Interest, Taxes, Insurance",
                "Payment, Interest, Taxes, Income",
                "Principal, Income, Taxes, Insurance",
                "Payment, Income, Total, Insurance",
              ],
              correctAnswer: "Principal, Interest, Taxes, Insurance",
              explanation: "PITI represents the four main components of a monthly mortgage payment: Principal (loan amount), Interest (cost of borrowing), Taxes (property taxes), and Insurance (homeowners insurance).",
            },
            {
              question: "What is typically the maximum back-end debt-to-income ratio for conventional mortgages?",
              options: ["28%", "31%", "36%", "43%"],
              correctAnswer: "36%",
              explanation: "The traditional back-end debt-to-income ratio limit for conventional mortgages is 36%, meaning your total monthly debt payments shouldn't exceed 36% of your gross monthly income.",
            },
          ],
        },
      },
      {
        title: "Types of Mortgages: Choosing the Right Loan",
        duration: "11 min",
        points: 35,
        content: [
          {
            type: "heading",
            content: "Fixed-Rate vs. Adjustable-Rate and Government Programs",
          },
          {
            type: "paragraph",
            content:
              "Different mortgage types serve different needs and financial situations. Understanding the pros and cons of each option helps you choose the loan that best fits your circumstances and long-term plans.",
          },
          {
            type: "list",
            content: "Fixed-rate mortgages:",
            items: [
              "Interest rate never changes throughout the loan term",
              "Predictable monthly payments for budgeting",
              "Protection against rising interest rates",
              "Common terms: 15-year and 30-year options",
              "Higher initial rates than ARM teaser rates",
              "Best for: Long-term homeowners, rising rate environments",
            ],
          },
          {
            type: "list",
            content: "Adjustable-rate mortgages (ARMs):",
            items: [
              "Interest rate adjusts periodically based on market conditions",
              "Lower initial rates than fixed-rate mortgages",
              "Rate caps limit how much rates can increase",
              "Common types: 5/1, 7/1, 10/1 ARMs (fixed period/adjustment frequency)",
              "Payment shock risk when rates adjust upward",
              "Best for: Short-term ownership, falling rate environments",
            ],
          },
          {
            type: "example",
            content:
              "A 5/1 ARM starts at 5.5% for 5 years, then adjusts annually. If rates rise to 7%, your payment on a $300,000 loan increases from $1,703 to $1,996 monthly - an extra $293 per month or $3,516 per year.",
          },
          {
            type: "list",
            content: "FHA loans (Federal Housing Administration):",
            items: [
              "Down payment: As low as 3.5% with 580+ credit score",
              "Credit requirements: 580+ for 3.5% down, 500+ for 10% down",
              "Mortgage insurance: Required for life of loan (most cases)",
              "Loan limits: Vary by area, generally lower than conventional",
              "Property requirements: Must meet FHA standards",
              "Best for: First-time buyers, lower credit scores, small down payments",
            ],
          },
          {
            type: "list",
            content: "VA loans (Veterans Affairs):",
            items: [
              "Down payment: $0 down payment required",
              "Credit requirements: No minimum score, but lenders typically want 620+",
              "Funding fee: One-time fee (can be financed into loan)",
              "No mortgage insurance: Significant monthly savings",
              "Eligibility: Veterans, active military, eligible spouses",
              "Reusable benefit: Can be used multiple times",
            ],
          },
          {
            type: "list",
            content: "USDA loans (Rural Development):",
            items: [
              "Down payment: $0 down payment in eligible rural areas",
              "Income limits: Must not exceed 115% of area median income",
              "Geographic restrictions: Rural and some suburban areas only",
              "Guarantee fee: Upfront and annual fees required",
              "Property requirements: Must be primary residence",
              "Best for: Rural homebuyers with moderate incomes",
            ],
          },
          {
            type: "list",
            content: "Jumbo loans (Non-conforming):",
            items: [
              "Loan amounts: Exceed conforming loan limits ($766,550 in most areas for 2024)",
              "Stricter requirements: Higher credit scores and down payments",
              "Interest rates: Often slightly higher than conforming loans",
              "Cash reserves: May require several months of payments in reserves",
              "Documentation: More stringent income and asset verification",
              "Best for: High-value properties in expensive markets",
            ],
          },
          {
            type: "list",
            content: "Choosing the right mortgage type:",
            items: [
              "Consider your timeline: How long do you plan to stay?",
              "Evaluate your finances: Credit score, down payment, income stability",
              "Assess risk tolerance: Comfortable with payment changes (ARM)?",
              "Compare total costs: Not just monthly payments",
              "Factor in mortgage insurance: PMI, MIP, or funding fees",
              "Consider future plans: Income changes, family size, etc.",
            ],
          },
          {
            type: "tip",
            content:
              "If you're planning to stay in your home for less than 7-10 years, an ARM might save you money. If you're planning to stay longer or want payment predictability, choose a fixed-rate mortgage.",
          },
        ],
        keyTakeaways: [
          "Fixed-rate mortgages offer payment stability, ARMs offer lower initial rates",
          "Government loans (FHA, VA, USDA) help buyers with limited down payments",
          "VA loans offer the best terms for eligible veterans with no down payment or PMI",
          "Choose your mortgage type based on your timeline and risk tolerance",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main advantage of a VA loan?",
              options: [
                "Lower interest rates",
                "No down payment and no mortgage insurance",
                "Available to all borrowers",
                "Shorter loan terms",
              ],
              correctAnswer: "No down payment and no mortgage insurance",
              explanation: "VA loans offer qualified veterans the ability to purchase homes with no down payment and no monthly mortgage insurance, providing significant savings compared to other loan types.",
            },
            {
              question: "What does the '5/1' in a 5/1 ARM mean?",
              options: [
                "5% interest rate, 1% down payment",
                "5-year term, 1-year payments",
                "5 years fixed rate, then adjusts annually",
                "5 payments per year, 1% fee",
              ],
              correctAnswer: "5 years fixed rate, then adjusts annually",
              explanation: "In a 5/1 ARM, the interest rate is fixed for the first 5 years, then adjusts annually (every 1 year) based on market conditions for the remainder of the loan term.",
            },
          ],
        },
      },
      {
        title: "Down Payments and Mortgage Insurance",
        duration: "9 min",
        points: 29,
        content: [
          {
            type: "heading",
            content: "Understanding Down Payment Requirements and PMI",
          },
          {
            type: "paragraph",
            content:
              "Down payments and mortgage insurance are closely related aspects of home financing. Understanding how they work together affects your monthly payment, total loan cost, and the amount of cash you need to purchase a home.",
          },
          {
            type: "list",
            content: "Down payment requirements by loan type:",
            items: [
              "Conventional loans: 3-20% (5-10% typical for first-time buyers)",
              "FHA loans: 3.5% minimum with 580+ credit score",
              "VA loans: $0 down payment for eligible veterans",
              "USDA loans: $0 down payment in eligible rural areas",
              "Jumbo loans: 10-20% minimum, often 20% for best rates",
              "Investment properties: 20-25% minimum down payment",
            ],
          },
          {
            type: "list",
            content: "Sources of down payment funds:",
            items: [
              "Personal savings: Most common and preferred source",
              "Gift funds: From family members with proper documentation",
              "Down payment assistance programs: State and local programs",
              "401(k) loans: Borrow from retirement (consider carefully)",
              "IRA withdrawals: First-time buyer exception ($10,000 lifetime)",
              "Employer assistance: Some employers offer homebuyer programs",
            ],
          },
          {
            type: "example",
            content:
              "On a $400,000 home: 20% down = $80,000 (no PMI), 10% down = $40,000 (with PMI ~$200/month), 3% down = $12,000 (with PMI ~$300/month). The PMI adds $2,400-$3,600 annually to your housing costs.",
          },
          {
            type: "list",
            content: "Private Mortgage Insurance (PMI) explained:",
            items: [
              "Required when: Conventional loan with less than 20% down",
              "Protects lender: Not the borrower, in case of default",
              "Cost range: 0.3% to 1.5% of loan amount annually",
              "Payment methods: Monthly premium, single premium, or lender-paid",
              "Removal options: Automatic at 78% LTV, request at 80% LTV",
              "Tax deductibility: May be deductible for certain income levels",
            ],
          },
          {
            type: "list",
            content: "PMI removal strategies:",
            items: [
              "Automatic removal: At 78% loan-to-value ratio (22% equity)",
              "Borrower-requested: At 80% LTV with good payment history",
              "Reappraisal: If home value increases significantly",
              "Extra principal payments: Accelerate equity building",
              "Home improvements: Increase property value for reappraisal",
              "Refinancing: New loan without PMI if you have 20% equity",
            ],
          },
          {
            type: "list",
            content: "FHA Mortgage Insurance Premium (MIP):",
            items: [
              "Upfront MIP: 1.75% of loan amount (can be financed)",
              "Annual MIP: 0.45% to 1.05% depending on loan terms",
              "Removal rules: Depends on down payment and loan date",
              "10% or more down: MIP removed after 11 years",
              "Less than 10% down: MIP for life of loan (most cases)",
              "Refinance option: Only way to remove MIP in many cases",
            ],
          },
          {
            type: "list",
            content: "Down payment vs. PMI trade-offs:",
            items: [
              "20% down: No PMI, lower monthly payment, more cash needed upfront",
              "10% down: Moderate PMI, balanced approach, keep some cash reserves",
              "5% down: Higher PMI, lower upfront cost, more monthly payment",
              "3% down: Highest PMI, minimal upfront cost, maximum monthly payment",
              "Opportunity cost: Consider investment returns vs. PMI costs",
              "Emergency fund: Don't deplete all savings for down payment",
            ],
          },
          {
            type: "list",
            content: "Down payment assistance programs:",
            items: [
              "First-time buyer programs: State and local government assistance",
              "Employer programs: Some companies offer homebuyer assistance",
              "Non-profit organizations: Habitat for Humanity, local housing groups",
              "Professional programs: Teachers, healthcare workers, public safety",
              "Military programs: Additional benefits beyond VA loans",
              "Rural programs: USDA and state rural development assistance",
            ],
          },
          {
            type: "tip",
            content:
              "If PMI will cost more than $200/month, consider saving for a larger down payment or looking at less expensive homes. However, don't wait too long if home prices are rising faster than you can save.",
          },
        ],
        keyTakeaways: [
          "PMI is required on conventional loans with less than 20% down payment",
          "PMI can be removed once you reach 20-22% equity in your home",
          "FHA MIP is often permanent and can only be removed by refinancing",
          "Don't deplete all savings for a down payment - keep emergency reserves",
        ],
        quiz: {
          questions: [
            {
              question: "At what loan-to-value ratio is PMI automatically removed?",
              options: [
                "80%",
                "78%",
                "75%",
                "70%",
              ],
              correctAnswer: "78%",
              explanation: "PMI is automatically removed when your loan balance reaches 78% of the original home value (meaning you have 22% equity), provided you're current on payments.",
            },
            {
              question: "What is the main difference between PMI and FHA MIP removal?",
              options: [
                "PMI is more expensive",
                "MIP can often only be removed by refinancing",
                "PMI is permanent",
                "MIP is automatically removed at 78% LTV",
              ],
              correctAnswer: "MIP can often only be removed by refinancing",
              explanation: "Unlike PMI which can be removed at 78-80% LTV, FHA MIP is often permanent (especially with less than 10% down) and can only be removed by refinancing to a conventional loan.",
            },
          ],
        },
      },
      {
        title: "The Home Buying Process",
        duration: "12 min",
        points: 38,
        content: [
          {
            type: "heading",
            content: "From Pre-Approval to Closing: A Step-by-Step Guide",
          },
          {
            type: "paragraph",
            content:
              "The home buying process involves multiple steps, professionals, and deadlines. Understanding each phase helps you navigate the process smoothly and avoid costly mistakes or delays.",
          },
          {
            type: "list",
            content: "Phase 1: Financial preparation and pre-approval:",
            items: [
              "Check credit reports and improve scores if needed",
              "Save for down payment and closing costs",
              "Gather financial documents (pay stubs, tax returns, bank statements)",
              "Get pre-approved with a lender (not just pre-qualified)",
              "Determine realistic budget including all housing costs",
              "Research neighborhoods and home prices",
            ],
          },
          {
            type: "list",
            content: "Phase 2: House hunting and making offers:",
            items: [
              "Find a qualified real estate agent",
              "Search for homes within your budget",
              "Attend open houses and schedule private showings",
              "Research comparable sales (comps) in the area",
              "Make competitive offers with appropriate contingencies",
              "Negotiate terms with sellers",
            ],
          },
          {
            type: "example",
            content:
              "Sarah gets pre-approved for $350,000, finds a $340,000 home, offers $345,000 with inspection and appraisal contingencies. After negotiation, they settle at $342,000 with seller paying $3,000 in closing costs.",
          },
          {
            type: "list",
            content: "Phase 3: Under contract and due diligence:",
            items: [
              "Sign purchase contract with contingencies and deadlines",
              "Order home inspection within contingency period",
              "Apply for homeowners insurance",
              "Submit formal mortgage application",
              "Order appraisal (lender requirement)",
              "Review title report and HOA documents",
            ],
          },
          {
            type: "list",
            content: "Key contingencies to understand:",
            items: [
              "Inspection contingency: Right to inspect and negotiate repairs",
              "Appraisal contingency: Protection if home doesn't appraise",
              "Financing contingency: Ability to cancel if loan is denied",
              "Title contingency: Ensures clear ownership transfer",
              "HOA review: Time to review association documents",
              "Sale of current home: If you need to sell first",
            ],
          },
          {
            type: "list",
            content: "Phase 4: Mortgage processing and underwriting:",
            items: [
              "Provide additional documentation as requested",
              "Avoid major financial changes (new debt, job changes)",
              "Respond promptly to lender requests",
              "Review loan estimate and closing disclosure",
              "Lock interest rate if not already done",
              "Coordinate closing date with all parties",
            ],
          },
          {
            type: "list",
            content: "Phase 5: Final walkthrough and closing:",
            items: [
              "Conduct final walkthrough 24-48 hours before closing",
              "Review closing disclosure 3 days before closing",
              "Arrange certified funds for closing costs",
              "Bring required identification and documents",
              "Sign loan documents and transfer ownership",
              "Receive keys and celebrate your new home!",
            ],
          },
          {
            type: "list",
            content: "Common closing costs (2-5% of home price):",
            items: [
              "Loan origination fees: 0.5-1% of loan amount",
              "Appraisal fee: $400-$800",
              "Home inspection: $300-$600",
              "Title insurance: $500-$2,000",
              "Attorney fees: $500-$1,500",
              "Recording fees and taxes: $100-$500",
              "Prepaid items: Property taxes, insurance, interest",
            ],
          },
          {
            type: "tip",
            content:
              "Don't make any major financial changes during the mortgage process - no new credit cards, car loans, or job changes. Lenders verify your financial situation right up until closing day.",
          },
        ],
        keyTakeaways: [
          "Get pre-approved before house hunting to strengthen your negotiating position",
          "Include appropriate contingencies in your offer to protect yourself",
          "Avoid financial changes during the mortgage process",
          "Budget for closing costs of 2-5% of the home's purchase price",
        ],
        quiz: {
          questions: [
            {
              question: "What is the purpose of an appraisal contingency?",
              options: [
                "To negotiate the home's price",
                "To inspect the home's condition",
                "To protect the buyer if the home doesn't appraise for the purchase price",
                "To review HOA documents",
              ],
              correctAnswer: "To protect the buyer if the home doesn't appraise for the purchase price",
              explanation: "An appraisal contingency allows the buyer to renegotiate or cancel the contract if the home appraises for less than the agreed purchase price, protecting them from overpaying.",
            },
            {
              question: "When should you conduct the final walkthrough?",
              options: [
                "Before making an offer",
                "After the home inspection",
                "24-48 hours before closing",
                "At the closing table",
              ],
              correctAnswer: "24-48 hours before closing",
              explanation: "The final walkthrough should be conducted 24-48 hours before closing to ensure the property is in the agreed-upon condition and any negotiated repairs have been completed.",
            },
          ],
        },
      },
      {
        title: "Refinancing Your Mortgage",
        duration: "10 min",
        points: 31,
        content: [
          {
            type: "heading",
            content: "When and How to Refinance for Maximum Benefit",
          },
          {
            type: "paragraph",
            content:
              "Refinancing replaces your existing mortgage with a new loan, potentially offering lower rates, different terms, or access to home equity. Understanding when refinancing makes sense can save you thousands of dollars over the life of your loan.",
          },
          {
            type: "list",
            content: "Types of refinancing:",
            items: [
              "Rate-and-term refinance: Change interest rate and/or loan term",
              "Cash-out refinance: Borrow against home equity for cash",
              "Cash-in refinance: Pay down principal to get better terms",
              "Streamline refinance: Simplified process for government loans",
              "No-closing-cost refinance: Lender pays costs in exchange for higher rate",
              "ARM to fixed conversion: Switch from adjustable to fixed rate",
            ],
          },
          {
            type: "list",
            content: "When refinancing makes sense:",
            items: [
              "Interest rates drop: Generally need 0.5-1% improvement to justify costs",
              "Credit score improvement: Better credit may qualify for lower rates",
              "Remove PMI: If home value increased enough to reach 20% equity",
              "Change loan terms: Switch from 30-year to 15-year or vice versa",
              "Access equity: Cash-out for home improvements or debt consolidation",
              "ARM adjustment: Before adjustable rate increases significantly",
            ],
          },
          {
            type: "example",
            content:
              "Mike has a $300,000 mortgage at 7% with 25 years left ($2,120/month). He refinances to 5.5% for 30 years, reducing his payment to $1,703/month - saving $417 monthly but extending the loan term and paying more interest overall.",
          },
          {
            type: "list",
            content: "Refinancing costs to consider:",
            items: [
              "Application and origination fees: 0.5-1.5% of loan amount",
              "Appraisal fee: $400-$800",
              "Title insurance: $500-$2,000",
              "Credit report and processing fees: $300-$800",
              "Recording fees and taxes: $100-$500",
              "Total costs: Typically 2-6% of loan amount",
            ],
          },
          {
            type: "list",
            content: "Break-even analysis:",
            items: [
              "Calculate total refinancing costs",
              "Determine monthly payment savings",
              "Divide costs by monthly savings = break-even months",
              "Consider how long you'll stay in the home",
              "Factor in tax implications of interest deduction changes",
              "Compare total interest paid over life of both loans",
            ],
          },
          {
            type: "list",
            content: "Cash-out refinancing considerations:",
            items: [
              "Maximum LTV: Usually 80% of current home value",
              "Higher rates: Cash-out refis typically have higher rates",
              "Tax implications: Interest may not be deductible depending on use",
              "Risk assessment: You're increasing your mortgage debt",
              "Good uses: Home improvements, high-interest debt consolidation",
              "Poor uses: Vacations, luxury purchases, risky investments",
            ],
          },
          {
            type: "list",
            content: "Streamline refinance programs:",
            items: [
              "FHA Streamline: Reduced documentation, no appraisal required",
              "VA IRRRL: Interest Rate Reduction Refinance Loan for veterans",
              "USDA Streamline: Simplified refinancing for USDA borrowers",
              "Conventional streamline: Some lenders offer simplified processes",
              "Benefits: Faster processing, lower costs, minimal documentation",
              "Limitations: Usually can't take cash out or change loan terms significantly",
            ],
          },
          {
            type: "list",
            content: "Refinancing mistakes to avoid:",
            items: [
              "Refinancing too frequently: Costs can outweigh benefits",
              "Extending loan term unnecessarily: Increases total interest paid",
              "Taking cash out for non-appreciating assets",
              "Not shopping multiple lenders for best rates",
              "Ignoring closing costs in decision-making",
              "Refinancing right before selling the home",
            ],
          },
          {
            type: "tip",
            content:
              "Use the 1% rule as a starting point: refinancing typically makes sense if you can reduce your rate by at least 1%. However, with today's closing costs, even 0.5% can be worthwhile if you'll stay in the home for several years.",
          },
        ],
        keyTakeaways: [
          "Refinancing makes sense when you can lower your rate by 0.5-1% or more",
          "Calculate break-even point by dividing closing costs by monthly savings",
          "Cash-out refinancing provides access to equity but increases your debt",
          "Streamline programs offer faster, cheaper refinancing for government loans",
        ],
        quiz: {
          questions: [
            {
              question: "What is the general rule for when refinancing makes financial sense?",
              options: [
                "Any rate reduction",
                "0.25% rate reduction",
                "0.5-1% rate reduction",
                "2% rate reduction",
              ],
              correctAnswer: "0.5-1% rate reduction",
              explanation: "The traditional rule is that refinancing makes sense when you can reduce your interest rate by at least 0.5-1%, though this depends on closing costs and how long you plan to stay in the home.",
            },
            {
              question: "What is the maximum loan-to-value ratio typically allowed for cash-out refinancing?",
              options: [
                "70%",
                "80%",
                "90%",
                "95%",
              ],
              correctAnswer: "80%",
              explanation: "Most lenders limit cash-out refinancing to 80% of the home's current value, meaning you must maintain at least 20% equity in your home.",
            },
          ],
        },
      },
    ],
    // Continue with other modules...
  }

  const moduleContent = lessons[moduleId]
  if (!moduleContent || lessonIndex < 0 || lessonIndex >= moduleContent.length) {
    return null
  }

  return moduleContent[lessonIndex]
}
