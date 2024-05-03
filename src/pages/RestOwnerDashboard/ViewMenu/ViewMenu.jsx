import { Link } from "react-router-dom";
import CommonBannar from "../../Restaurant/CommonBannar";
import logo from "../../../assets/logo 1.png";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProviders/AuthProviders";
import { fetchRestaurants } from "../../../hooks/api";
import profile from "../../../assets/profile.png";

export const ViewMenu = () => {
  const { user } = useContext(AuthContext);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedRestaurants = await fetchRestaurants();
        // Filter restaurants based on the ownerEmail matching the logged-in user's email
        const userRestaurants = fetchedRestaurants.filter(
          (restaurant) => restaurant?.ownerEmail === user.email
        );
        setRestaurants(userRestaurants);
      } catch (error) {
        // Handle error here
      }
    };

    fetchData();
  }, [user?.email]);

  return (
    <div className="bgImg justify-center relative items-center">
      <div className="flex justify-between px-8 py-7">
        <div>
          <Link to="/">
            <img
              src={logo}
              className="text-white w-40 hover:scale-90 duration-200"
            />
          </Link>
        </div>
        <div className="mr-5">
          {user?.photoURL ? (
            <Link to={`/rest-profile/${user.uid}`}>
              <img
                className="rounded-full w-14 absolute top-4 right-4 ring-4 hover:scale-95 hover:ring-orange-400 duration-300 ring-white"
                width={1080}
                height={720}
                src={user?.photoURL}
                alt=""
              />
            </Link>
          ) : (
            <Link to={`/rest-profile/${user.uid}`}>
              <img
                src={profile}
                className="rounded-full w-14 ring-4 hover:scale-95 hover:ring-orange-400 duration-300 ring-white"
                width={1080}
                height={720}
                alt="demo"
              />
            </Link>
          )}
        </div>
      </div>
      <div className="bg-[#F5F5F5] w-[65%] h-[82%]  mx-auto  rounded-lg py-10">
        <div>
          {/* banner section */}
          <CommonBannar restaurants={restaurants} />

          <div className="flex justify-center items-center gap-5 mt-5">
            {restaurants.map((restaurant) => (
              <div key={restaurant._id}>
                <div className="grid grid-cols-6 gap-6">
                  {restaurant?.food_items.map((f, index) => (
                    <div key={index} className="drop-shadow-2xl">
                      <div className="flex justify-center items-center gap-2 h-36 bg-white py-2 px-2 rounded-md">
                        <div className="flex flex-col justify-start items-start">
                          <h3 className="text-lg font-semibold">
                            {f?.menuName}
                          </h3>
                          <p className="mt-2 text-gray-600">
                            {f?.personPerPlatter} persons
                          </p>
                          <p className="mt-2 text-[#EA6A12] font-semibold">
                            ${f?.price}
                          </p>
                        </div>
                        <div>
                          <img
                            src={f?.photos}
                            alt=""
                            className="w-[70px] rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
