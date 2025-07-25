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
  },
]

export function getModuleById(moduleId: string): LearningModule | null {
  return learningModules.find((module) => module.id === moduleId) || null
}

export function getLessonContent(moduleId: string, lessonIndex: number): LessonContent | null {
  const lessons: Record<string, LessonContent[]> = {
    "sustainable-impact-investing": [
      {
        title: "What is ESG Investing?",
        duration: "5 min",
        points: 18,
        content: [
          {
            type: "heading",
            content: "Environmental, Social, and Governance Criteria",
          },
          {
            type: "paragraph",
            content:
              "ESG investing considers Environmental, Social, and Governance factors alongside financial returns. This approach allows you to align your investments with your values while still building wealth for the future.",
          },
          {
            type: "list",
            content: "Environmental factors include:",
            items: [
              "Climate change and carbon emissions",
              "Renewable energy and clean technology",
              "Water and waste management",
              "Pollution prevention and control",
              "Sustainable resource use",
              "Biodiversity and ecosystem protection",
            ],
          },
          {
            type: "list",
            content: "Social factors include:",
            items: [
              "Employee treatment and labor practices",
              "Diversity, equity, and inclusion",
              "Community relations and impact",
              "Product safety and quality",
              "Data protection and privacy",
              "Human rights and supply chain ethics",
            ],
          },
          {
            type: "list",
            content: "Governance factors include:",
            items: [
              "Board composition and independence",
              "Executive compensation practices",
              "Transparency and disclosure",
              "Anti-corruption policies",
              "Shareholder rights",
              "Risk management practices",
            ],
          },
          {
            type: "example",
            content:
              "A company like Patagonia scores well on ESG: Environmental (sustainable materials, carbon neutrality goals), Social (fair labor practices, activism), and Governance (transparent reporting, stakeholder engagement).",
          },
          {
            type: "tip",
            content:
              "ESG investing doesn't mean sacrificing returns. Many studies show that companies with strong ESG practices often outperform their peers over the long term.",
          },
        ],
        keyTakeaways: [
          "ESG considers environmental, social, and governance factors",
          "You can align investments with personal values",
          "Strong ESG practices often correlate with better long-term performance",
          "ESG investing covers a broad range of sustainability issues",
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
              explanation:
                "ESG stands for Environmental, Social, and Governance - the three main criteria used to evaluate sustainable and responsible investments.",
            },
          ],
        },
      },
      {
        title: "Impact Investing vs ESG Investing",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Understanding Different Approaches to Sustainable Investing",
          },
          {
            type: "paragraph",
            content:
              "While ESG and impact investing both consider sustainability, they have different goals and approaches. Understanding these differences helps you choose the right strategy for your values and financial goals.",
          },
          {
            type: "list",
            content: "ESG investing characteristics:",
            items: [
              "Integrates ESG factors into traditional investment analysis",
              "Primary goal is competitive financial returns",
              "Avoids companies with poor ESG practices",
              "Uses ESG data to identify risks and opportunities",
              "Broad market exposure with ESG screening",
              "Suitable for most investment portfolios",
            ],
          },
          {
            type: "list",
            content: "Impact investing characteristics:",
            items: [
              "Intentionally seeks positive social/environmental impact",
              "Measures and reports on impact outcomes",
              "May accept lower financial returns for greater impact",
              "Targets specific problems or solutions",
              "Often involves direct investment in impact-focused companies",
              "Requires more research and due diligence",
            ],
          },
          {
            type: "example",
            content:
              "ESG example: Investing in an ESG-screened S&P 500 fund that excludes tobacco and weapons companies. Impact example: Investing in a fund focused specifically on clean water solutions in developing countries.",
          },
          {
            type: "list",
            content: "Sustainable investing spectrum:",
            items: [
              "Negative screening: Excluding harmful industries",
              "ESG integration: Considering ESG factors in analysis",
              "Thematic investing: Focusing on sustainability themes",
              "Impact investing: Targeting measurable positive outcomes",
              "Shareholder advocacy: Using ownership to drive change",
              "Community investing: Supporting underserved communities",
            ],
          },
          {
            type: "tip",
            content:
              "You can combine approaches - use ESG funds for your core portfolio and allocate a smaller portion to specific impact investments that align with causes you care about most.",
          },
        ],
        keyTakeaways: [
          "ESG focuses on risk management and competitive returns",
          "Impact investing prioritizes measurable positive outcomes",
          "Both approaches can be part of a sustainable portfolio",
          "Choose based on your priorities and risk tolerance",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main difference between ESG and impact investing?",
              options: [
                "ESG is only for stocks, impact is only for bonds",
                "ESG focuses on returns, impact focuses on measurable outcomes",
                "ESG is riskier than impact investing",
                "There is no difference between them",
              ],
              correctAnswer: "ESG focuses on returns, impact focuses on measurable outcomes",
              explanation:
                "ESG investing primarily seeks competitive returns while considering sustainability factors, while impact investing specifically targets measurable positive social or environmental outcomes.",
            },
          ],
        },
      },
      {
        title: "Green Bonds and Climate Investing",
        duration: "5 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Financing the Transition to a Sustainable Economy",
          },
          {
            type: "paragraph",
            content:
              "Green bonds and climate-focused investments are rapidly growing sectors that allow investors to directly fund environmental solutions while earning returns. These investments are crucial for financing the transition to a low-carbon economy.",
          },
          {
            type: "list",
            content: "What are green bonds:",
            items: [
              "Bonds specifically earmarked for environmental projects",
              "Proceeds fund renewable energy, energy efficiency, clean transportation",
              "Same credit risk as regular bonds from the same issuer",
              "Growing market with increasing standardization",
              "Available from governments, corporations, and municipalities",
              "Often come with impact reporting requirements",
            ],
          },
          {
            type: "list",
            content: "Types of climate investments:",
            items: [
              "Renewable energy projects (solar, wind, hydro)",
              "Energy storage and grid modernization",
              "Electric vehicle and charging infrastructure",
              "Green building and energy efficiency",
              "Sustainable agriculture and forestry",
              "Water management and conservation",
            ],
          },
          {
            type: "example",
            content:
              "Apple issued $2.5 billion in green bonds to fund renewable energy projects, energy-efficient buildings, and recycling programs. Investors receive regular bond payments while supporting environmental initiatives.",
          },
          {
            type: "list",
            content: "Climate investment opportunities:",
            items: [
              "Green bond funds and ETFs",
              "Clean energy stocks and funds",
              "ESG-focused real estate investment trusts (REITs)",
              "Sustainable infrastructure funds",
              "Carbon credit investments",
              "Climate-focused venture capital funds",
            ],
          },
          {
            type: "list",
            content: "Evaluating green investments:",
            items: [
              "Verify legitimate environmental use of proceeds",
              "Look for third-party certification (Climate Bonds Initiative)",
              "Review impact reporting and transparency",
              "Assess financial strength of issuer",
              "Consider liquidity and market conditions",
              "Understand any premium or discount to market rates",
            ],
          },
          {
            type: "tip",
            content:
              "Start with diversified green bond funds or clean energy ETFs rather than individual securities. This provides exposure to the theme while reducing single-investment risk.",
          },
        ],
        keyTakeaways: [
          "Green bonds fund specific environmental projects",
          "Climate investing covers renewable energy, efficiency, and more",
          "These investments support the transition to a sustainable economy",
          "Diversified funds offer easier access than individual securities",
        ],
        quiz: {
          questions: [
            {
              question: "What makes a bond 'green'?",
              options: [
                "It's printed on green paper",
                "Proceeds are earmarked for environmental projects",
                "It has a higher interest rate",
                "It's only available to environmental companies",
              ],
              correctAnswer: "Proceeds are earmarked for environmental projects",
              explanation:
                "Green bonds are specifically designated to fund environmental projects like renewable energy, energy efficiency, and clean transportation.",
            },
          ],
        },
      },
      {
        title: "Socially Responsible Investing (SRI)",
        duration: "4 min",
        points: 16,
        content: [
          {
            type: "heading",
            content: "Aligning Investments with Personal Values",
          },
          {
            type: "paragraph",
            content:
              "Socially Responsible Investing (SRI) allows you to exclude investments that conflict with your values while seeking competitive returns. This approach has evolved from simple exclusions to sophisticated strategies that promote positive change.",
          },
          {
            type: "list",
            content: "Common SRI exclusions:",
            items: [
              "Tobacco and alcohol companies",
              "Weapons and defense contractors",
              "Fossil fuel companies",
              "Companies with poor labor practices",
              "Gambling and adult entertainment",
              "Companies involved in human rights violations",
            ],
          },
          {
            type: "list",
            content: "Positive screening criteria:",
            items: [
              "Companies with strong environmental records",
              "Businesses promoting diversity and inclusion",
              "Organizations with ethical supply chains",
              "Companies investing in employee development",
              "Businesses contributing to community development",
              "Organizations with transparent governance",
            ],
          },
          {
            type: "example",
            content:
              "The Vanguard ESG U.S. Stock ETF excludes companies involved in adult entertainment, alcohol, tobacco, weapons, fossil fuels, and gambling, while overweighting companies with strong ESG characteristics.",
          },
          {
            type: "list",
            content: "SRI investment options:",
            items: [
              "ESG-screened index funds",
              "Socially responsible mutual funds",
              "Faith-based investment funds",
              "Community development financial institutions (CDFIs)",
              "Shareholder advocacy funds",
              "Direct investment in social enterprises",
            ],
          },
          {
            type: "list",
            content: "Benefits and considerations:",
            items: [
              "Alignment with personal values and beliefs",
              "Potential for competitive long-term returns",
              "Support for positive social and environmental change",
              "May have slightly higher fees than traditional funds",
              "Could result in less diversification",
              "Performance may vary from broad market indices",
            ],
          },
          {
            type: "tip",
            content:
              "Define your values clearly before choosing SRI investments. What matters most to you - environmental issues, social justice, corporate governance, or specific exclusions?",
          },
        ],
        keyTakeaways: [
          "SRI excludes investments that conflict with your values",
          "Positive screening focuses on companies doing good",
          "Many SRI options are available across asset classes",
          "Performance can be competitive with traditional investing",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main goal of Socially Responsible Investing?",
              options: [
                "To maximize returns at any cost",
                "To align investments with personal values",
                "To only invest in government bonds",
                "To avoid all risk",
              ],
              correctAnswer: "To align investments with personal values",
              explanation:
                "SRI's primary goal is to align investment choices with personal values and beliefs while still seeking competitive financial returns.",
            },
          ],
        },
      },
      {
        title: "Building a Sustainable Portfolio",
        duration: "6 min",
        points: 22,
        content: [
          {
            type: "heading",
            content: "Creating a Diversified ESG Investment Strategy",
          },
          {
            type: "paragraph",
            content:
              "Building a sustainable portfolio requires balancing your values with sound investment principles. You can create a well-diversified, ESG-focused portfolio that aligns with your beliefs while pursuing your financial goals.",
          },
          {
            type: "list",
            content: "Core sustainable portfolio components:",
            items: [
              "ESG-screened broad market index funds",
              "International ESG funds for global diversification",
              "Green bonds or sustainable fixed income",
              "Clean energy and climate solution funds",
              "Sustainable real estate investment trusts (REITs)",
              "Small allocation to specific impact investments",
            ],
          },
          {
            type: "list",
            content: "Sample sustainable portfolio allocation:",
            items: [
              "40% - ESG U.S. Total Stock Market Fund",
              "20% - International ESG Developed Markets Fund",
              "10% - Emerging Markets ESG Fund",
              "20% - Green Bonds or ESG Fixed Income Fund",
              "5% - Clean Energy/Climate Solutions Fund",
              "5% - Sustainable REITs or Impact Investments",
            ],
          },
          {
            type: "example",
            content:
              "Sarah builds her sustainable portfolio with 70% ESG equity funds (split between U.S. and international), 25% green bonds, and 5% in a clean energy fund. This gives her broad diversification while aligning with her environmental values.",
          },
          {
            type: "list",
            content: "Key considerations for sustainable portfolios:",
            items: [
              "Maintain proper diversification across asset classes",
              "Consider expense ratios and fees",
              "Review ESG methodology and screening criteria",
              "Understand any tracking error vs. broad market",
              "Rebalance regularly to maintain target allocation",
              "Monitor impact reporting and outcomes",
            ],
          },
          {
            type: "list",
            content: "Common sustainable portfolio mistakes:",
            items: [
              "Over-concentrating in one ESG theme",
              "Ignoring traditional diversification principles",
              "Paying excessive fees for ESG labeling",
              "Not understanding what's actually excluded",
              "Expecting immediate outperformance",
              "Neglecting to rebalance regularly",
            ],
          },
          {
            type: "tip",
            content:
              "Start with a simple three-fund ESG portfolio: 60% ESG U.S. stocks, 20% ESG international stocks, and 20% green bonds. This provides broad diversification while aligning with sustainable values.",
          },
        ],
        keyTakeaways: [
          "Sustainable portfolios can be well-diversified and competitive",
          "Balance values alignment with sound investment principles",
          "Use core ESG funds with smaller thematic allocations",
          "Regular rebalancing maintains your target allocation",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most important principle when building a sustainable portfolio?",
              options: [
                "Only invest in the greenest companies",
                "Balance values alignment with diversification",
                "Avoid all traditional investments",
                "Focus only on maximum returns",
              ],
              correctAnswer: "Balance values alignment with diversification",
              explanation:
                "The key to successful sustainable investing is balancing your values with sound investment principles like diversification to build long-term wealth responsibly.",
            },
          ],
        },
      },
    ],
    basics: [
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
              "Money flows through your life like water through pipes. Understanding this flow is the first step to taking control of your finances.",
          },
          {
            type: "list",
            content: "Money comes in from:",
            items: [
              "Job or work income",
              "Allowance from parents",
              "Side hustles or part-time work",
              "Gifts or birthday money",
              "Selling items you no longer need",
            ],
          },
          {
            type: "list",
            content: "Money goes out for:",
            items: [
              "Basic needs (food, clothing, transportation)",
              "Fun activities (movies, games, hanging out)",
              "School supplies and materials",
              "Savings for future goals",
              "Unexpected expenses",
            ],
          },
          {
            type: "example",
            content:
              "If you earn $100 from a part-time job and spend $80 on various things, you have $20 left over. This leftover money can be saved or spent on something special.",
          },
          {
            type: "tip",
            content:
              "Track your money flow for one week. Write down every dollar that comes in and goes out. You'll be surprised by what you discover!",
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
              "One of the most important money skills is knowing the difference between what you need and what you want. This helps you make smart spending decisions.",
          },
          {
            type: "list",
            content: "Needs are things you must have:",
            items: [
              "Food and water",
              "Safe place to live",
              "Basic clothing",
              "Transportation to school/work",
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
              "You need a phone to stay connected, but you want the newest iPhone. A basic phone meets your need, while the iPhone is a want that costs much more.",
          },
          {
            type: "tip",
            content:
              "Before buying something, ask yourself: 'Do I need this or do I want this?' Wait 24 hours before buying wants to see if you still really want them.",
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
              "Small amounts of money might not seem important, but they can add up to surprising totals over time. This works for both spending and saving.",
          },
          {
            type: "example",
            content:
              "Buying a $3 coffee every school day costs $15 per week, $60 per month, and $540 per school year. That's enough for a nice vacation or emergency fund!",
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
              "Try the 'latte factor' challenge: identify one small daily expense you can cut and save that money instead. You'll be amazed at how much you accumulate!",
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
              "Good money habits are like brushing your teeth - they become automatic and protect you over time. Start building these habits now while you're young.",
          },
          {
            type: "list",
            content: "Essential money habits to develop:",
            items: [
              "Track where your money goes",
              "Save something from every dollar you receive",
              "Think before you buy anything",
              "Compare prices before making purchases",
              "Set aside money for goals and emergencies",
            ],
          },
          {
            type: "example",
            content:
              "Sarah started saving $5 from every $20 she received. After one year, she had saved over $200 without even noticing because it became a habit.",
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
              "Pick one money habit to focus on for the next 30 days. Once it becomes automatic, add another habit. Building habits slowly makes them stick better.",
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
              "Your mindset about money affects every financial decision you make. Developing a healthy money mindset early will serve you for life.",
          },
          {
            type: "list",
            content: "Healthy money mindset beliefs:",
            items: [
              "Money is a tool to help achieve your goals",
              "You can learn to manage money well",
              "Saving money gives you freedom and choices",
              "It's okay to spend on things you value",
              "Everyone makes money mistakes - learn from them",
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
              "Instead of thinking 'I can't afford it,' try thinking 'How can I afford it?' This shifts your mind to finding solutions rather than giving up.",
          },
          {
            type: "tip",
            content:
              "Pay attention to what you tell yourself about money. Replace negative thoughts with positive, growth-oriented ones. Your future self will thank you!",
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
              "A budget is simply a plan for your money. It tells your money where to go instead of wondering where it went. Budgeting is the foundation that makes all other financial goals possible.",
          },
          {
            type: "list",
            content: "Benefits of budgeting:",
            items: [
              "Reduces financial stress and anxiety",
              "Helps you reach your goals faster",
              "Prevents overspending and debt",
              "Shows you where your money really goes",
              "Gives you control over your finances",
              "Helps you prepare for emergencies",
            ],
          },
          {
            type: "example",
            content:
              "Without a budget, Jake spent $200 on random purchases and couldn't afford his $150 car payment. With a budget, he allocated money for his car first, then had $50 for fun spending.",
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
              "Think of a budget as giving yourself permission to spend, not restricting yourself. You're deciding in advance how to use your money for maximum happiness and success.",
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
              "The 50/30/20 rule is a simple budgeting framework that divides your after-tax income into three categories. It's perfect for beginners and provides a balanced approach to spending and saving.",
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
              "Minimum debt payments",
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
              "On a $3,000 monthly income: $1,500 for needs, $900 for wants, $600 for savings and extra debt payments. This ensures you cover essentials while still enjoying life and building wealth.",
          },
          {
            type: "list",
            content: "Savings & Debt (20% of income):",
            items: [
              "Emergency fund contributions",
              "Retirement savings (401k, IRA)",
              "Extra debt payments beyond minimums",
              "Short-term goal savings (vacation, car)",
              "Long-term investments",
            ],
          },
          {
            type: "tip",
            content:
              "If you can't fit your needs into 50%, look for ways to reduce housing costs or transportation expenses. These are usually the biggest budget items you can control.",
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
              "Zero-based budgeting means your income minus your expenses equals zero. Every dollar gets assigned a purpose before the month begins. This method ensures no money slips through the cracks.",
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
              "$2,500 income. Expenses: Rent $800, Food $300, Car $250, Insurance $100, Savings $400, Fun $350, Miscellaneous $300. Total: $2,500. Every dollar has a job!",
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
              "If you have money left over after assigning all expenses, put it toward your highest priority goal - usually emergency fund or debt payoff.",
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
              "You can't manage what you don't measure. Tracking your spending shows you exactly where your money goes and helps you make informed decisions about your budget.",
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
              "Maria thought she spent $200 on food monthly. After tracking for a month, she discovered she actually spent $350 - $150 on groceries and $200 on dining out. This awareness helped her adjust her budget.",
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
              "Track your spending for at least one full month before creating your budget. This gives you realistic numbers to work with instead of guessing.",
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
              "Irregular expenses are costs that don't happen every month but are predictable over time. Planning for these prevents them from derailing your budget when they occur.",
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
              "Car maintenance costs $1,200 per year on average. Save $100 per month in a 'car fund.' When you need $400 for new tires, the money is already there without impacting your regular budget.",
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
              "Start with the most important irregular expenses first - car maintenance and medical costs. Add other categories as your budget allows.",
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
              "Your budget is a living document that should change as your life changes. Regular reviews and adjustments ensure your budget stays realistic and effective.",
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
              "Tom budgeted $200 for groceries but consistently spent $280. Instead of feeling guilty, he adjusted his grocery budget to $250 and reduced his entertainment budget by $50.",
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
              "Don't abandon your budget if you overspend one month. Instead, learn from it and adjust. The goal is progress, not perfection.",
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
              "Saving money goes against our natural instincts. Our brains are wired to prioritize immediate rewards over future benefits. Understanding this psychology helps you develop strategies to overcome these mental barriers.",
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
              "Instead of saving 'whatever is left over' (usually nothing), Maya automatically transfers $100 to savings on payday. She never sees the money, so she doesn't miss it.",
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
              "Start with saving just 1% of your income. Once that feels normal, increase to 2%, then 3%. Gradual increases feel less painful than jumping to 10% immediately.",
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
              "Automation is the secret weapon of successful savers. By setting up automatic transfers, you remove emotions and decision-making from saving, making it as reliable as paying your rent.",
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
              "Alex sets up three automatic transfers: $200 to emergency fund, $150 to vacation fund, and $100 to car replacement fund. Every payday, $450 is automatically saved before he can spend it.",
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
              "Treat your automated savings like a bill that must be paid. If you can afford your rent, you can afford to pay your future self.",
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
              "Not all savings accounts are created equal. High-yield savings accounts can earn 10-20 times more interest than traditional bank accounts, helping your money grow faster while staying safe and accessible.",
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
              "$10,000 in a traditional bank account earning 0.01% makes $1 per year. The same amount in a high-yield account earning 4% makes $400 per year - that's $399 more for doing nothing!",
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
              "Interest rates change over time. Review your savings account rates annually and be willing to switch if you find significantly better rates elsewhere.",
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
              "The 52-week savings challenge is a popular method that makes saving feel like a game. You save an increasing amount each week, building both your savings account and your saving habit gradually.",
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
              "Sarah chose the reverse challenge, starting with $52 in January when she had holiday money, then decreasing amounts as the year progressed and other expenses increased.",
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
              "If the traditional amounts don't fit your budget, create your own version. The key is consistency, not the specific dollar amounts.",
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
              "Most people have multiple financial goals at once - emergency fund, vacation, car, house down payment. Learning to save for multiple goals simultaneously helps you make progress on all fronts without feeling overwhelmed.",
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
              "Mike saves $500 monthly: $200 to emergency fund (priority), $150 to vacation fund (6 months away), $100 to car fund (2 years away), $50 to gift fund (ongoing).",
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
              "Don't spread your savings too thin across too many goals. Focus on 3-4 main goals at a time for better progress and motivation.",
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
              "Everyone faces obstacles when trying to save money. The key is recognizing these barriers and developing specific strategies to overcome them. Most savings obstacles are mental, not mathematical.",
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
              "Lisa felt she couldn't save on her tight budget. She started saving just $5 per week by bringing lunch from home twice a week instead of buying it. After a year, she had $260 saved.",
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
              "If you can't save money, focus on not going further into debt. Sometimes maintaining your current position is progress when facing financial challenges.",
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
              "Not all debt is created equal. Understanding the difference between good debt and bad debt is crucial for making smart financial decisions and building wealth over time.",
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
              "A mortgage at 4% interest that helps you build equity in a home is good debt. A credit card at 24% interest used for vacation expenses is bad debt.",
          },
          {
            type: "tip",
            content:
              "Focus on paying off bad debt first, especially high-interest credit cards. Good debt can often be managed with minimum payments while you build wealth elsewhere.",
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
              "The debt snowball method focuses on paying off your smallest debts first, regardless of interest rate. This creates psychological wins and momentum that helps you stay motivated throughout your debt payoff journey.",
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
              "Sarah has: Credit Card A ($500), Credit Card B ($1,200), Car Loan ($8,000). She pays minimums on B and the car, puts extra $200/month toward A. Once A is paid off, she puts $200 + A's minimum toward B.",
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
              "The debt snowball is about psychology, not math. If you need motivation and quick wins, this method can be more effective than focusing on interest rates alone.",
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
              "The debt avalanche method focuses on paying off debts with the highest interest rates first. This approach saves the most money in interest payments over time, making it the mathematically optimal debt payoff strategy.",
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
              "Mike has: Credit Card (22% APR, $3,000), Personal Loan (12% APR, $5,000), Car Loan (6% APR, $10,000). He focuses extra payments on the credit card first, despite it not being the largest balance.",
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
              "Choose debt avalanche if you're motivated by saving money and can stay disciplined without needing frequent wins. Combine with debt snowball psychology by celebrating interest saved.",
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
              "Debt consolidation combines multiple debts into a single loan or payment, potentially with a lower interest rate. This can simplify your finances and save money, but it's important to understand the pros and cons.",
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
              "Lisa has $15,000 in credit card debt across 4 cards averaging 20% APR. She gets a personal loan at 12% APR to pay them off, saving $1,200 per year in interest while having just one payment.",
          },
          {
            type: "tip",
            content:
              "Only consolidate debt if you get a lower interest rate and commit to not running up new debt. Cut up the credit cards or remove them from your wallet to avoid temptation.",
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
              "If you're struggling with debt payments, creditors are often willing to work with you to find a solution. They'd rather receive some payment than none at all, making negotiation a valuable tool in debt management.",
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
              "John lost his job and called his credit card company before missing a payment. They agreed to reduce his minimum payment by 50% for 6 months and waived late fees, giving him time to find new employment.",
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
              "Be proactive and contact creditors as soon as you anticipate problems. They're more willing to help customers who communicate early rather than those who simply stop paying.",
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
              "Some types of debt are designed to trap borrowers in cycles of debt. Learning to recognize and avoid these predatory lending practices can save you thousands of dollars and years of financial stress.",
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
              "A $300 payday loan with $45 fee due in 2 weeks equals 391% APR. If rolled over multiple times, the fees can exceed the original loan amount within months.",
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
              "If you're considering a payday loan or similar high-cost debt, first explore all other options. The temporary relief isn't worth the long-term financial damage.",
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
              "Paying off debt is just the beginning. Building a truly debt-free lifestyle requires changing habits, mindsets, and systems to ensure you never fall back into the debt trap.",
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
              "After paying off $30,000 in debt, Maria continued living on her debt-payoff budget but redirected those payments to savings and investments, building $50,000 in wealth within 3 years.",
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
              "When you pay off debt, don't increase your lifestyle immediately. Continue living on your debt-payoff budget and redirect those payments to savings and investments.",
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
              "Before you can negotiate your bills, you need to understand exactly what you're paying for. Many bills contain fees, charges, and services you might not need or could get for less elsewhere.",
          },
          {
            type: "list",
            content: "Common bills you can negotiate:",
            items: [
              "Cell phone and internet services",
              "Cable and streaming subscriptions",
              "Insurance premiums (auto, home, health)",
              "Credit card interest rates and fees",
              "Bank fees and charges",
              "Utility bills and service charges",
            ],
          },
          {
            type: "list",
            content: "What to look for on your bills:",
            items: [
              "Base service costs vs. add-on fees",
              "Promotional rates that have expired",
              "Services you don't use or need",
              "Automatic increases or rate changes",
              "Bundled services that might cost more",
              "Hidden fees and surcharges",
            ],
          },
          {
            type: "example",
            content:
              "Tom's cable bill showed $89/month for internet, but included $25 in fees for premium channels he never watched and equipment he didn't need.",
          },
          {
            type: "tip",
            content:
              "Spend 30 minutes reviewing each major bill line by line. You'll often find charges you forgot about or services you can eliminate.",
          },
        ],
        keyTakeaways: [
          "Review bills line by line to understand all charges",
          "Look for services you don't use or need",
          "Identify promotional rates that have expired",
          "Understand the difference between base costs and fees",
        ],
        quiz: {
          questions: [
            {
              question: "What's the first step in negotiating your bills?",
              options: [
                "Call customer service immediately",
                "Understand what you're currently paying for",
                "Threaten to cancel service",
                "Compare with competitors",
              ],
              correctAnswer: "Understand what you're currently paying for",
              explanation:
                "You need to understand your current bills and charges before you can effectively negotiate or know what to ask for.",
            },
          ],
        },
      },
      {
        title: "Research and Preparation",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Arm Yourself with Information",
          },
          {
            type: "paragraph",
            content:
              "Successful bill negotiation requires preparation. Companies are more likely to work with you when you're informed about their competitors, current promotions, and your value as a customer.",
          },
          {
            type: "list",
            content: "Research before calling:",
            items: [
              "Competitor pricing and promotions",
              "Your payment history and loyalty",
              "Current promotions for new customers",
              "Industry average prices",
              "Your account status and usage patterns",
              "Recent rate increases or policy changes",
            ],
          },
          {
            type: "list",
            content: "Information to gather:",
            items: [
              "How long you've been a customer",
              "Your payment history (on-time vs. late)",
              "Competitor offers and pricing",
              "Current promotions available",
              "Your usage patterns and needs",
              "Any service issues or complaints",
            ],
          },
          {
            type: "example",
            content:
              "Before calling her internet provider, Sarah found that competitors offered similar service for $20 less per month and that her company was offering new customers a $30/month discount for 12 months.",
          },
          {
            type: "list",
            content: "Best times to negotiate:",
            items: [
              "End of month/quarter when reps have quotas",
              "When promotional rates are expiring",
              "After experiencing service problems",
              "When competitors launch new promotions",
              "During slow business periods",
              "When you're a long-term customer",
            ],
          },
          {
            type: "tip",
            content:
              "Write down key points before calling: your research, desired outcome, and minimum acceptable offer. This keeps you focused during the conversation.",
          },
        ],
        keyTakeaways: [
          "Research competitor pricing before negotiating",
          "Know your value as a customer",
          "Time your calls strategically",
          "Prepare key points and desired outcomes",
        ],
        quiz: {
          questions: [
            {
              question: "What information is most important to have before negotiating bills?",
              options: [
                "Your social security number",
                "Competitor pricing and offers",
                "Your credit score",
                "Your income level",
              ],
              correctAnswer: "Competitor pricing and offers",
              explanation:
                "Knowing what competitors offer gives you leverage in negotiations and shows the company you've done your research.",
            },
          ],
        },
      },
      {
        title: "Negotiation Tactics That Work",
        duration: "5 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Proven Strategies for Successful Negotiations",
          },
          {
            type: "paragraph",
            content:
              "Effective bill negotiation is part art, part science. The right approach, tone, and timing can save you hundreds of dollars per year on your regular expenses.",
          },
          {
            type: "list",
            content: "Effective negotiation strategies:",
            items: [
              "Be polite but persistent",
              "Ask to speak with retention department",
              "Mention competitor offers specifically",
              "Be prepared to walk away",
              "Ask 'What can you do to help me?'",
              "Request supervisor if needed",
            ],
          },
          {
            type: "list",
            content: "What to say that works:",
            items: [
              "'I've been a loyal customer for X years...'",
              "'I found a better offer with [competitor]...'",
              "'What promotions do you have available?'",
              "'I'm considering canceling unless we can work something out'",
              "'Can you match this competitor's price?'",
              "'What's the best you can do for me?'",
            ],
          },
          {
            type: "example",
            content:
              "Mike called his cell phone company: 'I've been a customer for 5 years with perfect payment history. T-Mobile is offering the same plan for $40 less. Can you match that or I'll need to switch?' They matched the price immediately.",
          },
          {
            type: "list",
            content: "What NOT to do:",
            items: [
              "Don't be rude or aggressive",
              "Don't accept the first 'no'",
              "Don't negotiate without research",
              "Don't make empty threats",
              "Don't settle for small concessions too quickly",
              "Don't forget to get agreements in writing",
            ],
          },
          {
            type: "list",
            content: "If they say no:",
            items: [
              "Ask to speak with a supervisor",
              "Call back and try a different representative",
              "Ask about future promotions or callbacks",
              "Consider actually canceling and switching",
              "Try the retention/cancellation department",
              "Be willing to compromise on a middle ground",
            ],
          },
          {
            type: "tip",
            content:
              "The retention department has more authority to offer discounts than regular customer service. Always ask to be transferred there for the best deals.",
          },
        ],
        keyTakeaways: [
          "Be polite but persistent in negotiations",
          "Mention specific competitor offers",
          "Ask for the retention department",
          "Be prepared to actually walk away",
        ],
        quiz: {
          questions: [
            {
              question: "Which department typically has the most authority to offer discounts?",
              options: ["Billing department", "Technical support", "Retention department", "New customer sales"],
              correctAnswer: "Retention department",
              explanation:
                "The retention department is specifically designed to keep customers from leaving and typically has more authority to offer discounts and promotions.",
            },
          ],
        },
      },
      {
        title: "Negotiating Specific Services",
        duration: "5 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Service-Specific Negotiation Strategies",
          },
          {
            type: "paragraph",
            content:
              "Different types of services require different negotiation approaches. Understanding the specific tactics that work for each industry can significantly improve your success rate.",
          },
          {
            type: "list",
            content: "Cell phone negotiations:",
            items: [
              "Mention competitor promotions specifically",
              "Ask about loyalty discounts",
              "Negotiate data overages and fees",
              "Request free phone upgrades",
              "Ask for bill credits for service issues",
              "Consider switching to prepaid plans",
            ],
          },
          {
            type: "list",
            content: "Internet/Cable negotiations:",
            items: [
              "Unbundle services you don't need",
              "Ask for new customer pricing",
              "Negotiate equipment rental fees",
              "Request speed upgrades at same price",
              "Ask about promotional rates",
              "Consider cord-cutting alternatives",
            ],
          },
          {
            type: "list",
            content: "Insurance negotiations:",
            items: [
              "Shop quotes from multiple companies",
              "Ask about all available discounts",
              "Increase deductibles to lower premiums",
              "Bundle policies for discounts",
              "Review coverage annually",
              "Maintain good credit and driving record",
            ],
          },
          {
            type: "example",
            content:
              "Lisa called her auto insurance company with quotes from three competitors. They not only matched the lower price but found additional discounts she qualified for, saving her $400 annually.",
          },
          {
            type: "list",
            content: "Credit card negotiations:",
            items: [
              "Request lower interest rates",
              "Ask for annual fee waivers",
              "Negotiate payment plans if struggling",
              "Request late fee removals",
              "Ask for credit limit increases",
              "Mention competitor card offers",
            ],
          },
          {
            type: "tip",
            content:
              "For insurance, get quotes from at least 3 companies annually. Rates change frequently, and loyalty doesn't always pay in insurance.",
          },
        ],
        keyTakeaways: [
          "Each service type requires specific negotiation tactics",
          "Insurance should be shopped annually",
          "Unbundling services often saves money",
          "Loyalty discounts exist but must be requested",
        ],
        quiz: {
          questions: [
            {
              question: "How often should you shop for new insurance quotes?",
              options: ["Every 5 years", "Only when rates increase", "Annually", "Never if you're satisfied"],
              correctAnswer: "Annually",
              explanation:
                "Insurance rates change frequently, and shopping annually ensures you're getting the best available rate, even if you're satisfied with your current service.",
            },
          ],
        },
      },
      {
        title: "Alternative Cost-Cutting Strategies",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Beyond Negotiation: Other Ways to Cut Bills",
          },
          {
            type: "paragraph",
            content:
              "Sometimes negotiation isn't enough or isn't possible. Having alternative strategies to reduce your bills ensures you can lower expenses even when companies won't budge on pricing.",
          },
          {
            type: "list",
            content: "Service alternatives to consider:",
            items: [
              "Streaming services instead of cable",
              "Prepaid cell plans instead of contracts",
              "Generic brands instead of name brands",
              "DIY services instead of professional",
              "Public transportation instead of car ownership",
              "Library services instead of subscriptions",
            ],
          },
          {
            type: "list",
            content: "Timing strategies:",
            items: [
              "Buy insurance 6 months in advance",
              "Shop utilities during off-peak seasons",
              "Time major purchases for sales periods",
              "Renew subscriptions during promotional periods",
              "Switch services during competitor price wars",
              "Cancel and re-subscribe for new customer rates",
            ],
          },
          {
            type: "example",
            content:
              "Instead of paying $120/month for cable, David switched to $15 Netflix, $12 Hulu, and $8 Disney+, saving $85 monthly while getting more content he actually watches.",
          },
          {
            type: "list",
            content: "Sharing and group strategies:",
            items: [
              "Family plans for cell phones",
              "Shared streaming service accounts",
              "Group buying for bulk discounts",
              "Neighborhood internet sharing",
              "Car sharing instead of ownership",
              "Tool libraries and sharing groups",
            ],
          },
          {
            type: "list",
            content: "Elimination strategies:",
            items: [
              "Cancel unused subscriptions",
              "Eliminate redundant services",
              "Downgrade to basic plans",
              "Remove premium add-ons",
              "Switch to free alternatives",
              "Reduce frequency of services",
            ],
          },
          {
            type: "tip",
            content:
              "Audit your subscriptions monthly. Many people pay for services they forgot about or no longer use. A simple cancellation can save hundreds per year.",
          },
        ],
        keyTakeaways: [
          "Consider alternatives when negotiation fails",
          "Timing purchases and renewals saves money",
          "Sharing costs with others reduces individual expenses",
          "Regular subscription audits prevent waste",
        ],
        quiz: {
          questions: [
            {
              question: "What's a simple way to reduce monthly expenses without negotiating?",
              options: ["Get a second job", "Cancel unused subscriptions", "Move to a cheaper city", "Sell your car"],
              correctAnswer: "Cancel unused subscriptions",
              explanation:
                "Canceling unused subscriptions is the simplest way to immediately reduce monthly expenses without major lifestyle changes or negotiations.",
            },
          ],
        },
      },
      {
        title: "Tracking Your Savings Success",
        duration: "3 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Measuring and Maintaining Your Bill Reductions",
          },
          {
            type: "paragraph",
            content:
              "Successfully negotiating lower bills is just the beginning. Tracking your savings and maintaining those reductions over time ensures you continue to benefit from your efforts.",
          },
          {
            type: "list",
            content: "Track your negotiation wins:",
            items: [
              "Document old vs. new rates",
              "Calculate monthly and annual savings",
              "Note expiration dates of promotional rates",
              "Keep records of agreements",
              "Set reminders for future negotiations",
              "Track cumulative savings over time",
            ],
          },
          {
            type: "list",
            content: "Maintain your savings:",
            items: [
              "Set calendar reminders before promotions expire",
              "Monitor bills for unexpected increases",
              "Re-negotiate annually or when rates change",
              "Continue shopping competitors regularly",
              "Review and adjust services as needs change",
              "Stay informed about new options and technologies",
            ],
          },
          {
            type: "example",
            content:
              "After negotiating all her bills, Maria saved $150/month ($1,800/year). She set up automatic transfers to move this savings to her emergency fund, turning bill negotiation into wealth building.",
          },
          {
            type: "list",
            content: "What to do with bill savings:",
            items: [
              "Add to emergency fund",
              "Increase retirement contributions",
              "Pay down debt faster",
              "Save for specific goals",
              "Invest in index funds",
              "Build sinking funds for future expenses",
            ],
          },
          {
            type: "tip",
            content:
              "Automatically transfer your bill savings to a separate account so you don't accidentally spend them. This turns expense reduction into wealth building.",
          },
        ],
        keyTakeaways: [
          "Document and track all negotiation successes",
          "Set reminders for when promotional rates expire",
          "Automatically save the money you're no longer spending",
          "Continue monitoring and re-negotiating regularly",
        ],
        quiz: {
          questions: [
            {
              question: "What should you do with the money saved from bill negotiations?",
              options: [
                "Spend it on entertainment",
                "Automatically save or invest it",
                "Use it for more bills",
                "Keep it in checking account",
              ],
              correctAnswer: "Automatically save or invest it",
              explanation:
                "Automatically saving or investing bill savings ensures the money goes toward building wealth rather than being spent on other things.",
            },
          ],
        },
      },
    ],
    investing: [
      {
        title: "Why Investing Matters",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Building Wealth Through Time and Compound Growth",
          },
          {
            type: "paragraph",
            content:
              "Investing is how you make your money work for you instead of just working for money. While saving preserves your wealth, investing grows it over time through the power of compound returns.",
          },
          {
            type: "list",
            content: "Why investing beats saving alone:",
            items: [
              "Inflation erodes cash value over time",
              "Investment returns typically beat inflation",
              "Compound growth accelerates wealth building",
              "Passive income potential",
              "Long-term wealth preservation",
            ],
          },
          {
            type: "example",
            content:
              "$10,000 in a savings account at 1% grows to $10,100 in a year. The same amount invested earning 7% annually becomes $19,672 after 10 years, while savings only reaches $11,046.",
          },
          {
            type: "list",
            content: "The cost of waiting to invest:",
            items: [
              "Lost compound growth opportunities",
              "Inflation reduces purchasing power",
              "Less time for market volatility to smooth out",
              "Higher required savings rate later",
              "Missed dollar-cost averaging benefits",
              "Delayed financial independence",
            ],
          },
          {
            type: "list",
            content: "Common investing fears and realities:",
            items: [
              "Fear: 'I might lose money' - Reality: Diversified long-term investing has positive returns",
              "Fear: 'It's too complicated' - Reality: Simple index funds work for most people",
              "Fear: 'I need a lot of money' - Reality: You can start with $1",
              "Fear: 'I need perfect timing' - Reality: Time in market beats timing the market",
            ],
          },
          {
            type: "tip",
            content:
              "Start investing even small amounts immediately. A 25-year-old investing $100/month until retirement will have more wealth than a 35-year-old investing $200/month.",
          },
        ],
        keyTakeaways: [
          "Investing grows wealth while saving only preserves it",
          "Compound growth accelerates over time",
          "Starting early is more important than starting big",
          "Long-term investing reduces risk through time",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main advantage of investing over just saving money?",
              options: [
                "Guaranteed returns",
                "No risk involved",
                "Compound growth over time",
                "Immediate access to funds",
              ],
              correctAnswer: "Compound growth over time",
              explanation:
                "Investing allows your money to grow through compound returns over time, significantly outpacing savings accounts and inflation.",
            },
          ],
        },
      },
      {
        title: "Investment Account Types",
        duration: "5 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Choosing the Right Account for Your Goals",
          },
          {
            type: "paragraph",
            content:
              "Different investment accounts serve different purposes and have different tax advantages. Understanding these accounts helps you optimize your investment strategy and minimize taxes.",
          },
          {
            type: "list",
            content: "Retirement accounts (tax-advantaged):",
            items: [
              "401(k): Employer-sponsored, often with matching",
              "Traditional IRA: Tax deduction now, pay taxes later",
              "Roth IRA: Pay taxes now, tax-free growth and withdrawals",
              "SEP-IRA: For self-employed individuals",
              "HSA: Triple tax advantage for health expenses",
            ],
          },
          {
            type: "list",
            content: "Taxable investment accounts:",
            items: [
              "Individual brokerage accounts",
              "Joint accounts for couples",
              "No contribution limits",
              "More flexibility for withdrawals",
              "Pay taxes on gains and dividends",
              "Good for goals before retirement",
            ],
          },
          {
            type: "example",
            content:
              "Sarah contributes to her 401(k) up to the company match (free money), then maxes her Roth IRA ($6,000), then uses a taxable account for her house down payment savings.",
          },
          {
            type: "list",
            content: "Account selection strategy:",
            items: [
              "Step 1: 401(k) up to company match",
              "Step 2: Max Roth IRA if eligible",
              "Step 3: Max 401(k) contribution",
              "Step 4: Taxable accounts for additional investing",
              "Step 5: Consider HSA if available",
              "Adjust based on income and tax situation",
            ],
          },
          {
            type: "list",
            content: "Key account features to compare:",
            items: [
              "Contribution limits and deadlines",
              "Tax treatment of contributions and withdrawals",
              "Early withdrawal penalties and exceptions",
              "Required minimum distributions",
              "Investment options available",
              "Fees and expense ratios",
            ],
          },
          {
            type: "tip",
            content:
              "Always get the full 401(k) match from your employer first - it's free money with an immediate 100% return on investment.",
          },
        ],
        keyTakeaways: [
          "Different accounts serve different purposes",
          "Always get full employer 401(k) match first",
          "Roth accounts provide tax-free growth",
          "Taxable accounts offer more flexibility",
        ],
        quiz: {
          questions: [
            {
              question: "What should be your first investment priority?",
              options: [
                "Maxing out Roth IRA",
                "Opening a taxable account",
                "Getting full employer 401(k) match",
                "Buying individual stocks",
              ],
              correctAnswer: "Getting full employer 401(k) match",
              explanation:
                "Employer 401(k) matching is free money with an immediate 100% return, making it the highest priority for new investors.",
            },
          ],
        },
      },
      {
        title: "Understanding Risk and Return",
        duration: "5 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "The Fundamental Relationship in Investing",
          },
          {
            type: "paragraph",
            content:
              "All investing involves a trade-off between risk and potential return. Understanding this relationship helps you make informed decisions about your investment strategy and set realistic expectations.",
          },
          {
            type: "list",
            content: "Risk-return spectrum (low to high risk):",
            items: [
              "Savings accounts: 0-1% return, virtually no risk",
              "Government bonds: 2-4% return, very low risk",
              "Corporate bonds: 3-6% return, low to moderate risk",
              "Stock market index funds: 6-10% average, moderate risk",
              "Individual stocks: Highly variable, high risk",
              "Cryptocurrency: Extremely variable, very high risk",
            ],
          },
          {
            type: "list",
            content: "Types of investment risk:",
            items: [
              "Market risk: Overall market declines",
              "Inflation risk: Purchasing power erosion",
              "Interest rate risk: Bond values fluctuate",
              "Company risk: Individual business failure",
              "Liquidity risk: Difficulty selling investments",
              "Currency risk: Foreign exchange fluctuations",
            ],
          },
          {
            type: "example",
            content:
              "During 2008, the S&P 500 fell 37%, but over the following decade it averaged 13.6% annual returns. Short-term volatility vs. long-term growth.",
          },
          {
            type: "list",
            content: "Managing investment risk:",
            items: [
              "Diversification across asset classes",
              "Long-term investment horizon",
              "Dollar-cost averaging",
              "Regular rebalancing",
              "Age-appropriate asset allocation",
              "Emergency fund for short-term needs",
            ],
          },
          {
            type: "list",
            content: "Risk tolerance factors:",
            items: [
              "Age and time horizon",
              "Financial goals and timeline",
              "Income stability",
              "Emergency fund size",
              "Emotional comfort with volatility",
              "Overall financial situation",
            ],
          },
          {
            type: "tip",
            content:
              "Your risk tolerance should match your time horizon. Money needed in 5 years should be in lower-risk investments than money for retirement in 30 years.",
          },
        ],
        keyTakeaways: [
          "Higher potential returns come with higher risk",
          "Diversification helps manage risk",
          "Time horizon should determine risk level",
          "Short-term volatility is normal in long-term investing",
        ],
        quiz: {
          questions: [
            {
              question: "What is the best way to manage investment risk?",
              options: [
                "Avoid all risky investments",
                "Put everything in one safe investment",
                "Diversify across different asset types",
                "Try to time the market perfectly",
              ],
              correctAnswer: "Diversify across different asset types",
              explanation:
                "Diversification across different asset types helps reduce risk while maintaining growth potential, as different investments perform well at different times.",
            },
          ],
        },
      },
      {
        title: "Index Funds: The Simple Solution",
        duration: "5 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Instant Diversification with Low Costs",
          },
          {
            type: "paragraph",
            content:
              "Index funds are the perfect investment for most people. They provide instant diversification, low costs, and market-matching returns without requiring you to pick individual stocks or time the market.",
          },
          {
            type: "list",
            content: "What index funds are:",
            items: [
              "Funds that track a market index (like S&P 500)",
              "Own hundreds or thousands of stocks automatically",
              "Passively managed with very low fees",
              "Provide instant diversification",
              "Match market performance over time",
              "Available for stocks, bonds, and international markets",
            ],
          },
          {
            type: "list",
            content: "Benefits of index fund investing:",
            items: [
              "Low expense ratios (often under 0.1%)",
              "Instant diversification reduces risk",
              "No need to research individual stocks",
              "Consistently outperform most active funds",
              "Simple to understand and implement",
              "Available in all account types",
            ],
          },
          {
            type: "example",
            content:
              "The Vanguard S&P 500 Index Fund (VFIAX) owns all 500 companies in the S&P 500, costs just 0.04% annually, and has averaged about 10% returns over decades.",
          },
          {
            type: "list",
            content: "Popular index fund categories:",
            items: [
              "Total Stock Market: Entire US stock market",
              "S&P 500: 500 largest US companies",
              "International: Foreign developed markets",
              "Emerging Markets: Developing countries",
              "Bond Index: Government and corporate bonds",
              "Target Date: Automatically adjusts over time",
            ],
          },
          {
            type: "list",
            content: "Simple index fund portfolios:",
            items: [
              "Three-fund: US stocks, international stocks, bonds",
              "Two-fund: Total stock market, total bond market",
              "Target date fund: All-in-one solution",
              "Age in bonds: Stock/bond allocation by age",
              "Adjust based on risk tolerance and timeline",
            ],
          },
          {
            type: "tip",
            content:
              "A simple portfolio of 70% total stock market index and 30% total bond market index works well for most investors and requires minimal maintenance.",
          },
        ],
        keyTakeaways: [
          "Index funds provide instant diversification at low cost",
          "They consistently outperform most actively managed funds",
          "Simple portfolios with 2-3 index funds work well",
          "Target date funds offer complete automation",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main advantage of index funds over individual stocks?",
              options: [
                "Higher returns guaranteed",
                "Instant diversification",
                "No risk involved",
                "Daily trading opportunities",
              ],
              correctAnswer: "Instant diversification",
              explanation:
                "Index funds provide instant diversification across hundreds or thousands of stocks, reducing the risk of any single company affecting your entire investment.",
            },
          ],
        },
      },
      {
        title: "Dollar-Cost Averaging",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Investing Consistently Regardless of Market Conditions",
          },
          {
            type: "paragraph",
            content:
              "Dollar-cost averaging means investing a fixed amount regularly, regardless of market conditions. This strategy removes emotion and timing from investing while potentially reducing your average cost per share.",
          },
          {
            type: "list",
            content: "How dollar-cost averaging works:",
            items: [
              "Invest the same amount on a regular schedule",
              "Buy more shares when prices are low",
              "Buy fewer shares when prices are high",
              "Average cost per share smooths out over time",
              "Removes need to time the market",
              "Builds consistent investing habits",
            ],
          },
          {
            type: "example",
            content:
              "Investing $500 monthly: When shares cost $50, you buy 10 shares. When they cost $25, you buy 20 shares. Your average cost is $33.33 per share, better than the $37.50 average price.",
          },
          {
            type: "list",
            content: "Benefits of dollar-cost averaging:",
            items: [
              "Reduces impact of market volatility",
              "Eliminates need to time the market",
              "Builds disciplined investing habits",
              "Works well with automatic investing",
              "Reduces emotional investing decisions",
              "Potentially lowers average cost basis",
            ],
          },
          {
            type: "list",
            content: "Setting up dollar-cost averaging:",
            items: [
              "Choose a fixed amount you can invest regularly",
              "Set up automatic transfers from checking",
              "Pick a consistent schedule (weekly, monthly)",
              "Invest regardless of market news or feelings",
              "Increase amount when income grows",
              "Stay consistent through market ups and downs",
            ],
          },
          {
            type: "list",
            content: "Dollar-cost averaging vs. lump sum:",
            items: [
              "Lump sum often performs better mathematically",
              "Dollar-cost averaging reduces emotional stress",
              "Most people don't have large lump sums available",
              "Regular investing fits most people's cash flow",
              "Both strategies work well long-term",
              "Choose based on your situation and comfort",
            ],
          },
          {
            type: "tip",
            content:
              "Set up automatic investing so dollar-cost averaging happens without you having to think about it. Automation removes emotion and ensures consistency.",
          },
        ],
        keyTakeaways: [
          "Invest the same amount regularly regardless of market conditions",
          "Potentially reduces average cost per share over time",
          "Removes emotion and timing from investing",
          "Works best when automated",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main benefit of dollar-cost averaging?",
              options: [
                "Guarantees higher returns",
                "Eliminates all investment risk",
                "Removes need to time the market",
                "Only works in bull markets",
              ],
              correctAnswer: "Removes need to time the market",
              explanation:
                "Dollar-cost averaging removes the need to time the market by investing consistently regardless of market conditions, reducing the impact of volatility over time.",
            },
          ],
        },
      },
      {
        title: "Rebalancing Your Portfolio",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Maintaining Your Target Asset Allocation",
          },
          {
            type: "paragraph",
            content:
              "Rebalancing means adjusting your portfolio back to your target allocation when market movements cause it to drift. This disciplined approach helps you buy low and sell high automatically.",
          },
          {
            type: "list",
            content: "Why portfolios need rebalancing:",
            items: [
              "Different investments grow at different rates",
              "Market movements change your allocation",
              "Risk level changes without rebalancing",
              "Some assets become overweighted",
              "Original strategy gets diluted over time",
              "Emotional biases can creep in",
            ],
          },
          {
            type: "example",
            content:
              "Your target is 70% stocks, 30% bonds. After a good stock year, you're at 80% stocks, 20% bonds. Rebalancing sells some stocks and buys bonds to get back to 70/30.",
          },
          {
            type: "list",
            content: "When to rebalance:",
            items: [
              "Calendar rebalancing: Set schedule (quarterly, annually)",
              "Threshold rebalancing: When allocation drifts 5-10%",
              "Combination approach: Check quarterly, rebalance if needed",
              "During major market movements",
              "When adding new money to accounts",
              "During life changes affecting risk tolerance",
            ],
          },
          {
            type: "list",
            content: "How to rebalance efficiently:",
            items: [
              "Use new contributions to buy underweighted assets",
              "Rebalance within tax-advantaged accounts first",
              "Consider tax implications in taxable accounts",
              "Use dividend reinvestment strategically",
              "Rebalance across all accounts together",
              "Keep transaction costs low",
            ],
          },
          {
            type: "list",
            content: "Rebalancing benefits:",
            items: [
              "Maintains your desired risk level",
              "Forces you to buy low and sell high",
              "Prevents any single asset from dominating",
              "Keeps emotions out of investment decisions",
              "Maintains diversification benefits",
              "Sticks to your long-term strategy",
            ],
          },
          {
            type: "tip",
            content:
              "Rebalance annually or when your allocation drifts more than 5-10% from targets. More frequent rebalancing usually isn't worth the effort and costs.",
          },
        ],
        keyTakeaways: [
          "Rebalancing maintains your target asset allocation",
          "It forces you to buy low and sell high",
          "Annual rebalancing is sufficient for most investors",
          "Use new contributions to rebalance efficiently",
        ],
        quiz: {
          questions: [
            {
              question: "What is the main purpose of rebalancing your investment portfolio?",
              options: [
                "To maximize returns",
                "To maintain your target asset allocation",
                "To time the market",
                "To avoid all losses",
              ],
              correctAnswer: "To maintain your target asset allocation",
              explanation:
                "Rebalancing maintains your target asset allocation, ensuring your portfolio's risk level stays consistent with your goals and timeline.",
            },
          ],
        },
      },
      {
        title: "Common Investing Mistakes",
        duration: "5 min",
        points: 20,
        content: [
          {
            type: "heading",
            content: "Avoiding Costly Investment Errors",
          },
          {
            type: "paragraph",
            content:
              "Even experienced investors make mistakes that can cost them thousands of dollars and years of progress. Learning about common pitfalls helps you avoid them and stay on track toward your financial goals.",
          },
          {
            type: "list",
            content: "Emotional investing mistakes:",
            items: [
              "Panic selling during market downturns",
              "FOMO buying during market peaks",
              "Trying to time the market",
              "Chasing last year's hot investments",
              "Checking accounts too frequently",
              "Making decisions based on news headlines",
            ],
          },
          {
            type: "list",
            content: "Strategy mistakes:",
            items: [
              "Not diversifying enough",
              "Paying high fees for actively managed funds",
              "Not taking advantage of employer match",
              "Waiting for the 'perfect' time to start",
              "Not increasing contributions with income",
              "Ignoring tax-advantaged accounts",
            ],
          },
          {
            type: "example",
            content:
              "During the 2008 financial crisis, investors who panic-sold missed the recovery. Those who stayed invested or bought more during the downturn saw significant gains in the following years.",
          },
          {
            type: "list",
            content: "How to avoid common mistakes:",
            items: [
              "Create an investment plan and stick to it",
              "Automate investments to remove emotion",
              "Focus on low-cost index funds",
              "Don't check accounts daily",
              "Increase contributions regularly",
              "Stay educated but avoid information overload",
            ],
          },
          {
            type: "list",
            content: "Red flags to watch for:",
            items: [
              "Promises of guaranteed high returns",
              "Pressure to invest immediately",
              "Complex investments you don't understand",
              "High fees and commissions",
              "Get-rich-quick schemes",
              "Advice from unqualified sources",
            ],
          },
          {
            type: "list",
            content: "Building good investing habits:",
            items: [
              "Start early, even with small amounts",
              "Invest consistently regardless of market conditions",
              "Keep costs low with index funds",
              "Maintain appropriate diversification",
              "Rebalance periodically",
              "Stay focused on long-term goals",
            ],
          },
          {
            type: "tip",
            content:
              "The biggest investing mistake is not starting. Even a imperfect investment plan that you start today is better than a perfect plan you never implement.",
          },
        ],
        keyTakeaways: [
          "Emotional decisions are the biggest investing mistakes",
          "Automation helps avoid timing and emotional errors",
          "High fees can significantly reduce long-term returns",
          "Starting early is more important than perfect timing",
        ],
        quiz: {
          questions: [
            {
              question: "What is often considered the biggest investing mistake?",
              options: [
                "Choosing the wrong stocks",
                "Not starting to invest",
                "Not checking accounts daily",
                "Investing in bonds",
              ],
              correctAnswer: "Not starting to invest",
              explanation:
                "The biggest investing mistake is not starting at all. Time and compound growth are more important than perfect investment selection or timing.",
            },
          ],
        },
      },
    ],
    "emergency-fund": [
      {
        title: "Why You Need an Emergency Fund",
        duration: "3 min",
        points: 10,
        content: [
          {
            type: "heading",
            content: "Your Financial Safety Net",
          },
          {
            type: "paragraph",
            content:
              "An emergency fund is money set aside specifically for unexpected expenses or financial emergencies. It's your first line of defense against going into debt when life throws you a curveball.",
          },
          {
            type: "list",
            content: "What qualifies as an emergency:",
            items: [
              "Job loss or reduced income",
              "Major medical expenses",
              "Car repairs or replacement",
              "Home repairs (roof, HVAC, plumbing)",
              "Family emergencies requiring travel",
              "Unexpected tax bills",
            ],
          },
          {
            type: "list",
            content: "What is NOT an emergency:",
            items: [
              "Vacations or travel",
              "Holiday gifts",
              "Sale items you want to buy",
              "Regular car maintenance",
              "Annual insurance premiums",
              "Predictable seasonal expenses",
            ],
          },
          {
            type: "example",
            content:
              "Sarah's car needed a $1,200 transmission repair. With her emergency fund, she paid cash and continued her normal budget. Without it, she would have used credit cards and paid interest for months.",
          },
          {
            type: "list",
            content: "Benefits of having an emergency fund:",
            items: [
              "Prevents debt accumulation during crises",
              "Reduces financial stress and anxiety",
              "Provides peace of mind",
              "Allows you to take calculated risks",
              "Prevents disruption of long-term financial goals",
              "Gives you time to make good decisions",
            ],
          },
          {
            type: "tip",
            content:
              "Think of your emergency fund as insurance you pay yourself. It's not an investment - it's protection that allows your other financial strategies to work.",
          },
        ],
        keyTakeaways: [
          "Emergency funds prevent debt during unexpected expenses",
          "True emergencies are unpredictable and necessary",
          "Emergency funds provide peace of mind and financial stability",
          "They protect your other financial goals from disruption",
        ],
        quiz: {
          questions: [
            {
              question: "Which of these is a true financial emergency?",
              options: [
                "A vacation you want to take",
                "Unexpected job loss",
                "Holiday shopping",
                "A sale on electronics",
              ],
              correctAnswer: "Unexpected job loss",
              explanation:
                "Job loss is a true emergency because it's unpredictable, necessary to address, and can significantly impact your financial stability.",
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
              "The right emergency fund size depends on your personal situation, job stability, and monthly expenses. Most experts recommend 3-6 months of expenses, but your target might be different.",
          },
          {
            type: "list",
            content: "Standard emergency fund guidelines:",
            items: [
              "3 months of expenses: Stable job, dual income household",
              "6 months of expenses: Single income, less stable job",
              "9-12 months: Self-employed, commission-based income",
              "Start with $1,000 minimum for beginners",
              "Adjust based on your specific situation",
              "Consider both essential and total monthly expenses",
            ],
          },
          {
            type: "list",
            content: "Factors that increase your target:",
            items: [
              "Irregular or seasonal income",
              "Self-employment or freelance work",
              "Single income household",
              "Health issues or chronic conditions",
              "Older home or car requiring more repairs",
              "Industry prone to layoffs",
            ],
          },
          {
            type: "example",
            content:
              "Mike spends $4,000/month total but only $2,800 on essentials (housing, food, utilities, insurance). His emergency fund target is $8,400-$16,800 based on essential expenses.",
          },
          {
            type: "list",
            content: "Calculating your target amount:",
            items: [
              "List all essential monthly expenses",
              "Include: housing, utilities, food, insurance, minimum debt payments",
              "Exclude: entertainment, dining out, subscriptions",
              "Multiply by 3-6 months (or more if needed)",
              "Start with a smaller goal if the full amount feels overwhelming",
              "Increase target as your situation changes",
            ],
          },
          {
            type: "list",
            content: "Starter emergency fund approach:",
            items: [
              "Begin with $500-$1,000 goal",
              "Focus on this before other financial goals",
              "Build quickly with intense effort",
              "Then work on debt payoff",
              "Return to build full emergency fund",
              "This prevents new debt during debt payoff",
            ],
          },
          {
            type: "tip",
            content:
              "Base your emergency fund on essential expenses, not your total spending. In an emergency, you'll cut non-essential spending first.",
          },
        ],
        keyTakeaways: [
          "3-6 months of essential expenses is the standard target",
          "Adjust based on job stability and personal situation",
          "Start with $1,000 if the full amount feels overwhelming",
          "Base calculations on essential expenses, not total spending",
        ],
        quiz: {
          questions: [
            {
              question: "How should you calculate your emergency fund target?",
              options: [
                "Based on your total monthly spending",
                "Based on essential monthly expenses",
                "Based on your monthly income",
                "Based on your debt payments",
              ],
              correctAnswer: "Based on essential monthly expenses",
              explanation:
                "Emergency funds should be based on essential expenses because you'll cut non-essential spending during a true emergency.",
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
            content: "Balancing Accessibility and Growth",
          },
          {
            type: "paragraph",
            content:
              "Your emergency fund needs to be easily accessible when you need it, but you also want it to earn some return while it sits there. The key is finding the right balance between liquidity and yield.",
          },
          {
            type: "list",
            content: "Best places for emergency funds:",
            items: [
              "High-yield savings accounts",
              "Money market accounts",
              "Short-term CDs (3-6 months)",
              "Treasury bills or I-bonds",
              "Online bank savings accounts",
              "Credit union share accounts",
            ],
          },
          {
            type: "list",
            content: "What to look for in emergency fund accounts:",
            items: [
              "FDIC or NCUA insurance",
              "Easy access to funds (online, ATM, transfer)",
              "Competitive interest rates",
              "No monthly fees",
              "Low or no minimum balance",
              "No penalties for withdrawals",
            ],
          },
          {
            type: "example",
            content:
              "Lisa keeps her $15,000 emergency fund in a high-yield savings account earning 4% APY. It's FDIC insured, accessible within 24 hours, and earns $600 per year while waiting for emergencies.",
          },
          {
            type: "list",
            content: "Where NOT to keep emergency funds:",
            items: [
              "Stock market investments (too volatile)",
              "Long-term CDs (penalties for early withdrawal)",
              "Retirement accounts (penalties and taxes)",
              "Cryptocurrency (too volatile and risky)",
              "Under your mattress (no growth, not insured)",
              "Regular checking account (too easy to spend)",
            ],
          },
          {
            type: "list",
            content: "Emergency fund account strategies:",
            items: [
              "Keep in separate account from regular savings",
              "Use online banks for higher interest rates",
              "Consider laddering short-term CDs",
              "Keep small amount in checking for immediate access",
              "Review rates annually and switch if needed",
              "Don't chase rates that require high minimums",
            ],
          },
          {
            type: "tip",
            content:
              "Keep your emergency fund in a separate account from your regular savings to avoid accidentally spending it on non-emergencies.",
          },
        ],
        keyTakeaways: [
          "Emergency funds need to be liquid and accessible",
          "High-yield savings accounts are usually the best option",
          "FDIC insurance protects your emergency fund",
          "Keep emergency funds separate from other savings",
        ],
        quiz: {
          questions: [
            {
              question: "What is the most important feature for an emergency fund account?",
              options: [
                "Highest possible returns",
                "Easy access to funds",
                "Long-term growth potential",
                "Tax advantages",
              ],
              correctAnswer: "Easy access to funds",
              explanation:
                "Emergency funds must be easily accessible when needed, making liquidity more important than maximizing returns.",
            },
          ],
        },
      },
      {
        title: "Building Your Fund Quickly",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Strategies to Reach Your Goal Faster",
          },
          {
            type: "paragraph",
            content:
              "Building an emergency fund can feel overwhelming, but with the right strategies, you can reach your goal faster than you think. The key is combining multiple approaches and staying focused on the priority.",
          },
          {
            type: "list",
            content: "Quick emergency fund building strategies:",
            items: [
              "Use tax refunds and bonuses",
              "Sell items you no longer need",
              "Take on temporary side work",
              "Cut expenses temporarily",
              "Use cash-back rewards and rebates",
              "Save all unexpected money (gifts, found money)",
            ],
          },
          {
            type: "list",
            content: "Expense cutting for emergency fund:",
            items: [
              "Cancel subscriptions temporarily",
              "Eat out less and cook more",
              "Find free entertainment options",
              "Negotiate bills to lower payments",
              "Use coupons and shop sales",
              "Delay non-essential purchases",
            ],
          },
          {
            type: "example",
            content:
              "Tom needed $6,000 for his emergency fund. He used his $2,000 tax refund, sold $1,000 worth of unused items, and saved $500/month by cutting expenses. He reached his goal in 6 months.",
          },
          {
            type: "list",
            content: "Side income ideas for emergency fund:",
            items: [
              "Freelance work in your skill area",
              "Gig economy jobs (rideshare, delivery)",
              "Sell handmade items or services",
              "Rent out space or belongings",
              "Seasonal work (tax prep, retail)",
              "Online tutoring or consulting",
            ],
          },
          {
            type: "list",
            content: "Automation strategies:",
            items: [
              "Automatic transfers on payday",
              "Direct deposit splitting",
              "Round-up apps that save spare change",
              "Automatic savings from checking account",
              "Save all raises and bonuses",
              "Use separate account to avoid temptation",
            ],
          },
          {
            type: "tip",
            content:
              "Treat building your emergency fund like a financial emergency itself. Focus intensely on this goal before other financial priorities.",
          },
        ],
        keyTakeaways: [
          "Use windfalls and bonuses to jumpstart your fund",
          "Combine expense cutting with income increases",
          "Automate savings to build consistently",
          "Treat emergency fund building as a top priority",
        ],
        quiz: {
          questions: [
            {
              question: "What's the most effective way to build an emergency fund quickly?",
              options: [
                "Only cut expenses",
                "Only increase income",
                "Combine multiple strategies",
                "Wait for a big windfall",
              ],
              correctAnswer: "Combine multiple strategies",
              explanation:
                "Combining expense reduction, income increases, windfalls, and automation is the most effective way to build an emergency fund quickly.",
            },
          ],
        },
      },
    ],
    "financial-goals": [
      {
        title: "The Power of Clear Financial Goals",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Why Specific Goals Drive Success",
          },
          {
            type: "paragraph",
            content:
              "Clear, specific financial goals are the foundation of financial success. They provide direction, motivation, and a way to measure progress. Without goals, money tends to disappear on random purchases instead of building wealth.",
          },
          {
            type: "list",
            content: "Benefits of setting financial goals:",
            items: [
              "Provides clear direction for your money",
              "Motivates you to save and invest",
              "Helps prioritize spending decisions",
              "Creates accountability and tracking",
              "Builds momentum through small wins",
              "Turns abstract dreams into concrete plans",
            ],
          },
          {
            type: "example",
            content:
              "Instead of 'I want to save money,' Maria set a goal: 'Save $15,000 for a house down payment by December 2025.' This specific goal helped her save $625 monthly and reach her target.",
          },
          {
            type: "list",
            content: "Common financial goals by category:",
            items: [
              "Emergency fund: 3-6 months of expenses",
              "Debt payoff: Specific amounts and timelines",
              "Major purchases: Car, house, wedding",
              "Experiences: Vacation, education, hobbies",
              "Long-term wealth: Retirement, financial independence",
              "Giving: Charity, family support",
            ],
          },
          {
            type: "list",
            content: "Why vague goals fail:",
            items: [
              "No clear target to aim for",
              "Difficult to measure progress",
              "Easy to postpone or abandon",
              "Lack of urgency or deadline",
              "No specific action steps",
              "Competing priorities without clear ranking",
            ],
          },
          {
            type: "tip",
            content:
              "Write down your financial goals and review them regularly. Written goals are significantly more likely to be achieved than goals kept only in your head.",
          },
        ],
        keyTakeaways: [
          "Specific goals provide direction and motivation",
          "Clear targets make progress measurable",
          "Written goals are more likely to be achieved",
          "Goals help prioritize competing financial demands",
        ],
        quiz: {
          questions: [
            {
              question: "What makes a financial goal more likely to be achieved?",
              options: [
                "Keeping it flexible and vague",
                "Making it specific and written down",
                "Setting it very high",
                "Not telling anyone about it",
              ],
              correctAnswer: "Making it specific and written down",
              explanation:
                "Specific, written goals are significantly more likely to be achieved because they provide clear targets and accountability.",
            },
          ],
        },
      },
      {
        title: "SMART Goal Framework",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Creating Goals That Actually Work",
          },
          {
            type: "paragraph",
            content:
              "The SMART framework helps you create financial goals that are more likely to be achieved. SMART stands for Specific, Measurable, Achievable, Relevant, and Time-bound.",
          },
          {
            type: "list",
            content: "SMART goal components:",
            items: [
              "Specific: Exactly what you want to achieve",
              "Measurable: How you'll track progress",
              "Achievable: Realistic given your situation",
              "Relevant: Meaningful to your life and values",
              "Time-bound: Clear deadline for completion",
            ],
          },
          {
            type: "example",
            content:
              "Poor goal: 'Save money for vacation.' SMART goal: 'Save $3,000 for a European vacation by June 2025 by setting aside $250 per month starting now.'",
          },
          {
            type: "list",
            content: "Making goals specific:",
            items: [
              "Include exact dollar amounts",
              "Specify what the money is for",
              "Define success clearly",
              "Identify required actions",
              "Consider all related costs",
              "Plan for obstacles and setbacks",
            ],
          },
          {
            type: "list",
            content: "Making goals measurable:",
            items: [
              "Set milestone checkpoints",
              "Track progress monthly",
              "Use percentages and ratios",
              "Create visual progress indicators",
              "Celebrate small wins along the way",
              "Adjust timeline if needed",
            ],
          },
          {
            type: "list",
            content: "Ensuring goals are achievable:",
            items: [
              "Based on realistic income and expenses",
              "Consider your current financial situation",
              "Break large goals into smaller steps",
              "Allow for unexpected expenses",
              "Start with easier goals to build confidence",
              "Adjust as circumstances change",
            ],
          },
          {
            type: "tip",
            content:
              "Test your goal with this question: 'Can I clearly explain to someone else exactly what I'm trying to achieve and by when?' If not, make it more specific.",
          },
        ],
        keyTakeaways: [
          "SMART goals are Specific, Measurable, Achievable, Relevant, Time-bound",
          "Specific goals include exact amounts and deadlines",
          "Measurable goals allow you to track progress",
          "Achievable goals are realistic for your situation",
        ],
        quiz: {
          questions: [
            {
              question: "Which of these is a SMART financial goal?",
              options: [
                "Save money for retirement",
                "Save $500 per month for 2 years to build a $12,000 emergency fund",
                "Get rich someday",
                "Buy a nice car eventually",
              ],
              correctAnswer: "Save $500 per month for 2 years to build a $12,000 emergency fund",
              explanation:
                "This goal is Specific ($12,000 emergency fund), Measurable ($500/month), Achievable (reasonable amount), Relevant (emergency fund), and Time-bound (2 years).",
            },
          ],
        },
      },
      {
        title: "Prioritizing Multiple Goals",
        duration: "4 min",
        points: 15,
        content: [
          {
            type: "heading",
            content: "Managing Competing Financial Priorities",
          },
          {
            type: "paragraph",
            content:
              "Most people have multiple financial goals competing for limited resources. Learning to prioritize and balance these goals ensures you make progress on what matters most while not neglecting other important objectives.",
          },
          {
            type: "list",
            content: "Goal prioritization framework:",
            items: [
              "Tier 1: Financial security (emergency fund, debt payoff)",
              "Tier 2: Time-sensitive goals (house down payment, wedding)",
              "Tier 3: Long-term wealth building (retirement, investments)",
              "Tier 4: Lifestyle and experience goals (vacation, hobbies)",
              "Adjust based on your personal situation and timeline",
            ],
          },
          {
            type: "list",
            content: "Factors for prioritizing goals:",
            items: [
              "Urgency and timeline",
              "Impact on financial security",
              "Cost of delay",
              "Personal values and importance",
              "Available resources and income",
              "Opportunity costs of other goals",
            ],
          },
          {
            type: "example",
            content:
              "Jake has $800/month to allocate: $300 to emergency fund (Tier 1), $300 to house down payment (Tier 2), $200 to retirement (Tier 3). He'll adjust when emergency fund is complete.",
          },
          {
            type: "list",
            content: "Strategies for multiple goals:",
            items: [
              "Focus on one goal at a time if resources are limited",
              "Use percentage allocation across goals",
              "Complete highest priority goals first",
              "Use windfalls strategically",
              "Adjust allocations as goals are achieved",
              "Don't spread resources too thin",
            ],
          },
          {
            type: "list",
            content: "Common prioritization mistakes:",
            items: [
              "Focusing on wants before needs",
              "Ignoring emergency fund for other goals",
              "Not considering time sensitivity",
              "Spreading money too thin across too many goals",
              "Letting emotions override logic",
              "Not adjusting priorities as life changes",
            ],
          },
          {
            type: "tip",
            content:
              "It's better to fully fund 2-3 important goals than to make minimal progress on 10 different goals. Focus creates momentum and results.",
          },
        ],
        keyTakeaways: [
          "Prioritize financial security goals first",
          "Consider urgency and timeline when ranking goals",
          "Focus resources rather than spreading too thin",
          "Adjust priorities as goals are completed",
        ],
        quiz: {
          questions: [
            {
              question: "Which goal should typically be the highest priority?",
              options: ["Vacation fund", "Emergency fund", "New car fund", "Entertainment budget"],
              correctAnswer: "Emergency fund",
              explanation:
                "Emergency fund should be the highest priority because it provides financial security and prevents debt accumulation during unexpected events.",
            },
          ],
        },
      },
    ],
  }

  const moduleContent = lessons[moduleId]
  if (!moduleContent || lessonIndex < 0 || lessonIndex >= moduleContent.length) {
    return null
  }

  return moduleContent[lessonIndex]
}
