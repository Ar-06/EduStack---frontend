import axiosAdmin from "./axiosAdmin";
import type {
  AdminStats,
  Moderator,
  CreateModerator,
  CreateModeratorResponse,
} from "@/types/admin.type";

export const getAdminStatsRequest = () => axiosAdmin.get<AdminStats>("/stats");

export const getModeratorsRequest = () =>
  axiosAdmin.get<Moderator[]>("/moderators");

export const createModeratorRequest = (data: CreateModerator) =>
  axiosAdmin.post<CreateModeratorResponse>("/create-moderator", data);
    