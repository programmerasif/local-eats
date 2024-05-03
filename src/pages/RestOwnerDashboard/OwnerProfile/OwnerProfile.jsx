import { Formik, Form, Field } from "formik";
import { useContext, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useAutocomplete } from "../../../providers/AutoComplete/AutoComplete";
import { Autocomplete } from "@react-google-maps/api";
import { AuthContext } from "../../../providers/AuthProviders/AuthProviders";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { showErrorAlert, showSuccessAlert } from "../../../hooks/alert";

export const OwnerProfile = () => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const [demoValues, setDemoValues] = useState({});

  const {
    autocompleteRef,
    handlePlaceSelect,
    isLoaded,
    selectedPlace,
    mapLoading,
  } = useAutocomplete();

  console.log(selectedPlace);

  const { user, number, uploadImage, imgLoading } = useContext(AuthContext);

  const demoUser = "owner";
  const id = user?.uid;

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    try {
      setIsUploading(true);
      const uploadedImageUrl = await uploadImage(file);
      setUploadedImageUrl(uploadedImageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
    }
  };
  console.log(demoValues);

  const submitFormData = async (values) => {
    try {
      const formData = {
        name: values.fullName,
        restaurant_name: values?.restaurantName,
        place_name: selectedPlace?.name,
        ratings: 0,
        email: values?.email,
        uid: user?.uid,
        ownerEmail: user?.email,
        opening_time: "",
        image: user.photoURL || "",
        restaurant_img: uploadedImageUrl,
        phoneNumber: values?.phoneNumber,
        website: values?.website,
        food_items: [],
        location: {
          latitude: selectedPlace?.latitude,
          longitude: selectedPlace?.longitude,
        },
        // location: {
        //   latitude: selectedPlace?.latitude || latitude,
        //   longitude: selectedPlace?.longitude || longitude,
        // },
      };
      setDemoValues(formData);

      // Store form data in localStorage
      localStorage.setItem("formData", JSON.stringify(formData));

      const hasDataPosted = localStorage.getItem("hasDataPosted") === "true";

      let url;
      let method;

      if (hasDataPosted) {
        // If data has been posted before, use PATCH
        method = "PATCH";
        url = `${import.meta.env.VITE_REACT_API}update-restarunt/${id}`;
      } else {
        method = "POST";
        url = `${import.meta.env.VITE_REACT_API}added-new-restarunt`;
      }

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showSuccessAlert("Form data submitted successfully!");
        if (!hasDataPosted) {
          localStorage.setItem("hasDataPosted", "true");
        }
      } else {
        console.error("Error submitting form data:", response.statusText);
        showErrorAlert("Error submitting form data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const loadFormDataFromLocalStorage = () => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      const parsedFormData = JSON.parse(storedFormData);
      setDemoValues(parsedFormData);
    }
  };

  useEffect(() => {
    loadFormDataFromLocalStorage();
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          fullName: user?.displayName,
          email: user?.email,
          phoneNumber: number,
          address: selectedPlace?.name || "",
          restaurantName: "",
        }}
        onSubmit={submitFormData}
      >
        <Form
          // onSubmit={handleFormSubmit}
          className="flex flex-col md:items-start mx-auto md:mx-0 md:justify-start gap-3 w-4/5 md:w-[550px] lg:w-[60%] md:ps-20 pt-8"
        >
          {demoUser ? (
            <div className="bg-white w-full flex items-center justify-between p-4 rounded-md">
              <div className="flex flex-col space-y-1">
                <span className="text-xs">Restaurant Name</span>
                {isEditingEmail ? (
                  <Field
                    className="py-4 pl-8 w-80 md:w-[500px] rounded-lg shadow-lg focus:outline-stone-300 focus:outline-offset-1 text-black"
                    type="text"
                    name="restaurantName"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={demoValues?.restaurant_name}
                    readOnly
                  />
                )}
              </div>
            </div>
          ) : (
            <></>
          )}
          <div className="bg-white w-full flex items-center justify-between p-4 rounded-md">
            <div className="flex flex-col space-y-1">
              <span className="text-xs">Restaurant Email Address</span>
              {isEditingEmail ? (
                <Field
                  className="py-4 pl-8 w-80 md:w-[500px] rounded-lg shadow-lg focus:outline-stone-300 focus:outline-offset-1 text-black"
                  type="email"
                  name="email"
                />
              ) : (
                <input
                  type="text"
                  placeholder={demoValues?.ownerEmail}
                  readOnly
                />
              )}
            </div>
          </div>
          <div className="bg-white w-full flex items-center justify-between p-4 rounded-md">
            <div className="flex flex-col space-y-1">
              <span className="text-xs">Phone Number</span>
              {isEditingEmail ? (
                <Field
                  className="py-4 pl-8 w-80 md:w-[500px] rounded-lg shadow-lg focus:outline-stone-300 focus:outline-offset-1 text-black"
                  type="tel"
                  name="phoneNumber"
                />
              ) : (
                <input
                  type="number"
                  placeholder={demoValues?.phoneNumber}
                  readOnly
                />
              )}
            </div>
          </div>
          <div className="bg-white w-full flex items-center justify-between p-4 rounded-md">
            <div className="flex flex-col space-y-1">
              <span className="text-xs">Website Link</span>
              {isEditingEmail ? (
                <Field
                  className="py-4 pl-8 w-80 md:w-[500px] rounded-lg shadow-lg focus:outline-stone-300 focus:outline-offset-1 text-black"
                  type="website"
                  name="website"
                />
              ) : (
                <input type="text" placeholder={demoValues?.website} readOnly />
              )}
            </div>
          </div>
          <div className="bg-white w-full flex items-center justify-between p-4 rounded-md">
            <div className="flex flex-col space-y-1 w-full">
              <span className="text-xs">Upload Image</span>
              {isEditingEmail ? (
                <div className="flex justify-between items-center">
                  <input
                    type="file"
                    accept="image/*"
                    name="photos"
                    onChange={handleFileUpload}
                  />
                  {isUploading ? (
                    <AiOutlineLoading3Quarters
                      size={24}
                      className="animate-spin text-yellow-400"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <input type="file" readOnly disabled />
              )}
            </div>
          </div>

          {/* This is map field */}
          <div className="bg-white w-full p-4 rounded-md flex flex-col space-y-1">
            <span className="text-xs">Address</span>
            {isEditingEmail ? (
              <div className="flex justify-between items-center">
                {isLoaded && (
                  <Autocomplete
                    onLoad={(autocomplete) =>
                      (autocompleteRef.current = autocomplete)
                    }
                    onPlaceChanged={handlePlaceSelect}
                    libraries={["places"]}
                  >
                    <input
                      className="py-4 pl-8 w-80 md:w-[500px] rounded-lg shadow-lg focus:outline-stone-300 focus:outline-offset-1 text-black"
                      type="address"
                      name="address"
                      placeholder="Search your address"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // Prevent form submission on Enter key press
                        }
                      }}
                    />
                  </Autocomplete>
                )}
                {mapLoading ? (
                  <AiOutlineLoading3Quarters
                    size={24}
                    className="animate-spin text-yellow-400"
                  />
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <input
                type="address"
                name="address"
                readOnly
                className="focus:outline-none font-semibold text-lg"
                placeholder={demoValues?.place_name}
              />
            )}
          </div>
          <div className="flex space-x-4 justify-end border w-full mt-4">
            <button
              type="button"
              className="bg-black hover:bg-opacity-80 hover:scale-95 duration-200 gap-2 px-6 py-2 text-white font-semibold rounded-md flex items-center"
              onClick={() => setIsEditingEmail(!isEditingEmail)}
            >
              Edit
              <CiEdit size={24} />
            </button>
            <button
              className={` ${
                !imgLoading ? "bg-[#FFC153]" : "bg-slate-400"
              } text-white px-6 py-2 font-semibold rounded-md`}
              disabled={!imgLoading ? false : true}
              type="submit"
            >
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
