import { SiteShell } from "@/components/layout/SiteShell";
import { getGithubProjects } from "@/lib/github";
import { getBlogPosts } from "@/lib/posts";

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getGithubProjects(),
    getBlogPosts(),
  ]);

  return <SiteShell projects={projects} posts={posts} />;
}