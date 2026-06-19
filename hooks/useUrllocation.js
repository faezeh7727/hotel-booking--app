/** @format */
import { useSearchParams } from "react-router-dom";
export default function useUrlLocation() {
  const [searchParams, setsearchParams] = useSearchParams();
  //get lat and long مختصات جغرافیایی هتل ها
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return { lat, lng };
}
