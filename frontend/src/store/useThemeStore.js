import { create } from "zustand";

export const useThemeStore = create((set) => ({

  theme: localStorage.getItem("chat-theme") || "dark",
  setTheme: (theme) => {
    set({ theme });
    localStorage.setItem("chat-theme", theme);
    // Compare this snippet from frontend/src/components/Chat.js:
  },

}));
