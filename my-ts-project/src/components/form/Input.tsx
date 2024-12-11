import React from "react";
import { ReactComponent as CopyIcon } from "@/assets/svg/copy.svg";

type InputProps = {
  onChange?: any;
  readOnly?: boolean;
  label?: string;
  endIcon?: boolean;
  handlerClick?: () => void;
  inputProps?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  className?: string;
  placeholder?: string;
  value?: any;
  defaultValue?: any;
  error?: boolean;
  errorText?: string;
  onBlur?: any;
  type?: any;
  key?:any
};

export default function Input(props: InputProps) {
  return (
    <div
      className={`form-control flex flex-col item-center gap-2 ${props.className}`}
    >
      {props?.label && (
        <label
          htmlFor="search"
          className={`${
            props.error ? "text-black-400" : "text-gray-800 font-semibold"
          } text-base`}
        >
          {props?.label}{" "}
          {props.inputProps?.required && (
            <span className=" text-red-500">*</span>
          )}
        </label>
      )}
      <div className="relative">
        <input
        key={props?.key}
          onChange={props?.onChange}
          readOnly={props?.readOnly}
          placeholder={props.label || props.placeholder}
          {...props.inputProps}
          required={false}
          className={`input focus:border-gray-400 input-bordered input-sm text-[14px] w-full ring-0 bg-white rounded-[4px] ${
            props.error
              ? "border border-red-400 focus:border-red-400"
              : "border"
          }`}
        />
        {props.handlerClick ? (
          <div
            role="button"
            onClick={props.handlerClick}
            className="btn btn-square btn-xs text-gray-600 bg-transparent border-none hover:bg-gray-200 absolute right-4 top-[6px] flex items-center justify-center"
          >
            {props?.endIcon ?? (
              <CopyIcon width={18} className="ml-1" strokeWidth={2.5} />
            )}
          </div>
        ) : null}
      </div>
      {props?.error && (
        <span className="text-red-400 whitespace-nowrap text-sm my-1">
          {props.errorText}
        </span>
      )}
    </div>
  );
}
