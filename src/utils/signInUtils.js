import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

async function signInUser(data, setIsLoading) {
  setIsLoading(true);
  try {
    const user = await signin(data.email, data.password);
    toast.success("Signed In Sucessfully");
    return user;
  } catch (error) {
    toast.error(error.message);
    return null;
  } finally {
    setIsLoading(false);
  }
}

async function signin(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Successfully signed in
    const user = userCredential.user;
    return user;
  } catch (error) {
    // Handle errors
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
}

export default signInUser;

// signInWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//   });
