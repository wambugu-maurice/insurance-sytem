import { auth, db } from "@/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, getDocs,query, serverTimestamp, setDoc, where } from "firebase/firestore"


// these are used during entity regustration.
// eg when onboarding AAR insurance, type will be insurance
const roleMap = {
    healthCare: "provider",
    insurance: "insurance_admin"
};


// resubale function that checks what type of user in registering
export async function registerUser({email,password,userName,organizationCode}) {
    // get entity code from the stored organization document
    const q = query(collection(db,"organizations"),where("registrationCode","==",organizationCode));
    const snapshot = await getDocs(q)

    if(snapshot.empty){
        throw new Error("Invalid code")
    }

    // fetch the first document and its data
    const orgDoc = snapshot.docs[0].data()

    // check if entity is active
    if(orgDoc.status !== "active"){
        throw new Error("Organization is not active")
    }
    
    // use the role used when res=gistering the entity..eg if registered as healthcare
    // role becomes provider
    const role = roleMap[orgDoc.type]
    if(!role){
        throw new Error("Invalid organization type")
    }

    // create the user with the rught type of entity
    const userCredentials = await createUserWithEmailAndPassword(auth,email,password)
    // userCredentials returns a user
    const user = userCredentials.user

    try {
        // update displayName as firestore might initializa it as null
        // updateProfile updates userName and photoUrl only
        await updateProfile(user,{
            displayName: userName
        })

        // create the user document
        // userDocRef to create a document ref  with uid as its refference
        const docRef = doc(db,"users",user.uid)

        // the newly created user can be a provider or an insurance
        // orgo id will be the entity id, type will be either insurance or healthcare
        // role will be insurance_admin or provider
        await setDoc(docRef,{
            userId: user.uid,
            userName,
            email,
            role,
            organizationId: orgDoc.uid,
            organizationType: orgDoc.type,
            createdAt: serverTimestamp()
        })

        // retunr the newly created user the the register func when creating the user
        return user
        
    } catch (error) {
        throw error.message
        
    }

}