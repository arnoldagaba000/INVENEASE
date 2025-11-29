import { revalidateLogic, useForm } from "@tanstack/react-form";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/schemas/auth-schema";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "../ui/field";
import { Input } from "../ui/input";
import GoogleIcon from "./google-icon";

const LoginPage = () => {
    const navigate = useNavigate();
    const search = useSearch({ from: "/_auth/login" });

    const form = useForm({
        defaultValues: { email: "", password: "", rememberMe: false },
        onSubmit: async ({ value }) => {
            await authClient.signIn.email(
                {
                    email: value.email,
                    password: value.password,
                    rememberMe: value.rememberMe,
                },
                {
                    onSuccess: (ctx) => {
                        toast.success(`Welcome back, ${ctx.data.user.name}!`);
                        navigate({
                            to: search.redirect ?? "/dashboard",
                            replace: true,
                        });
                    },
                    onError: (ctx) => {
                        toast.error(`${ctx.error.message}`);
                    },
                }
            );
        },
        validators: { onSubmit: loginSchema },
        validationLogic: revalidateLogic({
            mode: "submit",
            modeAfterSubmission: "change",
        }),
    });

    const handleGoogleSignIn = () => {
        authClient.signIn.social({
            provider: "google",
            callbackURL: `${window.location.origin}/dashboard`,
        });
    };

    return (
        <div className="items-center-safe justify-center-safe flex flex-col gap-6 p-4 sm:p-8 md:p-12 lg:p-16">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Welcome back</CardTitle>
                    <CardDescription>
                        Login with your Google account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                    >
                        <FieldGroup>
                            <Field>
                                <Button
                                    onClick={() => handleGoogleSignIn()}
                                    type="button"
                                >
                                    <GoogleIcon />
                                    Login with Google
                                </Button>
                            </Field>

                            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                                Or continue with
                            </FieldSeparator>

                            <form.Field name="email">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;
                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <FieldLabel htmlFor="email">
                                                Email Address
                                            </FieldLabel>
                                            <Input
                                                aria-invalid={isInvalid}
                                                id={field.name}
                                                name={field.name}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your email address"
                                                type="email"
                                                value={field.state.value}
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            <form.Field name="password">
                                {(field) => {
                                    const isInvalid =
                                        field.state.meta.isTouched &&
                                        !field.state.meta.isValid;

                                    return (
                                        <Field data-invalid={isInvalid}>
                                            <div className="flex items-center">
                                                <FieldLabel htmlFor="password">
                                                    Password
                                                </FieldLabel>

                                                <Link
                                                    className="ml-auto text-sm underline-offset-4 hover:underline"
                                                    to="/forgot-password"
                                                >
                                                    Forgot your password?
                                                </Link>
                                            </div>
                                            <Input
                                                aria-invalid={isInvalid}
                                                id={field.name}
                                                name={field.name}
                                                onBlur={field.handleBlur}
                                                onChange={(e) =>
                                                    field.handleChange(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter your password"
                                                type="password"
                                                value={field.state.value}
                                            />
                                            {isInvalid && (
                                                <FieldError
                                                    errors={
                                                        field.state.meta.errors
                                                    }
                                                />
                                            )}
                                        </Field>
                                    );
                                }}
                            </form.Field>

                            <form.Field name="rememberMe">
                                {(field) => (
                                    <div className="flex items-center gap-2">
                                        <Checkbox
                                            checked={Boolean(field.state.value)}
                                            id={field.name}
                                            name={field.name}
                                            onCheckedChange={(val) =>
                                                field.handleChange(Boolean(val))
                                            }
                                        />
                                        <FieldLabel htmlFor={field.name}>
                                            Remember me
                                        </FieldLabel>
                                    </div>
                                )}
                            </form.Field>

                            <form.Subscribe>
                                {(state) => (
                                    <Field>
                                        <Button
                                            disabled={state.isSubmitting}
                                            type="submit"
                                        >
                                            {state.isSubmitting
                                                ? "Logging in..."
                                                : "Login"}
                                        </Button>

                                        <FieldDescription className="text-center">
                                            Don&apos;t have an account?{" "}
                                            <Link to="/register">Sign up</Link>
                                        </FieldDescription>
                                    </Field>
                                )}
                            </form.Subscribe>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginPage;
