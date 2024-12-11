

import React from 'react'

type RemarkProps = {
  label?: string,
  inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  className?: string,
  placeholder?: string,
  value?: any,
  defaultValue?: any
};


export default function Remarks(props: RemarkProps) {
  return (
    <div className={`form-control flex flex-col gap-2 ${props.className}`}>
      <label htmlFor="search" className="text-gray-500 text-base">{props?.label}</label>
      <div className="relative">
        <input value={props?.value} defaultValue={props?.defaultValue} placeholder={props.label || props.placeholder} {...props.inputProps} className="input input-bordered input-sm w-full  bg-white border-2 rounded-lg" />
        {/* <textarea value={props?.value} defaultValue={props?.defaultValue} placeholder={props.label || props.placeholder} {...props.inputProps} className="input input-bordered input-sm w-full  bg-white border-2 rounded-lg">
          
      </textarea> */}
      </div>
    </div>
  )
}
