import { revalidateLogic, useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { XIcon } from "lucide-react";
import { useRef } from "react"; // 1. Import useRef
import { toast } from "sonner";
import { authClient, type User } from "@/lib/auth-client";
import { updateProflieSchema } from "@/lib/schemas/auth-schema";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { UserAvatar } from "./user-avatar";

type Props = {
    user: User;
};

const ProfileDetailsForm = ({ user }: Props) => {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const form = useForm({
        defaultValues: { name: user.name ?? "", image: user.image ?? "" },
        onSubmit: async ({ value }) => {
            await authClient.updateUser(
                {
                    image: value.image,
                    name: value.name,
                },
                {
                    onSuccess: () => {
                        toast.success("Profile updated successfully");
                        router.invalidate();
                    },
                    onError: (ctx) => {
                        toast.error(`${ctx.error.message}`);
                    },
                }
            );
        },
        validators: { onSubmit: updateProflieSchema },
        validationLogic: revalidateLogic({
            mode: "submit",
            modeAfterSubmission: "change",
        }),
    });

    function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result as string;
                form.setFieldValue("image", base64);
            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Profile Details</CardTitle>
            </CardHeader>

            <CardContent>
                <form
                    className="grid gap-4"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        {/* NAME FIELD */}
                        <form.Field name="name">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Full name
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
                                            placeholder="Enter your full name"
                                            type="text"
                                            value={field.state.value}
                                        />

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        {/* IMAGE FIELD */}
                        <form.Field name="image">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched &&
                                    !field.state.meta.isValid;

                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>
                                            Profile image
                                        </FieldLabel>

                                        <Input
                                            accept="image/*"
                                            aria-invalid={isInvalid}
                                            id={field.name}
                                            name={field.name}
                                            onBlur={field.handleBlur}
                                            onChange={handleImageChange}
                                            ref={fileInputRef}
                                            type="file"
                                        />

                                        {/* Image Preview Area */}
                                        {field.state.value && (
                                            <div className="relative mt-2 size-16">
                                                <UserAvatar
                                                    className="size-16"
                                                    image={field.state.value}
                                                    name={form.getFieldValue(
                                                        "name"
                                                    )}
                                                />
                                                <Button
                                                    aria-label="Remove image"
                                                    className="-top-2 -right-2 absolute size-6 rounded-full"
                                                    onClick={() => {
                                                        field.handleChange("");
                                                        if (
                                                            fileInputRef.current
                                                        ) {
                                                            fileInputRef.current.value =
                                                                "";
                                                        }
                                                    }}
                                                    type="button"
                                                    variant="ghost"
                                                >
                                                    <XIcon className="size-4" />
                                                </Button>
                                            </div>
                                        )}

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                            />
                                        )}
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
                                            ? "Saving..."
                                            : "Save changes"}
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

export default ProfileDetailsForm;
