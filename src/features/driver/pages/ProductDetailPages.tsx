
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormHeader from "@/components/form/FormHeader";
import FormMessageModal from "@/components/dialog/FormMessageModal";
import LoadingDialog from "@/components/dialog/LoadingDialog";
import Generail from "./detail-component/Generail";
import request from "@/services";
import { showTextStatus } from "./ProductMasterPages";
interface stateProps {
  [x: string]: any;
  tapIndex: number;
  loading: boolean;
  message: string;
  isError: boolean;
}
const modalRef = React.createRef<FormMessageModal>();

const StudentDetailPages = () => {
  const [state, setState] = React.useState<stateProps>({
    tapIndex: 0,
    loading: true,
    message: "",
    isError: false,
  });
  const [loading, setLoading] = React.useState(false);
  const [student, setStudent] = useState<any>({});
  const { id } = useParams();
  const [small, setSmall] = useState(false);
  const handlerTap = (index: number) => {
    setState({ ...state, tapIndex: index });
  };
  useEffect(() => {
    setLoading(true);
    request("GET", `form/${id}`)
      .then((res: any) => {
        setLoading(false);
        setStudent(res?.data);
      })
      .catch((e: any) => {
        setLoading(false);
        modalRef.current?.error(e);
      });
  }, [id]);

  const tap = ["Product Information"];
  return (
    <div className="bg-slate-50">
      {
        <div className="frm-animation w-full">
          <LoadingDialog open={loading} />
          <FormHeader
            detail={true}
            taps={[]}
            content={[
              {
                label: "Product Name",
                value: `${student?.product_name ?? ""}`,
              },
              {
                label: "Product Type",
                value: `${student?.product_type ?? ""}`,
              },
              {
                label: "Status",
                value: `${showTextStatus(student?.status) ?? ""}`,
              },
            ]}
            onClick={(index) => setState({ ...state, tapIndex: index })}
          />
          <div className="flex gap-6">
            <div
              className={` ml-[20px] ${
                small ? "min-w-[50px]" : "min-w-[230px] "
              }`}
            >
              <div
                className={` ${
                  small ? "min-w-[50px] transition-all duration-300 pl-0" : "min-w-[230px]"
                } relative mt-[20px] -ml-[0px] p-2 mx-[20px] bg-white shadow-sm rounded-md border h-[70vh] flex flex-col`}
              >
                <span
                  className="absolute flex justify-center items-center -right-[10px] top-[20px] cursor-pointer w-[25px] rounded-full border border-gray-300 h-[25px] bg-white"
                  onClick={() => setSmall(!small)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    fill="currentColor"
                    className="bi bi-chevron-right"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                </span>

                {tap.map((e: any, index: number) => {
                  return (
                    <span
                      onClick={() => handlerTap(index)}
                      className={`hover:bg-sky-100 ${
                        state.tapIndex === index &&
                        "bg-sky-100 border-l-[3px] border-sky-500"
                      } p-[6px] ${
                        small ? "pl-3 font-black" : "px-[20px]"
                      } cursor-pointer flex items-center justify-between text-[15px]`}
                    >
                      {small ? e.split("")[0] : e}
                      {small ? null : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="10"
                          fill="currentColor"
                          className="bi bi-chevron-right float-right"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
            <div className="w-full ">
              {state.tapIndex === 0 && <Generail data={student} />}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default StudentDetailPages;
