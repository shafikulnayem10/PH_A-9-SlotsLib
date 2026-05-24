"use client";

import { authClient } from "@/lib/auth-client";
import { 
  Button, 
  Card, 
  Form, 
  Input, 
  Label, 
  TextField, 
  FieldError 
} from "@heroui/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";

export default function RegisterPage() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const image = formData.get("image");
    const password = formData.get("password");

    const { data, error } = await authClient.signUp.email({
      email,
      password,
      name,
      image,
      dontRedirect: true,
      callbackURL: "/login",
    });

    if (error) {
      toast.error(error.message || "Registration failed.");
    } else {
      toast.success("Registration successful! Please log in.");
      setTimeout(async () => {
        await authClient.signOut();
        window.location.href = "/login";
      }, 500);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/", 
      });
    } catch (err) {
      toast.error("Google authentication failed.");
    }
  };

 
  const uiInputStyles = {
    input: "text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 font-medium",
    inputWrapper: [
      "bg-white dark:bg-slate-950",
      "border border-slate-200 dark:border-slate-800",
      "hover:border-slate-300 dark:hover:border-slate-700",
      "focus-within:!border-orange-500 dark:focus-within:!border-orange-500",
      "rounded-xl transition-all duration-200"
    ].join(" ")
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-slate-50/50 dark:bg-slate-950 px-4 py-12 text-slate-900 dark:text-white transition-colors duration-300">
      
      {/* Registration Card Container */}
      <Card className="w-full max-w-md border border-slate-100 dark:border-slate-800 shadow-xl rounded-[32px] p-10 bg-white dark:bg-slate-900 flex flex-col gap-6 transition-colors duration-300 shadow-none">
        
        {/* Title Section */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            CREATE <span className="text-orange-500">ACCOUNT</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            Join SlotsLib to book your favorite arenas instantly.
          </p>
        </div>

        {/* Social Register Button */}
        <Button
          onClick={handleGoogleRegister}
          variant="bordered"
          className="w-full border-orange-500 text-orange-500 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 font-extrabold h-12 rounded-xl transition-all duration-300 text-sm"
        >
          <GrGoogle className="text-orange-500 dark:text-orange-400 text-lg" /> 
          Register with Google
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-4 py-1">
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
          <span className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">Or</span>
          <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
        </div>

        {/* Registration Credentials Form */}
        <Form className="flex flex-col gap-5" onSubmit={onSubmit}>
          
          {/* Full Name */}
          <TextField isRequired name="name" type="text" className="w-full">
            <Label className="text-sm font-extrabold text-slate-700 dark:text-slate-200 mb-1 block">Full Name</Label>
            <Input 
              placeholder="Enter your name" 
              classNames={uiInputStyles}
            />
            <FieldError className="text-red-500 text-xs mt-1 font-semibold" />
          </TextField>

          {/* Email Address */}
          <TextField isRequired name="email" type="email" className="w-full">
            <Label className="text-sm font-extrabold text-slate-700 dark:text-slate-200 mb-1 block">Email Address</Label>
            <Input 
              placeholder="name@example.com" 
              classNames={uiInputStyles}
            />
            <FieldError className="text-red-500 text-xs mt-1 font-semibold" />
          </TextField>

          {/* Photo URL */}
          <TextField isRequired name="image" type="url" className="w-full">
            <Label className="text-sm font-extrabold text-slate-700 dark:text-slate-200 mb-1 block">Photo URL</Label>
            <Input 
              placeholder="https://example.com/photo.jpg" 
              classNames={uiInputStyles}
            />
            <FieldError className="text-red-500 text-xs mt-1 font-semibold" />
          </TextField>

          {/* Password */}
          <TextField 
            isRequired 
            name="password" 
            type="password" 
            className="w-full"
            validate={(value) => {
              if (value.length < 6) {
                return "Password must be at least 6 characters long";
              }
              if (!/[A-Z]/.test(value)) {
                return "Password must contain at least one uppercase letter";
              }
              if (!/[a-z]/.test(value)) {
                return "Password must contain at least one lowercase letter";
              }
              return null;
            }}
          >
            <Label className="text-sm font-extrabold text-slate-700 dark:text-slate-200 mb-1 block">Password</Label>
            <Input 
              type="password"
              placeholder="..............."
              classNames={uiInputStyles}
            />
            <FieldError className="text-red-500 text-xs mt-1 font-semibold" />
          </TextField>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold h-12 rounded-xl shadow-md shadow-orange-500/10 mt-2 transition-all duration-300 text-sm"
          >
            Register Now
          </Button>
        </Form>

        {/* Footer Navigation Link */}
        <p className="text-center text-slate-600 dark:text-slate-400 text-sm font-medium">
          Already have an account?{" "}
          <Link 
            href="/login" 
            className="text-orange-500 font-extrabold hover:text-orange-600 dark:hover:text-orange-400 hover:underline transition-colors"
          >
            Login here
          </Link>
        </p>
      </Card>
    </div>
  );
}