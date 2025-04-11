"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "./Passwordinput";
import SocialButton from "../othercomponent/SocialButton";





const LoginForm = ({ handleSubmit }) => {


    const facebookIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3822 3.85413C12.2662 3.85413 11.949 4.34912 11.949 5.44037V7.2415H14.9173L14.6248 10.1592H11.9484V19H8.39625V10.1586H6V7.24094H8.39738V5.49044C8.39738 2.54688 9.5775 1 12.8878 1C13.5982 1 14.4482 1.05625 14.9556 1.12712V3.8665" fill="white"/></svg>`;

    const googleIcon = `<svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_186_1637)"><path d="M18.174 9.71052C18.174 8.93165 18.1121 8.36328 17.9782 7.77386H9.27246V11.2893H14.3825C14.2796 12.1629 13.7232 13.4786 12.4869 14.3627L12.4695 14.4804L15.2221 16.6589L15.4128 16.6784C17.1643 15.0258 18.174 12.5945 18.174 9.71052Z" fill="#FDFDFD"/><path d="M9.27238 18.9729C11.7759 18.9729 13.8776 18.1308 15.4128 16.6783L12.4868 14.3627C11.7038 14.9205 10.6529 15.31 9.27238 15.31C6.82036 15.31 4.73924 13.6575 3.99738 11.3735L3.88864 11.383L1.02644 13.6459L0.989014 13.7522C2.51379 16.8467 5.64581 18.9729 9.27238 18.9729Z" fill="white"/><path d="M3.9974 11.3735C3.80165 10.7841 3.68836 10.1525 3.68836 9.49998C3.68836 8.84736 3.80165 8.21586 3.9871 7.62645L3.98191 7.50092L1.08385 5.2016L0.989033 5.24768C0.360597 6.53179 0 7.9738 0 9.49998C0 11.0262 0.360597 12.4681 0.989033 13.7522L3.9974 11.3735Z" fill="white"/><path d="M9.27238 3.68997C11.0135 3.68997 12.188 4.45832 12.8577 5.10042L15.4746 2.4901C13.8674 0.963925 11.7759 0.0271606 9.27238 0.0271606C5.64581 0.0271606 2.51379 2.15327 0.989014 5.24772L3.98708 7.62649C4.73924 5.34248 6.82036 3.68997 9.27238 3.68997Z" fill="white"/></g><defs><clipPath id="clip0_186_1637"><rect width="18.1739" height="19" rx="9.08696" fill="white"/></clipPath></defs></svg>`;


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .trim()
                .strict(true)
                .min(6, "Password must be at least 6 characters")
                .matches(/^\S.*$/, "Password cannot start with a space")
                .required("Password is required"),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            handleSubmit(values,setSubmitting)
        },
    });

    return (
        <form className="flex flex-col gap-5 items-center" onSubmit={formik.handleSubmit}>
            <div className="flex flex-col gap-4 w-full max-w-[393px] max-md:w-full max-md:max-w-full">

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

                <PasswordInput
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && formik.errors.password}
                />
                <button
                    type="button"
                    className="mt-1.5 text-xs text-right text-gray-400"
                >
                    forget password
                </button>
            </div>

            <div className="flex gap-10 mx-0 my-2 ">
                <SocialButton icon={facebookIcon} label="Facebook" />
                <SocialButton icon={googleIcon} label="google" />
            </div>

            <button
                type="submit"
                className="px-0 py-3 text-xs font-bold text-center text-black uppercase bg-white cursor-pointer rounded-[30px] tracking-[2.52px] w-[393px] max-md:w-full max-md:max-w-full transition-all duration-300 hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
            >
                log in
            </button>


            <p className="mt-3 text-xs text-gray-400">
                Don't have an account?{" "}
                <button type="button" className="uppercase">
                    SIGNUP
                </button>
            </p>
        </form>
    );
};

export default LoginForm;
