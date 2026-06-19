/** @format */

import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Loader from "../Loader/Loader";
import { useHotels } from "../context/hotelsprovider";
import { useEffect } from "react";
export default function Singlehotel() {
  const { id } = useParams();
  const { getHotel, currentHotel, isloadingCurrenthotel } = useHotels();
  useEffect(() => {
    getHotel(id);
  }, [id]);
  if (isloadingCurrenthotel || !currentHotel) return <Loader />;
  
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews}
          reviews &bull; {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}
