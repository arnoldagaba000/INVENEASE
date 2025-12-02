import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { updatePasswordSchema } from "@/lib/schemas/auth-schema";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

const PasswordResetForm = () => {
    const form = useForm({
        defaultValues: { currentPassword: "", newPassword: "" },
        onSubmit: async ({ value }) => {
            await authClient.changePassword(
                {
                    currentPassword: value.currentPassword,
                    newPassword: value.newPassword,
                    revokeOtherSessions: true,
                },
                {
                    onSuccess: () => {
                        toast.success("Password changed successfully");
                    },
                    onError: (ctx) => {
                        toast.error(`${ctx.error.message}`);
                    },
                }
            );
        },
        validators: { onSubmit: updatePasswordSchema },
        validationLogic: revalidateLogic({
            mode: "submit",
            modeAfterSubmission: "change",
        }),
    });

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Change Password</CardTitle>
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
                        <form.Field name="currentPassword">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Current Password
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
                                            placeholder="Current Password"
                                            type="password"
                                            value={field.state.value}
                                        />
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Field name="newPassword">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            New Password
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
                                            placeholder="New Password"
                                            type="password"
                                            value={field.state.value}
                                        />
                                        <FieldError
                                            errors={field.state.meta.errors}
                                        />
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Subscribe>
                            {(state) => (
                                <Field>
                                    <Button
                                        disabled={state.isSubmitting}
                                        type="submit"
                                    >
                                        {state.isSubmitting
                                            ? "Updating..."
                                            : "Update password"}
                                    </Button>
                                </Field>
                            )}
                        </form.Subscribe>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
};

export default PasswordResetForm;
