import React, { useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from '../loginpage/Passwordinput';
import { changepassword } from '../../../Endpoints/APIs';
import { useNavigate } from 'react-router-dom';
import { showError, showSuccess } from '../../../utils/toastUtils';


function ChangePasswordForm({ email }) {
    const nav = useNavigate()
    const formik = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .trim()
                .strict(true)
                .min(6, "Password must be at least 6 characters")
                .matches(/^\S.*$/, "Password cannot start with a space")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match")
                .required("Confirm Password is required"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                console.log({ ...values, "email": email })

                const response = await changepassword({ ...values, "email": email })
                if (response?.data?.success === true) {

                    showSuccess(response?.data?.message)
                    nav('/login')
                }
            }
            catch (error) {
                const errorMessage =
                    error?.response?.data?.error || error?.message || "Something went wrong.";
                showError(errorMessage);
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
                    <div className="flex flex-col items-center text-center w-full">
                        <h1 className="mb-2.5 text-xl font-bold text-stone-300 max-sm:text-lg">
                            Change password?
                        </h1>

                        <p className="mb-6 text-xs font-medium max-w-[310px] text-zinc-600 max-sm:text-xs">
                            Please type Something you'll remember.
                        </p>
                    </div>


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
                    {formik.isSubmitting ? 'Changing...' : 'Change Password'}
                </button>
            </form>
        </>
    )
}

export default ChangePasswordForm