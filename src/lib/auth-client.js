import { createAuthClient } from "better-auth/react";
import { jwtClient } from "better-auth/client/plugins"; 

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://ph-a-9-slots-lib.vercel.app",
  plugins: [jwtClient()],
});

