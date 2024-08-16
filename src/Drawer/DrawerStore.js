// drawerStore.js
import { create } from "zustand";

const useDrawerStore = create((set) => ({
  rightDrawerOpen: false,
  setRightDrawerOpen: (open) => set({ rightDrawerOpen: open }),
}));

export default useDrawerStore;
