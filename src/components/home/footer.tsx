import { BookOpen } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-border bg-card">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">EduStack</span>
          </div>
          <p className="text-muted-foreground max-w-md">
            La biblioteca virtual más completa para estudiantes, investigadores
            y educadores.
          </p>
          <p className="text-muted-foreground">
            2025 © EduStack - By MEF Studio 🤓
          </p>
        </div>
      </div>
    </footer>
  );
};
