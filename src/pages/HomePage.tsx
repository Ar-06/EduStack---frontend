import { Categories } from "@/components/home/categories";
import { Footer } from "@/components/home/footer";
import { GridMaterials } from "@/components/home/grid-materials";
import { HeaderHome } from "@/components/home/header-home";
import { Hero } from "@/components/home/hero";

export const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderHome />
      <main className="flex-1">
        <Hero />
        <Categories />
        <GridMaterials />
      </main>
      <Footer />
    </div>
  );
};
