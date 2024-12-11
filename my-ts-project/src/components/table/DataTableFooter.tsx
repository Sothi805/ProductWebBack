/* eslint-disable react-refresh/only-export-components */
import React from "react";
import { ReactComponent as FirstPage } from "@/assets/svg/first_page_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LastPage } from "@/assets/svg/last_page_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as PrevPage } from "@/assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as NextPage } from "@/assets/svg//chevron_right_FILL0_wght400_GRAD0_opsz24.svg"
import { Table, TableState } from "@tanstack/react-table";


const DataTableFotter = (
    { table, state, totalPage, onNextPage }
        : { table: Table<any>, state?: Partial<TableState> | undefined, totalPage: number, onNextPage?: () => void }) => {
    return <div className='flex py-[15px] rounded-md   items-center justify-between'>
        <div></div>
        <div className='pr-[30px] flex justify-end items-center' >
            <div className='flex gap-4 items-center mr-10'>
                <span className='text-[15px] font-semibold'>Row Per Page</span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                    className="select select-bordered text-[15px] min-h-[1rem] max-h-[2.2rem] w-20 py-0 h-10">
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </select>
            </div>
            <span className='mr-10 text-[15px] font-semibold'>Page {state!.pagination!.pageIndex + 1} of {totalPage}</span>
            <PaginationButton
                disabled={!table.getCanPreviousPage()}
                icon={<FirstPage className='w-[20px] text-white' fill={!table.getCanPreviousPage() ? 'grey' : 'black'} />}
                onClick={() => table.setPageIndex(0)}
                role={!table.getCanPreviousPage() ? '' : 'button'}
            />
            <PaginationButton
                disabled={!table.getCanPreviousPage()}
                icon={<PrevPage className='w-[20px] text-white' fill={!table.getCanPreviousPage() ? 'grey' : 'black'} />}
                onClick={() => table.previousPage()}
                role={!table.getCanPreviousPage() ? '' : 'button'}
            />
            <PaginationButton
                disabled={!table.getCanNextPage()}
                icon={<NextPage className='w-[20px] text-white' fill={!table.getCanNextPage() ? 'grey' : 'black'} />}
                onClick={onNextPage}
                role={!table.getCanNextPage() ? '' : 'button'}
            />

            <PaginationButton
                disabled={!table.getCanNextPage()}
                icon={<LastPage className='w-[20px] text-white' fill={!table.getCanNextPage() ? 'grey' : 'black'} />}
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                role={!table.getCanNextPage() ? '' : 'button'}
            />
        </div>
    </div>;
}

export default React.memo(DataTableFotter);



const PaginationButton = ({ role, onClick, disabled, icon }: { role?: React.AriaRole | undefined, onClick?: () => void, disabled?: boolean, icon: React.ReactNode }) => <div
    className={` hover:text-white py-[2px] border  ${disabled ? 'border-gray-200 bg-gray-100' : 'border-gray-300 hover:bg-gray-300'} transition-all duration-300 mr-2  pr-2 gap-1 px-3  rounded-md flex items-center justify-center`}
    onClick={onClick}
    role={role}
>
    {icon}
    {/* <FirstPage className='w-[20px] text-white' fill={!disabled ? 'grey' : 'black'} /> */}
</div>