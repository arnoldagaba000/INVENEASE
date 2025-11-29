import type { auth } from "@INVENEASE/auth";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: import.meta.env.VITE_SERVER_URL,
    plugins: [inferAdditionalFields<typeof auth>()],
});

export type Session = typeof auth.$Infer.Session.session;
export type User = typeof auth.$Infer.Session.user;
