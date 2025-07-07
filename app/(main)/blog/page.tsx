'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { BookOpen, Calendar, User, ArrowRight, Sparkles, Clock, X } from 'lucide-react';
import { blogHero } from '@/lib/data';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface Blog {
  _id: string;
  title: string;
  summary: string;
  content: string;
  author: string;
  coverImage?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blogs');
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load blog posts',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [toast]);

  const toggleBlogExpansion = (blogId: string) => {
    if (expandedBlog === blogId) {
      setExpandedBlog(null);
      setSelectedBlog(null);
    } else {
      setExpandedBlog(blogId);
      const blog = blogs.find(b => b._id === blogId);
      if (blog) {
        setSelectedBlog(blog);
      }
    }
  };

  // Loading state is now handled by loading.tsx

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-secondary/30 to-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-0 top-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="absolute inset-0 bg-grid-primary/5 bg-[size:30px_30px] opacity-30"></div>
        <div className="absolute right-0 top-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute left-0 bottom-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center mb-4 sm:mb-6 bg-primary/5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-primary font-medium text-xs sm:text-sm">
            <BookOpen className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 text-accent" />
            <span>{blogHero.subtitle}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-4 sm:mb-6 text-primary tracking-tight">
            {blogHero.title.split(" ")[0]} <span className="text-accent relative inline-block">{blogHero.title.split(" ")[1]}<span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-accent rounded-full"></span></span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
            {blogHero.description}
          </p>
          <div className="w-24 sm:w-32 h-0.5 sm:h-1 bg-gradient-to-r from-accent/30 via-accent to-accent/30 mx-auto rounded-full"></div>
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
              <span>Latest Articles</span>
            </div>
          </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts available at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <Card 
              key={blog._id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 bg-white transform hover:-translate-y-2 hover:border-accent/20 hover:border rounded-2xl h-full flex flex-col"
            >
              <div className="relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-accent/5 transition-colors duration-500"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl -ml-12 -mb-12 group-hover:bg-primary/5 transition-colors duration-500"></div>
                
                {blog.coverImage ? (
                  <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-secondary to-white">
                    <img 
                      src={blog.coverImage} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-secondary/50 to-white flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-accent/30" />
                  </div>
                )}
                
                {blog.tags && blog.tags.length > 0 && (
                  <div className="absolute top-4 right-4 flex flex-wrap gap-2 z-10">
                    {blog.tags.slice(0, 2).map((tag, index) => (
                      <Badge 
                        key={index} 
                        variant="secondary"
                        className="bg-white/80 backdrop-blur-sm text-primary text-xs font-medium hover:bg-accent hover:text-white transition-colors duration-300"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {blog.tags.length > 2 && (
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300 backdrop-blur-sm"
                      >
                        +{blog.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
              
              <CardHeader className="relative z-10 pb-2">
                <CardTitle className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </CardTitle>
                <CardDescription className="mt-2 flex items-center gap-4 text-xs">
                  <span className="flex items-center text-xs sm:text-sm">
                    <User className="h-3 w-3 mr-1 text-accent" />
                    {blog.author}
                  </span>
                  <span className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1 text-accent" />
                    {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                  </span>
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative z-10 flex-grow pb-4">
                <p className="text-muted-foreground text-sm line-clamp-3">{blog.summary}</p>
              </CardContent>
              
              <CardFooter className="relative z-10 pt-0">
                <Button 
                  variant="outline" 
                  onClick={() => toggleBlogExpansion(blog._id)}
                  className="w-full flex items-center justify-between border-accent/20 text-primary hover:text-accent hover:bg-secondary/80 transition-all duration-300"
                >
                  <span>{expandedBlog === blog._id ? 'Read Less' : 'Read More'}</span>
                  <ArrowRight className={`h-4 w-4 transition-transform duration-300 ${expandedBlog === blog._id ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                </Button>
              </CardFooter>

            </Card>
          ))}
        </div>
      )}
        </div>
      </section>

      {/* Blog Preview Modal */}
      {expandedBlog && selectedBlog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-6 overflow-hidden animate-fade-in-scale">
          <div className="bg-white rounded-2xl w-[98%] sm:w-[95%] max-h-[98vh] sm:max-h-[95vh] shadow-2xl relative overflow-hidden flex flex-col animate-fade-in-scale">
            <div className="sticky top-0 bg-white z-10 px-4 sm:px-8 py-3 sm:py-6 border-b border-border flex justify-between items-center bg-gradient-to-r from-white to-secondary/20">
              <h2 className="text-xl sm:text-2xl font-bold text-primary max-w-[85%] line-clamp-1">{selectedBlog.title}</h2>
              <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setExpandedBlog(null)}
                  className="rounded-full h-8 w-8 sm:h-10 sm:w-10 p-0 flex items-center justify-center hover:bg-accent/10"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
            
            <div className="px-4 sm:px-8 py-4 sm:py-6 flex-1 overflow-y-auto scrollbar-hide">
              {selectedBlog.coverImage && (
                <div className="w-full h-48 sm:h-64 md:h-96 overflow-hidden rounded-xl mb-4 sm:mb-8 shadow-md">
                  <img 
                    src={selectedBlog.coverImage} 
                    alt={selectedBlog.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div className="flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6 mb-4 sm:mb-8 text-xs sm:text-sm bg-secondary/20 p-2 sm:p-4 rounded-lg">
                <span className="flex items-center text-xs sm:text-sm">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-accent" />
                  {selectedBlog.author}
                </span>
                <span className="flex items-center text-xs sm:text-sm">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-accent" />
                  {format(new Date(selectedBlog.createdAt), 'MMMM dd, yyyy')}
                </span>
                <span className="flex items-center text-xs sm:text-sm">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 text-accent" />
                  {Math.ceil(selectedBlog.content.length / 1000)} min read
                </span>
              </div>
              
              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {selectedBlog.tags.map((tag, index) => (
                    <Badge 
                       key={index} 
                       variant="outline"
                       className="bg-secondary/20 hover:bg-secondary/30 text-primary text-xs sm:text-sm py-0 sm:py-1 px-2 sm:px-3"
                     >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="prose max-w-none prose-sm sm:prose-base md:prose-lg">
                <p className="text-base sm:text-lg font-medium text-primary/90 mb-4 sm:mb-6">{selectedBlog.summary}</p>
                 <Separator className="my-3 sm:my-6" />
                <div className="markdown-content text-muted-foreground bg-white p-3 sm:p-6 rounded-xl shadow-sm border border-secondary/20">
                  <ReactMarkdown
                    components={{
                    h1: ({node, ...props}) => <h1 className="text-2xl sm:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-primary border-b pb-2 border-accent/20" {...props} />,
                     h2: ({node, ...props}) => <h2 className="text-xl sm:text-2xl font-bold mt-5 sm:mt-6 mb-3 sm:mb-4 text-primary border-b pb-1 border-secondary/40" {...props} />,
                     h3: ({node, ...props}) => <h3 className="text-lg sm:text-xl font-bold mt-4 sm:mt-5 mb-2 sm:mb-3 text-primary" {...props} />,
                    p: ({node, ...props}) => <p className="mb-3 sm:mb-5 leading-relaxed" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4" {...props} />,
                     ol: ({node, ...props}) => <ol className="list-decimal pl-4 sm:pl-6 mb-3 sm:mb-4" {...props} />,
                     li: ({node, ...props}) => <li className="mb-1 text-sm sm:text-base" {...props} />,
                    blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent pl-3 sm:pl-6 py-2 italic my-4 sm:my-6 bg-secondary/10 rounded-r-lg" {...props} />,
                    a: ({node, ...props}) => <a className="text-accent hover:underline text-sm sm:text-base" {...props} />,
                    img: ({node, src, alt, ...props}) => <img src={src} alt={alt} className="my-4 sm:my-6 rounded-lg max-w-full h-auto shadow-md hover:shadow-lg transition-shadow duration-300" {...props} />,
                    code: ({node, className, children, ...props}: {node?: any, className?: string, children?: React.ReactNode}) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return match ? (
                        <SyntaxHighlighter
                              style={materialDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                              wrapperProps={{ className: "rounded-lg my-4 sm:my-6 shadow-md overflow-x-auto" }}
                              customStyle={{ fontSize: '0.8rem', lineHeight: '1.5', padding: '0.75rem' }}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className="bg-secondary/50 px-1 py-0.5 rounded text-sm font-mono" {...props}>
                          {children}
                        </code>
                      );
                    },
                  }}
                >
                    {selectedBlog.content}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}