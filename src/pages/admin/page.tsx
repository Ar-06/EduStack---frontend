import { Badge } from "@/components/ui/badge";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BookOpen,
  Eye,
  EyeOff,
  Search,
  ShieldCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  createModeratorRequest,
  getAdminStatsRequest,
  getModeratorsRequest,
} from "@/api/admin/admin";

import { HeaderHome } from "@/components/home/header-home";
import type {
  AdminStats,
  CreateModerator,
  Moderator,
} from "@/types/admin.type";

export const AdminPage = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [moderators, setModerators] = useState<Moderator[]>([]);
  const [searchModerators, setSearchModerators] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [newModerator, setNewModerator] = useState<CreateModerator>({
    nombres: "",
    apellidos: "",
    correo: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, modsRes] = await Promise.all([
          getAdminStatsRequest(),
          getModeratorsRequest(),
        ]);

        setStats(statsRes.data);
        setModerators(modsRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateModerator = async () => {
    try {
      setSaving(true);

      await createModeratorRequest(newModerator);

      const modsRes = await getModeratorsRequest();
      setModerators(modsRes.data);

      setIsDialogOpen(false);
      setNewModerator({
        nombres: "",
        apellidos: "",
        correo: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const filteredModerators = moderators.filter(
    (mod) =>
      `${mod.nombres} ${mod.apellidos}`
        .toLowerCase()
        .includes(searchModerators.toLowerCase()) ||
      mod.correo.toLowerCase().includes(searchModerators.toLowerCase())
  );

  if (loading || saving) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <span className="h-14 w-14 animate-spin rounded-full border-4 border-primary border-t-transparent"></span>
          <p className="text-sm text-muted-foreground">
            {saving ? "Creando moderador..." : "Cargando panel..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HeaderHome />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">
            Gestión de moderadores y estadísticas generales
          </p>
        </div>

        {/* Estadísticas */}
        {stats && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Usuarios</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalUsuarios}</div>
                <p className="text-xs text-muted-foreground">
                  Usuarios registrados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Moderadores</CardTitle>
                <ShieldCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.moderadores}</div>
                <p className="text-xs text-muted-foreground">
                  Moderadores activos
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm">Materiales</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stats.totalMateriales}
                </div>
                <p className="text-xs text-muted-foreground">
                  Materiales registrados
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Moderadores */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Moderadores</CardTitle>
                <CardDescription>
                  Gestión de moderadores del sistema
                </CardDescription>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <UserPlus className="h-4 w-4" />
                    Crear Moderador
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nuevo Moderador</DialogTitle>
                    <DialogDescription>
                      Completa los datos del moderador
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label>Nombres</Label>
                      <Input
                        value={newModerator.nombres}
                        onChange={(e) =>
                          setNewModerator({
                            ...newModerator,
                            nombres: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Apellidos</Label>
                      <Input
                        value={newModerator.apellidos}
                        onChange={(e) =>
                          setNewModerator({
                            ...newModerator,
                            apellidos: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={newModerator.correo}
                        onChange={(e) =>
                          setNewModerator({
                            ...newModerator,
                            correo: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label>Contraseña</Label>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          value={newModerator.password}
                          onChange={(e) =>
                            setNewModerator({
                              ...newModerator,
                              password: e.target.value,
                            })
                          }
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-0 top-0 h-full px-3 py-2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancelar
                    </Button>
                    <Button onClick={handleCreateModerator}>
                      Crear Moderador
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="relative mt-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar moderadores..."
                value={searchModerators}
                onChange={(e) => setSearchModerators(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>

          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Estado</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModerators.map((mod) => (
                    <TableRow key={mod.id_usuario}>
                      <TableCell className="font-medium">
                        {mod.nombres} {mod.apellidos}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {mod.correo}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/10 text-green-700">
                          Activo
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
