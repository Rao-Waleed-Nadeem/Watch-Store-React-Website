import useAuthStore from "../Authentication/AuthStore";
import { auth } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

// const { displayName, photoURL, email, isGoogleUser } = useAuthStore();
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const { setIsEmailUser } = useAuthStore.getState();
  setIsEmailUser(true);
  return createUserWithEmailAndPassword(auth, email, password);
};

export const doSignInWithEmailAndPassword = async (email, password) => {
  const {
    setCurrentUser,
    setUserLoggedIn,
    setIsEmailUser,
    setIsGoogleUser,
    setLoading,
    getGmailInfo,
  } = useAuthStore.getState();

  setLoading(true);

  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    setCurrentUser(userCredentials.user);
    setUserLoggedIn(true);
    setIsEmailUser(true);
    setIsGoogleUser(false);
    getGmailInfo();
    return userCredentials.user;
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    setCurrentUser(null);
    throw error;
  } finally {
    setLoading(false);
  }
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Update Zustand store with user's information
    const {
      setCurrentUser,
      setUserLoggedIn,
      setIsGoogleUser,
      setLoading,
      getGmailInfo,
      setPhotoURL,
      // loading,
      // setIsEmailUser,
    } = useAuthStore.getState();
    setLoading(true);
    setCurrentUser(user);
    setUserLoggedIn(true);
    setIsGoogleUser(true);
    // setIsEmailUser(false);
    setPhotoURL(user.photoURL);
    console.log("user: ", user);
    getGmailInfo();

    setLoading(false);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    setLoading(false);
  }
};

export const doSignOut = async () => {
  const {
    setCurrentUser,
    setUserLoggedIn,
    setIsGoogleUser,
    setLoading,
    getGmailInfo,
    // loading,
    // setIsEmailUser,
  } = useAuthStore.getState();
  setLoading(true);

  try {
    await auth.signOut();
    setUserLoggedIn(false);
    // setIsGoogleUser(false);
    // setIsEmailUser(false);
    setCurrentUser(null);
    getGmailInfo();
  } catch (error) {
    console.error("Sign out error:", error);
  } finally {
    setLoading(false);
  }
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/`,
  });
};
