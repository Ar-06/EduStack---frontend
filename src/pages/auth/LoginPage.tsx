import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/auth/useAuth";
import type { LoginUser } from "@/types/user.type";
import { toast } from "@pheralb/toast";
import { BookOpen, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, errors, clearErrors } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState<LoginUser>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (errors.length) {
      errors.forEach((err) => toast.error({ text: err }));
      return;
    }
  }, [errors]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((s) => ({ ...s, [id]: value }));
    if (errors.length) clearErrors();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error({ text: "Todos los campos son obligatorios" });
      return;
    }
    setIsLoading(true);
    try {
      await login(form);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-background via-background to-primary/5 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-foreground mb-6"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <BookOpen className="h-7 w-7 text-primary-foreground" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">
              EduStack
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-balance mt-6">
            Bienvenido de vuelta
          </h1>
          <p className="text-muted-foreground mt-2">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={form.email ?? ""}
                onChange={handleChange}
                placeholder="tu@email.com"
                required
                className="h-11"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password ?? ""}
                  onChange={handleChange}
                  placeholder="********"
                  required
                  className="h-11"
                  disabled={isLoading}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="sr-only">
                    {showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  </span>
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="">
                  <div className="flex items-center justify-center gap-2 text-primary-foreground/80">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Iniciando sesión...</span>
                  </div>
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm ">
            <span className="text-muted-foreground">
              ¿No tienes una cuenta?
            </span>
            <Link
              to="/register"
              className="text-primary font-medium hover:underline ml-1"
            >
              Registrate aquí
            </Link>
          </div>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Al continuar, aceptas nustros términos y condiciones y Política de
          Privacidad
        </p>
      </div>
    </div>
  );
};
