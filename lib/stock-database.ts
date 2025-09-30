// Comprehensive US Stock Database with Fuzzy Search
export interface StockInfo {
  symbol: string
  name: string
  sector: string
  industry: string
  exchange: string
  marketCap: string
  type: "stock" | "etf" | "reit" | "crypto-etf"
  keywords: string[]
  aliases: string[]
}

// Comprehensive US Stock Database
export const US_STOCKS_DATABASE: StockInfo[] = [
  // MEGA CAP TECH (>$1T)
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    industry: "Consumer Electronics",
    exchange: "NASDAQ",
    marketCap: "$3.0T",
    type: "stock",
    keywords: ["iphone", "mac", "ipad", "tech", "consumer", "electronics", "smartphone"],
    aliases: ["apple", "appl", "iphone company"],
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    sector: "Technology",
    industry: "Software",
    exchange: "NASDAQ",
    marketCap: "$3.2T",
    type: "stock",
    keywords: ["windows", "office", "azure", "cloud", "software", "xbox", "teams"],
    aliases: ["microsoft", "msft", "windows", "office"],
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc. Class A",
    sector: "Communication Services",
    industry: "Internet Content & Information",
    exchange: "NASDAQ",
    marketCap: "$2.2T",
    type: "stock",
    keywords: ["google", "search", "youtube", "android", "cloud", "advertising"],
    aliases: ["google", "alphabet", "goog", "youtube"],
  },
  {
    symbol: "GOOG",
    name: "Alphabet Inc. Class C",
    sector: "Communication Services",
    industry: "Internet Content & Information",
    exchange: "NASDAQ",
    marketCap: "$2.2T",
    type: "stock",
    keywords: ["google", "search", "youtube", "android", "cloud", "advertising"],
    aliases: ["google", "alphabet", "googl", "youtube"],
  },
  {
    symbol: "AMZN",
    name: "Amazon.com Inc.",
    sector: "Consumer Discretionary",
    industry: "Internet Retail",
    exchange: "NASDAQ",
    marketCap: "$2.3T",
    type: "stock",
    keywords: ["ecommerce", "aws", "cloud", "retail", "prime", "shopping"],
    aliases: ["amazon", "amzn", "aws", "prime"],
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    sector: "Technology",
    industry: "Semiconductors",
    exchange: "NASDAQ",
    marketCap: "$3.5T",
    type: "stock",
    keywords: ["gpu", "ai", "gaming", "chips", "semiconductors", "datacenter"],
    aliases: ["nvidia", "nvda", "gpu", "ai chips"],
  },
  {
    symbol: "TSLA",
    name: "Tesla Inc.",
    sector: "Consumer Discretionary",
    industry: "Auto Manufacturers",
    exchange: "NASDAQ",
    marketCap: "$1.4T",
    type: "stock",
    keywords: ["electric", "ev", "cars", "elon", "musk", "battery", "solar"],
    aliases: ["tesla", "tsla", "electric car", "ev"],
  },
  {
    symbol: "META",
    name: "Meta Platforms Inc.",
    sector: "Communication Services",
    industry: "Social Media",
    exchange: "NASDAQ",
    marketCap: "$1.5T",
    type: "stock",
    keywords: ["facebook", "instagram", "whatsapp", "metaverse", "social", "vr"],
    aliases: ["facebook", "meta", "instagram", "fb"],
  },

  // MAJOR TECH COMPANIES
  {
    symbol: "NFLX",
    name: "Netflix Inc.",
    sector: "Communication Services",
    industry: "Entertainment",
    exchange: "NASDAQ",
    marketCap: "$300B",
    type: "stock",
    keywords: ["streaming", "movies", "tv", "entertainment", "video"],
    aliases: ["netflix", "nflx", "streaming"],
  },
  {
    symbol: "CRM",
    name: "Salesforce Inc.",
    sector: "Technology",
    industry: "Software",
    exchange: "NYSE",
    marketCap: "$250B",
    type: "stock",
    keywords: ["crm", "cloud", "software", "saas", "enterprise"],
    aliases: ["salesforce", "crm", "cloud software"],
  },
  {
    symbol: "ORCL",
    name: "Oracle Corporation",
    sector: "Technology",
    industry: "Software",
    exchange: "NYSE",
    marketCap: "$400B",
    type: "stock",
    keywords: ["database", "enterprise", "software", "cloud", "java"],
    aliases: ["oracle", "orcl", "database"],
  },
  {
    symbol: "ADBE",
    name: "Adobe Inc.",
    sector: "Technology",
    industry: "Software",
    exchange: "NASDAQ",
    marketCap: "$200B",
    type: "stock",
    keywords: ["photoshop", "creative", "pdf", "design", "software"],
    aliases: ["adobe", "adbe", "photoshop", "creative"],
  },

  // FINANCIAL SECTOR
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    sector: "Financial Services",
    industry: "Banks",
    exchange: "NYSE",
    marketCap: "$600B",
    type: "stock",
    keywords: ["bank", "banking", "finance", "investment", "credit"],
    aliases: ["jpmorgan", "chase", "jpm", "jp morgan"],
  },
  {
    symbol: "BAC",
    name: "Bank of America Corp.",
    sector: "Financial Services",
    industry: "Banks",
    exchange: "NYSE",
    marketCap: "$350B",
    type: "stock",
    keywords: ["bank", "banking", "finance", "credit", "loans"],
    aliases: ["bank of america", "bac", "bofa", "boa"],
  },
  {
    symbol: "WFC",
    name: "Wells Fargo & Company",
    sector: "Financial Services",
    industry: "Banks",
    exchange: "NYSE",
    marketCap: "$200B",
    type: "stock",
    keywords: ["bank", "banking", "finance", "mortgage", "loans"],
    aliases: ["wells fargo", "wfc", "wells"],
  },
  {
    symbol: "GS",
    name: "Goldman Sachs Group Inc.",
    sector: "Financial Services",
    industry: "Investment Banking",
    exchange: "NYSE",
    marketCap: "$150B",
    type: "stock",
    keywords: ["investment", "banking", "finance", "trading", "wall street"],
    aliases: ["goldman sachs", "gs", "goldman"],
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    sector: "Financial Services",
    industry: "Payment Processing",
    exchange: "NYSE",
    marketCap: "$500B",
    type: "stock",
    keywords: ["payments", "credit card", "visa", "transactions", "fintech"],
    aliases: ["visa", "v", "credit card", "payments"],
  },
  {
    symbol: "MA",
    name: "Mastercard Inc.",
    sector: "Financial Services",
    industry: "Payment Processing",
    exchange: "NYSE",
    marketCap: "$400B",
    type: "stock",
    keywords: ["payments", "credit card", "mastercard", "transactions", "fintech"],
    aliases: ["mastercard", "ma", "credit card", "payments"],
  },

  // HEALTHCARE & PHARMA
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    sector: "Healthcare",
    industry: "Pharmaceuticals",
    exchange: "NYSE",
    marketCap: "$450B",
    type: "stock",
    keywords: ["pharma", "healthcare", "medicine", "drugs", "medical"],
    aliases: ["johnson and johnson", "jnj", "j&j", "pharma"],
  },
  {
    symbol: "PFE",
    name: "Pfizer Inc.",
    sector: "Healthcare",
    industry: "Pharmaceuticals",
    exchange: "NYSE",
    marketCap: "$300B",
    type: "stock",
    keywords: ["pharma", "vaccine", "covid", "medicine", "drugs"],
    aliases: ["pfizer", "pfe", "vaccine", "pharma"],
  },
  {
    symbol: "UNH",
    name: "UnitedHealth Group Inc.",
    sector: "Healthcare",
    industry: "Health Insurance",
    exchange: "NYSE",
    marketCap: "$500B",
    type: "stock",
    keywords: ["health", "insurance", "healthcare", "medical", "coverage"],
    aliases: ["unitedhealth", "unh", "health insurance"],
  },

  // CONSUMER & RETAIL
  {
    symbol: "WMT",
    name: "Walmart Inc.",
    sector: "Consumer Staples",
    industry: "Discount Stores",
    exchange: "NYSE",
    marketCap: "$700B",
    type: "stock",
    keywords: ["retail", "grocery", "shopping", "discount", "supermarket"],
    aliases: ["walmart", "wmt", "retail", "grocery"],
  },
  {
    symbol: "HD",
    name: "Home Depot Inc.",
    sector: "Consumer Discretionary",
    industry: "Home Improvement",
    exchange: "NYSE",
    marketCap: "$400B",
    type: "stock",
    keywords: ["home", "improvement", "tools", "hardware", "diy"],
    aliases: ["home depot", "hd", "hardware", "home improvement"],
  },
  {
    symbol: "MCD",
    name: "McDonald's Corp.",
    sector: "Consumer Discretionary",
    industry: "Restaurants",
    exchange: "NYSE",
    marketCap: "$200B",
    type: "stock",
    keywords: ["fast food", "restaurant", "mcdonalds", "food", "franchise"],
    aliases: ["mcdonalds", "mcd", "fast food", "restaurant"],
  },
  {
    symbol: "NKE",
    name: "Nike Inc.",
    sector: "Consumer Discretionary",
    industry: "Footwear & Accessories",
    exchange: "NYSE",
    marketCap: "$200B",
    type: "stock",
    keywords: ["shoes", "athletic", "sports", "apparel", "sneakers"],
    aliases: ["nike", "nke", "shoes", "sneakers", "athletic"],
  },

  // ENERGY SECTOR
  {
    symbol: "XOM",
    name: "Exxon Mobil Corp.",
    sector: "Energy",
    industry: "Oil & Gas",
    exchange: "NYSE",
    marketCap: "$400B",
    type: "stock",
    keywords: ["oil", "gas", "energy", "petroleum", "exxon"],
    aliases: ["exxon", "xom", "oil", "energy"],
  },
  {
    symbol: "CVX",
    name: "Chevron Corp.",
    sector: "Energy",
    industry: "Oil & Gas",
    exchange: "NYSE",
    marketCap: "$300B",
    type: "stock",
    keywords: ["oil", "gas", "energy", "petroleum", "chevron"],
    aliases: ["chevron", "cvx", "oil", "energy"],
  },

  // MEME STOCKS & POPULAR RETAIL
  {
    symbol: "GME",
    name: "GameStop Corp.",
    sector: "Consumer Discretionary",
    industry: "Gaming Retail",
    exchange: "NYSE",
    marketCap: "$10B",
    type: "stock",
    keywords: ["gaming", "meme", "retail", "video games", "wallstreetbets"],
    aliases: ["gamestop", "gme", "meme stock", "gaming"],
  },
  {
    symbol: "AMC",
    name: "AMC Entertainment Holdings Inc.",
    sector: "Communication Services",
    industry: "Entertainment",
    exchange: "NYSE",
    marketCap: "$5B",
    type: "stock",
    keywords: ["movies", "cinema", "entertainment", "meme", "theaters"],
    aliases: ["amc", "movies", "cinema", "meme stock"],
  },
  {
    symbol: "BB",
    name: "BlackBerry Ltd.",
    sector: "Technology",
    industry: "Software",
    exchange: "NYSE",
    marketCap: "$3B",
    type: "stock",
    keywords: ["software", "security", "mobile", "meme", "tech"],
    aliases: ["blackberry", "bb", "meme stock"],
  },

  // POPULAR ETFs
  {
    symbol: "SPY",
    name: "SPDR S&P 500 ETF Trust",
    sector: "ETF",
    industry: "Broad Market",
    exchange: "NYSE",
    marketCap: "$500B",
    type: "etf",
    keywords: ["sp500", "index", "etf", "broad market", "diversified"],
    aliases: ["spy", "sp500", "s&p 500", "market etf"],
  },
  {
    symbol: "QQQ",
    name: "Invesco QQQ Trust",
    sector: "ETF",
    industry: "Technology",
    exchange: "NASDAQ",
    marketCap: "$200B",
    type: "etf",
    keywords: ["nasdaq", "tech", "etf", "technology", "growth"],
    aliases: ["qqq", "nasdaq", "tech etf", "technology"],
  },
  {
    symbol: "VTI",
    name: "Vanguard Total Stock Market ETF",
    sector: "ETF",
    industry: "Broad Market",
    exchange: "NYSE",
    marketCap: "$300B",
    type: "etf",
    keywords: ["total market", "vanguard", "etf", "diversified", "index"],
    aliases: ["vti", "total market", "vanguard", "broad market"],
  },
  {
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    sector: "ETF",
    industry: "Broad Market",
    exchange: "NYSE",
    marketCap: "$400B",
    type: "etf",
    keywords: ["sp500", "vanguard", "etf", "index", "large cap"],
    aliases: ["voo", "vanguard sp500", "s&p 500"],
  },
  {
    symbol: "ARKK",
    name: "ARK Innovation ETF",
    sector: "ETF",
    industry: "Innovation",
    exchange: "NYSE",
    marketCap: "$10B",
    type: "etf",
    keywords: ["innovation", "growth", "disruptive", "ark", "cathie wood"],
    aliases: ["arkk", "ark", "innovation", "cathie wood"],
  },

  // CRYPTO ETFs
  {
    symbol: "BITO",
    name: "ProShares Bitcoin Strategy ETF",
    sector: "ETF",
    industry: "Cryptocurrency",
    exchange: "NYSE",
    marketCap: "$2B",
    type: "crypto-etf",
    keywords: ["bitcoin", "crypto", "cryptocurrency", "btc", "digital"],
    aliases: ["bito", "bitcoin etf", "crypto", "btc"],
  },
  {
    symbol: "ETHE",
    name: "Grayscale Ethereum Trust",
    sector: "ETF",
    industry: "Cryptocurrency",
    exchange: "NYSE",
    marketCap: "$5B",
    type: "crypto-etf",
    keywords: ["ethereum", "crypto", "cryptocurrency", "eth", "digital"],
    aliases: ["ethe", "ethereum", "crypto", "eth"],
  },

  // DIVIDEND STOCKS
  {
    symbol: "KO",
    name: "Coca-Cola Company",
    sector: "Consumer Staples",
    industry: "Beverages",
    exchange: "NYSE",
    marketCap: "$250B",
    type: "stock",
    keywords: ["coca cola", "beverage", "dividend", "consumer", "drinks"],
    aliases: ["coca cola", "ko", "coke", "dividend"],
  },
  {
    symbol: "PEP",
    name: "PepsiCo Inc.",
    sector: "Consumer Staples",
    industry: "Beverages",
    exchange: "NASDAQ",
    marketCap: "$230B",
    type: "stock",
    keywords: ["pepsi", "beverage", "snacks", "consumer", "dividend"],
    aliases: ["pepsi", "pep", "beverage", "dividend"],
  },

  // SEMICONDUCTOR SECTOR
  {
    symbol: "AMD",
    name: "Advanced Micro Devices Inc.",
    sector: "Technology",
    industry: "Semiconductors",
    exchange: "NASDAQ",
    marketCap: "$200B",
    type: "stock",
    keywords: ["cpu", "gpu", "chips", "semiconductors", "processors"],
    aliases: ["amd", "processors", "chips", "cpu"],
  },
  {
    symbol: "INTC",
    name: "Intel Corporation",
    sector: "Technology",
    industry: "Semiconductors",
    exchange: "NASDAQ",
    marketCap: "$150B",
    type: "stock",
    keywords: ["cpu", "chips", "semiconductors", "processors", "intel"],
    aliases: ["intel", "intc", "processors", "chips"],
  },

  // STREAMING & MEDIA
  {
    symbol: "DIS",
    name: "Walt Disney Company",
    sector: "Communication Services",
    industry: "Entertainment",
    exchange: "NYSE",
    marketCap: "$200B",
    type: "stock",
    keywords: ["disney", "entertainment", "streaming", "parks", "movies"],
    aliases: ["disney", "dis", "entertainment", "streaming"],
  },
  {
    symbol: "ROKU",
    name: "Roku Inc.",
    sector: "Communication Services",
    industry: "Entertainment Technology",
    exchange: "NASDAQ",
    marketCap: "$5B",
    type: "stock",
    keywords: ["streaming", "tv", "roku", "entertainment", "media"],
    aliases: ["roku", "streaming", "tv"],
  },
]

// Fuzzy Search Implementation
export class FuzzyStockSearch {
  private stocks: StockInfo[]

  constructor(stocks: StockInfo[]) {
    this.stocks = stocks
  }

  // Calculate similarity score between two strings
  private calculateSimilarity(str1: string, str2: string): number {
    const s1 = str1.toLowerCase()
    const s2 = str2.toLowerCase()

    // Exact match
    if (s1 === s2) return 1.0

    // Contains match
    if (s1.includes(s2) || s2.includes(s1)) return 0.9

    // Levenshtein distance for fuzzy matching
    const distance = this.levenshteinDistance(s1, s2)
    const maxLength = Math.max(s1.length, s2.length)
    return 1 - distance / maxLength
  }

  // Levenshtein distance algorithm
  private levenshteinDistance(str1: string, str2: string): number {
    const matrix = []

    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i]
    }

    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j
    }

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1]
        } else {
          matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
        }
      }
    }

    return matrix[str2.length][str1.length]
  }

  // Main search function with fuzzy matching
  search(query: string, limit = 10): Array<StockInfo & { matchScore: number }> {
    if (!query || query.length < 1) return []

    const results: Array<StockInfo & { matchScore: number }> = []

    for (const stock of this.stocks) {
      let bestScore = 0

      // Check symbol match
      const symbolScore = this.calculateSimilarity(stock.symbol, query)
      bestScore = Math.max(bestScore, symbolScore)

      // Check name match
      const nameScore = this.calculateSimilarity(stock.name, query)
      bestScore = Math.max(bestScore, nameScore * 0.9) // Slightly lower weight

      // Check aliases
      for (const alias of stock.aliases) {
        const aliasScore = this.calculateSimilarity(alias, query)
        bestScore = Math.max(bestScore, aliasScore * 0.95)
      }

      // Check keywords
      for (const keyword of stock.keywords) {
        const keywordScore = this.calculateSimilarity(keyword, query)
        bestScore = Math.max(bestScore, keywordScore * 0.8) // Lower weight for keywords
      }

      // Check sector/industry
      const sectorScore = this.calculateSimilarity(stock.sector, query)
      const industryScore = this.calculateSimilarity(stock.industry, query)
      bestScore = Math.max(bestScore, sectorScore * 0.7, industryScore * 0.7)

      // Only include results with reasonable similarity
      if (bestScore > 0.3) {
        results.push({
          ...stock,
          matchScore: bestScore,
        })
      }
    }

    // Sort by match score (highest first) and return top results
    return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit)
  }

  // Get stock by exact symbol
  getBySymbol(symbol: string): StockInfo | undefined {
    return this.stocks.find((stock) => stock.symbol.toLowerCase() === symbol.toLowerCase())
  }

  // Get stocks by sector
  getBySector(sector: string): StockInfo[] {
    return this.stocks.filter((stock) => stock.sector.toLowerCase().includes(sector.toLowerCase()))
  }

  // Get stocks by type
  getByType(type: StockInfo["type"]): StockInfo[] {
    return this.stocks.filter((stock) => stock.type === type)
  }
}

// Export singleton instance
export const stockSearch = new FuzzyStockSearch(US_STOCKS_DATABASE)
