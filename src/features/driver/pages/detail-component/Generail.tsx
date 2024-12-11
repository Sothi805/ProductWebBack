import React from "react";

const Generail = ({ data }: any) => {
  return (
    <div className="frm-animation">
      <div className="flex justify-between items-center pr-5">
        <h1 className="font-black ml-1 text-[15px] flex items-center uppercase mt-8 pb-2 text-center">
          Product Information
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            fill="currentColor"
            className="bi ml-3 -mt-[0] text-blue-500 bi-patch-check-fill"
            viewBox="0 0 16 16"
          >
            <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
          </svg>
        </h1>
      </div>
      <div className="p-5 pl-[25px] mt-[20px] border shadow-md shadow-slate-200 rounded-md pb-[40px] w-full bg-white overflow-x-auto">
        <span className="m-3 flex mt-1 mb-5 font-black text-md pb-5 items-center gap-3 border-gray-200 border-b-[1px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bookmark"
            viewBox="0 0 16 16"
          >
            <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
          </svg>
          <span>General Detail</span>
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-3 rounded-md">
            {[
              ["Product Name", data?.product_name],
              ["Product Type", data?.product_type],
              ["Status", data?.status],
              ["Label", data?.label],
              ["Title", data?.title],
              ["Sub Title", data?.sub_title],
              ["Description", data?.description],
            ].map(([label, value], index) => (
              <div key={index} className="flex items-center mt-4">
                <label className="mr-5 flex justify-between w-[160px] text-[15px] text-slate-500 truncate">
                  {label} <span>:</span>
                </label>
                <span className="text-[15px] font-black overflow-hidden text-ellipsis">
                  {value || "N/A"}
                </span>
              </div>
            ))}
          </div>
          <div className="p-3 rounded-md">
            {[
              ["Total Price $", data?.total_price],
              ["Discount %", data?.discount],
              ["Total Before Discount $", data?.total_before_discount],
            ].map(([label, value], index) => (
              <div key={index} className="flex items-center mt-4">
                <label className="mr-5 flex justify-between w-[160px] text-[15px] text-slate-500 truncate">
                  {label} <span>:</span>
                </label>
                <span className="text-[15px] font-black overflow-hidden text-ellipsis">
                  {value || "N/A"}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <div className="w-[10rem] h-[12rem] border flex justify-center items-center">
              <span>Image</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generail;
