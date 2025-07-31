import { notFound } from 'next/navigation'
import PDFCardViewer from '@/components/pdf-card-viewer'
import { getCardData } from '@/lib/card-data'

interface PageProps {
  params: {
    user_name: string
  }
}

export default async function UserCardPage({ params }: PageProps) {
  const { user_name } = await params
  
  // Decode the user_name in case it has special characters
  const decodedUserName = decodeURIComponent(user_name)
  
  // Get card data for the user
  const cardData = await getCardData(decodedUserName)
  
  if (!cardData) {
    notFound()
  }

  return <PDFCardViewer data={cardData} />
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { user_name } = await params
  const decodedUserName = decodeURIComponent(user_name)
  const cardData = await getCardData(decodedUserName)
  
  if (!cardData) {
    return {
      title: 'Card Not Found - Devalaya Infosys',
      description: 'Digital visiting card not found'
    }
  }

  return {
    title: `${cardData.name} - Digital Card | Devalaya Infosys`,
    description: `Digital visiting card for ${cardData.name} from Devalaya Infosys`,
    openGraph: {
      title: `${cardData.name} - Digital Card`,
      description: `Connect with ${cardData.name} from Devalaya Infosys`,
      images: ['/logo.png'],
    },
  }
}
