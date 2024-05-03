import { useContext } from "react";
import { Link } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { AuthContext } from "../../providers/AuthProviders/AuthProviders";

const RestaurantPagination = () => {
  const { filteredRestaurants, restaurants } = useContext(AuthContext);
  //   const location = useLocation();

  // Determine which set of restaurants to render based on conditions
  const restaurantsToRender =
    // Show default restaurants if both filteredRestaurants and restaurants are falsy
    !filteredRestaurants.length && !restaurants.length
      ? restaurants
      : // Show filteredRestaurants if it exists and restaurants has no items
      filteredRestaurants.length && !restaurants.length
      ? filteredRestaurants
      : // Show restaurants if it exists
        restaurants || [];

  return (
    <div className="bg-slate-200 h-full">
      <div className="grid grid-cols-2 justify-center items-center gap-4 pt-20 w-2/3">
        {restaurantsToRender?.map((restaurant) => (
          <>
            <Link
              to={`/Restaurant/${restaurant._id}`}
              className="bg-white flex flex-col md:flex-row border-b-2 hover:bg-slate-100 hover:scale-105 duration-300 border-black h-full md:h-36 justify-center p-4 md:gap-40 rounded-lg"
            >
              <div className="flex mb-4 md:mb-0 flex-col gap-2 justify-center">
                <h1 className="font-bold">{restaurant?.restaurant_name}</h1>
                <div className="flex gap-2">
                  <h1 className="font-semibold">({restaurant?.ratings})</h1>
                  <p className="text-yellow-300 flex gap-2 items-center">
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                    <IoStar />
                  </p>
                  <h1 className="font-semibold">(50)</h1>
                </div>
                <p className="text-sm font-semibold">
                  {restaurant?.place_name}
                </p>
                <p className="text-sm">{restaurant?.opening_time}</p>
              </div>
              <img
                className="md:w-40 border rounded-md"
                width={1080}
                height={720}
                src={
                  !restaurant?.restaurant_img
                    ? restaurant?.food_items[0]?.photos
                    : restaurant?.restaurant_img
                }
                alt=""
              />
            </Link>
          </>
        ))}
      </div>
    </div>
  );
};
export default RestaurantPagination