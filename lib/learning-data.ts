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
            content: "Sources of retirement income:",
            items: [
              "Social Security benefits",
              "401(k) and IRA withdrawals",
              "Pension payments (if available)",
              "Part-time work or consulting",
              "Rental property income",
              "Dividend and interest income",
              "Annuity payments",
              "Business income or royalties",
            ],
          },
          {
            type: "list",
            content: "The 4% withdrawal rule:",
            items: [
              "Withdraw 4% of portfolio value in first year",
              "Adjust subsequent years for inflation",
              "Based on historical market performance",
              "Designed to make money last 30 years",
              "May need adjustment based on market conditions",
              "Conservative approach for early retirees",
            ],
          },
          {
            type: "example",
            content:
              "Janet retires with $1 million in savings. Using the 4% rule, she can withdraw $40,000 in year one, then adjust for inflation annually. This strategy historically preserves capital for 30+ years.",
          },
          {
            type: "list",
            content: "Tax-efficient withdrawal strategies:",
            items: [
              "Withdraw from taxable accounts first",
              "Use tax-deferred accounts in middle years",
              "Save Roth accounts for last (tax-free)",
              "Consider tax bracket management",
              "Plan for required minimum distributions",
              "Coordinate with Social Security timing",
            ],
          },
          {
            type: "list",
            content: "Income replacement targets:",
            items: [
              "Conservative: 70-80% of pre-retirement income",
              "Moderate: 80-90% of pre-retirement income",
              "Comfortable: 90-100% of pre-retirement income",
              "Luxury: 100%+ of pre-retirement income",
              "Adjust based on expected lifestyle changes",
              "Consider healthcare cost increases",
            ],
          },
          {
            type: "list",
            content: "Retirement income risks:",
            items: [
              "Longevity risk: Outliving your money",
              "Inflation risk: Purchasing power erosion",
              "Market risk: Poor investment returns",
              "Healthcare cost risk: Unexpected medical expenses",
              "Sequence of returns risk: Poor early retirement returns",
              "Interest rate risk: Low bond yields",
            ],
          },
          {
            type: "tip",
            content:
              "Consider working with a financial advisor as you approach retirement to create a comprehensive income plan. They can help optimize your withdrawal strategy and manage various risks.",
          },
        ],
        keyTakeaways: [
          "Multiple income sources provide retirement security",
          "The 4% rule is a starting point for withdrawal planning",
          "Tax-efficient withdrawal strategies can extend portfolio life",
          "Plan for various risks that can affect retirement income",
        ],
        quiz: {
          questions: [
            {
              question: "What is the 4% withdrawal rule?",
              options: [
                "Withdraw 4% of income annually",
                "Withdraw 4% of portfolio value in the first year of retirement",
                "Save 4% of income for retirement",
                "Invest 4% in bonds",
              ],
              correctAnswer: "Withdraw 4% of portfolio value in the first year of retirement",
              explanation: "The 4% rule suggests withdrawing 4% of your portfolio value in the first year of retirement, then adjusting for inflation in subsequent years.",
            },
          ],
        },
      },
      {
        title: "Catch-Up Strategies for Late Starters",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Accelerating Retirement Savings",
          },
          {
            type: "paragraph",
            content:
              "If you're starting retirement planning later in life, don't panic. While starting early is ideal, there are strategies to accelerate your savings and still achieve a comfortable retirement, even with a shorter timeline.",
          },
          {
            type: "list",
            content: "Catch-up contribution opportunities:",
            items: [
              "401(k) catch-up: Additional $7,500 annually (age 50+)",
              "IRA catch-up: Additional $1,000 annually (age 50+)",
              "Total 401(k) contribution: $30,500 for those 50+",
              "Total IRA contribution: $8,000 for those 50+",
              "HSA catch-up: Additional $1,000 annually (age 55+)",
              "Maximize all available catch-up contributions",
            ],
          },
          {
            type: "list",
            content: "Aggressive savings strategies:",
            items: [
              "Save 20-30% or more of income",
              "Downsize housing to reduce expenses",
              "Eliminate all non-essential spending",
              "Work additional years beyond planned retirement",
              "Take on part-time work or consulting",
              "Delay Social Security for higher benefits",
            ],
          },
          {
            type: "example",
            content:
              "At age 50, Mark realizes he has only $100,000 saved. He maximizes his 401(k) with catch-up contributions ($30,500 annually) and saves aggressively. By age 65, he accumulates over $800,000.",
          },
          {
            type: "list",
            content: "Late-starter investment approach:",
            items: [
              "Maintain growth-oriented portfolio longer",
              "Consider working a few extra years",
              "Focus on tax-efficient investments",
              "Minimize investment fees and expenses",
              "Consider Roth conversions in lower-income years",
              "Don't panic and make emotional decisions",
            ],
          },
          {
            type: "list",
            content: "Alternative retirement strategies:",
            items: [
              "Geographic arbitrage: Move to lower-cost area",
              "Phased retirement: Gradual reduction in work",
              "Part-time work in retirement",
              "Monetize hobbies or skills",
              "House hacking or rental income",
              "Consider working until age 70 for maximum Social Security",
            ],
          },
          {
            type: "tip",
            content:
              "Focus on what you can control: your savings rate, expenses, and work timeline. Even starting at 50, consistent saving and smart strategies can lead to a comfortable retirement.",
          },
        ],
        keyTakeaways: [
          "Catch-up contributions allow higher savings after age 50",
          "Aggressive saving rates can compensate for late starts",
          "Consider working longer for better retirement security",
          "Focus on controllable factors like savings rate and expenses",
        ],
        quiz: {
          questions: [
            {
              question: "What is the catch-up contribution limit for 401(k)s in 2024?",
              options: ["$5,000", "$7,500", "$10,000", "$15,000"],
              correctAnswer: "$7,500",
              explanation: "Individuals age 50 and older can contribute an additional $7,500 to their 401(k) as a catch-up contribution in 2024.",
            },
          ],
        },
      },
      {
        title: "Estate Planning and Retirement",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Protecting Your Retirement Legacy",
          },
          {
            type: "paragraph",
            content:
              "Estate planning ensures your retirement assets are distributed according to your wishes and helps minimize taxes for your beneficiaries. Proper planning can also protect your assets during your lifetime and provide for long-term care needs.",
          },
          {
            type: "list",
            content: "Essential estate planning documents:",
            items: [
              "Will: Directs distribution of assets",
              "Durable power of attorney: Financial decisions if incapacitated",
              "Healthcare power of attorney: Medical decisions",
              "Living will/advance directive: End-of-life preferences",
              "HIPAA authorization: Medical information access",
              "Trust documents (if applicable)",
            ],
          },
          {
            type: "list",
            content: "Retirement account beneficiaries:",
            items: [
              "Name primary and contingent beneficiaries",
              "Update beneficiaries after major life events",
              "Consider per stirpes vs. per capita designations",
              "Understand spousal vs. non-spousal beneficiary rules",
              "Review beneficiary forms regularly",
              "Coordinate with overall estate plan",
            ],
          },
          {
            type: "example",
            content:
              "Tom's 401(k) beneficiary form lists his ex-wife from 10 years ago. When he dies, she receives the entire $500,000 balance despite his will leaving everything to his current wife and children.",
          },
          {
            type: "list",
            content: "Tax considerations for heirs:",
            items: [
              "Traditional retirement accounts: Heirs pay income tax",
              "Roth accounts: Generally tax-free to heirs",
              "Required distributions for inherited accounts",
              "10-year rule for most non-spouse beneficiaries",
              "Stretch provisions for eligible designated beneficiaries",
              "Consider Roth conversions to reduce heir tax burden",
            ],
          },
          {
            type: "list",
            content: "Long-term care planning:",
            items: [
              "Long-term care insurance options",
              "Self-insurance through savings",
              "Medicaid planning strategies",
              "Asset protection trusts",
              "Family caregiving considerations",
              "Veterans benefits for care",
            ],
          },
          {
            type: "tip",
            content:
              "Review and update your beneficiary designations every few years and after major life events. Beneficiary forms override your will, so keeping them current is crucial.",
          },
        ],
        keyTakeaways: [
          "Estate planning protects your retirement assets and legacy",
          "Keep beneficiary designations current and coordinated",
          "Consider tax implications for your heirs",
          "Plan for potential long-term care needs",
        ],
        quiz: {
          questions: [
            {
              question: "What happens if your retirement account beneficiary designation conflicts with your will?",
              options: [
                "The will takes precedence",
                "The beneficiary designation takes precedence",
                "The court decides",
                "The assets go to the state",
              ],
              correctAnswer: "The beneficiary designation takes precedence",
              explanation: "Beneficiary designations on retirement accounts override instructions in your will, making it crucial to keep these forms updated.",
            },
          ],
        },
      },
      {
        title: "Healthcare Costs in Retirement",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Planning for Medical Expenses",
          },
          {
            type: "paragraph",
            content:
              "Healthcare costs are often one of the largest expenses in retirement and tend to increase with age. Understanding these costs and planning strategies helps ensure medical expenses don't derail your retirement security.",
          },
          {
            type: "list",
            content: "Healthcare cost realities:",
            items: [
              "Average couple needs $300,000+ for medical costs in retirement",
              "Medicare doesn't cover all expenses",
              "Long-term care costs average $50,000+ annually",
              "Healthcare inflation typically exceeds general inflation",
              "Prescription drug costs continue rising",
              "Dental and vision care often not covered",
            ],
          },
          {
            type: "list",
            content: "Medicare coverage gaps:",
            items: [
              "Deductibles and co-payments",
              "Services not covered by Medicare",
              "Long-term care (nursing homes, home care)",
              "Dental and vision care",
              "Hearing aids and routine foot care",
              "Care received outside the United States",
            ],
          },
          {
            type: "example",
            content:
              "Linda budgets $500/month for healthcare in retirement but faces $1,200/month in actual costs including Medicare premiums, supplements, prescriptions, and out-of-pocket expenses.",
          },
          {
            type: "list",
            content: "Healthcare planning strategies:",
            items: [
              "Health Savings Account (HSA) for triple tax advantage",
              "Long-term care insurance",
              "Medicare supplement (Medigap) insurance",
              "Maintain good health through preventive care",
              "Research Medicare Advantage vs. traditional Medicare",
              "Budget 15-20% of retirement income for healthcare",
            ],
          },
          {
            type: "list",
            content: "HSA advantages for retirement:",
            items: [
              "Triple tax advantage: Deductible, growth, and withdrawals",
              "No required minimum distributions",
              "Can be used for non-medical expenses after age 65 (taxed as income)",
              "Funds roll over year to year",
              "Can reimburse past medical expenses",
              "Becomes like a traditional IRA after age 65",
            ],
          },
          {
            type: "tip",
            content:
              "If you have access to an HSA, maximize contributions and invest the funds for long-term growth. It's the best retirement account for healthcare expenses and can supplement other retirement savings.",
          },
        ],
        keyTakeaways: [
          "Healthcare costs are a major retirement expense",
          "Medicare has significant coverage gaps",
          "HSAs provide excellent healthcare savings benefits",
          "Budget 15-20% of retirement income for medical costs",
        ],
        quiz: {
          questions: [
            {
              question: "What is a major healthcare expense that Medicare doesn't typically cover?",
              options: ["Hospital stays", "Doctor visits", "Long-term care", "Emergency room visits"],
              correctAnswer: "Long-term care",
              explanation: "Medicare generally doesn't cover long-term care services like nursing homes or extended home care, which can be very expensive in retirement.",
            },
          ],
        },
      },
      {
        title: "Working in Retirement",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Earning Income After Retirement",
          },
          {
            type: "paragraph",
            content:
              "Many retirees choose to work part-time or start new careers in retirement, whether for financial necessity, personal fulfillment, or social interaction. Understanding the implications and opportunities can help you plan for a more flexible retirement.",
          },
          {
            type: "list",
            content: "Reasons people work in retirement:",
            items: [
              "Financial necessity or desire for extra income",
              "Maintaining social connections and purpose",
              "Staying mentally and physically active",
              "Pursuing passion projects or new careers",
              "Maintaining employer health insurance",
              "Gradual transition from full-time work",
            ],
          },
          {
            type: "list",
            content: "Types of retirement work:",
            items: [
              "Part-time employment in same field",
              "Consulting or freelancing",
              "Starting a small business or side hustle",
              "Seasonal or temporary work",
              "Teaching or mentoring",
              "Volunteer work with stipends",
            ],
          },
          {
            type: "example",
            content:
              "After retiring from corporate finance, Robert becomes a part-time bookkeeper for small businesses, earning $20,000 annually while maintaining flexibility and using his expertise.",
          },
          {
            type: "list",
            content: "Social Security earnings limits:",
            items: [
              "Before full retirement age: $22,320 limit (2024)",
              "Excess earnings reduce benefits $1 for every $2 earned",
              "Year you reach full retirement age: $59,520 limit",
              "After full retirement age: No earnings limit",
              "Withheld benefits are added back at full retirement age",
              "Only earned income counts toward limits",
            ],
          },
          {
            type: "list",
            content: "Tax considerations:",
            items: [
              "Work income may make Social Security taxable",
              "May push you into higher tax brackets",
              "Consider Roth IRA conversions in lower-income years",
              "Self-employment income subject to self-employment tax",
              "May affect Medicare premium costs (IRMAA)",
              "Track business expenses for deductions",
            ],
          },
          {
            type: "tip",
            content:
              "If you plan to work in retirement, consider the timing of Social Security benefits and how earnings might affect your overall tax situation. Sometimes delaying Social Security while working can be beneficial.",
          },
        ],
        keyTakeaways: [
          "Many retirees work for financial and personal reasons",
          "Social Security has earnings limits before full retirement age",
          "Work income can affect taxes and benefit calculations",
          "Consider timing of benefits if you plan to work",
        ],
        quiz: {
          questions: [
            {
              question: "What happens if you earn more than the Social Security earnings limit before full retirement age?",
              options: [
                "You lose Social Security permanently",
                "Benefits are reduced temporarily",
                "You pay higher taxes",
                "Nothing happens",
              ],
              correctAnswer: "Benefits are reduced temporarily",
              explanation: "Excess earnings reduce Social Security benefits temporarily, but the withheld benefits are added back to your future payments when you reach full retirement age.",
            },
          ],
        },
      },
    ],
    "hsa": [
      {
        title: "HSA Basics and Eligibility",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "What is a Health Savings Account?",
          },
          {
            type: "paragraph",
            content:
              "A Health Savings Account (HSA) is a tax-advantaged savings account designed to help people save for medical expenses. It offers unique triple tax benefits and can serve as both a healthcare fund and retirement savings vehicle.",
          },
          {
            type: "list",
            content: "HSA eligibility requirements:",
            items: [
              "Must be enrolled in a High Deductible Health Plan (HDHP)",
              "Cannot be enrolled in Medicare",
              "Cannot be claimed as a dependent on someone else's tax return",
              "Cannot have other health coverage (with some exceptions)",
              "No age restrictions for opening an HSA",
            ],
          },
          {
            type: "list",
            content: "2024 HDHP requirements:",
            items: [
              "Minimum deductible: $1,600 (individual), $3,200 (family)",
              "Maximum out-of-pocket: $8,050 (individual), $16,100 (family)",
              "Can have preventive care coverage before meeting deductible",
              "May include prescription drug coverage",
            ],
          },
          {
            type: "list",
            content: "Triple tax advantage:",
            items: [
              "Tax-deductible contributions",
              "Tax-free growth on investments",
              "Tax-free withdrawals for qualified medical expenses",
              "No other account offers all three benefits",
            ],
          },
          {
            type: "example",
            content:
              "Sarah contributes $3,000 to her HSA, saving $720 in taxes (24% bracket). The money grows tax-free, and when she uses it for medical expenses, she pays no taxes on withdrawals.",
          },
          {
            type: "tip",
            content:
              "If your employer offers an HDHP with HSA, seriously consider it. The tax benefits and long-term savings potential make HSAs one of the best financial tools available.",
          },
        ],
        keyTakeaways: [
          "HSAs require enrollment in a High Deductible Health Plan",
          "Triple tax advantage makes HSAs extremely valuable",
          "No age restrictions for opening an HSA",
          "Preventive care is typically covered before meeting deductible",
        ],
        quiz: {
          questions: [
            {
              question: "What is required to be eligible for an HSA?",
              options: [
                "Being over age 65",
                "Having a High Deductible Health Plan",
                "Earning less than $50,000",
                "Being self-employed",
              ],
              correctAnswer: "Having a High Deductible Health Plan",
              explanation: "To be eligible for an HSA, you must be enrolled in a High Deductible Health Plan (HDHP) that meets IRS requirements.",
            },
          ],
        },
      },
      {
        title: "HSA Contribution Limits and Rules",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "How Much Can You Contribute?",
          },
          {
            type: "paragraph",
            content:
              "HSA contribution limits are set annually by the IRS and vary based on your coverage type. Understanding these limits and contribution rules helps you maximize your HSA benefits while staying compliant.",
          },
          {
            type: "list",
            content: "2024 HSA contribution limits:",
            items: [
              "Individual coverage: $4,150",
              "Family coverage: $8,300",
              "Catch-up contribution (age 55+): Additional $1,000",
              "Limits include both employee and employer contributions",
              "Pro-rated for partial year HDHP coverage",
            ],
          },
          {
            type: "list",
            content: "Contribution timing and rules:",
            items: [
              "Can contribute until tax filing deadline (typically April 15)",
              "Must have HDHP coverage on first day of month to contribute",
              "Last-month rule allows full-year contribution if covered Dec 1",
              "Testing period requires HDHP coverage through following December",
              "Contributions can be made by employee, employer, or both",
            ],
          },
          {
            type: "example",
            content:
              "Mike starts his HDHP in July. Normally he could only contribute $2,075 (half of $4,150), but the last-month rule lets him contribute the full $4,150 if he maintains coverage through the next December.",
          },
          {
            type: "list",
            content: "Employer contributions:",
            items: [
              "Count toward annual contribution limit",
              "May be subject to vesting schedules",
              "Often provided as lump sum or per-pay-period amounts",
              "May be conditional on employee contributions",
              "Immediately owned by employee (no forfeiture)",
            ],
          },
          {
            type: "list",
            content: "Excess contribution penalties:",
            items: [
              "6% excise tax on excess amounts",
              "Tax applies each year until excess is removed",
              "Can withdraw excess plus earnings before tax deadline",
              "Earnings on excess contributions are taxable",
              "Keep careful records of all contributions",
            ],
          },
          {
            type: "tip",
            content:
              "Maximize your HSA contributions early in the year if possible. This gives your money more time to grow tax-free and ensures you don't miss the contribution deadline.",
          },
        ],
        keyTakeaways: [
          "Contribution limits vary by coverage type and age",
          "Can contribute until tax filing deadline",
          "Last-month rule allows full-year contributions in some cases",
          "Excess contributions face 6% annual penalty",
        ],
        quiz: {
          questions: [
            {
              question: "What is the 2024 HSA contribution limit for individual coverage?",
              options: ["$3,650", "$4,150", "$4,300", "$8,300"],
              correctAnswer: "$4,150",
              explanation: "The 2024 HSA contribution limit for individual coverage is $4,150, with an additional $1,000 catch-up contribution for those age 55 and older.",
            },
          ],
        },
      },
      {
        title: "Qualified Medical Expenses",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "What Can You Use HSA Funds For?",
          },
          {
            type: "paragraph",
            content:
              "HSA funds can be used tax-free for a wide range of qualified medical expenses. Understanding what qualifies helps you maximize the tax benefits and avoid penalties for non-qualified withdrawals.",
          },
          {
            type: "list",
            content: "Common qualified medical expenses:",
            items: [
              "Doctor visits and specialist consultations",
              "Prescription medications",
              "Dental care and orthodontics",
              "Vision care and eyeglasses",
              "Mental health services",
              "Physical therapy and rehabilitation",
            ],
          },
          {
            type: "list",
            content: "Preventive care (often covered before deductible):",
            items: [
              "Annual physical exams",
              "Routine screenings (mammograms, colonoscopies)",
              "Immunizations and vaccines",
              "Well-child visits",
              "Preventive dental cleanings",
              "Annual eye exams",
            ],
          },
          {
            type: "example",
            content:
              "Lisa uses her HSA to pay for her $150 eye exam, $300 glasses, $50 prescription, and $200 dental cleaning. All are qualified expenses, so she pays no taxes on the $700 withdrawal.",
          },
          {
            type: "list",
            content: "Less obvious qualified expenses:",
            items: [
              "Over-the-counter medications (with prescription)",
              "Feminine hygiene products",
              "Sunscreen (SPF 15+)",
              "First aid supplies",
              "Blood pressure monitors",
              "Pregnancy test kits",
              "Contact lens solution",
              "Reading glasses",
            ],
          },
          {
            type: "list",
            content: "Non-qualified expenses:",
            items: [
              "Cosmetic procedures (unless medically necessary)",
              "Health club memberships",
              "Vitamins and supplements (unless prescribed)",
              "Teeth whitening",
              "Hair transplants",
              "Most insurance premiums (exceptions exist)",
            ],
          },
          {
            type: "list",
            content: "Record-keeping requirements:",
            items: [
              "Keep receipts for all HSA withdrawals",
              "Maintain records for at least 3 years after filing taxes",
              "Document medical necessity for borderline expenses",
              "Use HSA debit card or reimburse yourself",
              "Some expenses may require prescription documentation",
            ],
          },
          {
            type: "tip",
            content:
              "Keep detailed records of all medical expenses, even if you don't use HSA funds immediately. You can reimburse yourself years later for qualified expenses incurred after your HSA was established.",
          },
        ],
        keyTakeaways: [
          "Wide range of medical expenses qualify for tax-free withdrawals",
          "Preventive care is often covered before meeting deductible",
          "Some over-the-counter items qualify with restrictions",
          "Detailed record-keeping is essential for compliance",
        ],
        quiz: {
          questions: [
            {
              question: "Which of these is typically a qualified HSA expense?",
              options: ["Gym membership", "Prescription medications", "Cosmetic surgery", "Vitamins"],
              correctAnswer: "Prescription medications",
              explanation: "Prescription medications are qualified medical expenses that can be paid for with HSA funds tax-free.",
            },
          ],
        },
      },
      {
        title: "HSA Investment Options",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Growing Your HSA Through Investments",
          },
          {
            type: "paragraph",
            content:
              "Many HSA providers offer investment options beyond basic savings accounts. Investing your HSA funds can significantly increase their long-term value, especially if you're using the HSA as a retirement savings vehicle.",
          },
          {
            type: "list",
            content: "HSA investment basics:",
            items: [
              "Not all HSA providers offer investment options",
              "Usually require minimum cash balance ($1,000-$2,000)",
              "Investment options vary by provider",
              "Fees may apply for investment accounts",
              "Can typically move between cash and investments",
              "Investment gains grow tax-free",
            ],
          },
          {
            type: "list",
            content: "Common HSA investment options:",
            items: [
              "Mutual funds (index and actively managed)",
              "Exchange-traded funds (ETFs)",
              "Target-date funds",
              "Bond funds",
              "Money market funds",
              "Some providers offer individual stocks",
            ],
          },
          {
            type: "example",
            content:
              "David keeps $2,000 in cash for immediate medical expenses and invests the remaining $8,000 HSA balance in low-cost index funds, allowing for long-term growth while maintaining liquidity.",
          },
          {
            type: "list",
            content: "Investment strategy considerations:",
            items: [
              "Time horizon for needing the funds",
              "Risk tolerance and investment experience",
              "Current and expected future medical expenses",
              "Fees and expense ratios of investment options",
              "Diversification across asset classes",
              "Rebalancing needs over time",
            ],
          },
          {
            type: "list",
            content: "HSA investment advantages:",
            items: [
              "Tax-free growth on all investment gains",
              "No required minimum distributions (unlike 401k/IRA)",
              "Can be used for retirement healthcare costs",
              "Becomes like traditional IRA after age 65 for non-medical expenses",
              "Potential for significant long-term growth",
              "Hedge against healthcare inflation",
            ],
          },
          {
            type: "tip",
            content:
              "If you don't expect to use HSA funds for several years, consider investing them for growth. Keep enough cash for near-term medical expenses, but invest the rest for long-term potential.",
          },
        ],
        keyTakeaways: [
          "Many HSA providers offer investment options beyond cash",
          "Investment gains grow completely tax-free",
          "Consider time horizon and risk tolerance when investing",
          "Keep some cash for immediate medical expenses",
        ],
        quiz: {
          questions: [
            {
              question: "What is an advantage of investing HSA funds?",
              options: [
                "Guaranteed returns",
                "Tax-free growth on investment gains",
                "No investment fees",
                "Immediate access to all funds",
              ],
              correctAnswer: "Tax-free growth on investment gains",
              explanation: "Investment gains in an HSA grow completely tax-free, making it an excellent long-term savings and investment vehicle.",
            },
          ],
        },
      },
      {
        title: "HSA as a Retirement Account",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "The Ultimate Retirement Healthcare Account",
          },
          {
            type: "paragraph",
            content:
              "HSAs can serve as powerful retirement savings vehicles, especially for healthcare expenses. After age 65, HSAs become even more flexible while maintaining their tax advantages for medical expenses.",
          },
          {
            type: "list",
            content: "HSA retirement advantages:",
            items: [
              "Triple tax advantage continues in retirement",
              "No required minimum distributions (RMDs)",
              "Can reimburse past medical expenses",
              "Becomes like traditional IRA after age 65",
              "Healthcare costs typically increase with age",
              "Medicare premiums can be paid with HSA funds",
            ],
          },
          {
            type: "list",
            content: "HSA rules after age 65:",
            items: [
              "No penalty for non-medical withdrawals",
              "Non-medical withdrawals taxed as ordinary income",
              "Medical expenses still tax-free",
              "Can pay Medicare premiums (except Medigap)",
              "Long-term care insurance premiums qualify",
              "No more contributions once on Medicare",
            ],
          },
          {
            type: "example",
            content:
              "At age 67, Janet has $150,000 in her HSA. She uses $8,000 tax-free for medical expenses and withdraws $5,000 for living expenses (taxed as income), giving her flexibility in retirement.",
          },
          {
            type: "list",
            content: "Healthcare costs in retirement:",
            items: [
              "Average couple needs $300,000+ for medical costs",
              "Medicare doesn't cover all expenses",
              "Long-term care costs average $50,000+ annually",
              "Prescription drug costs continue rising",
              "Dental and vision care often not covered",
              "HSA provides tax-free funding for these costs",
            ],
          },
          {
            type: "list",
            content: "HSA vs. other retirement accounts:",
            items: [
              "Better than 401(k): No RMDs, tax-free medical withdrawals",
              "Better than Roth IRA: Tax deduction on contributions",
              "Better than traditional IRA: Tax-free medical withdrawals",
              "Unique triple tax advantage",
              "Can complement other retirement savings",
            ],
          },
          {
            type: "tip",
            content:
              "Maximize HSA contributions and invest for growth if you can afford to pay medical expenses out-of-pocket. This strategy builds a substantial tax-free healthcare fund for retirement.",
          },
        ],
        keyTakeaways: [
          "HSAs become more flexible after age 65",
          "No required minimum distributions unlike other retirement accounts",
          "Healthcare costs are a major retirement expense",
          "HSAs offer unique advantages over traditional retirement accounts",
        ],
        quiz: {
          questions: [
            {
              question: "What happens to HSA withdrawals for non-medical expenses after age 65?",
              options: [
                "20% penalty applies",
                "Taxed as ordinary income with no penalty",
                "Tax-free like Roth IRA",
                "Not allowed at any age",
              ],
              correctAnswer: "Taxed as ordinary income with no penalty",
              explanation: "After age 65, HSA withdrawals for non-medical expenses are taxed as ordinary income but have no penalty, making the HSA function like a traditional IRA.",
            },
          ],
        },
      },
    ],
    "insurance": [
      {
        title: "Life Insurance Fundamentals",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Understanding Life Insurance",
          },
          {
            type: "paragraph",
            content:
              "Life insurance provides financial protection for your loved ones in the event of your death. For young adults, understanding life insurance basics helps you make informed decisions about when and how much coverage you need.",
          },
          {
            type: "list",
            content: "Types of life insurance:",
            items: [
              "Term life: Temporary coverage for specific period",
              "Whole life: Permanent coverage with cash value",
              "Universal life: Flexible permanent coverage",
              "Variable life: Investment component with market risk",
              "Group life: Coverage through employer",
              "Accidental death: Limited coverage for accidents only",
            ],
          },
          {
            type: "list",
            content: "When you need life insurance:",
            items: [
              "You have dependents who rely on your income",
              "You have debts others would inherit",
              "You want to leave money for final expenses",
              "You have a mortgage or other major debts",
              "You want to leave a legacy or inheritance",
              "You have a business with partners",
            ],
          },
          {
            type: "example",
            content:
              "Sarah, 28, has a $200,000 mortgage and two young children. She buys a $500,000 20-year term policy for $25/month to ensure her family can pay off the house and maintain their lifestyle if something happens to her.",
          },
          {
            type: "list",
            content: "How much coverage do you need:",
            items: [
              "10-12 times annual income (rule of thumb)",
              "Debt replacement method: Cover all debts",
              "Income replacement: 5-10 years of income",
              "Needs analysis: Calculate specific family needs",
              "Consider inflation and future expenses",
              "Account for existing savings and other insurance",
            ],
          },
          {
            type: "list",
            content: "Term vs. permanent life insurance:",
            items: [
              "Term: Lower cost, temporary coverage, no cash value",
              "Permanent: Higher cost, lifelong coverage, builds cash value",
              "Term is usually better for young families",
              "Permanent may be useful for estate planning",
              "Most people need term insurance",
              "Buy term and invest the difference strategy",
            ],
          },
          {
            type: "tip",
            content:
              "For most young adults, term life insurance provides the most coverage for the lowest cost. Buy coverage when you're young and healthy for the best rates.",
          },
        ],
        keyTakeaways: [
          "Life insurance protects dependents from financial hardship",
          "Term insurance is usually the best choice for young adults",
          "Coverage amount should be 10-12 times annual income",
          "Buy coverage when you're young and healthy for better rates",
        ],
        quiz: {
          questions: [
            {
              question: "What type of life insurance is typically best for young adults with families?",
              options: ["Whole life", "Term life", "Universal life", "Variable life"],
              correctAnswer: "Term life",
              explanation: "Term life insurance provides the most coverage for the lowest cost, making it ideal for young adults who need maximum protection during their family-raising years.",
            },
          ],
        },
      },
      {
        title: "Health Insurance Basics",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Understanding Health Insurance Coverage",
          },
          {
            type: "paragraph",
            content:
              "Health insurance helps protect you from high medical costs and ensures access to healthcare. For young adults, understanding health insurance options and terminology is crucial for making informed coverage decisions.",
          },
          {
            type: "list",
            content: "Types of health insurance plans:",
            items: [
              "HMO (Health Maintenance Organization): Lower cost, network restrictions",
              "PPO (Preferred Provider Organization): More flexibility, higher cost",
              "EPO (Exclusive Provider Organization): Network-only, no referrals needed",
              "POS (Point of Service): Hybrid of HMO and PPO",
              "HDHP (High Deductible Health Plan): Lower premiums, higher deductibles",
              "Catastrophic plans: Very high deductibles, young adult option",
            ],
          },
          {
            type: "list",
            content: "Key health insurance terms:",
            items: [
              "Premium: Monthly cost for coverage",
              "Deductible: Amount you pay before insurance kicks in",
              "Copay: Fixed amount for specific services",
              "Coinsurance: Percentage you pay after deductible",
              "Out-of-pocket maximum: Most you'll pay in a year",
              "Network: Doctors and hospitals covered by your plan",
            ],
          },
          {
            type: "example",
            content:
              "Jake's plan has a $2,000 deductible and 20% coinsurance. For a $10,000 surgery, he pays the first $2,000, then 20% of the remaining $8,000 ($1,600), for a total of $3,600.",
          },
          {
            type: "list",
            content: "Where to get health insurance:",
            items: [
              "Employer-sponsored plans (most common)",
              "Healthcare.gov marketplace",
              "State insurance marketplaces",
              "Direct from insurance companies",
              "Short-term health plans (limited coverage)",
              "COBRA continuation coverage",
            ],
          },
          {
            type: "list",
            content: "Choosing the right plan:",
            items: [
              "Consider your health needs and medications",
              "Check if your doctors are in network",
              "Compare total costs (premiums + out-of-pocket)",
              "Look at prescription drug coverage",
              "Consider HSA eligibility if interested",
              "Review plan benefits and exclusions",
            ],
          },
          {
            type: "list",
            content: "Young adult health insurance options:",
            items: [
              "Stay on parent's plan until age 26",
              "Employer plan if available",
              "Marketplace plans with potential subsidies",
              "Catastrophic plans for basic coverage",
              "Short-term plans for gaps in coverage",
              "Medicaid if income-eligible",
            ],
          },
          {
            type: "tip",
            content:
              "Don't go without health insurance. Even young, healthy people can face unexpected medical emergencies that could result in tens of thousands in medical bills.",
          },
        ],
        keyTakeaways: [
          "Health insurance protects against high medical costs",
          "Understand key terms like deductible, copay, and coinsurance",
          "Compare total costs, not just monthly premiums",
          "Young adults have several coverage options available",
        ],
        quiz: {
          questions: [
            {
              question: "What is a deductible in health insurance?",
              options: [
                "Monthly payment for coverage",
                "Amount you pay before insurance starts covering costs",
                "Fixed fee for doctor visits",
                "Maximum you'll pay in a year",
              ],
              correctAnswer: "Amount you pay before insurance starts covering costs",
              explanation: "A deductible is the amount you must pay out-of-pocket for covered services before your insurance plan starts paying.",
            },
          ],
        },
      },
      {
        title: "Auto Insurance Essentials",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Protecting Yourself on the Road",
          },
          {
            type: "paragraph",
            content:
              "Auto insurance is required in most states and protects you financially from accidents, theft, and other vehicle-related incidents. Understanding coverage types and requirements helps you get adequate protection at a reasonable cost.",
          },
          {
            type: "list",
            content: "Required auto insurance coverage:",
            items: [
              "Liability coverage: Pays for damage you cause to others",
              "Bodily injury liability: Medical costs for injured parties",
              "Property damage liability: Repairs to other vehicles/property",
              "Uninsured/underinsured motorist: Protects from uninsured drivers",
              "Personal injury protection (PIP): Your medical expenses (some states)",
              "Minimum coverage varies by state",
            ],
          },
          {
            type: "list",
            content: "Optional auto insurance coverage:",
            items: [
              "Collision: Repairs to your car from accidents",
              "Comprehensive: Theft, vandalism, weather damage",
              "Gap insurance: Covers loan balance if car is totaled",
              "Rental car coverage: Temporary transportation",
              "Roadside assistance: Towing and emergency services",
              "New car replacement: Full value for new vehicles",
            ],
          },
          {
            type: "example",
            content:
              "Emma causes an accident with $50,000 in damages. Her liability coverage pays the other driver's costs, protecting her from having to pay out-of-pocket and potential lawsuits.",
          },
          {
            type: "list",
            content: "Factors affecting auto insurance rates:",
            items: [
              "Age and driving experience",
              "Driving record and claims history",
              "Vehicle type, age, and safety features",
              "Location and where car is parked",
              "Credit score (in most states)",
              "Annual mileage and usage",
            ],
          },
          {
            type: "list",
            content: "Ways to save on auto insurance:",
            items: [
              "Shop around and compare quotes annually",
              "Bundle with other insurance policies",
              "Maintain good driving record",
              "Take defensive driving courses",
              "Install safety and anti-theft devices",
              "Consider higher deductibles for lower premiums",
            ],
          },
          {
            type: "list",
            content: "Young driver considerations:",
            items: [
              "Rates are typically higher for drivers under 25",
              "Good student discounts available",
              "Consider staying on parent's policy if cheaper",
              "Avoid sports cars and high-performance vehicles",
              "Maintain continuous coverage to avoid penalties",
              "Build good driving record for future rate reductions",
            ],
          },
          {
            type: "tip",
            content:
              "Don't just buy minimum coverage to save money. Adequate liability coverage protects your assets from lawsuits. Consider at least $100,000/$300,000/$100,000 coverage limits.",
          },
        ],
        keyTakeaways: [
          "Auto insurance is required and protects from financial liability",
          "Liability coverage is most important for asset protection",
          "Young drivers face higher rates but can earn discounts",
          "Shop around annually for the best rates",
        ],
        quiz: {
          questions: [
            {
              question: "What does liability coverage in auto insurance protect?",
              options: [
                "Your car from damage",
                "You from damage caused to others",
                "Your medical expenses",
                "Your car from theft",
              ],
              correctAnswer: "You from damage caused to others",
              explanation: "Liability coverage protects you financially when you cause damage to other people or their property in an accident.",
            },
          ],
        },
      },
      {
        title: "Homeowner's and Renter's Insurance",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Protecting Your Home and Belongings",
          },
          {
            type: "paragraph",
            content:
              "Whether you own or rent your home, insurance protects your belongings and provides liability coverage. Understanding the differences between homeowner's and renter's insurance helps you get appropriate coverage for your situation.",
          },
          {
            type: "list",
            content: "Homeowner's insurance coverage:",
            items: [
              "Dwelling: Structure of your home",
              "Other structures: Garage, shed, fence",
              "Personal property: Belongings inside the home",
              "Loss of use: Temporary living expenses",
              "Personal liability: Legal responsibility for injuries",
              "Medical payments: Guest injuries regardless of fault",
            ],
          },
          {
            type: "list",
            content: "Renter's insurance coverage:",
            items: [
              "Personal property: Your belongings",
              "Personal liability: Legal responsibility",
              "Additional living expenses: Temporary housing costs",
              "Medical payments to others: Guest injuries",
              "Does NOT cover the building structure",
              "Much less expensive than homeowner's insurance",
            ],
          },
          {
            type: "example",
            content:
              "A fire damages Alex's apartment. His renter's insurance pays to replace his $15,000 worth of belongings and covers his hotel costs while the apartment is repaired. Without insurance, he'd pay everything out-of-pocket.",
          },
          {
            type: "list",
            content: "Common coverage exclusions:",
            items: [
              "Floods (requires separate flood insurance)",
              "Earthquakes (separate coverage needed)",
              "Normal wear and tear",
              "Intentional damage",
              "Business property (needs business insurance)",
              "High-value items may need additional coverage",
            ],
          },
          {
            type: "list",
            content: "How much coverage do you need:",
            items: [
              "Homeowners: Rebuild cost of home (not market value)",
              "Renters: Value of personal belongings",
              "Create home inventory with photos/videos",
              "Consider replacement cost vs. actual cash value",
              "Liability coverage: At least $300,000-$500,000",
              "Update coverage when you acquire expensive items",
            ],
          },
          {
            type: "list",
            content: "Ways to save on home insurance:",
            items: [
              "Bundle with auto insurance",
              "Install security and safety systems",
              "Maintain good credit score",
              "Choose higher deductibles",
              "Shop around annually",
              "Ask about available discounts",
            ],
          },
          {
            type: "tip",
            content:
              "Renter's insurance is very affordable (often $10-20/month) and provides valuable protection. Don't assume your landlord's insurance covers your belongings - it doesn't.",
          },
        ],
        keyTakeaways: [
          "Homeowner's insurance covers structure and belongings",
          "Renter's insurance covers belongings but not the building",
          "Both provide important liability protection",
          "Create a home inventory to document belongings",
        ],
        quiz: {
          questions: [
            {
              question: "What does renter's insurance typically NOT cover?",
              options: [
                "Your personal belongings",
                "The apartment building structure",
                "Personal liability",
                "Temporary living expenses",
              ],
              correctAnswer: "The apartment building structure",
              explanation: "Renter's insurance covers your belongings and liability but not the building structure, which is covered by the landlord's insurance.",
            },
          ],
        },
      },
      {
        title: "Disability Insurance",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Protecting Your Income",
          },
          {
            type: "paragraph",
            content:
              "Disability insurance replaces a portion of your income if you become unable to work due to illness or injury. For young adults, protecting your earning ability is often more important than life insurance since you're more likely to become disabled than die young.",
          },
          {
            type: "list",
            content: "Types of disability insurance:",
            items: [
              "Short-term disability: 3-12 months of coverage",
              "Long-term disability: Coverage until retirement age",
              "Group coverage: Through employer (often limited)",
              "Individual coverage: Purchased privately",
              "Social Security Disability: Government program (strict requirements)",
              "Workers' compensation: Work-related injuries only",
            ],
          },
          {
            type: "list",
            content: "Key disability insurance features:",
            items: [
              "Benefit amount: Typically 60-70% of income",
              "Benefit period: How long benefits are paid",
              "Elimination period: Waiting period before benefits start",
              "Own occupation vs. any occupation definitions",
              "Cost of living adjustments",
              "Partial/residual benefits for partial disabilities",
            ],
          },
          {
            type: "example",
            content:
              "Mark, a software developer, becomes unable to work due to a back injury. His individual disability policy pays 65% of his $80,000 salary ($52,000 annually) until he can return to work or reaches retirement age.",
          },
          {
            type: "list",
            content: "Why disability insurance matters:",
            items: [
              "1 in 4 workers will become disabled during their career",
              "Most disabilities are due to illness, not accidents",
              "Average disability lasts 2.5 years",
              "Social Security disability is difficult to qualify for",
              "Employer coverage may be insufficient",
              "Your earning ability is your most valuable asset",
            ],
          },
          {
            type: "list",
            content: "Factors affecting disability insurance cost:",
            items: [
              "Age and health at application",
              "Occupation and income level",
              "Benefit amount and period",
              "Elimination period length",
              "Policy features and riders",
              "Gender (women typically pay more)",
            ],
          },
          {
            type: "tip",
            content:
              "If your employer offers group disability insurance, review the coverage carefully. It may only cover 50-60% of income and may not be portable if you change jobs. Consider supplemental individual coverage.",
          },
        ],
        keyTakeaways: [
          "Disability insurance protects your most valuable asset - your income",
          "You're more likely to become disabled than die young",
          "Group coverage through employers may be insufficient",
          "Individual policies offer better protection and portability",
        ],
        quiz: {
          questions: [
            {
              question: "What percentage of workers will become disabled during their career?",
              options: ["1 in 10", "1 in 8", "1 in 4", "1 in 2"],
              correctAnswer: "1 in 4",
              explanation: "Statistics show that 1 in 4 workers will experience a disability that prevents them from working during their career, making disability insurance very important.",
            },
          ],
        },
      },
      {
        title: "Umbrella Insurance",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Extra Liability Protection",
          },
          {
            type: "paragraph",
            content:
              "Umbrella insurance provides additional liability coverage beyond your auto and homeowner's insurance limits. It's relatively inexpensive protection against large lawsuits that could threaten your assets and future earnings.",
          },
          {
            type: "list",
            content: "What umbrella insurance covers:",
            items: [
              "Liability claims exceeding other policy limits",
              "Personal injury claims (libel, slander, false imprisonment)",
              "Legal defense costs",
              "Worldwide coverage",
              "Coverage for family members in your household",
              "Some gaps in underlying coverage",
            ],
          },
          {
            type: "list",
            content: "When you might need umbrella insurance:",
            items: [
              "You have significant assets to protect",
              "You have high income or earning potential",
              "You own rental property",
              "You have teenage drivers",
              "You engage in activities with liability risk",
              "You want extra peace of mind",
            ],
          },
          {
            type: "example",
            content:
              "Sarah causes a serious car accident with $800,000 in damages. Her auto insurance covers $300,000, but her $1 million umbrella policy covers the remaining $500,000, protecting her assets from a lawsuit.",
          },
          {
            type: "list",
            content: "Umbrella insurance requirements:",
            items: [
              "Must have underlying auto and home insurance",
              "Minimum liability limits required on underlying policies",
              "Typically $250,000/$500,000 auto liability minimum",
              "Usually $300,000 homeowner's liability minimum",
              "Coverage starts where underlying policies end",
              "Available in $1 million increments",
            ],
          },
          {
            type: "list",
            content: "Cost and benefits:",
            items: [
              "Relatively inexpensive ($200-400 annually for $1M)",
              "Covers legal defense costs",
              "Protects current and future assets",
              "Provides peace of mind",
              "May cover claims not covered by other policies",
              "Worldwide coverage included",
            ],
          },
          {
            type: "list",
            content: "What umbrella insurance doesn't cover:",
            items: [
              "Intentional criminal acts",
              "Business or professional liability",
              "Property damage to your own property",
              "Workers' compensation claims",
              "Contractual liability",
              "War or nuclear hazard",
            ],
          },
          {
            type: "tip",
            content:
              "Consider umbrella insurance if your net worth exceeds your liability coverage limits or if you have high earning potential. It's inexpensive protection against potentially devastating lawsuits.",
          },
        ],
        keyTakeaways: [
          "Umbrella insurance provides extra liability protection",
          "Relatively inexpensive for the coverage amount",
          "Protects assets and future earnings from lawsuits",
          "Requires underlying auto and home insurance",
        ],
        quiz: {
          questions: [
            {
              question: "When does umbrella insurance coverage typically begin?",
              options: [
                "Immediately when you buy it",
                "When underlying policy limits are exceeded",
                "Only for certain types of claims",
                "After a waiting period",
              ],
              correctAnswer: "When underlying policy limits are exceeded",
              explanation: "Umbrella insurance is excess coverage that begins when the liability limits of your underlying auto or homeowner's insurance are exceeded.",
            },
          ],
        },
      },
      {
        title: "Insurance Shopping and Comparison",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Finding the Best Insurance Deals",
          },
          {
            type: "paragraph",
            content:
              "Shopping for insurance requires comparing coverage, costs, and company reliability. Understanding how to evaluate insurance options helps you get the best protection for your money while avoiding inadequate coverage.",
          },
          {
            type: "list",
            content: "Steps to shop for insurance:",
            items: [
              "Determine your coverage needs",
              "Get quotes from multiple companies",
              "Compare coverage details, not just prices",
              "Check company financial ratings",
              "Read customer reviews and complaints",
              "Consider bundling discounts",
            ],
          },
          {
            type: "list",
            content: "Where to get insurance quotes:",
            items: [
              "Direct from insurance companies",
              "Independent insurance agents",
              "Online comparison websites",
              "Captive agents (represent one company)",
              "Employer group plans",
              "Professional association group plans",
            ],
          },
          {
            type: "example",
            content:
              "Lisa gets auto insurance quotes from 5 companies ranging from $800-1,400 annually. She chooses the $1,000 option because it offers better coverage and has excellent customer service ratings, not just the cheapest price.",
          },
          {
            type: "list",
            content: "Factors to compare beyond price:",
            items: [
              "Coverage limits and deductibles",
              "Policy exclusions and limitations",
              "Claims handling reputation",
              "Customer service quality",
              "Financial strength ratings",
              "Available discounts and features",
            ],
          },
          {
            type: "list",
            content: "Red flags to avoid:",
            items: [
              "Prices significantly below market rates",
              "High-pressure sales tactics",
              "Companies with poor financial ratings",
              "Policies with major coverage gaps",
              "Agents who won't explain policy details",
              "Companies with many customer complaints",
            ],
          },
          {
            type: "list",
            content: "Money-saving strategies:",
            items: [
              "Bundle multiple policies with one company",
              "Maintain good credit scores",
              "Take advantage of available discounts",
              "Consider higher deductibles for lower premiums",
              "Review coverage annually",
              "Maintain continuous coverage",
            ],
          },
          {
            type: "tip",
            content:
              "Don't just buy the cheapest insurance. Focus on value - adequate coverage from a financially stable company with good customer service. The cheapest policy won't help if claims aren't paid properly.",
          },
        ],
        keyTakeaways: [
          "Compare coverage details, not just prices",
          "Check company financial ratings and customer reviews",
          "Consider bundling policies for discounts",
          "Avoid companies with poor claims handling reputations",
        ],
        quiz: {
          questions: [
            {
              question: "What's most important when comparing insurance policies?",
              options: [
                "Finding the lowest price",
                "Comparing coverage details and company reliability",
                "Choosing the most expensive option",
                "Buying from the biggest company",
              ],
              correctAnswer: "Comparing coverage details and company reliability",
              explanation: "While price matters, comparing coverage details and company reliability ensures you get adequate protection from a company that will pay claims when needed.",
            },
          ],
        },
      },
    ],
    "bill-negotiation": [
      {
        title: "Understanding Your Bills",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Know What You're Paying For",
          },
          {
            type: "paragraph",
            content:
              "Before you can negotiate your bills, you need to understand what you're paying for and identify opportunities for savings. Many people pay bills without reviewing them, missing errors and unnecessary charges.",
          },
          {
            type: "list",
            content: "Bills you can typically negotiate:",
            items: [
              "Cable and internet services",
              "Cell phone plans",
              "Insurance premiums",
              "Credit card interest rates and fees",
              "Medical bills and payment plans",
              "Subscription services",
            ],
          },
          {
            type: "list",
            content: "How to analyze your bills:",
            items: [
              "Review each line item carefully",
              "Identify services you don't use or need",
              "Compare your rates to current market prices",
              "Look for promotional rates that have expired",
              "Check for billing errors or duplicate charges",
              "Calculate your total annual cost for each service",
            ],
          },
          {
            type: "example",
            content:
              "Mike reviews his cable bill and discovers he's paying $15/month for premium channels he never watches and $10/month for a landline he doesn't use. That's $300 annually in unnecessary charges.",
          },
          {
            type: "list",
            content: "Common bill padding tactics:",
            items: [
              "Automatic upgrades to premium services",
              "Equipment rental fees for outdated devices",
              "Service protection plans you don't need",
              "Convenience fees for online payments",
              "Paper statement fees",
              "Early termination fees that may no longer apply",
            ],
          },
          {
            type: "list",
            content: "Research before negotiating:",
            items: [
              "Current promotional rates from competitors",
              "Your payment history and customer status",
              "Market rates for similar services",
              "Your contract terms and renewal dates",
              "Available discounts (student, senior, military)",
              "Bundle options that might save money",
            ],
          },
          {
            type: "tip",
            content:
              "Set aside time monthly to review all your bills. Look for changes, errors, and opportunities to save. Many companies count on customers not paying attention to their bills.",
          },
        ],
        keyTakeaways: [
          "Review bills carefully for errors and unnecessary charges",
          "Research current market rates before negotiating",
          "Identify services you don't use or need",
          "Understand your contract terms and customer status",
        ],
        quiz: {
          questions: [
            {
              question: "What should you do before negotiating your bills?",
              options: [
                "Call immediately to complain",
                "Research current market rates and analyze your bills",
                "Threaten to cancel service",
                "Wait for bills to increase",
              ],
              correctAnswer: "Research current market rates and analyze your bills",
              explanation: "Understanding what you're paying for and knowing current market rates gives you leverage and specific talking points when negotiating.",
            },
          ],
        },
      },
      {
        title: "Negotiation Strategies and Tactics",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "How to Negotiate Effectively",
          },
          {
            type: "paragraph",
            content:
              "Successful bill negotiation requires preparation, patience, and the right approach. Understanding negotiation tactics and having a clear strategy increases your chances of getting better rates and terms.",
          },
          {
            type: "list",
            content: "Preparation for negotiation:",
            items: [
              "Gather your account information and payment history",
              "Research competitor rates and promotions",
              "Know your contract terms and renewal dates",
              "Identify your ideal outcome and minimum acceptable result",
              "Have alternative options ready",
              "Choose the right time to call (avoid peak hours)",
            ],
          },
          {
            type: "list",
            content: "Effective negotiation tactics:",
            items: [
              "Be polite but persistent",
              "Ask to speak with the retention department",
              "Mention competitor offers specifically",
              "Emphasize your loyalty and payment history",
              "Be willing to walk away if necessary",
              "Ask 'What can you do to help me?'",
            ],
          },
          {
            type: "example",
            content:
              "Sarah calls her internet provider: 'I've been a customer for 3 years with perfect payment history. I see new customers get internet for $39/month, but I'm paying $79. Can you match that rate to keep me as a customer?'",
          },
          {
            type: "list",
            content: "What to say during negotiations:",
            items: [
              "'I'm reviewing my expenses and considering my options'",
              "'I've been a loyal customer for X years'",
              "'I see you're offering new customers...'",
              "'What promotions do you have available?'",
              "'I'd prefer to stay, but I need a better rate'",
              "'Can you do better than that?'",
            ],
          },
          {
            type: "list",
            content: "When to escalate:",
            items: [
              "First representative can't help",
              "You're not getting reasonable offers",
              "You need to speak with someone with more authority",
              "Ask for supervisor or retention specialist",
              "Be prepared to explain your situation again",
              "Stay calm and professional throughout",
            ],
          },
          {
            type: "list",
            content: "Common negotiation outcomes:",
            items: [
              "Reduced monthly rates for 6-12 months",
              "Waived fees or equipment charges",
              "Free upgrades or additional services",
              "Better contract terms",
              "Payment plan arrangements",
              "Loyalty discounts for long-term customers",
            ],
          },
          {
            type: "tip",
            content:
              "The retention department has more authority to offer discounts than regular customer service. Always ask to be transferred to 'customer retention' or say you're 'considering canceling your service.'",
          },
        ],
        keyTakeaways: [
          "Preparation and research are key to successful negotiation",
          "Be polite but persistent in your approach",
          "Ask for the retention department for better offers",
          "Be willing to walk away if you don't get a fair deal",
        ],
        quiz: {
          questions: [
            {
              question: "Which department typically has the most authority to offer discounts?",
              options: [
                "Customer service",
                "Billing department",
                "Retention department",
                "Technical support",
              ],
              correctAnswer: "Retention department",
              explanation: "The retention department is specifically tasked with keeping customers from canceling, so they have more authority to offer discounts and special deals.",
            },
          ],
        },
      },
      {
        title: "Negotiating Specific Services",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Service-Specific Negotiation Tips",
          },
          {
            type: "paragraph",
            content:
              "Different types of services require different negotiation approaches. Understanding the specific tactics that work best for each type of bill helps you achieve better results and save more money.",
          },
          {
            type: "list",
            content: "Cable and Internet negotiation:",
            items: [
              "Call when your promotional rate expires",
              "Ask about current new customer promotions",
              "Consider downgrading to a lower tier",
              "Bundle services only if you'll use them all",
              "Negotiate equipment rental fees",
              "Be prepared to actually cancel if needed",
            ],
          },
          {
            type: "list",
            content: "Cell phone plan negotiation:",
            items: [
              "Review your data usage patterns",
              "Ask about loyalty discounts",
              "Consider switching to a prepaid plan",
              "Negotiate device payment plans",
              "Look for employer or student discounts",
              "Time negotiations around contract renewals",
            ],
          },
          {
            type: "example",
            content:
              "Tom's cable promotional rate expired, increasing his bill from $49 to $89. He called retention, mentioned a competitor's $45 offer, and got a new 12-month promotion at $52/month, saving $444 annually.",
          },
          {
            type: "list",
            content: "Insurance premium negotiation:",
            items: [
              "Shop around and get competing quotes first",
              "Ask about available discounts you might qualify for",
              "Consider raising deductibles to lower premiums",
              "Bundle policies for multi-policy discounts",
              "Maintain good credit and driving records",
              "Review coverage annually and adjust as needed",
            ],
          },
          {
            type: "list",
            content: "Credit card negotiation:",
            items: [
              "Focus on interest rates and fees",
              "Emphasize your payment history",
              "Mention better offers from other cards",
              "Ask for annual fee waivers",
              "Request credit limit increases",
              "Negotiate payment plans if you're struggling",
            ],
          },
          {
            type: "list",
            content: "Medical bill negotiation:",
            items: [
              "Ask for itemized bills to check for errors",
              "Request financial hardship discounts",
              "Negotiate payment plans with no interest",
              "Ask about prompt payment discounts",
              "Consider hiring a medical billing advocate",
              "Don't ignore bills - communicate with providers",
            ],
          },
          {
            type: "tip",
            content:
              "For subscription services, try the 'cancel and wait' strategy. Cancel your subscription and wait for the company to offer you a discount to come back. Many will email special offers within days.",
          },
        ],
        keyTakeaways: [
          "Different services require different negotiation approaches",
          "Timing your negotiations around contract renewals is important",
          "Always have competing offers ready as leverage",
          "Medical bills often have the most negotiation flexibility",
        ],
        quiz: {
          questions: [
            {
              question: "When is the best time to negotiate your cable bill?",
              options: [
                "When you first sign up",
                "When your promotional rate expires",
                "During peak season",
                "Never - rates are fixed",
              ],
              correctAnswer: "When your promotional rate expires",
              explanation: "When promotional rates expire and your bill increases, companies are most motivated to offer new deals to prevent you from canceling.",
            },
          ],
        },
      },
      {
        title: "Alternative Service Options",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Exploring Cheaper Alternatives",
          },
          {
            type: "paragraph",
            content:
              "Sometimes the best way to lower your bills is to switch to alternative services or providers. Understanding your options gives you leverage in negotiations and may lead to significant savings.",
          },
          {
            type: "list",
            content: "Cable TV alternatives:",
            items: [
              "Streaming services (Netflix, Hulu, Amazon Prime)",
              "Live TV streaming (YouTube TV, Sling TV, Hulu Live)",
              "Over-the-air antenna for local channels",
              "Free streaming services (Tubi, Crackle, Pluto TV)",
              "Library DVD collections",
              "Sharing streaming accounts with family (where allowed)",
            ],
          },
          {
            type: "list",
            content: "Internet service alternatives:",
            items: [
              "Municipal broadband (if available)",
              "Fixed wireless internet",
              "Satellite internet (Starlink, HughesNet)",
              "Mobile hotspot plans",
              "Fiber optic providers",
              "Internet-only plans (no cable bundle)",
            ],
          },
          {
            type: "example",
            content:
              "Lisa cuts her $120 cable bill by switching to a $50 internet-only plan plus $30 in streaming services, saving $40/month ($480 annually) while getting more content she actually watches.",
          },
          {
            type: "list",
            content: "Cell phone alternatives:",
            items: [
              "Prepaid plans from major carriers",
              "Mobile Virtual Network Operators (MVNOs)",
              "Family plans to share costs",
              "Wi-Fi calling to reduce minutes needed",
              "Older phone models to reduce device costs",
              "Employer-provided phones for business use",
            ],
          },
          {
            type: "list",
            content: "Insurance alternatives:",
            items: [
              "Credit unions for auto and home insurance",
              "Direct writers (GEICO, Progressive)",
              "Regional insurance companies",
              "Professional association group plans",
              "Higher deductibles for lower premiums",
              "Usage-based auto insurance programs",
            ],
          },
          {
            type: "list",
            content: "Subscription service alternatives:",
            items: [
              "Free versions with ads",
              "Annual plans instead of monthly",
              "Student or family discounts",
              "Rotating subscriptions (cancel and resubscribe)",
              "Free alternatives (Spotify free vs. premium)",
              "Library access to magazines and digital content",
            ],
          },
          {
            type: "tip",
            content:
              "Calculate the true cost of bundles. Companies often make bundles seem cheaper, but you might save more by choosing only the services you actually need from different providers.",
          },
        ],
        keyTakeaways: [
          "Alternative services can provide significant savings",
          "Streaming services often cost less than traditional cable",
          "Prepaid and MVNO cell plans offer good value",
          "Don't pay for services you don't actually use",
        ],
        quiz: {
          questions: [
            {
              question: "What is an MVNO in cell phone service?",
              options: [
                "A major carrier like Verizon",
                "A Mobile Virtual Network Operator that uses major carrier networks",
                "A type of phone",
                "A government program",
              ],
              correctAnswer: "A Mobile Virtual Network Operator that uses major carrier networks",
              explanation: "MVNOs like Mint Mobile and Cricket use major carrier networks but offer service at lower prices with fewer frills.",
            },
          ],
        },
      },
      {
        title: "Timing Your Negotiations",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "When to Negotiate for Best Results",
          },
          {
            type: "paragraph",
            content:
              "Timing can significantly impact your negotiation success. Understanding when companies are most motivated to offer deals and when you have the most leverage helps you achieve better results.",
          },
          {
            type: "list",
            content: "Best times to negotiate:",
            items: [
              "End of the month/quarter (sales quotas)",
              "When promotional rates expire",
              "Before contract renewal dates",
              "After receiving a rate increase notice",
              "During slow business periods",
              "When competitors launch new promotions",
            ],
          },
          {
            type: "list",
            content: "Worst times to negotiate:",
            items: [
              "During peak customer service hours",
              "Right after signing a new contract",
              "During major outages or service issues",
              "Holiday periods when staff is limited",
              "When you're behind on payments",
              "During company busy seasons",
            ],
          },
          {
            type: "example",
            content:
              "David waits until the last day of the month to call his internet provider. The sales rep, trying to meet monthly quotas, offers him a better deal than he expected, saving him $25/month.",
          },
          {
            type: "list",
            content: "Contract timing considerations:",
            items: [
              "Review contracts 30-60 days before expiration",
              "Avoid automatic renewals if possible",
              "Negotiate during the renewal window",
              "Consider month-to-month options for flexibility",
              "Mark calendar reminders for important dates",
              "Read early termination fee policies",
            ],
          },
          {
            type: "list",
            content: "Seasonal negotiation opportunities:",
            items: [
              "Back-to-school promotions (August-September)",
              "New Year deals (January)",
              "Spring cleaning season (March-April)",
              "Black Friday/holiday promotions",
              "Tax season (people reviewing expenses)",
              "Summer moving season (May-August)",
            ],
          },
          {
            type: "list",
            content: "Personal timing factors:",
            items: [
              "When you have time to research alternatives",
              "Before major life changes (moving, job change)",
              "When you're current on all payments",
              "After improving your credit score",
              "When you can afford to switch if needed",
              "During calm, non-stressful periods",
            ],
          },
          {
            type: "tip",
            content:
              "Set calendar reminders 60 days before your contracts expire. This gives you time to research alternatives and negotiate without being rushed into automatic renewals.",
          },
        ],
        keyTakeaways: [
          "End of month/quarter timing can work in your favor",
          "Avoid negotiating during peak hours or busy periods",
          "Plan negotiations around contract renewal dates",
          "Personal timing matters - negotiate when you're prepared",
        ],
        quiz: {
          questions: [
            {
              question: "When might sales representatives be most motivated to offer deals?",
              options: [
                "Beginning of the month",
                "End of the month when trying to meet quotas",
                "During lunch hours",
                "On weekends",
              ],
              correctAnswer: "End of the month when trying to meet quotas",
              explanation: "Sales representatives often have monthly quotas and may be more willing to offer deals at the end of the month to meet their targets.",
            },
          ],
        },
      },
      {
        title: "Tracking Your Savings",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Measuring Your Success",
          },
          {
            type: "paragraph",
            content:
              "Tracking your bill negotiation savings helps you see the impact of your efforts and motivates you to continue finding ways to reduce expenses. It also helps you identify which strategies work best.",
          },
          {
            type: "list",
            content: "What to track:",
            items: [
              "Before and after monthly costs",
              "Annual savings calculations",
              "Time spent on negotiations",
              "Success rate by service type",
              "Promotional period end dates",
              "Next negotiation opportunities",
            ],
          },
          {
            type: "list",
            content: "Tracking methods:",
            items: [
              "Simple spreadsheet with before/after costs",
              "Budgeting apps that track expenses",
              "Calendar reminders for promotional expirations",
              "Photo documentation of old vs. new bills",
              "Notes about successful negotiation tactics",
              "List of contact numbers and best representatives",
            ],
          },
          {
            type: "example",
            content:
              "Over one year, Emma negotiated her cable bill (saved $300), cell phone (saved $180), and car insurance (saved $240), totaling $720 in annual savings - enough for a nice vacation!",
          },
          {
            type: "list",
            content: "Calculating your savings:",
            items: [
              "Monthly savings × 12 = annual savings",
              "Include one-time fee waivers",
              "Factor in promotional period lengths",
              "Consider value of upgraded services at same price",
              "Track cumulative savings over time",
              "Calculate return on time invested",
            ],
          },
          {
            type: "list",
            content: "Using savings effectively:",
            items: [
              "Put savings into emergency fund",
              "Apply to debt payoff",
              "Invest in retirement accounts",
              "Save for specific goals",
              "Don't let lifestyle inflation eat the savings",
              "Celebrate your success appropriately",
            ],
          },
          {
            type: "list",
            content: "Staying motivated:",
            items: [
              "Set annual savings goals",
              "Share successes with friends/family",
              "Reinvest time saved into more negotiations",
              "Track cumulative lifetime savings",
              "Focus on the purchasing power gained",
              "Remember that small savings add up",
            ],
          },
          {
            type: "tip",
            content:
              "Set up automatic transfers to move your monthly savings into a separate account immediately. This prevents lifestyle inflation and helps you see the real impact of your negotiation efforts.",
          },
        ],
        keyTakeaways: [
          "Track both monthly and annual savings from negotiations",
          "Document successful tactics for future use",
          "Put savings to work in emergency funds or investments",
          "Set calendar reminders for when promotions expire",
        ],
        quiz: {
          questions: [
            {
              question: "What's the best way to ensure your bill negotiation savings benefit you long-term?",
              options: [
                "Spend the savings on entertainment",
                "Put savings into emergency fund or investments",
                "Upgrade to more expensive services",
                "Ignore the savings amount",
              ],
              correctAnswer: "Put savings into emergency fund or investments",
              explanation: "Directing your savings into emergency funds or investments prevents lifestyle inflation and helps the savings compound over time.",
            },
          ],
        },
      },
    ],
    "investing": [
      {
        title: "Investment Fundamentals",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Understanding Risk and Return",
          },
          {
            type: "paragraph",
            content:
              "Investing is the process of putting money to work to generate returns over time. Understanding the fundamental relationship between risk and return is crucial for making informed investment decisions and building long-term wealth.",
          },
          {
            type: "list",
            content: "Key investment concepts:",
            items: [
              "Risk: The possibility of losing money or not meeting expectations",
              "Return: The profit or loss from an investment",
              "Liquidity: How easily you can convert investments to cash",
              "Volatility: How much investment values fluctuate",
              "Time horizon: How long you plan to hold investments",
              "Diversification: Spreading risk across different investments",
            ],
          },
          {
            type: "list",
            content: "Risk-return relationship:",
            items: [
              "Higher potential returns typically come with higher risk",
              "Lower risk investments usually offer lower returns",
              "Risk tolerance varies by individual",
              "Time can help smooth out short-term volatility",
              "Diversification can reduce risk without sacrificing returns",
              "No investment is completely risk-free",
            ],
          },
          {
            type: "example",
            content:
              "Sarah invests $10,000 in a diversified stock portfolio. Over 10 years, it might average 8% returns but could lose 20% in bad years and gain 25% in good years. A savings account offers 2% with no volatility.",
          },
          {
            type: "list",
            content: "Types of investment risk:",
            items: [
              "Market risk: Overall market declines",
              "Inflation risk: Purchasing power erosion",
              "Interest rate risk: Bond values affected by rate changes",
              "Company risk: Individual business problems",
              "Liquidity risk: Difficulty selling investments",
              "Currency risk: Foreign exchange fluctuations",
            ],
          },
          {
            type: "list",
            content: "Investment time horizons:",
            items: [
              "Short-term (1-3 years): Conservative, liquid investments",
              "Medium-term (3-10 years): Moderate risk tolerance",
              "Long-term (10+ years): Can accept higher volatility for growth",
              "Retirement planning: Very long-term perspective",
              "Emergency funds: Immediate liquidity needed",
              "Goal-based investing: Match timeline to investment choice",
            ],
          },
          {
            type: "tip",
            content:
              "Start investing early, even with small amounts. Time is your greatest asset in investing due to compound growth. A 25-year-old investing $200/month will have more at retirement than a 35-year-old investing $400/month.",
          },
        ],
        keyTakeaways: [
          "Higher returns typically come with higher risk",
          "Time horizon affects appropriate risk level",
          "Diversification helps manage risk",
          "Starting early maximizes compound growth benefits",
        ],
        quiz: {
          questions: [
            {
              question: "What is the relationship between risk and return in investing?",
              options: [
                "Higher risk always means higher returns",
                "Lower risk always means higher returns",
                "Higher potential returns typically come with higher risk",
                "Risk and return are unrelated",
              ],
              correctAnswer: "Higher potential returns typically come with higher risk",
              explanation: "In general, investments with higher potential returns also carry higher risk, though higher risk doesn't guarantee higher returns.",
            },
          ],
        },
      },
      {
        title: "Understanding Index Funds",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "The Power of Passive Investing",
          },
          {
            type: "paragraph",
            content:
              "Index funds are investment funds that track a specific market index, like the S&P 500. They offer broad diversification, low costs, and historically strong performance, making them ideal for beginning investors and long-term wealth building.",
          },
          {
            type: "list",
            content: "What are index funds:",
            items: [
              "Funds that track a specific market index",
              "Own hundreds or thousands of stocks automatically",
              "Passively managed (no stock picking)",
              "Low expense ratios (typically 0.03-0.20%)",
              "Available as mutual funds or ETFs",
              "Provide instant diversification",
            ],
          },
          {
            type: "list",
            content: "Popular index fund types:",
            items: [
              "S&P 500: 500 largest US companies",
              "Total Stock Market: Entire US stock market",
              "International: Foreign developed markets",
              "Emerging Markets: Developing countries",
              "Bond Index: Government and corporate bonds",
              "Target Date: Age-appropriate mix that adjusts over time",
            ],
          },
          {
            type: "example",
            content:
              "Mike invests $5,000 in an S&P 500 index fund. He instantly owns tiny pieces of 500 companies including Apple, Microsoft, and Amazon, with an expense ratio of just 0.04% annually ($2 per year).",
          },
          {
            type: "list",
            content: "Benefits of index funds:",
            items: [
              "Low costs increase your returns",
              "Broad diversification reduces risk",
              "No need to pick individual stocks",
              "Historically outperform most active funds",
              "Simple and easy to understand",
              "Tax-efficient due to low turnover",
            ],
          },
          {
            type: "list",
            content: "Index fund vs. active fund comparison:",
            items: [
              "Index funds: Track market, low fees, consistent performance",
              "Active funds: Try to beat market, high fees, inconsistent results",
              "85% of active funds underperform index funds over 15 years",
              "Higher fees in active funds compound over time",
              "Index funds remove manager risk",
              "Active funds may have style drift",
            ],
          },
          {
            type: "list",
            content: "How to invest in index funds:",
            items: [
              "Through brokerage accounts (Vanguard, Fidelity, Schwab)",
              "In 401(k) or IRA retirement accounts",
              "Direct from fund companies",
              "Through robo-advisors",
              "As ETFs on stock exchanges",
              "Set up automatic investing for consistency",
            ],
          },
          {
            type: "tip",
            content:
              "Focus on total stock market or S&P 500 index funds for your core holdings. These provide broad diversification and have the lowest costs. You can add international and bond funds as you learn more.",
          },
        ],
        keyTakeaways: [
          "Index funds provide broad diversification at low cost",
          "They historically outperform most actively managed funds",
          "Perfect for beginning investors and long-term wealth building",
          "Focus on low expense ratios and broad market exposure",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main advantage of index funds over actively managed funds?",
              options: [
                "They always have higher returns",
                "They have lower costs and historically outperform most active funds",
                "They're more exciting to own",
                "They only invest in technology stocks",
              ],
              correctAnswer: "They have lower costs and historically outperform most active funds",
              explanation: "Index funds have much lower expense ratios than active funds and historically outperform about 85% of actively managed funds over long periods.",
            },
          ],
        },
      },
      {
        title: "Dollar-Cost Averaging",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Investing Consistently Over Time",
          },
          {
            type: "paragraph",
            content:
              "Dollar-cost averaging is an investment strategy where you invest a fixed amount of money at regular intervals, regardless of market conditions. This approach helps reduce the impact of market volatility and removes emotion from investment decisions.",
          },
          {
            type: "list",
            content: "How dollar-cost averaging works:",
            items: [
              "Invest the same amount regularly (monthly, bi-weekly)",
              "Buy more shares when prices are low",
              "Buy fewer shares when prices are high",
              "Average cost per share smooths out over time",
              "Removes timing decisions from investing",
              "Works automatically through payroll deductions",
            ],
          },
          {
            type: "list",
            content: "Benefits of dollar-cost averaging:",
            items: [
              "Reduces impact of market volatility",
              "Removes emotion from investment decisions",
              "Makes investing automatic and consistent",
              "Doesn't require market timing skills",
              "Builds discipline and good habits",
              "Works well with index funds",
            ],
          },
          {
            type: "example",
            content:
              "Lisa invests $500 monthly in an index fund. When shares cost $50, she buys 10 shares. When they drop to $25, she buys 20 shares. Her average cost is $33.33 per share, better than the $37.50 average price.",
          },
          {
            type: "list",
            content: "Dollar-cost averaging scenarios:",
            items: [
              "Rising markets: You buy fewer shares as prices increase",
              "Falling markets: You buy more shares at lower prices",
              "Volatile markets: Smooths out the ups and downs",
              "Sideways markets: Accumulates shares at consistent prices",
              "Long-term: Benefits from overall market growth",
              "Retirement accounts: Perfect for 401(k) contributions",
            ],
          },
          {
            type: "list",
            content: "When dollar-cost averaging works best:",
            items: [
              "Long-term investment horizons (5+ years)",
              "Volatile or uncertain markets",
              "When you have regular income to invest",
              "For beginning investors learning discipline",
              "In tax-advantaged retirement accounts",
              "With broad market index funds",
            ],
          },
          {
            type: "list",
            content: "Potential drawbacks:",
            items: [
              "May underperform lump-sum investing in rising markets",
              "Requires discipline to continue during downturns",
              "Transaction costs can add up with frequent small purchases",
              "May delay full market participation",
              "Doesn't guarantee profits or prevent losses",
              "Less optimal than perfect market timing (impossible to achieve)",
            ],
          },
          {
            type: "tip",
            content:
              "Set up automatic investments from your checking account to your investment account. This makes dollar-cost averaging effortless and ensures you invest consistently regardless of market conditions or your emotions.",
          },
        ],
        keyTakeaways: [
          "Dollar-cost averaging reduces the impact of market volatility",
          "Investing regularly removes emotion and timing from decisions",
          "Works best for long-term investors with regular income",
          "Automation makes the strategy effortless to maintain",
        ],
        quiz: {
          questions: [
            {
              question: "What happens when you use dollar-cost averaging and stock prices fall?",
              options: [
                "You lose money immediately",
                "You buy more shares for the same dollar amount",
                "You should stop investing",
                "You buy fewer shares",
              ],
              correctAnswer: "You buy more shares for the same dollar amount",
              explanation: "When prices fall, your fixed dollar amount buys more shares, which can lower your average cost per share over time.",
            },
          ],
        },
      },
      {
        title: "Asset Allocation and Diversification",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Building a Balanced Portfolio",
          },
          {
            type: "paragraph",
            content:
              "Asset allocation is how you divide your investments among different asset classes like stocks, bonds, and cash. Proper diversification across and within asset classes helps manage risk while pursuing returns appropriate for your goals and timeline.",
          },
          {
            type: "list",
            content: "Major asset classes:",
            items: [
              "Stocks (equities): Ownership in companies, higher growth potential",
              "Bonds (fixed income): Loans to companies/governments, more stable",
              "Cash equivalents: Savings accounts, CDs, money market funds",
              "Real estate: Property investments, REITs",
              "Commodities: Gold, oil, agricultural products",
              "International: Foreign stocks and bonds",
            ],
          },
          {
            type: "list",
            content: "Age-based allocation guidelines:",
            items: [
              "20s-30s: 80-90% stocks, 10-20% bonds (aggressive growth)",
              "40s: 70-80% stocks, 20-30% bonds (moderate growth)",
              "50s: 60-70% stocks, 30-40% bonds (balanced)",
              "60s+: 40-60% stocks, 40-60% bonds (conservative)",
              "Rule of thumb: 100 minus your age = stock percentage",
              "Adjust based on risk tolerance and goals",
            ],
          },
          {
            type: "example",
            content:
              "At age 30, Tom allocates his portfolio: 70% US stocks, 20% international stocks, 10% bonds. This gives him growth potential while starting to add stability as he approaches middle age.",
          },
          {
            type: "list",
            content: "Types of diversification:",
            items: [
              "Asset class: Stocks, bonds, real estate",
              "Geographic: US, international, emerging markets",
              "Sector: Technology, healthcare, finance, etc.",
              "Company size: Large-cap, mid-cap, small-cap",
              "Style: Growth vs. value stocks",
              "Time: Dollar-cost averaging over time",
            ],
          },
          {
            type: "list",
            content: "Benefits of diversification:",
            items: [
              "Reduces portfolio volatility",
              "Protects against single investment failures",
              "Smooths returns over time",
              "Allows participation in different market segments",
              "Reduces emotional investing decisions",
              "Improves risk-adjusted returns",
            ],
          },
          {
            type: "list",
            content: "Simple portfolio examples:",
            items: [
              "Three-fund portfolio: US stocks, international stocks, bonds",
              "Target-date fund: Automatically adjusts allocation over time",
              "Two-fund portfolio: Total stock market, total bond market",
              "Four-fund portfolio: Add emerging markets and REITs",
              "Lazy portfolios: Simple, low-maintenance allocations",
              "Robo-advisor portfolios: Algorithm-based diversification",
            ],
          },
          {
            type: "tip",
            content:
              "Start simple with a target-date fund or three-fund portfolio. These provide excellent diversification without complexity. You can always add more sophistication as you learn and your portfolio grows.",
          },
        ],
        keyTakeaways: [
          "Asset allocation should match your age and risk tolerance",
          "Diversification reduces risk without sacrificing returns",
          "Simple portfolios often work as well as complex ones",
          "Rebalance periodically to maintain target allocations",
        ],
        quiz: {
          questions: [
            {
              question: "According to the rule of thumb, what percentage of stocks should a 30-year-old have?",
              options: ["30%", "50%", "70%", "90%"],
              correctAnswer: "70%",
              explanation: "The rule of thumb suggests 100 minus your age in stocks, so a 30-year-old would have 70% stocks and 30% bonds.",
            },
          ],
        },
      },
      {
        title: "Rebalancing Your Portfolio",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Maintaining Your Target Allocation",
          },
          {
            type: "paragraph",
            content:
              "Rebalancing is the process of adjusting your portfolio back to your target asset allocation. Over time, different investments perform differently, causing your allocation to drift from your intended mix. Regular rebalancing helps maintain your desired risk level.",
          },
          {
            type: "list",
            content: "Why portfolios drift:",
            items: [
              "Different asset classes perform differently over time",
              "Stocks might outperform bonds, increasing stock allocation",
              "Some sectors or regions may outperform others",
              "Without rebalancing, portfolio becomes riskier or more conservative",
              "Market volatility causes constant allocation changes",
              "New contributions may not maintain target ratios",
            ],
          },
          {
            type: "list",
            content: "When to rebalance:",
            items: [
              "Calendar-based: Quarterly, semi-annually, or annually",
              "Threshold-based: When allocation drifts 5-10% from target",
              "Combination approach: Check quarterly, rebalance if needed",
              "Life event-based: Job change, marriage, approaching retirement",
              "Market event-based: After major market movements",
              "When making new contributions",
            ],
          },
          {
            type: "example",
            content:
              "Sarah's target is 70% stocks, 30% bonds. After a strong stock year, her portfolio is now 80% stocks, 20% bonds. She sells some stocks and buys bonds to return to her 70/30 target allocation.",
          },
          {
            type: "list",
            content: "Rebalancing methods:",
            items: [
              "Sell high-performing assets, buy underperforming ones",
              "Direct new contributions to underweighted assets",
              "Use dividends and distributions to buy underweighted assets",
              "Automatic rebalancing through target-date funds",
              "Robo-advisors can rebalance automatically",
              "Rebalance within tax-advantaged accounts first",
            ],
          },
          {
            type: "list",
            content: "Benefits of rebalancing:",
            items: [
              "Maintains your intended risk level",
              "Forces you to sell high and buy low",
              "Prevents portfolio from becoming too risky",
              "Maintains diversification benefits",
              "Removes emotion from investment decisions",
              "Can improve long-term returns",
            ],
          },
          {
            type: "list",
            content: "Rebalancing considerations:",
            items: [
              "Tax implications in taxable accounts",
              "Transaction costs for frequent rebalancing",
              "Don't rebalance too frequently (increases costs)",
              "Consider rebalancing with new money first",
              "Use tax-loss harvesting opportunities",
              "Keep some cash for rebalancing opportunities",
            ],
          },
          {
            type: "tip",
            content:
              "Rebalance annually or when your allocation drifts more than 5-10% from your target. Use new contributions to rebalance when possible to avoid selling investments and triggering taxes.",
          },
        ],
        keyTakeaways: [
          "Rebalancing maintains your intended risk level",
          "It forces disciplined buying low and selling high",
          "Annual rebalancing is sufficient for most investors",
          "Use new contributions to rebalance when possible",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main purpose of rebalancing a portfolio?",
              options: [
                "To maximize returns",
                "To maintain your target asset allocation",
                "To minimize taxes",
                "To time the market",
              ],
              correctAnswer: "To maintain your target asset allocation",
              explanation: "Rebalancing brings your portfolio back to your intended asset allocation, maintaining your desired risk level as different investments perform differently over time.",
            },
          ],
        },
      },
      {
        title: "Investment Accounts and Taxes",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Choosing the Right Account Types",
          },
          {
            type: "paragraph",
            content:
              "Different types of investment accounts have different tax implications. Understanding these differences helps you choose the right accounts for your situation and maximize your after-tax returns over time.",
          },
          {
            type: "list",
            content: "Tax-advantaged retirement accounts:",
            items: [
              "401(k): Employer-sponsored, pre-tax contributions",
              "Traditional IRA: Individual account, tax-deductible contributions",
              "Roth IRA: After-tax contributions, tax-free withdrawals",
              "Roth 401(k): After-tax contributions through employer",
              "SEP-IRA: For self-employed individuals",
              "HSA: Triple tax advantage for medical expenses",
            ],
          },
          {
            type: "list",
            content: "Taxable investment accounts:",
            items: [
              "Brokerage accounts: No contribution limits or restrictions",
              "Taxed on dividends and capital gains annually",
              "More flexibility for withdrawals",
              "Good for goals before retirement",
              "Tax-loss harvesting opportunities",
              "Step-up in basis at death",
            ],
          },
          {
            type: "example",
            content:
              "Emma maximizes her 401(k) match, then contributes to a Roth IRA, and finally invests in a taxable account for her house down payment goal. This optimizes her tax situation across different time horizons.",
          },
          {
            type: "list",
            content: "Account prioritization strategy:",
            items: [
              "1. 401(k) up to employer match (free money)",
              "2. High-interest debt payoff",
              "3. Roth IRA for young investors",
              "4. Max out 401(k) contribution",
              "5. HSA if available",
              "6. Taxable accounts for additional savings",
            ],
          },
          {
            type: "list",
            content: "Tax-efficient investing strategies:",
            items: [
              "Hold tax-inefficient investments in retirement accounts",
              "Keep tax-efficient index funds in taxable accounts",
              "Use tax-loss harvesting in taxable accounts",
              "Consider municipal bonds for high earners",
              "Avoid frequent trading in taxable accounts",
              "Coordinate asset location with allocation",
            ],
          },
          {
            type: "list",
            content: "Investment taxes in taxable accounts:",
            items: [
              "Dividends: Taxed annually at qualified dividend rates",
              "Capital gains: Taxed when you sell investments",
              "Short-term gains: Taxed as ordinary income (held <1 year)",
              "Long-term gains: Preferential tax rates (held >1 year)",
              "Tax-loss harvesting: Offset gains with losses",
              "Wash sale rule: Can't rebuy same investment within 30 days",
            ],
          },
          {
            type: "tip",
            content:
              "Prioritize tax-advantaged accounts first, especially if you get an employer match. For young investors, Roth accounts are often better than traditional accounts due to decades of tax-free growth.",
          },
        ],
        keyTakeaways: [
          "Tax-advantaged accounts should be prioritized for retirement savings",
          "Roth accounts are often better for young investors",
          "Taxable accounts provide flexibility for non-retirement goals",
          "Asset location matters - put tax-inefficient investments in retirement accounts",
        ],
        quiz: {
          questions: [
            {
              question: "What should be your first investment priority?",
              options: [
                "Taxable brokerage account",
                "401(k) up to employer match",
                "Real estate investment",
                "Individual stocks",
              ],
              correctAnswer: "401(k) up to employer match",
              explanation: "Getting the full employer match on your 401(k) is essentially free money and should be your first investment priority.",
            },
          ],
        },
      },
      {
        title: "Common Investment Mistakes",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Avoiding Costly Errors",
          },
          {
            type: "paragraph",
            content:
              "Many beginning investors make predictable mistakes that can significantly hurt their long-term returns. Understanding these common pitfalls helps you avoid them and stay on track toward your financial goals.",
          },
          {
            type: "list",
            content: "Emotional investing mistakes:",
            items: [
              "Panic selling during market downturns",
              "FOMO buying during market peaks",
              "Trying to time the market",
              "Chasing last year's hot investments",
              "Checking portfolio values too frequently",
              "Making decisions based on news headlines",
            ],
          },
          {
            type: "list",
            content: "Portfolio construction mistakes:",
            items: [
              "Lack of diversification (putting all eggs in one basket)",
              "Over-diversification (owning too many similar funds)",
              "Ignoring fees and expense ratios",
              "Not rebalancing regularly",
              "Inappropriate asset allocation for age/goals",
              "Investing in complex products you don't understand",
            ],
          },
          {
            type: "example",
            content:
              "During the 2020 market crash, Jake panicked and sold all his investments at a 30% loss. By the time he felt comfortable buying back in, the market had recovered and he missed the rebound, locking in his losses.",
          },
          {
            type: "list",
            content: "Behavioral mistakes:",
            items: [
              "Procrastination - waiting for the 'perfect' time to start",
              "Analysis paralysis - over-researching instead of investing",
              "Overconfidence after early success",
              "Following tips from friends or social media",
              "Day trading or frequent trading",
              "Ignoring the power of compound growth",
            ],
          },
          {
            type: "list",
            content: "Account and tax mistakes:",
            items: [
              "Not maximizing employer 401(k) match",
              "Choosing wrong account types for your situation",
              "Ignoring tax implications of investment decisions",
              "Not taking advantage of tax-loss harvesting",
              "Withdrawing from retirement accounts early",
              "Not updating beneficiaries on accounts",
            ],
          },
          {
            type: "list",
            content: "How to avoid these mistakes:",
            items: [
              "Educate yourself about investing basics",
              "Start with simple, low-cost index funds",
              "Automate your investments",
              "Focus on time in market, not timing the market",
              "Stick to your long-term plan",
              "Ignore short-term market noise",
            ],
          },
          {
            type: "tip",
            content:
              "The biggest mistake is not starting. Perfect is the enemy of good in investing. Start with a simple index fund and automate your contributions. You can always improve your strategy as you learn more.",
          },
        ],
        keyTakeaways: [
          "Emotional decisions are the biggest threat to investment success",
          "Simple strategies often outperform complex ones",
          "Starting early is more important than perfect timing",
          "Automation helps avoid behavioral mistakes",
        ],
        quiz: {
          questions: [
            {
              question: "What is often the biggest mistake new investors make?",
              options: [
                "Not diversifying enough",
                "Choosing the wrong stocks",
                "Making emotional decisions during market volatility",
                "Not checking their portfolio daily",
              ],
              correctAnswer: "Making emotional decisions during market volatility",
              explanation: "Emotional decisions like panic selling during downturns or FOMO buying during peaks are the biggest destroyers of long-term investment returns.",
            },
          ],
        },
      },
      {
        title: "Getting Started with Investing",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Your First Steps as an Investor",
          },
          {
            type: "paragraph",
            content:
              "Starting your investment journey can feel overwhelming, but it doesn't have to be complicated. With a few simple steps and the right approach, you can begin building wealth for your future, even with small amounts of money.",
          },
          {
            type: "list",
            content: "Before you start investing:",
            items: [
              "Build an emergency fund (3-6 months expenses)",
              "Pay off high-interest debt (credit cards)",
              "Establish stable income",
              "Understand your risk tolerance",
              "Define your investment goals and timeline",
              "Learn basic investment concepts",
            ],
          },
          {
            type: "list",
            content: "Choosing a brokerage account:",
            items: [
              "Low or no account fees",
              "Commission-free stock and ETF trades",
              "Good selection of low-cost index funds",
              "User-friendly platform and mobile app",
              "Educational resources for beginners",
              "Popular options: Vanguard, Fidelity, Schwab",
            ],
          },
          {
            type: "example",
            content:
              "Alex starts with $100/month into a target-date fund in his Roth IRA. The fund automatically diversifies across stocks and bonds and adjusts over time. He increases contributions with each raise.",
          },
          {
            type: "list",
            content: "Simple starter portfolios:",
            items: [
              "Target-date fund: One fund that does everything",
              "Three-fund portfolio: US stocks, international stocks, bonds",
              "S&P 500 index fund: Simple US stock market exposure",
              "Total stock market fund: Entire US stock market",
              "Robo-advisor: Algorithm manages diversified portfolio",
              "Start simple, add complexity later",
            ],
          },
          {
            type: "list",
            content: "Setting up automatic investing:",
            items: [
              "Link bank account to investment account",
              "Set up automatic monthly transfers",
              "Choose dollar-cost averaging approach",
              "Start with amount you can afford consistently",
              "Increase contributions with raises",
              "Review and adjust annually",
            ],
          },
          {
            type: "list",
            content: "First-year investor checklist:",
            items: [
              "Open appropriate investment accounts",
              "Start with simple, diversified investments",
              "Automate contributions",
              "Learn while you invest",
              "Avoid checking balances too frequently",
              "Stay consistent through market ups and downs",
            ],
          },
          {
            type: "tip",
            content:
              "Don't wait until you have a large amount to start investing. Begin with whatever you can afford, even $25-50 per month. The habit of investing regularly is more important than the initial amount.",
          },
        ],
        keyTakeaways: [
          "Start with emergency fund and debt payoff first",
          "Choose low-cost brokerages with good index fund selection",
          "Begin with simple, diversified investments",
          "Automate your investments for consistency",
        ],
        quiz: {
          questions: [
            {
              question: "What should you do before you start investing?",
              options: [
                "Buy individual stocks",
                "Build an emergency fund and pay off high-interest debt",
                "Wait until you have $10,000",
                "Study the market for years",
              ],
              correctAnswer: "Build an emergency fund and pay off high-interest debt",
              explanation: "Before investing, you should have an emergency fund and pay off high-interest debt to ensure you have a solid financial foundation.",
            },
          ],
        },
      },
    ],
    "emergency-fund": [
      {
        title: "Why You Need an Emergency Fund",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Your Financial Safety Net",
          },
          {
            type: "paragraph",
            content:
              "An emergency fund is money set aside specifically for unexpected expenses or financial emergencies. It acts as a financial safety net, protecting you from going into debt when life throws you curveballs. For young adults, this is often the first step toward financial security.",
          },
          {
            type: "list",
            content: "What qualifies as an emergency:",
            items: [
              "Job loss or reduced income",
              "Medical emergencies or unexpected health expenses",
              "Major car repairs or replacement",
              "Home repairs (roof, plumbing, heating)",
              "Family emergencies requiring travel",
              "Unexpected tax bills or legal expenses",
            ],
          },
          {
            type: "list",
            content: "What is NOT an emergency:",
            items: [
              "Vacation or travel expenses",
              "Holiday gifts or celebrations",
              "Sale items you 'can't pass up'",
              "Routine car maintenance",
              "Planned home improvements",
              "Entertainment or dining out",
            ],
          },
          {
            type: "example",
            content:
              "Sarah's car breaks down and needs a $1,200 repair. Without an emergency fund, she'd have to put it on a credit card at 22% interest. With her emergency fund, she pays cash and avoids debt and interest charges.",
          },
          {
            type: "list",
            content: "Benefits of having an emergency fund:",
            items: [
              "Avoid going into debt for unexpected expenses",
              "Reduce financial stress and anxiety",
              "Maintain your lifestyle during income disruptions",
              "Take advantage of opportunities (job changes, investments)",
              "Sleep better knowing you're prepared",
              "Protect your long-term financial goals",
            ],
          },
          {
            type: "list",
            content: "Consequences of not having an emergency fund:",
            items: [
              "Forced to use high-interest credit cards",
              "May need to borrow from family or friends",
              "Might have to sell investments at a loss",
              "Could face financial hardship from minor setbacks",
              "Increased stress and relationship strain",
              "Difficulty recovering from financial emergencies",
            ],
          },
          {
            type: "tip",
            content:
              "Start building your emergency fund before focusing on other financial goals. Even $500 can prevent many common emergencies from becoming debt problems. Build it gradually - every dollar counts.",
          },
        ],
        keyTakeaways: [
          "Emergency funds prevent debt when unexpected expenses occur",
          "True emergencies are unplanned and necessary expenses",
          "Even a small emergency fund provides significant protection",
          "Emergency funds reduce stress and protect long-term goals",
        ],
        quiz: {
          questions: [
            {
              question: "Which of these would be considered a true emergency?",
              options: [
                "A vacation you really want to take",
                "Your car breaking down and needing major repairs",
                "A great sale on clothes",
                "Holiday gifts for family",
              ],
              correctAnswer: "Your car breaking down and needing major repairs",
              explanation: "A car breakdown requiring major repairs is unexpected, necessary, and urgent - the definition of a true emergency that warrants using your emergency fund.",
            },
          ],
        },
      },
      {
        title: "How Much to Save",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Determining Your Emergency Fund Target",
          },
          {
            type: "paragraph",
            content:
              "The amount you need in your emergency fund depends on your personal situation, expenses, and risk factors. While the standard advice is 3-6 months of expenses, your specific circumstances may require more or less.",
          },
          {
            type: "list",
            content: "Standard emergency fund guidelines:",
            items: [
              "3-6 months of essential expenses (most common advice)",
              "3 months minimum for stable employment",
              "6+ months for variable income or high-risk jobs",
              "More if you're self-employed or commission-based",
              "Consider your specific risk factors",
              "Start with $1,000 as an initial goal",
            ],
          },
          {
            type: "list",
            content: "Factors that increase your emergency fund need:",
            items: [
              "Unstable or seasonal employment",
              "Self-employment or freelance work",
              "Single income household",
              "Health issues or chronic conditions",
              "Older home or car requiring more repairs",
              "Limited family support system",
            ],
          },
          {
            type: "example",
            content:
              "Mike has essential monthly expenses of $3,000. As a freelance graphic designer with variable income, he aims for 6 months ($18,000) in his emergency fund rather than the standard 3 months ($9,000).",
          },
          {
            type: "list",
            content: "Calculating your emergency fund target:",
            items: [
              "List all essential monthly expenses",
              "Include: rent, utilities, food, transportation, insurance",
              "Exclude: entertainment, dining out, subscriptions",
              "Multiply by 3-6 months based on your situation",
              "Round up to the nearest $500 or $1,000",
              "Adjust based on your comfort level",
            ],
          },
          {
            type: "list",
            content: "Emergency fund building phases:",
            items: [
              "Phase 1: $500-1,000 starter emergency fund",
              "Phase 2: 1 month of essential expenses",
              "Phase 3: 3 months of essential expenses",
              "Phase 4: 6 months of essential expenses",
              "Phase 5: Adjust based on life changes",
              "Celebrate each milestone achieved",
            ],
          },
          {
            type: "list",
            content: "Young adult considerations:",
            items: [
              "Start smaller if you're just beginning ($500-1,000)",
              "Focus on essential expenses, not total income",
              "Consider living situation (parents vs. independent)",
              "Account for student loan payments if applicable",
              "Build gradually while establishing other habits",
              "Adjust as your expenses and income change",
            ],
          },
          {
            type: "tip",
            content:
              "Don't let the full target amount overwhelm you. Start with a $500 goal, then $1,000, then work toward one month of expenses. Building it gradually makes the goal more achievable.",
          },
        ],
        keyTakeaways: [
          "3-6 months of essential expenses is the standard guideline",
          "Your specific situation may require more or less",
          "Start with smaller goals and build gradually",
          "Focus on essential expenses, not total income",
        ],
        quiz: {
          questions: [
            {
              question: "How much should someone with variable income typically save in their emergency fund?",
              options: [
                "1 month of expenses",
                "3 months of expenses",
                "6+ months of expenses",
                "Whatever they can afford",
              ],
              correctAnswer: "6+ months of expenses",
              explanation: "People with variable or unstable income should save more (6+ months) because they face higher risk of income disruption and may need more time to find new income sources.",
            },
          ],
        },
      },
      {
        title: "Where to Keep Your Emergency Fund",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Choosing the Right Account",
          },
          {
            type: "paragraph",
            content:
              "Your emergency fund needs to be easily accessible when you need it, but you also want it to earn some interest while it sits there. The key is balancing accessibility, safety, and growth potential.",
          },
          {
            type: "list",
            content: "Emergency fund account requirements:",
            items: [
              "Easily accessible (liquid)",
              "FDIC insured for safety",
              "Earns some interest to fight inflation",
              "No penalties for withdrawals",
              "Separate from your checking account",
              "Not subject to market volatility",
            ],
          },
          {
            type: "list",
            content: "Best emergency fund account options:",
            items: [
              "High-yield savings accounts (4-5% APY)",
              "Money market accounts",
              "Online bank savings accounts",
              "Credit union savings accounts",
              "Short-term CDs (if you have multiple months saved)",
              "Treasury bills or I-bonds (for portion of fund)",
            ],
          },
          {
            type: "example",
            content:
              "Lisa keeps her $10,000 emergency fund in a high-yield online savings account earning 4.5% APY. She can access it within 1-2 business days if needed, and it earns $450 annually in interest.",
          },
          {
            type: "list",
            content: "Accounts to avoid for emergency funds:",
            items: [
              "Regular checking accounts (too accessible, low interest)",
              "Stock market investments (too volatile)",
              "Retirement accounts (penalties and taxes)",
              "Long-term CDs (penalties for early withdrawal)",
              "Cryptocurrency (too volatile and risky)",
              "Under your mattress (no growth, not secure)",
            ],
          },
          {
            type: "list",
            content: "Online vs. traditional banks:",
            items: [
              "Online banks: Higher interest rates, lower fees",
              "Traditional banks: Physical locations, immediate access",
              "Online banks often offer 10-20x higher rates",
              "Consider having accounts at both types",
              "Online transfers typically take 1-3 business days",
              "ATM access may be limited with online banks",
            ],
          },
          {
            type: "list",
            content: "Emergency fund accessibility strategies:",
            items: [
              "Keep small amount ($500-1,000) in checking for immediate access",
              "Majority in high-yield savings for better growth",
              "Consider multiple accounts for different time frames",
              "Have debit card or checks for emergency account",
              "Know how to transfer money quickly",
              "Test your access method before you need it",
            ],
          },
          {
            type: "tip",
            content:
              "Shop around for high-yield savings accounts and compare rates regularly. Online banks typically offer the best rates. Make sure the bank is FDIC insured for your protection.",
          },
        ],
        keyTakeaways: [
          "High-yield savings accounts are ideal for emergency funds",
          "Balance accessibility with earning potential",
          "Avoid volatile investments for emergency money",
          "Online banks typically offer better interest rates",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most important characteristic of an emergency fund account?",
              options: [
                "Highest possible returns",
                "Easy accessibility when needed",
                "Long-term growth potential",
                "Tax advantages",
              ],
              correctAnswer: "Easy accessibility when needed",
              explanation: "The primary purpose of an emergency fund is to be available when you need it quickly, making accessibility more important than maximizing returns.",
            },
          ],
        },
      },
      {
        title: "Building Your Emergency Fund",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Strategies to Reach Your Goal",
          },
          {
            type: "paragraph",
            content:
              "Building an emergency fund requires a systematic approach and consistent effort. The key is to make it automatic and find ways to accelerate your savings without dramatically impacting your lifestyle.",
          },
          {
            type: "list",
            content: "Automatic saving strategies:",
            items: [
              "Set up automatic transfers from checking to savings",
              "Direct deposit a portion of paycheck to emergency fund",
              "Use apps that round up purchases and save the change",
              "Save tax refunds and bonuses automatically",
              "Treat emergency fund savings like a bill",
              "Start small and increase gradually",
            ],
          },
          {
            type: "list",
            content: "Finding money to save:",
            items: [
              "Track expenses to identify areas to cut",
              "Cancel unused subscriptions and memberships",
              "Reduce dining out and entertainment expenses",
              "Shop smarter for groceries and necessities",
              "Sell items you no longer need",
              "Take on temporary side work or gigs",
            ],
          },
          {
            type: "example",
            content:
              "Tom sets up a $200 automatic transfer every payday and saves his $50 weekly coffee shop habit. This saves him $400/month, building a $4,800 emergency fund in one year.",
          },
          {
            type: "list",
            content: "Accelerating your emergency fund:",
            items: [
              "Use windfalls: tax refunds, bonuses, gifts",
              "Temporarily reduce other savings goals",
              "Take on extra work or freelance projects",
              "Sell unused items around your home",
              "Participate in the gig economy",
              "Challenge yourself with no-spend periods",
            ],
          },
          {
            type: "list",
            content: "Staying motivated:",
            items: [
              "Set smaller milestone goals ($500, $1,000, etc.)",
              "Track your progress visually",
              "Celebrate reaching each milestone",
              "Remember why you're building the fund",
              "Find an accountability partner",
              "Focus on the peace of mind it provides",
            ],
          },
          {
            type: "list",
            content: "Common obstacles and solutions:",
            items: [
              "Temptation to spend: Keep fund in separate bank",
              "Slow progress: Start smaller, be consistent",
              "Competing priorities: Emergency fund comes first",
              "Irregular income: Save percentage, not fixed amount",
              "Unexpected expenses: Don't give up, rebuild",
              "Lack of motivation: Remember your 'why'",
            ],
          },
          {
            type: "tip",
            content:
              "Start with whatever amount you can manage, even $25 per month. The habit of saving regularly is more important than the amount. You can always increase it as your income grows or expenses decrease.",
          },
        ],
        keyTakeaways: [
          "Automation makes emergency fund building effortless",
          "Look for ways to cut expenses and increase income",
          "Use windfalls to accelerate your progress",
          "Set smaller milestones to stay motivated",
        ],
        quiz: {
          questions: [
            {
              question: "What's the best way to ensure you consistently build your emergency fund?",
              options: [
                "Save whatever is left over each month",
                "Set up automatic transfers",
                "Only save when you remember",
                "Wait for large windfalls",
              ],
              correctAnswer: "Set up automatic transfers",
              explanation: "Automatic transfers ensure consistent saving without relying on willpower or memory, making it the most effective way to build your emergency fund.",
            },
          ],
        },
      },
    ],
    "financial-goals": [
      {
        title: "Setting SMART Financial Goals",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Creating Clear, Achievable Goals",
          },
          {
            type: "paragraph",
            content:
              "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. This framework helps you create clear financial objectives that you're more likely to achieve, rather than vague wishes that never materialize.",
          },
          {
            type: "list",
            content: "SMART goal components:",
            items: [
              "Specific: Clearly defined with exact details",
              "Measurable: Quantifiable with numbers",
              "Achievable: Realistic given your situation",
              "Relevant: Important to your life and values",
              "Time-bound: Has a specific deadline",
            ],
          },
          {
            type: "list",
            content: "Examples of vague vs. SMART goals:",
            items: [
              "Vague: 'Save more money'",
              "SMART: 'Save $5,000 for emergency fund by December 31st'",
              "Vague: 'Pay off debt'",
              "SMART: 'Pay off $3,000 credit card debt in 18 months'",
              "Vague: 'Start investing'",
              "SMART: 'Invest $200 monthly in index funds starting next month'",
            ],
          },
          {
            type: "example",
            content:
              "Instead of 'I want to buy a car,' Sarah sets a SMART goal: 'Save $8,000 for a reliable used car down payment by June 2025 by saving $400 per month.' This gives her a clear target and timeline.",
          },
          {
            type: "list",
            content: "Making goals achievable:",
            items: [
              "Base goals on your actual income and expenses",
              "Start with smaller goals to build confidence",
              "Consider your other financial obligations",
              "Account for unexpected expenses",
              "Be realistic about your timeline",
              "Allow for some flexibility in your plan",
            ],
          },
          {
            type: "list",
            content: "Ensuring goals are relevant:",
            items: [
              "Align with your personal values",
              "Support your life priorities",
              "Consider your current life stage",
              "Think about your future self",
              "Don't copy others' goals blindly",
              "Focus on what truly matters to you",
            ],
          },
          {
            type: "tip",
            content:
              "Write down your SMART goals and put them somewhere you'll see them regularly. This keeps them top of mind and increases your likelihood of achieving them.",
          },
        ],
        keyTakeaways: [
          "SMART goals are more likely to be achieved than vague wishes",
          "Specific numbers and deadlines create accountability",
          "Goals should be challenging but realistic",
          "Relevance to your values increases motivation",
        ],
        quiz: {
          questions: [
            {
              question: "Which of these is a SMART financial goal?",
              options: [
                "Save more money",
                "Get out of debt",
                "Save $3,000 for vacation by next December",
                "Start investing someday",
              ],
              correctAnswer: "Save $3,000 for vacation by next December",
              explanation: "This goal is Specific ($3,000 for vacation), Measurable ($3,000), Achievable (depends on income), Relevant (vacation), and Time-bound (by next December).",
            },
          ],
        },
      },
      {
        title: "Short-term vs. Long-term Goals",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Balancing Different Time Horizons",
          },
          {
            type: "paragraph",
            content:
              "Financial goals span different time periods, each requiring different strategies and approaches. Understanding how to balance short-term needs with long-term wealth building is crucial for financial success.",
          },
          {
            type: "list",
            content: "Short-term goals (1-2 years):",
            items: [
              "Emergency fund building",
              "Vacation or travel funds",
              "Holiday and gift expenses",
              "Car maintenance and repairs",
              "Small home improvements",
              "Professional development courses",
            ],
          },
          {
            type: "list",
            content: "Medium-term goals (2-10 years):",
            items: [
              "House down payment",
              "Car replacement",
              "Wedding expenses",
              "Starting a family",
              "Career change or education",
              "Major home renovations",
            ],
          },
          {
            type: "list",
            content: "Long-term goals (10+ years):",
            items: [
              "Retirement savings",
              "Children's education funding",
              "Paying off mortgage",
              "Starting a business",
              "Financial independence",
              "Legacy planning",
            ],
          },
          {
            type: "example",
            content:
              "Emma balances her goals: $100/month for vacation fund (short-term), $300/month for house down payment (medium-term), and $200/month for retirement (long-term). This ensures progress on all time horizons.",
          },
          {
            type: "list",
            content: "Strategies for different time horizons:",
            items: [
              "Short-term: High-yield savings, CDs, money market accounts",
              "Medium-term: Conservative investments, balanced funds",
              "Long-term: Growth investments, stock index funds",
              "Match investment risk to time horizon",
              "Longer timelines allow for more volatility",
              "Shorter timelines require more stability",
            ],
          },
          {
            type: "list",
            content: "Balancing competing goals:",
            items: [
              "Prioritize by importance and urgency",
              "Don't neglect long-term for short-term wants",
              "Use percentage-based allocation",
              "Adjust as circumstances change",
              "Consider opportunity costs",
              "Automate to reduce decision fatigue",
            ],
          },
          {
            type: "tip",
            content:
              "Don't sacrifice long-term wealth building for short-term wants. A good rule is to allocate at least 20% of your savings to long-term goals like retirement, even when working on shorter-term objectives.",
          },
        ],
        keyTakeaways: [
          "Different time horizons require different strategies",
          "Balance short-term needs with long-term wealth building",
          "Match investment risk to your timeline",
          "Don't neglect retirement savings for shorter-term goals",
        ],
        quiz: {
          questions: [
            {
              question: "Which investment approach is most appropriate for a 10-year goal?",
              options: [
                "High-yield savings account",
                "Conservative investments or balanced funds",
                "Aggressive growth stocks",
                "Cash under the mattress",
              ],
              correctAnswer: "Conservative investments or balanced funds",
              explanation: "A 10-year timeline allows for some investment risk but requires more stability than very long-term goals, making conservative investments or balanced funds appropriate.",
            },
          ],
        },
      },
      {
        title: "Prioritizing Your Goals",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Deciding What Comes First",
          },
          {
            type: "paragraph",
            content:
              "With limited income and multiple financial goals, prioritization is essential. Understanding which goals should come first helps you make the biggest impact with your available resources and avoid spreading yourself too thin.",
          },
          {
            type: "list",
            content: "Financial goal hierarchy:",
            items: [
              "1. Emergency fund (starter amount)",
              "2. High-interest debt payoff",
              "3. Emergency fund completion",
              "4. Retirement savings (especially with employer match)",
              "5. Medium-term goals (house, car)",
              "6. Additional retirement savings",
              "7. Other long-term goals",
            ],
          },
          {
            type: "list",
            content: "Factors in prioritization:",
            items: [
              "Urgency: How soon do you need this?",
              "Impact: How much will this improve your life?",
              "Cost of delay: What happens if you wait?",
              "Opportunity: Are there time-sensitive benefits?",
              "Risk: What are the consequences of not achieving this?",
              "Resources required: How much money and time needed?",
            ],
          },
          {
            type: "example",
            content:
              "Jake has $500/month to allocate. He prioritizes: $200 to emergency fund, $200 to credit card debt, $100 to retirement. Once debt is paid off, he'll redirect that $200 to house down payment savings.",
          },
          {
            type: "list",
            content: "Common prioritization mistakes:",
            items: [
              "Focusing on wants before needs",
              "Ignoring high-interest debt",
              "Skipping emergency fund for other goals",
              "Not taking advantage of employer matching",
              "Trying to work on too many goals at once",
              "Letting perfectionism prevent starting",
            ],
          },
          {
            type: "list",
            content: "Strategies for multiple goals:",
            items: [
              "Focus intensely on 1-3 goals at a time",
              "Use percentage-based allocation",
              "Automate contributions to prevent decision fatigue",
              "Review and adjust priorities quarterly",
              "Celebrate completed goals before adding new ones",
              "Consider seasonal adjustments",
            ],
          },
          {
            type: "list",
            content: "When to adjust priorities:",
            items: [
              "Major life changes (job, marriage, children)",
              "Income increases or decreases",
              "Completing a major goal",
              "Economic or market changes",
              "Health or family emergencies",
              "New opportunities or requirements",
            ],
          },
          {
            type: "tip",
            content:
              "Don't try to work on too many goals simultaneously. Focus on 2-3 priorities and make real progress rather than spreading your money too thin across many goals.",
          },
        ],
        keyTakeaways: [
          "Emergency funds and debt payoff typically come first",
          "Consider urgency, impact, and cost of delay when prioritizing",
          "Focus on fewer goals for better progress",
          "Adjust priorities as life circumstances change",
        ],
        quiz: {
          questions: [
            {
              question: "What should typically be your first financial priority?",
              options: [
                "Buying a house",
                "Starting to invest",
                "Building an emergency fund",
                "Planning a vacation",
              ],
              correctAnswer: "Building an emergency fund",
              explanation: "An emergency fund should typically be your first priority as it prevents you from going into debt when unexpected expenses occur, protecting all your other financial goals.",
            },
          ],
        },
      },
    ],
    "sustainable-impact-investing": [
      {
        title: "Introduction to ESG Investing",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Environmental, Social, and Governance Investing",
          },
          {
            type: "paragraph",
            content:
              "ESG investing considers Environmental, Social, and Governance factors alongside financial returns when making investment decisions. This approach allows you to align your investments with your values while still pursuing competitive returns.",
          },
          {
            type: "list",
            content: "Environmental factors:",
            items: [
              "Climate change and carbon emissions",
              "Renewable energy and clean technology",
              "Water and waste management",
              "Biodiversity and ecosystem protection",
              "Pollution prevention and control",
              "Resource efficiency and conservation",
            ],
          },
          {
            type: "list",
            content: "Social factors:",
            items: [
              "Labor practices and employee treatment",
              "Human rights and community relations",
              "Product safety and quality",
              "Data protection and privacy",
              "Diversity, equity, and inclusion",
              "Supply chain management",
            ],
          },
          {
            type: "list",
            content: "Governance factors:",
            items: [
              "Board composition and independence",
              "Executive compensation practices",
              "Shareholder rights and transparency",
              "Business ethics and anti-corruption",
              "Risk management and oversight",
              "Regulatory compliance",
            ],
          },
          {
            type: "example",
            content:
              "Sarah invests in an ESG fund that excludes tobacco and weapons companies while favoring companies with strong environmental practices and diverse leadership. She earns competitive returns while supporting her values.",
          },
          {
            type: "list",
            content: "ESG investment approaches:",
            items: [
              "Negative screening: Excluding harmful industries",
              "Positive screening: Selecting best-in-class companies",
              "Thematic investing: Focusing on specific ESG themes",
              "Integration: Incorporating ESG into traditional analysis",
              "Shareholder engagement: Using ownership to influence companies",
              "Impact investing: Targeting measurable social/environmental outcomes",
            ],
          },
          {
            type: "tip",
            content:
              "ESG investing doesn't mean sacrificing returns. Many ESG funds have performed competitively with traditional funds while allowing you to invest according to your values.",
          },
        ],
        keyTakeaways: [
          "ESG considers environmental, social, and governance factors",
          "Multiple approaches exist from screening to impact investing",
          "Can align investments with personal values",
          "Performance can be competitive with traditional investing",
        ],
        quiz: {
          questions: [
            {
              question: "What does ESG stand for in investing?",
              options: [
                "Economic, Social, Growth",
                "Environmental, Social, Governance",
                "Ethical, Sustainable, Green",
                "Energy, Solar, Gas",
              ],
              correctAnswer: "Environmental, Social, Governance",
              explanation: "ESG stands for Environmental, Social, and Governance - the three key factors considered in sustainable investing.",
            },
          ],
        },
      },
      {
        title: "Impact Investing Fundamentals",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Investing for Measurable Social and Environmental Impact",
          },
          {
            type: "paragraph",
            content:
              "Impact investing goes beyond ESG by specifically targeting investments that generate positive, measurable social and environmental impact alongside financial returns. This approach allows you to directly contribute to solving global challenges through your investment choices.",
          },
          {
            type: "list",
            content: "Key characteristics of impact investing:",
            items: [
              "Intentionality: Deliberate intent to create positive impact",
              "Measurability: Ability to measure and report impact",
              "Financial returns: Expectation of financial returns",
              "Range of returns: From below-market to market-rate",
              "Asset classes: Across all asset classes and geographies",
              "Impact management: Active management of impact outcomes",
            ],
          },
          {
            type: "list",
            content: "Common impact investing themes:",
            items: [
              "Clean energy and climate solutions",
              "Affordable housing and community development",
              "Healthcare access and medical innovation",
              "Education and workforce development",
              "Financial inclusion and microfinance",
              "Sustainable agriculture and food security",
            ],
          },
          {
            type: "example",
            content:
              "Mike invests in a fund that provides microloans to small businesses in developing countries. He earns 4% returns while helping entrepreneurs create jobs and improve their communities' economic conditions.",
          },
          {
            type: "list",
            content: "Types of impact investments:",
            items: [
              "Green bonds: Financing environmental projects",
              "Social impact bonds: Funding social programs",
              "Community development financial institutions (CDFIs)",
              "Microfinance institutions",
              "Clean energy projects",
              "Affordable housing developments",
            ],
          },
          {
            type: "list",
            content: "Measuring impact:",
            items: [
              "Environmental metrics: Carbon reduction, energy saved",
              "Social metrics: Jobs created, people served",
              "Financial metrics: Loans provided, businesses supported",
              "Third-party verification and reporting",
              "Standardized frameworks (IRIS+, SDGs)",
              "Regular impact reporting to investors",
            ],
          },
          {
            type: "list",
            content: "Getting started with impact investing:",
            items: [
              "Define your impact priorities and values",
              "Research available impact investment options",
              "Consider impact-focused mutual funds or ETFs",
              "Look into community development investments",
              "Start small and learn as you go",
              "Work with advisors experienced in impact investing",
            ],
          },
          {
            type: "tip",
            content:
              "Start with impact-focused mutual funds or ETFs if you're new to impact investing. These provide diversification and professional management while allowing you to create positive impact.",
          },
        ],
        keyTakeaways: [
          "Impact investing targets measurable positive outcomes",
          "Can generate competitive financial returns",
          "Covers various themes from climate to healthcare",
          "Impact measurement and reporting are essential",
        ],
        quiz: {
          questions: [
            {
              question: "What distinguishes impact investing from traditional ESG investing?",
              options: [
                "Higher returns",
                "Lower risk",
                "Intentional focus on measurable positive impact",
                "Only environmental focus",
              ],
              correctAnswer: "Intentional focus on measurable positive impact",
              explanation: "Impact investing specifically targets measurable positive social and environmental outcomes, going beyond ESG's consideration of these factors in investment decisions.",
            },
          ],
        },
      },
      {
        title: "Green Bonds and Climate Investing",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Financing the Transition to a Low-Carbon Economy",
          },
          {
            type: "paragraph",
            content:
              "Green bonds and climate investing focus specifically on financing projects and companies that address climate change and environmental challenges. This rapidly growing sector offers opportunities to support the clean energy transition while earning returns.",
          },
          {
            type: "list",
            content: "What are green bonds:",
            items: [
              "Bonds specifically earmarked for environmental projects",
              "Proceeds fund climate and environmental solutions",
              "Same credit risk as regular bonds from same issuer",
              "Growing market with increasing issuance",
              "Issued by governments, corporations, and municipalities",
              "Third-party verification of green credentials",
            ],
          },
          {
            type: "list",
            content: "Types of green bond projects:",
            items: [
              "Renewable energy (solar, wind, hydroelectric)",
              "Energy efficiency improvements",
              "Clean transportation (electric vehicles, public transit)",
              "Sustainable water and waste management",
              "Green buildings and infrastructure",
              "Climate adaptation and resilience projects",
            ],
          },
          {
            type: "example",
            content:
              "Lisa invests in a green bond fund that finances solar farms, wind projects, and energy-efficient buildings. She earns 3.5% annually while supporting the transition to clean energy.",
          },
          {
            type: "list",
            content: "Climate investing opportunities:",
            items: [
              "Clean energy companies and projects",
              "Electric vehicle and battery technology",
              "Energy storage and grid modernization",
              "Carbon capture and storage technologies",
              "Sustainable agriculture and forestry",
              "Water treatment and conservation",
            ],
          },
          {
            type: "list",
            content: "Climate investment vehicles:",
            items: [
              "Green bond funds and ETFs",
              "Clean energy sector funds",
              "Climate-focused mutual funds",
              "ESG funds with climate focus",
              "Direct investment in renewable energy projects",
              "Climate-themed index funds",
            ],
          },
          {
            type: "list",
            content: "Risks and considerations:",
            items: [
              "Technology risk: New technologies may not succeed",
              "Policy risk: Changes in government support",
              "Market risk: Sector volatility and competition",
              "Greenwashing: Verify actual environmental impact",
              "Concentration risk: Don't over-allocate to one sector",
              "Long-term nature: Many projects have long payback periods",
            ],
          },
          {
            type: "tip",
            content:
              "Consider green bond funds for stable, fixed-income exposure to climate solutions. For growth potential, look at clean energy ETFs, but be prepared for higher volatility.",
          },
        ],
        keyTakeaways: [
          "Green bonds finance specific environmental projects",
          "Climate investing covers renewable energy and clean technology",
          "Multiple investment vehicles available for different risk levels",
          "Verify actual environmental impact to avoid greenwashing",
        ],
        quiz: {
          questions: [
            {
              question: "What do green bonds specifically finance?",
              options: [
                "Any profitable project",
                "Environmental and climate projects",
                "Technology companies",
                "Government operations",
              ],
              correctAnswer: "Environmental and climate projects",
              explanation: "Green bonds are specifically earmarked to finance projects that have positive environmental or climate benefits, such as renewable energy or energy efficiency projects.",
            },
          ],
        },
      },
      {
        title: "Socially Responsible Investing (SRI)",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Aligning Investments with Personal Values",
          },
          {
            type: "paragraph",
            content:
              "Socially Responsible Investing (SRI) involves selecting investments based on ethical, social, and environmental criteria. This approach allows you to avoid industries or practices you find objectionable while supporting companies that align with your values.",
          },
          {
            type: "list",
            content: "Common SRI screening criteria:",
            items: [
              "Negative screens: Excluding tobacco, weapons, gambling",
              "Positive screens: Selecting companies with good practices",
              "Values-based screening: Aligning with personal beliefs",
              "Religious screening: Following faith-based guidelines",
              "Norm-based screening: Excluding human rights violators",
              "Best-in-class: Choosing leaders within each sector",
            ],
          },
          {
            type: "list",
            content: "Industries commonly excluded in SRI:",
            items: [
              "Tobacco and alcohol companies",
              "Weapons and defense contractors",
              "Gambling and adult entertainment",
              "Fossil fuel companies",
              "Companies with poor labor practices",
              "Businesses involved in human rights violations",
            ],
          },
          {
            type: "example",
            content:
              "David chooses an SRI fund that excludes tobacco, weapons, and fossil fuels while favoring companies with strong environmental records and fair labor practices. His returns match the broader market while reflecting his values.",
          },
          {
            type: "list",
            content: "Positive SRI criteria:",
            items: [
              "Strong environmental stewardship",
              "Fair labor practices and employee treatment",
              "Community involvement and philanthropy",
              "Diverse and inclusive leadership",
              "Ethical business practices",
              "Innovation in sustainable products",
            ],
          },
          {
            type: "list",
            content: "SRI investment options:",
            items: [
              "SRI mutual funds and ETFs",
              "Faith-based investment funds",
              "Shareholder advocacy funds",
              "Community development investments",
              "Direct stock ownership with screening",
              "Robo-advisors with SRI options",
            ],
          },
          {
            type: "list",
            content: "Benefits and considerations:",
            items: [
              "Alignment with personal values and beliefs",
              "Potential for competitive returns",
              "Growing variety of investment options",
              "May have higher fees than traditional funds",
              "Possible concentration in certain sectors",
              "Important to understand specific screening criteria",
            ],
          },
          {
            type: "tip",
            content:
              "Research the specific screening criteria of SRI funds to ensure they align with your values. Different funds may have different definitions of what constitutes socially responsible investing.",
          },
        ],
        keyTakeaways: [
          "SRI uses ethical and social criteria for investment selection",
          "Can exclude objectionable industries or favor positive practices",
          "Multiple screening approaches available",
          "Performance can be competitive with traditional investing",
        ],
        quiz: {
          questions: [
            {
              question: "What is negative screening in SRI?",
              options: [
                "Looking for companies with poor performance",
                "Excluding industries or companies based on ethical criteria",
                "Investing only in declining sectors",
                "Focusing on companies with negative news",
              ],
              correctAnswer: "Excluding industries or companies based on ethical criteria",
              explanation: "Negative screening involves excluding certain industries or companies from investment consideration based on ethical, social, or environmental criteria.",
            },
          ],
        },
      },
      {
        title: "Building a Sustainable Portfolio",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Creating a Diversified Sustainable Investment Strategy",
          },
          {
            type: "paragraph",
            content:
              "Building a sustainable portfolio requires balancing your values with sound investment principles like diversification and risk management. The goal is to create a portfolio that reflects your beliefs while still achieving your financial objectives.",
          },
          {
            type: "list",
            content: "Sustainable portfolio components:",
            items: [
              "ESG equity funds for stock exposure",
              "Green bonds for fixed-income allocation",
              "Impact investments for targeted outcomes",
              "SRI funds aligned with your values",
              "International sustainable funds for global exposure",
              "Sector-specific funds (clean energy, water, etc.)",
            ],
          },
          {
            type: "list",
            content: "Portfolio construction principles:",
            items: [
              "Maintain diversification across asset classes",
              "Consider geographic diversification",
              "Balance growth and income investments",
              "Match risk level to your timeline and tolerance",
              "Don't sacrifice too much return for values alignment",
              "Regular rebalancing to maintain target allocation",
            ],
          },
          {
            type: "example",
            content:
              "Emma builds a sustainable portfolio: 60% ESG stock funds, 30% green bonds, 10% impact investments. This provides diversification while aligning with her environmental and social values.",
          },
          {
            type: "list",
            content: "Age-based sustainable allocation:",
            items: [
              "Young investors: Higher allocation to growth-oriented ESG funds",
              "Middle-aged: Balanced mix of ESG stocks and green bonds",
              "Pre-retirement: More conservative with green bonds and stable ESG funds",
              "Retirement: Income focus with dividend-paying ESG stocks and bonds",
              "Adjust based on personal risk tolerance",
              "Consider target-date ESG funds for simplicity",
            ],
          },
          {
            type: "list",
            content: "Common portfolio mistakes to avoid:",
            items: [
              "Over-concentration in one sustainable theme",
              "Ignoring traditional diversification principles",
              "Paying excessive fees for sustainable options",
              "Not researching fund holdings and criteria",
              "Letting values override sound investment principles",
              "Failing to monitor and rebalance regularly",
            ],
          },
          {
            type: "list",
            content: "Monitoring your sustainable portfolio:",
            items: [
              "Track both financial and impact performance",
              "Review fund holdings and screening criteria regularly",
              "Stay informed about changes in fund management",
              "Assess whether investments still align with your values",
              "Compare performance to relevant benchmarks",
              "Adjust allocation as your priorities evolve",
            ],
          },
          {
            type: "tip",
            content:
              "Start with broad-based ESG funds for your core holdings, then add more specialized sustainable investments as you learn more about the space and your preferences become clearer.",
          },
        ],
        keyTakeaways: [
          "Sustainable portfolios should maintain diversification principles",
          "Balance values alignment with financial objectives",
          "Consider age-appropriate allocation strategies",
          "Monitor both financial and impact performance",
        ],
        quiz: {
          questions: [
            {
              question: "What should be the foundation of a sustainable investment portfolio?",
              options: [
                "Only impact investments",
                "Broad-based ESG funds with proper diversification",
                "Single-sector sustainable funds",
                "Only green bonds",
              ],
              correctAnswer: "Broad-based ESG funds with proper diversification",
              explanation: "A sustainable portfolio should start with broad-based ESG funds that provide diversification while incorporating sustainable principles, then add more specialized investments as appropriate.",
            },
          ],
        },
      },
    ],
    "taxes": [
      {
        title: "Understanding Tax Basics",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "How the Tax System Works",
          },
          {
            type: "paragraph",
            content:
              "Understanding basic tax concepts helps you make informed financial decisions and avoid costly mistakes. For young adults, learning about taxes early can save money and reduce stress during tax season.",
          },
          {
            type: "list",
            content: "Key tax terms:",
            items: [
              "Gross income: All income before deductions",
              "Adjusted Gross Income (AGI): Income after certain deductions",
              "Taxable income: AGI minus standard or itemized deductions",
              "Tax liability: Amount of tax you owe",
              "Withholding: Taxes taken from your paycheck",
              "Refund: Money returned if you overpaid taxes",
            ],
          },
          {
            type: "list",
            content: "Types of income:",
            items: [
              "Earned income: Wages, salaries, tips, self-employment",
              "Investment income: Interest, dividends, capital gains",
              "Passive income: Rental income, royalties",
              "Retirement income: 401(k), IRA distributions",
              "Other income: Unemployment, gambling winnings",
              "Tax-free income: Municipal bond interest, Roth IRA withdrawals",
            ],
          },
          {
            type: "example",
            content:
              "Sarah earns $50,000 in wages, $500 in bank interest, and $200 in dividends. Her gross income is $50,700. After the standard deduction of $13,850, her taxable income is $36,850.",
          },
          {
            type: "list",
            content: "Progressive tax system:",
            items: [
              "Higher income is taxed at higher rates",
              "Tax brackets determine rates for different income levels",
              "Only income in each bracket is taxed at that rate",
              "Marginal tax rate: Rate on your last dollar of income",
              "Effective tax rate: Average rate on all your income",
              "Understanding brackets helps with tax planning",
            ],
          },
          {
            type: "list",
            content: "Common tax misconceptions:",
            items: [
              "Myth: Higher bracket means all income taxed at higher rate",
              "Truth: Only income in that bracket is taxed at the higher rate",
              "Myth: Overtime or bonuses aren't worth it due to taxes",
              "Truth: More income is always better, even after taxes",
              "Myth: Getting a refund means you're good at taxes",
              "Truth: Refunds mean you overpaid during the year",
            ],
          },
          {
            type: "tip",
            content:
              "Don't be afraid of moving into a higher tax bracket. Only the income above the bracket threshold is taxed at the higher rate, not your entire income.",
          },
        ],
        keyTakeaways: [
          "The US uses a progressive tax system with increasing rates",
          "Only income in each bracket is taxed at that bracket's rate",
          "Understanding AGI and taxable income helps with planning",
          "Different types of income may be taxed differently",
        ],
        quiz: {
          questions: [
            {
              question: "In a progressive tax system, what happens when you move to a higher tax bracket?",
              options: [
                "All your income is taxed at the higher rate",
                "Only income above the bracket threshold is taxed at the higher rate",
                "You pay less in taxes",
                "Your previous income is taxed again",
              ],
              correctAnswer: "Only income above the bracket threshold is taxed at the higher rate",
              explanation: "In a progressive tax system, only the income that falls within each bracket is taxed at that bracket's rate, not your entire income.",
            },
          ],
        },
      },
      {
        title: "Tax Forms and Documentation",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Understanding Tax Forms and Record Keeping",
          },
          {
            type: "paragraph",
            content:
              "Proper documentation and understanding of tax forms are essential for accurate tax filing. Knowing what forms you need and how to organize your tax documents can save time and prevent errors.",
          },
          {
            type: "list",
            content: "Common tax forms you'll receive:",
            items: [
              "W-2: Wages and tax withholding from employers",
              "1099-INT: Interest income from banks",
              "1099-DIV: Dividend income from investments",
              "1099-B: Proceeds from broker transactions",
              "1099-NEC: Non-employee compensation (freelance work)",
              "1098: Mortgage interest paid",
            ],
          },
          {
            type: "list",
            content: "Forms you'll file:",
            items: [
              "Form 1040: Main individual tax return",
              "Schedule A: Itemized deductions",
              "Schedule B: Interest and dividend income",
              "Schedule C: Business income and expenses",
              "Schedule D: Capital gains and losses",
              "Form 8606: Nondeductible IRA contributions",
            ],
          },
          {
            type: "example",
            content:
              "Mike receives a W-2 from his employer showing $45,000 in wages and $6,000 in federal tax withholding. He also gets a 1099-INT showing $150 in bank interest. He'll report both on his Form 1040.",
          },
          {
            type: "list",
            content: "Documents to keep for taxes:",
            items: [
              "All tax forms (W-2s, 1099s, etc.)",
              "Receipts for deductible expenses",
              "Bank and investment statements",
              "Records of estimated tax payments",
              "Previous year's tax return",
              "Documentation for any tax credits claimed",
            ],
          },
          {
            type: "list",
            content: "Record keeping best practices:",
            items: [
              "Create a dedicated tax folder or digital file",
              "Organize documents by category",
              "Keep records for at least 3 years after filing",
              "Scan important documents for backup",
              "Track deductible expenses throughout the year",
              "Keep receipts for charitable donations",
            ],
          },
          {
            type: "list",
            content: "Digital organization tips:",
            items: [
              "Use cloud storage for backup",
              "Create folders by tax year",
              "Scan receipts with smartphone apps",
              "Use spreadsheets to track deductible expenses",
              "Set up automatic downloads from financial institutions",
              "Consider tax preparation software for organization",
            ],
          },
          {
            type: "tip",
            content:
              "Start organizing your tax documents in January. Create a system to collect and organize tax-related documents throughout the year to make filing season less stressful.",
          },
        ],
        keyTakeaways: [
          "Different forms report different types of income",
          "Keep organized records throughout the year",
          "Maintain tax documents for at least 3 years",
          "Digital organization can simplify record keeping",
        ],
        quiz: {
          questions: [
            {
              question: "What form reports wages and tax withholding from your employer?",
              options: ["1099-INT", "W-2", "1040", "Schedule A"],
              correctAnswer: "W-2",
              explanation: "Form W-2 reports wages, salaries, and tax withholding from your employer and is one of the most important tax documents for employees.",
            },
          ],
        },
      },
      {
        title: "Deductions and Credits",
        duration: "6 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Reducing Your Tax Bill",
          },
          {
            type: "paragraph",
            content:
              "Tax deductions and credits both reduce your tax bill, but they work differently. Understanding the difference and knowing what you qualify for can significantly impact your tax liability.",
          },
          {
            type: "list",
            content: "Deductions vs. Credits:",
            items: [
              "Deductions: Reduce your taxable income",
              "Credits: Directly reduce your tax owed",
              "Credits are generally more valuable than deductions",
              "Example: $1,000 deduction saves $220 in 22% bracket",
              "Example: $1,000 credit saves $1,000 in taxes",
              "Some credits are refundable, some are not",
            ],
          },
          {
            type: "list",
            content: "Standard vs. itemized deductions:",
            items: [
              "Standard deduction: Fixed amount based on filing status",
              "2024 standard deduction: $13,850 (single), $27,700 (married)",
              "Itemized deductions: Specific expenses you can deduct",
              "Choose whichever is higher",
              "Most taxpayers use the standard deduction",
              "Itemizing makes sense if deductions exceed standard amount",
            ],
          },
          {
            type: "list",
            content: "Common itemized deductions:",
            items: [
              "State and local taxes (SALT) - limited to $10,000",
              "Mortgage interest on home loans",
              "Charitable contributions",
              "Medical expenses exceeding 7.5% of AGI",
              "Casualty and theft losses from disasters",
              "Unreimbursed employee expenses (limited)",
            ],
          },
          {
            type: "example",
            content:
              "Lisa's itemized deductions total $16,000 ($8,000 mortgage interest, $5,000 state taxes, $3,000 charity). Since this exceeds the $13,850 standard deduction, she itemizes and saves taxes on an extra $2,150.",
          },
          {
            type: "list",
            content: "Common tax credits:",
            items: [
              "Earned Income Tax Credit (EITC) - for lower-income workers",
              "Child Tax Credit - up to $2,000 per qualifying child",
              "American Opportunity Tax Credit - for college expenses",
              "Lifetime Learning Credit - for continuing education",
              "Child and Dependent Care Credit - for childcare expenses",
              "Saver's Credit - for retirement contributions",
            ],
          },
          {
            type: "list",
            content: "Maximizing deductions and credits:",
            items: [
              "Keep detailed records of deductible expenses",
              "Time charitable contributions strategically",
              "Consider bunching deductions in alternating years",
              "Maximize retirement contributions for deductions",
              "Understand income limits for various credits",
              "Don't overlook education-related credits",
            ],
          },
          {
            type: "tip",
            content:
              "Track your potential itemized deductions throughout the year. If you're close to the standard deduction amount, you might be able to time certain expenses to exceed the threshold.",
          },
        ],
        keyTakeaways: [
          "Credits are more valuable than deductions",
          "Most people benefit from the standard deduction",
          "Keep records of potential deductible expenses",
          "Understand income limits for credits and deductions",
        ],
        quiz: {
          questions: [
            {
              question: "What's the difference between a tax deduction and a tax credit?",
              options: [
                "There is no difference",
                "Deductions reduce taxable income, credits directly reduce tax owed",
                "Credits reduce taxable income, deductions reduce tax owed",
                "Deductions are always better than credits",
              ],
              correctAnswer: "Deductions reduce taxable income, credits directly reduce tax owed",
              explanation: "Deductions reduce your taxable income (saving you taxes at your marginal rate), while credits directly reduce the amount of tax you owe dollar-for-dollar.",
            },
          ],
        },
      },
      {
        title: "Filing Your Tax Return",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Completing and Submitting Your Return",
          },
          {
            type: "paragraph",
            content:
              "Filing your tax return accurately and on time is crucial to avoid penalties and interest. Understanding your options for filing and the process involved helps ensure a smooth tax season.",
          },
          {
            type: "list",
            content: "Filing options:",
            items: [
              "Free File: IRS program for simple returns",
              "Tax preparation software (TurboTax, H&R Block, etc.)",
              "Professional tax preparer or CPA",
              "Paper filing (not recommended)",
              "IRS Volunteer Income Tax Assistance (VITA)",
              "Online tax services",
            ],
          },
          {
            type: "list",
            content: "When to file:",
            items: [
              "Tax deadline: Usually April 15th",
              "File early if expecting a refund",
              "Extension available until October 15th",
              "Extension to file is not extension to pay",
              "Estimated taxes due quarterly if self-employed",
              "Amended returns can be filed if errors discovered",
            ],
          },
          {
            type: "example",
            content:
              "Tom uses tax software to file his return in February. He e-files and chooses direct deposit for his $1,200 refund, which he receives within 3 weeks instead of waiting months for a paper check.",
          },
          {
            type: "list",
            content: "E-filing benefits:",
            items: [
              "Faster processing and refunds",
              "Immediate confirmation of receipt",
              "More accurate (software catches errors)",
              "Direct deposit available for refunds",
              "Electronic record keeping",
              "Environmentally friendly",
            ],
          },
          {
            type: "list",
            content: "Common filing mistakes:",
            items: [
              "Math errors and incorrect calculations",
              "Wrong or missing Social Security numbers",
              "Incorrect bank account information for direct deposit",
              "Missing signatures on paper returns",
              "Filing with wrong status or exemptions",
              "Forgetting to attach required forms",
            ],
          },
          {
            type: "list",
            content: "After filing checklist:",
            items: [
              "Keep copies of your return and supporting documents",
              "Track your refund status if expecting one",
              "Pay any taxes owed by the deadline",
              "Update withholding if needed for next year",
              "Start organizing documents for next year",
              "Consider tax planning strategies for next year",
            ],
          },
          {
            type: "tip",
            content:
              "E-file your return for faster processing and fewer errors. If you're expecting a refund, filing early and choosing direct deposit gets your money fastest.",
          },
        ],
        keyTakeaways: [
          "E-filing is faster and more accurate than paper filing",
          "File early if expecting a refund",
          "Extensions are for filing, not paying taxes owed",
          "Keep copies of returns and supporting documents",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main benefit of e-filing your tax return?",
              options: [
                "It costs less money",
                "Faster processing and fewer errors",
                "You don't need to keep records",
                "You can file after the deadline",
              ],
              correctAnswer: "Faster processing and fewer errors",
              explanation: "E-filing provides faster processing, immediate confirmation, and the software helps catch errors before submission, making it superior to paper filing.",
            },
          ],
        },
      },
      {
        title: "Tax Planning Strategies",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Minimizing Your Tax Burden Legally",
          },
          {
            type: "paragraph",
            content:
              "Tax planning involves making strategic decisions throughout the year to minimize your tax liability. Understanding basic tax planning strategies can save you money and help you keep more of what you earn.",
          },
          {
            type: "list",
            content: "Retirement account strategies:",
            items: [
              "Maximize 401(k) contributions to reduce current taxes",
              "Consider Roth IRA for tax-free retirement income",
              "Take advantage of employer matching",
              "Use HSA for triple tax advantage",
              "Consider traditional vs. Roth based on current/future tax rates",
              "Don't forget catch-up contributions if over 50",
            ],
          },
          {
            type: "list",
            content: "Investment tax strategies:",
            items: [
              "Hold investments over one year for long-term capital gains rates",
              "Use tax-loss harvesting to offset gains",
              "Consider tax-efficient index funds",
              "Place tax-inefficient investments in retirement accounts",
              "Time the sale of investments strategically",
              "Understand wash sale rules",
            ],
          },
          {
            type: "example",
            content:
              "Emma increases her 401(k) contribution from 6% to 10%, reducing her taxable income by $2,000. In the 22% tax bracket, this saves her $440 in taxes while boosting her retirement savings.",
          },
          {
            type: "list",
            content: "Timing strategies:",
            items: [
              "Accelerate deductions into high-income years",
              "Defer income to lower-tax years if possible",
              "Bunch charitable contributions in alternating years",
              "Time medical expenses to exceed AGI threshold",
              "Consider year-end tax moves",
              "Plan around life changes (marriage, job change)",
            ],
          },
          {
            type: "list",
            content: "Business and side hustle strategies:",
            items: [
              "Track all business expenses for deductions",
              "Consider home office deduction if applicable",
              "Maximize business retirement plan contributions",
              "Understand self-employment tax implications",
              "Keep detailed records of business activities",
              "Consider business structure for tax efficiency",
            ],
          },
          {
            type: "list",
            content: "Year-end tax planning:",
            items: [
              "Review withholding and make adjustments",
              "Maximize retirement contributions before deadline",
              "Consider Roth IRA conversions",
              "Harvest tax losses in investment accounts",
              "Make charitable contributions before year-end",
              "Prepay deductible expenses if beneficial",
            ],
          },
          {
            type: "tip",
            content:
              "Start tax planning early in the year, not just at year-end. Many strategies require time to implement effectively, and waiting until December limits your options.",
          },
        ],
        keyTakeaways: [
          "Retirement contributions are powerful tax reduction tools",
          "Investment timing can significantly impact taxes",
          "Year-end planning provides last-minute opportunities",
          "Keep detailed records for business deductions",
        ],
        quiz: {
          questions: [
            {
              question: "What is tax-loss harvesting?",
              options: [
                "Avoiding all investment losses",
                "Selling losing investments to offset taxable gains",
                "Only investing in tax-free accounts",
                "Waiting until retirement to sell investments",
              ],
              correctAnswer: "Selling losing investments to offset taxable gains",
              explanation: "Tax-loss harvesting involves selling investments at a loss to offset capital gains, reducing your overall tax liability while maintaining your investment strategy.",
            },
          ],
        },
      },
      {
        title: "Common Tax Mistakes to Avoid",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Preventing Costly Tax Errors",
          },
          {
            type: "paragraph",
            content:
              "Tax mistakes can be costly, resulting in penalties, interest, and missed opportunities for savings. Understanding common errors helps you avoid them and file accurate returns.",
          },
          {
            type: "list",
            content: "Filing and calculation errors:",
            items: [
              "Math errors in calculations",
              "Wrong Social Security numbers",
              "Incorrect filing status",
              "Missing or incorrect bank account information",
              "Forgetting to sign paper returns",
              "Using outdated tax forms",
            ],
          },
          {
            type: "list",
            content: "Income reporting mistakes:",
            items: [
              "Forgetting to report all income sources",
              "Not reporting cash income or tips",
              "Incorrectly reporting investment income",
              "Missing 1099 forms from various sources",
              "Failing to report side hustle income",
              "Incorrectly handling cryptocurrency transactions",
            ],
          },
          {
            type: "example",
            content:
              "Jake forgot to report $800 in freelance income because he didn't receive a 1099. The IRS matched the payment to his SSN and sent him a bill for additional taxes plus penalties and interest.",
          },
          {
            type: "list",
            content: "Deduction and credit errors:",
            items: [
              "Claiming ineligible deductions",
              "Overstating charitable contributions",
              "Missing valuable credits you qualify for",
              "Incorrectly calculating education credits",
              "Not keeping proper documentation",
              "Double-counting the same expense",
            ],
          },
          {
            type: "list",
            content: "Record keeping mistakes:",
            items: [
              "Not keeping receipts for deductions",
              "Poor organization of tax documents",
              "Throwing away important tax records too early",
              "Not backing up digital records",
              "Mixing personal and business expenses",
              "Failing to track basis in investments",
            ],
          },
          {
            type: "list",
            content: "How to avoid mistakes:",
            items: [
              "Use tax software to catch errors",
              "Double-check all numbers and calculations",
              "Keep organized records throughout the year",
              "Review your return before filing",
              "Consider professional help for complex situations",
              "File electronically when possible",
            ],
          },
          {
            type: "tip",
            content:
              "Take your time when preparing your return. Most errors come from rushing or not carefully reviewing the information before filing. Use tax software to help catch common mistakes.",
          },
        ],
        keyTakeaways: [
          "Math errors and missing information are common mistakes",
          "Report all income, even if you don't receive a 1099",
          "Keep detailed records to support deductions",
          "Review your return carefully before filing",
        ],
        quiz: {
          questions: [
            {
              question: "What should you do if you don't receive a 1099 for income you earned?",
              options: [
                "Don't report the income",
                "Wait for the 1099 to arrive",
                "Report the income anyway",
                "Only report it if it's over $1,000",
              ],
              correctAnswer: "Report the income anyway",
              explanation: "You must report all income you earned, regardless of whether you receive a 1099 form. The IRS may have records of payments made to you.",
            },
          ],
        },
      },
      {
        title: "Tax Software and Professional Help",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Choosing the Right Tax Preparation Method",
          },
          {
            type: "paragraph",
            content:
              "Deciding how to prepare your taxes depends on the complexity of your situation, your comfort level, and your budget. Understanding your options helps you choose the best approach for your needs.",
          },
          {
            type: "list",
            content: "Tax software options:",
            items: [
              "Free options: IRS Free File, Credit Karma Tax",
              "Paid software: TurboTax, H&R Block, TaxAct",
              "Features: Error checking, interview format, e-filing",
              "Mobile apps available for simple returns",
              "Import capabilities from financial institutions",
              "Audit support and guarantees available",
            ],
          },
          {
            type: "list",
            content: "When to use tax software:",
            items: [
              "Straightforward tax situation",
              "W-2 income with standard deduction",
              "Basic investment income",
              "Comfortable with technology",
              "Want to save money on preparation fees",
              "Prefer to maintain control over the process",
            ],
          },
          {
            type: "example",
            content:
              "Maria uses free tax software for her simple return with W-2 income and student loan interest. The software guides her through each step and e-files her return for free, saving her $200 in preparation fees.",
          },
          {
            type: "list",
            content: "When to consider professional help:",
            items: [
              "Complex tax situations (business, rental property)",
              "Major life changes (marriage, divorce, new baby)",
              "Large investment transactions",
              "Tax problems or audits",
              "Self-employment income",
              "Multiple states or international income",
            ],
          },
          {
            type: "list",
            content: "Types of tax professionals:",
            items: [
              "Certified Public Accountant (CPA): Highest credential",
              "Enrolled Agent (EA): IRS-licensed tax specialist",
              "Tax attorney: For legal tax issues",
              "Annual Filing Season Program participants",
              "Volunteer Income Tax Assistance (VITA): Free for eligible taxpayers",
              "Chain tax preparers: Convenient but variable quality",
            ],
          },
          {
            type: "list",
            content: "Choosing a tax professional:",
            items: [
              "Check credentials and qualifications",
              "Ask about fees upfront",
              "Ensure they sign your return",
              "Verify they have a PTIN (Preparer Tax ID)",
              "Ask about their experience with your situation",
              "Get references from other clients",
            ],
          },
          {
            type: "tip",
            content:
              "Start with tax software if your situation is straightforward. You can always switch to a professional if your taxes become more complex or if you encounter issues you can't handle.",
          },
        ],
        keyTakeaways: [
          "Tax software works well for straightforward situations",
          "Professional help is valuable for complex tax situations",
          "Check credentials when choosing a tax professional",
          "Free options are available for simple returns",
        ],
        quiz: {
          questions: [
            {
              question: "When might you need professional tax help instead of using software?",
              options: [
                "You have only W-2 income",
                "You have complex business income or major life changes",
                "You want to save money",
                "You're comfortable with technology",
              ],
              correctAnswer: "You have complex business income or major life changes",
              explanation: "Complex situations like business income, rental properties, or major life changes often benefit from professional expertise that software may not adequately address.",
            },
          ],
        },
      },
    ],
    "estate-planning": [
      {
        title: "Estate Planning Basics",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Why Estate Planning Matters",
          },
          {
            type: "paragraph",
            content:
              "Estate planning is the process of arranging for the management and disposal of your assets during your life and after death. While young adults often think estate planning is only for the wealthy or elderly, everyone needs basic estate planning documents.",
          },
          {
            type: "list",
            content: "What estate planning covers:",
            items: [
              "Distribution of assets after death",
              "Care of minor children",
              "Medical decisions if you're incapacitated",
              "Financial decisions if you can't make them",
              "Minimizing taxes and probate costs",
              "Protecting beneficiaries from creditors",
            ],
          },
          {
            type: "list",
            content: "Why young adults need estate planning:",
            items: [
              "Accidents and illnesses can happen at any age",
              "Protects assets you've worked hard to build",
              "Ensures your wishes are followed",
              "Prevents family conflicts and confusion",
              "Provides for dependents or loved ones",
              "Avoids costly and time-consuming probate",
            ],
          },
          {
            type: "example",
            content:
              "Sarah, 28, has $50,000 in savings and a 401(k). Without a will, state law determines who inherits her assets, which might not align with her wishes to leave everything to her partner rather than her estranged parents.",
          },
          {
            type: "list",
            content: "Consequences of not having an estate plan:",
            items: [
              "State laws determine asset distribution",
              "Court appoints guardian for minor children",
              "Family members may fight over decisions",
              "Higher costs and longer delays",
              "No control over medical or financial decisions",
              "Potential tax inefficiencies",
            ],
          },
          {
            type: "list",
            content: "Basic estate planning documents:",
            items: [
              "Will: Directs distribution of assets",
              "Power of attorney: Financial decision-making",
              "Healthcare directive: Medical decision-making",
              "HIPAA authorization: Medical information access",
              "Beneficiary designations: Retirement accounts, insurance",
              "Trust documents (if applicable)",
            ],
          },
          {
            type: "tip",
            content:
              "Start with basic documents like a will and power of attorney. Even simple estate planning is better than none, and you can always update your plan as your life changes.",
          },
        ],
        keyTakeaways: [
          "Estate planning is important at any age and wealth level",
          "Basic documents protect you and your loved ones",
          "Without planning, state laws determine asset distribution",
          "Start simple and update as your situation changes",
        ],
        quiz: {
          questions: [
            {
              question: "Why do young adults need estate planning?",
              options: [
                "Only if they're wealthy",
                "Accidents and illnesses can happen at any age",
                "It's required by law",
                "Only if they have children",
              ],
              correctAnswer: "Accidents and illnesses can happen at any age",
              explanation: "Estate planning is important for young adults because unexpected events can occur at any age, and having documents in place protects both you and your loved ones.",
            },
          ],
        },
      },
      {
        title: "Wills and Testaments",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Your Most Important Estate Planning Document",
          },
          {
            type: "paragraph",
            content:
              "A will is a legal document that specifies how you want your assets distributed after death and who should care for your minor children. It's the foundation of any estate plan and ensures your wishes are carried out.",
          },
          {
            type: "list",
            content: "What a will covers:",
            items: [
              "Distribution of assets and property",
              "Appointment of executor to manage your estate",
              "Guardianship of minor children",
              "Care instructions for pets",
              "Funeral and burial preferences",
              "Forgiveness of debts owed to you",
            ],
          },
          {
            type: "list",
            content: "What a will cannot do:",
            items: [
              "Override beneficiary designations on accounts",
              "Distribute jointly owned property",
              "Control assets in a trust",
              "Make binding healthcare decisions",
              "Avoid probate entirely",
              "Provide for your own incapacity",
            ],
          },
          {
            type: "example",
            content:
              "Mike's will leaves his house to his sister, his savings to his nephew, and appoints his brother as executor. He also names his sister as guardian for his young daughter and includes instructions for his pet's care.",
          },
          {
            type: "list",
            content: "Types of wills:",
            items: [
              "Simple will: Basic asset distribution",
              "Pour-over will: Works with a trust",
              "Joint will: Shared by married couples (not recommended)",
              "Living will: Healthcare directives (different document)",
              "Holographic will: Handwritten (limited validity)",
              "Statutory will: State-provided forms",
            ],
          },
          {
            type: "list",
            content: "Will requirements:",
            items: [
              "Must be in writing (except rare oral wills)",
              "Signed by the testator (will maker)",
              "Witnessed by required number of people",
              "Witnesses must be disinterested parties",
              "Testator must be of sound mind",
              "Must follow state-specific requirements",
            ],
          },
          {
            type: "list",
            content: "Updating your will:",
            items: [
              "Review every 3-5 years or after major life events",
              "Marriage, divorce, birth of children",
              "Significant changes in assets",
              "Moving to a different state",
              "Death of beneficiaries or executor",
              "Changes in tax laws",
            ],
          },
          {
            type: "tip",
            content:
              "Don't delay creating a will because you think your situation isn't complex enough. Even a simple will is better than no will, and you can always update it as your life changes.",
          },
        ],
        keyTakeaways: [
          "A will is the foundation of estate planning",
          "It controls asset distribution and child guardianship",
          "Must meet specific legal requirements to be valid",
          "Should be updated regularly as life changes",
        ],
        quiz: {
          questions: [
            {
              question: "What can a will NOT do?",
              options: [
                "Distribute your personal property",
                "Name a guardian for minor children",
                "Override beneficiary designations on retirement accounts",
                "Appoint an executor",
              ],
              correctAnswer: "Override beneficiary designations on retirement accounts",
              explanation: "Beneficiary designations on retirement accounts, life insurance, and other accounts override instructions in a will, which is why it's important to keep beneficiary forms updated.",
            },
          ],
        },
      },
      {
        title: "Power of Attorney Documents",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Protecting Yourself During Incapacity",
          },
          {
            type: "paragraph",
            content:
              "Power of attorney documents allow someone you trust to make financial and healthcare decisions on your behalf if you become unable to do so. These documents are crucial for protecting your interests during temporary or permanent incapacity.",
          },
          {
            type: "list",
            content: "Types of power of attorney:",
            items: [
              "Financial power of attorney: Money and property decisions",
              "Healthcare power of attorney: Medical decisions",
              "Durable: Remains valid if you become incapacitated",
              "Non-durable: Ends if you become incapacitated",
              "Springing: Only takes effect upon incapacity",
              "Immediate: Takes effect when signed",
            ],
          },
          {
            type: "list",
            content: "Financial power of attorney covers:",
            items: [
              "Banking and investment transactions",
              "Paying bills and managing expenses",
              "Filing tax returns",
              "Managing business interests",
              "Buying and selling property",
              "Making insurance decisions",
            ],
          },
          {
            type: "example",
            content:
              "Lisa is in a car accident and unconscious for two weeks. Her durable financial power of attorney allows her sister to pay her bills, manage her investments, and handle insurance claims while she recovers.",
          },
          {
            type: "list",
            content: "Healthcare power of attorney covers:",
            items: [
              "Medical treatment decisions",
              "Choice of healthcare providers",
              "Access to medical records",
              "Decisions about life support",
              "Mental health treatment",
              "Long-term care arrangements",
            ],
          },
          {
            type: "list",
            content: "Choosing your agent:",
            items: [
              "Someone you trust completely",
              "Financially responsible and organized",
              "Available and willing to serve",
              "Understands your values and wishes",
              "Lives reasonably close to you",
              "Consider naming alternate agents",
            ],
          },
          {
            type: "list",
            content: "Important considerations:",
            items: [
              "Discuss your wishes with your chosen agent",
              "Provide clear instructions and limitations",
              "Keep documents easily accessible",
              "Give copies to relevant parties",
              "Review and update regularly",
              "Consider separate agents for financial and healthcare decisions",
            ],
          },
          {
            type: "tip",
            content:
              "Choose your power of attorney agents carefully and have detailed conversations about your wishes. Make sure they understand the responsibility and are willing to act on your behalf.",
          },
        ],
        keyTakeaways: [
          "Power of attorney documents protect you during incapacity",
          "Financial and healthcare decisions can be handled separately",
          "Choose agents you trust completely",
          "Durable powers of attorney remain valid during incapacity",
        ],
        quiz: {
          questions: [
            {
              question: "What is the difference between durable and non-durable power of attorney?",
              options: [
                "Durable costs more money",
                "Durable remains valid if you become incapacitated",
                "Non-durable covers more decisions",
                "There is no difference",
              ],
              correctAnswer: "Durable remains valid if you become incapacitated",
              explanation: "A durable power of attorney remains in effect even if you become incapacitated, while a non-durable power of attorney ends if you become unable to make decisions.",
            },
          ],
        },
      },
      {
        title: "Healthcare Directives",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Advance Healthcare Planning",
          },
          {
            type: "paragraph",
            content:
              "Healthcare directives, also called advance directives or living wills, specify your wishes for medical treatment if you cannot communicate them yourself. These documents ensure your healthcare preferences are known and followed.",
          },
          {
            type: "list",
            content: "Types of healthcare directives:",
            items: [
              "Living will: Specific treatment preferences",
              "Healthcare power of attorney: Designates decision-maker",
              "HIPAA authorization: Medical information access",
              "DNR order: Do not resuscitate instructions",
              "POLST: Physician orders for life-sustaining treatment",
              "Organ donation directives",
            ],
          },
          {
            type: "list",
            content: "What living wills typically cover:",
            items: [
              "Life support and artificial nutrition",
              "Resuscitation preferences",
              "Pain management and comfort care",
              "Specific medical procedures",
              "Quality of life considerations",
              "Religious or personal beliefs about treatment",
            ],
          },
          {
            type: "example",
            content:
              "David's living will states he doesn't want artificial life support if he's in a persistent vegetative state. When he's in a coma after an accident, his family and doctors know his wishes and can make decisions accordingly.",
          },
          {
            type: "list",
            content: "Important decisions to consider:",
            items: [
              "Artificial breathing and ventilators",
              "Feeding tubes and artificial nutrition",
              "Dialysis and other life-sustaining treatments",
              "Antibiotics for life-threatening infections",
              "Comfort care and pain medication",
