import React, { useMemo } from "react";
import { ReactComponent as LogOutIcon } from "@/assets/svg/log-out.svg";
import { ReactComponent as MenuIcon } from "@/assets/svg/menu.svg";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import request from "@/services";
import LoadingDialog from "../dialog/LoadingDialog";

type HeaderProps = {
  setCollapse: () => void;
};

export default function Header(props: HeaderProps) {
  const [loading, setLoading] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const user = useMemo(() => {
    return localStorage.getItem("username");
  }, [localStorage.getItem("username")]);
  // const onLogOut = React.useCallback(async () => {
  //     try {
  //         setLoading(true)
  //         await request('POST', '/Logout');
  //         removeCookie('token');
  //     } catch (error) {
  //         console.log(error)
  //     } finally {
  //         setLoading(false)
  //     }

  // }, [navigate, cookies.token, removeCookie]);

  const onLogOut = React.useCallback(async () => {
    setLoading(true);
    setTimeout(() => {
      removeCookie("token");
      setLoading(false);
    }, 2000);
  }, [navigate, cookies.token, removeCookie]);
    
  return (
    // <header className="w-full py-2 pr-8 pl-2 bg-white  shadow-sm border-b flex justify-between max-h-[3rem]">
    //   <LoadingDialog open={loading} />
    //   <div className="flex justify-center items-center">
    //     <button
    //       onClick={props.setCollapse}
    //       className="btn btn-sm bg-transparent border-none hover:bg-transparent text-primary"
    //     >
    //       <MenuIcon className="w-5" />
    //     </button>
    //   </div>
    //   <span className="font-bold text-lg">Company name</span>
    //   {/*  */}
    //   <div>
    //     <button
    //       onClick={onLogOut}
    //       className="btn btn-xs btn-square text-black bg-white border-none hover:bg-slate-50"
    //     >
    //       <LogOutIcon className="w-10 h-5" />
    //     </button>
    //   </div>
    // </header>
    <div
      className={`sticky top-0 px-2 pr-4 w-full shadow-lg flex py-3 justify-between items-center bg-white`}
    >
      <LoadingDialog open={loading} />
      <div className="flex justify-center items-center">
        <button
          //   onClick={() => setCollapse(!collapse)}
          onClick={props.setCollapse}
          className="mr-3 btn btn-sm bg-transparent border-gray-300 rounded-md text-sky-700 hover:bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-list-ul"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
            />
          </svg>
        </button>
        <button
          onClick={() => navigate(-1)}
          className="mr-3 btn btn-sm bg-transparent border-gray-300 rounded-md text-sky-700 hover:bg-transparent"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="currentColor"
            className="bi bi-arrow-left-circle"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
            />
          </svg>
        </button>
      </div>
      <div>
        <p className="text-[15px] text-gray-800 font-black">
          <span className="inline-block pr-4 ">----</span>
          {" Reaksmey Kunmony"} <span className="inline-block pl-4">----</span>
        </p>
      </div>
      <div className="flex space-x-4 font-semibold">
        <span
          //   onClick={handleShow}
          className="mr-3 text-[13px] px-3 caret-inherit border border-sky-300 flex items-center  bg-transparent rounded-md text-sky-700 hover:bg-transparent hover:border-sky-500"
        >
          {user}
        </span>

        <button
          onClick={onLogOut}
          className="mr-3 btn btn-sm border-gray-300 rounded-md bg-slate-400 text-white hover:bg-gray-400 font-bold hover:border-white"
        >
          <LogOutIcon className="w-4 h-5" />
          Log out
        </button>
      </div>
    </div>
  );
}
