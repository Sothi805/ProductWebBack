import Input from "@/components/form/Input";
import { useEffect, useMemo } from "react";
import Status from "./StatusSelect";
import ProductType from "./ProductType";
import { Controller } from "react-hook-form";

const General = (props: any) => {
  const discounted = useMemo(() => {
    const discountAmount =
      ((props?.watch("discount") ?? 0) / 100) *
      (props?.watch("total_before_discount") ?? 0);
    const total = (props?.watch("total_before_discount") ?? 0) - discountAmount;
    return total;
  }, [props?.watch("discount"), props?.watch("total_before_discount")]);
  useEffect(() => {
    props?.setValue("total_price", discounted);
  }, [discounted]);

  return (
    <div className="frm-animation">
      <div className="p-5 pl-[25px] mt-[20px] border shadow-md shadow-slate-200 rounded-md pb-[40px] w-[98%] bg-white">
        <span className="m-3 flex mt-1 mb-5 font-bold text-md pb-5 items-center gap-3 border-gray-200 border-b-[1px]">
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
          <span>Information Form</span>
        </span>
        <div className=" mx-3 w-full grid grid-cols-2 gap-[100px]">
          <div className="">
            <div className="flex items-center mt-4 ">
              <label
                htmlFor=""
                className="mr-5  w-[35%] flex justify-between text-[15px] text-slate-500"
              >
                Product Name
              </label>
              <div className="text-[15px] w-[65%] font-bold">
                <Input
                  inputProps={{
                    ...props?.register(`product_name`),
                  }}
                  placeholder="Product Name"
                />
              </div>
            </div>
            <div className="flex items-center mt-4 ">
              <label
                htmlFor=""
                className="mr-5  w-[35%] flex justify-between text-[15px] text-slate-500"
              >
                Product Type
              </label>
              <div className="text-[15px] w-[65%] font-bold">
                <Controller
                  name="product_type"
                  control={props?.control}
                  render={({ field }) => {
                    return (
                      <ProductType
                        {...field}
                        placeholder="Product Type"
                        onChange={(e) => {
                          props?.setValue(`product_type`, e?.value);
                        }}
                      />
                    );
                  }}
                />
              </div>
            </div>
            <div className="flex items-center mt-4 ">
              <label
                htmlFor=""
                className="mr-5  w-[35%] flex justify-between text-[15px] text-slate-500"
              >
                Status
              </label>
              <div className="text-[15px] w-[65%] font-bold">
              <Controller
                  name="status"
                  control={props?.control}
                  render={({ field }) => {
                    return (
                      <Status
                      {...field}
                      placeholder="Status"
                      onChange={(e) => {
                        props?.setValue(`status`, e?.value);
                      }}
                    />
                    );
                  }}
                />
              
                {/* <Input
                  inputProps={{
                    ...props?.register(`status`),
                  }}
                  placeholder="Status"
                /> */}
              </div>
            </div>

            <div className="flex items-center mt-4 ">
              <label
                htmlFor=""
                className="mr-5  w-[35%] flex justify-between text-[15px] text-slate-500"
              >
                Label
              </label>
              <div className="text-[15px] w-[65%] font-bold">
                <Input
                  inputProps={{
                    ...props?.register(`label`),
                  }}
                  placeholder="Label"
                />
              </div>
            </div>
            <div className="flex items-center mt-4 ">
              <label
                htmlFor=""
                className="mr-5  w-[35%] flex justify-between text-[15px] text-slate-500"
              >
                Title
              </label>
              <div className="text-[15px] w-[65%] font-bold">
                <Input
                  inputProps={{ ...props?.register("title") }}
                  placeholder="Title"
                />
              </div>
            </div>
            <div className="flex items-center mt-4 ">
              <label
                htmlFor=""
                className="mr-5  w-[35%] flex justify-between text-[15px] text-slate-500"
              >
                Sub Title
              </label>
              <div className="text-[15px] w-[65%] font-bold">
                <Input
                  inputProps={{ ...props?.register("sub_title") }}
                  placeholder=" Sub Title"
                />
              </div>
            </div>
            <div className="flex items-center mt-4 ">
              <label
                htmlFor=""
                className="mr-5  w-[35%] flex justify-between text-[15px] text-slate-500"
              >
                Description
              </label>
              <div className="text-[15px] w-[65%] font-bold">
                <Input
                  inputProps={{ ...props?.register("description") }}
                  placeholder="Description"
                />
              </div>
            </div>
          </div>
          <div className="">
            <div className="w-[10rem] h-[12rem] border flex items-center justify-center">
              <span>Image</span>
            </div>
            <div className="flex items-center mt-4 ">
              <label
                htmlFor=""
                className="mr-5  w-[35%] flex justify-between text-[15px] text-slate-500"
              >
                Total Price $
              </label>
              <div className="text-[15px] w-[65%] font-bold">
                <Input
                  readOnly={true}
                  inputProps={{ ...props?.register("total_price") }}
                  placeholder="Total Price"
                />
              </div>
            </div>
            <div className="flex items-center mt-4 ">
              <label
                htmlFor=""
                className="mr-5  w-[35%] flex justify-between text-[15px] text-slate-500"
              >
                Discount %
              </label>
              <div className="text-[15px] w-[65%] font-bold">
                <Input
                  inputProps={{ ...props?.register("discount") }}
                  placeholder="Discount"
                />
              </div>
            </div>
            <div className="flex items-center mt-4 ">
              <label
                htmlFor=""
                className="mr-5  w-[35%] flex justify-between text-[15px] text-slate-500"
              >
                Total Before Discount $
              </label>
              <div className="text-[15px] w-[65%] font-bold">
                <Input
                  inputProps={{ ...props?.register("total_before_discount") }}
                  placeholder="Total Before Discount"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default General;
