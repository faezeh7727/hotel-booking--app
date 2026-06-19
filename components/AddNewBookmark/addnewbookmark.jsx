/** @format */

import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrllocation";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import GeolocationError from "../golocationError/geolocationError";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/bookmarklistcontext";
const BASE_GEOCODING_URL =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";

export default function AddnewBookmark() {
  const navigate = useNavigate();
  const { lat, lng } = useUrlLocation();
  const [cityname, setcityname] = useState("");
  const [country, setcountry] = useState("");
  const [countryCode, setcountryCode] = useState("");
  const [isloadingGeocoding, setisloadingGeocoding] = useState(false);
  const [geocodingError, setgeocodingError] = useState(null);
  const { creatNewbookmark } = useBookmark();
  useEffect(() => {
    //اگر هیچ طول و عرض جغرافیایی وجود نداشت عملیات فچ کردنو متوقف کنه درخواستی نره
    if (!lat || !lng) return;

    async function fetchlocationdata() {
      setisloadingGeocoding(true);
      setgeocodingError(null);
      try {
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`,
        );
        if (!data.countryCode) throw new Error("this location is not a city");
        setcityname(data.city || data.locality || "");
        setcountry(data.countryName || "");
        setcountryCode(data.countryCode);
      } catch (error) {
        setgeocodingError(error.message);
      } finally {
        setisloadingGeocoding(false);
      }
    }
    fetchlocationdata();
  }, [lat, lng]);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!cityname || !country) return;

    const newBookmark = {
      cityname,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityname + "" + country,
    };

    //call await creatnewbookmark func
    await creatNewbookmark(newBookmark);
    navigate("/bookmark")
  };

  if (isloadingGeocoding) return <Loader />;
  if (geocodingError) return <GeolocationError message={geocodingError} />;
  return (
    <div>
      <h2>Add New BookMark</h2>
      <form className="form" onSubmit={handlesubmit}>
        <div className="formControl">
          <label htmlFor="cityName">CityName</label>
          <input
            onChange={(e) => setcityname(e.target.value)}
            value={cityname}
            type="text"
            name="cityName"
            id="cityName"
          />
          <label htmlFor="country">Country</label>
          <input
            onChange={(e) => setcountry(e.target.value)}
            value={country}
            type="text"
            name="country"
            id="country"
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr;&nbsp;Back
          </button>
          <button className="btn btn--primary">Add</button>
        </div>
      </form>
    </div>
  );
}
