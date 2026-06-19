/** @format */

import "./App.css";
import Header from "../components/headers/header";
import Locationlist from "../components/Locationlist/LocationList";
import Applayout from "../components/Applayout/applayout";
import Hotels from "../components/hotels/hotels";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import HotelsProvider from "../components/context/hotelsprovider";
import Singlehotel from "../components/SingleHotel/singleHotel";
import BookmarkLayout from "../components/Bookmark/bookmarklayout";
import BookmarkListProvider from "../components/context/bookmarklistcontext";
import Bookmarklist from "../components/Bookmark/bookmarklist";
import Singlebookmark from "../components/Singlebookmark/singlebookmark";
import AddnewBookmark from "../components/AddNewBookmark/addnewbookmark";
import BookmarkButton from "../components/bookmarkbutton/bookmarkbutton";
import Authproivider from "../components/context/Authprovider";
import Login from "../components/Login/login";
import ProtectedRuote from "../components/ProtectedRoute/protectedRoute";
function App() {
  return (
    <Authproivider>
      <BookmarkListProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<Locationlist />} />
            <Route path="/login" element={<Login />} />
            {/**nested routes */}
            <Route path="/hotels" element={<Applayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<Singlehotel />} />
            </Route>
            <Route
              path="/bookmark"
              element={
                <ProtectedRuote>
                  <BookmarkLayout />
                </ProtectedRuote>
              }
            >
              <Route index element={<Bookmarklist />} />
              <Route path=":id" element={<Singlebookmark />} />
              <Route path="add" element={<AddnewBookmark />} />
            </Route>
          </Routes>
        </HotelsProvider>
      </BookmarkListProvider>
    </Authproivider>
  );
}

export default App;
