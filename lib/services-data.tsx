import { Code, Database, Shield, Cpu, Globe, Zap, BarChart, Layers, Smartphone, Cloud, Server, Headphones } from "lucide-react";

// Services Data
export const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Custom web applications built with modern frameworks and responsive design principles to deliver exceptional user experiences.",
    features: [
      "Responsive design for all devices",
      "Progressive Web Apps (PWA)",
      "E-commerce solutions",
      "Content Management Systems"
    ],
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS"]
  },
  {
    icon: Database,
    title: "Database Solutions",
    description:
      "Robust database design, optimization, and management services to ensure your data is secure, accessible, and scalable.",
    features: [
      "Database architecture design",
      "Performance optimization",
      "Data migration services",
      "Backup and recovery solutions"
    ],
    technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"]
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Comprehensive security solutions to protect your digital assets from threats and ensure compliance with industry standards.",
    features: [
      "Security audits and assessments",
      "Penetration testing",
      "Secure coding practices",
      "Compliance consulting (GDPR, HIPAA)"
    ],
    technologies: ["Encryption", "Firewall Configuration", "Identity Management", "Threat Detection"]
  },
  {
    icon: Cpu,
    title: "AI Integration",
    description:
      "Leverage the power of artificial intelligence to automate processes, gain insights, and create intelligent applications.",
    features: [
      "Machine learning models",
      "Natural language processing",
      "Computer vision solutions",
      "Predictive analytics"
    ],
    technologies: ["TensorFlow", "PyTorch", "OpenAI API", "Hugging Face", "scikit-learn"]
  },
  {
    icon: Globe,
    title: "Digital Marketing",
    description:
      "Strategic digital marketing services to increase your online presence, drive traffic, and convert visitors into customers.",
    features: [
      "SEO optimization",
      "Content marketing",
      "Social media management",
      "Analytics and reporting"
    ],
    technologies: ["Google Analytics", "SEMrush", "HubSpot", "Mailchimp", "Meta Business Suite"]
  },
  {
    icon: Zap,
    title: "IT Consulting",
    description:
      "Expert guidance on technology strategy, digital transformation, and IT infrastructure to align with your business goals.",
    features: [
      "Technology roadmap planning",
      "Digital transformation strategy",
      "IT infrastructure assessment",
      "Vendor selection assistance"
    ],
    technologies: ["Business Analysis", "Project Management", "Risk Assessment", "ROI Analysis"]
  },
  {
    icon: BarChart,
    title: "Data Analytics",
    description:
      "Transform raw data into actionable insights with our comprehensive data analytics and visualization services.",
    features: [
      "Business intelligence dashboards",
      "Data visualization",
      "Big data processing",
      "Custom reporting solutions"
    ],
    technologies: ["Power BI", "Tableau", "Python", "R", "Apache Spark"]
  },
  {
    icon: Layers,
    title: "UI/UX Design",
    description:
      "Create intuitive, engaging user experiences with our user-centered design approach and attention to detail.",
    features: [
      "User research and testing",
      "Wireframing and prototyping",
      "Visual design",
      "Interaction design"
    ],
    technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Zeplin"]
  },
  {
    icon: Smartphone,
    title: "Mobile App Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless experiences across all devices.",
    features: [
      "iOS and Android development",
      "Cross-platform solutions",
      "App store optimization",
      "Maintenance and updates"
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"]
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description:
      "Migrate, optimize, and manage your applications in the cloud for improved scalability, reliability, and cost-efficiency.",
    features: [
      "Cloud migration",
      "Infrastructure as Code",
      "Serverless architecture",
      "Cost optimization"
    ],
    technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes"]
  },
  {
    icon: Server,
    title: "DevOps Solutions",
    description:
      "Streamline your development and operations with automated workflows, continuous integration, and deployment pipelines.",
    features: [
      "CI/CD pipeline setup",
      "Infrastructure automation",
      "Monitoring and logging",
      "Containerization"
    ],
    technologies: ["Jenkins", "GitHub Actions", "Terraform", "Ansible", "Prometheus"]
  },
  {
    icon: Headphones,
    title: "IT Support",
    description:
      "Reliable technical support services to keep your systems running smoothly and resolve issues quickly.",
    features: [
      "24/7 helpdesk support",
      "Remote troubleshooting",
      "System maintenance",
      "User training"
    ],
    technologies: ["Remote Desktop", "Ticketing Systems", "Network Monitoring", "Backup Solutions"]
  }
];

// Service Categories for filtering
export const serviceCategories = [
  { value: "all", label: "All Services" },
  { value: "web", label: "Web Development" },
  { value: "mobile", label: "Mobile Development" },
  { value: "data", label: "Data & Analytics" },
  { value: "cloud", label: "Cloud & DevOps" },
  { value: "security", label: "Security" },
  { value: "consulting", label: "Consulting" }
];

// Testimonials about services
export const serviceTestimonials = [
  {
    name: "Sarah Johnson",
    role: "CTO, HealthTech Inc.",
    image: "/placeholder-user.jpg",
    testimonial: "The web application Devalaya Infosys built for us has transformed our patient management process. Their attention to detail and technical expertise is outstanding.",
    service: "Web Development"
  },
  {
    name: "Michael Chen",
    role: "CEO, RetailPlus",
    image: "/placeholder-user.jpg",
    testimonial: "Their mobile app development team delivered a solution that exceeded our expectations. Our customers love the new shopping experience.",
    service: "Mobile App Development"
  },
  {
    name: "Priya Patel",
    role: "Data Director, FinServe",
    image: "/placeholder-user.jpg",
    testimonial: "The data analytics dashboard they created has given us insights we never had before. It's completely changed how we make business decisions.",
    service: "Data Analytics"
  },
  {
    name: "Priya Patel",
    role: "Data Director, FinServe",
    image: "/placeholder-user.jpg",
    testimonial: "The data analytics dashboard they created has given us insights we never had before. It's completely changed how we make business decisions.",
    service: "Data Analytics"
  },
  {
    name: "Priya Patel",
    role: "Data Director, FinServe",
    image: "/placeholder-user.jpg",
    testimonial: "The data analytics dashboard they created has given us insights we never had before. It's completely changed how we make business decisions.",
    service: "Data Analytics"
  }
];

// Service Process Steps
export const serviceProcess = [
  {
    number: "01",
    title: "Discovery",
    description: "We begin by understanding your business goals, challenges, and requirements through in-depth consultations."
  },
  {
    number: "02",
    title: "Strategy",
    description: "Our team develops a comprehensive strategy and roadmap tailored to your specific needs and objectives."
  },
  {
    number: "03",
    title: "Design",
    description: "We create detailed designs and prototypes, ensuring alignment with your brand and user expectations."
  },
  {
    number: "04",
    title: "Development",
    description: "Our expert developers build your solution using the latest technologies and best practices."
  },
  {
    number: "05",
    title: "Testing",
    description: "Rigorous quality assurance testing ensures your solution is robust, secure, and performs optimally."
  },
  {
    number: "06",
    title: "Deployment",
    description: "We handle the seamless deployment of your solution, ensuring a smooth transition to production."
  },
  {
    number: "07",
    title: "Support",
    description: "Our relationship continues with ongoing support, maintenance, and optimization services."
  }
];