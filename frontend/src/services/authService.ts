import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./firebase";

// Register a new user and create their Firestore document
export const registerUser = async (email: string, password: string, name: string = "") => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const userDocRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userDocRef);

    // Only set the document if it doesn't already exist to prevent duplicates
    if (!docSnap.exists()) {
      await setDoc(userDocRef, {
        name: name,
        email: email,
        level: 1,
        xp: 0,
        streak: 0,
        lastActiveDate: null,
        createdAt: serverTimestamp()
      });
    }

    return user;
  } catch (error: any) {
    console.error("Error registering user:", error.message);
    throw error;
  }
};

// Log in an existing user
export const loginUser = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error logging in:", error.message);
    throw error;
  }
};

// Log out the current user
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error logging out:", error.message);
    throw error;
  }
};
