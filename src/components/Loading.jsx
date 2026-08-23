import { useEffect, useState } from "react";
function Loading(){
    const [dot,setDot] = useState(".");
    
    useEffect(()=>{
      const interval = setInterval(()=>{
        setDot(prev=>{ return prev.length == 3? "." : prev+="."});
      },400);
      return ()=>{clearInterval(interval)}
    },[]);

    return(
        <div className="w-full flex justify-center items-center font-fredoka text-3xl text-fuchsia-900 h-100">
              {"Memuat" + dot}
        </div>
    )
}

export default Loading;