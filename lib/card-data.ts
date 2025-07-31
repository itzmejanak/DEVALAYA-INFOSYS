export interface CardData {
  id: string
  name: string
  title: string
  phone: string
  email: string
  address: string
  pdfPath: string
}

// Digital card data with complete information
const cardDatabase: Record<string, CardData> = {
  'aakasmik-ghimire': {
    id: 'aakasmik-ghimire',
    name: 'Aakasmik Ghimire',
    title: 'Founder/MD',
    phone: '9840058700',
    email: 'akasmikghimire353@gmail.com',
    address: 'Kritipur, Kathmandu',
    pdfPath: '/cards/AAKASMIK GHIMIRE.pdf'
  },
  'kushal-poudel': {
    id: 'kushal-poudel',
    name: 'Kushal Poudel',
    title: 'President',
    phone: '9857043407',
    email: 'Kushalpoudel2000@gmail.com',
    address: 'Samakhushi, Kathmandu',
    pdfPath: '/cards/KUSHAL POUDEL.pdf'
  }
}

// Function to get card data by user name
export async function getCardData(userName: string): Promise<CardData | null> {
  // Normalize the user name to match our database keys
  const normalizedUserName = userName.toLowerCase().replace(/\s+/g, '-')
  
  const cardData = cardDatabase[normalizedUserName]
  
  if (!cardData) {
    return null
  }
  
  return cardData
}

// Function to get all available cards
export async function getAllCards(): Promise<CardData[]> {
  return Object.values(cardDatabase)
}
