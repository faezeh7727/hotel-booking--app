import { Outlet } from "react-router-dom"
import Map from "../Map/map"
import { useHotels } from "../context/hotelsprovider"
export default function Applayout() {
   const {hotels}= useHotels()
    return(
        <div className="appLayout">
         <div className="sidebar">
            <Outlet/>
         </div>
         <Map MarkerLocations={hotels}/>
        </div>
    )
}