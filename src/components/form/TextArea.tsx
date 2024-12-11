

import React from 'react'

type InputProps = {
    label?: string,
    endIcon?: JSX.Element,
    handlerClick?: () => void,
    inputProps?: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    className?: string,
    placeholder?: string,
    value?: any,
    defaultValue?: any,
    error?: boolean,
};


export default function TextArea(props: InputProps) {
    return (
        <div className={`form-control flex flex-col item-center gap-2 ${props.className}`}>
            {props?.label && <label htmlFor="search" className="text-gray-500 text-base">{props?.label}</label>}

            <div className="w-full h-full">
                <textarea placeholder={props.placeholder ?? 'Remarks'} className="w-full h-full textarea textarea-bordered textarea-dm" {...props.inputProps}></textarea>
            </div>
        </div>
    )
}
