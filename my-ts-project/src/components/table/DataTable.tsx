import React, { Fragment } from 'react'
import {
    flexRender, GroupingState, getExpandedRowModel, getFilteredRowModel, getGroupedRowModel, ColumnOrderState, SortingState, getSortedRowModel, getCoreRowModel, getPaginationRowModel, useReactTable,
} from '@tanstack/react-table'
import ColumnHeader from './ColumHeader'
import DataTableFooter from './DataTableFooter';
import DataTableHeader from './DataTableHeader';
import shortid from 'shortid';


interface TanStackDataTableProps {
  data: any[];
  columns: any[];
  count: number;
  topHeader?: React.ReactNode;
  topActions?: JSX.Element[];
  loading?: boolean;
  title?: string;
  onNextPage?: (index: number) => void;
  onPreviousPage?: (index: number) => void;
  onLastPage?: () => void;
  onFirstPage?: () => void;
  titleHeaderTable: string;
  refetchData: () => void;
  exportExcelTemplate:()=>void
}




const TanStackDataTable = (props: TanStackDataTableProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState({})
    const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>(
        props?.columns.map((column: any) => column?.accessorKey as string) //must start out with populated columnOrder so we can splice
    )
    const [grouping, setGrouping] = React.useState<GroupingState>([])

    const newCols = React.useMemo(() => {

        return [
            // {
            //     accessorKey: 'select',
            //     size: 2,
            //     minSize: 2,
            //     maxSize: 2,
            //     enableSorting: false,
            //     header: ({ table }: any) => (
            //         <input
            //             type="checkbox"
            //             className="checkbox mx-auto mt-[5px] ml-1 border-slate-400 checkbox-sm checkbox-secondary border-1"
            //             {...{
            //                 checked: table.getIsAllRowsSelected(),
            //                 indeterminate: table.getIsSomeRowsSelected(),
            //                 onChange: table.getToggleAllRowsSelectedHandler(),
            //             }}
            //         />
            //     ),
            //     cell: ({ row }: any) => (
            //         <div className="px-1">
            //             <input
            //                 className={`checkbox mt-[5px] checkbox-sm border-slate-400 checkbox-secondary border-1`}
            //                 type="checkbox"
            //                 {...{
            //                     checked: row.getIsSelected(),
            //                     disabled: !row.getCanSelect(),
            //                     indeterminate: row.getIsSomeSelected(),
            //                     onChange: row.getToggleSelectedHandler(),
            //                 }}
            //             />
            //         </div>
            //     ),
            // },
            ...props.columns
        ];

    }, [props.data, props.columns])


    const [rowSelection, setRowSelection] = React.useState({})
    const table = useReactTable<any>({
        data: props?.data,
        columns: newCols,
        columnResizeMode: "onChange",
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: true,
        enableRowSelection: true,
        enableMultiRowSelection: true,
        state: {
            columnOrder,
            sorting,
            columnVisibility,
            grouping,
            rowSelection,
        },
        onRowSelectionChange: setRowSelection,
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder,
        onGroupingChange: setGrouping,
        getFilteredRowModel: getFilteredRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
    })


    const [state, setState] = React.useState(table.initialState);
    table.setOptions((prev: any) => {
        return {
            ...prev,
            enableRowSelection: true,
            enableMultiRowSelection: true,
            state: {
                ...state,
                columnOrder: ['select', ...columnOrder],
                columnVisibility: columnVisibility,
                grouping: grouping,
                rowSelection,

            },
            onRowSelectionChange: setRowSelection,
            onStateChange: setState,
            debugTable: state.pagination.pageIndex > 2,
            onColumnVisibilityChange: setColumnVisibility,
            onColumnOrderChange: props.loading ? null : setColumnOrder,
        };
    });


    const onNextPage = React.useCallback(() => {

        if (!table.getCanNextPage()) return;

        table.nextPage();
        if (props?.onNextPage) {
            props.onNextPage(state.pagination.pageIndex);
        }
    }, [state.pagination]);



    const totalPage = React.useMemo(() => Math.ceil(props.data.length / 10), [props.data]);


    return (
      <div className="w-full h-full relative">
        <div className="relative data-table  p-4 whitespace-nowrap overflow-hidden border bg-white rounded-lg shadow-sm border-slate-200 ">
          {props.loading ? (
            <div className="absolute top-0 left-0 w-full h-full bg-black/6 shadow-lg rounded-md z-10 flex justify-start items-center">
              {/* <span className="loading loading-spinner loading-lg opacity-100 z-30 m-auto"></span> */}
            </div>
          ) : null}

          <DataTableHeader
           loading={props?.loading}
            refetchData={props?.refetchData}
            title={props?.titleHeaderTable}
            table={table}
            exportExcelTemplate={props?.exportExcelTemplate}
          />

          {/*  */}
          <div className="w-[full] overflow-x-auto ">
            <table className="w-full text-md mt-4 ">
              <thead>
                {table
                  .getHeaderGroups()
                  .map((headerGroup, index: number): any => (
                    <tr
                      key={`${shortid.generate()}_${index}`}
                      className="overflow-x-hidden shadow-slate-200"
                    >
                      {headerGroup.headers.map((header, index) => {
                        return (
                          <Fragment>
                            <ColumnHeader
                              key={header?.id}
                              header={header}
                              table={table}
                              loading={props.loading ?? false}
                              index={index}
                            />
                          </Fragment>
                        );
                      })}
                    </tr>
                  ))}
              </thead>
              <tbody>
                {props.loading ? (
                  Array.from({ length: 10 }).map((e, index) => {
                    return (
                      <tr
                        className={`hover:bg-[#f9f9f9] transition-all duration-500" `}
                      >
                        {table.getHeaderGroups()[0].headers.map((e, index) => (
                          <td
                            className={`marker:flex px-[15px] ${
                              index === 0 ? "w-[0px]" : ""
                            } relative  text-[15px] text-gray-600 text-left border-b-[1px] border-[#E0E0E0] `}
                          >
                            {/* <Skeleton width={Math.floor(Math.random() * (140 - 60 + 1) + 60)} variant="text" sx={{ fontSize: '.8rem' }} /> */}
                            <div className={`animate-pulse flex space-x-4 `}>
                              <div className="flex-1 mt-3 items-center h-[30px] space-y-6 py-1">
                                <div
                                  style={{
                                    width: `${
                                      Math.floor(
                                        Math.random() * (100 - 60 + 1)
                                      ) + 60
                                    }%`,
                                  }}
                                  className={`h-3  bg-gray-200 rounded-lg `}
                                ></div>
                              </div>
                            </div>
                          </td>
                        ))}
                      </tr>
                    );
                  })
                ) : table.getRowModel().rows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={table.getHeaderGroups()[0].headers.length}
                      className="p-10 text-center  text-lg text-gray-400"
                    >
                      {" "}
                      No records for {props.title?.toLocaleLowerCase()}
                    </td>
                  </tr>
                ) : (
                  table.getRowModel().rows.map((row) => (
                    <tr
                      className={`hover:bg-[#edecec] h-[42px] transition-all duration-500" `}
                      key={row.id}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          {...{
                            key: cell.id,
                          }}
                          className="px-[15px] py-[7px]  text-[15px] text-gray-600 text-left border-b-[1px] border-[#E0E0E0] "
                          key={cell.id}
                        >
                          <div className="">
                            {cell.getIsGrouped() ? (
                              <div
                                className="flex items-center"
                                {...{
                                  onClick: row.getToggleExpandedHandler(),
                                  style: {
                                    cursor: row.getCanExpand()
                                      ? "pointer"
                                      : "normal",
                                  },
                                }}
                              >
                                <div className="mr-2">
                                  {row.getIsExpanded() ? (
                                    <span className="text-gray-300">
                                      FastForwardIcon
                                    </span>
                                  ) : (
                                    <span className="text-gray-300">
                                      FastForwardIcon
                                    </span>
                                  )}
                                </div>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                                <div className="ml-2">
                                  ({row.subRows.length})
                                </div>
                              </div>
                            ) : cell.getIsAggregated() ? (
                              flexRender(
                                cell.column.columnDef.aggregatedCell ??
                                  cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            ) : cell.getIsPlaceholder() ? null : (
                              flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <DataTableFooter
            table={table}
            state={state}
            totalPage={totalPage}
            onNextPage={onNextPage}
          />
        </div>
      </div>
    );
}
export default TanStackDataTable;








