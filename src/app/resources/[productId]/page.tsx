import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import { apiFetchSafe } from "@/lib/api";
import type { ProductKit } from "@/lib/affiliate";
import ResourceSections from "../ResourceSections";

export const metadata: Metadata = { title: "Product resources" };

export default async function ProductResourcesPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = await params;
  const kit = await apiFetchSafe<ProductKit>(`/affiliate/resources/${productId}`);
  if (!kit) notFound();

  return (
    <>
      <div className="flex items-start gap-3">
        <Link
          href="/resources"
          aria-label="Back to resources"
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-ink/15 text-ink/60 transition-colors hover:bg-ink/5"
        >
          <Icon name="arrow-left" size={18} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold sm:text-[28px]">{kit.product.title}</h1>
          <p className="mt-1 text-sm text-ink/55">
            Marketing materials you can use for {kit.product.title}.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <ResourceSections resources={kit.resources} />
      </div>
    </>
  );
}
