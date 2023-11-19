import { create } from "zustand";

type SuccessStore = {
  success: string | null;
  setSuccess: (success: string) => void;
  clearSuccess: () => void;
};

const useSuccessStore = create<SuccessStore>((set) => ({
  success: null,
  setSuccess: (success: string) => set({ success }),
  clearSuccess: () => set({ success: null }),
}));

export default useSuccessStore;