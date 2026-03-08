import { useParams } from "react-router-dom";
import { PortfolioDetailView } from "@/features/portfolio/components";

export default function PortfolioDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <PortfolioDetailView slug={slug} />;
}
