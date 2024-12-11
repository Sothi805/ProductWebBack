

import { CustomAsyncSelect2 } from '@/interface/select2/CustomAsyncSelect'
import { SelectProps } from '@/type';

export default function ProductType(props: SelectProps) {
  const DropDown = [
    {
      label: "Electronics",
      value: 'Electronics'
    },
    {
      label: "Clothing",
      value: 'Clothing'
    },
    {
      label: "Furniture",
      value: 'Furniture'
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
