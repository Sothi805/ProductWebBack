import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Alert from "@/components/alerts";
import FormMessageModal from "@/components/dialog/FormMessageModal";
import LoadingDialog from "@/components/dialog/LoadingDialog";
import FormHeader from "@/components/form/FormHeader";
import General from "./form-component/General";
import { useParams } from "react-router-dom";
import request from "@/services";
import { showTextStatus } from "./ProductMasterPages";

const alertRef = React.createRef<Alert>();
const modalRef = React.createRef<FormMessageModal>();
const DriverForm = (props: any) => {
  const [state, setState] = useState<any>({
    isLoading: true,
    isSubmitting: false,
    tabIndex: 0,
  });
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const { register, watch, handleSubmit, reset, control, setValue, setError } =
    useForm();

    const onSubmit = async (payload: any) => {
      try {
        setLoading(true);
        const url = props?.edit ? `form/${id}` : `form`;
        const response: any = await request(props?.edit ? "PATCH" : "POST", url, payload
        );
        setLoading(false);
        if (!response.data && typeof response !== "string") {
          modalRef.current?.error("Error");
          return;
        }
  
        modalRef.current?.success(`${props?.edit ? "Updated" : "Created"} Successfully.`, response?.data?.DocEntry);
      } catch (error: any) {
        setLoading(false);
        console.log("Error details:", error);
        modalRef.current?.error(error);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    if (!props?.edit) return;
    setLoading(true);
    request("GET", `form/${id}`)
      .then((res: any) => {
        setLoading(false);
        reset({ ...res.data }, { keepValues: false });
      })
      .catch((e: any) => {
        setLoading(false);
        modalRef.current?.error(e);
      });
  }, [id, props?.edit]);
  // const onInvalidForm = (invalids: any) => {
  //   console.log(invalids);

  //   modalRef.current?.error(
  //     invalids[Object.keys(invalids)[0]]?.message?.toString() ??
  //       "Oop something wrong!",
  //     "Invalid Value"
  //   );
  // };
  const onInvalidForm = (invalids: any) => {
    // if (invalids?.address_line?.length > 0) {
    //   for (const invs of invalids?.address_line) {
    //     for (const [key, inv] of Object.entries(invs ?? {}) as any) {
    //       modalRef.current?.error(inv?.message);
    //     }
    //   }
    //   return;
    // }
    modalRef.current?.error(
      invalids[Object.keys(invalids)[0]]?.message?.toString() ??
        "Oop something wrong!",
      "Invalid Value"
    );
  };
  return (
    <div className=" h-[100%] relative">
      <form onSubmit={handleSubmit(onSubmit, onInvalidForm)}>
        <LoadingDialog open={loading} />
        <Alert ref={alertRef} />
        <FormMessageModal ref={modalRef} />
        <div>
          <FormHeader
            taps={["Basic Informations"]}
            content={[
              {
                label: "Product Name",
                value: `${watch("product_name") ?? ""}`,
              },
              {
                label: "Product Type",
                value: `${watch("product_type") ?? ""}`,
              },
              {
                label: "Status",
                value: `${showTextStatus(watch("status")) ?? ""}`,
              },
            ]}
            onClick={(index) => setState({ ...state, tabIndex: index })}
          />
          <div className="p-[30px] py-[10px]">
            {state.tabIndex === 0 && <General control={control} register={register} watch={watch} setValue={setValue}/>}
          </div>
        </div>
        <div className="absolute bottom-6 w-full md:fixed sm:w-[90%] px-8 ">
          <div className="backdrop-blur-sm bg-white p-2 rounded-lg shadow-lg z-[1000] flex justify-between gap-3 border drop-shadow-sm">
            <div className="flex items-center w-full justify-between">
              <button
                type="submit"
                className="btn rounded-md btn-transparant border-gray-300 btn-sm px-6"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn rounded-md btn-primary btn-sm px-6"
              >
                <span className="mr-1">+</span>
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default DriverForm;
