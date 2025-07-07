'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Separator } from '@/components/ui/separator';

export default function NewBlogPage() {
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    content: '',
    author: '',
    coverImage: '',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process tags if provided
      const processedData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      };

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedData),
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Blog created successfully',
        });
        router.push('/admin/blogs');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create blog');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create blog',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--gold-hsl))] bg-clip-text text-transparent">Create New Blog</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Add a new blog post to your website.</p>
      </div>

      <Card className="border border-[hsl(var(--border))] shadow-md hover:shadow-lg transition-shadow duration-200">
        <form onSubmit={handleSubmit}>
          <CardHeader className="bg-gradient-to-r from-[hsl(var(--background))] to-[hsl(var(--accent))]/10 border-[hsl(var(--border))] py-3 sm:py-4 px-4 sm:px-6">
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                value={formData.summary}
                onChange={handleChange}
                placeholder="Brief summary of the blog post"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm sm:text-base">Content (Markdown supported)</Label>
              <Tabs defaultValue="write" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-[hsl(var(--accent))]/20">
                  <TabsTrigger value="write" className="text-xs sm:text-sm py-1.5 sm:py-2">Write</TabsTrigger>
                  <TabsTrigger value="preview" className="text-xs sm:text-sm py-1.5 sm:py-2">Preview</TabsTrigger>
                </TabsList>
                <TabsContent value="write" className="mt-2">
                  <Textarea
                    id="content"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Write your content in Markdown format. Supports headings, lists, code blocks, etc."
                    className="min-h-[200px] sm:min-h-[300px] font-mono text-xs sm:text-sm"
                    required
                  />
                  <div className="mt-2 text-xs text-muted-foreground">
                    <p className="text-xs">Markdown cheatsheet:</p>
                    <ul className="list-disc pl-4 sm:pl-5 mt-1 space-y-0.5 sm:space-y-1 text-xs">
                      <li># Heading 1, ## Heading 2, ### Heading 3</li>
                      <li>**Bold text**, *Italic text*</li>
                      <li>[Link text](https://example.com)</li>
                      <li>![Alt text](image-url.jpg)</li>
                      <li>- Bullet list item</li>
                      <li>1. Numbered list item</li>
                      <li>```language Code block ```</li>
                      <li>{'>'} Blockquote</li>
                    </ul>
                  </div>
                </TabsContent>
                <TabsContent value="preview" className="mt-2 border border-[hsl(var(--border))] rounded-md p-3 sm:p-4 min-h-[200px] sm:min-h-[300px] bg-white shadow-sm overflow-auto">
                  {formData.content ? (
                    <div className="markdown-content prose max-w-none">
                      <ReactMarkdown
                        components={{
                        h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-primary" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-xl font-bold mt-5 mb-3 text-primary" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-bold mt-4 mb-2 text-primary" {...props} />,
                        p: ({node, ...props}) => <p className="mb-4" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4" {...props} />,
                        li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-accent pl-4 italic my-4" {...props} />,
                        a: ({node, ...props}) => <a className="text-accent hover:underline" {...props} />,
                        img: ({node, src, alt, ...props}) => <img src={src} alt={alt} className="my-4 rounded-lg max-w-full h-auto" {...props} />,
                         code: ({node, className, children, ...props}: {node?: any, className?: string, children?: React.ReactNode}) => {
                          const match = /language-(\w+)/.exec(className || '');
                          return match ? (
                            <SyntaxHighlighter
                              style={materialDark}
                              language={match[1]}
                              PreTag="div"
                              {...props}
                              wrapperProps={{ className: "rounded-md my-4" }}
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
                        {formData.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground py-10">
                      <p>Your preview will appear here</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Author name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL (Optional)</Label>
              <Input
                id="coverImage"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (Optional, comma-separated)</Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="technology, news, updates"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 border-t border-[hsl(var(--border))] bg-gradient-to-r from-[hsl(var(--background))] to-[hsl(var(--accent))]/10 p-4 sm:p-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push('/admin/blogs')}
              className="border-[hsl(var(--border))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] transition-colors duration-200 w-full sm:w-auto order-2 sm:order-1 text-xs sm:text-sm py-1.5 sm:py-2"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-[hsl(var(--gold-hsl))] hover:bg-[hsl(var(--gold-hsl))]/90 text-white shadow-md hover:shadow-lg transition-all duration-200 w-full sm:w-auto order-1 sm:order-2 text-xs sm:text-sm py-1.5 sm:py-2"
            >
              {isSubmitting ? 'Creating...' : 'Create Blog'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}