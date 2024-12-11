import React, { Fragment } from "react";
import { ReactComponent as ArrowIcon } from "@/assets/svg/chevron-down.svg";
import { ReactComponent as FolderIcon } from "@/assets/svg/folder.svg";
import { useLocation, useNavigate } from "react-router-dom";

type HeadingContent = {
  label: string;
  value: string;
};

const FormHeader = ({
  content,
  taps,
  onClick,
  detail,
}: {
  taps: string[];
  detail?: boolean;
  title?: string;
  breadcrums?: string[];
  content?: HeadingContent[];
  onClick?: (index: number) => void;
}) => {
  const [collapse, setCollapse] = React.useState(false);
  const [active, setActive] = React.useState(0);

  const nav = useNavigate();

  const location = useLocation();

  const handlerTap = (index: number) => {
    setActive(index);

    if (onClick !== undefined) {
      onClick(index);
    }
  };

  const breadcrum = React.useMemo(
    () =>
      location.pathname
        .split("/")
        .splice(1, location.pathname.split("/").length),
    [location]
  );

  return (
    <div className="sticky z-10 top-0 w-[100%] px-6 bg-white flex flex-col border shadow-sm ">
      <div className="grow w-full p-3 pb-0 relative overflow-auto whitespace-nowrap">
        <div className="border-b pb-3 flex text-lg gap-3 items-center">
          <FolderIcon className="w-[0.8rem] h-[0.8rem]" />
          <span className="text-[15px]">Home</span>
          <ArrowIcon className="w-[0.8rem] -rotate-90 " strokeWidth={2} />
          {breadcrum.map((e, index) => (
            <Fragment key={index}>
              <FolderIcon className="w-[0.8rem] h-[0.8rem]" />
              <span className="flex items-end capitalize  text-[15px]">
                {e.replace("-", " ")}{" "}
              </span>
              {index !== breadcrum.length - 1 && (
                <ArrowIcon className="w-[0.8rem] -rotate-90 " strokeWidth={2} />
              )}
            </Fragment>
          ))}
          {detail && (
            <div className="text-right w-full">
              <span
                onClick={() => nav("edit")}
                className="btn btn-sm px-4 btn-primary rounded-md"
              >
                Edit
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </span>
            </div>
          )}
        </div>
        <ul
          className={`flex gap-10 transition-all duration-150 ${
            collapse || content === undefined ? "h-0 p-0" : "py-4"
          }  overflow-hidden`}
        >
          {content?.map((e, index) => (
            <li key={index} className="flex gap-y-3 flex-col gap-1">
              <span>{e.label}</span>
              <span className="font-black text-[14px] uppercase">
                {e.value}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div
        className={`w-full ${
          taps.length !== 0 && collapse ? "" : "border-t"
        } relative`}
      >
        {content !== undefined ? (
          <div
            role="button"
            onClick={() => setCollapse(!collapse)}
            className=" bg-white border rounded-[4px] w-7 h-7 hover:bg-gray-200 absolute left-[50%] -top-[13px]"
          >
            <ArrowIcon className="w-[1.5rem]" strokeWidth={3} />
          </div>
        ) : null}

        <ul className="flex">
          {taps.map((e, index) => (
            <li
              key={index}
              role="button"
              onClick={() => handlerTap(index)}
              className={`p-3 py-2 transition-all duration-100 rounded-[2px] hover:bg-sky-100 border-b-4  ${
                index === active
                  ? " border-b-sky-500 font-black text-sky-600"
                  : "border-b-white"
              }`}
            >
              <span> {e}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default React.memo(FormHeader);
