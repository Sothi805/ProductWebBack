
import React from 'react'

interface TabbuttonProps{
  active: boolean,
  onClick: () => void,
  children: React.ReactNode
}
const Tabbutton = (props: TabbuttonProps) => {
  return (
    <li onClick={props?.onClick} className={`${props?.active ? "border-b-[3px] border-[#16A249] font-bold text-[#16A249]" : ""} cursor-pointer pb-2 `}>{props?.children}</li>
  )
}

export default Tabbutton