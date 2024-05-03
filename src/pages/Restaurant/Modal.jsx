import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProviders/AuthProviders";
import { useParams } from "react-router-dom";

import { FaRegStar } from "react-icons/fa";


const Modal = ({fetchReviews}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { id } = useParams();

  let uniqueId = id;

  const { user } = useContext(AuthContext);

  let email = user?.email;
  let uid = user?.uid;
  let image = user?.photoURL;
  let name = user?.displayName;

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(newRating);
  };

  const buttonStyles = (index) =>
    index <= rating ? "text-[#FEBD01]" : "text-black border-yellow-300" ;

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_API}review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comment,
          email,
          uid,
          uniqueId,
          image,
          name,
        }),
      });

      if (response.ok) {
        setRating(0);
        setComment("");
        console.log("submitted successfully");
        fetchReviews()
    
      } else {
        const errorMessage = await response.text();
        alert(`Error: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert(
        "An error occurred while submitting the review. Please try again later."
      );
    }
  };
 
  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Review</h3>
          <div className="flex justify-start items-start gap-1 mt-3">
            {[1, 2, 3, 4, 5].map((index) => (
              <button
                key={index}
                className={buttonStyles(index)} // Apply styles based on current rating
                onClick={() => handleRatingChange(index)}
              >
                <FaRegStar />
              </button>
            ))}
          </div>
          <h3 className="text-lg font-bold mt-3">Comment</h3>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            cols="60"
            rows="5"
            className="border rounded-md border-gray-400 mt-3"
          ></textarea>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#FFC153] rounded-md text-white font-semibold mt-2"
          >
            Submit
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
