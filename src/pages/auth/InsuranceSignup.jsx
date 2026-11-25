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
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { registerUser } from "../../hooks/RegisterUser";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function InsuranceSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password1: "",
    password2: "",
    organizationCode: "",
  });

  const navigate = useNavigate()

  function handleFieldChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSignUp(e) {
    e.preventDefault();

    setError({});
    setLoading(true);

    try {
      const newErrors = {};
      const { userName, email, password1, password2, organizationCode } =
        userData;
      if (!userName) {
        newErrors.userName = "Please enter a username";
        return;
      }
      if (!email) {
        newErrors.email = "please enter an email";
        return;
      }
      if (!password1) {
        newErrors.password1 = "please enter a password";
        return;
      }
      if (!organizationCode) {
        newErrors.organizationCode = "Please provide the code";
      }
      if (!password2) {
        newErrors.password2 = "please confirm your password";
      }

      if (password1 !== password2) {
        newErrors.password2 = "Passowrds do not match";
      }
      setError(newErrors);
      if (Object.keys(newErrors).length > 0) {
        return;
      }

      await registerUser(email, password1, userName, organizationCode);
      toast.success("Account created")
      navigate("/login")
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Insurance Portal</CardTitle>
        <CardDescription>
          Enter your credentials to create an insurance portal
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
                name="email"
                placeholder="m@example.com"
                value={userData.email}
                onChange={handleFieldChange}
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
                onChange={handleFieldChange}
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
                id="password1"
                type="password"
                name="password1"
                value={userData.password1}
                onChange={handleFieldChange}
              />
              <div className="p-3">
                {error.password1 && (
                  <p className="text-red-500">{error.password1}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password2">Confirm Password</Label>
              </div>
              <Input
                id="password2"
                type="password"
                name="password2"
                value={userData.password2}
                onChange={handleFieldChange}
              />
              <div className="p-3">
                {error.password2 && (
                  <p className="text-red-500">{error.password2}</p>
                )}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="orgCode">Organization Code</Label>
              </div>
              <Input
                id="orgCode"
                name="orgCode"
                value={userData.organizationCode}
                onChange={handleFieldChange}
                type="password"
              />
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
          {loading ? "signing up..." : "Signup"}
        </Button>
      </CardFooter>
    </Card>
  );
}
