const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      position: "CEO, Tech Innovations",
      content: "Devalaya Infosys transformed our business with their innovative solutions. Their team's expertise and dedication to our project exceeded our expectations. We've seen a significant improvement in our operations and customer satisfaction.",
      avatar: "/placeholder-user.jpg"
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "CTO, Global Solutions",
      content: "Working with Devalaya Infosys has been a game-changer for our company. Their technical expertise and attention to detail resulted in a product that perfectly aligned with our vision. The team was responsive, professional, and delivered on time.",
      avatar: "/placeholder-user.jpg"
    },
    {
      id: 3,
      name: "Robert Johnson",
      position: "Founder, StartupX",
      content: "The quality of work delivered by Devalaya Infosys is exceptional. They understood our requirements perfectly and delivered a solution that not only met but exceeded our expectations. Highly recommended for any tech project.",
      avatar: "/placeholder-user.jpg"
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Director, Digital Agency",
      content: "Partnership with Devalaya Infosys has been incredibly valuable. Their innovative approach and technical proficiency helped us launch our product successfully. The team's commitment to excellence is truly commendable.",
      avatar: "/placeholder-user.jpg"
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 1
        );
      }, 4000); // Change every 4 seconds

      return () => clearInterval(interval);
    }
  }, [isHovered, testimonials.length]);

  // Get current testimonials to display (2 at a time)
  const getCurrentTestimonials = () => {
    const current = [];
    for (let i = 0; i < 2; i++) {
      const index = (currentIndex + i) % testimonials.length;
      current.push(testimonials[index]);
    }
    return current;
  };

  const currentTestimonials = getCurrentTestimonials();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-navy via-navy/95 to-navy/90 text-white relative overflow-hidden">
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
        
        {/* Auto-scrolling testimonials container */}
        <div 
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 min-h-[400px]"
          >
            {currentTestimonials.map((testimonial, index) => (
              <motion.div 
                key={`${testimonial.id}-${currentIndex}`}
                variants={slideIn}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="w-full"
              >
                <Card className="h-full border-none bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 rounded-xl shadow-2xl hover:shadow-gold/20 group relative overflow-hidden">
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className="flex items-center gap-4">
                      <div className="relative h-16 w-16 rounded-full overflow-hidden bg-navy/20 ring-2 ring-gold/20 group-hover:ring-gold/40 transition-all duration-300 shadow-xl">
                        <Image 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent"></div>
                      </div>
                      <div>
                        <CardTitle className="text-lg font-medium text-white group-hover:text-gold transition-colors duration-300">
                          {testimonial.name}
                        </CardTitle>
                        <CardDescription className="text-white/70 group-hover:text-white/90 transition-colors duration-300">
                          {testimonial.position}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex mb-4 gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-5 w-5 text-gold fill-gold group-hover:scale-110 transition-transform duration-300" 
                          style={{ animationDelay: `${i * 100}ms` }} 
                        />
                      ))}
                    </div>
                    <p className="text-white/80 italic leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                      "{testimonial.content}"
                    </p>
                    
                    {/* Quote decoration */}
                    <div className="absolute top-4 right-4 text-gold/20 text-6xl font-serif group-hover:text-gold/30 transition-colors duration-300">"</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Progress indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-gold w-6' : 'bg-gold/30 hover:bg-gold/50'
                }`}
              />
            ))}
          </div>
        </div>
        
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