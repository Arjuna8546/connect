"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { restpassword } from "../../../Endpoints/APIs";
import { useSelector } from "react-redux";

const PasswordChangeModal = ({ isOpen, onClose }) => {
    const user = useSelector(state => (state.user))
    const formik = useFormik({
        initialValues: {
            previousPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            previousPassword: Yup.string().required("Previous password is required"),
            newPassword: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                )
                .required("New password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
                .required("Please confirm your password"),
        }),
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            try {
                console.log(values)
                const response = await restpassword({ ...values, "id": user.user.id })
                if (response?.data?.success === true) {
                    toast.success("Password changed successfully");
                    resetForm();
                    onClose();
                }
            } catch (error) {
                const errorMessage =
                    error?.response?.data?.error || "Failed to change password";
                toast.error(errorMessage);
            } finally {
                setSubmitting(false);
            }
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed py-8 inset-0 z-50 flex items-center justify-center">
            <div className="fixed inset-0 backdrop-blur-2xl" onClick={onClose}></div>
            <div className="flex items-center justify-center p-4 w-full h-screen relative z-10 overflow-auto scrollbar-hide">
                <form
                    onSubmit={formik.handleSubmit}
                    className="relative p-7 w-full bg-white rounded-3xl max-w-[653px] max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        type="button"
                        onClick={onClose}
                        className="absolute right-[18px] top-[18px] w-[24px] h-[24px] cursor-pointer z-50"
                        aria-label="Close modal"
                    >
                        <img src="https://cdn.builder.io/api/v1/image/assets/aadabba814c24e21949a3d066a352728/89e0109ec7a6011e4fc6edacbae612bbbf5ebb7a?placeholderIfAbsent=true" alt="Close" className="w-6 h-6 object-contain" />
                    </button>

                    <h1 className="mb-8 text-xl font-bold text-neutral-950">
                        CHANGE PASSWORD
                    </h1>

                    <div className="flex flex-col gap-5">
                        {[
                            { name: "previousPassword", placeholder: "Previous password" },
                            { name: "newPassword", placeholder: "New - password" },
                            { name: "confirmPassword", placeholder: "Confirm - password" },
                        ].map(({ name, placeholder }) => (
                            <div key={name}>
                                <input
                                    type="password"
                                    name={name}
                                    value={formik.values[name]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={placeholder}
                                    className={`p-4 w-full text-xs font-medium rounded-3xl bg-zinc-300 text-zinc-600 outline-none ${formik.touched[name] && formik.errors[name]
                                            ? "border border-red-500"
                                            : ""
                                        }`}
                                />
                                {formik.touched[name] && formik.errors[name] && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors[name]}
                                    </p>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end mt-5">
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="px-16 py-4 text-xs font-bold text-white uppercase whitespace-nowrap bg-stone-950 rounded-[33px] tracking-[2.1px] hover:bg-stone-800 transition-colors disabled:opacity-70"
                            >
                                {formik.isSubmitting ? "Processing..." : "Submit"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PasswordChangeModal;
