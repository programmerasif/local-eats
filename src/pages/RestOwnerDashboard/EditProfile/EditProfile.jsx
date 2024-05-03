import { Formik, Form, Field } from "formik";
import { useContext, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useAutocomplete } from "../../../providers/AutoComplete/AutoComplete";
import { Autocomplete } from "@react-google-maps/api";
import { AuthContext } from "../../../providers/AuthProviders/AuthProviders";
import { showErrorAlert, showSuccessAlert } from "../../../hooks/alert";



export const EditProfile = () => {
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  const { autocompleteRef, handlePlaceSelect, isLoaded, selectedPlace } =
    useAutocomplete();

  const { user, number, imageUrl, update, updateImage} = useContext(AuthContext);

  const submitFormData = async (values) => {
    await update(values?.fullName);
    await updateImage(imageUrl);
  
    try {
      const formData = {
        name: values.fullName,
        place_name: selectedPlace?.name,
        email: user?.email,
        uid: user?.uid,
        displayPhoto: imageUrl || user?.displayPhoto,
        phNumber: values?.phoneNumber,
        location: {
          latitude: selectedPlace?.latitude,
          longitude: selectedPlace?.longitude,
          address: selectedPlace?.name,
        },
      };
  
      console.log(formData);
  
      const url = `${import.meta.env.VITE_REACT_API}user-update/${user.uid}`;
      const method = "PATCH";
  
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log("Form data submitted successfully!");
        console.log(response);
        showSuccessAlert("Form data submitted successfully!");
      } else {
        console.error("Error submitting form data:", response.statusText);
        showErrorAlert("Error submitting form data!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <>
      <Formik
        initialValues={{
          fullName: user?.displayName,
          email: user?.email,
          phoneNumber: number,
          address: selectedPlace?.name || "",
        }}
        onSubmit={submitFormData}
      >
        <Form className="flex flex-col md:items-start mx-auto md:mx-0 md:justify-start gap-3 w-4/5 md:w-[550px] lg:w-[60%] md:ps-20 pt-8">
          <div className="bg-white w-full flex items-center justify-between p-4 rounded-md">
            <div className="flex flex-col space-y-1">
              <span className="text-xs">User Name</span>
              {isEditingEmail ? (
                <Field
                  className="py-4 pl-8 w-80 md:w-[500px] rounded-lg shadow-lg focus:outline-stone-300 focus:outline-offset-1 text-black"
                  type="text"
                  name="fullName"
                />
              ) : (
                <h3 className="text-xl font-semibold">{user?.displayName}</h3>
              )}
            </div>
          </div>
          <div className="bg-white w-full flex items-center justify-between p-4 rounded-md">
            <div className="flex flex-col space-y-1">
              <span className="text-xs">Email Address</span>
              {isEditingEmail ? (
                <Field
                  className="py-4 pl-8 w-80 md:w-[500px] rounded-lg shadow-lg focus:outline-none text-black"
                  type="email"
                  name="email"
                  readOnly
                />
              ) : (
                <h3 className="text-xl font-semibold">{user?.email}</h3>
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
                <h3 className="text-xl font-semibold">
                  {number ? number : "12345"}
                </h3>
              )}
            </div>
          </div>
          <div className="bg-white w-full p-4 rounded-md flex flex-col space-y-1">
            <span className="text-xs">Address</span>
            {isEditingEmail ? (
              <>
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
              </>
            ) : (
              <input
                type="address"
                name="address"
                readOnly
                // placeholder='Add Your Location'
                placeholder={`${
                  selectedPlace ? selectedPlace.name : "Add your location"
                }`}
                className="focus:outline-none font-semibold text-lg"
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
              type="submit"
              className="bg-[#FFC153] px-6 py-2 duration-200 text-white font-semibold hover:bg-opacity-80 hover:scale-95 rounded-md"
            >
              Update
            </button>
          </div>
        </Form>
      </Formik>
    </>
  );
};
