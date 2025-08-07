export interface LessonContent {
  title: string;
  duration: string;
  points: number;
  videoUrl?: string;
  content: Array<{
    type: "heading" | "paragraph" | "list" | "example" | "tip" | "chart";
    content: string;
    items?: string[];
  }>;
  keyTakeaways?: string[];
  quiz?: {
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: string;
      explanation: string;
    }>;
  };
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  progress: number;
  lessons: number;
  points: number;
  icon: any;
  color: string;
  completed: boolean;
  keyTopics?: string[];
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
  return learningModules.find((module) => module.id === moduleId) || null;
}

export function getLessonContent(moduleId: string, lessonIndex: number): LessonContent | null {
  const lessons: Record<string, LessonContent[]> = {
    "basics": [
      {
        title: "Understanding Money Flow",
        duration: "5 min",
        points: 10,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: [
          { type: "heading", content: "How Money Moves In and Out of Your Life" },
          { type: "paragraph", content: "Money flow is the movement of money into and out of your possession. It's essential to understand this flow to gain control over your finances. This involves tracking where your money comes from (income) and where it goes (expenses). By understanding your money flow, you can identify areas where you can save more and spend less, leading to better financial health." },
          { type: "list", content: "Money comes in from:", items: ["Job or work income: Salaries, wages, tips", "Allowance from parents: Regular or occasional payments", "Side hustles: Freelancing, part-time work, selling items", "Gifts or birthday money: Cash or checks received as gifts", "Investments: Dividends, interest, capital gains"] },
          { type: "list", content: "Money goes out for:", items: ["Basic needs: Housing, food, clothing, transportation", "Fun activities: Movies, games, eating out, entertainment", "School supplies: Books, materials, fees", "Savings for future goals: College, travel, emergency fund", "Unexpected expenses: Car repairs, medical bills, emergencies"] },
          { type: "example", content: "If you earn $500 from a part-time job and spend $400 on various things, you have $100 left over. This leftover money can be saved for a future goal or used for something special. Consider putting a portion of it towards an emergency fund or a long-term investment." },
          { type: "tip", content: "Track your money flow for one week using a budgeting app or a simple notebook. Categorize your income and expenses to see where your money is going. You'll be surprised by what you discover! Identify areas where you can cut back on spending and save more." },
        ],
        keyTakeaways: ["Money flows in from various sources like work, gifts, and investments", "Money flows out for needs, wants, and savings", "Understanding your money flow helps you make informed financial decisions", "Tracking money flow reveals spending patterns and areas for improvement"],
        quiz: { questions: [{ question: "What is the first step to taking control of your finances?", options: ["Getting a credit card", "Understanding how money flows in and out of your life", "Investing in stocks", "Getting a high-paying job"], correctAnswer: "Understanding how money flows in and out of your life", explanation: "Understanding your money flow helps you see where your money comes from and where it goes, which is essential for financial control." }] },
      },
      {
        title: "Needs vs Wants",
        duration: "5 min",
        points: 10,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: [
          { type: "heading", content: "Learning to Tell the Difference" },
          { type: "paragraph", content: "Distinguishing between needs and wants is a fundamental skill in personal finance. Needs are essential for survival and well-being, while wants are desires that enhance your lifestyle but are not necessary. Mastering this distinction helps you prioritize spending and make informed financial choices, especially when resources are limited." },
          { type: "list", content: "Needs are things you must have:", items: ["Food and water: Nutritious meals and hydration", "Safe place to live: Housing that provides shelter and security", "Basic clothing: Adequate attire for different weather conditions", "Transportation to school/work: Reliable means of getting around", "Healthcare when sick: Access to medical care and prescriptions"] },
          { type: "list", content: "Wants are things you'd like to have:", items: ["Latest smartphone or gadgets: Upgraded technology and devices", "Designer clothes or shoes: High-end fashion items", "Eating out at restaurants: Meals beyond basic sustenance", "Entertainment and games: Leisure activities and hobbies", "Luxury items and upgrades: Non-essential items that enhance comfort"] },
          { type: "example", content: "You need a phone to stay connected with family and access important information, but you want the newest iPhone with all the latest features. A basic phone meets your need, while the iPhone is a want that costs significantly more. Consider a used or older model to save money and still meet your communication needs." },
          { type: "tip", content: "Before buying something, ask yourself: 'Do I need this or do I want this?' Wait 24 hours (or even a week) before buying wants to see if you still really want them. Often, the urge will pass, and you'll realize you don't need the item after all. This helps avoid impulse purchases and unnecessary spending." },
        ],
        keyTakeaways: ["Needs are essential for survival and basic functioning", "Wants are nice to have but not necessary", "Always cover needs before spending on wants", "The 24-hour rule helps avoid impulse purchases and promotes mindful spending"],
        quiz: { questions: [{ question: "Which of these is a 'need' rather than a 'want'?", options: ["Designer sneakers", "Basic food for nutrition", "Gaming console", "Premium streaming subscriptions"], correctAnswer: "Basic food for nutrition", explanation: "Food is essential for survival, making it a need. The other options are wants that enhance life but aren't necessary." }] },
      },
      {
        title: "The Power of Small Amounts",
        duration: "5 min",
        points: 10,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: [
          { type: "heading", content: "How Small Money Adds Up Big" },
          { type: "paragraph", content: "Small amounts of money might not seem important, but they can add up to surprising totals over time. This principle applies to both spending and saving. Being mindful of small expenses and consistently saving small amounts can make a significant difference in your financial well-being over the long term." },
          { type: "example", content: "Buying a $5 coffee every weekday costs $25 per week, $100 per month, and $1,200 per year. That's enough for a nice vacation or a substantial contribution to your emergency fund! Consider making coffee at home to save money and redirect those funds towards your financial goals." },
          { type: "list", content: "Small daily expenses that add up:", items: ["Snacks and drinks from vending machines: Chips, sodas, candy bars", "Coffee or energy drinks: Daily caffeine fix from coffee shops", "App purchases and subscriptions: Recurring charges for apps and services", "Convenience store items: Quick purchases at higher prices", "Impulse purchases under $20: Small, unplanned buys that add up"] },
          { type: "list", content: "Small savings that grow big:", items: ["Saving loose change in a jar: Collecting spare coins and depositing them", "Setting aside $2-3 per day: Small, consistent savings from daily income", "Keeping birthday money instead of spending it: Resisting the urge to spend gift money", "Saving money from not buying small items: Avoiding unnecessary purchases", "Putting away found money or refunds: Saving unexpected income"] },
          { type: "tip", content: "Try the 'latte factor' challenge: identify one small daily expense you can cut and save that money instead. Track how much you accumulate over a month, a year, or even longer. You'll be amazed at how much you accumulate! Use that money for a specific goal, like a new laptop, concert tickets, or a contribution to your retirement savings." },
        ],
        keyTakeaways: ["Small amounts of money add up to large totals over time", "Daily expenses can cost hundreds or thousands per year", "Small savings can build substantial emergency funds and investment portfolios", "Being aware of small expenses helps control spending and maximize savings"],
        quiz: { questions: [{ question: "If you spend $7 every weekday on lunch, how much do you spend per month (assuming 20 weekdays)?", options: ["$70", "$105", "$140", "$175"], correctAnswer: "$140", explanation: "$7 × 20 weekdays = $140 per month. Small daily expenses can quickly add up!" }] },
      },
      {
        title: "Building Good Money Habits",
        duration: "5 min",
        points: 10,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: [
          { type: "heading", content: "Creating Habits That Build Wealth" },
          { type: "paragraph", content: "Good money habits are like brushing your teeth – they become automatic and protect you over time. Building these habits early in life sets you up for financial success in the future. Consistency and discipline are key to developing and maintaining these habits." },
          { type: "list", content: "Essential money habits to develop:", items: ["Track where your money goes: Use a budgeting app, spreadsheet, or notebook to monitor your income and expenses", "Save something from every dollar you receive: Even a small amount, like 10%, can make a big difference over time", "Think before you buy anything: Avoid impulse purchases by waiting 24 hours before buying wants", "Compare prices before making purchases: Shop around to find the best deals and avoid overpaying", "Set aside money for goals and emergencies: Build a financial safety net to protect yourself from unexpected events"] },
          { type: "example", content: "Maria started saving $10 from every $50 she received. After one year, she had saved over $500 without even noticing because it became a habit. She used that money to buy a new laptop for college." },
          { type: "list", content: "How to build new money habits:", items: ["Start small: Even $1 saved is progress. Focus on building the habit first, then increase the amount", "Be consistent: Do it every time you receive money or make a purchase", "Make it easy: Use apps or automatic transfers to simplify the process", "Track your progress: Celebrate small wins and milestones to stay motivated", "Don't give up if you miss a day: Just restart and get back on track"] },
          { type: "tip", content: "Pick one money habit to focus on for the next 30 days. Once it becomes automatic, add another habit. Building habits slowly makes them stick better. Try automating your savings to make it easier and more consistent." },
        ],
        keyTakeaways: ["Good money habits become automatic over time", "Start with small, manageable habits", "Consistency is more important than perfection", "Young people have time to benefit from compound habits and build a strong financial foundation"],
        quiz: { questions: [{ question: "What's the most important factor in building good money habits?", options: ["Starting with large amounts", "Being perfect every day", "Consistency over time", "Having a high income"], correctAnswer: "Consistency over time", explanation: "Consistency is key to building lasting habits. Small, consistent actions compound over time to create significant results." }] },
      },
      {
        title: "Your Money Mindset",
        duration: "5 min",
        points: 10,
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content: [
          { type: "heading", content: "How You Think About Money Matters" },
          { type: "paragraph", content: "Your mindset about money affects every financial decision you make. Developing a healthy money mindset early in life will serve you well for years to come. A positive and growth-oriented mindset can help you overcome financial challenges and achieve your goals." },
          { type: "list", content: "Healthy money mindset beliefs:", items: ["Money is a tool to help achieve your goals: Travel, education, experiences", "You can learn to manage money well: It's a skill that can be developed with practice", "Saving money gives you freedom and choices: Future opportunities and financial security", "It's okay to spend on things you value: Experiences, hobbies, personal growth", "Everyone makes money mistakes - learn from them: Don't beat yourself up, focus on improvement"] },
          { type: "list", content: "Unhealthy money mindset beliefs:", items: ["Money is evil or bad: Negative associations with wealth", "I'm not good with money: Self-limiting belief that prevents learning", "Rich people are greedy: Stereotypes that create resentment", "I deserve to buy whatever I want: Entitlement and lack of financial discipline", "Money problems will solve themselves: Avoidance and lack of responsibility"] },
          { type: "example", content: "Instead of thinking 'I can't afford it,' try thinking 'How can I afford it?' This shifts your mind to finding solutions rather than giving up. Can you cut back on other expenses, find a side hustle, or negotiate a better price?" },
          { type: "tip", content: "Pay attention to what you tell yourself about money. Replace negative thoughts with positive, growth-oriented ones. Your future self will thank you! Read books, listen to podcasts, and follow financial experts to learn more and cultivate a healthy money mindset." },
        ],
        keyTakeaways: ["Your money mindset affects all your financial decisions", "Healthy mindsets focus on learning and growth", "Money is a neutral tool - how you use it matters", "You can change your money mindset with practice and positive self-talk"],
        quiz: { questions: [{ question: "Which mindset is healthiest when facing a financial challenge?", options: ["I'm just not good with money", "Money problems will solve themselves", "How can I learn to handle this better?", "Rich people have all the luck"], correctAnswer: "How can I learn to handle this better?", explanation: "A growth mindset focuses on learning and improvement, which leads to better financial outcomes over time." }] },
      },
    ],
  };

  const moduleContent = lessons[moduleId];
  if (!moduleContent || lessonIndex < 0 || lessonIndex >= moduleContent.length) {
    return null;
  }

  return moduleContent[lessonIndex];
}
