"use client";
import React, { useRef, useState } from "react";
import ImageCroper from "./ImageCroper";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/UserSlice";
import toast from "react-hot-toast";
import { updateuser } from "../../../Endpoints/APIs";

const ProfileGovUpload = ({ isOpen, onClose, user }) => {
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState(null);
    const [cropping, setCropping] = useState(false);
    const fileInputRef = useRef(null);
    const [submitting, setSubmitting] = useState(false);

    const dispatch = useDispatch()

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
            setCropping(true);

        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || submitting) return;

        setSubmitting(true);

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "connect_preset");
        formData.append("folder", "connect");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dljqwak5o/image/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();
            if (data) {
                const res = await updateuser({ "user_id": user.user_id, "gov_url": data.secure_url });
                if (res.data?.success === true) {
                    dispatch(setUser(res?.data?.userDetails));
                    toast.success(res?.data?.message);
                    onClose()
                }
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setSubmitting(false);
        }
    };


    if (!isOpen) return null;

    const isImage = file && file.type?.startsWith("image");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-2xl  bg-opacity-50">
            <div className="relative flex flex-col items-center p-6 bg-white rounded-3xl shadow-xl max-w-[653px] w-full mx-4">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-gray-700"
                >
                    &times;
                </button>

                <form
                    className="p-10 w-full bg-white rounded-3xl max-md:p-8 max-sm:p-6"
                    onSubmit={handleSubmit}
                >
                    <h1 className="mb-6 text-xl font-bold leading-6 text-neutral-950 max-sm:text-lg">
                        WHICH DOCUMENT WOULD YOU LIKE TO PROVIDE?
                    </h1>

                    <div className="flex flex-col gap-1 mb-4">
                        <h2 className="text-sm font-bold leading-5 uppercase text-zinc-800 tracking-[2.73px]">
                            id proof
                        </h2>
                    </div>

                    <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        ref={fileInputRef}
                        className="hidden"
                    />

                    <section
                        className="flex justify-center items-center mb-6 w-full rounded-3xl bg-zinc-300 h-[222px] cursor-pointer overflow-hidden"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {!preview ? (
                            <svg
                                width="94"
                                height="96"
                                viewBox="0 0 94 96"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-[94px] h-[95px] transform-[rotate(45.626deg)]"
                            >
                                <path
                                    d="M80.4295 14.669C62.4631 -4.09824 32.8479 -4.35774 14.4151 14.0905C-4.01764 32.5388 -4.39708 62.8181 13.5693 81.5853C31.5357 100.353 61.151 100.612 79.5837 82.1638C98.0165 63.7155 98.3959 33.4362 80.4295 14.669ZM75.2864 19.8164C90.5408 35.7506 90.221 61.264 74.5708 76.9274C58.9205 92.5908 33.9667 92.3721 18.7124 76.4379C3.45811 60.5037 3.77782 34.9903 19.4281 19.3269C35.0784 3.6635 60.0321 3.88215 75.2864 19.8164ZM50.942 24.7955L43.6424 24.7316L43.3964 44.3635L24.1951 44.1952L24.1015 51.6586L43.3028 51.8268L43.0568 71.4588L50.3565 71.5227L50.6025 51.8908L69.8038 52.0591L69.8973 44.5957L50.696 44.4274L50.942 24.7955Z"
                                    fill="white"
                                />
                            </svg>
                        ) : isImage ? (
                            <img src={preview} alt="Preview" className="h-full object-contain" />
                        ) : (
                            <embed src={preview} type="application/pdf" className="w-full h-full" />
                        )}
                    </section>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={submitting || cropping}
                            className={`h-10 text-xs font-bold leading-5 text-white uppercase cursor-pointer bg-stone-950 rounded-[33px] tracking-[2.1px] w-[131px] ${submitting ? "opacity-50 cursor-not-allowed" : ""
                                }`}
                        >
                            {submitting ? "Uploading..." : "Submit"}
                        </button>

                    </div>

                </form>
                {cropping && preview && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black bg-opacity-60 p-4">
                        <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center p-6 gap-4">

                            <button
                                onClick={() => setCropping(false)}
                                className="absolute top-4 right-4 text-gray-500 hover:text-black text-3xl font-bold"
                            >
                                &times;
                            </button>


                            <ImageCroper
                                imageUrl={preview}
                                onComplete={(croppedImageFile) => {
                                    setFile(croppedImageFile);
                                    setPreview(URL.createObjectURL(croppedImageFile));
                                    setCropping(false);
                                }}
                            />


                            <button
                                onClick={() => document.getElementById("crop-done-btn")?.click()}
                                className="mt-4 px-6 py-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all text-sm tracking-wider uppercase"
                            >
                                Crop & Save
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileGovUpload;
