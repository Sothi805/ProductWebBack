import React from 'react'
import { ReactComponent as SearchIcon } from "@/assets/svg/search.svg";
import { ReactComponent as PlusIcon } from "@/assets/svg/plus.svg";
import { ReactComponent as DownNewIcon } from "@/assets/svg/downNew.svg";
import { ReactComponent as Righticon } from "@/assets/svg/right.svg";
import { ReactComponent as Lefticon } from "@/assets/svg/left.svg";
import { ReactComponent as Edit } from "@/assets/svg/edit_square_FILL0_wght400_GRAD0_opsz48.svg";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
const Activeheader = (props: any) => {
  const [collapse, setCollapse] = React.useState(false);
  const route = useNavigate()
  const location = useLocation()
  const goToEditPage = () => {
    route(location.pathname + "/edit");
  };

  const { id } = useParams()

  return (
    <>
      <div className='bg-white'>
        <h1 className='px-[30px] pt-3 font-bold text-[20px] pb-[14px]'>Driver Master - Create</h1>
        <div className={`sm:hidden flex transition-all duration-300 overflow-hidden items-center border-b-[1px]  justify-between -mt-1 px-[30px] ${collapse ? "h-[0px] " : "h-[6rem] pb-[30px]"}`}>
          <ul className='flex gap-x-[80px]'>
            <li className={`flex ${props?.line1 ? "" : "hidden"} flex-col gap-y-[7px]`}>
              <small className='text-[12px] text-[#4e4e50a4] border-none text-base'>{props?.line1}</small>
              <span className='text-[#404041] bg-transparent outline-none font-bold text-[16px] '>
                {true && props?.data1 || props?.header?.data1 || props?.line1 && "_ _ _"}
              </span>

            </li>
            <li className={`flex ${props?.line2 ? "" : "hidden"} flex-col gap-y-[7px]`}>
              <small className='text-[12px] text-[#4e4e50a4] border-none text-base'>{props?.line2}</small>
              <span className='text-[#4e4e50a4] font-bold text-[16px] bg-transparent outline-none  '>              {true && props?.data2 || props?.header?.data2 || props?.line2 && "_ _ _"}
              </span>
            </li>
            <li className={`flex ${props?.line3 ? "" : "hidden"} flex-col gap-y-[7px]`}>
              <small className='text-[12px] text-[#4e4e50a4] border-none text-base'>{props?.line3}</small>
              <span className='text-[#4e4e50a4] font-bold text-[17px] bg-transparent outline-none  '>              {true && props?.data3 || props?.header?.data3 || props?.line3 && "_ _ _"}
              </span>

            </li>
            <li className={`flex ${props?.line4 ? "" : "hidden"} flex-col gap-y-[7px]`}>
              <small className='text-[12px] text-[#4e4e50a4] border-none text-base'>{props?.line4}</small>
              <span className='text-[#4e4e50a4] font-bold text-[17px] bg-transparent outline-none border-none '>              {true && props?.data4 || props?.header?.data4 || props?.line4 && "_ _ _"}
              </span>

            </li>
          </ul>
          {
            props?.detail &&
            <ul className={`text-[#070B3B]  flex gap-[25px] -mb-[30px] mr-[50px]`}>
              <li className='text-[1.1rem] font-bold mt-1'>{"Driver Master /" + " " + id}</li>
              <li className=' '><span onClick={goToEditPage} className="btn btn-md bg-primary text-white hover:bg-secondary text-sm px-6 flex gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                </svg> Edit
              </span></li>
            </ul>
          }

          <ul className={`${props.detail ? "hidden" : ""} flex gap-[40px] -mb-[35px]`}>
            {/* <li className='flex gap-[20px] items-center'>
            <small className=''><span className='btn btn-ghost'><Lefticon className='w-[35px] h-[35px] font-bold' strokeWidth={3} /></span></small>
            <span className='text-[17.5px]'>NCS220001</span>
            <small className='font-bold'> <span className='btn btn-ghost'>  <Righticon className='w-[35px] h-[35px] font-bold' strokeWidth={3} /></span></small>
          </li> */}
            {/* <li className='flex  gap-[20px] items-center'><small><span className='btn btn-ghost'><SearchIcon className="w-[20px] h-[20px]" /></span></small></li> */}
            {/* <li className='flex md:hidden text-white gap-[10px] items-center' >    <span className="btn btn-md bg-primary text-white hover:bg-secondary text-sm px-6 flex gap-3">
            <PlusIcon className="w-4" /> New
          </span></li> */}

          </ul>
        </div>

        <div className='relative shadow-sm shadow-gray-200 border-b-[1px]'>
          <ul className='px-[30px] gap-7 flex sm:gap-x-7 sm:gap-y-3 sm:flex-wrap text-[16px] text-[#8c8c8fa4] border-none text-basegap-7 pt-2 bg-white'>
            {props?.menuTap}
          </ul>
          <span onClick={() => setCollapse(!collapse)} className={`shadow-sm sm:hidden cursor-pointer ${collapse ? "rotate-180" : ""} inline-block p-1 train bg-white border border-gray-300 rounded-full absolute left-[45%] top-[25px]`}><DownNewIcon width={30} height={30} /></span>
        </div>
      </div>
    </>
  )
}

export default Activeheader