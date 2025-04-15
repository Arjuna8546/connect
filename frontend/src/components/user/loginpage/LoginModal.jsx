"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Logo from "../othercomponent/Logo";

const LoginModal = ({ userData, onClose, onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            phone_no: "",
            date_of_birth: "",
        },
        validationSchema: Yup.object({
            phone_no: Yup.string()
                .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
                .required("Phone number is required"),
            date_of_birth: Yup.date()
                .max(new Date(), "Date cannot be in the future")
                .required("Date of birth is required"),
        }),
        onSubmit: (values) => {
            onSubmit({
                ...userData,
                ...values
            });
            onClose();
        },
    });

    return (
        <main className="fixed inset-0 flex items-center justify-center z-50">
            <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&display=swap");
      `}</style>

            <div className="fixed inset-0 bg-black bg-opacity-80" onClick={onClose} />

            <section className="flex relative flex-col items-center rounded-3xl backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 h-[446px] w-[752px] max-md:p-5 max-md:h-auto max-md:w-[90%] max-sm:p-2.5 max-sm:w-full max-sm:h-auto z-10">
                <Logo />

                <h2 className="mt-5 text-xl font-bold text-stone-300 max-md:mt-2.5 max-sm:mt-1.5">
                    Please Provide
                </h2>

                <p className="mt-2.5 text-xs text-center text-zinc-600 max-md:mt-1.5 max-sm:mt-1">
                    Please type Phone number and Date-of-birth it is essential for sign
                    in.
                </p>

                <form
                    className="mt-5 max-md:mt-2.5 max-sm:mt-1.5 w-full flex flex-col items-center"
                    onSubmit={(e) => {
                        e.preventDefault(); 
                        formik.handleSubmit(e);
                    }}
                >
                    <div className="w-[393px] max-w-full">
                        <div className="relative">
                            <div className="flex relative justify-center items-center mt-4 h-12 rounded-2xl bg-stone-950 w-full max-md:mt-2.5 max-sm:mt-1.5">
                                <div
                                    className={`absolute h-12 rounded-2xl backdrop-blur-[21.5px] bg-neutral-900 w-full transition-all duration-300 ${formik.touched.phone && formik.errors.phone
                                        ? "border border-red-500 shadow-[0_0_10px_2px_rgba(255,0,0,0.5)]"
                                        : "border border-transparent hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
                                        }`}
                                />
                                <input
                                    type="tel"
                                    name="phone_no"
                                    value={formik.values.phone_no}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Phone Number"
                                    className="w-full h-full bg-transparent placeholder-white text-white text-xs font-bold uppercase tracking-[2.1px] z-[1] focus:outline-none"
                                />
                            </div>
                            {formik.touched.phone_no && formik.errors.phone_no && (
                                <p className="text-red-400 text-xs mt-1 text-center">
                                    {formik.errors.phone_no}
                                </p>
                            )}
                        </div>

                        <div className="relative">
                            <div className="flex relative justify-center items-center mt-4 h-12 rounded-2xl bg-stone-950 w-full max-md:mt-2.5 max-sm:mt-1.5">
                                <div
                                    className={`absolute h-12 rounded-2xl backdrop-blur-[21.5px] bg-neutral-900 w-full transition-all duration-300 ${formik.touched.dob && formik.errors.dob
                                        ? "border border-red-500 shadow-[0_0_10px_2px_rgba(255,0,0,0.5)]"
                                        : "border border-transparent hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
                                        }`}
                                />
                                <input
                                    type="date"
                                    name="date_of_birth"
                                    value={formik.values.date_of_birth}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full h-full bg-transparent text-white text-xs font-bold uppercase tracking-[2.1px] z-[1] text-center focus:outline-none"
                                />
                            </div>
                            {formik.touched.date_of_birth && formik.errors.date_of_birth && (
                                <p className="text-red-400 text-xs mt-1 text-center">
                                    {formik.errors.date_of_birth}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center mt-8 max-md:mt-5 max-sm:mt-2.5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex relative justify-center items-center h-10 bg-zinc-800 rounded-[30px] px-6 hover:bg-zinc-700 transition-colors"
                        >
                            <span className="text-xs font-bold text-white uppercase tracking-[2.52px] z-[1]">
                                Cancel
                            </span>
                        </button>

                        <button
                            type="submit" 
                            className="flex relative justify-center items-center h-10 bg-white rounded-[30px] px-6 hover:bg-gray-100 transition-colors"
                        >
                            <div className="absolute h-10 bg-white shadow-2xl rounded-[48px] w-full" />
                            <span className="text-xs font-bold text-black uppercase tracking-[2.52px] z-[1]">
                                Sign in
                            </span>
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default LoginModal;
