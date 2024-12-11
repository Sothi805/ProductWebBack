/* eslint-disable react-refresh/only-export-components */

import React from "react";

import { ReactComponent as PlusIcon } from "@/assets/svg/plus.svg";
import { ReactComponent as SettingIcon } from "@/assets/svg/colmun-setting.svg";
import { Menu, Transition } from "@headlessui/react";
import { Table } from '@tanstack/react-table';
import { useLocation, useNavigate } from "react-router-dom";


const DataTableHeader = ({
  table,
  title,
  refetchData,
  exportExcelTemplate,
  loading,
}: {
  table: Table<any>;
  title: string;
  refetchData: () => void;
  exportExcelTemplate: () => void;
  loading:boolean | undefined
}) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<any>();

  //
  const navigator = useNavigate();
  const location = useLocation();

  //
  React.useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref?.current && !ref?.current?.contains(event.target)) {
        setOpen(false);
      }
    }
    // Bind the event listener
    document?.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document?.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref.current]);

  const goToCreate = () => navigator(location.pathname + "/create");

  return (
    <div className="flex justify-between items-center">
      <div className="grow">
        <h1 className="flex gap-2 items-center text-xl font-bold">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-clipboard2-data"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5z" />
            <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
            <path d="M10 7a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0zm-6 4a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0zm4-3a1 1 0 0 0-1 1v3a1 1 0 1 0 2 0V9a1 1 0 0 0-1-1" />
          </svg>
          {title} Listing
        </h1>
      </div>

      <ul className="justify-end gap-3 flex items-center">
        <li className="mt-1">
          <button
            className="btn border-gray-300 rounded-md text-sky-500 border btn-sm px-4 capitalize text-base bg-transparent hover:bg-gray-100"
            onClick={goToCreate}
          >
            <PlusIcon className="w-4" strokeWidth={3} /> Create
          </button>
        </li>

        {/* <li className=''>
                <button
                    className='btn btn-md capitalize text-base bg-transparent border-none hover:font-bold'
                >
                    <DownloadIcon className='w-4' strokeWidth={3} /> Export CSV
                </button>
            </li> */}
        {/* <li className=''>
                <button
                    className='btn btn-md capitalize text-base bg-transparent border-none hover:font-bold'
                >
                    <DownloadIcon className='w-4' strokeWidth={3} /> Export CSV
                </button>
            </li> */}
        <li className="">
          <button
            className="btn border-gray-300 rounded-md text-sky-500 border btn-sm px-4 capitalize text-base bg-transparent hover:bg-gray-100"
            onClick={refetchData}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-repeat"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
              />
            </svg>{" "}
            Refresh
          </button>
        </li>
        <li className="md:hidden">
          <Menu>
            <Menu.Button onClick={() => setOpen(!open)}>
              <div
                className={`btn -mt-[1px] border-gray-300 rounded-md text-sky-500 border btn-sm px-4 capitalize text-base bg-transparent hover:bg-gray-100`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  fill="currentColor"
                  className=" bi bi-gear"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                </svg>
                Setting
              </div>
            </Menu.Button>
            <Transition
              ref={ref}
              show={open}
              enter="transition-all ease-in-out duration-150"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-in-out duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="absolute z-50 duration-150 top-[4rem] w-[15vw] right-2 bg-white rounded-sm  shadow-lg border p-2 py-4 flex flex-col gap-2 drop-shadow-sm"
            >
              {table.getAllLeafColumns().map((column, index) => {
                if (column.id === "id" || column.id === "select") return;

                return (
                  <Menu.Item key={index}>
                    <div
                      onClick={column.getToggleVisibilityHandler()}
                      key={column?.id}
                      className="bg-white text-[15px]  cursor-pointer hover:rounded-lg hover:bg-[#5e5e5e17] p-2 flex item-center gap-2"
                    >
                      <input
                        className="checkbox checkbox-sm checkbox-primary mr-2 border-2"
                        type="checkbox"
                        checked={column.getIsVisible()}
                        // onChange={column.getToggleVisibilityHandler()}
                      />
                      <span className="capitalize">{column.id}</span>
                    </div>
                  </Menu.Item>
                );
              })}
            </Transition>
          </Menu>
        </li>
        <li className="">
          <button
            disabled={loading}
            className="btn border-gray-300 rounded-md text-sky-500 border btn-sm px-4 capitalize text-base bg-transparent hover:bg-gray-100"
            onClick={exportExcelTemplate}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              className="-mt-[1px] bi bi-file-earmark"
              viewBox="0 0 16 16"
            >
              <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z" />
            </svg>
            Export to CSV
          </button>
        </li>
      </ul>
    </div>
  );
};


export default DataTableHeader