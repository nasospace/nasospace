/**
 * Admin Products — lightweight product/stock visibility.
 */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ExternalLink } from "lucide-react";
import { routeHelpers } from "@/config/routes";

interface AdminProduct {
  id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  currency: string;
  stock_status: string;
  limited_edition: boolean;
  featured: boolean;
  published: boolean;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("cms_products")
      .select("id, title, slug, category, price, currency, stock_status, limited_edition, featured, published")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setProducts((data ?? []) as AdminProduct[]);
        setLoading(false);
      });
  }, []);

  const stockBadge = (status: string) => {
    const map: Record<string, string> = {
      "in-stock": "bg-green-500/10 text-green-700 dark:text-green-400",
      "low-stock": "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
      "out-of-stock": "bg-red-500/10 text-red-700 dark:text-red-400",
    };
    return map[status] ?? "bg-muted text-muted-foreground";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-groovy text-2xl font-bold">Products</h1>
        <p className="mt-1 text-sm text-muted-foreground">{products.length} products · Stock and status overview</p>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : products.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No products found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Product</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Price</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Stock</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Flags</th>
                  <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {products.map((p) => (
                  <tr key={p.id} className="transition-colors hover:bg-muted/20">
                    <td className="px-4 py-3 font-medium">{p.title}</td>
                    <td className="px-4 py-3 capitalize text-muted-foreground">{p.category}</td>
                    <td className="px-4 py-3 font-mono text-muted-foreground">{p.price} {p.currency}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${stockBadge(p.stock_status)}`}>
                        {p.stock_status.replace("-", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        {p.limited_edition && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">Limited</span>}
                        {p.featured && <span className="rounded-full bg-accent/20 px-2 py-0.5 text-[10px] font-medium text-accent-foreground">Featured</span>}
                        {!p.published && <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive">Draft</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Link to={routeHelpers.shopDetail(p.slug)} target="_blank" className="text-muted-foreground hover:text-foreground">
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
