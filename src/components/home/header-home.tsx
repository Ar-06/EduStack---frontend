import { useAuth } from "@/context/auth/useAuth";
import { BookOpen, LogIn, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { UserMenu } from "./user-menu";

export const HeaderHome = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight">
              EduStack
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>{user && <UserMenu user={user} />}</>
            ) : (
              <>
                <Button variant="ghost" size="sm" className="gap-2" asChild>
                  <Link to="/register">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Registrarse</span>
                  </Link>
                </Button>
                <Button size="sm" className="gap-2" asChild>
                  <Link to="/login">
                    <LogIn className="h-4 w-4" />
                    <span className="hidden sm:inline">Iniciar sesión</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
