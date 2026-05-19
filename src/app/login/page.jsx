"use client";

import { authClient } from "@/lib/auth-client";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { GrGoogle } from "react-icons/gr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      toast.error(error.message || "Login failed. Please check your credentials.");
    } else {
      toast.success("Welcome!");
      
      router.push("/"); 
      router.refresh();
    }
  };

  const handleGoogleLogIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    toast.success("Welcome!");
    } catch (err) {
      toast.error("Google sign-in failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-slate-50/50 px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <Card className="border border-slate-100 shadow-xl w-full max-w-md py-10 px-8 flex flex-col gap-6 rounded-3xl bg-white">
        
      
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            WEL<span className="text-orange-500">COME</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Please enter your details to login to SlotsLib.
          </p>
        </div>

      
        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          
         
          <TextField
            isRequired
            name="email"
            type="email"
            className="w-full"
            validate={(value) => {
              if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                return "Please enter a valid email address";
              }
              return null;
            }}
          >
            <Label className="text-sm font-extrabold text-slate-700">Email Address</Label>
            <Input 
              placeholder="name@example.com" 
              className="mt-1.5 border-slate-200 focus-within:border-orange-500"
            />
            <FieldError className="text-xs text-red-500 mt-1 font-semibold" />
          </TextField>

          
          <TextField
            isRequired
            name="password"
            type="password"
            className="w-full"
          >
            <Label className="text-sm font-extrabold text-slate-700">Password</Label>
            <Input 
             type="password"
             placeholder="..............."
              className="mt-1.5 border-slate-200 focus-within:border-orange-500"
            />
            <Description className="text-[10px] text-slate-400 font-medium mt-1">
              Must be at least 8 characters.
            </Description>
            <FieldError className="text-xs text-red-500 mt-1 font-semibold" />
          </TextField>

         
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold h-12 rounded-xl shadow-md shadow-orange-500/10 transition-all duration-300"
          >
            Login
          </Button>
        </Form>

        <div className="flex items-center gap-4 py-1">
          <div className="h-px bg-slate-200 flex-1"></div>
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Or</span>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

       
        <Button
          onClick={handleGoogleLogIn}
          variant="bordered"
          className="w-full border-orange-500 text-orange-500 hover:bg-orange-50 font-extrabold h-12 rounded-xl transition-all duration-300"
        >
          <GrGoogle className="text-orange-500 text-lg" />
          Continue with Google
        </Button>

       
        <p className="text-center text-sm text-slate-600 font-medium">
          New to SlotsLib?{" "}
          <Link href="/register" className="text-orange-500 font-extrabold hover:text-orange-600 hover:underline transition-colors">
            Create an account
          </Link>
        </p>
      </Card>
    </div>
  );
}