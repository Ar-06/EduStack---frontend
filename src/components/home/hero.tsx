import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const Hero = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;

    navigate(`/materials?search=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className="w-full bg-secondary/30 border-b border-border">
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Tu biblioteca académica{" "}
            <span className="text-accent">sin límites</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubre miles de libros, papers y materiales educativos de todas
            las disciplinas.
          </p>

          <div className="max-w-2xl mx-auto mt-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar libros, papers, artículos..."
                  className="pl-10 h-12 text-base"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
              <Button size="lg" className="px-8" onClick={handleSearch}>
                Buscar
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-3">
              Ejemplos: Cálculo Diferencial, Física Cuántica, Derecho
              Constitucional
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
