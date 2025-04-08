"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const VehicleDetailModal = ({ isOpen, onClose, user }) => {
  const formik = useFormik({
    initialValues: {
      vehicle_type: "",
      brand_model: "",
      color: "",
      registration_number: "",
      bio: "",
    },
    validationSchema: Yup.object({
      vehicle_type: Yup.string().trim().required("Vehicle type is required"),
      brand_model: Yup.string().trim().required("Brand & model are required"),
      color: Yup.string().trim().required("Color is required"),
      registration_number: Yup.string()
        .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/, "Invalid registration format")
        .required("Registration number is required"),
      bio: Yup.string().trim().max(500, "Bio must be under 500 characters"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      console.log(values)
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="flex flex-col items-center p-5 w-full min-h-screen relative z-10">
        <form
          onSubmit={formik.handleSubmit}
          className="relative p-10 w-full bg-white rounded-3xl max-w-[653px]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-[18px] top-[18px] w-[24px] h-[24px] cursor-pointer"
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

          <h1 className="mb-8 text-xl font-bold text-neutral-950">
            ADD VEHICLE DETAIL
          </h1>

          <div className="flex flex-col gap-5">
            {[
              { name: "vehicle_type", placeholder: "Vehicle Type" },
              { name: "brand_model", placeholder: "Vehicle Brand & Model" },
              { name: "color", placeholder: "Vehicle Color" },
              {
                name: "registration_number",
                placeholder: "Vehicle Registration Number",
              },
            ].map(({ name, placeholder }) => (
              <div key={name}>
                <input
                  name={name}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder={placeholder}
                  className={`p-4 w-full text-s font-medium rounded-3xl bg-zinc-300 text-zinc-600 outline-none ${
                    formik.touched[name] && formik.errors[name]
                      ? "border border-red-500"
                      : ""
                  }`}
                />
                {formik.touched[name] && formik.errors[name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors[name]}
                  </p>
                )}
              </div>
            ))}

            <div>
              <textarea
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Tell us a little about your vehicle!"
                rows={4}
                className={`p-4 w-full min-h-[181px] text-s font-medium rounded-3xl bg-zinc-300 text-zinc-600 outline-none resize-none ${
                  formik.touched.bio && formik.errors.bio
                    ? "border border-red-500"
                    : ""
                }`}
              />
              {formik.touched.bio && formik.errors.bio && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.bio}</p>
              )}
            </div>

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
      </div>
    </div>
  );
};

export default VehicleDetailModal;
