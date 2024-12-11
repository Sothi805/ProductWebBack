
import {
    Column,
    ColumnOrderState,
    flexRender,
    Header,
    Table,
} from '@tanstack/react-table'
import React from 'react'
import { useDrag, useDrop } from 'react-dnd'


// Icons
import { ReactComponent as ArrowDownIcon } from "@/assets/svg/arrow-down.svg";

const ColumnHeader: React.FC<{
    header: Header<any, unknown>
    table: Table<any>,
    loading: boolean,
    index: number
}> = ({ header, table, loading, index }: any) => {
    const { getState, setColumnOrder } = table
    const { columnOrder } = getState()
    const { column } = header;

    const reorderColumn = (
        draggedColumnId: string,
        targetColumnId: string,
        columnOrder: string[]
    ): ColumnOrderState => {
        columnOrder.splice(
            columnOrder.indexOf(targetColumnId),
            0,
            columnOrder.splice(columnOrder.indexOf(draggedColumnId), 1)[0] as string
        );
        return [...columnOrder]
    }


    const [, dropRef] = useDrop({
        accept: 'column',
        drop: (draggedColumn: Column<any>) => {
            // console.log(draggedColumn.id, column.id, columnOrder)
            const newColumnOrder = reorderColumn(
                draggedColumn.id,
                column.id,
                columnOrder
            )
            setColumnOrder(newColumnOrder)
        },
    })

    const [{ isDragging }, dragRef] = useDrag({
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        item: () => column,
        type: 'column',
    })

    return (
      <th
        ref={dropRef}
        className={`relative text-gray-700 font-black border-[1px] p-[2px] overflow-x-hidden border-l-0 border-r-0 border-[#E0E0E0] px-[15px] text-[13.5px]`}
        colSpan={header?.colSpan}
        style={{
          width: header?.getSize(),
          opacity: isDragging ? 0.5 : 1,
        }}
        key={header.id}
      >
        <div
          className={`${
            loading ? "py-1" : ""
          } flex pl-3 items-center font-bold text-[15px] `}
        >
          {header.column.getCanGroup() ? (
            // If the header can be grouped, let's add a toggle
            <button
              {...{
                onClick: header.column.getToggleGroupingHandler(),
                style: {
                  cursor: "pointer",
                },
              }}
            ></button>
          ) : null}

          <div ref={dragRef} className="inline-block w-[auto] cursor-move">
            {header.isPlaceholder ? null : (
              <div className="flex justify-between">
                <div className="">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
                <div></div>
              </div>
            )}
          </div>
          <div
            {...{
              className: header.column.getCanSort()
                ? "cursor-pointer select-none ml-2 mt-1"
                : "hidden",
              onClick: header.column.getToggleSortingHandler(),
            }}
          >
            {{
              asc: !loading && (
                <button className="btn btn-xs btn-circle bg-transparent hover:bg-transparent border-none">
                  <ArrowDownIcon className="w-5 pl-1" />
                </button>
              ),
              desc: !loading && (
                <button className="btn btn-xs btn-circle bg-transparent hover:bg-transparent border-none rotate-180">
                  <ArrowDownIcon className="w-5 pl-1" />
                </button>
              ),
            }[header.column.getIsSorted() as string] ??
              (!loading && (
                <button className="btn btn-xs btn-circle bg-transparent hover:bg-transparent border-none">
                  <ArrowDownIcon className="w-5 pl-1" />
                </button>
              ))}
          </div>
        </div>
        <div
          className="absolute bg-gray-200 select-none touch-none cursor-col-resize w-[4px] rounded-full hover:bg-gray-300 top-[5px] right-2 h-[70%]"
          onMouseDown={header?.getResizeHandler()}
          onTouchStart={header?.getResizeHandler()}
        ></div>
      </th>
    );
}



export default ColumnHeader;