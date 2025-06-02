import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from '../loginpage/Passwordinput';
import { register } from '../../../Endpoints/APIs';

import VerificationCodeModal from '../../../pages/VerificationCodeModal';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../../utils/toastUtils';


function SignupForm() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const nav = useNavigate()

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            date_of_birth: "",
            phone_no: "",
            password: "",
            confirmPassword: "",
            gender: "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .trim()
                .strict(true)
                .min(3, "Username must be at least 3 characters")
                .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores are allowed")
                .required("Username is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            phone_no: Yup.string()
                .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
                .required("Phone number is required"),
            date_of_birth: Yup.date()
                .max(new Date(), "Date of birth cannot be in the future")
                .required("Date of birth is required"),
            password: Yup.string()
                .trim()
                .strict(true)
                .min(6, "Password must be at least 6 characters")
                .matches(/^\S.*$/, "Password cannot start with a space")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
            gender: Yup.string().required("Gender is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                const { confirmPassword, ...filteredValues } = values;

                const response = await register(filteredValues)
                if (response?.data?.success === true) {

                    showSuccess(response?.data?.message)

                    setIsModalOpen(true);

                }
            }
            catch (error) {
                const resData = error?.response?.data;

                if (resData?.message) {
                    showError(resData.message);
                }

                else if (resData?.errors) {
                    const firstErrorKey = Object.keys(resData.errors)[0];
                    const firstErrorMsg = resData.errors[firstErrorKey][0];
                   showError(firstErrorMsg);
                } else {
                    showError("Something went wrong. Please try again.");
                }
            }
            finally {
                setSubmitting(false);
            }

        },
    });
    return (
        <>
            <form className="flex flex-col gap-5 items-center" onSubmit={formik.handleSubmit}>
                <div className="flex flex-col gap-4 w-full max-w-[393px] max-md:w-full max-md:max-w-full">

                    <input
                        type="text"
                        name="username"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`relative px-4 py-0 h-12 text-xs font-bold outline-none placeholder-white text-white  rounded-2xl bg-neutral-950 tracking-[2.1px] transition-all duration-300 
                    ${formik.touched.username && formik.errors.username
                                ? "border border-red-500 shadow-[0_0_10px_2px_rgba(255,0,0,0.5)]"
                                : "border border-transparent hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
                            }`}
                        placeholder="username"
                        aria-label="username input"
                    />
                    {formik.touched.username && formik.errors.username && (
                        <p className="text-red-400 text-xs mt-1">{formik.errors.username}</p>
                    )}

                    <input
                        type="text"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`relative px-4 py-0 h-12 text-xs font-bold outline-none placeholder-white text-white  rounded-2xl bg-neutral-950 tracking-[2.1px] transition-all duration-300 
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

                    <input
                        type="text"
                        name="phone_no"
                        value={formik.values.phone_no}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`relative px-4 py-0 h-12 text-xs font-bold outline-none placeholder-white text-white  rounded-2xl bg-neutral-950 tracking-[2.1px] transition-all duration-300 
                    ${formik.touched.phone_no && formik.errors.phone_no
                                ? "border border-red-500 shadow-[0_0_10px_2px_rgba(255,0,0,0.5)]"
                                : "border border-transparent hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
                            }`}
                        placeholder="phone_no"
                        aria-label="phone no input"
                    />
                    {formik.touched.phone_no && formik.errors.phone_no && (
                        <p className="text-red-400 text-xs mt-1">{formik.errors.phone_no}</p>
                    )}
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formik.values.date_of_birth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`relative px-4 py-0 h-12 text-xs font-bold outline-none placeholder-white text-white rounded-2xl bg-neutral-950 tracking-[2.1px] transition-all duration-300 
                    ${formik.touched.date_of_birth && formik.errors.date_of_birth
                                ? "border border-red-500 shadow-[0_0_10px_2px_rgba(255,0,0,0.5)]"
                                : "border border-transparent hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
                            }`}
                        placeholder="Date of Birth"
                        aria-label="DOB input"
                    />

                    {formik.touched.date_of_birth && formik.errors.date_of_birth && (
                        <p className="text-red-400 text-xs mt-1">{formik.errors.date_of_birth}</p>
                    )}

                    <select
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={`relative px-4 py-0 h-12 text-xs font-bold outline-none text-white rounded-2xl bg-neutral-950 tracking-[2.1px] transition-all duration-300 
                        ${formik.touched.gender && formik.errors.gender
                                ? "border border-red-500 shadow-[0_0_10px_2px_rgba(255,0,0,0.5)]"
                                : "border border-transparent hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
                            }`}
                        aria-label="Gender select"
                    >
                        <option value="" disabled>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && (
                        <p className="text-red-400 text-xs mt-1">{formik.errors.gender}</p>
                    )}


                    <PasswordInput
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && formik.errors.password}
                    />
                    <PasswordInput
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                    />

                </div>


                <button
                    type="submit"
                    disabled={formik.isSubmitting}
                    className={`mx-4 px-0 py-4 text-xs font-bold text-center text-black uppercase bg-white cursor-pointer rounded-[30px] tracking-[2.52px] w-[393px] max-md:w-full max-md:max-w-full transition-all duration-300 ${formik.isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
                        }`}
                >
                    {formik.isSubmitting ? "Processing..." : "Sign up"}
                </button>



                <p className="mt-3 text-xs text-gray-400">
                    Already have an account?{" "}
                    <button type="button" className="uppercase" onClick={()=>nav('/login')}>
                        LOGIN
                    </button>
                </p>
            </form>
            <VerificationCodeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                email={formik.values.email}
                userDetail={formik.values}
            />
        </>
    )
}

export default SignupForm
