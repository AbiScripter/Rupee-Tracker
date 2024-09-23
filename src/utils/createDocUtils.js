import { getDoc, collection, addDoc } from "firebase/firestore";
import { db, doc, setDoc } from "../firebase";
import { toast } from "react-toastify";

async function createDoc(signupData, username, userAccountData) {
  console.log(signupData);
  console.log(userAccountData);
  //getting userdata
  const userRef = doc(db, "users", signupData.uid);
  //if user signing up there wont be any userData
  const userData = await getDoc(userRef);
  //only create doc if userdata don't already exists in database
  //else dont create doc
  //!signUP
  if (!userData.exists()) {
    console.log("first time  signing up........");
    try {
      await setDoc(doc(db, "users", signupData.uid), {
        ...userAccountData,
        name: signupData.displayName ? signupData.displayName : username,
        email: signupData.email,
        uid: signupData.uid,
      });

      // const subcollectionRef = collection(userRef, "transactions");
      // // console.log(userRef);
      // await addDoc(subcollectionRef, {
      //   ...userAccountData,
      // });

      toast.success("Account sucessfully created");
    } catch (error) {
      toast.error(error.message);
    }
  } else {
    //!google sign in
    console.log("Account Aleardy exists.....");
    toast.success("Logged In Successfully");
  }
}

export default createDoc;
