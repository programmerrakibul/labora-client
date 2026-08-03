import Container from "@/components/shared/container";
import SectionHeader from "@/components/shared/section-header";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock } from "lucide-react";
import { blogPosts } from "../data/blog-posts";

const BlogInsightsSection = () => {
  return (
    <section className="bg-muted/50 py-16">
      <Container>
        <SectionHeader
          badge="Career Resources"
          title="Insights & Advice"
          subtitle="Level up your career with expert tips, industry trends, and practical guidance."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-lg border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute left-4 top-4">{post.category}</Badge>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-snug">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-2 border-t pt-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {post.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">
                    {post.author.name}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default BlogInsightsSection;
