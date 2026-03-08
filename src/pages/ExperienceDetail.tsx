import { useParams } from "react-router-dom";
import { ExperienceDetailView } from "@/features/experiences/components";

export default function ExperienceDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <ExperienceDetailView slug={slug} />;
}
