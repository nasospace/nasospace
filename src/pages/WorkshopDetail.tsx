import { useParams } from "react-router-dom";
import { WorkshopDetailView } from "@/features/workshops/components";

export default function WorkshopDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) return null;
  return <WorkshopDetailView slug={slug} />;
}
