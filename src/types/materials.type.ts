export type CreateMaterial = {
  titulo: string;
  autor: string;
  descripcion: string;
  id_cat: number;
  id_tipo: number;
  editorial: string;
  anio: string;
  isbn_doi: string;
  paginas: string;
  id_idioma: number;
  id_nivel: number;
  archivo: File | null;
};

export type Material = {
  id_material: number;
  titulo: string;
  descripcion: string | null;
  url_material: string;
  isbn_doi: string | null;
  n_paginas: number | null;
  editorial: string | null;
  año_publicacion: number | null;

  rating: number;
  n_descargas: number;
  categoria: string;
  tipo: string;

  autores: string;
};

export type MyMaterial = {
  id_material: number;
  titulo: string;
  descripcion: string | null;
  url_material: string;
  isbn_doi: string | null;
  n_paginas: number | null;

  rating: number;
  n_descargas: number;

  editorial: string | null;
  año_publicacion: number | null;

  id_estado: number;

  categoria: string;
  tipo: string;

  autores: string;
};

export type FavoriteMaterial = {
  id_material: number;
  titulo: string;
  descripcion: string | null;
  url_material: string;
  rating: number;
  categoria: string;
  tipo: string;
  autores: string;
  id_estado: number;
  n_paginas: number | null;
  n_descargas: number;
};

export type MaterialFilters = {
  categoria?: number;
  tipo?: number;
  idioma?: number;
  nivel?: number;
  search?: string;
};

export type ToggleFavoriteResponse = {
  message: string;
};
