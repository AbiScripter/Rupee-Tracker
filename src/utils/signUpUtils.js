import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

async function signUp(auth, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Successfully signed up
    const user = userCredential.user;
    return user;
  } catch (error) {
    // Handle errors
    const errorMessage = error.message;
    throw new Error(errorMessage);
  }
}

async function signUpUser(data, setIsLoading) {
  setIsLoading(true);
  try {
    const user = await signUp(auth, data.email, data.password);
    // console.log(user);
    toast.success("SignedUp successfully");

    setIsLoading(false);
    return user;
  } catch (error) {
    toast.error(error.message);
    setIsLoading(false);
    return null;
  }
}

export default signUpUser;

// const createUser=(auth,email,password)=>{
//     createUserWithEmailAndPassword(auth, data.email, data.password)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       console.log(user);
//       messageApi.open({
//         type: "success",
//         content: "User Created",
//       });
//       setIsLoading(false);
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       messageApi.open({
//         type: "error",
//         content: errorMessage,
//       });
//       setIsLoading(false);
//     });
// }
