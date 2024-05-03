import { Field, Formik } from "formik";
import { GrGoogle } from "react-icons/gr";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

const SignUpForm = ({ handledUserCreation, handleGoogleLogin }) => {
  return (
    <div className="flex items-center w-full justify-center font-roboto mt-7 lg:mt-0">
      <div className="bg-[#3D83D9] bg-opacity-70 p-8 border w-11/12 md:w-1/2 xl:w-3/12 rounded-md">
        <div className="flex justify-between text-white items-center w-full mb-5">
          <h1 className="font-bold text-2xl">Sign up</h1>
          <button className="border border-white w-10 flex justify-center items-center h-10 rounded-full">
            <IoClose size={28} />
          </button>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="border gap-3 flex items-center text-white justify-center w-full border-gray-300 bg-transparent rounded-md py-3 px-4 focus:outline-none hover:bg-white hover:text-[#3D83D9] duration-200 hover:border-blue-600"
        >
          <GrGoogle size={24} />
          <h1 className="font-bold text-xl">Log in with Google</h1>
        </button>
        <Formik
          initialValues={{ userName: "", email: "", password: "", number: "" }}
          onSubmit={handledUserCreation}
        >
          {({ errors, touched, handleSubmit, isSubmitting }) => (
            <div>
              <div>
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <div className="mb-5 flex flex-col gap-3 items-start text-white">
                    <h1 className="font-bold mx-auto text-xl mt-4">
                      Register Using Email Address
                    </h1>
                  </div>
                  <div className="mb-5 flex flex-col gap-3 items-start text-white">
                    <h1 className="font-bold text-xl border-t w-full pt-4">
                      Name
                    </h1>
                    <Field
                      className="border w-full border-gray-300 bg-transparent rounded-md py-4 px-4 focus:outline-none focus:border-white font-roboto"
                      type="text"
                      name="userName"
                      placeholder="Enter Your Full Name"
                    />
                  </div>
                  <div className="mb-5 flex flex-col gap-3 items-start text-white font-roboto">
                    <h1 className="font-bold text-xl">Email</h1>
                    <Field
                      className="border w-full border-gray-300 bg-transparent rounded-md py-4 px-4 focus:outline-none focus:border-white"
                      type="email"
                      name="email"
                      placeholder="Enter Your Email Address"
                    />
                  </div>
                  {errors.email && touched.email && errors.email}
                  <div className="mb-5 flex flex-col gap-3 items-start text-white">
                    <h1 className="font-bold text-xl text-white">Password</h1>
                    <Field
                      className="border w-full border-gray-300 bg-transparent rounded-md py-4 px-4 focus:outline-none focus:border-white"
                      type="password"
                      name="password"
                      placeholder="At least 8 characters"
                    />
                  </div>
                  {errors.password && touched.password && errors.password}
                  <div className="mb-5 flex flex-col gap-3 items-start text-white">
                    <h1 className="font-bold text-xl text-white">
                      Phone Number
                    </h1>
                    <Field
                      className="border w-full border-gray-300 bg-transparent rounded-md py-4 px-4 focus:outline-none focus:border-white"
                      type="tel"
                      name="number"
                      placeholder="+1234567"
                    />
                  </div>
                  <button
                    className="bg-[#0286F7] rounded-md text-white py-4 font-bold text-xl font-roboto"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Sign Up
                  </button>
                </form>
                <div className="border-[1px] border-white mt-5 mb-5"></div>
                <h1 className="font-semibold font-roboto text-2xl text-center text-white mb-5">
                  Already have an account?
                </h1>
                <Link
                  to="/sign-in"
                  className="font-semibold text-2xl font-roboto flex justify-center items-center text-[#0286F7]"
                >
                  Log in
                </Link>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpForm;
