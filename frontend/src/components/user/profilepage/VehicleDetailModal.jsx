"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { registerVehicle } from "../../../Endpoints/APIs";
import { useDispatch } from "react-redux";
import { updateVehicles } from "../../../store/slices/UserSlice";

const VehicleDetailModal = ({ isOpen, onClose, user }) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      vehicle_type: "",
      vehicle_model: "",
      vehicle_color: "",
      vehicle_register_no: "",
      vehicle_bio: "",
    },
    validationSchema: Yup.object({
      vehicle_type: Yup.string().trim().required("Vehicle type is required"),
      vehicle_model: Yup.string().trim().required("Brand & model are required"),
      vehicle_color: Yup.string().trim().required("Color is required"),
      vehicle_register_no: Yup.string()
        .matches(/^[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}$/, "Invalid registration format")
        .required("Registration number is required"),
        vehicle_bio: Yup.string().trim().max(500, "Bio must be under 500 characters"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {

        const response = await registerVehicle({ "user": user.id, ...values })
        if (response?.data?.success === true) {
          toast.success("Vehicle Registered")
          dispatch(updateVehicles(response.data.data))
          onClose()
        }
      }
      catch (error) {
        const resData = error?.response?.data;

        if (resData?.errors) {
          const firstErrorKey = Object.keys(resData.errors)[0];
          const firstErrorMsg = resData.errors[firstErrorKey][0];
          toast.error(firstErrorMsg);
        } else if (resData?.message) {
          toast.error(resData.message);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      }
      finally {
        setSubmitting(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed py-8  inset-0 z-50 flex items-center justify-center">
      <div className="fixed  inset-0 backdrop-blur-2xl" onClick={onClose}></div>
      <div className="flex items-center justify-center p-4 w-full h-screen relative z-10 overflow-auto custom-scroll-hide ">


        <form
          onSubmit={formik.handleSubmit}
          className="relative p-7 w-full bg-white rounded-3xl max-w-[653px] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
             className="absolute right-[18px] top-[18px] w-[24px] h-[24px] cursor-pointer z-50"
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
              { name: "vehicle_model", placeholder: "Vehicle Brand & Model" },
              { name: "vehicle_color", placeholder: "Vehicle Color" },
              {
                name: "vehicle_register_no",
                placeholder: "Vehicle Registration Number",
              },
            ].map(({ name, placeholder }) => (
              <div key={name}>
                {(name === "vehicle_type" || name === "vehicle_color") ? (
                  <select
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`p-4 w-full text-s font-medium rounded-3xl bg-zinc-300 text-zinc-600 outline-none ${formik.touched[name] && formik.errors[name]
                      ? "border border-red-500"
                      : ""
                      }`}
                  >
                    <option value="" disabled>
                      {placeholder}
                    </option>
                    {name === "vehicle_type" ? (
                      <>
                        <option value="sedan">Sedan</option>
                        <option value="SUV">SUV</option>
                        <option value="hatchback">Hatchback</option>
                        <option value="Wagon">Wagon</option>
                        <option value="Minivan">Minivan</option>
                        <option value="Coupe">Coupe</option>
                      </>
                    ) : (
                      <>
                        <option value="Black">Black</option>
                        <option value="White">White</option>
                        <option value="Gray">Gray</option>
                        <option value="Silver">Silver</option>
                        <option value="Blue">Blue</option>
                        <option value="Red">Red</option>
                        <option value="Green">Green</option>
                        <option value="Yellow">Yellow</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    name={name}
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder={placeholder}
                    className={`p-4 w-full text-s font-medium rounded-3xl bg-zinc-300 text-zinc-600 outline-none ${formik.touched[name] && formik.errors[name]
                      ? "border border-red-500"
                      : ""
                      }`}
                  />
                )}
                {formik.touched[name] && formik.errors[name] && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors[name]}</p>
                )}
              </div>
            ))}

            <div>
              <textarea
                name="vehicle_bio"
                value={formik.values.vehicle_bio}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Tell us a little about your vehicle!"
                rows={4}
                className={`p-4 w-full min-h-[181px] text-s font-medium rounded-3xl bg-zinc-300 text-zinc-600 outline-none resize-none ${formik.touched.bio && formik.errors.bio ? "border border-red-500" : ""
                  }`}
              />
              {formik.touched.bio && formik.errors.vehicle_bio && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.vehicle_bio}</p>
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
