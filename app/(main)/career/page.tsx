'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, ChevronRight, Mail, Briefcase, MapPin, Clock, Building, ArrowRight, Sparkles } from 'lucide-react';
import { careerHero } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';

interface Career {
  _id: string;
  title: string;
  description: string;
  requirements: string[];
  qualifications: string[];
  experience: string;
  location: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  // Optional properties used in the UI but not in the database model
  department?: string;
  type?: string;
}

export default function CareerPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCareer, setExpandedCareer] = useState<string | null>(null);
  const [expandedHowToApply, setExpandedHowToApply] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await fetch('/api/careers');
        if (!response.ok) {
          throw new Error('Failed to fetch career opportunities');
        }
        const data = await response.json();
        setCareers(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load career opportunities',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCareers();
  }, [toast]);

  const toggleCareerExpansion = (careerId: string) => {
    if (expandedCareer === careerId) {
      setExpandedCareer(null);
    } else {
      setExpandedCareer(careerId);
    }
  };

  const toggleHowToApply = (careerId: string) => {
    if (expandedHowToApply === careerId) {
      setExpandedHowToApply(null);
    } else {
      setExpandedHowToApply(careerId);
    }
  };

  // Loading state is now handled by loading.tsx

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-secondary/30 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="absolute inset-0 bg-grid-primary/5 bg-[size:30px_30px] opacity-30"></div>
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center mb-6 bg-primary/5 px-4 py-2 rounded-full text-primary font-medium">
            <Briefcase className="h-4 w-4 mr-2 text-accent" />
            <span>{careerHero.subtitle}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary tracking-tight">
            {careerHero.title.split(" ")[0]} <span className="text-accent relative inline-block">{careerHero.title.split(" ")[1]}<span className="absolute -bottom-2 left-0 w-full h-1 bg-accent rounded-full"></span></span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            {careerHero.description}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-accent/30 via-accent to-accent/30 mx-auto rounded-full"></div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute left-0 top-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6 bg-primary/5 px-4 py-2 rounded-full text-primary font-medium">
              <Sparkles className="h-4 w-4 mr-2 text-accent" />
              <span>Open Positions</span>
            </div>
          </div>
          


      {careers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No career opportunities available at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 max-w-5xl mx-auto">
          {careers.map((career) => (
            <Card 
              key={career._id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white transform hover:-translate-y-1 hover:border-accent/20 hover:border rounded-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/5 transition-colors duration-500"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -ml-12 -mb-12 group-hover:bg-primary/5 transition-colors duration-500"></div>
              
              <CardHeader className="relative z-10 border-b border-border/30 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <Badge variant="outline" className="mb-2 bg-secondary/50 text-primary border-0 hover:bg-accent hover:text-white transition-colors duration-300">
                      {career.department as string || 'Full-time'}
                    </Badge>
                    <CardTitle className="text-2xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {career.title}
                    </CardTitle>
                    <CardDescription className="mt-3 flex flex-wrap gap-4 text-sm">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-accent" />
                        {career.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-accent" />
                        {career.experience}
                      </span>
                      <span className="flex items-center">
                        <Building className="h-4 w-4 mr-2 text-accent" />
                        {career.type || 'Full-time'}
                      </span>
                    </CardDescription>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => toggleCareerExpansion(career._id)}
                    className="flex items-center hover:text-accent"
                  >
                    {expandedCareer === career._id ? (
                      <>
                        <span>Hide Details</span>
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        <span>View Details</span>
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10 pt-6">
                <p className="text-muted-foreground mb-6">{career.description}</p>
                
                {expandedCareer === career._id && (
                  <div className="mt-6 bg-secondary/20 p-6 rounded-xl animate-in fade-in-50 slide-in-from-top-5 duration-300">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-primary flex items-center">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                        </span>
                        Requirements
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {career.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-accent mr-2 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-4 text-primary flex items-center">
                        <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                        </span>
                        Qualifications
                      </h3>
                      <ul className="space-y-2 text-muted-foreground">
                        {career.qualifications.map((qual, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-accent mr-2 mt-1">•</span>
                            <span>{qual}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <div id={`how-to-apply-${career._id}`} className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-primary flex items-center">
                          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                            <Mail className="h-4 w-4 text-accent" />
                          </span>
                          How to Apply
                        </h3>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleHowToApply(career._id);
                          }}
                          className="flex items-center hover:text-accent"
                        >
                          {expandedHowToApply === career._id ? (
                            <>
                              <span className="text-xs">Hide Process</span>
                              <ChevronUp className="ml-1 h-3 w-3" />
                            </>
                          ) : (
                            <>
                              <span className="text-xs">Show Process</span>
                              <ChevronDown className="ml-1 h-3 w-3" />
                            </>
                          )}
                        </Button>
                      </div>
                      
                      {expandedHowToApply === career._id && (
                        <div className="bg-white/50 p-4 rounded-lg border border-accent/10 mt-2 animate-in fade-in-50 slide-in-from-top-5 duration-300">
                          <div className="space-y-3 text-muted-foreground">
                            <p className="flex items-start">
                              <span className="text-accent mr-2 mt-1 font-bold">1.</span>
                              <span>Review the job requirements and qualifications carefully.</span>
                            </p>
                            <p className="flex items-start">
                              <span className="text-accent mr-2 mt-1 font-bold">2.</span>
                              <span>Prepare your CV and cover letter tailored to this position.</span>
                            </p>
                            <p className="flex items-start">
                              <span className="text-accent mr-2 mt-1 font-bold">3.</span>
                              <span>Send your application to{' '}
                                <a href={`mailto:career@devalayainfosys.com.np?subject=Application for ${career.title}`} className="text-accent font-medium hover:underline transition-colors duration-300">
                                  career@devalayainfosys.com.np
                                </a>
                              </span>
                            </p>
                            <p className="flex items-start">
                              <span className="text-accent mr-2 mt-1 font-bold">4.</span>
                              <span>Include the position title "{career.title}" in your email subject line.</span>
                            </p>
                            <p className="flex items-start">
                              <span className="text-accent mr-2 mt-1 font-bold">5.</span>
                              <span>Mention where you found the job listing.</span>
                            </p>
                            
                            <div className="pt-3 mt-2 border-t border-accent/10">
                              <Button 
                                variant="default" 
                                className="w-full flex items-center justify-center bg-accent hover:bg-primary text-white transition-colors duration-300 mt-2"
                                onClick={() => window.location.href = `mailto:career@devalayainfosys.com.np?subject=Application for ${career.title}`}
                              >
                                Apply Now
                                <Mail className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between items-center relative z-10 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => toggleCareerExpansion(career._id)}
                  className="flex items-center border-accent/20 text-primary hover:text-accent hover:bg-secondary/80 transition-all duration-300"
                >
                  <span>{expandedCareer === career._id ? 'Show Less' : 'Show More'}</span>
                  {expandedCareer === career._id ? (
                    <ChevronUp className="ml-2 h-4 w-4 transition-transform duration-300" />
                  ) : (
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                  )}
                </Button>
                
                <Button 
                  variant="default" 
                  className="flex items-center bg-primary hover:bg-accent text-white transition-colors duration-300"
                  onClick={() => {
                    if (expandedCareer !== career._id) {
                      toggleCareerExpansion(career._id);
                    }
                    if (expandedHowToApply !== career._id) {
                      toggleHowToApply(career._id);
                    }
                    // Scroll to the how to apply section with smooth behavior
                    setTimeout(() => {
                      const element = document.getElementById(`how-to-apply-${career._id}`);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    }, 100);
                  }}
                >
                  How to Apply
                  <Mail className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
        </div>
      </section>
    </div>
  );
}