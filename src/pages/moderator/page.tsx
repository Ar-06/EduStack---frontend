import {
  approveMaterialRequest,
  getMaterialByIdRequest,
  getMaterialsByStatusRequest,
  rejectMaterialRequest,
} from "@/api/moderator/moderator";
import type {
  MaterialStatus,
  ModeratorMaterial,
  ModeratorMaterialDetail,
} from "@/types/moderator.type";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { HeaderHome } from "@/components/home/header-home";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Clock,
  Eye,
  Search,
  ThumbsDown,
  ThumbsUp,
  XCircle,
} from "lucide-react";

export const ModeratorPage = () => {
  const [activeTab, setActiveTab] = useState<MaterialStatus>(1);
  const [materials, setMaterials] = useState<ModeratorMaterial[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState<ModeratorMaterialDetail | null>(
    null
  );

  const fetchMaterials = async (estado: MaterialStatus) => {
    try {
      setLoading(true);
      const { data } = await getMaterialsByStatusRequest(estado);
      setMaterials(data);
    } catch {
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials(activeTab);
  }, [activeTab]);

  const handleViewDetail = async (id: number) => {
    try {
      const { data } = await getMaterialByIdRequest(id);
      setSelected(data);
      setDetailOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApprove = async (id: number) => {
    try {
      setActionLoading(true);
      await approveMaterialRequest(id);
      setDetailOpen(false);
      fetchMaterials(activeTab);
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (id: number) => {
    try {
      setActionLoading(true);
      await rejectMaterialRequest(id);
      setDetailOpen(false);
      fetchMaterials(activeTab);
    } finally {
      setActionLoading(false);
    }
  };

  const filtered = materials.filter(
    (m) =>
      m.titulo.toLowerCase().includes(search.toLowerCase()) ||
      m.autores.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <HeaderHome />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Panel de Moderación</h1>
        <p className="text-muted-foreground mb-6">
          Revisa y decide qué materiales se publican
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Materiales</CardTitle>
            <CardDescription>
              En revisión, aprobados y rechazados
            </CardDescription>

            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9"
                placeholder="Buscar por título o autor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </CardHeader>

          <CardContent>
            <Tabs
              value={String(activeTab)}
              onValueChange={(v) => setActiveTab(Number(v) as MaterialStatus)}
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="1" className="gap-2">
                  <Clock className="h-4 w-4" /> En revisión
                </TabsTrigger>
                <TabsTrigger value="2" className="gap-2">
                  <CheckCircle className="h-4 w-4" /> Aprobados
                </TabsTrigger>
                <TabsTrigger value="3" className="gap-2">
                  <XCircle className="h-4 w-4" /> Rechazados
                </TabsTrigger>
              </TabsList>

              <TabsContent value={String(activeTab)}>
                {loading ? (
                  <div className="flex justify-center py-20">
                    <span className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                  </div>
                ) : filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center">
                    <Clock className="h-10 w-10 text-muted-foreground mb-3" />
                    <p className="text-lg font-medium">
                      No hay materiales para revisar
                    </p>
                    <p className="text-sm text-muted-foreground">
                      En este estado no existen materiales actualmente.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Título</TableHead>
                          <TableHead>Autores</TableHead>
                          <TableHead>Páginas</TableHead>
                          <TableHead>Estado</TableHead>
                          <TableHead>Acciones</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filtered.map((m) => (
                          <TableRow key={m.id_material}>
                            <TableCell className="font-medium">
                              {m.titulo}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {m.autores}
                            </TableCell>
                            <TableCell>{m.n_paginas}</TableCell>
                            <TableCell>
                              <Badge variant="outline">
                                {m.id_estado === 1
                                  ? "En revisión"
                                  : m.id_estado === 2
                                  ? "Aprobado"
                                  : "Rechazado"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() =>
                                    handleViewDetail(m.id_material)
                                  }
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>

                                {activeTab === 1 && (
                                  <>
                                    <Button
                                      size="sm"
                                      className="bg-green-500 hover:bg-green-600"
                                      onClick={() =>
                                        handleApprove(m.id_material)
                                      }
                                    >
                                      <ThumbsUp className="h-4 w-4" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="destructive"
                                      onClick={() =>
                                        handleReject(m.id_material)
                                      }
                                    >
                                      <ThumbsDown className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalle del Material</DialogTitle>
              <DialogDescription>
                Información completa del material
              </DialogDescription>
            </DialogHeader>

            {selected && (
              <div className="grid gap-4 text-sm">
                <p>
                  <strong>Título:</strong> {selected.titulo}
                </p>
                <p>
                  <strong>Descripción:</strong> {selected.descripcion}
                </p>
                <p>
                  <strong>Páginas:</strong> {selected.n_paginas}
                </p>
                <p>
                  <strong>Editorial:</strong> {selected.editorial ?? "—"}
                </p>
                <p>
                  <strong>ISBN / DOI:</strong> {selected.isbn_doi ?? "—"}
                </p>
                <p>
                  <strong>Año:</strong> {selected.año_publicacion ?? "—"}
                </p>
              </div>
            )}

            <DialogFooter>
              {activeTab === 1 ? (
                <>
                  <Button
                    variant="destructive"
                    disabled={actionLoading}
                    onClick={() =>
                      selected && handleReject(selected.id_material)
                    }
                  >
                    Rechazar
                  </Button>
                  <Button
                    disabled={actionLoading}
                    onClick={() =>
                      selected && handleApprove(selected.id_material)
                    }
                  >
                    Aprobar
                  </Button>
                </>
              ) : (
                <Button variant="outline" onClick={() => setDetailOpen(false)}>
                  Cerrar
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
