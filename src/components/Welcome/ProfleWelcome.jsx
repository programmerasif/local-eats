import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders/AuthProviders";

const ProfileWelcome = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex justify-center w-11/12 container">
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center font-semibold">
          <h1 className="mb-4 text-2xl lg:text-4xl">
            Welcome <span className="text-orange-400 uppercase">{user?.displayName}</span>
          </h1>
          <p className="lg:text-lg">Click on the option to Navigate..</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileWelcome;
