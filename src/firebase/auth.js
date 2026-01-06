import { GoogleAuthProvider, signInWithPopup, signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";

export const loginHR = () => signInWithPopup(auth, new GoogleAuthProvider());
export const loginReferee = () => signInAnonymously(auth);
