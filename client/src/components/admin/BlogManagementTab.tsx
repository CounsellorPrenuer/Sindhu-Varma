import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Sparkles, FileText, Eye, Edit, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { blogGenerationSchema, insertBlogPostSchema, type BlogPost, type BlogGeneration } from "@shared/schema";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";

interface GeneratedBlog {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl: string | null;
}

export function BlogManagementTab() {
  const { toast } = useToast();
  const [generatedBlog, setGeneratedBlog] = useState<GeneratedBlog | null>(null);
  const [viewPost, setViewPost] = useState<BlogPost | null>(null);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);
  const [deletePost, setDeletePost] = useState<BlogPost | null>(null);

  const { data: blogPosts = [], isLoading: postsLoading, isError: postsError, error: postsErrorData } = useQuery<BlogPost[]>({
    queryKey: ["/api/admin/blog-posts"],
  });

  const generationForm = useForm<BlogGeneration>({
    resolver: zodResolver(blogGenerationSchema),
    defaultValues: {
      topic: "",
      keywords: "",
      professional: true,
      wordCount: "2000-3000",
      category: "",
      title: "",
      excerpt: "",
      imageUrl: "",
    },
  });

  const editForm = useForm({
    resolver: zodResolver(insertBlogPostSchema),
    defaultValues: {
      title: "",
      category: "",
      excerpt: "",
      content: "",
      imageUrl: "",
      status: "draft",
      publishedAt: undefined,
    },
  });

  const generateMutation = useMutation({
    mutationFn: async (data: BlogGeneration) => {
      const res = await apiRequest("POST", "/api/admin/generate-blog", data);
      return await res.json() as GeneratedBlog;
    },
    onSuccess: (data) => {
      setGeneratedBlog(data);
      toast({
        title: "Blog Generated Successfully",
        description: "Review and create your blog post below.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to generate blog content. Please try again.",
        variant: "destructive",
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await apiRequest("POST", "/api/admin/blog-posts", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setGeneratedBlog(null);
      generationForm.reset();
      toast({
        title: "Blog Post Created",
        description: "Your blog post has been created successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to create blog post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const res = await apiRequest("PATCH", `/api/admin/blog-posts/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setEditPost(null);
      toast({
        title: "Blog Post Updated",
        description: "Your blog post has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to update blog post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/admin/blog-posts/${id}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      setDeletePost(null);
      toast({
        title: "Blog Post Deleted",
        description: "Your blog post has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error?.message || "Failed to delete blog post. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onGenerate = (data: BlogGeneration) => {
    generateMutation.mutate(data);
  };

  const onCreateBlogPost = () => {
    if (!generatedBlog) return;

    const publishedAt = new Date().toISOString();
    createMutation.mutate({
      ...generatedBlog,
      status: "published",
      publishedAt,
    });
  };

  const onEdit = (data: any) => {
    if (!editPost) return;
    updateMutation.mutate({ id: editPost.id, data });
  };

  const onDelete = () => {
    if (!deletePost) return;
    deleteMutation.mutate(deletePost.id);
  };

  useEffect(() => {
    if (postsError) {
      toast({
        title: "Error loading blog posts",
        description: (postsErrorData as any)?.message || "Failed to load blog posts",
        variant: "destructive",
      });
    }
  }, [postsError]);

  const publishedPosts = blogPosts.filter((post) => post.status === "published");
  const aiPoweredCount = blogPosts.length;

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card data-testid="stat-total-blog-posts">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-total-blog-posts-value">
              {blogPosts.length}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="stat-ai-powered">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">AI Powered</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-ai-powered-value">
              {aiPoweredCount}
            </div>
          </CardContent>
        </Card>

        <Card data-testid="stat-smart-editing">
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Smart Editing</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold" data-testid="stat-smart-editing-value">
              Enabled
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle>AI Blog Generation</CardTitle>
          </div>
          <CardDescription>
            Generate a professional blog post using AI based on your topic and preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...generationForm}>
            <form onSubmit={generationForm.handleSubmit(onGenerate)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={generationForm.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., How to transition to leadership roles"
                          data-testid="input-topic"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={generationForm.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords (comma-separated) *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., leadership, career, management"
                          data-testid="input-keywords"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={generationForm.control}
                  name="professional"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="checkbox-professional"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Professional Tone</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={generationForm.control}
                  name="wordCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Word Count</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-word-count">
                            <SelectValue placeholder="Select word count" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="500-1000">500-1000 words</SelectItem>
                          <SelectItem value="1000-2000">1000-2000 words</SelectItem>
                          <SelectItem value="2000-3000">2000-3000 words</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={generationForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g., Career Development"
                        data-testid="input-category"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={generationForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title (optional override)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Leave empty to auto-generate"
                        data-testid="input-title-override"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={generationForm.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt (optional override)</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Leave empty to auto-generate"
                        rows={3}
                        data-testid="textarea-excerpt-override"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={generationForm.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL (optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://images.unsplash.com/photo..."
                        data-testid="input-image-url"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={generateMutation.isPending}
                className="gap-2"
                data-testid="button-generate-blog"
              >
                {generateMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Blog Post
                  </>
                )}
              </Button>
            </form>
          </Form>

          {generatedBlog && (
            <div className="space-y-4 mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold" data-testid="text-preview-title">
                  Generated Preview
                </h3>
                <Button
                  onClick={onCreateBlogPost}
                  disabled={createMutation.isPending}
                  className="gap-2"
                  data-testid="button-create-blog"
                >
                  {createMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Create Blog Post"
                  )}
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle data-testid="text-generated-title">{generatedBlog.title}</CardTitle>
                  <CardDescription>
                    <Badge data-testid="badge-generated-category">{generatedBlog.category}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4" data-testid="text-generated-excerpt">
                    {generatedBlog.excerpt}
                  </p>
                  <div className="prose prose-sm max-w-none dark:prose-invert" data-testid="content-generated-markdown">
                    <ReactMarkdown>{generatedBlog.content}</ReactMarkdown>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Published Blog Posts</CardTitle>
          <CardDescription>
            Manage and edit your published blog posts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {postsLoading ? (
            <div className="py-8 text-center" data-testid="loading-posts">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
            </div>
          ) : postsError ? (
            <div className="py-8 text-center text-destructive" data-testid="error-posts">
              <p className="font-medium">Error loading blog posts</p>
              <p className="text-sm text-muted-foreground mt-2">
                {(postsErrorData as any)?.message || "Failed to load blog posts"}
              </p>
            </div>
          ) : publishedPosts.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground" data-testid="empty-posts">
              No published blog posts yet
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {publishedPosts.map((post) => (
                  <TableRow key={post.id} data-testid={`row-blog-${post.id}`}>
                    <TableCell data-testid={`blog-title-${post.id}`}>{post.title}</TableCell>
                    <TableCell data-testid={`blog-category-${post.id}`}>{post.category}</TableCell>
                    <TableCell>
                      <Badge variant="default" data-testid={`blog-status-${post.id}`}>
                        {post.status}
                      </Badge>
                    </TableCell>
                    <TableCell data-testid={`blog-date-${post.id}`}>
                      {post.publishedAt ? format(new Date(post.publishedAt), "MMM dd, yyyy") : "-"}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setViewPost(post)}
                          data-testid={`button-view-${post.id}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setEditPost(post);
                            editForm.reset({
                              title: post.title,
                              category: post.category,
                              excerpt: post.excerpt,
                              content: post.content,
                              imageUrl: post.imageUrl || "",
                              status: post.status,
                            } as any);
                          }}
                          data-testid={`button-edit-${post.id}`}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeletePost(post)}
                          data-testid={`button-delete-${post.id}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!viewPost} onOpenChange={() => setViewPost(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle data-testid="dialog-view-title">{viewPost?.title}</DialogTitle>
            <DialogDescription>
              <Badge data-testid="dialog-view-category">{viewPost?.category}</Badge>
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-muted-foreground" data-testid="dialog-view-excerpt">
              {viewPost?.excerpt}
            </p>
            <div className="prose prose-sm max-w-none dark:prose-invert" data-testid="dialog-view-content">
              <ReactMarkdown>{viewPost?.content || ""}</ReactMarkdown>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!editPost} onOpenChange={() => setEditPost(null)}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog Post</DialogTitle>
            <DialogDescription>Make changes to your blog post</DialogDescription>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(onEdit)} className="space-y-4">
              <FormField
                control={editForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-edit-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-edit-category" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={3} data-testid="textarea-edit-excerpt" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content (Markdown)</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={10} data-testid="textarea-edit-content" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={editForm.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input {...field} data-testid="input-edit-image-url" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditPost(null)}
                  data-testid="button-edit-cancel"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={updateMutation.isPending}
                  data-testid="button-edit-save"
                >
                  {updateMutation.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deletePost} onOpenChange={() => setDeletePost(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{deletePost?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeletePost(null)}
              data-testid="button-delete-cancel"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onDelete}
              disabled={deleteMutation.isPending}
              data-testid="button-delete-confirm"
            >
              {deleteMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
