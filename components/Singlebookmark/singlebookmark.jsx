/** @format */
import ReactCountryFlag from "react-country-flag";
import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../context/bookmarklistcontext";
import { useEffect } from "react";
import Loader from "../Loader/Loader";


export default function Singlebookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getBookmark, isLoading, currentBookmark } =
    useBookmark();
  useEffect(() => {
    getBookmark(id);
  }, [id]);

  const handleback = () => {
    //go to previous page(صفحه قبل)
    navigate(-1);
  };

  if (isLoading || !currentBookmark) return <Loader />;
  return (
    <div>
      <button onClick={handleback} className="btn btn--back">
        &larr;&nbsp;Back
      </button>
      <h2 className="cityname">{currentBookmark.cityname}</h2>
      <div
        className={` ${currentBookmark.id === currentBookmark?.id ? "current-bookmark" : ""} `}
      >
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp;<span>{currentBookmark.cityName}</span>&nbsp;
        <span>{currentBookmark.country}</span>
        
      </div>
    </div>
  );
}
