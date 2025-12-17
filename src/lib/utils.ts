import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { BookOpen, FileText, Newspaper } from "lucide-react";

export const getTypeIcon = (type: string) => {
  switch (type) {
    case "Libro":
      return BookOpen;
    case "Paper":
      return FileText;
    case "Artículo":
      return Newspaper;
    default:
      return FileText;
  }
};

export const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    Matemáticas: "bg-blue-500/10 text-blue-600",
    Física: "bg-purple-500/10 text-purple-600",
    Derecho: "bg-amber-500/10 text-amber-600",
    Informática: "bg-green-500/10 text-green-600",
    Química: "bg-teal-500/10 text-teal-600",
    Medicina: "bg-rose-500/10 text-rose-600",
    Administración: "bg-indigo-500/10 text-indigo-600",
    Literatura: "bg-orange-500/10 text-orange-600",
  };

  return colors[category] || "bg-gray-500/10 text-gray-600";
};
