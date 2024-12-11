
import { ReactComponent as DeleteIcon } from "@/assets/svg/delete_FILL0_wght400_GRAD0_opsz48.svg";

interface tableFormProps {
  columns: any[];
  data: any[];
}
const TableForm = (props: tableFormProps) => {
  return (
    <>
      <div className="w-[100%] px-2 bg-white mb-[30px] overflow-hidden rounded-md shadow-sm border">
        <table className="text-gray-600 font-bold w-[100%] ">
          <thead className=" rounded-lg">
            <tr className="border-b">
              {props?.columns?.map((column: any, index: any) => {
                return (
                  <td key={index + "_" + column} className={`py-2 ${index === 1 && 'w-[17rem]'}`}>
                    {column}
                  </td>
                );
              })}
            </tr>
          </thead>
          <tbody className="bg-white">
            <tr className="">
              <td className="text-center py-2 w-[50px]">
                <button title='""' className="btn mt-2 btn-ghost">
                  <span className="text-red-500">
                    <DeleteIcon
                      width={20}
                      className="cursor-pointer mx-auto text-red-500"
                    />
                  </span>
                </button>
              </td>
              {props?.data?.map((e: any, i: any) => {
                return (
                  <td key={i} className="pb-5 pt-[10px]">
                    {e?.cell}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableForm;
