import { HeaderHome } from "@/components/home/header-home";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { useParams } from "react-router-dom";

export const ReadMaterialPage = () => {
  const { id } = useParams();

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
              <a
                href={`http://localhost:3000/api/materials/download/${id}`}
                target="_blank"
              >
                <Download className="h-4 w-4 mr-2" />
                Descargar
              </a>
            </Button>
          </div>

          <div className="w-full h-[80vh] border rounded-lg overflow-hidden">
            <iframe
              src={`http://localhost:3000/api/materials/view/${id}`}
              className="w-full h-full"
              title="Lectura de material"
            />
          </div>
        </div>
      </main>
    </div>
  );
};
