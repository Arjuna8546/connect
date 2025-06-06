"use client";
import React, { useState } from "react";
import Logo from "../components/user/othercomponent/Logo";
import LoginForm from "../components/user/loginpage/LoginForm";
import { getVehicles, login } from "../Endpoints/APIs";
import { useDispatch } from "react-redux";
import { setUser, setVehicles } from "../store/slices/UserSlice";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "../utils/toastUtils";



const LoginPage = () => {
    const dispatch=useDispatch()
    const nav=useNavigate()
    const [loading,setLoading] = useState(false)

    const handleLogin = async(values,setSubmitting) => {
        setLoading(true)
        try {
            const response = await login(values)
            if (response?.data?.success === true) {
                dispatch(setUser(response.data.userDetails))
                const vehicles = await getVehicles(response.data.userDetails.id)
                if (vehicles?.data?.success === true) {
                    dispatch(setVehicles(vehicles.data.vehicles))
                    showSuccess(`${response.data.userDetails.username} login successfull`)
                    localStorage.setItem("user_id",response.data.userDetails.id)
                    nav("/")
                }
            }
        }
        catch (error) {
            showSuccess(
                error?.response?.data?.message || "Something went wrong. Please try again."
            );
        }
        finally {
             setSubmitting(false);
             setLoading(false);
        }
    }
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
            />
            <main className="flex relative justify-center items-center min-h-screen bg-black">
                <div className="absolute top-0 left-0 size-full">
                    <img
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/914639483d72de4f057d70949083a6bc54bbb9e3"
                        alt=""
                        className="object-cover opacity-10 size-full"
                    />
                </div>
                <section className="relative p-10 rounded-3xl backdrop-blur-[7.5px] bg-zinc-900 bg-opacity-50 w-[752px] max-md:p-8 max-md:max-w-[600px] max-md:w-[90%] max-sm:p-5">
                    <Logo />
                    <LoginForm handleSubmit={handleLogin} loading={loading} setLoading={setLoading}/>
                </section>
            </main>
        </>
    );
};

export default LoginPage;
