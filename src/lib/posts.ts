import { getDocuments } from "outstatic/server";

export interface BlogPost {
  title: string;
  slug: string;
  publishedAt: string;
  content: string;
}

export function getBlogPosts(): BlogPost[] {
  try {
    const documents = getDocuments("marks-journals", [
      "title",
      "slug",
      "publishedAt",
      "content",
    ]);

    return documents.map((document) => ({
      title: document.title,
      slug: document.slug,
      publishedAt: new Date(document.publishedAt).toISOString(),
      content: document.content,
    }));
  } catch {
    return [];
  }
}
