import { getDoc, collection, addDoc } from "firebase/firestore";
import { db, doc, setDoc } from "../firebase";
import { toast } from "react-toastify";

async function createDoc(user, username, account) {
  // console.log("from redux", account);
  //getting userdata
  const userRef = doc(db, "users", user.uid);
  const userData = await getDoc(userRef);

  //only create doc if userdata don't already exists in database
  //else dont create doc
  //!signUP
  if (!userData.exists()) {
    console.log("first time........");
    try {
      const currTimeStamp = user.metadata.createdAt;
      const createdAt = new Date(Number(currTimeStamp));

      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName ? user.displayName : username,
        email: user.email,
        photoURl: user.photoURL ? user.photoURL : "",
        createdAt: createdAt,
      });

      const subcollectionRef = collection(userRef, "transactions");
      // console.log(userRef);
      await addDoc(subcollectionRef, {
        ...account,
      });

      toast.success("Doc sucessfully created");
    } catch (error) {
      toast.error(error.message);
    }
  } else {
    //!google sign in
    console.log("not first time.....");
    toast.error("Doc Already exists");
  }
}

export default createDoc;