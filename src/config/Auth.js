import useAuthStore from "../Authentication/AuthStore";
import { auth, db } from "../config/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { isMobile } from "react-device-detect";

export const doCreateUserWithEmailAndPassword = async (email, password) => {
  const { setCurrentUser, setIsEmailUser, isEmailUser } =
    useAuthStore.getState();
  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    setCurrentUser(userCredentials.user);
    setIsEmailUser(true);
    const docRef = doc(db, "authInfo", "12345");

    // Update the `isEmailUser` field
    await updateDoc(docRef, {
      isEmailUser: true,
    });
    console.log("isEmailUser in auth: ", isEmailUser);
    console.log("authInfo id: ", EmailRef.id);
    return userCredentials.user;
  } catch (error) {
    console.error("Error creating user with email:", error);
    throw error;
  }
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
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);

    const {
      setCurrentUser,
      setUserLoggedIn,
      setIsGoogleUser,
      setLoading,
      getGmailInfo,
      setPhotoURL,
    } = useAuthStore.getState();

    setLoading(true);

    if (isMobile) {
      await signInWithRedirect(auth, provider); // Use redirect on mobile
    } else {
      const result = await signInWithPopup(auth, provider); // Use popup on desktop
      const user = result.user;

      // Save user information in Zustand state
      setCurrentUser(user);
      setUserLoggedIn(true);
      setIsGoogleUser(true);
      setPhotoURL(user.photoURL); // Save photoURL immediately

      // Save user information in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));

      console.log("User signed in with Google: ", user);

      // Now, call the function to set additional info like email and displayName
      getGmailInfo();
    }

    setLoading(false);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    setLoading(false);
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;

      const {
        setCurrentUser,
        setUserLoggedIn,
        setIsGoogleUser,
        setLoading,
        getGmailInfo,
        setPhotoURL,
      } = useAuthStore.getState();

      setLoading(true);
      setCurrentUser(user);
      setUserLoggedIn(true);
      setIsGoogleUser(true);
      setPhotoURL(user.photoURL);
      getGmailInfo();
      setLoading(false);
    }
  } catch (error) {
    console.error("Error handling redirect result:", error);
  }
};

export const doSignOut = async () => {
  const {
    setCurrentUser,
    setUserLoggedIn,
    setIsGoogleUser,
    setLoading,
    getGmailInfo,
  } = useAuthStore.getState();
  setLoading(true);

  try {
    await auth.signOut();
    setUserLoggedIn(false);
    setIsGoogleUser(false);
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
