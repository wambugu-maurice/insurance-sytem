import { getAuth, onAuthStateChanged } from "firebase/auth"
import { Loader } from "lucide-react"
import { useEffect, useState } from "react"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedLayout({allowdRoles}) {
  const[loading,setLoading]=useState(true)
  const[error,setError]=useState("")
  const[loggedUser,setLoggedUser]=useState(null)

  const auth = getAuth()
  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth,user=>{
      setLoading(false)
      setLoggedUser(!!user)
    },(err)=>{
      setError(err.message)
    })

    return ()=> unsubscribe()
  },[auth])

  if(loading) return <Loader />
  if(!loggedUser) return <Navigate to='/login' replace={true} />
  if(!allowdRoles.includes(loggedUser.role)){
    return <Navigate to='unathourized' replace={true} />
  }
  return (
    <>
      { error && <p>{error.message}</p>}
      <Outlet />
    </>
  )
}

export default ProtectedLayout