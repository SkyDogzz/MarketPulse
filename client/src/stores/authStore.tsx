import {create} from 'zustand'
import {User} from "../types";

type AuthStore = {
  token: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  clearAuth: () => void;
};

const useAuthStore = create<AuthStore>(set => ({
  token: null,
  user: null, 
  setAuth: (token: string, user: User) => set({ token, user }),
  clearAuth: () => set({ token: null, user: null })
}));

export default useAuthStore;
