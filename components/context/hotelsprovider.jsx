/** @format */

import { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
const BASE_URL = "http://localhost:5000/hotels";
const HotelContext = createContext();

function HotelsProvider({ children }) {
  const [currentHotel, setCurrenthotel] = useState(null);
  const [isloadingCurrenthotel, setisloadingCurrenthotel] = useState(false);
  const [searchparams] = useSearchParams();
  const destination = searchparams.get("destination");
  //string to objekt
  const room = JSON.parse(searchparams.get("options"))?.room;
  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    //query strings:
    `q=${destination?.trim() || ""}&accommodates_gte=${room || 1}`,
  );

  //currnt hotel as context
  //گرفتن هتلی که کاربر انتخاب کرده و جزییاتش در حال نمایشه
  async function getHotel(id) {
    setisloadingCurrenthotel(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrenthotel(data);
      setisloadingCurrenthotel(false);
    } catch (err) {
      toast.error(err.message);
      setisloadingCurrenthotel(false);
    }
  }

  return (
    <HotelContext.Provider
      value={{
        isLoading,
        hotels,
        getHotel,
        currentHotel,
        isloadingCurrenthotel,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
}

export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}
