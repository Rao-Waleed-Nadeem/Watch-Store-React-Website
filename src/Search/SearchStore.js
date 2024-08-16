import { create } from "zustand";

const useSearchStore = create((set) => ({
  Search: "",
  SetSearch: (state) => set({ Search: state }),
}));

export default useSearchStore;
