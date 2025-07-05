import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mail, Linkedin, Github, Award, Users, Target, ChevronRight, Sparkles, Clock } from "lucide-react"
import { teamMembers, companyValues, aboutHero, companyStory, companyStats } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-cream/30 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center mb-6 bg-navy/5 px-4 py-2 rounded-full text-navy font-medium">
            <Sparkles className="h-4 w-4 mr-2 text-gold" />
            <span>{aboutHero.subtitle}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-black tracking-tight">
            {aboutHero.title.split(" ").map((word, index, array) => (
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
            {aboutHero.description}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-gold/30 via-gold to-gold/30 mx-auto rounded-full"></div>
        </div>
        </section>

      {/* Company Story */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-navy/5 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center justify-center mb-6 bg-navy/5 px-4 py-2 rounded-full text-navy font-medium">
                <Clock className="h-4 w-4 mr-2 text-gold" />
                <span>{companyStory.subtitle}</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-navy mb-8 tracking-tight">
                {companyStory.title.split(" ").map((word, index, array) => (
                  <React.Fragment key={index}>
                    {index === array.length - 1 ? (
                      <span className="relative inline-block">{word}<span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gold rounded-full"></span></span>
                    ) : (
                      <>{word} </>
                    )}
                  </React.Fragment>
                ))}
              </h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                {companyStory.paragraphs.map((paragraph, index) => {
                  const opacity = 0.8 - (index * 0.2);
                  return (
                    <p 
                      key={index} 
                      className={`relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-gold/${Math.round(opacity * 100)} before:to-${index === companyStory.paragraphs.length - 1 ? 'transparent' : `gold/${Math.round((opacity - 0.2) * 100)}`} before:rounded-full`}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="bg-gradient-to-br from-cream to-white p-10 rounded-3xl shadow-xl border border-gold/10 transform hover:scale-[1.02] transition-all duration-500">
              <div className="grid grid-cols-2 gap-10">
                {companyStats.stats.map((stat, index) => (
                  <div key={index} className="text-center group cursor-pointer transform transition-all duration-300 hover:-translate-y-1">
                    <div className="w-16 h-16 bg-navy/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-navy/10 transition-colors duration-300">
                      {React.createElement(stat.icon, { className: "h-8 w-8 text-gold" })}
                    </div>
                    <div className="text-4xl font-bold text-gold mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                    <div className="text-navy/70 font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-navy/5 bg-[size:30px_30px] opacity-30"></div>
        <div className="absolute left-1/4 bottom-0 w-72 h-72 bg-navy/5 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 top-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6 bg-navy/5 px-4 py-2 rounded-full text-navy font-medium">
              <Sparkles className="h-4 w-4 mr-2 text-gold" />
              <span>What Drives Us</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-navy mb-6 tracking-tight">Our <span className="relative inline-block">Values<span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gold rounded-full"></span></span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape our company culture
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {companyValues.map((value, index) => (
              <Card 
                key={index} 
                className={cn(
                  "border-0 shadow-lg group hover:shadow-xl transition-all duration-500 bg-white overflow-hidden",
                  "transform hover:-translate-y-2 hover:border-gold/20 hover:border"
                )}
              >
                <CardContent className="p-10 text-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold/5 transition-colors duration-500"></div>
                  <div className="w-20 h-20 bg-gradient-to-br from-gold to-gold/80 rounded-2xl flex items-center justify-center mx-auto mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg">
                    <value.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy mb-4 group-hover:text-gold transition-colors duration-300">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-gold font-medium flex items-center">
                      Learn more <ChevronRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-fixed bg-no-repeat bg-center opacity-[0.02] pointer-events-none"></div>
        <div className="absolute left-0 top-1/3 w-72 h-72 bg-navy/5 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-1/3 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-6 bg-navy/5 px-4 py-2 rounded-full text-navy font-medium">
              <Users className="h-4 w-4 mr-2 text-gold" />
              <span>Our Experts</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-navy mb-6 tracking-tight">Meet Our <span className="relative inline-block">Team<span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gold rounded-full"></span></span></h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Talented professionals passionate about technology and committed to delivering exceptional results
            </p>
          </div>

          <div className="grid gap-10">
            {/* Featured Team Members (First Row) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {teamMembers.slice(0, 2).map((member, index) => (
              <Card
                key={index}
                className="group overflow-hidden hover:shadow-lg transition-all duration-500 border-0 shadow-md bg-white transform hover:-translate-y-2"
              >
                <div className="relative">
                  <div className="aspect-[3/2] overflow-hidden bg-gradient-to-br from-cream to-white">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                    <div className="flex gap-3 mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <a
                        href={`mailto:${member.email}`}
                        className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors duration-300"
                      >
                        <Mail className="h-5 w-5" />
                      </a>
                      <a 
                        href={member.linkedin} 
                        className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors duration-300"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                      <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors duration-300"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-navy group-hover:text-gold transition-colors duration-300">{member.name}</h3>
                      <p className="text-gold font-semibold text-base">{member.role}</p>
                    </div>
                    <div className="w-10 h-10 bg-navy/5 rounded-full flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                      <ChevronRight className="h-5 w-5 text-gold" />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm line-clamp-4">{member.bio}</p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-gold/10 text-gold hover:bg-gold hover:text-white transition-colors duration-300 border-0 text-xs py-1"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
            
            {/* Other Team Members - Smaller cards in rows of 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {teamMembers.slice(2).map((member, index) => (
              <Card
                key={index + 2}
                className="group overflow-hidden hover:shadow-md transition-all duration-500 border-0 shadow-sm bg-white transform hover:-translate-y-1"
              >
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden bg-gradient-to-br from-cream to-white">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
                    <div className="flex gap-2 mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <a
                        href={`mailto:${member.email}`}
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors duration-300"
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                      <a 
                        href={member.linkedin} 
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors duration-300"
                      >
                        <Linkedin className="h-3.5 w-3.5" />
                      </a>
                      <a 
                        href="#" 
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-gold hover:text-white transition-colors duration-300"
                      >
                        <Github className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-base font-bold text-navy group-hover:text-gold transition-colors duration-300">{member.name}</h3>
                      <p className="text-gold font-semibold text-xs">{member.role}</p>
                    </div>
                    <div className="w-7 h-7 bg-navy/5 rounded-full flex items-center justify-center group-hover:bg-gold/10 transition-colors duration-300">
                      <ChevronRight className="h-3.5 w-3.5 text-gold" />
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-xs mb-3 leading-relaxed line-clamp-2">{member.bio}</p>

                  <div className="flex flex-wrap gap-1 mb-1">
                    {member.skills.slice(0, 2).map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="bg-gold/10 text-gold hover:bg-gold hover:text-white transition-colors duration-300 border-0 text-[10px] py-0.5 px-1.5"
                      >
                        {skill}
                      </Badge>
                    ))}
                    {member.skills.length > 2 && (
                      <Badge
                        variant="secondary"
                        className="bg-navy/5 text-navy hover:bg-navy/10 transition-colors duration-300 border-0 text-[10px] py-0.5 px-1.5"
                      >
                        +{member.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
