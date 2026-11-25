import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import loginUser from "@/hooks/LoginUser"
import { Label } from "radix-ui";
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

function Login() {
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState({})
  const[userData,setUserData]=useState({
    userName:"",
    email:"",
    password:""
  })

  const navivage = useNavigate()

  function handleFieldUpdate(e){
    const{name,value}=e.target;
    setUserData((prev)=>({...prev,[name]:value}))
  }

  async function handleLogin(e) {
    e.preventDefault()

    setLoading(true)
    setError({})

    const newErrors = {}
    const {userName,email,password}=userData;
    if(!userName){
      newErrors.userName = "Please enter your username"
      return
    }
    if(!email){
      newErrors.email = "Please enter your email"
      return
    }
    if(!password){
      newErrors.password = "Please enter your password"
    }

    setError(newErrors)
    if(Object.keys(newErrors).length > 0){
      return
    }

    try {
      // dashboard becomes whatever path the loginUser hook returns
      // say LoginUser returns /provider , dashboard becomes /provider
      const dashboard = await loginUser(email,password)
      // this now becomes navigate("/provider")
      navivage(dashboard,{replace: true})
      
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
      
    }finally{
      setLoading(false)
    }
    
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to login
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form" onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                value={userData.email}
                onChange={handleFieldUpdate}
              />
              <div className="p-3">
                {error.email && <p className="text-red-500">{error.email}</p>}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="username">UserName</Label>
              </div>
              <Input
                id="username"
                type="text"
                name="username"
                value={userData.userName}
                onChange={handleFieldUpdate}
                placeholder="St John clinic"
              />
              <div className="p-3">
                {error.userName && (
                  <p className="text-red-500">{error.userName}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password1">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleFieldUpdate}
              />
              <div className="p-3">
                {error.password && (
                  <p className="text-red-500">{error.password}</p>
                )}
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          variant="outline"
          className="w-full"
          form="form"
          disabled={loading}
        >
          {loading ? "logging in..." : "Login"}
        </Button>
      </CardFooter>
    </Card>

  )
}

export default Login