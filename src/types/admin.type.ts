export type AdminStats = {
  totalUsuarios: number;
  totalMateriales: number;
  moderadores: number;
};

export type Moderator = {
  id_usuario: number;
  nombres: string;
  apellidos: string;
  correo: string;
};

export type CreateModerator = {
  nombres: string;
  apellidos: string;
  correo: string;
  password: string;
};

export type CreateModeratorResponse = {
  message: string;
  moderador: {
    nombres: string;
    apellidos: string;
    correo: string;
  };
};
