import { create } from "zustand";
import { auth, db } from "../config/Firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDoc, getDocs } from "firebase/firestore";

// Load user data from localStorage
const loadUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("currentUser");
  return storedUser ? JSON.parse(storedUser) : null;
};

const loadIsEmailUserFromLocalStorage = async () => {
  try {
    const docRef = doc(db, "authInfo", "12345");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const emailData = docSnap.data();
      if (emailData && emailData.hasOwnProperty("isEmailUser")) {
        console.log(
          "retrieve emailuser from firebase: ",
          emailData.isEmailUser
        );
        return emailData.isEmailUser; // Ensure it returns a boolean
      }
      console.log("attribute 'isEmailUser' not found in document.");
      return false; // Fallback if attribute is not found
    }
    return false; // Fallback if there's no valid data
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    return false; // Fallback in case of an error
  }
};

const useAuthStore = create((set, get) => ({
  currentUser: loadUserFromLocalStorage(),
  userLoggedIn: !!loadUserFromLocalStorage(),

  isGoogleUser:
    loadUserFromLocalStorage()?.providerData?.some(
      (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
    ) || false, // Safely access providerData
  isEmailUser: false, // Initialized as false, updated later asynchronously
  loading: true,
  displayName: loadUserFromLocalStorage()?.displayName || "",
  email: loadUserFromLocalStorage()?.email || "",
  photoURL: loadUserFromLocalStorage()?.photoURL,

  setCurrentUser: (user) => {
    localStorage.setItem("currentUser", JSON.stringify(user));
    set({ currentUser: user });
  },
  setUserLoggedIn: (status) => set({ userLoggedIn: status }),
  setIsEmailUser: (status) => set({ isEmailUser: status }),
  setIsGoogleUser: (status) => set({ isGoogleUser: status }),
  setLoading: (status) => set({ loading: status }),
  setPhotoURL: (url) => set({ photoURL: url }),
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
      localStorage.setItem("currentUser", JSON.stringify(user));

      const isGoogle =
        user.providerData?.some(
          (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
        ) || false;
      set({ isGoogleUser: isGoogle });

      if (isGoogle) set({ photoURL: user.photoURL });
      set({ userLoggedIn: true });
      if (isGoogle) set({ photoURL: user.photoURL });

      // Persist user data to localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Load `isEmailUser` from Firestore asynchronously
      await get().recheckEmailUser();
    } else {
      // Clear user data from Zustand and localStorage
      set({
        currentUser: null,
        userLoggedIn: false,
        isGoogleUser: false,
        displayName: "",
        email: "",
        photoURL: "",
      });
      localStorage.removeItem("currentUser");
    }
    set({ loading: false });
  },

  recheckEmailUser: async () => {
    try {
      const emailUser = await loadIsEmailUserFromLocalStorage();
      set({ isEmailUser: emailUser });
    } catch (error) {
      console.error("Error rechecking email user status:", error);
      set({ isEmailUser: false }); // Set to false if there's an error
    }
  },
}));

// Initialize the auth state listener
onAuthStateChanged(auth, (user) => {
  useAuthStore.getState().initializeUser(user);
});

export default useAuthStore;
