"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ForgetPasswordVerifyOtp from "../../../pages/ForgetPasswordVerifyOtp";






const ForgetPasswordForm = ({ handleSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            await handleSubmit(values, setSubmitting, setIsModalOpen)
        },
    });

    return (
        <>
            <form className="flex flex-col gap-5 items-center" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-4 w-full max-w-[393px] max-md:w-full max-md:max-w-full">
                    <div className="flex flex-col items-center text-center w-full">
                        <h1 className="mb-2.5 text-xl font-bold text-stone-300 max-sm:text-lg">
                            Forgot password?
                        </h1>

                        <p className="mb-6 text-xs font-medium max-w-[310px] text-zinc-600 max-sm:text-xs">
                            Don't worry! It happens. Please enter the email associated with your account.
                        </p>
                    </div>

                    <input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`relative px-4 py-0 h-12 text-xs font-bold outline-none placeholder-white  text-white  rounded-2xl bg-neutral-950 tracking-[2.1px] transition-all duration-300 
                    ${formik.touched.email && formik.errors.email
                                ? "border border-red-500 shadow-[0_0_10px_2px_rgba(255,0,0,0.5)]"
                                : "border border-transparent hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
                            }`}
                        placeholder="Email"
                        aria-label="Email input"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-400 text-xs mt-1">{formik.errors.email}</p>
                    )}

                </div>
                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className="px-0 py-3 my-5 text-xs font-bold text-center text-black uppercase bg-white cursor-pointer rounded-[30px] tracking-[2.52px] w-[393px] max-md:w-full max-md:max-w-full transition-all duration-300 hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <span>{formik.isSubmitting ? "Sending Code..." : "SEND CODE"}</span>
                </button>
            </form>
            <ForgetPasswordVerifyOtp
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                email={formik.values.email}
                userDetail={formik.values}
            />
        </>
    );
};

export default ForgetPasswordForm;
