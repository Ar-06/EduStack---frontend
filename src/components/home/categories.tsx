import {
  Atom,
  BookOpen,
  Briefcase,
  Calculator,
  Code,
  Flag as Flask,
  Heart,
  Scale,
} from "lucide-react";

import { getCategoriesRequest } from "@/api/catalogs/catalog";
import type { Categories as CategoriesType } from "@/types/catalogs.type";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const iconMap: Record<string, React.FC<React.ComponentProps<"svg">>> = {
  Matemáticas: Calculator,
  Física: Atom,
  Química: Flask,
  Informática: Code,
  Derecho: Scale,
  Medicina: Heart,
  Administración: Briefcase,
  Literatura: BookOpen,
};

export const Categories = () => {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriesRequest();
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
              Explora por Categorías
            </h2>
            <p className="text-muted-foreground mt-1">
              Encuentra materiales organizados por disciplinas
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No hay categorías disponibles
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8">
            {categories.map((category) => {
              const Icon = iconMap[category.nombre] ?? BookOpen;
              return (
                <button
                  key={category.id_cat}
                  onClick={() =>
                    navigate(`/materials?categoria=${category.id_cat}`)
                  }
                  className="flex flex-col items-center gap-3 p-4 rounded-lg border border-border bg-card hover:bg-accent/10 hover:border-accent/50 transition-all"
                >
                  <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center transition-colors">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium text-card-foreground">
                      {category.nombre}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
