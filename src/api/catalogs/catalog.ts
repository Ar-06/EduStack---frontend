import axiosCatalog from "./axiosCatalog";

export const getCategoriesRequest = () => axiosCatalog.get("/categories");

export const getTypeMaterialRequest = () => axiosCatalog.get("/types");

export const getLanguagesRequest = () => axiosCatalog.get("/languages");

export const getNivelesRequest = () => axiosCatalog.get("/level");
