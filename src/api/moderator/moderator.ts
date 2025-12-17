import axiosModerator from "./axiosModerator";
import type {
  ModeratorMaterial,
  ModeratorMaterialDetail,
  ModeratorActionResponse,
  MaterialStatus,
} from "@/types/moderator.type";

export const getMaterialsByStatusRequest = (estado: MaterialStatus) =>
  axiosModerator.get<ModeratorMaterial[]>(`/material/${estado}`);

export const approveMaterialRequest = (id_material: number) =>
  axiosModerator.post<ModeratorActionResponse>(
    `/material/${id_material}/approve`
  );

export const rejectMaterialRequest = (id_material: number) =>
  axiosModerator.post<ModeratorActionResponse>(
    `/material/${id_material}/reject`
  );

export const getMaterialByIdRequest = (id_material: number) =>
  axiosModerator.get<ModeratorMaterialDetail>(`/view/${id_material}`);
