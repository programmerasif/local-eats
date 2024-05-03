import person from "../../assets/profile.png";
import { FaRegHeart } from "react-icons/fa";
import { BiShare } from "react-icons/bi";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Review = () => {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API}reviews`);
      if (response.ok) {
        const data = await response.json();
        const filteredReviews = data.filter((review) => review.uniqueId === id);
        setReviews(filteredReviews);
        console.log(filteredReviews);
      } else {
        console.error("Error fetching reviews:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  const demoUser = "owner";

  return (
    <>
      <div className="xl:ml-10 bg-white xl:bg-inherit w-full p-4 rounded-lg mt-10 drop-shadow-2xl lg:mt-0 relative">
      <div
        className={`reviews-container ${
          reviews.length > 2 ? "overflow-y-auto" : ""
        }`}
        style={{ maxHeight: "300px" }}
      >
        {reviews.map((post) => (
          <div key={post}>
            <div className="flex gap-4 mb-8 items-center">
              <div>
                <img
                  className="rounded-full w-16"
                  src={post?.image ? post.image : person}
                  alt="user"
                />
              </div>
              <div className="gap-5">
                <div className="flex flex-col items-start">
                  <h1 className="mt-3 2xl:mt-4 font-bold mb-3">
                    {post?.name ? post.name : "Unknown"}
                  </h1>
                  <div className="flex flex-col font-semibold">
                    <span>{post?.comment}</span>
                    <div className="flex justify-start mt-2 items-center gap-5 text-[#EA6A12]">
                      <FaRegHeart />
                      <span className="">Like</span>
                      <BiShare />
                      <span>Replay</span>
                      <span className="text-gray-500">5min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {demoUser ? (
        <div className="flex gap-3 mt-5">
          <button
            onClick={() => document.getElementById("my_modal_3").showModal()}
            className="font-semibold hover:scale-90 duration-300 bg-[#FFC153] p-3 text-white rounded-lg"
          >
            Leave a Review
          </button>
          <button className="font-semibold bg-[#F2613F] p-3 text-white rounded-lg">
            View All
          </button>
        </div>
      ) : (
        <p className="text-4xl text-center border">No Reviews Found</p>
      )}
      <Modal fetchReviews={fetchReviews} />
    </div>
    </>
  );
};

export default Review;
