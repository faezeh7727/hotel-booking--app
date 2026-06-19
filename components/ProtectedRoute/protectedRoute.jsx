/** @format */

import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authprovider";
import { useEffect } from "react";
//برای اینکه کاربر به بوک مارک دسترسی داشته باشد
//چیلدرن این کامپوننت روت بوک مارک است
export default function ProtectedRuote({ children }) {
  const { isAthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAthenticated) navigate("/");
  }, [isAthenticated, navigate]);

  return isAthenticated ? children : null;
}
