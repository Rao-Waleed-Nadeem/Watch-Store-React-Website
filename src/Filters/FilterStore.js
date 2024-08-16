// drawerStore.js
import { create } from "zustand";

const useFilterStore = create((set) => ({
  filterOpen: false,
  setFilterOpen: (open) => set({ filterOpen: open }),
}));

export default useFilterStore;
