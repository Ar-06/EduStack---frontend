export type RegisterUser = {
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export enum UserRole {
  ADMIN = 1,
  MODERADOR = 2,
  USUARIO = 3,
}

export type User = {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  rol: UserRole;
};

export type VerifyTokenResponse = {
  usuario: User;
};
