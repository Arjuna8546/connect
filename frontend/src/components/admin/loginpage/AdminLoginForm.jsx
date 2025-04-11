import { useFormik } from 'formik';
import React from 'react'
import PasswordInput from '../../user/loginpage/Passwordinput';
import * as Yup from "yup";

function AdminLoginForm({handleSubmit}) {

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
            handleSubmit(values, setSubmitting)
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
            </div>
                
            <button
                type="submit"
                className="my-5 px-0 py-4 text-xs font-bold text-center text-black uppercase bg-white cursor-pointer rounded-[30px] tracking-[2.52px] w-[393px] max-md:w-full max-md:max-w-full transition-all duration-300 hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
            >
                log in
            </button>

        </form>
    );
}

export default AdminLoginForm
