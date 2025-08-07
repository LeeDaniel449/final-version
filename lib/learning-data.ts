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
    "basics": [
      {
        title: "Understanding Money Flow",
        duration: "3 min",
        points: 10,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: [
          {
            type: "heading",
            content: "How Money Moves In and Out of Your Life",
          },
          {
            type: "paragraph",
            content:
              "Money flows through your life like water through pipes. Understanding this flow is the first step to taking control of your finances. For young adults, this often starts with understanding income from part-time jobs, gigs, or allowances.",
          },
          {
            type: "list",
            content: "Money comes in from:",
            items: [
              "Job or work income",
              "Allowance from parents",
              "Side hustles or part-time work (e.g., tutoring, babysitting)",
              "Gifts or birthday money",
              "Selling items you no longer need (online marketplaces)",
            ],
          },
          {
            type: "list",
            content: "Money goes out for:",
            items: [
              "Basic needs (food, clothing, transportation)",
              "Fun activities (movies, games, hanging out)",
              "School supplies and materials",
              "Savings for future goals (college, travel)",
              "Unexpected expenses (phone repair, concert tickets)",
            ],
          },
          {
            type: "example",
            content:
              "If you earn $100 from a part-time job and spend $80 on various things, you have $20 left over. This leftover money can be saved or spent on something special. Consider putting some of it towards a future goal like a concert or a new gadget.",
          },
          {
            type: "tip",
            content:
              "Track your money flow for one week using a budgeting app or a simple notebook. You'll be surprised by what you discover! Identify areas where you can cut back on spending and save more.",
          },
        ],
        keyTakeaways: [
          "Money flows in from various sources like work and gifts",
          "Money flows out for needs, wants, and savings",
          "Understanding your money flow helps you make better decisions",
          "Tracking money flow reveals spending patterns",
        ],
        quiz: {
          questions: [
            {
              question: "What is the first step to taking control of your finances?",
              options: [
                "Getting a credit card",
                "Understanding how money flows in and out of your life",
                "Investing in stocks",
                "Getting a high-paying job",
              ],
              correctAnswer: "Understanding how money flows in and out of your life",
              explanation:
                "Understanding your money flow helps you see where your money comes from and where it goes, which is essential for financial control.",
            },
          ],
        },
      },
      {
        title: "Needs vs Wants",
        duration: "3 min",
        points: 10,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: [
          {
            type: "heading",
            content: "Learning to Tell the Difference",
          },
          {
            type: "paragraph",
            content:
              "One of the most important money skills is knowing the difference between what you need and what you want. This helps you make smart spending decisions, especially when you're on a tight budget as a young adult.",
          },
          {
            type: "list",
            content: "Needs are things you must have:",
            items: [
              "Food and water",
              "Safe place to live (dorm, apartment)",
              "Basic clothing",
              "Transportation to school/work (bus pass, bike)",
              "Healthcare when sick",
            ],
          },
          {
            type: "list",
            content: "Wants are things you'd like to have:",
            items: [
              "Latest smartphone or gadgets",
              "Designer clothes or shoes",
              "Eating out at restaurants",
              "Entertainment and games",
              "Luxury items and upgrades",
            ],
          },
          {
            type: "example",
            content:
              "You need a phone to stay connected, but you want the newest iPhone. A basic phone meets your need, while the iPhone is a want that costs much more. Consider a used or older model to save money.",
          },
          {
            type: "tip",
            content:
              "Before buying something, ask yourself: 'Do I need this or do I want this?' Wait 24 hours before buying wants to see if you still really want them. Often, the urge will pass.",
          },
        ],
        keyTakeaways: [
          "Needs are essential for survival and basic functioning",
          "Wants are nice to have but not necessary",
          "Always cover needs before spending on wants",
          "The 24-hour rule helps avoid impulse purchases",
        ],
        quiz: {
          questions: [
            {
              question: "Which of these is a 'need' rather than a 'want'?",
              options: [
                "Designer sneakers",
                "Basic food for nutrition",
                "Gaming console",
                "Premium streaming subscriptions",
              ],
              correctAnswer: "Basic food for nutrition",
              explanation:
                "Food is essential for survival, making it a need. The other options are wants that enhance life but aren't necessary.",
            },
          ],
        },
      },
      {
        title: "The Power of Small Amounts",
        duration: "3 min",
        points: 10,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: [
          {
            type: "heading",
            content: "How Small Money Adds Up Big",
          },
          {
            type: "paragraph",
            content:
              "Small amounts of money might not seem important, but they can add up to surprising totals over time. This works for both spending and saving. As a young adult, even saving a few dollars a day can make a big difference.",
          },
          {
            type: "example",
            content:
              "Buying a $3 coffee every school day costs $15 per week, $60 per month, and $540 per school year. That's enough for a nice vacation or emergency fund! Consider making coffee at home to save money.",
          },
          {
            type: "list",
            content: "Small daily expenses that add up:",
            items: [
              "Snacks and drinks from vending machines",
              "Coffee or energy drinks",
              "App purchases and subscriptions",
              "Convenience store items",
              "Impulse purchases under $10",
            ],
          },
          {
            type: "list",
            content: "Small savings that grow big:",
            items: [
              "Saving loose change in a jar",
              "Setting aside $1-2 per day",
              "Keeping birthday money instead of spending it",
              "Saving money from not buying small items",
              "Putting away found money or refunds",
            ],
          },
          {
            type: "tip",
            content:
              "Try the 'latte factor' challenge: identify one small daily expense you can cut and save that money instead. You'll be amazed at how much you accumulate! Use that money for a specific goal, like a new laptop or concert tickets.",
          },
        ],
        keyTakeaways: [
          "Small amounts of money add up to large totals over time",
          "Daily expenses can cost hundreds per year",
          "Small savings can build substantial emergency funds",
          "Being aware of small expenses helps control spending",
        ],
        quiz: {
          questions: [
            {
              question:
                "If you spend $5 every weekday on snacks, how much do you spend per month (assuming 20 weekdays)?",
              options: ["$50", "$75", "$100", "$125"],
              correctAnswer: "$100",
              explanation: "$5 × 20 weekdays = $100 per month. Small daily expenses really add up!",
            },
          ],
        },
      },
      {
        title: "Building Good Money Habits",
        duration: "3 min",
        points: 10,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: [
          {
            type: "heading",
            content: "Creating Habits That Build Wealth",
          },
          {
            type: "paragraph",
            content:
              "Good money habits are like brushing your teeth - they become automatic and protect you over time. Start building these habits now while you're young. These habits will set you up for financial success in the future.",
          },
          {
            type: "list",
            content: "Essential money habits to develop:",
            items: [
              "Track where your money goes (use a budgeting app)",
              "Save something from every dollar you receive (even a small amount)",
              "Think before you buy anything (avoid impulse purchases)",
              "Compare prices before making purchases (shop around)",
              "Set aside money for goals and emergencies (build a safety net)",
            ],
          },
          {
            type: "example",
            content:
              "Sarah started saving $5 from every $20 she received. After one year, she had saved over $200 without even noticing because it became a habit. She used that money to buy a new textbook for college.",
          },
          {
            type: "list",
            content: "How to build new money habits:",
            items: [
              "Start small - even $1 saved is progress",
              "Be consistent - do it every time",
              "Make it easy - use apps or automatic transfers",
              "Track your progress - celebrate small wins",
              "Don't give up if you miss a day - just restart",
            ],
          },
          {
            type: "tip",
            content:
              "Pick one money habit to focus on for the next 30 days. Once it becomes automatic, add another habit. Building habits slowly makes them stick better. Try automating your savings to make it easier.",
          },
        ],
        keyTakeaways: [
          "Good money habits become automatic over time",
          "Start with small, manageable habits",
          "Consistency is more important than perfection",
          "Young people have time to benefit from compound habits",
        ],
        quiz: {
          questions: [
            {
              question: "What's the most important factor in building good money habits?",
              options: [
                "Starting with large amounts",
                "Being perfect every day",
                "Consistency over time",
                "Having a high income",
              ],
              correctAnswer: "Consistency over time",
              explanation:
                "Consistency is key to building lasting habits. Small, consistent actions compound over time to create significant results.",
            },
          ],
        },
      },
      {
        title: "Your Money Mindset",
        duration: "3 min",
        points: 10,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: [
          {
            type: "heading",
            content: "How You Think About Money Matters",
          },
          {
            type: "paragraph",
            content:
              "Your mindset about money affects every financial decision you make. Developing a healthy money mindset early will serve you for life. This is especially important for young adults as they start making their own financial decisions.",
          },
          {
            type: "list",
            content: "Healthy money mindset beliefs:",
            items: [
              "Money is a tool to help achieve your goals (travel, education)",
              "You can learn to manage money well (it's a skill)",
              "Saving money gives you freedom and choices (future opportunities)",
              "It's okay to spend on things you value (experiences, hobbies)",
              "Everyone makes money mistakes - learn from them (don't beat yourself up)",
            ],
          },
          {
            type: "list",
            content: "Unhealthy money mindset beliefs:",
            items: [
              "Money is evil or bad",
              "I'm not good with money",
              "Rich people are greedy",
              "I deserve to buy whatever I want",
              "Money problems will solve themselves",
            ],
          },
          {
            type: "example",
            content:
              "Instead of thinking 'I can't afford it,' try thinking 'How can I afford it?' This shifts your mind to finding solutions rather than giving up. Can you cut back on other expenses or find a side hustle?",
          },
          {
            type: "tip",
            content:
              "Pay attention to what you tell yourself about money. Replace negative thoughts with positive, growth-oriented ones. Your future self will thank you! Read books, listen to podcasts, and follow financial experts to learn more.",
          },
        ],
        keyTakeaways: [
          "Your money mindset affects all your financial decisions",
          "Healthy mindsets focus on learning and growth",
          "Money is a neutral tool - how you use it matters",
          "You can change your money mindset with practice",
        ],
        quiz: {
          questions: [
            {
              question: "Which mindset is healthiest when facing a financial challenge?",
              options: [
                "I'm just not good with money",
                "Money problems will solve themselves",
                "How can I learn to handle this better?",
                "Rich people have all the luck",
              ],
              correctAnswer: "How can I learn to handle this better?",
              explanation:
                "A growth mindset focuses on learning and improvement, which leads to better financial outcomes over time.",
            },
          ],
        },
      },
    ],
    budgeting: [
      {
        title: "Why Budgeting Works",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "The Foundation of Financial Success",
          },
          {
            type: "paragraph",
            content:
              "A budget is simply a plan for your money. It tells your money where to go instead of wondering where it went. Budgeting is the foundation that makes all other financial goals possible. For young adults, this means planning for expenses like rent, tuition, and social activities.",
          },
          {
            type: "list",
            content: "Benefits of budgeting:",
            items: [
              "Reduces financial stress and anxiety",
              "Helps you reach your goals faster (travel, education)",
              "Prevents overspending and debt",
              "Shows you where your money really goes",
              "Gives you control over your finances",
              "Helps you prepare for emergencies",
            ],
          },
          {
            type: "example",
            content:
              "Without a budget, Jake spent $200 on random purchases and couldn't afford his $150 car payment. With a budget, he allocated money for his car first, then had $50 for fun spending. This also applies to young adults who might spend too much on eating out and then can't afford textbooks.",
          },
          {
            type: "list",
            content: "Common budgeting myths:",
            items: [
              "Myth: Budgets are restrictive and no fun",
              "Truth: Budgets give you permission to spend on what matters",
              "Myth: You need to track every penny",
              "Truth: Focus on the big categories that matter most",
              "Myth: Budgets are only for people with money problems",
              "Truth: Wealthy people budget to stay wealthy",
            ],
          },
          {
            type: "tip",
            content:
              "Think of a budget as giving yourself permission to spend, not restricting yourself. You're deciding in advance how to use your money for maximum happiness and success. Include fun money in your budget so you don't feel deprived.",
          },
        ],
        keyTakeaways: [
          "Budgets are plans that give your money purpose",
          "Budgeting reduces stress and increases control",
          "Budgets enable spending on what matters most",
          "Everyone benefits from budgeting, regardless of income level",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main purpose of a budget?",
              options: [
                "To restrict all spending",
                "To tell your money where to go",
                "To make you feel guilty about purchases",
                "To track every single penny",
              ],
              correctAnswer: "To tell your money where to go",
              explanation:
                "A budget is a plan that directs your money toward your priorities and goals, rather than letting it disappear on random purchases.",
            },
          ],
        },
      },
      {
        title: "The 50/30/20 Rule",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "A Simple Framework for Budgeting Success",
          },
          {
            type: "paragraph",
            content:
              "The 50/30/20 rule is a simple budgeting framework that divides your after-tax income into three categories. It's perfect for beginners and provides a balanced approach to spending and saving. This rule can be adapted for young adults managing student loans and limited income.",
          },
          {
            type: "list",
            content: "The 50/30/20 breakdown:",
            items: [
              "50% for Needs: Essential expenses you can't avoid",
              "30% for Wants: Fun and lifestyle spending",
              "20% for Savings & Debt: Future you and debt payoff",
            ],
          },
          {
            type: "list",
            content: "Needs (50% of income):",
            items: [
              "Rent or housing costs",
              "Utilities (electricity, water, internet)",
              "Groceries and basic food",
              "Transportation (car payment, gas, public transit)",
              "Insurance (health, car, renters)",
              "Minimum debt payments (student loans)",
            ],
          },
          {
            type: "list",
            content: "Wants (30% of income):",
            items: [
              "Dining out and entertainment",
              "Hobbies and recreation",
              "Shopping for non-essentials",
              "Subscriptions (streaming, gym, apps)",
              "Travel and vacations",
              "Upgrades to nicer versions of needs",
            ],
          },
          {
            type: "example",
            content:
              "On a $3,000 monthly income: $1,500 for needs, $900 for wants, $600 for savings and extra debt payments. This ensures you cover essentials while still enjoying life and building wealth. If you have student loans, prioritize paying them down within the 20% category.",
          },
          {
            type: "list",
            content: "Savings & Debt (20% of income):",
            items: [
              "Emergency fund contributions",
              "Retirement savings (401k, IRA)",
              "Extra debt payments beyond minimums (student loans)",
              "Short-term goal savings (vacation, car)",
              "Long-term investments",
            ],
          },
          {
            type: "tip",
            content:
              "If you can't fit your needs into 50%, look for ways to reduce housing costs or transportation expenses. Consider living with roommates or using public transportation to save money.",
          },
        ],
        keyTakeaways: [
          "50/30/20 provides a balanced approach to budgeting",
          "50% for needs ensures you cover essential expenses",
          "30% for wants allows for enjoyment and lifestyle",
          "20% for savings and debt builds your financial future",
        ],
        quiz: {
          questions: [
            {
              question: "In the 50/30/20 rule, what percentage should go to wants?",
              options: ["20%", "30%", "50%", "40%"],
              correctAnswer: "30%",
              explanation:
                "The 50/30/20 rule allocates 30% of after-tax income to wants, allowing for entertainment, hobbies, and lifestyle spending while maintaining financial balance.",
            },
          ],
        },
      },
      {
        title: "Zero-Based Budgeting",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Give Every Dollar a Job",
          },
          {
            type: "paragraph",
            content:
              "Zero-based budgeting means your income minus your expenses equals zero. Every dollar gets assigned a purpose before the month begins. This method ensures no money slips through the cracks, which is especially helpful for young adults with variable income from part-time jobs.",
          },
          {
            type: "list",
            content: "How zero-based budgeting works:",
            items: [
              "List your total monthly income",
              "List all your expenses and savings goals",
              "Assign every dollar to a category",
              "Income - Expenses = $0",
              "Adjust categories until you reach zero",
            ],
          },
          {
            type: "example",
            content:
              "$2,500 income. Expenses: Rent $800, Food $300, Car $250, Insurance $100, Savings $400, Fun $350, Miscellaneous $300. Total: $2,500. Every dollar has a job! If your income varies, use your lowest expected income for the month.",
          },
          {
            type: "list",
            content: "Benefits of zero-based budgeting:",
            items: [
              "Prevents money from disappearing",
              "Forces intentional spending decisions",
              "Helps identify unnecessary expenses",
              "Ensures savings goals are prioritized",
              "Provides complete financial awareness",
            ],
          },
          {
            type: "list",
            content: "Common zero-based budget categories:",
            items: [
              "Housing (rent, utilities, maintenance)",
              "Transportation (car payment, gas, insurance)",
              "Food (groceries, dining out)",
              "Personal (clothing, haircuts, phone)",
              "Entertainment (movies, hobbies, subscriptions)",
              "Savings (emergency fund, retirement, goals)",
            ],
          },
          {
            type: "list",
            content: "Tips for zero-based success:",
            items: [
              "Start with last month's expenses as a baseline",
              "Include a 'miscellaneous' category for unexpected items",
              "Review and adjust weekly during your first month",
              "Use budgeting apps to track spending in real-time",
              "Don't be perfect - adjust as you learn your patterns",
            ],
          },
          {
            type: "tip",
            content:
              "If you have money left over after assigning all expenses, put it toward your highest priority goal - usually emergency fund or debt payoff. Consider using a budgeting app to help you track your progress.",
          },
        ],
        keyTakeaways: [
          "Zero-based budgeting assigns every dollar a purpose",
          "Income minus expenses should equal zero",
          "This method prevents money from being wasted",
          "Adjust categories as you learn your spending patterns",
        ],
        quiz: {
          questions: [
            {
              question: "In zero-based budgeting, what should income minus expenses equal?",
              options: ["$100", "$0", "10% of income", "Whatever is left over"],
              correctAnswer: "$0",
              explanation:
                "Zero-based budgeting assigns every dollar a purpose, so income minus all planned expenses and savings should equal zero.",
            },
          ],
        },
      },
      {
        title: "Tracking Your Spending",
        duration: "3 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Knowledge is Power in Budgeting",
          },
          {
            type: "paragraph",
            content:
              "You can't manage what you don't measure. Tracking your spending shows you exactly where your money goes and helps you make informed decisions about your budget. This is especially important for young adults who may not be aware of where their money is going.",
          },
          {
            type: "list",
            content: "Methods for tracking spending:",
            items: [
              "Budgeting apps (Mint, YNAB, EveryDollar)",
              "Bank and credit card statements",
              "Spreadsheets (Excel, Google Sheets)",
              "Pen and paper notebook",
              "Receipt collection and categorization",
              "Photo apps for receipt capture",
            ],
          },
          {
            type: "list",
            content: "What to track:",
            items: [
              "Fixed expenses (rent, insurance, subscriptions)",
              "Variable expenses (groceries, gas, entertainment)",
              "Irregular expenses (car maintenance, gifts)",
              "Cash spending (often forgotten)",
              "Small purchases (they add up quickly)",
            ],
          },
          {
            type: "example",
            content:
              "Maria thought she spent $200 on food monthly. After tracking for a month, she discovered she actually spent $350 - $150 on groceries and $200 on dining out. This awareness helped her adjust her budget. This is common for young adults who may underestimate how much they spend on eating out.",
          },
          {
            type: "list",
            content: "Benefits of spending tracking:",
            items: [
              "Reveals spending patterns and habits",
              "Identifies areas to cut back",
              "Shows if you're sticking to your budget",
              "Helps you make data-driven financial decisions",
              "Prevents budget leaks and overspending",
            ],
          },
          {
            type: "list",
            content: "Making tracking easier:",
            items: [
              "Use apps that connect to your bank accounts",
              "Set up automatic categorization rules",
              "Review spending weekly, not daily",
              "Focus on major categories, not every penny",
              "Take photos of receipts immediately",
            ],
          },
          {
            type: "tip",
            content:
              "Track your spending for at least one full month before creating your budget. This gives you realistic numbers to work with instead of guessing. Use a budgeting app to make this easier.",
          },
        ],
        keyTakeaways: [
          "Tracking spending reveals where your money actually goes",
          "Use whatever method you'll actually stick with",
          "Focus on major categories rather than every penny",
          "Track for a full month before finalizing your budget",
        ],
        quiz: {
          questions: [
            {
              question: "Why is tracking spending important for budgeting?",
              options: [
                "To make you feel guilty about purchases",
                "To reveal where your money actually goes",
                "To complicate your financial life",
                "To impress others with your organization",
              ],
              correctAnswer: "To reveal where your money actually goes",
              explanation:
                "Tracking spending provides the real data you need to create an accurate budget and identify areas for improvement.",
            },
          ],
        },
      },
      {
        title: "Budgeting for Irregular Expenses",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Planning for the Unexpected",
          },
          {
            type: "paragraph",
            content:
              "Irregular expenses are costs that don't happen every month but are predictable over time. Planning for these prevents them from derailing your budget when they occur. For young adults, this might include textbooks, spring break trips, or car repairs.",
          },
          {
            type: "list",
            content: "Common irregular expenses:",
            items: [
              "Car maintenance and repairs",
              "Medical and dental expenses",
              "Holiday and birthday gifts",
              "Annual insurance premiums",
              "Home maintenance and repairs",
              "Clothing and seasonal items",
              "Vacation and travel costs",
              "Professional development and education",
            ],
          },
          {
            type: "list",
            content: "How to budget for irregular expenses:",
            items: [
              "Estimate annual cost for each category",
              "Divide by 12 to get monthly savings amount",
              "Set aside money each month in separate savings",
              "Use high-yield savings or money market accounts",
              "Track what you've saved for each category",
            ],
          },
          {
            type: "example",
            content:
              "Car maintenance costs $1,200 per year on average. Save $100 per month in a 'car fund.' When you need $400 for new tires, the money is already there without impacting your regular budget. This also applies to textbooks, which can be a significant expense for students.",
          },
          {
            type: "list",
            content: "Sinking funds strategy:",
            items: [
              "Create separate savings 'buckets' for each irregular expense",
              "Automate transfers to these funds monthly",
              "Use online banks with multiple savings accounts",
              "Label each account clearly (Car Fund, Gift Fund, etc.)",
              "Only use the money for its intended purpose",
            ],
          },
          {
            type: "list",
            content: "Benefits of planning irregular expenses:",
            items: [
              "Prevents budget emergencies",
              "Reduces financial stress",
              "Avoids credit card debt",
              "Allows for better financial planning",
              "Gives you control over timing of purchases",
            ],
          },
          {
            type: "tip",
            content:
              "Start with the most important irregular expenses first - car maintenance and medical costs. Add other categories as your budget allows. Use a spreadsheet to track your sinking funds.",
          },
        ],
        keyTakeaways: [
          "Irregular expenses are predictable over time",
          "Save monthly for annual or occasional costs",
          "Sinking funds prevent budget emergencies",
          "Start with the most critical irregular expenses first",
        ],
        quiz: {
          questions: [
            {
              question: "What is the best way to handle irregular expenses?",
              options: [
                "Put them on credit cards when they happen",
                "Save monthly for them in advance",
                "Ignore them until they occur",
                "Borrow money from family",
              ],
              correctAnswer: "Save monthly for them in advance",
              explanation:
                "Saving monthly for irregular expenses (sinking funds) prevents them from becoming financial emergencies and keeps your budget on track.",
            },
          ],
        },
      },
      {
        title: "Budget Adjustments and Reviews",
        duration: "3 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Making Your Budget Work for Real Life",
          },
          {
            type: "paragraph",
            content:
              "Your budget is a living document that should change as your life changes. Regular reviews and adjustments ensure your budget stays realistic and effective. This is especially important for young adults whose income and expenses may fluctuate.",
          },
          {
            type: "list",
            content: "When to review your budget:",
            items: [
              "Monthly: Check if you stayed on track",
              "When income changes (raise, new job, loss of income)",
              "When major expenses change (move, new car payment)",
              "When life circumstances change (marriage, baby, school)",
              "When you consistently overspend in a category",
              "At least quarterly for overall assessment",
            ],
          },
          {
            type: "list",
            content: "Signs your budget needs adjustment:",
            items: [
              "Consistently overspending in certain categories",
              "Having money left over with no purpose",
              "Feeling restricted or deprived",
              "Unable to stick to the budget for weeks",
              "Major life changes affecting income or expenses",
            ],
          },
          {
            type: "example",
            content:
              "Tom budgeted $200 for groceries but consistently spent $280. Instead of feeling guilty, he adjusted his grocery budget to $250 and reduced his entertainment budget by $50. This is a common scenario, so don't be afraid to adjust your budget as needed.",
          },
          {
            type: "list",
            content: "How to make budget adjustments:",
            items: [
              "Identify which categories are consistently over or under",
              "Look for patterns in your overspending",
              "Adjust amounts based on actual spending data",
              "Move money between categories as needed",
              "Don't increase total spending without increasing income",
            ],
          },
          {
            type: "list",
            content: "Monthly budget review questions:",
            items: [
              "Which categories did I overspend in?",
              "Which categories had money left over?",
              "What unexpected expenses came up?",
              "What worked well this month?",
              "What changes do I need to make next month?",
            ],
          },
          {
            type: "tip",
            content:
              "Don't abandon your budget if you overspend one month. Instead, learn from it and adjust. The goal is progress, not perfection. Be flexible and adapt your budget to your changing needs.",
          },
        ],
        keyTakeaways: [
          "Budgets should be reviewed and adjusted regularly",
          "Consistent overspending signals need for adjustment",
          "Life changes require budget changes",
          "Focus on progress, not perfection",
        ],
        quiz: {
          questions: [
            {
              question: "How often should you review your budget?",
              options: [
                "Once a year",
                "Only when you overspend",
                "Monthly, and when major changes occur",
                "Never - set it and forget it",
              ],
              correctAnswer: "Monthly, and when major changes occur",
              explanation:
                "Regular monthly reviews help you stay on track, while major life changes require immediate budget adjustments to remain realistic.",
            },
          ],
        },
      },
    ],
    saving: [
      {
        title: "The Psychology of Saving",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Understanding Why Saving is Hard",
          },
          {
            type: "paragraph",
            content:
              "Saving money goes against our natural instincts. Our brains are wired to prioritize immediate rewards over future benefits. Understanding this psychology helps you develop strategies to overcome these mental barriers. This is especially relevant for young adults who are often bombarded with marketing and social pressures to spend.",
          },
          {
            type: "list",
            content: "Why saving feels difficult:",
            items: [
              "Instant gratification bias - we want rewards now",
              "Present bias - future benefits feel less real",
              "Social pressure to spend and keep up with others",
              "Advertising designed to trigger spending impulses",
              "Lack of visible progress in early stages",
              "Fear of missing out on experiences",
            ],
          },
          {
            type: "list",
            content: "Mental tricks to make saving easier:",
            items: [
              "Pay yourself first - save before spending",
              "Automate savings so it happens without thinking",
              "Make saving visible with charts or apps",
              "Set specific, meaningful goals for your savings",
              "Celebrate small wins and milestones",
              "Find free or low-cost alternatives for entertainment",
            ],
          },
          {
            type: "example",
            content:
              "Instead of saving 'whatever is left over' (usually nothing), Maya automatically transfers $100 to savings on payday. She never sees the money, so she doesn't miss it. This can be easily set up with most banks.",
          },
          {
            type: "list",
            content: "Reframe your thinking about saving:",
            items: [
              "Saving is paying your future self",
              "Saving buys you freedom and options",
              "Saving reduces stress and anxiety",
              "Saving allows you to help others",
              "Saving is self-care, not self-denial",
            ],
          },
          {
            type: "tip",
            content:
              "Start with saving just 1% of your income. Once that feels normal, increase to 2%, then 3%. Gradual increases feel less painful than jumping to 10% immediately. Every little bit helps!",
          },
        ],
        keyTakeaways: [
          "Our brains naturally prefer immediate rewards over future benefits",
          "Automation removes willpower from the saving equation",
          "Reframing saving as self-care makes it more appealing",
          "Start small and gradually increase your saving rate",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most effective way to overcome the psychology that makes saving difficult?",
              options: [
                "Rely on willpower and discipline",
                "Save whatever is left over each month",
                "Automate your savings",
                "Only save when you feel motivated",
              ],
              correctAnswer: "Automate your savings",
              explanation:
                "Automation removes the psychological barriers and decision fatigue that make saving difficult, ensuring it happens consistently without relying on willpower.",
            },
          ],
        },
      },
      {
        title: "Automating Your Savings",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Set It and Forget It Wealth Building",
          },
          {
            type: "paragraph",
            content:
              "Automation is the secret weapon of successful savers. By setting up automatic transfers, you remove emotions and decision-making from saving, making it as reliable as paying your rent. This is especially helpful for young adults who are busy with school and work.",
          },
          {
            type: "list",
            content: "Types of savings automation:",
            items: [
              "Automatic transfers from checking to savings",
              "Direct deposit splitting between accounts",
              "Employer 401(k) contributions",
              "Round-up apps that save spare change",
              "Automatic investment contributions",
              "High-yield savings account transfers",
            ],
          },
          {
            type: "list",
            content: "How to set up savings automation:",
            items: [
              "Choose a specific amount and frequency",
              "Schedule transfers for right after payday",
              "Use separate accounts for different goals",
              "Start small and increase over time",
              "Set up multiple automated savings streams",
              "Review and adjust quarterly",
            ],
          },
          {
            type: "example",
            content:
              "Alex sets up three automatic transfers: $200 to emergency fund, $150 to vacation fund, and $100 to car replacement fund. Every payday, $450 is automatically saved before he can spend it. This can be easily set up through your bank's website or app.",
          },
          {
            type: "list",
            content: "Benefits of automated saving:",
            items: [
              "Removes temptation to spend the money",
              "Creates consistent saving habits",
              "Reduces decision fatigue",
              "Makes saving feel effortless",
              "Helps you reach goals faster",
              "Builds wealth without thinking about it",
            ],
          },
          {
            type: "list",
            content: "Automation tools and apps:",
            items: [
              "Bank automatic transfers",
              "Acorns (round-up investing)",
              "Digit (AI-powered saving)",
              "YNAB (budgeting with automation)",
              "Employer payroll splitting",
              "Investment account auto-contributions",
            ],
          },
          {
            type: "tip",
            content:
              "Treat your automated savings like a bill that must be paid. If you can afford your rent, you can afford to pay your future self. Set it up and forget about it!",
          },
        ],
        keyTakeaways: [
          "Automation makes saving effortless and consistent",
          "Set up transfers right after payday for best results",
          "Use separate accounts for different savings goals",
          "Start small and gradually increase automated amounts",
        ],
        quiz: {
          questions: [
            {
              question: "When is the best time to schedule automatic savings transfers?",
              options: [
                "At the end of the month",
                "Right after payday",
                "When you remember to do it",
                "Only when you have extra money",
              ],
              correctAnswer: "Right after payday",
              explanation:
                "Scheduling transfers right after payday ensures the money is saved before you have a chance to spend it on other things.",
            },
          ],
        },
      },
      {
        title: "High-Yield Savings Accounts",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Making Your Money Work Harder",
          },
          {
            type: "paragraph",
            content:
              "Not all savings accounts are created equal. High-yield savings accounts can earn 10-20 times more interest than traditional bank accounts, helping your money grow faster while staying safe and accessible. This is a great way for young adults to maximize their savings.",
          },
          {
            type: "list",
            content: "Benefits of high-yield savings accounts:",
            items: [
              "Higher interest rates (often 4-5% vs 0.01%)",
              "FDIC insured up to $250,000",
              "No risk of losing money",
              "Easy online access to funds",
              "Often no minimum balance requirements",
              "Compound interest helps money grow faster",
            ],
          },
          {
            type: "example",
            content:
              "$10,000 in a traditional bank account earning 0.01% makes $1 per year. The same amount in a high-yield account earning 4% makes $400 per year - that's $399 more for doing nothing! This extra money can be used for your goals.",
          },
          {
            type: "list",
            content: "Where to find high-yield savings accounts:",
            items: [
              "Online banks (Ally, Marcus, Capital One 360)",
              "Credit unions",
              "Community banks",
              "Fintech companies (SoFi, CIT Bank)",
              "Money market accounts",
              "Compare rates on Bankrate or NerdWallet",
            ],
          },
          {
            type: "list",
            content: "What to look for in a high-yield account:",
            items: [
              "Competitive interest rate (check current market rates)",
              "FDIC or NCUA insurance",
              "No monthly maintenance fees",
              "Low or no minimum balance",
              "Easy online and mobile access",
              "Good customer service ratings",
            ],
          },
          {
            type: "list",
            content: "Maximizing your high-yield savings:",
            items: [
              "Shop around for the best rates regularly",
              "Consider multiple accounts for different goals",
              "Set up automatic transfers to maximize deposits",
              "Don't chase rates that require high minimums",
              "Keep some money in checking for daily expenses",
            ],
          },
          {
            type: "tip",
            content:
              "Interest rates change over time. Review your savings account rates annually and be willing to switch if you find significantly better rates elsewhere. Don't be afraid to shop around for the best deal!",
          },
        ],
        keyTakeaways: [
          "High-yield accounts earn significantly more than traditional savings",
          "Online banks typically offer the best rates",
          "FDIC insurance keeps your money safe",
          "Shop around and compare rates regularly",
        ],
        quiz: {
          questions: [
            {
              question: "How much more can a high-yield savings account earn compared to a traditional bank account?",
              options: ["About the same", "2-3 times more", "10-20 times more", "100 times more"],
              correctAnswer: "10-20 times more",
              explanation:
                "High-yield savings accounts typically earn 10-20 times more interest than traditional bank accounts, making them a much better choice for growing your savings.",
            },
          ],
        },
      },
      {
        title: "The 52-Week Savings Challenge",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "A Fun Way to Build Your Savings Habit",
          },
          {
            type: "paragraph",
            content:
              "The 52-week savings challenge is a popular method that makes saving feel like a game. You save an increasing amount each week, building both your savings account and your saving habit gradually. This is a great way for young adults to build an emergency fund or save for a specific goal.",
          },
          {
            type: "list",
            content: "How the traditional 52-week challenge works:",
            items: [
              "Week 1: Save $1",
              "Week 2: Save $2",
              "Week 3: Save $3",
              "Continue increasing by $1 each week",
              "Week 52: Save $52",
              "Total saved: $1,378 by year end",
            ],
          },
          {
            type: "list",
            content: "Variations of the challenge:",
            items: [
              "Reverse challenge: Start with $52, end with $1",
              "Double challenge: Save $2, $4, $6, etc. (Total: $2,756)",
              "Bi-weekly challenge: Save every two weeks instead",
              "Custom amounts: Adjust numbers to fit your budget",
              "Round number challenge: $5, $10, $15, etc.",
            ],
          },
          {
            type: "example",
            content:
              "Sarah chose the reverse challenge, starting with $52 in January when she had holiday money, then decreasing amounts as the year progressed and other expenses increased. This can be a good strategy if you know you'll have more expenses later in the year.",
          },
          {
            type: "list",
            content: "Benefits of the 52-week challenge:",
            items: [
              "Makes saving feel like a game",
              "Builds consistent saving habits",
              "Provides visible progress tracking",
              "Flexible and customizable",
              "Great for beginners",
              "Creates momentum and motivation",
            ],
          },
          {
            type: "list",
            content: "Tips for success:",
            items: [
              "Use a separate savings account for the challenge",
              "Set up automatic transfers if possible",
              "Track your progress visually with a chart",
              "Adjust amounts if needed - consistency matters more",
              "Celebrate milestones along the way",
              "Find an accountability partner",
            ],
          },
          {
            type: "list",
            content: "What to do with your challenge savings:",
            items: [
              "Start or boost your emergency fund",
              "Save for a specific goal (vacation, car)",
              "Invest in a retirement account",
              "Use as a down payment fund",
              "Create multiple sinking funds",
            ],
          },
          {
            type: "tip",
            content:
              "If the traditional amounts don't fit your budget, create your own version. The key is consistency, not the specific dollar amounts. Make it work for you!",
          },
        ],
        keyTakeaways: [
          "The 52-week challenge makes saving feel like a game",
          "Multiple variations allow customization to your budget",
          "Consistency is more important than specific amounts",
          "Visual tracking helps maintain motivation",
        ],
        quiz: {
          questions: [
            {
              question: "How much money do you save in the traditional 52-week savings challenge?",
              options: ["$1,000", "$1,378", "$1,500", "$2,000"],
              correctAnswer: "$1,378",
              explanation:
                "The traditional 52-week challenge, where you save $1 the first week and increase by $1 each week, results in total savings of $1,378.",
            },
          ],
        },
      },
      {
        title: "Saving for Multiple Goals",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Juggling Different Financial Priorities",
          },
          {
            type: "paragraph",
            content:
              "Most people have multiple financial goals at once - emergency fund, vacation, car, house down payment. Learning to save for multiple goals simultaneously helps you make progress on all fronts without feeling overwhelmed. This is especially relevant for young adults who may be saving for college, travel, and a future apartment.",
          },
          {
            type: "list",
            content: "Common multiple savings goals:",
            items: [
              "Emergency fund (3-6 months expenses)",
              "Vacation or travel fund",
              "Car down payment or replacement",
              "House down payment",
              "Wedding expenses",
              "Holiday and gift fund",
              "Professional development or education",
              "Home improvement projects",
            ],
          },
          {
            type: "list",
            content: "Strategies for multiple goal saving:",
            items: [
              "Prioritize goals by importance and timeline",
              "Use separate savings accounts for each goal",
              "Allocate percentages of savings to each goal",
              "Focus on one goal at a time if budget is tight",
              "Use windfalls (tax refunds, bonuses) strategically",
              "Adjust allocations as goals are achieved",
            ],
          },
          {
            type: "example",
            content:
              "Mike saves $500 monthly: $200 to emergency fund (priority), $150 to vacation fund (6 months away), $100 to car fund (2 years away), $50 to gift fund (ongoing). This allows him to make progress on all his goals simultaneously.",
          },
          {
            type: "list",
            content: "Goal prioritization framework:",
            items: [
              "Tier 1: Emergency fund and debt payoff",
              "Tier 2: Short-term needs (car repairs, etc.)",
              "Tier 3: Medium-term goals (vacation, wedding)",
              "Tier 4: Long-term goals (house, retirement)",
              "Adjust based on your specific situation",
            ],
          },
          {
            type: "list",
            content: "Tools for managing multiple goals:",
            items: [
              "High-yield savings with sub-accounts",
              "Multiple savings accounts at different banks",
              "Budgeting apps with goal tracking",
              "Spreadsheets with progress tracking",
              "Visual charts or thermometers",
              "Automatic transfers to each goal",
            ],
          },
          {
            type: "tip",
            content:
              "Don't spread your savings too thin across too many goals. Focus on 3-4 main goals at a time for better progress and motivation. Make sure your goals are realistic and achievable.",
          },
        ],
        keyTakeaways: [
          "Most people have multiple financial goals simultaneously",
          "Prioritize goals by importance and timeline",
          "Use separate accounts to track progress clearly",
          "Don't spread savings too thin across too many goals",
        ],
        quiz: {
          questions: [
            {
              question: "What should be your first priority when saving for multiple goals?",
              options: ["Vacation fund", "Emergency fund", "Car down payment", "Wedding expenses"],
              correctAnswer: "Emergency fund",
              explanation:
                "Emergency fund should be the top priority as it protects you from going into debt when unexpected expenses occur, enabling you to continue working toward other goals.",
            },
          ],
        },
      },
      {
        title: "Overcoming Savings Obstacles",
        duration: "5 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Breaking Through Common Barriers",
          },
          {
            type: "paragraph",
            content:
              "Everyone faces obstacles when trying to save money. The key is recognizing these barriers and developing specific strategies to overcome them. Most savings obstacles are mental, not mathematical. This is especially true for young adults who may be facing student loan debt and limited income.",
          },
          {
            type: "list",
            content: "Common savings obstacles:",
            items: [
              "Living paycheck to paycheck",
              "Unexpected expenses derailing progress",
              "Social pressure to spend",
              "Lack of clear goals or motivation",
              "Perfectionism (all-or-nothing thinking)",
              "Comparing yourself to others",
              "Fear of missing out on experiences",
            ],
          },
          {
            type: "list",
            content: "Strategies for low-income saving:",
            items: [
              "Start with just $1-5 per week",
              "Save windfalls (tax refunds, gifts, rebates)",
              "Use the envelope method for cash spending",
              "Find free entertainment alternatives",
              "Sell items you no longer need",
              "Look for ways to increase income",
            ],
          },
          {
            type: "example",
            content:
              "Lisa felt she couldn't save on her tight budget. She started saving just $5 per week by bringing lunch from home twice a week instead of buying it. After a year, she had $260 saved. This shows that even small changes can make a big difference.",
          },
          {
            type: "list",
            content: "Dealing with setbacks:",
            items: [
              "Expect setbacks - they're normal",
              "Don't abandon your goals after one bad month",
              "Adjust your savings amount if needed",
              "Focus on getting back on track quickly",
              "Learn from what caused the setback",
              "Celebrate small wins and progress",
            ],
          },
          {
            type: "list",
            content: "Overcoming social pressure:",
            items: [
              "Be honest with friends about your financial goals",
              "Suggest free or low-cost activities",
              "Remember that true friends will support your goals",
              "Find accountability partners with similar goals",
              "Practice saying no to expensive activities",
              "Focus on experiences that align with your values",
            ],
          },
          {
            type: "list",
            content: "Building motivation:",
            items: [
              "Write down specific reasons for saving",
              "Visual reminders of your goals",
              "Track progress regularly",
              "Celebrate milestones",
              "Connect with your future self",
              "Remember that small amounts add up",
            ],
          },
          {
            type: "tip",
            content:
              "If you can't save money, focus on not going further into debt. Sometimes maintaining your current position is progress when facing financial challenges. Don't get discouraged!",
          },
        ],
        keyTakeaways: [
          "Most savings obstacles are mental, not mathematical",
          "Start small if money is tight - any amount counts",
          "Expect setbacks and have a plan to recover",
          "Social pressure can be overcome with clear communication",
        ],
        quiz: {
          questions: [
            {
              question: "What should you do if you experience a setback in your savings plan?",
              options: [
                "Give up on saving entirely",
                "Feel guilty and ashamed",
                "Learn from it and get back on track",
                "Wait until next year to start over",
              ],
              correctAnswer: "Learn from it and get back on track",
              explanation:
                "Setbacks are normal in any financial journey. The key is to learn from what caused the setback and quickly return to your savings plan rather than abandoning it entirely.",
            },
          ],
        },
      },
    ],
    "debt-management": [
      {
        title: "Understanding Different Types of Debt",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Good Debt vs Bad Debt: Know the Difference",
          },
          {
            type: "paragraph",
            content:
              "Not all debt is created equal. Understanding the difference between good debt and bad debt is crucial for making smart financial decisions and building wealth over time. This is especially important for young adults who are often faced with student loans and credit card offers.",
          },
          {
            type: "list",
            content: "Good debt typically:",
            items: [
              "Helps you build wealth or increase income over time",
              "Has tax advantages or deductions",
              "Has relatively low interest rates",
              "Appreciates in value or generates income",
              "Examples: mortgages, student loans, business loans",
            ],
          },
          {
            type: "list",
            content: "Bad debt typically:",
            items: [
              "Decreases in value over time",
              "Has high interest rates",
              "Provides no tax benefits",
              "Is used for consumption rather than investment",
              "Examples: credit cards, payday loans, car loans",
            ],
          },
          {
            type: "example",
            content:
              "A mortgage at 4% interest that helps you build equity in a home is good debt. A credit card at 24% interest used for vacation expenses is bad debt. Student loans can be considered good debt if they lead to a higher-paying job.",
          },
          {
            type: "tip",
            content:
              "Focus on paying off bad debt first, especially high-interest credit cards. Good debt can often be managed with minimum payments while you build wealth elsewhere. Prioritize paying off credit card debt to avoid high interest charges.",
          },
        ],
        keyTakeaways: [
          "Good debt helps build wealth, bad debt drains it",
          "Interest rates and tax benefits distinguish debt types",
          "Prioritize paying off bad debt first",
          "Some debt can be a tool for building wealth",
        ],
        quiz: {
          questions: [
            {
              question: "Which of these is typically considered 'good debt'?",
              options: ["Credit card debt", "Payday loan", "Mortgage", "Store financing"],
              correctAnswer: "Mortgage",
              explanation:
                "A mortgage is good debt because it helps you build equity in an appreciating asset (your home) and typically has low interest rates and tax benefits.",
            },
          ],
        },
      },
      {
        title: "The Debt Snowball Method",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Building Momentum by Starting Small",
          },
          {
            type: "paragraph",
            content:
              "The debt snowball method focuses on paying off your smallest debts first, regardless of interest rate. This creates psychological wins and momentum that helps you stay motivated throughout your debt payoff journey. This can be a good strategy for young adults who are just starting to manage their debt.",
          },
          {
            type: "list",
            content: "How the debt snowball works:",
            items: [
              "List all debts from smallest to largest balance",
              "Pay minimums on all debts",
              "Put any extra money toward the smallest debt",
              "Once smallest is paid off, roll that payment to the next smallest",
              "Repeat until all debts are eliminated",
            ],
          },
          {
            type: "example",
            content:
              "Sarah has: Credit Card A ($500), Credit Card B ($1,200), Car Loan ($8,000). She pays minimums on B and the car, puts extra $200/month toward A. Once A is paid off, she puts $200 + A's minimum toward B. This creates a snowball effect, making it easier to pay off larger debts.",
          },
          {
            type: "list",
            content: "Benefits of the debt snowball:",
            items: [
              "Quick wins build motivation and confidence",
              "Simplifies your financial life faster",
              "Creates visible progress early on",
              "Builds strong debt-payoff habits",
              "Reduces number of monthly payments quickly",
            ],
          },
          {
            type: "tip",
            content:
              "The debt snowball is about psychology, not math. If you need motivation and quick wins, this method can be more effective than focusing on interest rates alone. Celebrate each debt you pay off to stay motivated.",
          },
        ],
        keyTakeaways: [
          "Pay smallest debts first for psychological wins",
          "Roll payments from paid-off debts to the next smallest",
          "Motivation often matters more than mathematical optimization",
          "Quick wins build momentum for long-term success",
        ],
        quiz: {
          questions: [
            {
              question: "In the debt snowball method, which debt do you focus on first?",
              options: ["Highest interest rate", "Largest balance", "Smallest balance", "Newest debt"],
              correctAnswer: "Smallest balance",
              explanation:
                "The debt snowball method prioritizes the smallest balance first to create quick wins and build momentum, regardless of interest rates.",
            },
          ],
        },
      },
      {
        title: "The Debt Avalanche Method",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Mathematically Optimal Debt Elimination",
          },
          {
            type: "paragraph",
            content:
              "The debt avalanche method focuses on paying off debts with the highest interest rates first. This approach saves the most money in interest payments over time, making it the mathematically optimal debt payoff strategy. This is a good strategy for young adults who are disciplined and want to save the most money.",
          },
          {
            type: "list",
            content: "How the debt avalanche works:",
            items: [
              "List all debts from highest to lowest interest rate",
              "Pay minimums on all debts",
              "Put any extra money toward the highest interest rate debt",
              "Once highest rate is paid off, move to the next highest",
              "Continue until all debts are eliminated",
            ],
          },
          {
            type: "example",
            content:
              "Mike has: Credit Card (22% APR, $3,000), Personal Loan (12% APR, $5,000), Car Loan (6% APR, $10,000). He focuses extra payments on the credit card first, despite it not being the largest balance. This saves him the most money in the long run.",
          },
          {
            type: "list",
            content: "Benefits of the debt avalanche:",
            items: [
              "Saves the most money in interest payments",
              "Mathematically optimal approach",
              "Reduces total payoff time",
              "More efficient use of extra payments",
              "Better for disciplined, math-focused individuals",
            ],
          },
          {
            type: "list",
            content: "Challenges of the debt avalanche:",
            items: [
              "May take longer to see first debt eliminated",
              "Requires more discipline and patience",
              "Less immediate psychological gratification",
              "Can be discouraging if highest-rate debt is large",
            ],
          },
          {
            type: "tip",
            content:
              "Choose debt avalanche if you're motivated by saving money and can stay disciplined without needing frequent wins. Combine with debt snowball psychology by celebrating interest saved. Track your progress to stay motivated.",
          },
        ],
        keyTakeaways: [
          "Focus on highest interest rate debts first",
          "Saves the most money in total interest paid",
          "Requires discipline but is mathematically optimal",
          "Best for people motivated by long-term savings",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main advantage of the debt avalanche method?",
              options: [
                "Quick psychological wins",
                "Saves the most money in interest",
                "Easiest to follow",
                "Eliminates most debts quickly",
              ],
              correctAnswer: "Saves the most money in interest",
              explanation:
                "The debt avalanche method saves the most money in total interest payments by targeting the highest interest rate debts first, making it mathematically optimal.",
            },
          ],
        },
      },
      {
        title: "Debt Consolidation Strategies",
        duration: "5 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Simplifying Multiple Debts into One Payment",
          },
          {
            type: "paragraph",
            content:
              "Debt consolidation combines multiple debts into a single loan or payment, potentially with a lower interest rate. This can simplify your finances and save money, but it's important to understand the pros and cons. This is a common strategy for young adults with multiple credit card debts.",
          },
          {
            type: "list",
            content: "Common debt consolidation methods:",
            items: [
              "Personal loans from banks or credit unions",
              "Balance transfer credit cards with 0% intro APR",
              "Home equity loans or lines of credit",
              "Debt management plans through credit counseling",
              "401(k) loans (use with extreme caution)",
            ],
          },
          {
            type: "list",
            content: "Benefits of debt consolidation:",
            items: [
              "Single monthly payment simplifies budgeting",
              "Potentially lower interest rates",
              "Fixed payment schedule and payoff date",
              "May improve credit score over time",
              "Reduces stress from managing multiple payments",
            ],
          },
          {
            type: "list",
            content: "Risks and considerations:",
            items: [
              "May extend repayment period",
              "Fees and closing costs can add up",
              "Risk of running up new debt on cleared cards",
              "May require collateral (home equity loans)",
              "Doesn't address underlying spending habits",
            ],
          },
          {
            type: "example",
            content:
              "Lisa has $15,000 in credit card debt across 4 cards averaging 20% APR. She gets a personal loan at 12% APR to pay them off, saving $1,200 per year in interest while having just one payment. This simplifies her finances and makes it easier to manage her debt.",
          },
          {
            type: "tip",
            content:
              "Only consolidate debt if you get a lower interest rate and commit to not running up new debt. Cut up the credit cards or remove them from your wallet to avoid temptation. Focus on changing your spending habits to avoid accumulating debt again.",
          },
        ],
        keyTakeaways: [
          "Consolidation can simplify payments and reduce interest",
          "Only beneficial if you get a lower interest rate",
          "Must address spending habits to avoid new debt",
          "Consider fees and terms carefully before consolidating",
        ],
        quiz: {
          questions: [
            {
              question: "When does debt consolidation make the most sense?",
              options: [
                "When you want more credit cards",
                "When you get a lower interest rate",
                "When you want to spend more",
                "When you have good debt",
              ],
              correctAnswer: "When you get a lower interest rate",
              explanation:
                "Debt consolidation is most beneficial when you can secure a lower interest rate than your current debts, saving money and simplifying payments.",
            },
          ],
        },
      },
      {
        title: "Negotiating with Creditors",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Working with Creditors to Find Solutions",
          },
          {
            type: "paragraph",
            content:
              "If you're struggling with debt payments, creditors are often willing to work with you to find a solution. They'd rather receive some payment than none at all, making negotiation a valuable tool in debt management. This is a good option for young adults who are facing unexpected financial difficulties.",
          },
          {
            type: "list",
            content: "What you can negotiate:",
            items: [
              "Lower interest rates",
              "Reduced monthly payments",
              "Payment plans or deferrals",
              "Waived fees and penalties",
              "Settlement for less than full amount",
              "Removal of negative credit reporting",
            ],
          },
          {
            type: "list",
            content: "How to negotiate effectively:",
            items: [
              "Call before you miss payments",
              "Be honest about your financial situation",
              "Have a specific proposal ready",
              "Ask to speak with a supervisor if needed",
              "Get any agreement in writing",
              "Keep detailed records of all conversations",
            ],
          },
          {
            type: "example",
            content:
              "John lost his job and called his credit card company before missing a payment. They agreed to reduce his minimum payment by 50% for 6 months and waived late fees, giving him time to find new employment. This shows the importance of being proactive.",
          },
          {
            type: "list",
            content: "Hardship programs often include:",
            items: [
              "Temporary payment reductions",
              "Interest rate reductions",
              "Fee waivers",
              "Extended payment terms",
              "Skip-payment options",
              "Forbearance periods",
            ],
          },
          {
            type: "tip",
            content:
              "Be proactive and contact creditors as soon as you anticipate problems. They're more willing to help customers who communicate early rather than those who simply stop paying. Be polite and professional during the negotiation.",
          },
        ],
        keyTakeaways: [
          "Creditors often prefer negotiation to non-payment",
          "Contact creditors before missing payments",
          "Be honest and have a specific proposal ready",
          "Get all agreements in writing",
        ],
        quiz: {
          questions: [
            {
              question: "When is the best time to contact creditors about payment difficulties?",
              options: [
                "After missing several payments",
                "Before missing any payments",
                "Only when threatened with collections",
                "Never - just stop paying",
              ],
              correctAnswer: "Before missing any payments",
              explanation:
                "Contacting creditors before missing payments shows good faith and makes them more willing to work with you on a solution.",
            },
          ],
        },
      },
      {
        title: "Avoiding Debt Traps",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Recognizing and Avoiding Predatory Lending",
          },
          {
            type: "paragraph",
            content:
              "Some types of debt are designed to trap borrowers in cycles of debt. Learning to recognize and avoid these predatory lending practices can save you thousands of dollars and years of financial stress. This is especially important for young adults who may be targeted by these lenders.",
          },
          {
            type: "list",
            content: "Common debt traps to avoid:",
            items: [
              "Payday loans with 400%+ APR",
              "Title loans that risk your car",
              "Rent-to-own agreements",
              "Store credit cards with deferred interest",
              "Cash advances from credit cards",
              "Buy-here-pay-here car lots",
            ],
          },
          {
            type: "list",
            content: "Warning signs of predatory lending:",
            items: [
              "Extremely high interest rates or fees",
              "Pressure to sign immediately",
              "No credit check required",
              "Balloon payments or variable rates",
              "Prepayment penalties",
              "Loan flipping or refinancing pressure",
            ],
          },
          {
            type: "example",
            content:
              "A $300 payday loan with $45 fee due in 2 weeks equals 391% APR. If rolled over multiple times, the fees can exceed the original loan amount within months. Avoid these loans at all costs!",
          },
          {
            type: "list",
            content: "Better alternatives to consider:",
            items: [
              "Credit union personal loans",
              "Payment plans with service providers",
              "Borrowing from family or friends",
              "Side gigs for extra income",
              "Community assistance programs",
              "Employer paycheck advances",
            ],
          },
          {
            type: "tip",
            content:
              "If you're considering a payday loan or similar high-cost debt, first explore all other options. The temporary relief isn't worth the long-term financial damage. There are always better alternatives.",
          },
        ],
        keyTakeaways: [
          "Payday loans and similar products create debt cycles",
          "High fees and interest rates are warning signs",
          "Always explore alternatives before high-cost borrowing",
          "Predatory lenders target desperate borrowers",
        ],
        quiz: {
          questions: [
            {
              question: "What is a major warning sign of predatory lending?",
              options: [
                "Low interest rates",
                "Extremely high interest rates or fees",
                "Long repayment terms",
                "Credit check required",
              ],
              correctAnswer: "Extremely high interest rates or fees",
              explanation:
                "Extremely high interest rates or fees are a major red flag for predatory lending, often trapping borrowers in cycles of debt.",
            },
          ],
        },
      },
      {
        title: "Building a Debt-Free Lifestyle",
        duration: "5 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Maintaining Financial Freedom After Debt Payoff",
          },
          {
            type: "paragraph",
            content:
              "Paying off debt is just the beginning. Building a truly debt-free lifestyle requires changing habits, mindsets, and systems to ensure you never fall back into the debt trap. This is a lifelong commitment to financial health.",
          },
          {
            type: "list",
            content: "Habits for staying debt-free:",
            items: [
              "Live below your means consistently",
              "Build and maintain an emergency fund",
              "Use cash or debit for discretionary spending",
              "Plan and save for large purchases",
              "Regularly review and adjust your budget",
              "Avoid lifestyle inflation as income grows",
            ],
          },
          {
            type: "list",
            content: "Mindset shifts for debt-free living:",
            items: [
              "Delayed gratification becomes natural",
              "Focus on experiences over possessions",
              "Pride in financial independence",
              "Confidence in handling financial challenges",
              "Generosity becomes possible",
              "Long-term thinking in all decisions",
            ],
          },
          {
            type: "example",
            content:
              "After paying off $30,000 in debt, Maria continued living on her debt-payoff budget but redirected those payments to savings and investments, building $50,000 in wealth within 3 years. This shows the power of discipline and consistency.",
          },
          {
            type: "list",
            content: "Systems to prevent future debt:",
            items: [
              "Automatic savings transfers",
              "Sinking funds for irregular expenses",
              "Regular financial check-ins",
              "Accountability partners or groups",
              "Clear financial goals and tracking",
              "Emergency fund as first line of defense",
            ],
          },
          {
            type: "tip",
            content:
              "When you pay off debt, don't increase your lifestyle immediately. Continue living on your debt-payoff budget and redirect those payments to savings and investments. This will help you build wealth and avoid future debt.",
          },
        ],
        keyTakeaways: [
          "Debt freedom requires ongoing habit changes",
          "Emergency funds prevent future debt needs",
          "Continue debt-payoff budget habits for wealth building",
          "Focus on systems that prevent debt accumulation",
        ],
        quiz: {
          questions: [
            {
              question: "What should you do with the money you were using for debt payments after becoming debt-free?",
              options: [
                "Increase lifestyle spending immediately",
                "Redirect to savings and investments",
                "Take on new debt for wants",
                "Stop budgeting entirely",
              ],
              correctAnswer: "Redirect to savings and investments",
              explanation:
                "Redirecting former debt payments to savings and investments helps build wealth and prevents lifestyle inflation that could lead back to debt.",
            },
          ],
        },
      },
    ],
    "credit-scores": [
      {
        title: "Understanding Credit Scores",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "What is a Credit Score?",
          },
          {
            type: "paragraph",
            content:
              "A credit score is a three-digit number that represents your creditworthiness. It's used by lenders to assess the risk of lending you money. For young adults, understanding credit scores is crucial as they start building their financial independence.",
          },
          {
            type: "list",
            content: "Credit score ranges:",
            items: [
              "Excellent: 800-850",
              "Very Good: 740-799",
              "Good: 670-739",
              "Fair: 580-669",
              "Poor: 300-579",
            ],
          },
          {
            type: "list",
            content: "Factors that affect your credit score:",
            items: [
              "Payment history (35%)",
              "Amounts owed (30%)",
              "Length of credit history (15%)",
              "Credit mix (10%)",
              "New credit (10%)",
            ],
          },
          {
            type: "example",
            content:
              "Sarah has a credit score of 720. She always pays her bills on time, keeps her credit card balances low, and has had credit accounts for several years. This good score helps her qualify for better interest rates on loans.",
          },
          {
            type: "tip",
            content:
              "Start building credit early by becoming an authorized user on a parent's account or getting a student credit card. Use it responsibly by paying the full balance each month.",
          },
        ],
        keyTakeaways: [
          "Credit scores range from 300-850",
          "Payment history is the most important factor",
          "Higher scores mean better loan terms",
          "Building credit takes time and consistency",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most important factor in your credit score?",
              options: ["Payment history", "Amounts owed", "Credit mix", "New credit"],
              correctAnswer: "Payment history",
              explanation: "Payment history makes up 35% of your credit score and is the most important factor.",
            },
          ],
        },
      },
      {
        title: "Checking Your Credit Report",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Why Check Your Credit Report?",
          },
          {
            type: "paragraph",
            content:
              "Checking your credit report allows you to identify any errors or inaccuracies that may be affecting your credit score. It also helps you monitor for identity theft and understand what lenders see when they review your credit.",
          },
          {
            type: "list",
            content: "Where to check your credit report:",
            items: [
              "AnnualCreditReport.com (official free site)",
              "Credit Karma (free monitoring)",
              "Credit Sesame (free monitoring)",
              "Bank and credit card apps",
              "Experian, Equifax, TransUnion directly",
            ],
          },
          {
            type: "list",
            content: "What to look for on your credit report:",
            items: [
              "Personal information accuracy",
              "Account information and balances",
              "Payment history records",
              "Accounts you don't recognize",
              "Incorrect late payments",
              "Outdated negative information",
            ],
          },
          {
            type: "example",
            content:
              "Mike found an error on his credit report showing a late payment he never made. He disputed it with the credit bureau and had it removed, which improved his credit score by 20 points.",
          },
          {
            type: "tip",
            content:
              "Check your credit report from all three bureaus annually. Set a reminder to check one every four months so you're monitoring your credit year-round.",
          },
        ],
        keyTakeaways: [
          "Check your credit report regularly for errors",
          "You're entitled to free reports from all three bureaus",
          "Dispute any inaccuracies you find",
          "Monitor for signs of identity theft",
        ],
        quiz: {
          questions: [
            {
              question: "How often should you check your credit report?",
              options: ["Once a year", "Every month", "Every week", "Never"],
              correctAnswer: "Once a year",
              explanation: "You are entitled to one free credit report per year from each of the three major credit bureaus.",
            },
          ],
        },
      },
      {
        title: "Building Credit from Scratch",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Starting Your Credit Journey",
          },
          {
            type: "paragraph",
            content:
              "Building credit from scratch can seem challenging, but there are several strategies young adults can use to establish a positive credit history. The key is starting early and being consistent with good habits.",
          },
          {
            type: "list",
            content: "Ways to start building credit:",
            items: [
              "Become an authorized user on a parent's account",
              "Apply for a student credit card",
              "Get a secured credit card",
              "Consider a credit-builder loan",
              "Pay all bills on time (utilities, phone, rent)",
              "Keep credit utilization low (under 30%)",
            ],
          },
          {
            type: "list",
            content: "Student credit card benefits:",
            items: [
              "Easier approval for students",
              "Lower credit limits to start",
              "Educational resources included",
              "Potential rewards programs",
              "Opportunity to build credit history",
              "May graduate to regular cards later",
            ],
          },
          {
            type: "example",
            content:
              "Emma got her first credit card as a college student with a $500 limit. She used it for small purchases like gas and groceries, always paying the full balance on time. After two years, her credit score reached 740.",
          },
          {
            type: "list",
            content: "Credit building mistakes to avoid:",
            items: [
              "Missing payments or paying late",
              "Maxing out credit cards",
              "Applying for too many cards at once",
              "Closing your oldest credit accounts",
              "Only making minimum payments",
              "Ignoring your credit report",
            ],
          },
          {
            type: "tip",
            content:
              "Set up automatic payments for at least the minimum amount due to ensure you never miss a payment. Payment history is the most important factor in your credit score.",
          },
        ],
        keyTakeaways: [
          "Start building credit early with student or secured cards",
          "Always pay on time and keep balances low",
          "Authorized user status can help jumpstart credit",
          "Avoid common mistakes that hurt your score",
        ],
        quiz: {
          questions: [
            {
              question: "What's the best way for a young adult to start building credit?",
              options: [
                "Apply for multiple credit cards",
                "Get a student credit card and use it responsibly",
                "Take out a large loan",
                "Wait until they're older",
              ],
              correctAnswer: "Get a student credit card and use it responsibly",
              explanation: "Student credit cards are designed for young adults with limited credit history and offer a good way to start building credit when used responsibly.",
            },
          ],
        },
      },
      {
        title: "Improving Your Credit Score",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Strategies to Boost Your Score",
          },
          {
            type: "paragraph",
            content:
              "Improving your credit score takes time and consistent effort, but the benefits are worth it. A higher credit score can save you thousands of dollars in interest over your lifetime and open doors to better financial opportunities.",
          },
          {
            type: "list",
            content: "Quick credit score improvements:",
            items: [
              "Pay down credit card balances",
              "Pay bills on time consistently",
              "Dispute errors on your credit report",
              "Become an authorized user on a good account",
              "Pay off collections or charge-offs",
              "Don't close old credit accounts",
            ],
          },
          {
            type: "list",
            content: "Long-term credit building strategies:",
            items: [
              "Keep accounts open to increase credit age",
              "Maintain a mix of credit types",
              "Keep credit utilization under 10% for best scores",
              "Limit new credit applications",
              "Set up automatic payments",
              "Monitor your credit regularly",
            ],
          },
          {
            type: "example",
            content:
              "David had a 620 credit score due to high credit card balances. He paid down his cards from 80% utilization to 15% over six months, and his score jumped to 720. This qualified him for a much better rate on his car loan.",
          },
          {
            type: "list",
            content: "Credit utilization tips:",
            items: [
              "Keep total utilization under 30%",
              "Aim for under 10% for excellent scores",
              "Pay balances before statement dates",
              "Consider multiple payments per month",
              "Request credit limit increases",
              "Spread balances across multiple cards if needed",
            ],
          },
          {
            type: "tip",
            content:
              "The fastest way to improve your credit score is to pay down credit card balances. Even a small reduction in utilization can boost your score within a month or two.",
          },
        ],
        keyTakeaways: [
          "Pay down credit card balances for quick improvements",
          "Consistency in payments is crucial for long-term success",
          "Keep old accounts open to maintain credit history",
          "Monitor your credit regularly for errors and progress",
        ],
        quiz: {
          questions: [
            {
              question: "What's the fastest way to improve your credit score?",
              options: [
                "Apply for more credit cards",
                "Pay down credit card balances",
                "Close old accounts",
                "Take out a personal loan",
              ],
              correctAnswer: "Pay down credit card balances",
              explanation: "Reducing credit utilization by paying down balances can improve your credit score within 1-2 months and has a significant impact.",
            },
          ],
        },
      },
      {
        title: "Credit Cards: Benefits and Risks",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Using Credit Cards Wisely",
          },
          {
            type: "paragraph",
            content:
              "Credit cards can be powerful financial tools when used responsibly, but they can also lead to debt problems if misused. Understanding both the benefits and risks helps young adults make informed decisions about credit card use.",
          },
          {
            type: "list",
            content: "Credit card benefits:",
            items: [
              "Build credit history and improve scores",
              "Fraud protection and purchase security",
              "Rewards programs (cash back, points, miles)",
              "Emergency funding when needed",
              "Convenience for online and travel purchases",
              "Extended warranties and purchase protection",
            ],
          },
          {
            type: "list",
            content: "Credit card risks:",
            items: [
              "High interest rates on carried balances",
              "Temptation to overspend",
              "Potential for debt accumulation",
              "Late payment fees and penalties",
              "Negative impact on credit if misused",
              "Annual fees on some cards",
            ],
          },
          {
            type: "example",
            content:
              "Jessica uses her credit card for all purchases to earn 2% cash back, but she pays the full balance every month. She earns $300 per year in rewards while building excellent credit. Her friend Mark carries balances and pays $500 per year in interest.",
          },
          {
            type: "list",
            content: "Best practices for credit card use:",
            items: [
              "Pay the full balance every month",
              "Keep utilization under 30% of limit",
              "Set up automatic payments",
              "Review statements for errors",
              "Don't use cards for cash advances",
              "Choose cards with no annual fee to start",
            ],
          },
          {
            type: "tip",
            content:
              "Treat your credit card like a debit card - only spend money you already have. Set up automatic payments for the full balance to avoid interest charges and build good credit.",
          },
        ],
        keyTakeaways: [
          "Credit cards offer benefits when used responsibly",
          "Always pay the full balance to avoid interest",
          "Use cards to build credit and earn rewards",
          "Avoid the temptation to overspend",
        ],
        quiz: {
          questions: [
            {
              question: "What's the best way to use a credit card?",
              options: [
                "Carry a small balance to build credit",
                "Pay the full balance every month",
                "Only use it for emergencies",
                "Max out the credit limit",
              ],
              correctAnswer: "Pay the full balance every month",
              explanation: "Paying the full balance every month avoids interest charges while building positive credit history and maximizing rewards.",
            },
          ],
        },
      },
      {
        title: "Credit Monitoring and Protection",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Protecting Your Credit Identity",
          },
          {
            type: "paragraph",
            content:
              "Credit monitoring helps you stay aware of changes to your credit report and can alert you to potential identity theft. With the increasing frequency of data breaches, protecting your credit information is more important than ever.",
          },
          {
            type: "list",
            content: "Free credit monitoring options:",
            items: [
              "Credit Karma (TransUnion and Equifax)",
              "Credit Sesame (TransUnion)",
              "Bank and credit card apps",
              "Experian free membership",
              "Annual credit reports",
              "Credit bureau mobile apps",
            ],
          },
          {
            type: "list",
            content: "Signs of identity theft:",
            items: [
              "Accounts you didn't open",
              "Unexpected credit score changes",
              "Bills for accounts you don't have",
              "Missing mail or statements",
              "Denied credit unexpectedly",
              "Calls from debt collectors for unknown debts",
            ],
          },
          {
            type: "example",
            content:
              "Alex received an alert that a new credit card was opened in his name. He immediately contacted the credit card company and credit bureaus to report fraud, preventing thousands in fraudulent charges.",
          },
          {
            type: "list",
            content: "Steps to take if identity theft occurs:",
            items: [
              "Contact credit bureaus to place fraud alerts",
              "File a report with the FTC",
              "Contact affected creditors immediately",
              "File a police report if necessary",
              "Consider freezing your credit",
              "Monitor accounts closely for months",
            ],
          },
          {
            type: "list",
            content: "Credit protection tips:",
            items: [
              "Use strong, unique passwords",
              "Don't share personal information online",
              "Shred financial documents before disposal",
              "Monitor bank and credit card statements",
              "Be cautious with public Wi-Fi for financial tasks",
              "Consider credit freezes for maximum protection",
            ],
          },
          {
            type: "tip",
            content:
              "Set up free credit monitoring with at least one service to get alerts about changes to your credit report. Early detection of problems can save you time and money.",
          },
        ],
        keyTakeaways: [
          "Credit monitoring helps detect identity theft early",
          "Many free monitoring services are available",
          "Act quickly if you suspect identity theft",
          "Prevention is better than dealing with fraud aftermath",
        ],
        quiz: {
          questions: [
            {
              question: "What should you do first if you suspect identity theft?",
              options: [
                "Wait to see what happens",
                "Contact credit bureaus to place fraud alerts",
                "Close all your accounts",
                "Hire a lawyer",
              ],
              correctAnswer: "Contact credit bureaus to place fraud alerts",
              explanation:
                "Placing fraud alerts with credit bureaus is the first step to prevent further fraudulent accounts from being opened in your name.",
            },
          ],
        },
      },
    ],
    "loans": [
      {
        title: "Understanding Auto Loans",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "What is an Auto Loan?",
          },
          {
            type: "paragraph",
            content:
              "An auto loan is a secured loan used to purchase a vehicle. The vehicle serves as collateral for the loan, which typically means lower interest rates than unsecured loans. For young adults, understanding auto loans is crucial when buying their first car.",
          },
          {
            type: "list",
            content: "Types of auto loans:",
            items: [
              "New car loans (typically lower rates)",
              "Used car loans (slightly higher rates)",
              "Certified pre-owned loans",
              "Refinancing loans",
              "Private party loans",
              "Lease buyout loans",
            ],
          },
          {
            type: "list",
            content: "Factors that affect auto loan rates:",
            items: [
              "Credit score and history",
              "Age and mileage of vehicle",
              "Loan term length",
              "Down payment amount",
              "Debt-to-income ratio",
              "Lender type (bank, credit union, dealer)",
            ],
          },
          {
            type: "example",
            content:
              "Sarah wants to buy a $20,000 used car. With a 720 credit score, she qualifies for a 4.5% APR on a 5-year loan. Her monthly payment would be $372, and she'd pay $2,320 in total interest over the life of the loan.",
          },
          {
            type: "list",
            content: "Auto loan shopping tips:",
            items: [
              "Get pre-approved before shopping",
              "Compare rates from multiple lenders",
              "Consider credit unions for better rates",
              "Don't focus only on monthly payments",
              "Negotiate the car price separately from financing",
              "Read all terms and conditions carefully",
            ],
          },
          {
            type: "tip",
            content:
              "Get financing pre-approval from banks or credit unions before visiting dealers. This gives you negotiating power and helps you avoid dealer markup on interest rates.",
          },
        ],
        keyTakeaways: [
          "Auto loans use the vehicle as collateral",
          "Credit score significantly affects your interest rate",
          "Shop around for the best rates before buying",
          "Consider the total cost, not just monthly payments",
        ],
        quiz: {
          questions: [
            {
              question: "What serves as collateral for an auto loan?",
              options: ["Your house", "Your car", "Your savings account", "Your credit score"],
              correctAnswer: "Your car",
              explanation: "The vehicle serves as collateral for the loan, which is why auto loans typically have lower interest rates than unsecured loans.",
            },
          ],
        },
      },
      {
        title: "Navigating Student Loans",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Understanding Student Loan Options",
          },
          {
            type: "paragraph",
            content:
              "Student loans help finance education costs but can become a significant financial burden if not managed properly. Understanding the different types and repayment options is crucial for young adults planning for or currently in college.",
          },
          {
            type: "list",
            content: "Federal student loan types:",
            items: [
              "Direct Subsidized Loans (need-based, government pays interest while in school)",
              "Direct Unsubsidized Loans (not need-based, interest accrues immediately)",
              "Direct PLUS Loans (for parents and graduate students)",
              "Direct Consolidation Loans (combine multiple federal loans)",
            ],
          },
          {
            type: "list",
            content: "Private student loan features:",
            items: [
              "Offered by banks, credit unions, and other lenders",
              "Credit-based approval process",
              "Variable or fixed interest rates",
              "Fewer repayment options than federal loans",
              "May require a cosigner for young borrowers",
              "No federal protections or forgiveness programs",
            ],
          },
          {
            type: "example",
            content:
              "Mike borrows $30,000 in federal student loans at 5% interest. Using income-driven repayment, his payments start at $200/month based on his entry-level salary, and increase as his income grows over time.",
          },
          {
            type: "list",
            content: "Federal loan repayment options:",
            items: [
              "Standard Repayment (10 years, fixed payments)",
              "Income-Driven Repayment (payments based on income)",
              "Graduated Repayment (payments start low, increase over time)",
              "Extended Repayment (up to 25 years)",
              "Public Service Loan Forgiveness (for qualifying public service jobs)",
            ],
          },
          {
            type: "list",
            content: "Student loan management tips:",
            items: [
              "Borrow only what you need for education",
              "Understand your loan terms and servicer",
              "Make payments during school if possible",
              "Consider autopay for interest rate discounts",
              "Explore forgiveness and discharge programs",
              "Communicate with your servicer if you have trouble paying",
            ],
          },
          {
            type: "tip",
            content:
              "Always exhaust federal student loan options before considering private loans. Federal loans offer more flexible repayment options and borrower protections.",
          },
        ],
        keyTakeaways: [
          "Federal loans offer better terms and protections than private loans",
          "Income-driven repayment can make payments more manageable",
          "Borrow only what you need for educational expenses",
          "Stay in communication with your loan servicer",
        ],
        quiz: {
          questions: [
            {
              question: "What's the main advantage of federal student loans over private loans?",
              options: [
                "Lower interest rates always",
                "Better repayment options and borrower protections",
                "No credit check required",
                "Unlimited borrowing amounts",
              ],
              correctAnswer: "Better repayment options and borrower protections",
              explanation: "Federal student loans offer income-driven repayment plans, forgiveness programs, and other borrower protections that private loans typically don't provide.",
            },
          ],
        },
      },
      {
        title: "Personal Loans Explained",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "When and How to Use Personal Loans",
          },
          {
            type: "paragraph",
            content:
              "Personal loans are unsecured loans that can be used for various purposes. They typically have higher interest rates than secured loans but offer more flexibility than credit cards for large expenses or debt consolidation.",
          },
          {
            type: "list",
            content: "Common uses for personal loans:",
            items: [
              "Debt consolidation",
              "Home improvements",
              "Medical expenses",
              "Wedding costs",
              "Emergency expenses",
              "Moving expenses",
            ],
          },
          {
            type: "list",
            content: "Personal loan features:",
            items: [
              "Fixed interest rates and payments",
              "Loan terms typically 2-7 years",
              "No collateral required",
              "Credit-based approval",
              "Origination fees may apply",
              "Prepayment penalties on some loans",
            ],
          },
          {
            type: "example",
            content:
              "Lisa has $8,000 in credit card debt at 22% APR. She gets a personal loan at 12% APR to pay off the cards, saving $800 per year in interest while having a fixed payment plan.",
          },
          {
            type: "list",
            content: "Personal loan pros:",
            items: [
              "Lower rates than credit cards",
              "Fixed payments and terms",
              "No collateral required",
              "Fast funding (often same day)",
              "Can improve credit mix",
              "Predictable payoff timeline",
            ],
          },
          {
            type: "list",
            content: "Personal loan cons:",
            items: [
              "Higher rates than secured loans",
              "Origination fees (1-8% of loan amount)",
              "Credit requirements can be strict",
              "Fixed payments regardless of financial changes",
              "Potential prepayment penalties",
              "Can lead to more debt if not used wisely",
            ],
          },
          {
            type: "tip",
            content:
              "Only use personal loans for necessary expenses or to save money (like debt consolidation). Avoid using them for discretionary spending that could lead to more debt.",
          },
        ],
        keyTakeaways: [
          "Personal loans offer fixed rates and terms",
          "Best used for debt consolidation or necessary expenses",
          "Shop around for the best rates and terms",
          "Consider origination fees in your cost comparison",
        ],
        quiz: {
          questions: [
            {
              question: "What's the best use for a personal loan?",
              options: [
                "Vacation expenses",
                "Debt consolidation at a lower rate",
                "Shopping spree",
                "Gambling debts",
              ],
              correctAnswer: "Debt consolidation at a lower rate",
              explanation: "Using a personal loan to consolidate high-interest debt at a lower rate can save money and simplify payments.",
            },
          ],
        },
      },
      {
        title: "Loan Shopping and Comparison",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Finding the Best Loan Terms",
          },
          {
            type: "paragraph",
            content:
              "Shopping for loans requires comparing multiple factors beyond just interest rates. Understanding how to evaluate loan offers helps you make informed decisions and save money over the life of the loan.",
          },
          {
            type: "list",
            content: "Key factors to compare:",
            items: [
              "Annual Percentage Rate (APR)",
              "Loan term length",
              "Monthly payment amount",
              "Total interest paid",
              "Fees (origination, prepayment, late)",
              "Lender reputation and customer service",
            ],
          },
          {
            type: "list",
            content: "Types of lenders to consider:",
            items: [
              "Banks (traditional and online)",
              "Credit unions (often better rates for members)",
              "Online lenders (fast approval, competitive rates)",
              "Peer-to-peer lenders",
              "Dealer financing (for auto loans)",
              "Employer-sponsored programs",
            ],
          },
          {
            type: "example",
            content:
              "Tom compares three personal loan offers: Bank A (10% APR, $200 origination fee), Credit Union B (8.5% APR, no fees), and Online Lender C (9% APR, $150 fee). The credit union offers the best total cost despite not having the lowest advertised rate.",
          },
          {
            type: "list",
            content: "Loan shopping tips:",
            items: [
              "Get quotes from at least 3-5 lenders",
              "Apply within a 14-45 day window to minimize credit impact",
              "Compare APR, not just interest rates",
              "Read all terms and conditions",
              "Consider the total cost over the loan term",
              "Don't just focus on monthly payment amounts",
            ],
          },
          {
            type: "list",
            content: "Red flags to avoid:",
            items: [
              "Guaranteed approval regardless of credit",
              "No credit check required",
              "Pressure to sign immediately",
              "Extremely high fees",
              "Variable rates that can increase significantly",
              "Prepayment penalties on most loan types",
            ],
          },
          {
            type: "tip",
            content:
              "Use loan calculators to compare the total cost of different offers. A slightly higher rate with no fees might be better than a lower rate with high origination fees.",
          },
        ],
        keyTakeaways: [
          "Compare APR and total costs, not just interest rates",
          "Shop with multiple lenders within a short timeframe",
          "Credit unions often offer competitive rates",
          "Read all terms and watch for hidden fees",
        ],
        quiz: {
          questions: [
            {
              question: "What's the most important factor to compare when shopping for loans?",
              options: [
                "Interest rate only",
                "Monthly payment amount",
                "Annual Percentage Rate (APR)",
                "Lender's marketing materials",
              ],
              correctAnswer: "Annual Percentage Rate (APR)",
              explanation: "APR includes both the interest rate and fees, giving you the true cost of borrowing for comparison purposes.",
            },
          ],
        },
      },
      {
        title: "Loan Application Process",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Preparing for Loan Applications",
          },
          {
            type: "paragraph",
            content:
              "Understanding the loan application process helps you prepare properly and increases your chances of approval at the best possible terms. Being organized and knowing what to expect can streamline the process significantly.",
          },
          {
            type: "list",
            content: "Documents typically required:",
            items: [
              "Government-issued ID",
              "Proof of income (pay stubs, tax returns)",
              "Employment verification",
              "Bank statements",
              "Proof of residence",
              "List of debts and assets",
            ],
          },
          {
            type: "list",
            content: "Steps in the application process:",
            items: [
              "Pre-qualification (soft credit check)",
              "Formal application submission",
              "Hard credit check and underwriting",
              "Income and employment verification",
              "Final approval and loan terms",
              "Loan funding and documentation",
            ],
          },
          {
            type: "example",
            content:
              "Emma applies for an auto loan. She gathers her pay stubs, bank statements, and employment letter beforehand. The pre-approval process takes 10 minutes online, and final approval comes within 24 hours because she was well-prepared.",
          },
          {
            type: "list",
            content: "Tips for loan approval:",
            items: [
              "Check your credit report before applying",
              "Pay down existing debts to improve debt-to-income ratio",
              "Gather all required documents in advance",
              "Be honest and accurate on applications",
              "Don't apply for multiple loans simultaneously",
              "Consider a co-signer if your credit needs help",
            ],
          },
          {
            type: "list",
            content: "Common reasons for loan denial:",
            items: [
              "Low credit score",
              "High debt-to-income ratio",
              "Insufficient income",
              "Recent negative credit events",
              "Incomplete or inaccurate application",
              "Unstable employment history",
            ],
          },
          {
            type: "tip",
            content:
              "Get pre-qualified with multiple lenders before formally applying. This gives you a good idea of terms you'll qualify for without impacting your credit score.",
          },
        ],
        keyTakeaways: [
          "Prepare all required documents before applying",
          "Pre-qualification helps you understand your options",
          "Honest and complete applications process faster",
          "Multiple applications in a short window minimize credit impact",
        ],
        quiz: {
          questions: [
            {
              question: "What's the benefit of getting pre-qualified for a loan?",
              options: [
                "It guarantees approval",
                "It locks in interest rates",
                "It shows potential terms without affecting credit",
                "It eliminates the need for documentation",
              ],
              correctAnswer: "It shows potential terms without affecting credit",
              explanation: "Pre-qualification uses a soft credit check to show you potential loan terms without impacting your credit score.",
            },
          ],
        },
      },
      {
        title: "Managing Loan Payments",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Staying on Top of Your Loan Obligations",
          },
          {
            type: "paragraph",
            content:
              "Successfully managing loan payments is crucial for maintaining good credit and avoiding financial stress. Developing good payment habits and understanding your options can help you stay on track throughout the loan term.",
          },
          {
            type: "list",
            content: "Payment management strategies:",
            items: [
              "Set up automatic payments",
              "Pay more than the minimum when possible",
              "Make bi-weekly payments to pay off faster",
              "Keep track of payment due dates",
              "Maintain contact information with lenders",
              "Review statements for accuracy",
            ],
          },
          {
            type: "list",
            content: "Benefits of extra payments:",
            items: [
              "Reduce total interest paid",
              "Shorten loan term",
              "Build equity faster (for secured loans)",
              "Improve debt-to-income ratio",
              "Provide financial flexibility sooner",
              "Reduce monthly payment obligations",
            ],
          },
          {
            type: "example",
            content:
              "Jake has a $15,000 car loan at 6% for 5 years ($290/month). By paying an extra $50 per month, he'll pay off the loan 10 months early and save $800 in interest.",
          },
          {
            type: "list",
            content: "What to do if you can't make payments:",
            items: [
              "Contact your lender immediately",
              "Explain your financial situation honestly",
              "Ask about forbearance or deferment options",
              "Explore loan modification possibilities",
              "Consider refinancing if you qualify",
              "Seek credit counseling if needed",
            ],
          },
          {
            type: "list",
            content: "Loan payment mistakes to avoid:",
            items: [
              "Missing payments without communication",
              "Ignoring lender correspondence",
              "Making only minimum payments when you can afford more",
              "Not reading payment statements",
              "Assuming problems will resolve themselves",
              "Taking on more debt while struggling with current loans",
            ],
          },
          {
            type: "tip",
            content:
              "Set up automatic payments for at least the minimum amount due, then make additional payments manually when your budget allows. This ensures you never miss a payment while still allowing flexibility.",
          },
        ],
        keyTakeaways: [
          "Automatic payments prevent missed payments",
          "Extra payments save money and time",
          "Communicate with lenders if you have trouble paying",
          "Stay organized and review statements regularly",
        ],
        quiz: {
          questions: [
            {
              question: "What should you do first if you can't make a loan payment?",
              options: [
                "Ignore it and hope it goes away",
                "Wait until you're 30 days late",
                "Contact your lender immediately",
                "Apply for another loan",
              ],
              correctAnswer: "Contact your lender immediately",
              explanation: "Contacting your lender as soon as you anticipate payment problems shows good faith and may lead to helpful solutions.",
            },
          ],
        },
      },
      {
        title: "Refinancing and Loan Modifications",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "When and How to Modify Your Loans",
          },
          {
            type: "paragraph",
            content:
              "Refinancing replaces your current mortgage with a new one, potentially with better terms. Understanding when these options make sense and the process involved can help you save money or achieve other financial goals.",
          },
          {
            type: "list",
            content: "Reasons to consider refinancing:",
            items: [
              "Lower interest rates (typically need 0.5-1% improvement)",
              "Remove PMI when you have 20% equity",
              "Change loan terms (30-year to 15-year or vice versa)",
              "Switch from ARM to fixed rate",
              "Cash-out refinancing for home improvements or debt consolidation",
              "Remove a co-borrower after divorce",
            ],
          },
          {
            type: "list",
            content: "Types of refinancing:",
            items: [
              "Rate-and-term refinance: Change rate or loan term",
              "Cash-out refinance: Borrow against home equity",
              "Cash-in refinance: Pay down principal to get better terms",
              "Streamline refinance: Simplified process for government loans",
              "No-closing-cost refinance: Lender pays costs for higher rate",
            ],
          },
          {
            type: "example",
            content:
              "Tom has a $200,000 mortgage at 7% with 25 years left. He refinances to 5.5% for 30 years, lowering his payment by $200/month but extending the term. He plans to invest the savings.",
          },
          {
            type: "list",
            content: "Refinancing costs to consider:",
            items: [
              "Application and origination fees",
              "Appraisal fee ($300-600)",
              "Title insurance and search",
              "Attorney or closing fees",
              "Credit report and processing fees",
              "Prepayment penalty on current loan (if applicable)",
            ],
          },
          {
            type: "list",
            content: "When refinancing might not make sense:",
            items: [
              "Closing costs exceed potential savings",
              "You plan to move within 2-3 years",
              "Your credit score has declined significantly",
              "You've already refinanced recently",
              "Current loan balance is very low",
              "You're close to paying off current mortgage",
            ],
          },
          {
            type: "tip",
            content:
              "Calculate your break-even point by dividing closing costs by monthly savings. If you'll stay in the home longer than the break-even period, refinancing likely makes sense.",
          },
        ],
        keyTakeaways: [
          "Refinancing can lower payments or change loan terms",
          "Consider closing costs versus potential savings",
          "Calculate break-even point before deciding",
          "Shop around just like you did for your original mortgage",
        ],
        quiz: {
          questions: [
            {
              question: "What's the break-even point in refinancing?",
              options: [
                "When you pay off the loan",
                "When closing costs equal monthly savings accumulated",
                "When interest rates stop falling",
                "When your home value increases",
              ],
              correctAnswer: "When closing costs equal monthly savings accumulated",
              explanation: "The break-even point is when your accumulated monthly savings from the new loan equal the closing costs you paid to refinance.",
            },
          ],
        },
      },
    ],
    "mortgages": [
      {
        title: "Understanding Mortgage Basics",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "What is a Mortgage?",
          },
          {
            type: "paragraph",
            content:
              "A mortgage is a loan used to purchase or refinance a home. It is secured by the property itself, which means the lender can foreclose if you don't make payments. For young adults, understanding mortgages is essential when planning for homeownership.",
          },
          {
            type: "list",
            content: "Key mortgage components (PITI):",
            items: [
              "Principal: The loan amount borrowed",
              "Interest: The cost of borrowing money",
              "Property Taxes: Annual taxes on the property",
              "Insurance: Homeowner's insurance and possibly PMI",
            ],
          },
          {
            type: "list",
            content: "Common mortgage terms:",
            items: [
              "Down payment: Upfront payment (typically 3-20%)",
              "Loan-to-value ratio (LTV): Loan amount vs. property value",
              "Private Mortgage Insurance (PMI): Required if down payment < 20%",
              "Escrow: Account for taxes and insurance",
              "Amortization: How the loan is paid down over time",
              "Closing costs: Fees to finalize the mortgage",
            ],
          },
          {
            type: "example",
            content:
              "Sarah buys a $300,000 home with a $60,000 down payment (20%). Her mortgage is $240,000 at 6.5% for 30 years, resulting in a monthly payment of $1,517 for principal and interest, plus taxes and insurance.",
          },
          {
            type: "list",
            content: "Factors affecting mortgage approval:",
            items: [
              "Credit score (typically 620+ required)",
              "Debt-to-income ratio (usually under 43%)",
              "Employment history and income stability",
              "Down payment amount",
              "Property appraisal value",
              "Cash reserves for closing costs",
            ],
          },
          {
            type: "tip",
            content:
              "Start preparing for homeownership early by building your credit score, saving for a down payment, and maintaining stable employment. These factors significantly impact your mortgage terms.",
          },
        ],
        keyTakeaways: [
          "Mortgages are secured loans using the property as collateral",
          "PITI makes up your total monthly housing payment",
          "Credit score and income are key approval factors",
          "Down payment affects loan terms and PMI requirements",
        ],
        quiz: {
          questions: [
            {
              question: "What secures a mortgage?",
              options: ["Your car", "Your house", "Your credit score", "Your savings account"],
              correctAnswer: "Your house",
              explanation: "The property serves as collateral for the loan, which is why lenders can foreclose if payments aren't made.",
            },
          ],
        },
      },
      {
        title: "Types of Mortgages",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Choosing the Right Mortgage Type",
          },
          {
            type: "paragraph",
            content:
              "Different mortgage types serve different needs and financial situations. Understanding your options helps you choose the best mortgage for your circumstances and long-term financial goals.",
          },
          {
            type: "list",
            content: "Fixed-Rate Mortgages:",
            items: [
              "Interest rate stays the same for entire loan term",
              "Predictable monthly payments",
              "Common terms: 15, 20, or 30 years",
              "Protection against rising interest rates",
              "Typically higher initial rates than ARMs",
              "Good for long-term homeowners",
            ],
          },
          {
            type: "list",
            content: "Adjustable-Rate Mortgages (ARMs):",
            items: [
              "Interest rate changes periodically",
              "Lower initial rates than fixed mortgages",
              "Rate adjustments based on market indexes",
              "Caps limit how much rates can increase",
              "Good for short-term ownership or falling rate environments",
              "Higher risk if rates rise significantly",
            ],
          },
          {
            type: "example",
            content:
              "Mike chooses a 5/1 ARM with an initial rate of 5.5% for 5 years, then adjusts annually. His initial payment is $200 less than a 30-year fixed at 6.5%, but he plans to sell within 5 years.",
          },
          {
            type: "list",
            content: "Government-backed loans:",
            items: [
              "FHA loans: 3.5% down, lower credit requirements",
              "VA loans: No down payment for eligible veterans",
              "USDA loans: 0% down for rural properties",
              "Conventional loans: Not government-backed, typically require higher credit scores",
            ],
          },
          {
            type: "list",
            content: "Specialty mortgage types:",
            items: [
              "Jumbo loans: For expensive properties above conforming limits",
              "Interest-only loans: Pay only interest for initial period",
              "Balloon mortgages: Large payment due at end of term",
              "Construction loans: Financing for building new homes",
              "Bridge loans: Short-term financing between home purchases",
              ],
          },
          {
            type: "tip",
            content:
              "For most first-time homebuyers, a 30-year fixed-rate mortgage provides stability and predictability. Consider government-backed loans if you qualify for better terms.",
          },
        ],
        keyTakeaways: [
          "Fixed-rate mortgages offer payment stability",
          "ARMs have lower initial rates but carry interest rate risk",
          "Government-backed loans often have lower down payment requirements",
          "Choose based on your financial situation and how long you plan to stay",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main difference between a fixed-rate mortgage and an ARM?",
              options: [
                "Fixed-rate mortgages are cheaper",
                "ARMs have a fixed interest rate",
                "Fixed-rate mortgages have a variable interest rate",
                "ARMs have an interest rate that may change",
              ],
              correctAnswer: "ARMs have an interest rate that may change",
              explanation: "ARMs have an interest rate that may change periodically based on market conditions, while fixed-rate mortgages maintain the same rate throughout the loan term.",
            },
          ],
        },
      },
      {
        title: "The Home Buying Process",
        duration: "7 min",
        points: 22,
        content: [
          {
            type: "heading",
            content: "Steps to Homeownership",
          },
          {
            type: "paragraph",
            content:
              "The home buying process involves multiple steps and can take 30-60 days from offer to closing. Understanding each step helps you prepare and avoid common pitfalls that can delay or derail your home purchase.",
          },
          {
            type: "list",
            content: "Pre-purchase preparation:",
            items: [
              "Check and improve your credit score",
              "Save for down payment and closing costs",
              "Get pre-approved for a mortgage",
              "Determine your budget and must-haves",
              "Research neighborhoods and market conditions",
              "Find a qualified real estate agent",
            ],
          },
          {
            type: "list",
            content: "The buying process steps:",
            items: [
              "House hunting and property tours",
              "Make an offer with contingencies",
              "Negotiate terms and price",
              "Sign purchase agreement",
              "Complete mortgage application",
              "Schedule home inspection and appraisal",
              "Finalize mortgage and prepare for closing",
              "Final walkthrough and closing",
            ],
          },
          {
            type: "example",
            content:
              "Emma gets pre-approved for $350,000, finds a house for $320,000, makes an offer at $315,000 with inspection and financing contingencies. After negotiation, they settle at $318,000 and close 45 days later.",
          },
          {
            type: "list",
            content: "Important contingencies to include:",
            items: [
              "Financing contingency: Protects if you can't get a loan",
              "Inspection contingency: Allows you to back out for major issues",
              "Appraisal contingency: Protects if home doesn't appraise for purchase price",
              "Title contingency: Ensures clear ownership transfer",
              "Homeowner's insurance contingency: Confirms you can get coverage",
            ],
          },
          {
            type: "list",
            content: "Closing costs to expect:",
            items: [
              "Loan origination fees (0.5-1% of loan amount)",
              "Appraisal fee ($300-600)",
              "Home inspection ($300-500)",
              "Title insurance and search fees",
              "Attorney or escrow fees",
              "Property taxes and insurance prorations",
              "Recording fees and transfer taxes",
            ],
          },
          {
            type: "tip",
            content:
              "Get pre-approved, not just pre-qualified, before house hunting. Pre-approval shows sellers you're a serious buyer and can close on the purchase.",
          },
        ],
        keyTakeaways: [
          "Preparation is key to a smooth home buying process",
          "Pre-approval strengthens your position with sellers",
          "Contingencies protect you during the buying process",
          "Budget for closing costs in addition to your down payment",
        ],
        quiz: {
          questions: [
            {
              question: "What's the difference between pre-qualification and pre-approval?",
              options: [
                "There is no difference",
                "Pre-approval involves verification of financial information",
                "Pre-qualification is more thorough",
                "Pre-approval costs more money",
              ],
              correctAnswer: "Pre-approval involves verification of financial information",
              explanation: "Pre-approval requires documentation and verification of income, assets, and credit, while pre-qualification is based on self-reported information.",
            },
          ],
        },
      },
      {
        title: "Down Payments and PMI",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Understanding Down Payment Requirements",
          },
          {
            type: "paragraph",
            content:
              "The down payment is one of the biggest barriers to homeownership for young adults. Understanding your options and the implications of different down payment amounts helps you plan and potentially buy sooner than you think.",
          },
          {
            type: "list",
            content: "Down payment options by loan type:",
            items: [
              "Conventional loans: 3-20% down",
              "FHA loans: 3.5% down minimum",
              "VA loans: 0% down for eligible veterans",
              "USDA loans: 0% down for rural properties",
              "First-time buyer programs: Often 3-5% down",
              "Jumbo loans: Typically 10-20% down",
            ],
          },
          {
            type: "list",
            content: "Private Mortgage Insurance (PMI):",
            items: [
              "Required when down payment is less than 20%",
              "Protects the lender, not the borrower",
              "Costs 0.3-1.5% of loan amount annually",
              "Can be removed when you reach 20% equity",
              "Different types: borrower-paid, lender-paid, split-premium",
              "FHA loans have mortgage insurance premiums (MIP)",
            ],
          },
          {
            type: "example",
            content:
              "Jake buys a $250,000 home with 5% down ($12,500). His PMI costs $150/month. After 5 years of payments and appreciation, he reaches 20% equity and cancels PMI, saving $1,800 annually.",
          },
          {
            type: "list",
            content: "Strategies to avoid or minimize PMI:",
            items: [
              "Save for a 20% down payment",
              "Use a piggyback loan (80-10-10 or 80-15-5)",
              "Choose lender-paid PMI with slightly higher rate",
              "Look into first-time buyer programs",
              "Consider VA or USDA loans if eligible",
              "Make extra principal payments to reach 20% equity faster",
            ],
          },
          {
            type: "list",
            content: "Down payment assistance programs:",
            items: [
              "State and local first-time buyer programs",
              "Employer homebuyer assistance",
              "Non-profit organization grants",
              "IRA withdrawals for first-time buyers",
              "Gift funds from family members",
              "Community development programs",
            ],
          },
          {
            type: "tip",
            content:
              "Don't let the 20% down payment myth stop you from buying. Many programs allow much lower down payments, and PMI can be removed once you build equity.",
          },
        ],
        keyTakeaways: [
          "You don't always need 20% down to buy a home",
          "PMI protects the lender and adds to your monthly payment",
          "Government-backed loans offer low down payment options",
          "Down payment assistance programs can help first-time buyers",
        ],
        quiz: {
          questions: [
            {
              question: "When can you typically remove PMI from your mortgage?",
              options: [
                "After 5 years of payments",
                "When you reach 20% equity in the home",
                "When interest rates drop",
                "Never, it's permanent",
              ],
              correctAnswer: "When you reach 20% equity in the home",
              explanation: "PMI can typically be removed when you have 20% equity in your home through payments, appreciation, or a combination of both.",
            },
          ],
        },
      },
      {
        title: "Mortgage Rates and Shopping",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Finding the Best Mortgage Rate",
          },
          {
            type: "paragraph",
            content:
              "Mortgage rates can vary significantly between lenders and change daily based on market conditions. Shopping around and understanding what affects your rate can save you thousands of dollars over the life of your loan.",
          },
          {
            type: "list",
            content: "Factors that affect your mortgage rate:",
            items: [
              "Credit score (higher scores get better rates)",
              "Down payment amount (more down = lower rate)",
              "Loan term (15-year loans typically have lower rates)",
              "Loan type (conventional vs. government-backed)",
              "Debt-to-income ratio",
              "Market conditions and economic factors",
            ],
          },
          {
            type: "list",
            content: "Types of lenders to consider:",
            items: [
              "Banks (traditional relationship, local service)",
              "Credit unions (member benefits, competitive rates)",
              "Online lenders (convenience, competitive pricing)",
              "Mortgage brokers (access to multiple lenders)",
              "Direct lenders (streamlined process)",
              "Portfolio lenders (keep loans in-house)",
            ],
          },
          {
            type: "example",
            content:
              "Lisa shops with 5 lenders for a $300,000 mortgage. Rates range from 6.25% to 6.75%. The 0.5% difference means $89 more per month and $32,000 more over 30 years for the higher rate.",
          },
          {
            type: "list",
            content: "Rate shopping strategies:",
            items: [
              "Get quotes from at least 3-5 lenders",
              "Compare within a 14-45 day window to minimize credit impact",
              "Look at both rate and closing costs",
              "Consider rate locks to protect against increases",
              "Ask about discount points to buy down the rate",
              "Compare Annual Percentage Rate (APR), not just interest rate",
            ],
          },
          {
            type: "list",
            content: "Understanding rate locks:",
            items: [
              "Protects your rate for 30-60 days typically",
              "May cost extra for longer lock periods",
              "Necessary in rising rate environments",
              "Float-down options may be available",
              "Lock when you're satisfied with the rate",
              "Understand what happens if lock expires",
            ],
          },
          {
            type: "tip",
            content:
              "Don't just focus on the interest rate. Compare the APR and total closing costs to get the true cost of each loan offer. Sometimes a slightly higher rate with lower fees is better.",
          },
        ],
        keyTakeaways: [
          "Shop with multiple lenders to find the best rate",
          "Your credit score and down payment significantly affect rates",
          "Compare APR and total costs, not just interest rates",
          "Rate locks protect you from increases during processing",
        ],
        quiz: {
          questions: [
            {
              question: "What's the best way to compare mortgage offers from different lenders?",
              options: [
                "Compare interest rates only",
                "Compare monthly payments only",
                "Compare APR and total closing costs",
                "Choose the lender with the best advertising",
              ],
              correctAnswer: "Compare APR and total closing costs",
              explanation: "APR includes both the interest rate and fees, giving you the true cost of borrowing. Total closing costs show upfront expenses.",
            },
          ],
        },
      },
      {
        title: "Refinancing Your Mortgage",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "When and How to Refinance",
          },
          {
            type: "paragraph",
            content:
              "Refinancing replaces your current mortgage with a new one, potentially with better terms. Understanding when refinancing makes sense and the process involved can help you save money or achieve other financial goals.",
          },
          {
            type: "list",
            content: "Reasons to refinance:",
            items: [
              "Lower interest rates (typically need 0.5-1% improvement)",
              "Remove PMI when you have 20% equity",
              "Change loan terms (30-year to 15-year or vice versa)",
              "Switch from ARM to fixed rate",
              "Cash-out refinancing for home improvements or debt consolidation",
              "Remove a co-borrower after divorce",
            ],
          },
          {
            type: "list",
            content: "Types of refinancing:",
            items: [
              "Rate-and-term refinance: Change rate or loan term",
              "Cash-out refinance: Borrow against home equity",
              "Cash-in refinance: Pay down principal to get better terms",
              "Streamline refinance: Simplified process for government loans",
              "No-closing-cost refinance: Lender pays costs for higher rate",
            ],
          },
          {
            type: "example",
            content:
              "Tom has a $200,000 mortgage at 7% with 25 years left. He refinances to 5.5% for 30 years, lowering his payment by $200/month but extending the term. He plans to invest the savings.",
          },
          {
            type: "list",
            content: "Refinancing costs to consider:",
            items: [
              "Application and origination fees",
              "Appraisal fee ($300-600)",
              "Title insurance and search",
              "Attorney or closing fees",
              "Credit report and processing fees",
              "Prepayment penalty on current loan (if applicable)",
            ],
          },
          {
            type: "list",
            content: "When refinancing might not make sense:",
            items: [
              "Closing costs exceed potential savings",
              "You plan to move within 2-3 years",
              "Your credit score has declined significantly",
              "You've already refinanced recently",
              "Current loan balance is very low",
              "You're close to paying off current mortgage",
            ],
          },
          {
            type: "tip",
            content:
              "Calculate your break-even point by dividing closing costs by monthly savings. If you'll stay in the home longer than the break-even period, refinancing likely makes sense.",
          },
        ],
        keyTakeaways: [
          "Refinancing can lower payments or change loan terms",
          "Consider closing costs versus potential savings",
          "Calculate break-even point before deciding",
          "Shop around just like you did for your original mortgage",
        ],
        quiz: {
          questions: [
            {
              question: "What's the break-even point in refinancing?",
              options: [
                "When you pay off the loan",
                "When closing costs equal monthly savings accumulated",
                "When interest rates stop falling",
                "When your home value increases",
              ],
              correctAnswer: "When closing costs equal monthly savings accumulated",
              explanation: "The break-even point is when your accumulated monthly savings from the new loan equal the closing costs you paid to refinance.",
            },
          ],
        },
      },
      {
        title: "Homeownership Costs and Budgeting",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "The True Cost of Homeownership",
          },
          {
            type: "paragraph",
            content:
              "Homeownership involves many costs beyond your mortgage payment. Understanding and budgeting for these expenses helps you avoid financial stress and maintain your home properly over time.",
          },
          {
            type: "list",
            content: "Ongoing homeownership costs:",
            items: [
              "Property taxes (varies by location, typically 1-3% of home value annually)",
              "Homeowner's insurance ($800-2,000+ annually)",
              "PMI if applicable ($100-300+ monthly)",
              "HOA fees if applicable ($50-500+ monthly)",
              "Utilities (electricity, gas, water, sewer, trash)",
              "Maintenance and repairs (1-3% of home value annually)",
            ],
          },
          {
            type: "list",
            content: "First-year homeowner expenses:",
            items: [
              "Moving costs",
              "Immediate repairs or improvements",
              "New furniture and appliances",
              "Lawn and garden equipment",
              "Security system installation",
              "Utility deposits and setup fees",
            ],
          },
          {
            type: "example",
            content:
              "Alex buys a $300,000 home. Annual costs include: $4,500 property taxes, $1,200 insurance, $1,800 PMI, $3,000 maintenance, plus utilities. Total: $10,500 annually beyond the mortgage payment.",
          },
          {
            type: "list",
            content: "Budgeting rules for homeownership:",
            items: [
              "28% rule: Housing costs shouldn't exceed 28% of gross income",
              "36% rule: Total debt payments shouldn't exceed 36% of gross income",
              "Save 1-3% of home value annually for maintenance",
              "Keep 3-6 months of expenses in emergency fund",
              "Budget for property tax and insurance increases",
              "Plan for major system replacements (roof, HVAC, etc.)",
            ],
          },
          {
            type: "list",
            content: "Money-saving homeowner tips:",
            items: [
              "Shop around for homeowner's insurance annually",
              "Appeal property tax assessments if home value drops",
              "Learn basic maintenance to avoid service calls",
              "Energy-efficient improvements can lower utility bills",
              "Regular maintenance prevents costly repairs",
              "Consider bundling insurance policies for discounts",
            ],
          },
          {
            type: "tip",
            content:
              "Create separate savings accounts for property taxes, insurance, and maintenance. Set up automatic transfers so you're prepared when these expenses come due.",
          },
        ],
        keyTakeaways: [
          "Homeownership costs extend far beyond the mortgage payment",
          "Budget 1-3% of home value annually for maintenance",
          "Follow the 28/36 rule for housing affordability",
          "Build separate savings for homeownership expenses",
        ],
        quiz: {
          questions: [
            {
              question: "According to the 28% rule, what's the maximum you should spend on housing?",
              options: [
                "28% of take-home pay",
                "28% of gross monthly income",
                "28% of your savings",
                "28% of your total debt",
              ],
              correctAnswer: "28% of gross monthly income",
              explanation: "The 28% rule states that your total housing costs (including mortgage, taxes, and insurance) shouldn't exceed 28% of your gross monthly income.",
            },
          ],
        },
      },
      {
        title: "First-Time Homebuyer Programs",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Programs to Help You Buy Your First Home",
          },
          {
            type: "paragraph",
            content:
              "Many programs exist to help first-time homebuyers overcome common barriers like down payments and closing costs. Understanding these options can make homeownership more accessible and affordable for young adults.",
          },
          {
            type: "list",
            content: "Federal first-time buyer programs:",
            items: [
              "FHA loans: 3.5% down, flexible credit requirements",
              "VA loans: 0% down for eligible veterans and service members",
              "USDA loans: 0% down for rural and suburban areas",
              "Conventional 97: 3% down payment option",
              "HomeReady and Home Possible: Low down payment with income limits",
              "Good Neighbor Next Door: Discounts for teachers, firefighters, etc.",
            ],
          },
          {
            type: "list",
            content: "State and local programs:",
            items: [
              "Down payment assistance grants",
              "Closing cost assistance",
              "Below-market interest rate loans",
              "Tax credits for mortgage interest",
              "Shared equity programs",
              "First-time buyer education courses",
            ],
          },
          {
            type: "example",
            content:
              "Maria qualifies for her state's first-time buyer program, receiving a $10,000 down payment grant and $3,000 in closing cost assistance, making her $250,000 home purchase possible with minimal out-of-pocket costs.",
          },
          {
            type: "list",
            content: "Employer homebuyer assistance:",
            items: [
              "Down payment assistance loans or grants",
              "Closing cost reimbursement",
              "Preferred lender relationships with better rates",
              "Homebuyer education and counseling",
              "Relocation assistance for job transfers",
              "Employee housing programs in expensive markets",
            ],
          },
          {
            type: "list",
            content: "First-time buyer definition:",
            items: [
              "Haven't owned a home in the past 3 years (most programs)",
              "Single parents who only owned with former spouse",
              "Displaced homemakers",
              "Some programs have no previous ownership restrictions",
              "Definition varies by program",
              "May include income and location restrictions",
            ],
          },
          {
            type: "list",
            content: "How to find programs:",
            items: [
              "Contact your state housing finance agency",
              "Check with local housing authorities",
              "Ask lenders about available programs",
              "Search HUD's website for local resources",
              "Consult with HUD-approved housing counselors",
              "Check with your employer's HR department",
            ],
          },
          {
            type: "tip",
            content:
              "Start researching first-time buyer programs early in your home buying process. Some programs have limited funding and may have waiting lists or application deadlines.",
          },
        ],
        keyTakeaways: [
          "Many programs help first-time buyers with down payments and costs",
          "Federal, state, local, and employer programs are available",
          "First-time buyer definition is usually 3 years without homeownership",
          "Research programs early as funding may be limited",
        ],
        quiz: {
          questions: [
            {
              question: "What typically qualifies someone as a first-time homebuyer?",
              options: [
                "Never owned any property",
                "Haven't owned a home in the past 3 years",
                "Under age 30",
                "Income below $50,000",
              ],
              correctAnswer: "Haven't owned a home in the past 3 years",
              explanation: "Most first-time homebuyer programs define a first-time buyer as someone who hasn't owned a home in the past 3 years.",
            },
          ],
        },
      },
    ],
    "retirement-planning": [
      {
        title: "Understanding 401(k) Plans",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "What is a 401(k)?",
          },
          {
            type: "paragraph",
            content:
              "A 401(k) is a retirement savings plan sponsored by an employer. It allows employees to save and invest a portion of their paycheck before taxes are taken out. For young adults, starting a 401(k) early is one of the most powerful wealth-building tools available.",
          },
          {
            type: "list",
            content: "Key 401(k) features:",
            items: [
              "Pre-tax contributions reduce current taxable income",
              "Tax-deferred growth until retirement",
              "Employer matching contributions (free money!)",
              "Higher contribution limits than IRAs",
              "Automatic payroll deductions make saving easy",
              "Vesting schedules for employer contributions",
            ],
          },
          {
            type: "list",
            content: "2024 401(k) contribution limits:",
            items: [
              "Employee contribution: $23,000 annually",
              "Catch-up contribution (age 50+): Additional $7,500",
              "Total contribution limit: $69,000 (including employer match)",
              "Highly compensated employee limits may apply",
            ],
          },
          {
            type: "example",
            content:
              "Sarah earns $60,000 and contributes 10% ($6,000) to her 401(k). Her employer matches 50% of contributions up to 6%, adding $1,800. Her total retirement savings is $7,800 annually, reducing her taxable income to $54,000.",
          },
          {
            type: "list",
            content: "Benefits of 401(k) participation:",
            items: [
              "Immediate tax savings on contributions",
              "Employer matching is free money",
              "Compound growth over decades",
              "Automatic investing builds discipline",
              "Portability when changing jobs",
              "Loan options for emergencies (use carefully)",
            ],
          },
          {
            type: "tip",
            content:
              "Always contribute enough to get the full employer match - it's an immediate 100% return on your investment. If your employer matches 50% up to 6%, contribute at least 6% to maximize free money.",
          },
        ],
        keyTakeaways: [
          "401(k)s offer tax advantages and employer matching",
          "Start early to maximize compound growth",
          "Always get the full employer match",
          "Higher contribution limits than other retirement accounts",
        ],
        quiz: {
          questions: [
            {
              question: "What is a key benefit of a 401(k)?",
              options: ["Tax-free withdrawals", "High liquidity", "Employer matching", "Guaranteed returns"],
              correctAnswer: "Employer matching",
              explanation: "Employer matching is essentially free money added to your retirement savings, making it one of the most valuable benefits of 401(k) participation.",
            },
          ],
        },
      },
      {
        title: "Exploring Traditional and Roth IRAs",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Individual Retirement Account Options",
          },
          {
            type: "paragraph",
            content:
              "IRAs (Individual Retirement Accounts) provide additional retirement savings opportunities beyond employer plans. Understanding the differences between Traditional and Roth IRAs helps you choose the best option for your situation.",
          },
          {
            type: "list",
            content: "Traditional IRA features:",
            items: [
              "Tax-deductible contributions (subject to income limits)",
              "Tax-deferred growth until withdrawal",
              "Required minimum distributions starting at age 73",
              "Penalties for early withdrawal before age 59½",
              "Good for those expecting lower tax rates in retirement",
              "2024 contribution limit: $7,000 ($8,000 if age 50+)",
            ],
          },
          {
            type: "list",
            content: "Roth IRA features:",
            items: [
              "After-tax contributions (no immediate deduction)",
              "Tax-free growth and qualified withdrawals",
              "No required minimum distributions during lifetime",
              "Contributions can be withdrawn penalty-free anytime",
              "Good for those expecting higher tax rates in retirement",
              "Income limits for eligibility",
            ],
          },
          {
            type: "example",
            content:
              "Mike, age 25, contributes $6,000 to a Roth IRA annually. Assuming 7% growth, he'll have over $1.3 million tax-free at age 65. If he used a Traditional IRA instead, he'd owe taxes on withdrawals in retirement.",
          },
          {
            type: "list",
            content: "Roth IRA income limits (2024):",
            items: [
              "Single filers: Phase-out $138,000-$153,000",
              "Married filing jointly: Phase-out $218,000-$228,000",
              "Above limits: Consider backdoor Roth conversion",
              "No income limits for Traditional IRA contributions",
              "Deductibility limits based on income and 401(k) participation",
            ],
          },
          {
            type: "list",
            content: "Choosing between Traditional and Roth:",
            items: [
              "Current vs. expected future tax rates",
              "Need for tax deduction now vs. tax-free income later",
              "Time horizon until retirement",
              "Income level and eligibility",
              "Estate planning considerations",
              "Flexibility for early withdrawals",
            ],
          },
          {
            type: "tip",
            content:
              "Young adults often benefit more from Roth IRAs because they're typically in lower tax brackets now and have decades for tax-free growth. Consider contributing to a Roth IRA after getting your full 401(k) match.",
          },
        ],
        keyTakeaways: [
          "Traditional IRAs offer immediate tax deductions",
          "Roth IRAs provide tax-free retirement income",
          "Young people often benefit more from Roth accounts",
          "Consider your current and future tax situations",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main difference between a Traditional IRA and a Roth IRA?",
              options: [
                "Traditional IRAs are tax-free",
                "Roth IRAs offer tax-free withdrawals in retirement",
                "Traditional IRAs have no contribution limits",
                "Roth IRAs are only for high-income earners",
              ],
              correctAnswer: "Roth IRAs offer tax-free withdrawals in retirement",
              explanation: "Roth IRAs are funded with after-tax dollars but offer tax-free growth and withdrawals in retirement, while Traditional IRAs are tax-deferred.",
            },
          ],
        },
      },
      {
        title: "Retirement Planning Strategies",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Building Your Retirement Plan",
          },
          {
            type: "paragraph",
            content:
              "Successful retirement planning requires a comprehensive strategy that considers your goals, timeline, and risk tolerance. Starting early and being consistent are more important than perfect investment selection.",
          },
          {
            type: "list",
            content: "Retirement planning steps:",
            items: [
              "Estimate retirement expenses (70-90% of current income)",
              "Determine retirement timeline and goals",
              "Calculate required savings rate",
              "Maximize employer matching contributions",
              "Choose appropriate investment allocation",
              "Review and adjust plan annually",
            ],
          },
          {
            type: "list",
            content: "The power of starting early:",
            items: [
              "Compound growth has more time to work",
              "Lower required savings rate",
              "More time to recover from market downturns",
              "Ability to take more investment risk",
              "Flexibility to adjust strategy over time",
              "Less financial stress in later years",
            ],
          },
          {
            type: "example",
            content:
              "Emma starts saving $300/month at age 22. By age 65, she'll have $1.4 million (assuming 7% returns). If she waits until age 32, she'd need to save $650/month to reach the same goal.",
          },
          {
            type: "list",
            content: "Age-based investment strategies:",
            items: [
              "20s-30s: Aggressive growth (80-90% stocks)",
              "40s: Moderate growth (70-80% stocks)",
              "50s: Balanced approach (60-70% stocks)",
              "60s+: Conservative growth (40-60% stocks)",
              "Rule of thumb: 100 minus your age = stock percentage",
              "Adjust based on risk tolerance and goals",
            ],
          },
          {
            type: "list",
            content: "Retirement account prioritization:",
            items: [
              "1. 401(k) up to employer match",
              "2. High-interest debt payoff",
              "3. Roth IRA contribution",
              "4. Max out 401(k) contribution",
              "5. Taxable investment accounts",
              "6. Other tax-advantaged accounts (HSA, etc.)",
            ],
          },
          {
            type: "tip",
            content:
              "Automate your retirement savings by setting up automatic contributions. Increase your savings rate by 1% annually or whenever you get a raise to painlessly boost your retirement fund.",
          },
        ],
        keyTakeaways: [
          "Start retirement planning as early as possible",
          "Compound growth makes early saving incredibly powerful",
          "Adjust investment allocation based on age and risk tolerance",
          "Prioritize accounts based on tax advantages and matching",
        ],
        quiz: {
          questions: [
            {
              question: "Why is starting retirement savings early so important?",
              options: [
                "Investment options are better when young",
                "Compound growth has more time to work",
                "Tax rates are lower for young people",
                "Employers only match for young employees",
              ],
              correctAnswer: "Compound growth has more time to work",
              explanation: "Starting early gives compound growth decades to work, allowing smaller contributions to grow into substantial retirement savings.",
            },
          ],
        },
      },
      {
        title: "Social Security and Medicare",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Understanding Government Retirement Benefits",
          },
          {
            type: "paragraph",
            content:
              "Social Security and Medicare form the foundation of retirement security for most Americans. Understanding how these programs work helps you plan more effectively and make informed decisions about your retirement timing.",
          },
          {
            type: "list",
            content: "Social Security basics:",
            items: [
              "Funded by payroll taxes (6.2% employee, 6.2% employer)",
              "Benefits based on highest 35 years of earnings",
              "Full retirement age varies by birth year (66-67)",
              "Can claim as early as age 62 (reduced benefits)",
              "Delayed retirement credits until age 70",
              "Cost-of-living adjustments (COLA) annually",
            ],
          },
          {
            type: "list",
            content: "Social Security benefit calculation:",
            items: [
              "Based on Average Indexed Monthly Earnings (AIME)",
              "Progressive benefit formula favors lower earners",
              "Maximum benefit in 2024: $4,873/month at full retirement age",
              "Early claiming reduces benefits by up to 30%",
              "Delayed claiming increases benefits by 8% per year until age 70",
              "Spousal and survivor benefits available",
            ],
          },
          {
            type: "example",
            content:
              "David's full retirement age is 67. If he claims at 62, his $2,000 monthly benefit becomes $1,400. If he waits until 70, it increases to $2,480. The difference is $1,080 per month for life.",
          },
          {
            type: "list",
            content: "Medicare overview:",
            items: [
              "Part A: Hospital insurance (premium-free for most)",
              "Part B: Medical insurance (monthly premium required)",
              "Part C: Medicare Advantage (private plan alternative)",
              "Part D: Prescription drug coverage",
              "Medigap: Supplemental insurance for gaps",
              "Enrollment begins 3 months before turning 65",
            ],
          },
          {
            type: "list",
            content: "Planning considerations:",
            items: [
              "Social Security may replace only 40% of pre-retirement income",
              "Medicare doesn't cover all healthcare costs",
              "Long-term care not covered by Medicare",
              "Consider healthcare costs in retirement planning",
              "Review Social Security statements annually",
              "Plan for potential program changes",
            ],
          },
          {
            type: "tip",
            content:
              "Create a my Social Security account at ssa.gov to track your earnings history and get benefit estimates. This helps you plan and ensures your earnings are recorded correctly.",
          },
        ],
        keyTakeaways: [
          "Social Security provides a foundation but isn't enough alone",
          "Claiming age significantly affects benefit amounts",
          "Medicare has multiple parts with different costs",
          "Plan for healthcare costs not covered by Medicare",
        ],
        quiz: {
          questions: [
            {
              question: "What happens if you claim Social Security before your full retirement age?",
              options: [
                "Benefits increase",
                "Benefits are reduced permanently",
                "Benefits are delayed",
                "Nothing changes",
              ],
              correctAnswer: "Benefits are reduced permanently",
              explanation: "Claiming Social Security before full retirement age results in permanently reduced benefits, up to 30% less than your full benefit amount.",
            },
          ],
        },
      },
      {
        title: "Retirement Income Planning",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Creating Sustainable Retirement Income",
          },
          {
            type: "paragraph",
            content:
              "Retirement income planning involves creating a strategy to generate steady income throughout retirement. Understanding different income sources and withdrawal strategies helps ensure your money lasts as long as you do.",
          },
          {
            type: "list",
            content
