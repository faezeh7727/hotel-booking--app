/** @format */

import { useEffect } from "react";

export default function useOutsideclick(ref,exseptionId,cb) {
  useEffect(() => {
    function handleroutsidclick(event) {
        
        //ref.currentینی داخل خود باکس اپشن لیست
        //!ref.current.contains(event.target)ینی اگر خارج از باکسه کلیک شد
      if (ref.current && !ref.current.contains(event.target)
    && event.target.id!==exseptionId ) {
        cb();//setopenopsions
      }
    }
//به اددلیسنر میدیمش
document.addEventListener("mousedown",handleroutsidclick)
//و در نهاین ریموو
 return ()=>(
document.removeEventListener("mousedown",handleroutsidclick)
 )
  }, [ref,exseptionId,cb]);
}
