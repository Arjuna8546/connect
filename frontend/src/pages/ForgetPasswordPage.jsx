"use client";
import React from "react";
import Logo from "../components/user/othercomponent/Logo";
import ForgetPasswordForm from "../components/user/forgetpassword/ForgetPasswordForm";
import { forgetpassword } from "../Endpoints/APIs";
import { showError, showSuccess } from "../utils/toastUtils";


const ForgetPasswordPage = () => {

    const handleLogin = async(values,setSubmitting,setIsModalOpen) => {
        try {
            const response = await forgetpassword(values)
             if (response?.data?.success === true) {
                    showSuccess(response.data.message)
                    setIsModalOpen(true)
                 }
        }
        catch (error) {
            showError(
                error?.response?.data?.error || "Something went wrong. Please try again."
            );
        }
        finally {
            setSubmitting(false);
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
                    <ForgetPasswordForm handleSubmit={handleLogin}/>
                </section>
            </main>
        </>
    );
};

export default ForgetPasswordPage;