import {
  getCategoriesRequest,
  getLanguagesRequest,
  getNivelesRequest,
  getTypeMaterialRequest,
} from "@/api/catalogs/catalog";
import { createMaterialRequest } from "@/api/materials/material";
import { HeaderHome } from "@/components/home/header-home";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type {
  Categories,
  Languajes,
  Niveles,
  TypeMaterial,
} from "@/types/catalogs.type";
import type { CreateMaterial } from "@/types/materials.type";
import { toast } from "@pheralb/toast";
import confetti from "canvas-confetti";
import { FileText, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UploadPage = () => {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [typeMaterial, setTypeMaterial] = useState<TypeMaterial[]>([]);
  const [languages, setLanguages] = useState<Languajes[]>([]);
  const [levels, setLevels] = useState<Niveles[]>([]);
  const [fileName, setFileName] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const navigate = useNavigate();

  const [form, setForm] = useState<CreateMaterial>({
    titulo: "",
    autor: "",
    descripcion: "",
    id_cat: 0,
    id_tipo: 0,
    editorial: "",
    anio: "",
    isbn_doi: "",
    paginas: "",
    id_idioma: 0,
    id_nivel: 0,
    archivo: null as File | null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [id]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (key: keyof CreateMaterial, value: string) => {
    setForm((prev) => ({ ...prev, [key]: Number(value) }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setForm((prev) => ({ ...prev, archivo: file }));
    setFileName(file.name);
  };

  const submitConfirmed = async () => {
    if (!form.archivo) {
      toast.error({ text: "Debes seleccionar un archivo" });
      return;
    }

    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("titulo", form.titulo);
      formData.append("autor", form.autor);
      formData.append("descripcion", form.descripcion);
      formData.append("id_cat", String(form.id_cat));
      formData.append("id_tipo", String(form.id_tipo));
      formData.append("editorial", form.editorial);
      formData.append("anio", String(form.anio));
      formData.append("isbn_doi", form.isbn_doi);
      formData.append("paginas", String(form.paginas));
      formData.append("id_idioma", String(form.id_idioma));
      formData.append("id_nivel", String(form.id_nivel));
      formData.append("archivo", form.archivo);

      await createMaterialRequest(formData);

      toast.success({ text: "Material enviado a revisión" });
      confetti();
      navigate("/profile");
    } catch (error) {
      console.error(error);
      toast.error({ text: "Error al subir el material" });
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, typeRes, langRes, levelRes] = await Promise.all([
          getCategoriesRequest(),
          getTypeMaterialRequest(),
          getLanguagesRequest(),
          getNivelesRequest(),
        ]);

        setCategories(catRes.data || []);
        setTypeMaterial(typeRes.data || []);
        setLanguages(langRes.data || []);
        setLevels(levelRes.data || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const UploadLoading = () => (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <p className="text-lg font-medium">Subiendo material…</p>
        <p className="text-sm text-muted-foreground">
          Por favor espera, esto puede tardar unos segundos
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      {isUploading && <UploadLoading />}
      <HeaderHome />
      <main className="flex-1 bg-linear-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">
                Subir Material Educativo
              </h1>
              <p className="text-muted-foreground">
                Comparte conocimiento con la comunidad académica. Completa todos
                los campos para publicar tu material.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Información del Material</CardTitle>
                <CardDescription>
                  Proporciona todos los detalles necesarios para ayudar a otros
                  a encontrar tu material.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Título <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="titulo"
                      value={form.titulo ?? ""}
                      onChange={handleChange}
                      placeholder="Ej: Introducción a la Física Cuántica"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="author">
                      Autor(es) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="autor"
                      value={form.autor ?? ""}
                      onChange={handleChange}
                      placeholder="Richard Feynman, Albert Einstei"
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Descripcion <span className="text-destructive">*</span>
                    </Label>

                    <Textarea
                      id="descripcion"
                      value={form.descripcion ?? ""}
                      onChange={handleChange}
                      placeholder="Describe el contenido, temas tratados y a quién está dirigido este material..."
                      className="min-h-30 resize-none"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Categoría <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        onValueChange={(v) => handleSelectChange("id_cat", v)}
                      >
                        <SelectTrigger id="categories">
                          <SelectValue placeholder="Selecciona una categoría" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.id_cat}
                              value={String(category.id_cat)}
                            >
                              {category.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="type">
                        Tipo de Material{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        onValueChange={(v) => handleSelectChange("id_tipo", v)}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Selecciona el tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {typeMaterial.map((type) => (
                            <SelectItem
                              key={type.id_tipo}
                              value={String(type.id_tipo)}
                            >
                              {type.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="publisher">Editorial</Label>
                      <Input
                        id="editorial"
                        value={form.editorial ?? ""}
                        onChange={handleChange}
                        placeholder="Ej: McGraw-Hill, Springer"
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="year">
                        Año de publicación{" "}
                        <span className="text-destructive">*</span>{" "}
                      </Label>
                      <Input
                        id="anio"
                        value={form.anio ?? ""}
                        onChange={handleChange}
                        type="number"
                        placeholder="Ej: 2025"
                        min="1900"
                        max={new Date().getFullYear()}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="isbn">ISBN / DOI</Label>
                      <Input
                        id="isbn_doi"
                        value={form.isbn_doi ?? ""}
                        onChange={handleChange}
                        placeholder="Ej: 978-3-16-148410-0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pages">
                        Número de páginas{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="paginas"
                        value={form.paginas ?? ""}
                        onChange={handleChange}
                        type="number"
                        placeholder="Ej: 450"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="languaje">
                        Idioma <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        onValueChange={(v) =>
                          handleSelectChange("id_idioma", v)
                        }
                      >
                        <SelectTrigger id="languaje">
                          <SelectValue placeholder="Selecciona un idioma" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((language) => (
                            <SelectItem
                              key={language.id_idioma}
                              value={String(language.id_idioma)}
                            >
                              {language.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="level">Nivel Académico</Label>
                      <Select
                        onValueChange={(v) => handleSelectChange("id_nivel", v)}
                      >
                        <SelectTrigger id="level">
                          <SelectValue placeholder="Selecciona el nivel" />
                        </SelectTrigger>
                        <SelectContent>
                          {levels.map((level) => (
                            <SelectItem
                              key={level.id_nivel}
                              value={String(level.id_nivel)}
                            >
                              {level.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="file">Archivo</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Upload className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <Label
                            htmlFor="file"
                            className="text-sm font-medium text-primary cursor-pointer"
                          >
                            Haz click para seleccionar
                          </Label>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          PDF,EPUB (max. 20MB)
                        </p>
                        {fileName && (
                          <div className="flex items-center gap-2 mt-2 bg-accent px-3 py-1 rounded">
                            <FileText className="h-4 w-4" />
                            <span className="text-sm">{fileName}</span>
                          </div>
                        )}
                      </div>
                      <input
                        id="file"
                        type="file"
                        className="hidden"
                        accept=".pdf, .epub"
                        required
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => navigate("/profile")}
                    >
                      Cancelar
                    </Button>
                    <AlertDialog
                      open={openConfirm}
                      onOpenChange={setOpenConfirm}
                    >
                      <AlertDialogTrigger asChild>
                        <Button
                          type="button"
                          className="flex-1 gap-2"
                          disabled={isUploading}
                        >
                          <Upload className="h-4 w-4" />
                          Publicar Material
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            ¿Deseas publicar este material?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            El material será enviado a revisión por un moderador
                            antes de publicarse. Asegúrate de que la información
                            sea correcta.
                          </AlertDialogDescription>
                        </AlertDialogHeader>

                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>

                          <AlertDialogAction
                            onClick={() => {
                              setOpenConfirm(false);
                              submitConfirmed();
                            }}
                          >
                            Sí, publicar
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};
