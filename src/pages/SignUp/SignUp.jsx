import { Link } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import bgImage from "/src/assets/background.png";
import { AuthContext } from "../../providers/AuthProviders/AuthProviders";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo 1.png";

const SignUp = () => {
  const { createUserWithEmail, googleLogin,} = useContext(AuthContext);
  const navigate = useNavigate();
  
  
  const handledUserCreation = async (values, { setSubmitting, setErrors }) => {
    console.log(values);
    try {
      const userCreateResponse = await createUserWithEmail(
        values.email,
        values.password,
        values.userName,
        values.number
      );

      if (userCreateResponse) {
        setSubmitting(false);
        console.log(userCreateResponse);
        navigate("/");
      } else {
        console.log("Failed to create a User");
      }
    } catch (error) {
      // TODO: A TOAST SAYING A ALERT
      if (error.code === "auth/email-already-in-use") {
        setErrors({ email: "This email is already in use" });
      }
      console.log(error.message, "aktu error kaiso SignUpForm a");
    }
  };

  const handleGoogleLogin = async () => {
    try {
     await googleLogin();
      navigate("/");
      
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  
  return (
    <div
  style={{ backgroundImage: `url(${bgImage})`, minHeight: "100%", height: "auto" }}
  className="bg-no-repeat bg-cover"
>
      <div className="flex gap-2 justify-end pt-6 pr-10">
        <Link
          to="/sign-up"
          className="bg-white duration-300 hover:bg-[#3D83D9] hover:text-white hover:scale-95 hover:trans w-28 py-3 px-[2px] text-[#3D83D9] rounded-2xl font-bold text-center"
        >
          <button>Sign Up</button>
        </Link>
        <Link
          to="/sign-in"
          className="bg-[#3D83D9] hover:bg-white hover:text-[#3D83D9] hover:scale-95 duration-300 w-28 py-3 px-[2px] text-white rounded-2xl font-bold text-center"
        >
          <button>Sign In</button>
        </Link>
      </div>
      <Link to="/">
        <img
          src={logo}
          className="text-white w-40 hover:scale-90 duration-200 absolute top-4 left-4"
        />
      </Link>
      <SignUpForm
        handledUserCreation={handledUserCreation}
        handleGoogleLogin={handleGoogleLogin}
      />
    </div>
  );
};

export default SignUp;
