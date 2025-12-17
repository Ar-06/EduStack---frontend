import type { MaterialFilters } from "@/types/materials.type";
import axiosMaterial from "./axiosMaterial";

export const createMaterialRequest = (data: FormData) =>
  axiosMaterial.post("/upload", data);

export const getMaterialsRequest = (filters?: MaterialFilters) =>
  axiosMaterial.get("/material", {
    params: filters,
  });

export const getMyMaterialsRequest = () => axiosMaterial.get("/my-material");

export const getFavoriteMaterialsRequest = () =>
  axiosMaterial.get("/favorites");

export const toggleFavoriteMaterialRequest = (id: number) =>
  axiosMaterial.post(`/favorite/${id}`);

export const downloadMaterialRequest = (id: number) =>
  axiosMaterial.get(`/download/${id}`);

export const getMaterialByIdRequest = (id: number) =>
  axiosMaterial.get(`/material/${id}`);
