import { Award, Users, Target, Zap, Star, Clock, Linkedin, Twitter, Facebook, Instagram, Code, Globe, Database, Shield, Cpu } from "lucide-react"

// Team Members Data
export const teamMembers = [
  {
    name: "Rajesh Kumar",
    role: "Chief Executive Officer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Visionary leader with 15+ years in IT strategy and business transformation. Drives innovation and excellence across all operations.",
    skills: ["Strategic Planning", "Business Development", "Leadership", "Digital Transformation"],
    email: "rajesh@devalaya.com",
    linkedin: "#",
  },
  {
    name: "Priya Sharma",
    role: "Chief Technology Officer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Technology innovator specializing in cloud architecture and emerging technologies. Leads our technical vision and implementation.",
    skills: ["Cloud Architecture", "AI/ML", "System Design", "Innovation"],
    email: "priya@devalaya.com",
    linkedin: "#",
  },
  {
    name: "Amit Patel",
    role: "Senior Software Engineer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Full-stack developer with expertise in modern web technologies. Delivers scalable solutions for complex business requirements.",
    skills: ["React", "Node.js", "Python", "AWS", "DevOps"],
    email: "amit@devalaya.com",
    linkedin: "#",
  },
  {
    name: "Neha Gupta",
    role: "UX/UI Designer",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Creative designer with a passion for crafting intuitive and engaging user experiences. Combines aesthetics with functionality to create impactful designs.",
    skills: ["UI Design", "User Research", "Prototyping", "Figma", "Adobe Creative Suite"],
    email: "neha@devalaya.com",
    linkedin: "#",
  },
  {
    name: "Vikram Singh",
    role: "Project Manager",
    image: "/placeholder.svg?height=400&width=400",
    bio: "Experienced project manager with a track record of delivering complex IT projects on time and within budget. Expert in agile methodologies.",
    skills: ["Agile", "Scrum", "Risk Management", "Stakeholder Communication", "Resource Planning"],
    email: "vikram@devalaya.com",
    linkedin: "#",
  }
]

// Company Values
export const companyValues = [
  {
    icon: Target,
    title: "Innovation",
    description:
      "We constantly push boundaries and explore cutting-edge technologies to deliver breakthrough solutions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description:
      "Quality is at the heart of everything we do. We strive for perfection in every project and interaction.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "We believe in the power of teamwork and partnership, working closely with clients to achieve shared success.",
  },
]

// Contact Information
export const contactInfo = {
  address: {
    line1: "City Square Mall",
    line2: "P8P9+549, सामाखुसी चक्रपथ ट्राक उत्तर",
    city: "Kathmandu",
    postalCode: "44600",
    country: "Nepal",
    mapUrl: "https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E6",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2608206374707!2d85.31292287549955!3d27.71646797619861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74ebef82ad0a0fee!2sCity%20Square%20Mall!5e0!3m2!1sen!2sus!4v1718017842037!5m2!1sen!2sus"
  },
  phone: "+977 980-2356892",
  email: "info@devalayainfosys.com",
  website: {
    url: "https://citysquare.com.np",
    display: "citysquare.com.np"
  },
  hours: {
    status: "Open",
    closing: "Closes 9 PM"
  },
  socialMedia: [
    {
      icon: Linkedin,
      url: "#"
    },
    {
      icon: Twitter,
      url: "#"
    },
    {
      icon: Facebook,
      url: "#"
    },
    {
      icon: Instagram,
      url: "#"
    }
  ],
  mapEmbed: {
    src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2608206374707!2d85.31292287549955!3d27.71646797619861!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb190a74aa1f23%3A0x74ebef82ad0a0fee!2sCity%20Square%20Mall!5e0!3m2!1sen!2sus!4v1718017842037!5m2!1sen!2sus",
    locationName: "Devalaya Infosys",
    directionsUrl: "https://maps.app.goo.gl/Ld9Eo9Eo9Eo9Eo9E6"
  }
}


// Company Stats
export const companyStats = {
  stats: [
    {
      icon: Clock,
      value: "12+",
      label: "Years Experience"
    },
    {
      icon: Target,
      value: "150+",
      label: "Projects Delivered"
    },
    {
      icon: Users,
      value: "75+",
      label: "Happy Clients"
    },
    {
      icon: Award,
      value: "24/7",
      label: "Support"
    }
  ]
}

// Contact Page Hero Content
export const contactHero = {
  icon: "HeartHandshake",
  subtitle: "Get In Touch",
  title: "Contact Us",
  description: "Have a question or want to work together? We'd love to hear from you!"
}

// About Page Hero Content
export const aboutHero = {
  icon: "Sparkles",
  subtitle: "Discover Our Story",
  title: "About Us",
  description: "We are passionate technologists dedicated to transforming businesses through innovative IT solutions"
}

export const companyStory = {
  subtitle: "Our Timeline",
  title: "Our Journey",
  paragraphs: [
    "Founded with a vision to bridge the gap between technology and business success, DEVALAYA INFOSYS has been at the forefront of digital transformation for over a decade.",
    "We combine deep technical expertise with business acumen to deliver solutions that not only meet today's needs but also prepare our clients for tomorrow's challenges.",
    "From startups to enterprise clients, we've helped organizations across industries leverage technology to achieve their goals and drive sustainable growth."
  ]
}

// Blog Page Hero Content
export const blogHero = {
  icon: "BookOpen",
  subtitle: "Insights & Updates",
  title: "Our Blog",
  description: "Stay updated with the latest news, insights, and updates from Devalaya Infosys"
}

// Career Page Hero Content
export const careerHero = {
  icon: "Briefcase",
  subtitle: "Join Our Team",
  title: "Career Opportunities",
  description: "Join our team and be part of something extraordinary"
}

// Projects Page Hero Content
export const projectsHero = {
  icon: "Code",
  subtitle: "Our Work",
  title: "Projects",
  description: "Explore our portfolio of innovative solutions that have helped businesses transform and grow"
}

// Projects Data
export const projects = [
  {
    title: "HealthConnect Platform",
    category: "Healthcare",
    image: "/placeholder.svg?height=600&width=800",
    description: "A comprehensive telemedicine platform connecting patients with healthcare providers through secure video consultations, appointment scheduling, and electronic health records management.",
    technologies: ["React", "Node.js", "MongoDB", "WebRTC", "AWS"],
    icon: Globe,
    client: "National Health Services",
    duration: "8 months",
    year: "2023",
    featured: true,
    link: "#"
  },
  {
    title: "FinTrack Analytics",
    category: "Finance",
    image: "/placeholder.svg?height=600&width=800",
    description: "Advanced financial analytics platform with real-time data processing, predictive modeling, and interactive dashboards for investment insights and portfolio management.",
    technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "Docker"],
    icon: Database,
    client: "Global Investment Corp",
    duration: "12 months",
    year: "2022",
    featured: true,
    link: "#"
  },
  {
    title: "SmartRetail POS",
    category: "Retail",
    image: "/placeholder.svg?height=600&width=800",
    description: "Modern point-of-sale system with inventory management, customer loyalty programs, and sales analytics designed for multi-location retail businesses.",
    technologies: ["Angular", "Java Spring", "MySQL", "Kubernetes"],
    icon: Cpu,
    client: "RetailChain Inc.",
    duration: "6 months",
    year: "2023",
    featured: true,
    link: "#"
  },
  {
    title: "SecureVault",
    category: "Cybersecurity",
    image: "/placeholder.svg?height=600&width=800",
    description: "Enterprise-grade security solution providing end-to-end encryption, threat detection, and compliance monitoring for sensitive data protection.",
    technologies: ["Go", "Rust", "Blockchain", "AI/ML"],
    icon: Shield,
    client: "Financial Services Group",
    duration: "10 months",
    year: "2022",
    featured: false,
    link: "#"
  },
  {
    title: "EduLearn LMS",
    category: "Education",
    image: "/placeholder.svg?height=600&width=800",
    description: "Comprehensive learning management system with interactive course content, progress tracking, assessment tools, and virtual classroom capabilities.",
    technologies: ["Vue.js", "Django", "PostgreSQL", "AWS"],
    icon: Code,
    client: "International Education Institute",
    duration: "9 months",
    year: "2021",
    featured: false,
    link: "#"
  },
  {
    title: "LogiTrack",
    category: "Logistics",
    image: "/placeholder.svg?height=600&width=800",
    description: "Real-time logistics and supply chain management platform with GPS tracking, route optimization, inventory management, and predictive analytics.",
    technologies: ["React Native", "Node.js", "MongoDB", "Google Maps API"],
    icon: Globe,
    client: "Global Shipping Corporation",
    duration: "7 months",
    year: "2021",
    featured: false,
    link: "#"
  }
]