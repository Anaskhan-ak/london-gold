import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { categories } from "../../siteData";
import CategoryGallery from "./CategoryGallery";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};
  return {
    title: `${category.name} Collection`,
    description: category.description,
  };
}

async function CategoryContent({ params }: Props) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();
  return <CategoryGallery category={category} />;
}

export default function CategoryPage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0B0B] flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-transparent border-t-[#D4AF37] animate-spin" />
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
