import Container from "@/components/shared/container";
import CategoryCard from "@/features/public/components/category-card";
import SectionHeader from "@/features/public/components/section-header";
import { categories } from "../data/categories";

const CategoryExplorerSection = () => {
  return (
    <section className="py-16">
      <Container>
        <SectionHeader
          badge="Browse by Domain"
          title="Explore Jobs by Category"
          subtitle="Jump straight to the roles that match your skills and ambitions across every industry."
          centered
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category) => (
            <CategoryCard
              key={category.title}
              icon={category.icon}
              title={category.title}
              openPositionsCount={category.openPositionsCount}
              bgGradient={category.bgGradient}
              href={`/all-jobs?category=${category.title}`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoryExplorerSection;
