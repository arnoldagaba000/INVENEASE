import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { Button } from "../ui/button";

const LogoutEverywhere = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await authClient.revokeSessions(
            {},
            {
                onSuccess: () => {
                    toast.success("Logged out successfully from all devices");
                    navigate({ to: "/login", replace: true });
                },
                onError: (ctx) => {
                    toast.error(`${ctx.error.message}`);
                },
            }
        );
    };

    return (
        <Button
            className="my-3 w-full"
            onClick={() => handleLogout()}
            variant="destructive"
        >
            Log out everywhere
        </Button>
    );
};

export default LogoutEverywhere;
