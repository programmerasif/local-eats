import logo from "/src/assets/logo 1.png";
import searchIcon from "/src/assets/search.svg";
import fidget from "/src/assets/fidget.svg";
import "./home.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders/AuthProviders";
import { Link } from "react-router-dom";
import Location from "./Location";
import { LogOut } from "../../components/LogOut/LogOut";
import { Autocomplete } from "@react-google-maps/api";
import { useAutocomplete } from "../../providers/AutoComplete/AutoComplete";
import { filterRestaurantsByDistance } from "../../hooks/useFilterResturants";
import { fetchRestaurants } from "../../hooks/api";

export const Home = () => {
  const { logOut, user, filteredRestaurants } = useContext(AuthContext);
  const {
    autocompleteRef,
    handlePlaceSelect,
    isLoaded,
    selectedPlace,
    mapLoading,
  } = useAutocomplete();

  const [filteredRestaurantsState, setFilteredRestaurantsState] = useState(filteredRestaurants || []);


  const fetchAndFilterRestaurants = async () => {
    try {
      // Fetch restaurants
      const restaurants = await fetchRestaurants();


      // Filter restaurants
      const filtered = filterRestaurantsByDistance(
        restaurants,
        selectedPlace.latitude,
        selectedPlace.longitude,
        1
      );
      
      setFilteredRestaurantsState(filtered);
    } catch (error) {
      console.error("Error fetching and filtering restaurants:", error);
    }
  };


  useEffect(() => {
    if (selectedPlace?.latitude && selectedPlace?.longitude) {
      fetchAndFilterRestaurants();
    }
  }, [selectedPlace]);


  return (
    <>
      <div className="cvrImg">
        <div className="flex gap-2 justify-end pt-6 pr-10">
          {user ? (
            <>
              <LogOut logOut={logOut} />
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
        <figure className="flex justify-center mb-8 items-center mt-4">
          <img className="w-52 md:w-96" src={logo} alt="" />
        </figure>
        <h1 className="font-roboto font-base text-center text-white text-3xl md:text-5xl">
          Your Nearby Restaurant
        </h1>
        <div className="flex gap-4 items-center justify-center mt-8">
          {isLoaded ? (
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
              onPlaceChanged={handlePlaceSelect}
              libraries={["places"]}
            >
              <input
                type="text"
                placeholder="Search Nearby Restaurant"
                className="py-4 px-6 md:pl-8 md:w-[500px] rounded-lg shadow-lg focus:outline-blue-500 focus:outline-offset-1 text-black"
              />
            </Autocomplete>
          ) : (
            <input
              type="text"
              placeholder="Search Nearby Restaurant"
              className="py-4 pl-8 w-80 lg:w-[500px] rounded-lg shadow-lg focus:outline-stone-300 focus:outline-offset-1 text-black"
            />
          )}
          <button
            onClick={fetchAndFilterRestaurants}
            className="bg-[#3D83D9] hover:bg-blue-500 hover:scale-95 duration-300 p-1 w-14 rounded-lg"
          >
            {!mapLoading ? (
              <img
                className="rounded-lg"
                width={1080}
                height={720}
                src={searchIcon}
                alt=""
              />
            ) : (
              <img
                className="rounded-lg animate-spin"
                width={1080}
                height={720}
                src={fidget}
                alt=""
              />
            )}
          </button>
        </div>
        <Location
          selectedPlace={selectedPlace}
          filteredRestaurantsState={filteredRestaurantsState}
        />
      </div>
    </>
  );
};
