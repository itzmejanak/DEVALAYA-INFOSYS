"use client"

import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { getServices, getServiceProcess, getServiceTestimonials } from "@/lib/services-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { use } from "react"
import { useState, useEffect } from "react"
import LoadingIndicator from "@/components/loading-indicator"

export default function ServicePage({ params }: { params: { slug: string } }) {
  // Unwrap params using React.use()
  const { slug } = use(params);

  const [services, setServices] = useState<any[]>([]);
  const [serviceProcess, setServiceProcess] = useState<any[]>([]);
  const [serviceTestimonials, setServiceTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesData, processData, testimonialsData] = await Promise.all([
          getServices(),
          getServiceProcess(),
          getServiceTestimonials()
        ]);

        setServices(servicesData);
        setServiceProcess(processData);
        setServiceTestimonials(testimonialsData);
      } catch (error) {
        console.error('Error fetching service data:', error);
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

  // Find the service based on the slug
  const service = services.find((s: any) => s.slug === slug)

  // If service not found, return 404
  if (!service) {
    notFound()
  }

  // Filter testimonials for this service
  const filteredTestimonials = serviceTestimonials.filter(
    (testimonial: any) => testimonial.service === service.title
  )

  return (
    <div className="container mx-auto py-10 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
        <div>
          <div className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-gold/10 text-gold mb-4 sm:mb-6">
            <service.icon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Professional Service
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-4 sm:mb-6">{service.title}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">{service.description}</p>
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-8">
            {service.technologies.map((tech: string, index: number) => (
              <span key={index} className="px-2 sm:px-3 py-0.5 sm:py-1 bg-navy/5 text-navy rounded-full text-xs sm:text-sm">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/contact">
              <Button className="bg-gold hover:bg-gold/90 text-white px-6 sm:px-8 py-2 sm:py-3 md:py-4 lg:py-6 text-sm sm:text-base md:text-lg w-full sm:w-auto">
                Request a Quote
              </Button>
            </Link>
            <Link href="#features">
              <Button variant="outline" className="border-gold/50 text-gold hover:bg-gold/10 px-6 sm:px-8 py-2 sm:py-3 md:py-4 lg:py-6 text-sm sm:text-base md:text-lg w-full sm:w-auto">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative rounded-xl overflow-hidden aspect-video lg:aspect-square bg-gradient-to-br from-gold/20 to-navy/20 flex items-center justify-center p-6 sm:p-8 md:p-10 lg:p-12 mt-4 sm:mt-0">
          <service.icon className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 text-gold/40" />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="mb-12 sm:mb-16 md:mb-20 scroll-mt-16 sm:scroll-mt-20 md:scroll-mt-24">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3 sm:mb-4">Key Features</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Our {service.title} service includes everything you need to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {service.features.map((feature: string, index: number) => (
            <Card key={index} className="border border-gold/20 hover:border-gold/50 transition-all duration-300">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gold/10 flex items-center justify-center mb-3 sm:mb-4">
                  <span className="text-gold font-bold text-sm sm:text-base">{index + 1}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-navy mb-1 sm:mb-2">{feature}</h3>
                <p className="text-sm sm:text-base text-gray-600">
                  We provide comprehensive {feature.toLowerCase()} solutions tailored to your business needs.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Process Section */}
      <div className="mb-12 sm:mb-16 md:mb-20 bg-navy/5 rounded-xl p-6 sm:p-8 md:p-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3 sm:mb-4">Our Process</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            How we deliver exceptional {service.title} solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {serviceProcess.slice(0, 4).map((step: any, index: number) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gold/20 flex items-center justify-center mb-3 sm:mb-4 relative z-10">
                  <span className="text-gold font-bold text-lg sm:text-xl">{step.number}</span>
                </div>
                {/* Connector line */}
                {index < serviceProcess.slice(0, 4).length - 1 && (
                  <div className="absolute top-6 sm:top-7 md:top-8 left-1/2 w-full h-0.5 bg-gold/20 -z-0 hidden lg:block" />
                )}
                <h3 className="text-lg sm:text-xl font-bold text-navy mb-1 sm:mb-2">{step.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3 sm:mb-4">Technologies We Use</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We leverage the latest technologies to deliver cutting-edge {service.title} solutions.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <div className="overflow-x-auto pb-2 -mx-4 px-4">
            <TabsList className="grid w-full min-w-[500px] grid-cols-5 mb-6 sm:mb-8">
              <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
              {service.technologies.slice(0, 4).map((tech: string, index: number) => (
                <TabsTrigger key={index} value={`tech-${index}`} className="text-xs sm:text-sm whitespace-nowrap">{tech}</TabsTrigger>
              ))}
            </TabsList>
          </div>
          <TabsContent value="overview" className="p-4 sm:p-6 bg-navy/5 rounded-xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
              {service.technologies.map((tech: string, index: number) => (
                <div key={index} className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white rounded-lg shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gold/10 flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                    <span className="text-gold font-bold text-sm sm:text-base md:text-lg">{tech.charAt(0)}</span>
                  </div>
                  <h3 className="text-navy font-medium text-center text-xs sm:text-sm md:text-base">{tech}</h3>
                </div>
              ))}
            </div>
          </TabsContent>
          {service.technologies.slice(0, 4).map((tech: string, index: number) => (
            <TabsContent key={index} value={`tech-${index}`} className="p-4 sm:p-6 bg-navy/5 rounded-xl">
              <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-center text-center md:text-left">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 mx-auto md:mx-0">
                  <span className="text-gold font-bold text-xl sm:text-2xl md:text-3xl">{tech.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-navy mb-2 sm:mb-3 md:mb-4">{tech}</h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    We have extensive experience with {tech}, allowing us to deliver robust and scalable solutions.
                  </p>
                  <p className="text-sm sm:text-base text-gray-600">
                    Our team of certified {tech} developers ensures that your project is implemented using best practices and the latest features.
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Testimonials Section */}
      {filteredTestimonials.length > 0 && (
        <div className="mb-12 sm:mb-16 md:mb-20">
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy mb-3 sm:mb-4">Client Testimonials</h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              See what our clients say about our {service.title} services.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredTestimonials.map((testimonial: any, index: number) => (
              <Card key={index} className="border border-gold/20">
                <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden mr-3 sm:mr-4">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-navy text-sm sm:text-base">{testimonial.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 italic">
                    "{testimonial.testimonial}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="bg-navy rounded-xl p-6 sm:p-8 md:p-12 text-center text-white">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Ready to Get Started with {service.title}?</h2>
        <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto">
          Contact us today to discuss how our {service.title} services can help your business grow and succeed.
        </p>
        <Link href="/contact">
          <Button className="bg-gold hover:bg-gold/90 text-white px-6 sm:px-8 py-3 sm:py-4 md:py-6 text-base sm:text-lg w-full sm:w-auto max-w-xs">
            Contact Us Now
          </Button>
        </Link>
      </div>
    </div>
  )
}