import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Menue = () => {
  const { id } = useParams();
  const [restaurants, setRestaurants] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_API}single-restaurant/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch restaurants");
        }
        return response.json();
      })
      .then((data) => {
        setRestaurants(data);
      })
      .catch((error) => {
        console.error("Error fetching restaurants:", error);
      });
  }, [id]);

  const itemsPerPage = 6;

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = restaurants?.food_items?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Total number of pages
  const totalPages = Math.ceil(
    (restaurants?.food_items?.length || 0) / itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="">
      <h5
        className={`text-3xl mb-5 mt-5 flex w-96 ${
          !restaurants?.food_items[0] ? "text-center" : ""
        } font-bold mb-3`}
      >
        {!restaurants?.food_items[0] ? "No Items..." : "Trending Orders"}
      </h5>
      <div className="">
        <div className="grid grid-cols-2 lg:grid-cols-3 2xl:mb-0 mb-2 gap-5 2xl:gap-2">
          {currentItems?.map((f, index) => (
            <div key={index} className="drop-shadow-2xl">
              <div className="flex justify-center items-center gap-2 h-32 bg-white py-2 px-2 rounded-md">
                <div className="flex flex-col justify-start items-start">
                  <h3 className="text-lg font-semibold">{f?.menuName}</h3>
                  <p className="mt-2 text-gray-600">
                    {f?.personPerPlatter} persons
                  </p>
                  <p className="mt-2 text-[#EA6A12] font-semibold">
                    ${f?.price}
                  </p>
                </div>
                <div>
                  <img src={f?.photos} alt="" className="w-[70px] rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <button
            className="flex items-center gap-3 mt-3"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <div className="p-3 rounded-full bg-orange-500 text-white">
              <FaChevronLeft size={10} />
            </div>
            <div className="font-bold">Previous</div>
          </button>
          <button
            className="flex items-center gap-3 mt-3"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <div className="font-bold">Next</div>
            <div className="p-3 rounded-full bg-orange-500 text-white">
              <FaChevronRight size={10} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Menue;
