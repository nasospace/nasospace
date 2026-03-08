import { useParams } from "react-router-dom";
import { BlogDetailView } from "@/features/blog/components";

export default function BlogDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <BlogDetailView slug={slug} />;
}
