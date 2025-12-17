import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/auth/useAuth";
import { useTheme } from "@/context/theme/useTheme";
import type { User as UserType } from "@/types/user.type";
import { toast } from "@pheralb/toast";
import {
  Laptop,
  LogOut,
  Moon,
  Settings,
  Shield,
  Sun,
  Upload,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface UserMenuProps {
  user: UserType;
}

export const UserMenu = ({ user }: UserMenuProps) => {
  const { initialUsers, logout } = useAuth();
  const { setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    toast.success({ text: "Sesión cerrada" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-10 w-10 rounded-full font-semibold"
        >
          {initialUsers()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.nombre}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {user.rol !== 1 && (
          <DropdownMenuItem asChild>
            <Link to="/profile">
              <User className="mr-2 h-4 w-4" />
              Mi Perfil
            </Link>
          </DropdownMenuItem>
        )}

        {user.rol !== 1 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/upload">
                <Upload className="mr-2 h-4 w-4" />
                Subir Material
              </Link>
            </DropdownMenuItem>
          </>
        )}

        {(user.rol === 1 || user.rol === 2) && <DropdownMenuSeparator />}

        {user.rol === 2 && (
          <DropdownMenuItem asChild>
            <Link to="/moderator">
              <Shield className="mr-2 h-4 w-4" />
              Panel Moderador
            </Link>
          </DropdownMenuItem>
        )}

        {user.rol === 1 && (
          <DropdownMenuItem asChild>
            <Link to="/admin">
              <Settings className="mr-2 h-4 w-4" />
              Panel Administrador
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun className="mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="ml-2">Tema</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>Claro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>Oscuro</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Laptop className="mr-2 h-4 w-4" />
                <span>Sistema</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
