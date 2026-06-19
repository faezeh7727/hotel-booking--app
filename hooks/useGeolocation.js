/** @format */

import { useState } from "react";

export default function useGeolocation() {
  const [isloading, setisloading] = useState(false);
  const [position, setposition] = useState({});
  const [error, seterror] = useState(null);

  //getposition

  function getPosition() {
    if (!navigator.geolocation)
      return seterror("Your Browser does not support geolocation");
    setisloading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setposition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setisloading(false);
      },
      (error) => {
        seterror(error.message);
        setisloading(false);
      },
    );

  }

  return { isloading, error, position, getPosition };
}
