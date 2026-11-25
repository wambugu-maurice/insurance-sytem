import { db } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc } from "firebase/firestore";


// dashboard to map to after logging in
const dashboardMap = {
  system_admin: "/admin",
  insurance_admin: "/insurance",
  provider: "/provider",
};

export default async function loginUser({email,password}) {
    // get user credentials 
    const userCredentials = await signInWithEmailAndPassword(email,password)

    // user object
    const user = userCredentials.user

    // get user data from the object
    const userRef = doc(collection(db,"users",user.uid))
    const userSnap = await getDoc(userRef);

    if(userSnap.exists()){
        throw new Error("user profile not found")
    }

    const userData = userSnap.data()

    // get user role and map it to their relevant dashboard
    // if user role is provider, dashboard becomes /provider
    const dashboard = dashboardMap(userData.role)

    if(!dashboard){
        throw new Error("Invalid user role")
    }

    // return the mapped role path
     return dashboard
    
}