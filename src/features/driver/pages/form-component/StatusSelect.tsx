

import { CustomAsyncSelect2 } from '@/interface/select2/CustomAsyncSelect'
import { SelectProps } from '@/type';

export default function Status(props: SelectProps) {
  const DropDown = [
    {
      label: "Pre Order",
      value: 'Pre_Order'
    },
    {
      label: "In Stock",
      value: 'In_Stock'
    },
    {
      label: "Out of Stock",
      value: 'Out_of_Stock'
    },
  ]

  return (
    <>
      <CustomAsyncSelect2
        inputProps={props}
        options={DropDown}
        perPage={10}
        placeholder={props?.placeholder}
        optionLabel='label'
        optionValue='value'
        onChange={props?.onChange}
      />
    </>
  )
}
