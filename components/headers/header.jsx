/** @format */
/**import icons */
import { MdLocationOn } from "react-icons/md";
/**hero icon*/
import {
  HiCalendar,
  HiLogout,
  HiMinus,
  HiPlus,
  HiSearch,
} from "react-icons/hi";
import { useRef, useState } from "react";
import useOutsideclick from "../../hooks/UseoutsidClick";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import BookmarkButton from "../bookmarkbutton/bookmarkbutton";

import {
  createSearchParams,
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useAuth } from "../context/Authprovider";

export default function Header() {
  //search params
  const [searchparams, setsearchparams] = useSearchParams();

  const [destination, setdestination] = useState(
    searchparams.get("destination") || "",
  );
  //open option state
  const [openoption, setopenoption] = useState(false);
  //option type
  const [options, setoptions] = useState({
    adult: 2,
    child: 1,
    room: 1,
  });

  //date stats:

  const [date, setdate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [opendate, setopendate] = useState(false);
  const handleroptions = (name, operation) => {
    //name: adult child room
    setoptions((prev) => {
      return {
        ...prev,
        [name]: operation === "inc" ? prev[name] + 1 : prev[name] - 1,
      };
    });
  };
  const dateRef = useRef(null);
  useOutsideclick(dateRef, "daterange", () => setopendate(false));

  //handle search

  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    //برای اینکه نتایج سرچ ما با اطلاعات ورودی در هدر ینی دیت تعداد افراد و اتاق ها مچ بشه
    //ینی نتایج جستجو با ورودی های کاربر مطابقت داشته باشد
    //از creatsearchparams استفاده میکنیم
    //داخلش یک ابجکت از استتیت ورودی هامونه
    const encodedParams = createSearchParams({
      //به استرینگ تبدیلشون میکنیم
      date: JSON.stringify(date),
      destination,
      options: JSON.stringify(options),
    });
    setsearchparams(encodedParams);
    navigate({ pathname: "/hotels", search: encodedParams.toString() });
    setdestination("");
  };

  return (
    <div className="header">
      <div className="headerActions ">
        <BookmarkButton />
        <User/>
      </div>
      <form onSubmit={handleSearch}>
        <div className="headerSearch">
          <div className="headerSearchItem">
            {/**icon */}
            <MdLocationOn className="headerIcon locationIcon" />

            <input
              value={destination}
              onChange={(e) => setdestination(e.target.value)}
              type="text"
              name="destination"
              id="destination"
              className="headerSearchInput"
              placeholder="where to go?"
            />

            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            {/**icon */}

            <div
              id="daterange"
              onClick={() => setopendate(!opendate)}
              className="dateDropDown optionBox"
            >
              <HiCalendar className="headerIcon dateIcon" />
              {`${format(date[0].startDate, "MM/dd/yyyy")} to
               ${format(date[0].endDate, "MM/dd/yyyy")}`}
            </div>

            <div ref={dateRef}>
              {
                //if open date is true:
                opendate && (
                  <DateRange
                    onChange={(item) => setdate([item.selection])}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                    moveRangeOnFirstSelection={true}
                  />
                )
              }
            </div>
            <span className="seperator"></span>
          </div>
          <div className="headerSearchItem">
            <div
              className="optionBox"
              id="optiondropdown"
              onClick={() => setopenoption(!openoption)}
            >
              Adult{options.adult} &bull; Child{options.child} &bull; Room
              {options.room}
            </div>
            {
              /**if openoption is true: */
              openoption && (
                <GuestoptionList
                  options={options}
                  handleroptions={handleroptions}
                  setopenoptions={setopenoption}
                />
              )
            }
            <span className="seperator"></span>
          </div>

          <div className="headerSearchItem">
            <button className="headerSearchBtn" type="submit">
              <HiSearch className="headerIcon" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

//geust option list component

function GuestoptionList({ options, handleroptions, setopenoptions }) {
  const opstionRef = useRef();

  //customhook outsidclick:
  useOutsideclick(opstionRef, "optiondropdown", () => setopenoptions(false));
  return (
    <div className="guestOptions" ref={opstionRef}>
      <OPtionItem
        handleroptions={handleroptions}
        type="adult"
        options={options}
        minLimit={1}
      />
      <OPtionItem
        handleroptions={handleroptions}
        type="child"
        options={options}
        minLimit={0}
      />
      <OPtionItem
        handleroptions={handleroptions}
        type="room"
        options={options}
        minLimit={1}
      />
      <div id="closebtn" className="btncontainer ">
        <button onClick={() => setopenoptions(false)} className=" closebtn ">
          close
        </button>
      </div>
    </div>
  );
}

//option item componentt

function OPtionItem({ options, type, minLimit, handleroptions }) {
  return (
    <div className="guestOptionItem">
      <span className="optionText">{type}</span>
      <div className="optionCounter">
        <button
          className="optionCounterBtn"
          disabled={options[type] <= minLimit}
          onClick={() => handleroptions(type, "dec")}
        >
          <HiMinus />
        </button>
        <span className="">{options[type]}</span>
        <button
          className="optionCounterBtn"
          onClick={() => handleroptions(type, "inc")}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}

function User() {
  const { user, isAthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const handlelogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div className="User">
      {isAthenticated ?
        <div className="userlogout">
          <span className="username">{user.name}</span>
          <button className="logout-btn">
            <HiLogout onClick={handlelogout} />
          </button>
        </div>
      : <button
      onClick={() => navigate("/login")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="loginsvg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>
        </button>
      }
    </div>
  );
}
