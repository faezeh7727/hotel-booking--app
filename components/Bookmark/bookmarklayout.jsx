import { useBookmark } from "../context/bookmarklistcontext";
import Map from "../Map/map";
import { Outlet } from "react-router-dom";
export default function BookmarkLayout() {
  const {bookmarks}=  useBookmark()
    return(
        <div className="appLayout">
         <div className="sidebar">
            <Outlet/>
         </div>
         <Map MarkerLocations={bookmarks}/>
        </div>
    )
}