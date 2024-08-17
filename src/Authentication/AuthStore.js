import { create } from "zustand";
import { auth } from "../config/Firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

// Load user data from localStorage
const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("currentUser");
  return storedUser ? JSON.parse(storedUser) : null;
};

const useAuthStore = create((set, get) => ({
  currentUser: loadUserFromLocalStorage(),
  // isLoginUser: loadUserFromLocalStorage(),
  userLoggedIn: !!loadUserFromLocalStorage(),
  isEmailUser: loadUserFromLocalStorage()?.providerData.some(
    (provider) => provider.providerId === "password"
  ),
  isGoogleUser: loadUserFromLocalStorage()?.providerData.some(
    (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
  ),
  loading: true,
  displayName: loadUserFromLocalStorage()?.displayName || "",
  email: loadUserFromLocalStorage()?.email || "",
  photoURL: loadUserFromLocalStorage()?.photoURL || "",

  setCurrentUser: (user) => {
    // Save user to localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));
    set({ currentUser: user });
  },
  setUserLoggedIn: (status) => set({ userLoggedIn: status }),
  setIsEmailUser: (status) => set({ isEmailUser: status }),
  setIsGoogleUser: (status) => set({ isGoogleUser: status }),
  setLoading: (status) => set({ loading: status }),
  setPhotoURL: (status) => set({ photoURL: status }),
  // setIsLoginError: (status) => set({ isLoginError: status }),

  getGmailInfo: () => {
    const { isGoogleUser, currentUser } = get();
    if (isGoogleUser && currentUser) {
      set({
        displayName: currentUser.displayName || "",
        email: currentUser.email || "",
        photoURL: currentUser.photoURL || "",
      });
    }
  },

  initializeUser: async (user) => {
    if (user) {
      set({ currentUser: user });

      const isEmail = user.providerData.some(
        (provider) => provider.providerId === "password"
      );
      set({ isEmailUser: isEmail });

      const isGoogle = user.providerData.some(
        (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      );
      set({ isGoogleUser: isGoogle });
      if (isGoogle) set({ photoURL: user.photoURL });
      set({ userLoggedIn: true });

      // Persist user data to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      // Clear user data from Zustand and localStorage
      set({
        currentUser: null,
        userLoggedIn: false,
        isEmailUser: false,
        isGoogleUser: false,
        displayName: "",
        email: "",
        photoURL: "",
      });
      localStorage.removeItem("currentUser");
    }
    set({ loading: false });
  },
}));

// Initialize the auth state listener
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().initializeUser(user);
});

export default useAuthStore;
