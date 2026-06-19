/** @format */

import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../context/bookmarklistcontext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { HiCalendar, HiTrash } from "react-icons/hi";
export default function Bookmarklist() {
  const {
    isLoading,
    bookmarks,
    currentBookmark,
    deletebookmark,
    deleteAllBookmarks,
  } = useBookmark();
  //dellet bookmark
  const handledelet = async (e, id) => {
    e.preventDefault();
    await deletebookmark(id);
  };

  //dellet all bookmarks
   const handledeletAllbookmarks = async (e) => {
    e.preventDefault();
    await deleteAllBookmarks();
  };

  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <p>there is no bookmark location</p>;
  return (
    <div>
      <div className="bookmarklistheader">
      <h2>BookmarkList</h2>
      <button onClick={handledeletAllbookmarks}
      className="btn btn--primary">delete all</button>
      </div>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${item.id === currentBookmark?.id ? "current-bookmark" : ""} `}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp;<span>{item.cityName}</span>&nbsp;
                  <span>{item.country}</span>
                </div>
                <div>
                  <button onClick={(e) => handledelet(e, item.id)}>
                    <HiTrash className="trash" />
                  </button>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
