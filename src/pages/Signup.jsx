import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { registerUser } from "./RegisterUser"
import toast from "react-hot-toast"

export function Signup() {
  const[loading,setLoading]=useState(false)
  const[error,setError]=useState({})
  const[userData,setUserData]=useState({
    userName: "",
    email:"",
    password1:"",
    password2:"",
    organizationCode: ""
  })

  async function handleSignUp(e){
    e.preventDefault();

    setError({})
    setLoading(true)

    try {
      const newErrors = {}
      const{userName,email,password1,password2,organizationCode}=userData
      if(!userName){
        newErrors.userName = "Please enter a username";
        return
      }
      if(!email){
        newErrors.email = "please enter an email"
        return
      }
      if(!password1){
        newErrors.password1 = "please enter a password"
        return
      }
      if(!organizationCode){
        newErrors.organizationCode = "Please provide the code"
      }
      if(!password2){
        newErrors.password2 = "please confirm your password"
      }

      if(password1 !== password2){
        newErrors.password2 = "Passowrds do not match"
      }
      setError(newErrors)
      if(Object.keys(newErrors).length > 0){
        return
      }

      await registerUser(email,password1,userName,organizationCode)
      
    } catch (err) {
      toast.error(err.message)
      
    }finally{
      setLoading(false)
    }
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your credentials to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form" onSubmit={handleSignUp}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" type="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full" form="form">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  )
}
