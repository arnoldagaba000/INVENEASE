import { createFileRoute } from "@tanstack/react-router";
import LoginPage from "@/components/auth/LoginPage";

export const Route = createFileRoute("/login")({
    component: Login,
});

function Login() {
    return <LoginPage />;
}