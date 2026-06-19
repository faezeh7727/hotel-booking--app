/** @format */

import { createContext, useContext, useReducer, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { Await } from "react-router-dom";
const BASE_URL = "http://localhost:5000";

const BookmarkContext = createContext();
//context wiyh usereducer

/*const initialState = {
  bookmarks: [],
  currentBookmark: null,
  isLoading: false,
  error:null,
};

function bookmarkreducer(state, action) {
  switch (action.type) {
    case "isLoading":return{
      ...state,isLoading:true,
    }
    case "bookmarks/loaded":return{
      ...state,
      isLoading:false,
      bookmarks:action.payload,
    }
    case "bookmark/loaded":return{
      ...state,
      isLoading:false,
      currentBookmark:action.payload,
    }
    case "Bookmark/created":return{
      ...state,
       isLoading: false,
       bookmarks:state.bookmarks.filter((item)=>item.id!==action.payload)
    }
    case "Bookmark/deleted":return{
      ...state,
       isLoading: false,
       bookmarks:[...state.bookmarks,action.payload]
    }
    case "rejected":return{
      ...state,
      isLoading:false,
      error:action.payload,
    }
    default: 
    throw new Error("Unknown action")
  }
}

export default function BookmarkListProvider({ children }) {

  //use reducer:

  const [{ bookmarks, currentBookmark, isLoading }, dispatch] = useReducer(
   bookmarkreducer,
    initialState
  );

  //fetch bookmarklist

  useEffect(() => {
    async function getBookmark() {
      dispatch({type:"isLoading"});
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({type:"bookmarks/loaded", payload:data});
      } catch (err) {
        toast.error(err.message)
        dispatch({type:"rejected",payload:err.message});
      }
    }
  }, []);

  //get bookmark
  async function getBookmark(id) {
    dispatch({type:"isLoading"});
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({type:"bookmark/loaded", payload:data});
    } catch (err) {
      toast.error(err.message);
      dispatch({type:"rejected",payload:err.message})
    } 
  }

  //creat newbookmark
  async function creatNewbookmark(newBookmark) {
    dispatch({type:"isLoading"});
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({type:"bookmark/created", payload:data});
    } catch (err) {
      toast.error(err.message);
      dispatch({type:"rejected",payload:err.message})
    } 
  }

  //delete bookmark
  async function deletebookmark(id) {
    dispatch({type:"isLoading"});
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({type:"bookmark/deleted", payload:id})
    } catch (err) {
      toast.error(err.message);
      dispatch({type:"rejected",payload:err.message})
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        getBookmark,
        currentBookmark,
        isLoading,
        creatNewbookmark,
        deletebookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  return useContext(BookmarkContext);
}*/
const initialState = {
  bookmarks: [],
  currentBookmark: null,
  isLoading: false,
  error: null,
};

function bookmarkreducer(state, action) {
  switch (action.type) {
    case "isLoading":
      return { ...state, isLoading: true };
    case "bookmarks/loaded":
      return { ...state, isLoading: false, bookmarks: action.payload };
    //deleted all bookmarks
    case "bookmarks/deleted":
      return { ...state, isLoading: false, bookmarks: [], error: null };
    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: action.payload };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
        currentBookmark: null,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action");
  }
}

export default function BookmarkListProvider({ children }) {
  const [{ bookmarks, currentBookmark, isLoading }, dispatch] = useReducer(
    bookmarkreducer,
    initialState,
  );

  // fetch bookmarklist
  useEffect(() => {
    async function getBookmarkList() {
      dispatch({ type: "isLoading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (err) {
        toast.error(err.message);
        dispatch({ type: "rejected", payload: err.message });
      }
    }
    getBookmarkList();
  }, []);

  // get bookmark
  async function getBookmark(id) {
    //dont reloade currentbookmark
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "isLoading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  // creat newbookmark
  async function creatNewbookmark(newBookmark) {
    dispatch({ type: "isLoading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  // delete bookmark
  async function deletebookmark(id) {
    dispatch({ type: "isLoading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  //delete all bookmarks

  async function deleteAllBookmarks() {
    dispatch({ type: "isLoading" });
    try {
      for (const bookmark of bookmarks) {
        await axios.delete(`${BASE_URL}/bookmarks/${bookmark.id}`);
      }
      dispatch({ type: "bookmarks/deleted" });
    } catch (err) {
      toast.error(err.message);
      dispatch({ type: "rejected", payload: err.message });
    }
  }

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        getBookmark,
        currentBookmark,
        isLoading,
        creatNewbookmark,
        deletebookmark,
        deleteAllBookmarks,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmark() {
  return useContext(BookmarkContext);
}
