import {
  getFavoriteMaterialsRequest,
  getMaterialsRequest,
  toggleFavoriteMaterialRequest,
} from "@/api/materials/material";
import { HeaderHome } from "@/components/home/header-home";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryColor, getTypeIcon } from "@/lib/utils";
import type { Material } from "@/types/materials.type";
import { toast } from "@pheralb/toast";
import { Download, Eye, Heart, Search, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const MaterialsPage = () => {
  const [searchParams] = useSearchParams();
  const categoria = searchParams.get("categoria");
  const search = searchParams.get("search");
  const navigate = useNavigate();

  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState<number[]>([]);
  const [loadingFav, setLoadingFav] = useState<number | null>(null);

  const handleToggleFavorite = async (id_material: number) => {
    try {
      setLoadingFav(id_material);
      await toggleFavoriteMaterialRequest(id_material);

      setFavorites((prev) =>
        prev.includes(id_material)
          ? prev.filter((id) => id !== id_material)
          : [...prev, id_material]
      );
    } catch (error) {
      console.error(error);
      toast.error({ text: "Error al actualizar favoritos" });
    } finally {
      setLoadingFav(null);
    }
  };

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await getMaterialsRequest({
          categoria: categoria ? Number(categoria) : undefined,
          search: search || undefined,
        });
        setMaterials(res.data || []);
      } catch (error) {
        console.error(error);
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [categoria, search]);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const res = await getFavoriteMaterialsRequest();
        setFavorites(res.data.map((m: Material) => m.id_material));
      } catch (error) {
        console.error(error);
      }
    };
    loadFavorites();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Search className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">No se encontraron resultados</h3>
        <p className="text-sm text-muted-foreground max-w-md mt-1">
          No hay materiales que coincidan con{" "}
          <span className="font-medium">"{search}"</span>. Prueba con otro
          término.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderHome />

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((material) => {
            const TypeIcon = getTypeIcon(material.tipo);
            const categoryColor = getCategoryColor(material.categoria);

            return (
              <Card
                key={material.id_material}
                className="group overflow-hidden hover:shadow-lg transition-all"
              >
                <div
                  className={`relative aspect-2/3 flex items-center justify-center ${categoryColor}`}
                >
                  <TypeIcon
                    className="h-24 w-24 opacity-30"
                    strokeWidth={1.5}
                  />

                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <Badge variant="secondary">{material.tipo}</Badge>

                    <Button
                      size="icon"
                      variant="secondary"
                      disabled={loadingFav === material.id_material}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleFavorite(material.id_material);
                      }}
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          favorites.includes(material.id_material)
                            ? "fill-red-500 text-red-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-2">
                      {material.titulo}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {material.autores}
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(material.rating)
                            ? "fill-accent text-accent"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                    <span className="text-xs font-medium ml-1">
                      {material.rating}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Download className="h-3.5 w-3.5" />
                      <span>{(material.n_descargas / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      <span>{material.n_paginas} pág.</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    size="sm"
                    onClick={() =>
                      navigate(`/materials/material/${material.id_material}`)
                    }
                  >
                    Ver Material
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
