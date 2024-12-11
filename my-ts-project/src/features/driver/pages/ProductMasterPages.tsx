import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "@/assets/svg/search.svg";
import { ReactComponent as FilterIcon } from "@/assets/svg/filter.svg";
import TanStackDataTable from "@/components/table/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/alerts";
import Input from "@/components/form/Input";
import { displayTextDate, getQueryString } from "@/utilies";
import { Controller, useForm } from "react-hook-form";
import { UseListHook } from "../hook/UseStudentListHook";
import LoadingDialog from "@/components/dialog/LoadingDialog";
import Status from "./form-component/StatusSelect";
const alertRef = React.createRef<Alert>();

export const showTextStatus = (e: string) => {
  switch (e) {
    case "Pre_Order":
      return "Pre Order";
    case "In_Stock":
      return "In Stock";
    case "Out_of_Stock":
      return "Out of Stock";
    default:
      return "";
  }
};
function DriverMasterPage() {
  const route = useNavigate();
  const { register, handleSubmit, reset, control, setValue } = useForm();

  const handleClear = () => {
    reset();
  };
  const {
    data,
    waiting,
    loading,
    refresh,
    setFilter,
    setRefresh,
    exportExcelTemplate,
  } = UseListHook();
  const onSubmit = (data: any) => {
    console.log(data);

    // Filter out empty or undefined values from the data object
    const cleanedFilter = Object.keys(data)
      .filter((key) => data[key] !== "" && data[key] !== undefined)
      .reduce((acc: any, key) => {
        acc[key] = data[key];
        return acc;
      }, {});

    // Update the filter state with the cleaned filter object
    setFilter(cleanedFilter);
  };

  const defaultColumns: ColumnDef<any>[] = React.useMemo(
    () => [
      {
        accessorKey: "No",
        header: "No.", //uses the default width from defaultColumn prop
        // enableClickToCopy: true,
        // enableFilterMatchHighlighting: true,
        size: 88,
        cell: (row: any) => {
          return <span>{row.cell.row.index + 1}</span>;
        },
      },
      {
        accessorKey: "product_name",
        header: "Product Name",
        // size: 200, //increase the width of this column
      },
      {
        accessorKey: "product_type",
        header: "Product Type",
        // size: 200, //increase the width of this column
      },
      {
        accessorKey: "title",
        header: "Title",
        // size: 200, //increase the width of this column
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: (row: any) => {
          return <span>{showTextStatus(row.cell.row.original?.status)}</span>;
        },
        // size: 200, //increase the width of this column
      },
      {
        accessorKey: "createdAt",
        header: "Created Date",
        cell: (row: any) => {
          return <span>{displayTextDate(row.getValue()?.split("T")[0])}</span>;
        },
        // size: 200, //increase the width of this column
      },
      {
        accessorKey: "id",
        header: "Action",
        footer: "Action",
        cell: (props): any => {
          const value: any = props?.getValue();
          return (
            <>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => route(props?.cell?.row?.original["_id"])}
                  className="w-[70px] rounded bg-white border shadow-md py-[5px] px-2 text-sm text-gray-700 data-[hover]:bg-gray-500 data-[active]:bg-sky-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi float-left mt-[0.5px] mr-1 text-gray-700 bi-bookmark-star"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.84 4.1a.178.178 0 0 1 .32 0l.634 1.285a.18.18 0 0 0 .134.098l1.42.206c.145.021.204.2.098.303L9.42 6.993a.18.18 0 0 0-.051.158l.242 1.414a.178.178 0 0 1-.258.187l-1.27-.668a.18.18 0 0 0-.165 0l-1.27.668a.178.178 0 0 1-.257-.187l.242-1.414a.18.18 0 0 0-.05-.158l-1.03-1.001a.178.178 0 0 1 .098-.303l1.42-.206a.18.18 0 0 0 .134-.098z" />
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                  </svg>
                  <span> {"View"}</span>
                </button>
                <button
                  onClick={() =>
                    route(props?.cell?.row?.original["_id"] + "/edit")
                  }
                  className="rounded w-[70px]  bg-white border py-[5px] px-2 text-sm text-gray-700 shadow-md data-[hover]:bg-sky-900 data-[active]:bg-sky-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi mt-[0.5px] float-left bi-pencil-square"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path
                      fillRule="evenodd"
                      d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                    />
                  </svg>
                  <span>{"Edit"}</span>
                </button>
              </div>
            </>
          );
        },
      },
    ],
    []
  );
  return (
    <>
      <Alert ref={alertRef} />
      <LoadingDialog open={waiting} />
      <div className="w-full h-full flex flex-col p-[25px] py-[20px]  gap-4 ">
        <h1 className="text-[1.20rem] text-gray-800">
          Home / Products / Product
        </h1>
        <div className="bg-white px-[30px] pt-[20px] pb-[30px] border rounded-md">
          <h1 className="text-[16px] mb-5 text-gray-700 flex gap-2 items-center">
            <FilterIcon
              className="w-[16px] h-[16px]"
              fill="white"
              strokeWidth={3}
            />
            Record Filter
          </h1>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between items-end relative">
              <div className="grow flex flex-wrap gap-3 items-end ">
                <div className="form-control w-2/12 flex flex-col gap-2">
                  <Input
                    inputProps={{
                      ...register("product_name"),
                    }}
                    placeholder="Product Name"
                  />
                </div>
                <div className="form-control w-2/12 flex flex-col gap-2">
                  <Input
                    inputProps={{
                      ...register("product_type"),
                    }}
                    placeholder="Product Type"
                  />
                </div>
                <div className="form-control w-2/12 flex flex-col gap-2">
                  <Controller
                    name="status"
                    control={control}
                    render={({ field }) => {
                      return (
                        <Status
                          {...field}
                          placeholder="Status"
                          onChange={(e) => setValue(`status`, e?.value)}
                        />
                      );
                    }}
                  />
                </div>
                <button className="hover:bg-sky-700 btn capitalize btn-sm rounded-md px-6 h-8 bg-primary text-[15px]  text-white flex gap-3 item-end justify-center">
                  <span className="m-auto">
                    <SearchIcon className="w-[16px]" strokeWidth={3} />
                  </span>
                  <span className="m-auto">Search</span>
                </button>
                <div
                  className="btn border-gray-300 rounded-md text-sky-500 border btn-sm px-[20px] capitalize text-base bg-transparent hover:bg-gray-100"
                  onClick={handleClear}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    fill="currentColor"
                    className="bi bi-stars"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
                  </svg>
                  Clear Filter
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="grow mt-4 ">
          <TanStackDataTable
            refetchData={() => setRefresh(refresh + 1)}
            data={data}
            loading={loading}
            columns={defaultColumns}
            count={500}
            title="Product Lists"
            exportExcelTemplate={exportExcelTemplate}
            titleHeaderTable="Products"
          />
        </div>
      </div>
    </>
  );
}

export default DriverMasterPage;
