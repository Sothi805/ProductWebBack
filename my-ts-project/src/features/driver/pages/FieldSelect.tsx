

import DepartmentSelectBox from '@/components/form/DepartmentSelectBox';
import Input from '@/components/form/Input';
import { CustomAsyncSelect2 } from '@/interface/select2/CustomAsyncSelect'
import { SelectProps } from '@/type';

export default function FieldSelect(props: SelectProps) {
  const DropDown = [
    {
      label: "JobTitle",
      value: 'JobTitle'
    },
    {
      label: "Department",
      value: 'Department'
    },
    {
      label: "Position",
      value: 'Position'
    },
    {
      label: "Manager",
      value: 'Manager'
    },
    {
      label: "User Code",
      value: 'ApplicationUserID'
    },
    {
      label: "Sale Employee",
      value: 'SalesPersonCode'
    },
    {
      label: "Home Phone",
      value: 'HomePhone'
    },
    {
      label: "Cost Center",
      value: 'CostCenterCode'
    },
    {
      label: "Office Phone",
      value: 'OfficePhone'
    },
    {
      label: "Email",
      value: 'eMail'
    },
    {
      label: "Mobile Phone",
      value: 'MobilePhone'
    },

    {
      label: "Gender",
      value: 'Gender'
    },

    {
      label: "ID No.",
      value: 'IdNumber'
    },
    {
      label: "Salary",
      value: 'Salary'
    },

  ]

  return (
    <>
      <CustomAsyncSelect2
        inputProps={props}
        options={DropDown}
        perPage={10}
        placeholder='Field Name'
        optionLabel='label'
        optionValue='value'
        onChange={props?.onChange}
      />
    </>
  )
}
