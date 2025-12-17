export type MaterialStatus = 1 | 2 | 3;

export interface ModeratorMaterial {
  id_material: number;
  titulo: string;
  descripcion: string;
  isbn_doi: string | null;
  n_paginas: number | null;
  rating: number;
  n_descargas: number;
  editorial: string | null;
  año_publicacion: number | null;

  id_usuario: number;
  id_nivel: number;
  id_tipo: number;
  id_idioma: number;
  id_cat: number;
  id_estado: MaterialStatus;

  ruta_archivo: string;
  autores: string;
}

export interface ModeratorMaterialDetail {
  id_material: number;
  titulo: string;
  descripcion: string;
  isbn_doi: string | null;
  n_paginas: number | null;
  rating: number;
  n_descargas: number;
  editorial: string | null;
  año_publicacion: number | null;

  id_usuario: number;
  id_nivel: number;
  id_tipo: number;
  id_idioma: number;
  id_cat: number;
  id_estado: MaterialStatus;

  ruta_archivo: string;
}

export interface ModeratorActionResponse {
  message: string;
}

