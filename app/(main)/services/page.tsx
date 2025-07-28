"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { getServices, getServiceCategories } from "@/lib/services-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LoadingIndicator from "@/components/loading-indicator"

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [services, setServices] = useState<any[]>([]);
  const [serviceCategories, setServiceCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, categoriesData] = await Promise.all([
          getServices(),
          getServiceCategories()
        ]);
        
        setServices(servicesData);
        setServiceCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching services data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingIndicator />
      </div>
    );
  }

  // Filter services based on active category
  const filteredServices = activeCategory === "all" 
    ? services 
    : services.filter((service: any) => {
        // This is a simple filtering logic - you might want to enhance this
        // based on your specific categorization needs
        const title = service.title.toLowerCase()
        switch(activeCategory) {
          case "web": return title.includes("web")
          case "mobile": return title.includes("mobile") || title.includes("app")
          case "data": return title.includes("data") || title.includes("database")
          case "cloud": return title.includes("cloud") || title.includes("devops")
          case "security": return title.includes("security") || title.includes("cyber")
          case "consulting": return title.includes("consulting") || title.includes("support")
          default: return true
        }
      })

  return (
    <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-10 sm:mb-12 md:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-navy mb-3 sm:mb-4">Our Services</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          We offer a comprehensive range of IT services to help your business thrive in the digital age.
        </p>
      </div>

      {/* Category Tabs */}
      <Tabs defaultValue="all" className="mb-16" onValueChange={setActiveCategory}>
        <div className="flex justify-center mb-8 overflow-x-auto pb-2 px-2 -mx-2 scrollbar-hide">
          <TabsList className="flex flex-nowrap min-w-full sm:grid sm:grid-cols-7 gap-2 w-full max-w-3xl">
            {serviceCategories.map((category) => (
              <TabsTrigger 
                key={category.value} 
                value={category.value}
                className="px-2 py-1.5 text-xs sm:text-sm whitespace-nowrap flex-shrink-0 data-[state=active]:bg-gold data-[state=active]:text-white"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredServices.map((service, index) => (
                <Card key={index} className="border border-gold/20 hover:border-gold/50 transition-all duration-300 hover:shadow-md">
                  <CardHeader className="pb-3 px-4 sm:px-6 pt-4 sm:pt-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gold/10 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                      {<service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />}
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-navy">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3 sm:pb-4 px-4 sm:px-6">
                    <CardDescription className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                      {service.description}
                    </CardDescription>
                    <div className="space-y-2">
                      {service.features.slice(0, 2).map((feature: string, idx: number) => (
                        <div key={idx} className="flex items-start">
                          <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gold/20 flex items-center justify-center mt-0.5">
                            <span className="text-gold text-xs">✓</span>
                          </div>
                          <span className="ml-2 text-xs sm:text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                      {service.features.length > 2 && (
                        <div className="text-xs sm:text-sm text-gold/80">+{service.features.length - 2} more features</div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="px-4 sm:px-6 pb-4 sm:pb-6">
                    <Link href={`/services/${service.slug}`} className="w-full">
                      <Button variant="outline" className="w-full border-gold/50 text-gold hover:bg-gold hover:text-white text-sm sm:text-base py-1.5 sm:py-2">
                        Learn More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Call to Action */}
      <div className="bg-navy/5 rounded-xl p-6 sm:p-8 md:p-12 text-center mt-12 sm:mt-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-navy mb-3 sm:mb-4">Ready to Transform Your Business?</h2>
        <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto">
          Our team of experts is ready to help you achieve your business goals with our comprehensive IT services.
        </p>
        <a href="https://institute.devalayainfosys.com" target="_blank" rel="noopener noreferrer">
          <Button className="bg-gold hover:bg-gold/90 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg w-full sm:w-auto max-w-xs">
            Institute
          </Button>
        </a>
      </div>
    </div>
  )
}