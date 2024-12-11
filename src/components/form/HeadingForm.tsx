import React from 'react'

type HeadingFormProps = {
    headers: string[],
    active: number,
    title: string,
    onClick: (index: number) => void
}


export default function HeadingForm(props: HeadingFormProps) {
    return (
        <div className="px-[30px] pt-[1rem] bg-white border-b">
            <h1 className="mt-2 mb-4 text-xl font-bold ">Create - {props.title}</h1>
            <hr className="mb-3" />
            <div className="w-full flex gap-4 overflow-auto"
            >
                {props.headers.map((e, index) => <div
                    role="button"
                    onClick={() => props.onClick(index)}
                    className={` whitespace-nowrap transition-all duration-75 pb-[0.5rem] px-3 ${index === props.active ? 'font-bold border-b-4 border-b-green-600' : 'border-b-4 border-b-transparent'}`}>
                    <span >{e}</span>
                </div>)}
            </div>
        </div>
    )
}
