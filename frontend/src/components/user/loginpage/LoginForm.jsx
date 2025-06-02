"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PasswordInput from "./Passwordinput";
// import SocialButton from "../othercomponent/SocialButton";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode"; 
import LoginModal from "./LoginModal";
import { checkgoogle, getVehicles, google } from "../../../Endpoints/APIs";
import { useDispatch } from "react-redux";
import { setUser, setVehicles } from "../../../store/slices/UserSlice";
import { showError, showSuccess } from "../../../utils/toastUtils";


const LoginForm = ({ handleSubmit,loading }) => {

    const nav = useNavigate()

    const dispatch = useDispatch()

    const facebookIcon = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.3822 3.85413C12.2662 3.85413 11.949 4.34912 11.949 5.44037V7.2415H14.9173L14.6248 10.1592H11.9484V19H8.39625V10.1586H6V7.24094H8.39738V5.49044C8.39738 2.54688 9.5775 1 12.8878 1C13.5982 1 14.4482 1.05625 14.9556 1.12712V3.8665" fill="white"/></svg>`;

    const [googleUserData, setGoogleUserData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleSuccess = async (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        const userData = {
            email: decoded.email,
            username: decoded.name,
            profile_url: decoded.picture,
        };
    
        try {
            const checkRes = await checkgoogle({"email":userData.email});
    
            if (checkRes.data.user_exists) {
                const res = await google(userData);
                const userDetails = res.data.userDetails;
                dispatch(setUser(userDetails));
    
                const vehicles = await getVehicles(userDetails.id);
                if (vehicles?.data?.success === true) {
                    dispatch(setVehicles(vehicles.data.vehicles));
                    showSuccess(`${userDetails.username} login successful`);
                    localStorage.setItem("user_id",userDetails.id)
                    nav("/");
                }
            } else {
                setGoogleUserData(userData);
                setShowModal(true);
            }
        } catch (error) {
            console.error("Google login/signup failed:", error);
        }
    };
    const handleGoogleSubmit = async (fullUserData) => {
        try {
            const res = await google(fullUserData);
            
            if (res?.data?.success) {
              showSuccess("Sign up successful!");
            } else {
              showError(res?.data?.message || "Sign up failed!");
            }    
          } catch (error) {

            if (error?.response?.data?.message) {
              showError(error.response.data.message);
            } else {
              showError("Something went wrong. Please try again!");
            }
          }
        }
    
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
            await handleSubmit(values, setSubmitting)
        },
    });

    return (
        <div>
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
                        onClick={() => nav('/forgotpassword')}
                        className="mt-1.5 text-xs text-right text-gray-400"
                    >
                        forget password
                    </button>
                </div>
                <div className="flex gap-10 mx-0 my-2 ">
                    {/* <SocialButton icon={facebookIcon} label="Facebook" /> */}
                    <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Failed')}></GoogleLogin>
                </div>
                <button
                     type="submit"
                     disabled={loading}
                    className="px-0 py-3 text-xs font-bold text-center text-black uppercase bg-white cursor-pointer rounded-[30px] tracking-[2.52px] w-[393px] max-md:w-full max-md:max-w-full transition-all duration-300 hover:shadow-[0_0_15px_4px_rgba(255,255,255,0.2)]"
                >
                    {loading ? "Logging..." : "Login"}
                </button>
                <p className="mt-3 text-xs text-gray-400">
                    Don't have an account?{" "}
                    <button type="button" className="uppercase" onClick={() => nav('/signup')} >
                        SIGNUP
                    </button>
                </p>
            </form>
                        {showModal && (
                            <LoginModal
                                userData={googleUserData}
                                onClose={() => setShowModal(false)}
                                onSubmit={handleGoogleSubmit}
                            />
                        )}
        </div>
    );
};

export default LoginForm;
