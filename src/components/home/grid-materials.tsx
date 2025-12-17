import { Download, Eye, FileText, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMaterialsRequest,
  toggleFavoriteMaterialRequest,
} from "@/api/materials/material";
import type { Material } from "@/types/materials.type";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCategoryColor, getTypeIcon } from "@/lib/utils";

export const GridMaterials = () => {
  const navigate = useNavigate();

  const [materials, setMaterials] = useState<Material[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingFav, setLoadingFav] = useState<number | null>(null);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await getMaterialsRequest({});
        setMaterials(res.data ?? []);
      } catch (error) {
        console.error(error);
        setMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, []);

  const handleToggleFavorite = async (id: number) => {
    try {
      setLoadingFav(id);
      await toggleFavoriteMaterialRequest(id);

      setFavorites((prev) =>
        prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingFav(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <FileText className="h-10 w-10 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">Aún no hay materiales</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Todavía no se han publicado materiales en la plataforma.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full py-12 lg:py-16 bg-secondary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Materiales Académicos
          </h2>
          <p className="text-muted-foreground mt-1">
            Explora todo el contenido disponible en la plataforma
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material) => {
            const TypeIcon = getTypeIcon(material.tipo);
            const categoryColor = getCategoryColor(material.categoria);

            return (
              <Card
                key={material.id_material}
                className="group overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                onClick={() =>
                  navigate(`/materials/material/${material.id_material}`)
                }
              >
                <div
                  className={`relative aspect-2/3 flex items-center justify-center ${categoryColor}`}
                >
                  <TypeIcon
                    className="h-24 w-24 opacity-30"
                    strokeWidth={1.5}
                  />

                  {/* Badge + Favorito */}
                  <div className="absolute top-2 left-2 flex gap-2">
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
                        className={`h-4 w-4 ${
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
                      {material.rating.toFixed(1)}
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
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/materials/material/${material.id_material}`);
                    }}
                  >
                    Ver Material
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
