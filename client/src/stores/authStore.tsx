import { create } from "zustand";
import { User } from "../types";

type AuthStore = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
};

const useAuthStore = create<AuthStore>((set) => {
  const storedToken = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  return {
    token: storedToken,
    user: storedUser ? JSON.parse(storedUser) : null,
    setAuth: (token: string, user: User) => {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      set({ token, user });
    },
    clearAuth: () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      set({ token: null, user: null });
    },
  };
});

export default useAuthStore;
