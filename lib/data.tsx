import { Award, Users, Target, Zap, Star, Clock, Linkedin, Twitter, Facebook, Instagram, Code, Globe, Database, Shield, Cpu } from "lucide-react"

// Team Members Data
// Team Members Data
export const teamMembers = [
  {
    name: "Aakasmik Ghimire",
    role: "Founder/MD",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Aakasmik&backgroundColor=f3f4f6&clothingColor=1f2937",
    bio: "Visionary leader with 15+ years in IT strategy and business transformation. Drives innovation and excellence across all operations.",
    skills: ["React.js", "Node.js", "Next.js", "PostgreSQL", "Leadership", "React Native"],
    email: "akasmikghimire353@gmail.com",
    linkedin: "https://www.linkedin.com/in/aakasmik-ghimire-1234b9264/",
  },
  {
    name: "Kushal Poudel",
    role: "Founder/President",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Kushal&backgroundColor=f9fafb&clothingColor=374151",
    bio: "Kushal Poudel is an emerging professional in the fields of IT and real estate, combining strong academic knowledge in computer networking and cybersecurity with practical business experience. Starting his journey as a real estate broker, he quickly expanded his ventures, founding Devalaya Infosys to deliver innovative IT solutions. His multidisciplinary background enables him to approach projects with strategic insight, blending technical expertise with market-driven thinking to build reliable, secure, and scalable systems.",
    skills: ["IT-Infrastruture management", "Business Development & Client Relations", "Leadership", "Web Development & App Development"],
    email: "kushalpoudel2000@gmail.com",
    linkedin: "https://www.linkedin.com/in/kushal-poudel-96a50a236/",
  },
  {
    name: "Apshana Sapkota",
    role: "SEO Lead",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=ApshanaFemale&backgroundColor=fef7cd&clothingColor=1e40af",
    bio: "Experienced SEO lead specializing in technical SEO, content optimization, and data-driven strategies to boost organic growth and online visibility.",
    skills: ["Technical SEO", "Strategic Keyword Research", "Optimization", "Leadership", "Data-Driven Analysis"],
    email: "sapkotaapshana52@gmail.com",
    linkedin: "#",
  },
  {
    name: "Avash Shrestha",
    role: "Cyber Security Engineer",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=Avash&backgroundColor=f0f9ff&clothingColor=0c4a6e",
    bio: "Skilled blue team cybersecurity engineer specializing in defensive security, threat monitoring, and incident response. Experienced in SIEM analysis, intrusion detection, and securing networks against evolving cyber threats.",
    skills: ["Linux", "Pentesting", "Python", "AWS", "DevOps"],
    email: "shresthaavash43@gmail.com",
    linkedin: "https://www.linkedin.com/in/avash-shrestha-77983420a/",
  },
  {
    name: "Janak Devkota",
    role: "Full stack Intern",
    image: "https://api.dicebear.com/7.x/notionists/svg?seed=JanakBoy&backgroundColor=e0f2fe&clothingColor=1e3a8a",
    bio: "Proficient Next.js developer with expertise in building high-performance, SEO-friendly web applications. Skilled in React, server-side rendering, API integration, and creating scalable frontend architectures for seamless user experiences.",
    skills: ["Next.js", "ASP.NET", "React.js", "AI Integration", "MongoDB", "DevOps"],
    email: "janakdevkota@gmail.com",
    linkedin: "https://www.linkedin.com/in/janak-devkota-5a7679236/",
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
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=City+Square+Mall+Kathmandu+Nepal&destination_place_id=ChIJI_qkdKMZ6zkRjg-gp-L4Tgc"
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