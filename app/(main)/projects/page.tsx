import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, ExternalLink, ChevronRight, Globe, Database, Shield, Cpu } from "lucide-react"
import { projectsHero } from "@/lib/data"
import { cn } from "@/lib/utils"

// Function to get the icon component based on the icon name string
const getIconComponent = (iconName: string) => {
  const iconMap: Record<string, React.ElementType> = {
    Code,
    Globe,
    Database,
    Shield,
    Cpu
  };
  return iconMap[iconName] || Code;
};

async function getProjects() {
  try {
    // Use absolute URL to avoid URL parsing errors
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = process.env.VERCEL_URL || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    
    const res = await fetch(`${baseUrl}/api/projects`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error loading projects:', error);
    return [];
  }
}

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-cream/30 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center mb-6 bg-navy/5 px-4 py-2 rounded-full text-navy font-medium">
            <Code className="h-4 w-4 mr-2 text-gold" />
            <span>{projectsHero.subtitle}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-black tracking-tight">
            {projectsHero.title.split(" ").map((word, index, array) => (
              <React.Fragment key={index}>
                {index === array.length - 1 ? (
                  <span className="text-gold relative inline-block">{word}<span className="absolute -bottom-2 left-0 w-full h-1 bg-gold rounded-full"></span></span>
                ) : (
                  <>{word} </>
                )}
              </React.Fragment>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {projectsHero.description}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-fixed bg-no-repeat bg-center opacity-[0.02] pointer-events-none"></div>
        <div className="absolute left-0 top-1/3 w-72 h-72 bg-navy/5 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-1/3 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6 bg-navy/5 px-4 py-2 rounded-full text-navy font-medium">
              <Code className="h-4 w-4 mr-2 text-gold" />
              <span>Featured Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 tracking-tight">Our <span className="relative inline-block">Flagship<span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gold rounded-full"></span></span> Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Innovative solutions that showcase our expertise and commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {projects.filter((project: any) => project.featured).map((project: any, index: number) => (
              <Card 
                key={index} 
                className={cn(
                  "group overflow-hidden hover:shadow-xl transition-all duration-500 border-0 shadow-lg bg-white",
                  "transform hover:-translate-y-2"
                )}
              >
                <div className="relative">
                  <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-cream to-white">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="absolute top-4 right-4 bg-navy/80 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>
                
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-navy group-hover:text-gold transition-colors duration-300">{project.title}</h3>
                      <p className="text-gold/80 font-medium text-sm mt-1">{project.client} • {project.year}</p>
                    </div>
                    <div className="w-12 h-12 bg-navy/5 rounded-full flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                      {React.createElement(getIconComponent(project.icon), { className: "h-6 w-6 text-gold" })}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech: string, techIndex: number) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-navy/5 text-navy hover:bg-navy/10 transition-colors duration-300 border-0"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <span className="font-medium">{project.duration}</span> duration
                    </div>
                    <a 
                      href={project.link} 
                      className="text-gold font-medium flex items-center text-sm hover:underline"
                    >
                      View Project <ChevronRight className="h-4 w-4 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-navy/5 bg-[size:30px_30px] opacity-30"></div>
        <div className="absolute left-1/4 bottom-0 w-72 h-72 bg-navy/5 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 top-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6 bg-navy/5 px-4 py-2 rounded-full text-navy font-medium">
              <Code className="h-4 w-4 mr-2 text-gold" />
              <span>Portfolio</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6 tracking-tight">More <span className="relative inline-block">Projects<span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gold rounded-full"></span></span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our diverse range of successful client projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.filter((project: any) => !project.featured).map((project: any, index: number) => (
              <Card 
                key={index} 
                className="group overflow-hidden hover:shadow-lg transition-all duration-500 border-0 shadow-md bg-white transform hover:-translate-y-1"
              >
                <div className="relative">
                  <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-cream to-white">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="absolute top-3 right-3 bg-navy/80 text-white text-xs font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {project.category}
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-navy group-hover:text-gold transition-colors duration-300">{project.title}</h3>
                      <p className="text-gold/80 font-medium text-xs mt-0.5">{project.client} • {project.year}</p>
                    </div>
                    <div className="w-10 h-10 bg-navy/5 rounded-full flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                      {React.createElement(getIconComponent(project.icon), { className: "h-5 w-5 text-gold" })}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.technologies.slice(0, 3).map((tech: string, techIndex: number) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="bg-navy/5 text-navy hover:bg-navy/10 transition-colors duration-300 border-0 text-xs py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge
                        variant="secondary"
                        className="bg-navy/5 text-navy hover:bg-navy/10 transition-colors duration-300 border-0 text-xs py-0.5"
                      >
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">{project.duration}</span>
                    </div>
                    <a 
                      href={project.link} 
                      className="text-gold font-medium flex items-center text-xs hover:underline"
                    >
                      Details <ChevronRight className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-navy to-navy/90 rounded-3xl p-12 md:p-16 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute left-0 bottom-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Start Your <span className="text-gold">Next Project</span>?</h2>
            <p className="text-xl text-white/80 mb-10 max-w-3xl mx-auto">
              Let's collaborate to bring your vision to life with innovative technology solutions tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="px-8 py-4 bg-gold hover:bg-gold/90 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
              >
                Contact Us
              </a>
              <a 
                href="#" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm text-center"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}