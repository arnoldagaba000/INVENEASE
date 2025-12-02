import { createFileRoute } from "@tanstack/react-router";
import PasswordResetForm from "@/components/profile/password-reset-form";
import ProfileDetailsForm from "@/components/profile/profile-details-form";
import { authClient } from "@/lib/auth-client";

export const Route = createFileRoute("/_protected/profile")({
    component: Profile,
});

function Profile() {
    const session = authClient.useSession();
    const user = session.data?.user;

    if (!user) {
        return null;
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="">
                <h1 className="font-semibold text-2xl">Profile</h1>
                <p className="text-muted-foreground">
                    Update your account details, email, and password.
                </p>
            </div>

            <div className="flex flex-col gap-6 lg:flex-row">
                <ProfileDetailsForm user={user} />
                <PasswordResetForm />
            </div>
        </div>
    );
}
