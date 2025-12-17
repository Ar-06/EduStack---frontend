import {
  getFavoriteMaterialsRequest,
  getMyMaterialsRequest,
} from "@/api/materials/material";
import { HeaderHome } from "@/components/home/header-home";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/context/auth/useAuth";
import type { FavoriteMaterial, MyMaterial } from "@/types/materials.type";
import { BookOpen, FileText, Heart, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ProfilePage = () => {
  const { initialUsers, user } = useAuth();
  const [activeTab, setActiveTab] = useState<"materials" | "favorites">(
    "materials"
  );
  const [myMaterials, setMyMaterials] = useState<MyMaterial[]>([]);
  const [favoriteMaterials, setFavoriteMaterials] = useState<
    FavoriteMaterial[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myRes, favRes] = await Promise.all([
          getMyMaterialsRequest(),
          getFavoriteMaterialsRequest(),
        ]);

        setMyMaterials(myRes.data || []);
        setFavoriteMaterials(favRes.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const getStatus = (estado: number) => {
    switch (estado) {
      case 1:
        return {
          text: "En revisión",
          className: "bg-yellow-500/10 text-yellow-600",
        };
      case 2:
        return {
          text: "Aprobado",
          className: "bg-green-500/10 text-green-600",
        };
      case 3:
        return {
          text: "Rechazado",
          className: "bg-red-500/10 text-red-600",
        };
      default:
        return {
          text: "Desconocido",
          className: "bg-muted text-muted-foreground",
        };
    }
  };

  const materials = activeTab === "materials" ? myMaterials : favoriteMaterials;

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderHome />

      <main className="flex-1 bg-linear-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="bg-card border border-border rounded-lg p-8 mb-8 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {initialUsers()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold">{user?.nombre}</h1>
                <p className="text-muted-foreground">{user?.email}</p>
              </div>

              <Button asChild className="gap-2">
                <Link to="/upload">
                  <Upload className="h-5 w-5" />
                  Subir material
                </Link>
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8 flex gap-4 border-b border-border">
            <button
              onClick={() => setActiveTab("materials")}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === "materials"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              Mis Materiales
            </button>

            <button
              onClick={() => setActiveTab("favorites")}
              className={`px-4 py-3 text-sm font-medium border-b-2 ${
                activeTab === "favorites"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              Favoritos
            </button>
          </div>

          {/* EMPTY STATE */}
          {materials.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              {activeTab === "materials" ? (
                <>
                  <FileText className="h-14 w-14 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Aún no has subido materiales
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-sm">
                    Comparte libros, apuntes o documentos académicos con la
                    comunidad.
                  </p>
                  <Button asChild>
                    <Link to="/upload">
                      <Upload className="h-4 w-4 mr-2" />
                      Subir mi primer material
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Heart className="h-14 w-14 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No tienes favoritos aún
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Explora materiales y guarda los que más te gusten para
                    acceder rápidamente.
                  </p>
                </>
              )}
            </div>
          ) : (
            /* GRID */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {materials.map((material) => {
                const status =
                  "id_estado" in material
                    ? getStatus(material.id_estado)
                    : null;

                return (
                  <Card
                    key={material.id_material}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                          {material.tipo === "Libro" ? (
                            <BookOpen className="h-6 w-6" />
                          ) : (
                            <FileText className="h-6 w-6" />
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                            {material.tipo}
                          </span>

                          {status && (
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-medium ${status.className}`}
                            >
                              {status.text}
                            </span>
                          )}
                        </div>
                      </div>

                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {material.titulo}
                      </h3>

                      <div className="text-sm text-muted-foreground mb-3">
                        {material.n_paginas ?? 0} páginas ·{" "}
                        {material.n_descargas} descargas
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium">{material.rating}</span>
                        </div>

                        {activeTab === "favorites" ? (
                          <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                        ) : (
                          <Button asChild variant="outline" size="sm">
                            <Link
                              to={`/materials/material/${material.id_material}`}
                            >
                              Visualizar
                            </Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};
