import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateuser } from "../../../Endpoints/APIs";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/slices/UserSlice";
import { showError, showSuccess } from "../../../utils/toastUtils";

const ProfileDetailModal = ({ isOpen = true, onClose, user }) => {
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            username: user?.username || "",
            phone_no: user?.phone_no || "",
            date_of_birth: user?.date_of_birth || "",
            gender: user?.gender || "",
        },
        validationSchema: Yup.object({
            username: Yup.string()
                .trim()
                .min(3, "Username must be at least 3 characters")
                .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores are allowed")
                .required("Username is required"),
            phone_no: Yup.string()
                .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
                .required("Phone number is required"),
            date_of_birth: Yup.date()
                .max(new Date(), "Date of birth cannot be in the future")
                .required("Date of birth is required"),
            gender: Yup.string().required("Gender is required"),
        }),
        onSubmit: async(values, { setSubmitting }) => {
            try{

                const changedValues = {};
                for (let key in values) {
                    if (values[key] !== formik.initialValues[key]) {
                      changedValues[key] = values[key];
                    }
                  }
                  if (Object.keys(changedValues).length === 0) {
                    return;
                  }
                
                const response = await updateuser({ "user_id":user.id,...changedValues})
    
                if(response?.data?.success===true){
                    dispatch(setUser(response?.data?.userDetails))
                    showSuccess(response?.data?.message)
                    onClose()
                }
            }
            catch(error){
                const resData = error?.response?.data;

                if (resData?.errors) {
                    const firstErrorKey = Object.keys(resData.errors)[0];
                    const firstErrorMsg = resData.errors[firstErrorKey][0];
                    showError(firstErrorMsg);
                } else if (resData?.message) {
                    showError(resData.message);
                } else {
                    showError("Something went wrong. Please try again.");
                }
            }
            finally {
                setSubmitting(false);
            }
        },
    });

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="fixed inset-0 backdrop-blur-xl bg-opacity-50 transition-opacity"
                onClick={onClose}
            />

            <main className="relative z-50 flex flex-col items-center p-5 w-full">
                <form
                    onSubmit={formik.handleSubmit}
                    className="relative p-10 w-full bg-white rounded-3xl max-w-[653px]"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute right-[18px] top-[18px] w-[24px] h-[24px] cursor-pointer"
                        aria-label="Close"
                        type="button"
                    >
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 25 25"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16.6904 8.10052C16.8868 8.29472 16.8885 8.6113 16.6943 8.80761L8.95839 16.6279C8.76419 16.8242 8.44761 16.8259 8.2513 16.6317L7.54036 15.9284C7.34405 15.7342 7.34233 15.4177 7.53653 15.2213L15.2724 7.40109C15.4666 7.20477 15.7832 7.20306 15.9795 7.39726L16.6904 8.10052Z"
                                fill="black"
                            />
                            <path
                                d="M16.0294 16.5894C15.8352 16.7857 15.5186 16.7874 15.3223 16.5932L7.50202 8.85732C7.30571 8.66312 7.30399 8.34654 7.49819 8.15022L8.20145 7.43929C8.39565 7.24297 8.71223 7.24125 8.90855 7.43546L16.7288 15.1713C16.9251 15.3655 16.9268 15.6821 16.7326 15.8784L16.0294 16.5894Z"
                                fill="black"
                            />
                        </svg>
                    </button>

                    <h1 className="mb-8 text-xl font-bold text-neutral-950">EDIT PROFILE DETAILS</h1>

                    <div className="flex flex-col gap-5">
                        {["username", "phone_no", "gender", "date_of_birth"].map((field) => (
                            <div key={field}>
                                <input
                                    type={field === "date_of_birth" ? "date" : "text"}
                                    name={field}
                                    value={formik.values[field]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder={field.replace("_", " ")}
                                    className={`p-4 w-full text-s font-medium rounded-3xl bg-zinc-300 text-zinc-600 outline-none ${formik.touched[field] && formik.errors[field]
                                            ? "border border-red-500"
                                            : ""
                                        }`}
                                />
                                {formik.touched[field] && formik.errors[field] && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {formik.errors[field]}
                                    </p>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end mt-5">
                            <button
                                type="submit"
                                disabled={formik.isSubmitting}
                                className="px-10 py-2.5 text-xs font-bold text-white uppercase bg-stone-950 rounded-[33px] tracking-[2.1px]"
                                
                            >
                                {formik.isSubmitting ? "Processing..." : "SUBMIT"}
                            </button>
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default ProfileDetailModal;
