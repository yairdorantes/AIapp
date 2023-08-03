import { create } from "zustand";

export const useStore = create((set) => ({
  currentImage: "",
  changeImage: (image) => {
    set({ currentImage: image });
  },
}));
