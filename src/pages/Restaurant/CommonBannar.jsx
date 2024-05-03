
import { FaStar } from "react-icons/fa";
import "./Restaurant.css";

const CommonBannar = ({restaurants}) => {
  return (
    <div className="restImg rounded-sm mx-auto">
      <div className="flex flex-col justify-center items-center gap-3 h-full text-white">
        <h5 className="text-4xl font-bold">{restaurants?.restaurant_name}</h5>
        <div className="flex justify-center items-center gap-2 text-[#FEBD01]">
          <span className="text-white">(5.5)</span>
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <span className="text-white">50</span>
        </div>
      </div>
    </div>
  );
};

export default CommonBannar;
