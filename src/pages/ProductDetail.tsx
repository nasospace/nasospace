import { useParams } from "react-router-dom";
import { ProductDetailView } from "@/features/shop/components";

export default function ProductDetailPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  return <ProductDetailView slug={slug} />;
}
