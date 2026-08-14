import { SiteShell } from "@/components/layout/SiteShell";
import { getGithubProjects } from "@/lib/github";

export default async function HomePage() {
  const projects = await getGithubProjects();

  return <SiteShell projects={projects} />;
}
