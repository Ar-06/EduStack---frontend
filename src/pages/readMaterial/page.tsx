import { HeaderHome } from "@/components/home/header-home";
import { Button } from "@/components/ui/button";
import axios from "axios";

import { ArrowLeft, Download } from "lucide-react";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

type Material = {
  titulo: string;
  ruta_archivo: string;
};
export const ReadMaterialPage = () => {
  const { id } = useParams();
  const [material, setMaterial] = useState<Material | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/materials/view/${id}`)
      .then((res) => setMaterial(res.data))
      .catch(console.error);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderHome />

      <main className="flex-1 bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" onClick={() => history.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <Button asChild>
              <a href={material?.ruta_archivo} target="_blank">
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </a>
            </Button>
          </div>

          <div className="w-full h-[80vh] border rounded-lg overflow-hidden">
            <iframe
              src={material?.ruta_archivo}
              className="w-full h-full"
              title="Lectura de material"
            />
          </div>
        </div>
      </main>
    </div>
  );
};
