'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ChevronRight, ExternalLink, Code, Briefcase, Cpu, LineChart, Layers, PenTool, Zap, Smartphone, CheckCircle, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel';
import { services } from '@/lib/services-data';
import { companyStats } from '@/lib/data';
import { IProject } from '@/models/Project';
import React from 'react';
import LoadingIndicator from '@/components/loading-indicator';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
};

const Hero = () => {
  // Function to scroll to services section
  const scrollToServices = () => {
    const servicesSection = document.getElementById('services-section');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-28 md:py-32 lg:py-36 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy via-navy/95 to-navy/90 text-white overflow-hidden">
      {/* Refined background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary glowing orbs with improved positioning and opacity */}
        <div className="absolute left-0 top-0 w-[30rem] h-[30rem] bg-gradient-to-r from-gold/15 to-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute right-0 bottom-0 w-[30rem] h-[30rem] bg-gradient-to-l from-gold/15 to-gold/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-[25rem] h-[25rem] bg-gradient-to-br from-cream/10 to-cream/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
        
        {/* Refined ambient orbs with better positioning */}
        <div className="absolute top-1/4 right-1/4 w-[20rem] h-[20rem] bg-gold/5 rounded-full blur-2xl animate-pulse delay-700"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[22rem] h-[22rem] bg-cream/5 rounded-full blur-2xl animate-pulse delay-1200"></div>
        
        {/* Enhanced grid pattern with better opacity */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
        
        {/* Refined floating elements with better animations */}
        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full animate-bounce delay-300" style={{ animationDuration: '2.5s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-8 h-8 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full animate-bounce delay-700" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/2 left-1/6 w-3 h-3 bg-cream/20 rounded-full animate-ping delay-1000" style={{ animationDuration: '2s' }}></div>
        <div className="absolute bottom-1/2 right-1/6 w-4 h-4 bg-cream/20 rounded-full animate-ping delay-1500" style={{ animationDuration: '3s' }}></div>
        
        {/* Refined geometric shapes with better styling */}
        <div className="absolute top-1/5 right-1/5 w-16 h-16 border border-gold/10 rotate-45 animate-spin" style={{ animationDuration: '25s' }}></div>
        <div className="absolute bottom-1/5 left-1/5 w-12 h-12 border border-cream/10 rotate-12 animate-spin" style={{ animationDuration: '20s' }}></div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-navy/30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center mb-12"
        >
          {/* Enhanced badge with better styling */}
          <Badge 
            variant="outline" 
            className="mb-8 px-6 py-3 text-gold border-gold/30 bg-gold/5 text-sm font-medium rounded-full shadow-lg backdrop-blur-sm hover:bg-gold/10 transition-all duration-300"
          >
            ✨Reliable IT Partner
          </Badge>
          
          {/* Refined heading with better typography and spacing */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 sm:mb-8 tracking-tight leading-tight">
            <span className="block mb-2 sm:mb-3 text-white drop-shadow-lg">Transforming Concepts into</span>
            <span className="text-gold bg-gradient-to-r from-gold via-gold/90 to-gold/80 bg-clip-text text-transparent drop-shadow-sm">
              Seamless Experiences
            </span>
          </h1>
          
          {/* Refined decorative line with better styling */}
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold/60 mx-auto mb-8 rounded-full shadow-lg"></div>
          
          {/* Refined description with better typography */}
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-6 sm:mb-10 px-2">
            We build innovative digital solutions that help businesses thrive in the modern world
          </p>
          
          {/* Refined button group with better styling */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-gradient-to-r from-gold to-gold/90 hover:from-gold/90 hover:to-gold text-navy font-semibold group transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-xl shadow-gold/20 px-6 sm:px-8 py-4 sm:py-6 rounded-full text-sm sm:text-base"
              onClick={scrollToServices}
            >
              Explore Services
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            
            <Link href="/projects" passHref className="w-full sm:w-auto">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto border-2 border-white/20 text-gold bg-white/5 hover:bg-white hover:text-navy transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 backdrop-blur-sm shadow-xl px-6 sm:px-8 py-4 sm:py-6 rounded-full group text-sm sm:text-base"
              >
                View Our Work
                <ArrowUpRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
          
          {/* Refined scroll indicator with better styling */}
          <div className="mt-16 animate-bounce">
            <div className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center mx-auto">
              <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  const toggleCard = (index: number) => {
    const newExpandedCards = new Set(expandedCards);
    if (newExpandedCards.has(index)) {
      newExpandedCards.delete(index);
    } else {
      newExpandedCards.add(index);
    }
    setExpandedCards(newExpandedCards);
  };// Display only first 8 services
  const displayedServices = services.slice(0, 8);
  const [expandedCards, setExpandedCards] = useState(new Set());
  
  return (
    <section id="services-section" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-cream relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-gold/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-navy/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gold/3 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-10 sm:mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 text-navy border-navy/30 bg-white/50 backdrop-blur-sm text-xs sm:text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            ⚡ What We Offer
          </Badge>
          
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 text-navy">
            Our <span className="text-gold">Services</span>
          </h2>
          
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-gold to-gold/60 mx-auto mb-4 sm:mb-6 rounded-full shadow-lg shadow-gold/30"></div>
          
          <p className="text-base sm:text-lg text-navy/70 max-w-2xl mx-auto px-2">
            Comprehensive solutions tailored to your business needs
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {displayedServices.map((service, index) => {
            const Icon = service.icon;
            const isExpanded = expandedCards.has(index);
            
            return (
              <motion.div key={index} variants={fadeIn}>
                <Card className="border-none bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 rounded-xl overflow-hidden group relative cursor-pointer">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <CardHeader className="relative z-10 pb-4">
                    <div className="bg-gradient-to-br from-navy/10 to-navy/5 w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-gold/20 group-hover:to-gold/10 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                      <Icon className="h-7 w-7 text-gold group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-navy group-hover:text-gold transition-colors duration-300">{service.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="relative z-10 pt-0">
                    <p className="text-navy/70 text-sm mb-3">{service.description}</p>
                    
                    <div className={`space-y-2 transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
                      {service.features.map((feature, i) => (
                        <div key={i} className="flex items-start">
                          <CheckCircle className="h-3 w-3 text-gold mr-2 mt-1 flex-shrink-0" />
                          <span className="text-xs text-navy/70">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="relative z-10 pt-0 flex justify-between">
                    <Button 
                      variant="ghost" 
                      className="p-3 text-gold hover:text-white transition-all duration-300 font-medium text-sm"
                      onClick={() => toggleCard(index)}
                    >
                      {isExpanded ? 'Show less' : 'Learn more'}
                      <ChevronRight className={`ml-1 h-3 w-3 transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} />
                    </Button>
                    
                    {isExpanded && (
                      <Link href={`/services/${service.slug}`} passHref>
                        <Button 
                          variant="outline" 
                          className="p-3 text-navy border-navy/30 hover:bg-navy hover:text-white transition-all duration-300 font-medium text-sm"
                        >
                          Details
                          <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    )}
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        
        <div className="text-center mt-12">
          <Link href="/services" passHref>
            <Button variant="outline" className="border-2 border-navy/20 text-navy hover:bg-navy hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl px-6 py-3 rounded-full group">
              View All Services
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

// Function to get the appropriate icon component based on icon name string
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'Code':
      return Code;
    case 'Briefcase':
      return Briefcase;
    case 'Cpu':
      return Cpu;
    case 'LineChart':
      return LineChart;
    case 'Layers':
      return Layers;
    case 'PenTool':
      return PenTool;
    case 'Zap':
      return Zap;
    case 'Smartphone':
      return Smartphone;
    default:
      return Code; // Default icon
  }
};

// Async function to fetch projects from the API
async function getProjects() {
  try {
    // Use absolute URL with origin to avoid URL parsing errors
    const baseUrl = window.location.origin;
    const res = await fetch(`${baseUrl}/api/projects`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }
    return res.json();
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

const ProjectsSection = () => {
  const [featuredProjects, setFeaturedProjects] = useState<IProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await getProjects();
        // Filter for featured projects only
        const featured = data.filter((project: IProject) => project.featured);
        setFeaturedProjects(featured);
      } catch (error) {
        console.error('Error loading projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);
  
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-gradient-to-br from-cream/40 to-cream/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-gradient-to-tr from-gold/10 to-gold/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-navy/5 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 text-navy border-navy/30 bg-white/50 backdrop-blur-sm text-sm font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            🚀 Our Portfolio
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-navy">
            A small selection of <span className="text-gold bg-gradient-to-r from-gold to-gold/80 bg-clip-text text-transparent">recent projects</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold/60 mx-auto mb-6 rounded-full shadow-lg shadow-gold/30"></div>
          
          <p className="text-lg text-navy/70 max-w-2xl mx-auto">
            Explore our portfolio of innovative solutions
          </p>
        </motion.div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingIndicator />
          </div>
        ) : (
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects.map((project, index) => {
              const IconComponent = getIconComponent(project.icon);
              return (
                <motion.div key={String(project._id || index)} variants={fadeIn}>
                  <Card className="overflow-hidden border-none bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 rounded-xl group">
                    <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-navy/10 to-navy/5">
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end p-6">
                        <div>
                          <h4 className="text-white font-medium text-sm">{project.client}</h4>
                          <p className="text-white/80 text-xs">{project.duration}</p>
                        </div>
                      </div>
                      
                      {/* Floating category badge */}
                      <div className="absolute top-4 left-4">
                        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm text-navy border-white/50 text-xs">
                          {project.category}
                        </Badge>
                      </div>
                      
                      {/* Year badge */}
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-navy/80 backdrop-blur-sm text-white border-white/30 text-xs">
                          {project.year}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-navy group-hover:text-gold transition-colors duration-300">{project.title}</CardTitle>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-navy/70 line-clamp-2 text-sm mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 3).map((tech, i) => (
                          <Badge key={i} variant="secondary" className="bg-navy/5 text-navy/70 hover:bg-navy/10 text-xs py-1">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="secondary" className="bg-gold/10 text-gold hover:bg-gold/20 text-xs py-1">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between items-center pt-2">
                      <Link href={`/projects/${project._id}`} passHref>
                        <Button variant="ghost" className="p-3 text-gold hover:text-white transition-all duration-300 hover:translate-x-1 text-sm font-medium">
                          View Details <ChevronRight className="ml-1 h-3 w-3" />
                        </Button>
                      </Link>
                      {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          <Button variant="ghost" size="sm" className="text-navy/60 hover:text-navy transition-colors duration-300 h-8 w-8 p-0">
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </a>
                      )}
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
        
        <div className="text-center mt-12">
          <Link href="/projects" passHref>
            <Button variant="outline" className="border-2 border-navy/20 text-navy hover:bg-navy hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 shadow-lg hover:shadow-xl px-6 py-3 rounded-full group">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [api, setApi] = React.useState<CarouselApi>();

  // Auto-scroll functionality
  React.useEffect(() => {
    if (!api || !autoScrollEnabled) return;
    
    // Set up interval for auto-scrolling
    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000); // Scroll every 5 seconds
    
    return () => clearInterval(interval);
  }, [api, autoScrollEnabled]);

  // Handle mouse events to pause/resume auto-scroll
  // These will be used on individual cards instead of the whole section
  const handleMouseEnter = () => setAutoScrollEnabled(false);
  const handleMouseLeave = () => setAutoScrollEnabled(true);

  return (
    <section 
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy via-navy/95 to-navy/90 text-white relative overflow-hidden"
    >
      {/* Enhanced Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cream/5 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
        
        {/* Enhanced Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gold/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-gold/20 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-gold/20 rounded-full animate-bounce delay-1000"></div>
        
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-navy/30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-6 px-6 py-3 text-gold border-gold/30 bg-gold/5 text-sm font-medium rounded-full hover:bg-gold/10 transition-all duration-300 shadow-lg backdrop-blur-sm"
          >
            ✨ Testimonials
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white leading-tight">
            Kind words from <span className="text-gold bg-gradient-to-r from-gold via-gold/90 to-gold/80 bg-clip-text text-transparent drop-shadow-sm">satisfied clients</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold/60 mx-auto mb-6 rounded-full shadow-lg"></div>
          
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Hear what our clients have to say about working with us
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="relative px-4 sm:px-10 py-8"
        >
          <Carousel 
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full relative z-10"
          >
            <CarouselContent className="py-4">
              {/* Testimonial 1 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/2 p-4">
                <Card 
                  className="h-full border-none bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:z-20 rounded-xl shadow-2xl hover:shadow-gold/20 group relative overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden bg-navy/20 ring-2 ring-gold/20 group-hover:ring-gold/40 transition-all duration-300 shadow-xl">
                        <Image 
                          src="/placeholder-user.jpg" 
                          alt="Client"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium text-white group-hover:text-gold transition-colors duration-300">John Doe</CardTitle>
                        <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300">CEO, Tech Innovations</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex mb-4 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gold fill-gold group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                    <p className="text-white/80 italic leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      "Devalaya Infosys transformed our business with their innovative solutions. Their team's expertise and dedication to our project exceeded our expectations. We've seen a significant improvement in our operations and customer satisfaction."
                    </p>
                    
                    {/* Quote decoration */}
                    <div className="absolute top-4 right-4 text-gold/20 text-6xl font-serif group-hover:text-gold/30 transition-colors duration-300">"</div>
                  </CardContent>
                </Card>
              </CarouselItem>
              
              {/* Testimonial 2 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/2 p-4">
                <Card 
                  className="h-full border-none bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:z-20 rounded-xl shadow-2xl hover:shadow-gold/20 group relative overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden bg-navy/20 ring-2 ring-gold/20 group-hover:ring-gold/40 transition-all duration-300 shadow-xl">
                        <Image 
                          src="/placeholder-user.jpg" 
                          alt="Client"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium text-white group-hover:text-gold transition-colors duration-300">Jane Smith</CardTitle>
                        <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300">CTO, Global Solutions</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex mb-4 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gold fill-gold group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                    <p className="text-white/80 italic leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      "Working with Devalaya Infosys has been a game-changer for our company. Their technical expertise and attention to detail resulted in a product that perfectly aligned with our vision. The team was responsive, professional, and delivered on time."
                    </p>
                    
                    {/* Quote decoration */}
                    <div className="absolute top-4 right-4 text-gold/20 text-6xl font-serif group-hover:text-gold/30 transition-colors duration-300">"</div>
                  </CardContent>
                </Card>
              </CarouselItem>

              {/* Testimonial 3 */}
              <CarouselItem className="md:basis-1/2 lg:basis-1/2 p-4">
                <Card 
                  className="h-full border-none bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 hover:z-20 rounded-xl shadow-2xl hover:shadow-gold/20 group relative overflow-hidden"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden bg-navy/20 ring-2 ring-gold/20 group-hover:ring-gold/40 transition-all duration-300 shadow-xl">
                        <Image 
                          src="/placeholder-user.jpg" 
                          alt="Client"
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium text-white group-hover:text-gold transition-colors duration-300">Robert Johnson</CardTitle>
                        <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300">Marketing Director, NextGen</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex mb-4 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gold fill-gold group-hover:scale-110 transition-transform duration-300" style={{ animationDelay: `${i * 100}ms` }} />
                      ))}
                    </div>
                    <p className="text-white/80 italic leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      "The team at Devalaya Infosys exceeded all our expectations. Their attention to detail and commitment to quality resulted in a product that has significantly improved our customer engagement metrics."
                    </p>
                    
                    {/* Quote decoration */}
                    <div className="absolute top-4 right-4 text-gold/20 text-6xl font-serif group-hover:text-gold/30 transition-colors duration-300">"</div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <div className="flex justify-center mt-8">
              <div className="flex items-center justify-center gap-2">
                <div className="flex gap-1">
                  {!autoScrollEnabled ? (
                    <span className="text-xs text-gold bg-navy/70 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gold/20 shadow-lg animate-pulse">
                      Hover paused • Move mouse away to resume
                    </span>
                  ) : (
                    <span className="text-xs text-white/60 bg-navy/30 px-3 py-1.5 rounded-full backdrop-blur-sm">
                      Auto-scrolling active
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Carousel>
        </motion.div>
        
        {/* Enhanced decorative elements */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-gold/30 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-gold/30 rounded-full animate-pulse delay-300"></div>
            <div className="w-2 h-2 bg-gold/30 rounded-full animate-pulse delay-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream via-cream/98 to-cream/95 relative overflow-hidden">
      {/* Enhanced Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 bottom-0 w-80 h-80 bg-gold/8 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2 animate-pulse"></div>
        <div className="absolute right-0 top-0 w-80 h-80 bg-navy/8 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gold/3 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse delay-500"></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-5"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 left-1/6 w-4 h-4 bg-gold/10 rounded-full animate-bounce delay-200"></div>
        <div className="absolute top-3/4 right-1/6 w-3 h-3 bg-navy/10 rounded-full animate-bounce delay-800"></div>
        <div className="absolute bottom-1/4 left-2/3 w-5 h-5 bg-gold/10 rounded-full animate-bounce delay-1200"></div>
        
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-cream/90 via-transparent to-cream/80"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-6 px-6 py-3 text-navy border-navy/20 bg-navy/5 text-sm font-medium rounded-full hover:bg-navy/10 transition-all duration-300 shadow-lg backdrop-blur-sm"
          >
            📊 Our Impact
          </Badge>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-navy leading-tight">
            Numbers that <span className="text-gold bg-gradient-to-r from-gold via-gold/90 to-gold/80 bg-clip-text text-transparent drop-shadow-sm">speak volumes</span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold/60 mx-auto mb-6 rounded-full shadow-lg"></div>
          
          <p className="text-lg text-navy/70 max-w-2xl mx-auto leading-relaxed">
            Our achievements and milestones showcase our commitment to excellence
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {companyStats.stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index} 
                variants={fadeIn}
                className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group relative overflow-hidden border border-white/20"
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                {/* Icon container with enhanced styling */}
                <div className="relative z-10 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-navy/10 to-navy/5 rounded-full mb-6 text-gold shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110">
                  <Icon className="h-10 w-10 text-gold group-hover:text-gold/90 transition-colors duration-300" />
                  
                  {/* Icon glow effect */}
                  <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                </div>
                
                {/* Enhanced number with counter animation effect */}
                <div className="relative z-10">
                  <h3 className="text-4xl md:text-5xl font-bold text-navy mb-3 bg-gradient-to-r from-navy via-navy/90 to-navy/80 bg-clip-text text-transparent group-hover:from-gold group-hover:via-gold/90 group-hover:to-gold/80 transition-all duration-500">
                    {stat.value}
                  </h3>
                  
                  <p className="text-navy/70 font-medium group-hover:text-navy/90 transition-colors duration-300 leading-relaxed">
                    {stat.label}
                  </p>
                </div>
                
                {/* Decorative corner elements */}
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-gold/10 rounded-tr-xl group-hover:border-gold/30 transition-colors duration-300"></div>
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-gold/10 rounded-bl-xl group-hover:border-gold/30 transition-colors duration-300"></div>
                
                {/* Floating number decoration */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gold/10 rounded-full group-hover:bg-gold/20 transition-colors duration-300"></div>
              </motion.div>
            );
          })}
        </motion.div>
        
        {/* Enhanced bottom decoration */}
        <div className="mt-16 flex justify-center">
          <div className="flex space-x-3">
            <div className="w-3 h-3 bg-gold/20 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-navy/20 rounded-full animate-pulse delay-300"></div>
            <div className="w-3 h-3 bg-gold/20 rounded-full animate-pulse delay-600"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TemplatesSection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Enhanced Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-cream/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 opacity-70 animate-pulse"></div>
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-gold/5 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2 animate-pulse delay-1000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-gold/20 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-1/3 left-1/3 w-6 h-6 bg-navy/10 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-cream/40 rounded-full animate-bounce delay-1000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(31,43,69,0.05)_1px,transparent_0)] bg-[size:20px_20px] opacity-30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge 
            variant="outline" 
            className="mb-6 px-6 py-3 text-navy border-navy/30 bg-navy/5 text-sm font-medium rounded-full backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Ready-to-Use Solutions
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-navy relative">
            Website Templates
            <div className="absolute -inset-1 bg-gradient-to-r from-gold/20 via-transparent to-gold/20 blur-xl opacity-30 animate-pulse"></div>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-gold to-gold/60 mx-auto mb-6 rounded-full shadow-lg"></div>
          
          <p className="text-lg text-navy/70 max-w-2xl mx-auto leading-relaxed">
            Ready-to-use templates for your business
          </p>
        </motion.div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Enhanced Template Preview 1 */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group border border-navy/10 hover:border-gold/30 relative overflow-hidden">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-navy/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative h-64 w-full overflow-hidden rounded-xl mb-6 border border-navy/10 group-hover:border-gold/20 transition-colors shadow-lg">
              <Image 
                src="/placeholder.jpg" 
                alt="Business Template"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent flex items-end p-6">
                <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-white text-xl font-semibold mb-2">Business Template</h3>
                  <p className="text-white/90 text-sm">Perfect for corporate and professional services</p>
                </div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="flex justify-between items-center relative z-10">
              <div className="flex gap-2">
                <Badge className="bg-navy/10 text-navy hover:bg-navy/20 border-none transition-all duration-300 hover:scale-105">
                  Corporate
                </Badge>
                <Badge className="bg-navy/10 text-navy hover:bg-navy/20 border-none transition-all duration-300 hover:scale-105">
                  Professional
                </Badge>
              </div>
              <Button size="sm" className="bg-gold hover:bg-gold/90 text-navy transition-all duration-300 transform group-hover:scale-110 shadow-lg hover:shadow-xl">
                View Demo
              </Button>
            </div>
          </div>
          
          {/* Enhanced Template Preview 2 */}
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 group border border-navy/10 hover:border-gold/30 relative overflow-hidden">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy/5 via-transparent to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative h-64 w-full overflow-hidden rounded-xl mb-6 border border-navy/10 group-hover:border-gold/20 transition-colors shadow-lg">
              <Image 
                src="/placeholder.jpg" 
                alt="E-commerce Template"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent flex items-end p-6">
                <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                  <h3 className="text-white text-xl font-semibold mb-2">E-commerce Template</h3>
                  <p className="text-white/90 text-sm">Fully-featured online store solution</p>
                </div>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div className="flex justify-between items-center relative z-10">
              <div className="flex gap-2">
                <Badge className="bg-navy/10 text-navy hover:bg-navy/20 border-none transition-all duration-300 hover:scale-105">
                  E-commerce
                </Badge>
                <Badge className="bg-navy/10 text-navy hover:bg-navy/20 border-none transition-all duration-300 hover:scale-105">
                  Shop
                </Badge>
              </div>
              <Button size="sm" className="bg-gold hover:bg-gold/90 text-navy transition-all duration-300 transform group-hover:scale-110 shadow-lg hover:shadow-xl">
                View Demo
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy via-navy/95 to-navy/90 text-white relative overflow-hidden">
      {/* Enhanced Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse delay-300"></div>
        <div className="absolute right-0 bottom-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 animate-pulse delay-700"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gold/10 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-cream/10 rounded-full blur-2xl animate-float delay-500"></div>
        
        {/* Enhanced Grid pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(177,132,61,0.1)_1px,transparent_0)] bg-[size:30px_30px] opacity-30"></div>
        
        {/* Moving dots */}
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-gold/40 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-cream/40 rounded-full animate-ping delay-1000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          className="text-center"
        >
          <Badge 
            variant="outline" 
            className="mb-8 px-6 py-3 text-gold border-gold/40 bg-gold/10 text-sm font-medium rounded-full inline-block backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Let's Work Together
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white relative">
            Ready to take your{' '}
            <span className="relative inline-block">
              <span className="text-gold bg-gradient-to-r from-gold via-gold/90 to-gold/80 bg-clip-text text-transparent">
                digital presence
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-gold/20 via-gold/10 to-gold/20 blur-xl opacity-50 animate-pulse"></div>
            </span>
            {' '}to the next level?
          </h2>
          
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-12 leading-relaxed">
            Let's work together to create innovative solutions that drive your business forward
          </p>
          
            <Link href="/contact" passHref>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white/30 text-navy bg-gold hover:bg-white hover:text-navy transition-all duration-300 transform hover:translate-y-[-3px] hover:scale-105 backdrop-blur-sm shadow-xl px-6 py-3 rounded-full group"
              >
                Get in Touch
                <ArrowUpRight className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Button>
            </Link>
        </motion.div>
      </div>
    </section>
  );
};

export function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <StatsSection />
      <TemplatesSection />
      <CTASection />
    </div>
  )
}

export default function MainPage() {
  // Use the HomePage component to avoid code duplication
  return <HomePage />;
}