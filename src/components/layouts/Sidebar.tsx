// import React from 'react';
// import logo from '@/assets/logo.png'
// import smallLogo from '@/assets/logo_sm.png'
// import { ReactComponent as PakageIcon } from "@/assets/svg/package.svg";
// import { ReactComponent as MapIcon } from "@/assets/svg/map.svg";
// import { ReactComponent as UserIcon } from "@/assets/svg/user.svg";
// import { ReactComponent as TruckIcon } from "@/assets/svg/truck.svg";
// import { ReactComponent as FileIcon } from "@/assets/svg/file.svg";
// import { ReactComponent as AddFileIcon } from "@/assets/svg/file-plus.svg";
// import { ReactComponent as ArrowIcon } from "@/assets/svg/chevron-down.svg";
// import { ReactComponent as RoutIcon } from "@/assets/svg/map-pin.svg";
// import { ReactComponent as Trailericon } from "@/assets/svg/trailer.svg";
// import { useLocation, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';

// type SideBarProps = {
//     collapse: boolean,
//     hidden?: boolean,
// }

// export default function SideBar(props: SideBarProps) {
//     const { collapse } = props;
//     const [menuList, setMenuList] = React.useState<any>({ masterData: true })

//     const setCollpaseMenu = (key: string) => {
//         const lists = { ...menuList };
//         lists[key] = !lists[key];
//         setMenuList(lists)
//     }

//     return (
//         <motion.div
//             className={`${collapse ? 'min-w-[4rem] max-w-[4rem] ' : 'min-w-[18rem] max-w-[18rem] md:min-w-[70vw] min:max-w-[70vw] '}
//             bg-primary text-white w-full
//             lg:max-w-[35vw] lg:min-w-[35vw]  md:max-w-[40vw] md:min-w-[40vw] sm:max-w-[60vw] sm:min-w-[60vw]
//             lg:absolute lg:z-20 transition-all transition-min-width duration-300 delay-75 h-full overflow-auto border-r flex flex-col items-center pt-4 pb-8
//             ${props.hidden ? 'lg:-translate-x-[40rem] sm:-translate-x-96' : 'lg:translate-x-0'}`}
//         >
//             <div className='flex flex-col  items-center '>
//                 <img title='' src={'https://tela.com.kh/wp-content/uploads/2019/05/site-icon.png'} className={props.collapse ? 'min-w-[5rem] max-w-[5rem]' : `min-w-[5rem] max-w-[5rem]`} />
//                 <h1 className='text-3xl font-bold uppercase'>Logistic</h1>
//             </div>

//             <div className="border-b  w-full my-6 border-b-gray-100/30"></div>
//             <div className='w-full grow whitespace-nowrap overflow-hidden'>
//                 <ul className='flex flex-col gap-2'>
//                     <li className={`${menuList['masterData'] ? '' : ''} `}>
//                         <div
//                             className={`flex justify-between p-3 px-6 hover:cursor-pointer hover:bg-primary/10 items-center rounded-lg`}>
//                             {/* <h3>Master </h3> */}
//                             <button
//                                 onClick={() => setCollpaseMenu('masterData')}
//                                 className=' bg-transparent border-none '><ArrowIcon className={`ml-1 transition-all duration-200 ${menuList['masterData'] ? '-rotate-90' : ''}`} /></button>
//                         </div>

//                         <ul className={`transition-all duration-300 overflow-hidden ${menuList['masterData'] ? '  mt-2 pt-2 min-h-12 max-h-[50vh] ' : 'min-h-0 max-h-0'}`}>
//                             <li >
//                                 <ButtonMenu collapse={collapse} hidden={props.hidden} path='/driver-master' title="Driver" icon={<UserIcon />} />
//                             </li>

//                             <li >
//                                 <ButtonMenu collapse={collapse} hidden={props.hidden} path='/truck-master' title="Truck" icon={<TruckIcon />} />
//                             </li>
//                             <li >
//                                 <ButtonMenu collapse={collapse} hidden={props.hidden} path='/trailer-master' title="Trailer" icon={<Trailericon />} />
//                             </li>

//                             <li >
//                                 <ButtonMenu collapse={collapse} hidden={props.hidden} path='/Tyre-master' title="Tyre" icon={<RoutIcon />} />
//                             </li>
//                         </ul>
//                     </li>
//                     <li
//                         className={`    ${menuList['tranportation'] ? '' : ''} `}>
//                         <div

//                             className={`flex justify-between  px-6 hover:cursor-pointer  items-center `}>
//                             <h3>Transportation</h3>
//                             <button
//                                 onClick={() => setCollpaseMenu('tranportation')}
//                                 className=' bg-transparent border-none '><ArrowIcon className={`ml-1 transition-all duration-200 ${menuList['tranportation'] ? '-rotate-90' : ''}`} /></button>
//                         </div>

//                         <ul className={`transition-all duration-300 overflow-hidden ${menuList['tranportation'] ? '  mt-2 pt-2 min-h-12 max-h-[50vh] ' : 'min-h-0 max-h-0'}`}>
//                             <li >
//                                 <ButtonMenu collapse={collapse} hidden={props.hidden} path='/route-master' title="Route" icon={<RoutIcon />} />
//                             </li>
//                             <li>
//                                 <ButtonMenu collapse={collapse} hidden={props.hidden} path='/transportation-request' title="Transportation" icon={<AddFileIcon />} />
//                             </li>
//                             <li>
//                                 <ButtonMenu collapse={collapse} hidden={props.hidden} path='/transportation-order' title="Trans Order" icon={<FileIcon />} />
//                             </li>
//                             <li>
//                                 <ButtonMenu collapse={collapse} hidden={props.hidden} path='/sale-delivery' title="Sales Delivery" icon={<FileIcon />} />
//                             </li>
//                         </ul>
//                     </li>
//                     <li className={`rounded-lg ${menuList['station'] ? '' : ''} `}>
//                         <div
//                             className={`flex justify-between p-2 px-6 hover:cursor-pointer  items-center rounded-lg`}>
//                             <h3>Stations</h3>
//                             <button
//                                 onClick={() => setCollpaseMenu('station')}
//                                 className=' bg-transparent border-none '><ArrowIcon className={`ml-1 transition-all duration-200 ${menuList['station'] ? '-rotate-90' : ''}`} /></button>
//                         </div>

//                         <ul className={`transition-all duration-300 overflow-hidden ${menuList['station'] ? ' pt-2 min-h-12 max-h-[50vh] ' : 'min-h-0 max-h-0'}`}>
//                             <li>
//                                 <ButtonMenu collapse={collapse} hidden={props.hidden} path='/transportation-request' title="Request" icon={<FileIcon />} />
//                             </li>
//                         </ul>
//                     </li>

//                 </ul>
//             </div>
//         </motion.div>
//     )
// }

// type ButtonMenuProps = {
//     title: string,
//     icon: React.ReactNode,
//     path: string,
//     collapse: boolean,
//     hidden?: boolean,
// }

// const ButtonMenu = (props: ButtonMenuProps) => {

//     const locaiton = useLocation();
//     const navigate = useNavigate();

//     const onGoToRoute = React.useCallback(() => {
//         navigate(props.path)
//     }, [locaiton]);

//     const isActive = React.useMemo(() => locaiton.pathname.includes(props.path), [locaiton, props.path])

//     return (
//         <button
//             onClick={onGoToRoute}
//             className={`    ${props.collapse ? 'disble-padding ' : ""}
//               w-full min-h-[3rem] whitespace-nowrap overflow-hidden  hover:bg-secondary/90   hover:text-white truncate
//               text-[15px]  text-left flex gap-6 hover:font-black
//               rounded-none py-3 pr-6 pl-3 border-l-[4px] transition-all duration-75 justify-center items-center
//              ${!isActive ? ' text-white border-l-transparent' : ' border-l-yellow-300 bg-secondary/90  text-white'}`}>
//             <span className='ml-4'>
//                 {props.icon}
//             </span>
//             <motion.div
//                 className={`grow capitalize text-current truncate ${props.collapse ? ' lg:flex' : ''} ${isActive && 'font-bold'}`}>
//                 {props.title}
//             </motion.div>
//         </button>
//     )
// }

// const MenuTitle = (props: { title: string, collapse: boolean }) => {
//     if (props.collapse)
//         return <div className="border-b my-4"></div>

//     return <h3 className={` font-bold text-base  ${props.collapse ? '' : 'px-4'} mb-2 `}>{props.title}</h3>
// }

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideBar = (props: any) => {
  const navigate = useNavigate();
  const [active, setActive] = useState<number | null>(null);
  const location = useLocation();

  function nameRoute(name: String) {
    if (name?.includes("/products")) {
      return 1;
    } else if (name?.includes("/dashboard")) {
      return 0;
    } else {
      return null;
    }
  }

  return (
    <div
      className={`${
        props.collapse ? "w-[60px]" : "w-[250px]"
      } relative transition-all duration-300 bg-sky-600`}
    >
      <div className="h-[53px] font-black text-[18px] text-sky-600 flex justify-center items-center shadow-md bg-white shadow-gray-500 border-b">
        {props.collapse ? "My" : "Project"}
      </div>
      <div className="mt-[40px]">
        <Item
          onClick={() => {
            navigate("/dashboard");
            setActive(0);
          }}
          title="Dashboards"
          col={props.collapse}
          active={active || nameRoute(location.pathname)}
          index={0}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="mr-4 bi bi-clipboard-data"
              viewBox="0 0 16 16"
            >
              <path d="M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0z" />
              <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
              <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
            </svg>
          }
        />
        <Item
          onClick={() => {
            navigate("/products/product");
            setActive(1);
          }}
          title="My Product"
          col={props.collapse}
          active={active || nameRoute(location.pathname)}
          index={1}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="mr-4 bi bi-backpack4"
              viewBox="0 0 16 16"
            >
              <path d="M4 9.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5zm1 .5v3h6v-3h-1v.5a.5.5 0 0 1-1 0V10z" />
              <path d="M8 0a2 2 0 0 0-2 2H3.5a2 2 0 0 0-2 2v1c0 .52.198.993.523 1.349A.5.5 0 0 0 2 6.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.5a.5.5 0 0 0-.023-.151c.325-.356.523-.83.523-1.349V4a2 2 0 0 0-2-2H10a2 2 0 0 0-2-2m0 1a1 1 0 0 0-1 1h2a1 1 0 0 0-1-1M3 14V6.937q.24.062.5.063h4v.5a.5.5 0 0 0 1 0V7h4q.26 0 .5-.063V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1m9.5-11a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1h-9a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
            </svg>
          }
        />
        {/* <Item
          onClick={() => setActive(2)}
          title="Teachers"
          col={props.collapse}
          active={active}
          index={2}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="mr-4 bi bi-people"
              viewBox="0 0 16 16"
            >
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4" />
            </svg>
          }
        />
        <Item
          onClick={() => {
            setActive(3);
          }}
          title="Documents"
          col={props.collapse}
          active={active}
          index={3}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="mr-4 bi bi-file-earmark"
              viewBox="0 0 16 16"
            >
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
            </svg>
          }
        />
        <Item
          onClick={() => setActive(4)}
          title="Previews"
          col={props.collapse}
          active={active}
          index={4}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="mr-4 bi bi-file-earmark-check"
              viewBox="0 0 16 16"
            >
              <path d="M10.854 7.854a.5.5 0 0 0-.708-.708L7.5 9.793 6.354 8.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2M9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
            </svg>
          }
        /> */}
      </div>
    </div>
  );
};

export default SideBar;

const Item = (props: any) => {
  return (
    <div>
      <div
        onClick={props?.onClick}
        className={`relative h-[40px] text-[15px] hover:bg-slate-400 transition-all duration-300 hover:text-[#fff] cursor-pointer text-white flex items-center w-full ${
          props?.active === props?.index ? "bg-slate-400 " : ""
        } ${
          props?.col
            ? "font-bold text-md justify-center items-center px-0"
            : "px-[50px]"
        }`}
      >
        <div className={`${props?.col ? "ml-3" : "-ml-5"}`}>{props?.icon}</div>{" "}
        {props?.col ? null : props?.title}
      </div>
    </div>
  );
};
