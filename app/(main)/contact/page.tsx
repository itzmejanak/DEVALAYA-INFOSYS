"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, Clock, Send, ArrowRight, CheckCircle, Globe, HeartHandshake, Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { contactInfo, contactHero } from "@/lib/data"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Thank you for your message! We'll get back to you within 24 hours.")
    setFormData({ name: "", email: "", company: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

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
            <HeartHandshake className="h-4 w-4 mr-2 text-accent" />
            <span>{contactHero.subtitle}</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-primary tracking-tight">
            {contactHero.title.split(" ")[0]} <span className="text-accent relative inline-block">{contactHero.title.split(" ")[1]}<span className="absolute -bottom-2 left-0 w-full h-1 bg-accent rounded-full"></span></span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            {contactHero.description}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-accent/30 via-accent to-accent/30 mx-auto rounded-full"></div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute left-0 top-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute right-0 bottom-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2 flex flex-col h-full">
              <Card className="border-0 shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-500 bg-white transform hover:-translate-y-1 rounded-2xl h-full flex flex-col">
                {/* Enhanced decorative elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-accent/5 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -ml-24 -mb-24 group-hover:bg-primary/5 transition-colors duration-500"></div>
                <div className="absolute top-1/2 left-0 w-16 h-16 bg-accent/10 rounded-full blur-xl -ml-8 opacity-70"></div>
                <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-primary/10 rounded-full blur-md opacity-70"></div>
                
                <CardHeader className="pb-4 relative z-10 pt-8">
                  <CardTitle className="text-xl font-bold text-primary">Send Us a Message</CardTitle>
                  <p className="text-muted-foreground mt-2">
                    Fill out the form below and we'll get back to you within 24 hours.
                  </p>
                </CardHeader>
                <CardContent className="relative z-10 px-8 pb-8 flex-1">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div className="space-y-2 group">
                        <Label htmlFor="name" className="text-sm font-medium flex items-center text-primary/80 group-focus-within:text-accent transition-colors duration-200">
                          <span className="mr-2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">→</span>
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-xl border-border focus:border-accent/50 focus:ring-accent/30 transition-all duration-300 bg-primary/[0.02] focus:bg-white"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2 group">
                        <Label htmlFor="email" className="text-sm font-medium flex items-center text-primary/80 group-focus-within:text-accent transition-colors duration-200">
                          <span className="mr-2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">→</span>
                          Email Address *
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-xl border-border focus:border-accent/50 focus:ring-accent/30 transition-all duration-300 bg-primary/[0.02] focus:bg-white"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="company" className="text-sm font-medium flex items-center text-primary/80 group-focus-within:text-accent transition-colors duration-200">
                        <span className="mr-2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">→</span>
                        Company Name
                      </Label>
                      <Input
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="h-12 rounded-xl border-border focus:border-accent/50 focus:ring-accent/30 transition-all duration-300 bg-primary/[0.02] focus:bg-white"
                        placeholder="Your Company"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="subject" className="text-sm font-medium flex items-center text-primary/80 group-focus-within:text-accent transition-colors duration-200">
                        <span className="mr-2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">→</span>
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-xl border-border focus:border-accent/50 focus:ring-accent/30 transition-all duration-300 bg-primary/[0.02] focus:bg-white"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <Label htmlFor="message" className="text-sm font-medium flex items-center text-primary/80 group-focus-within:text-accent transition-colors duration-200">
                        <span className="mr-2 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200">→</span>
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="resize-none rounded-xl border-border focus:border-accent/50 focus:ring-accent/30 transition-all duration-300 bg-primary/[0.02] focus:bg-white"
                        placeholder="Tell us about your project..."
                      />
                    </div>

                    <div className="pt-6">
                      <div className="relative group">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-amber-500 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-500"></div>
                        <Button
                          type="submit"
                          className="relative w-full bg-gradient-to-r from-accent to-amber-500 hover:from-amber-500 hover:to-accent text-white h-14 font-medium border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl text-lg"
                        >
                          Send Message
                          <Send className="ml-2 h-5 w-5 animate-pulse" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-center mt-4 bg-primary/5 py-2 px-4 rounded-lg">
                        <CheckCircle className="h-5 w-5 mr-2 text-accent" />
                        <p className="text-center text-gray-600 text-sm">
                          Your information is secure and encrypted
                        </p>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Info & Stats */}
            <div className="flex flex-col h-full">
              {/* Contact Information */}
              <Card className="border-0 shadow-xl group hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-cream to-white overflow-hidden transform hover:scale-[1.02] hover:border-gold/10 hover:border rounded-3xl h-full flex flex-col">
              
                <CardHeader className="relative pt-8 pb-4">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-navy/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-gold/5 transition-colors duration-500"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl -ml-12 -mb-12 group-hover:bg-navy/5 transition-colors duration-500"></div>
                  <CardTitle className="text-xl font-bold text-navy">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10 px-6 pb-6 flex-1">
                  <div className="flex items-start space-x-3 group/item hover:-translate-y-1 transition-transform duration-300 p-2 hover:bg-navy/[0.02] rounded-xl">
                    <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center group-hover/item:bg-gold/10 transition-colors duration-300 shadow-sm">
                      <MapPin className="h-4 w-4 text-gold group-hover/item:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-navy">Address</h4>
                      <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                        {contactInfo.address.line1}<br />
                        {contactInfo.address.line2}<br />
                        {contactInfo.address.city} {contactInfo.address.postalCode}, {contactInfo.address.country}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 group/item hover:-translate-y-1 transition-transform duration-300 p-2 hover:bg-navy/[0.02] rounded-xl">
                    <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center group-hover/item:bg-gold/10 transition-colors duration-300 shadow-sm">
                      <Phone className="h-4 w-4 text-gold group-hover/item:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-navy">Phone</h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-gold transition-colors duration-300">
                          {contactInfo.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 group/item hover:-translate-y-1 transition-transform duration-300 p-2 hover:bg-navy/[0.02] rounded-xl">
                    <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center group-hover/item:bg-gold/10 transition-colors duration-300 shadow-sm">
                      <Mail className="h-4 w-4 text-gold group-hover/item:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-navy">Email</h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        <a href={`mailto:${contactInfo.email}`} className="hover:text-gold transition-colors duration-300">
                          {contactInfo.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 group/item hover:-translate-y-1 transition-transform duration-300 p-2 hover:bg-navy/[0.02] rounded-xl">
                    <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center group-hover/item:bg-gold/10 transition-colors duration-300 shadow-sm">
                      <Globe className="h-4 w-4 text-gold group-hover/item:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-navy">Website</h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        <a href={contactInfo.website.url} target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold/80 hover:underline transition-colors duration-300">
                          {contactInfo.website.display}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 group/item hover:-translate-y-1 transition-transform duration-300 p-2 hover:bg-navy/[0.02] rounded-xl">
                    <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center group-hover/item:bg-gold/10 transition-colors duration-300 shadow-sm">
                      <Clock className="h-4 w-4 text-gold group-hover/item:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-navy">Hours</h4>
                      <p className="text-xs text-gray-600 mt-0.5">
                        <span className="text-gold font-medium text-xs">{contactInfo.hours.status}</span> · {contactInfo.hours.closing}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-navy/10">
                    <h4 className="font-medium text-navy mb-2">Connect With Us</h4>
                    <div className="flex space-x-3">
                      {contactInfo.socialMedia.map((social, index) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-navy/5 rounded-full flex items-center justify-center hover:bg-gold/10 transition-colors duration-300"
                        >
                          {React.createElement(social.icon, { 
                            className: "h-3.5 w-3.5 text-navy hover:text-gold transition-colors duration-300" 
                          })}
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
      </section>

      {/* Map Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream/30 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-navy/5 bg-[size:30px_30px] opacity-30"></div>
        <div className="absolute left-1/4 bottom-0 w-72 h-72 bg-navy/5 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 top-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center mb-6 bg-navy/5 px-4 py-2 rounded-full text-navy font-medium">
              <MapPin className="h-4 w-4 mr-2 text-gold" />
              <span>Our Location</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-navy mb-6 tracking-tight">Visit Our <span className="relative inline-block">Office<span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-gold rounded-full"></span></span></h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Come meet our team in person and discuss your project face-to-face.
            </p>
          </div>
          
          <div className="aspect-w-16 aspect-h-9 rounded-2xl overflow-hidden shadow-xl border-4 border-white transform hover:scale-[1.01] transition-all duration-500 hover:shadow-2xl group">
            <div className="aspect-[16/9] w-full relative">
              <div className="absolute inset-0 bg-gradient-to-b from-navy/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
              <iframe
                src={contactInfo.address.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 grayscale hover:grayscale-0 transition-all duration-500"
                title={contactInfo.mapEmbed.locationName}
                allowFullScreen
              />
              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg max-w-xs border border-gold/20 transform group-hover:scale-105 transition-transform duration-300">
                <h3 className="font-bold text-navy mb-2">{contactInfo.mapEmbed.locationName}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {contactInfo.address.line1}<br />
                  {contactInfo.address.city} {contactInfo.address.postalCode}, {contactInfo.address.country}
                </p>
                <Button 
                  className="w-full bg-gradient-to-r from-gold to-amber-500 hover:from-amber-500 hover:to-gold text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                  onClick={() => window.open(contactInfo.mapEmbed.directionsUrl, "_blank")}
                >
                  Get Directions
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}