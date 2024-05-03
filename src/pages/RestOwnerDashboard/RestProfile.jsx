import BannerSecrion from "./BannerSecrion";
import { Outlet, useLocation, useParams } from "react-router-dom";
import Drawer from "../../components/Drawer/Drawer";
import { EditProfile } from "./EditProfile/EditProfile";
import ProfileWelcome from "../../components/Welcome/ProfleWelcome";


const RestProfile = () => {
  const location = useLocation();
  const {id} = useParams()


  return (
    <>
      <div className="bg-slate-200 min-h-screen">
        <BannerSecrion />
        <div className="flex ">
          <Drawer />
          {
            location.pathname == `/rest-profile/${id}` ? <ProfileWelcome />  : <Outlet id={id} />
          }
        </div>
      </div>
    </>
  );
};


export default RestProfile;
