import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { AdditionalType, OptionType, sleep } from "./load_option";
import React from "react";
import shortid from "shortid";
type SelectInputProp = {
  error?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export type CustomAsyncSelect2Props = {
  options: OptionType[];
  perPage?: number;
  hasMore?: boolean;
  nextPage?: (next: number) => void;
  defaultValue?: string | undefined;
  onChange?: (value: any) => void;
  loading?: boolean;
  optionLabel: string;
  optionValue: string;
  placeholder?: string;
  error?: boolean;
  inputProps?: SelectInputProp;
  isMulti?: boolean;
  onBlur?: any;
};

export function CustomAsyncSelect2(props: CustomAsyncSelect2Props) {
  const [key, setKey] = React.useState<string>("");
  const [value, onChange] = useState<OptionType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(loading);

  React.useEffect(() => {
    setKey(shortid.generate());
    setLoading(props.loading ?? true);
  }, [props.loading, props.options]);

  const loadPageOptions = async (
    q: string,
    _prevOptions: unknown,
    { page }: AdditionalType
  ) => {
    const { options, hasMore } = await loadOptions(q, page);

    return {
      options,
      hasMore,
    };
  };

  const loadOptions = async (search: string, page: number) => {
    setLoading(true);
    await sleep(500);

    let filteredOptions: OptionType[];
    if (!search) {
      filteredOptions = props.options;
    } else {
      const searchLower = search.toLowerCase();

      filteredOptions = props.options.filter((option: any) =>
        option[props.optionLabel]?.toLowerCase().includes(searchLower)
      );
    }

    const hasMore =
      Math.ceil(filteredOptions.length / (props.perPage ?? 10)) > page;
    const slicedOptions = filteredOptions.slice(
      (page - 1) * 0,
      page * (props.perPage ?? 10)
    );

    setLoading(false);

    return {
      options: slicedOptions,
      hasMore,
    };
  };

  const onListenChange = (newValue: any) => {
    if (props.onChange) {
      props.onChange(newValue);
    }
    onChange(newValue);
  };

  const getValue = React.useMemo(() => {
    setKey(shortid.generate());
    if (!props.inputProps?.value) return value;
    return props.options.find(
      (e: any) => props.inputProps?.value === e[props.optionValue]
    );
  }, [props.inputProps?.value, value]);

  return (
    <div>
      <AsyncPaginate
        key={key}
        isMulti={props.isMulti}
        styles={{
          control: (provided: any, state: any) => ({
            ...provided,
            borderRadius: "4px",
            border: props?.inputProps?.error
              ? "solid 1px rgb(248 113 113)"
              : "",
            height: "1.8rem !important",
            boxShadow: state.isFocused ? "0 0 0 " : null,
            minHeight: "2rem",
            fontSize: "14px",
          }),
          menuList: (provided: any, state: any) => ({
            ...provided,
            borderRadius: "4px",
            border: props?.inputProps?.error
              ? "solid 1px rgb(248 113 113)"
              : "",
            boxShadow: state.isFocused ? "0 0 0 " : null,
            fontSize: "14px",
          }),
          option: (provided: any, state: any) => {
            return {
              ...provided,
              opacity: 100,
              backgroundColor: state.isFocused ? "#4284C7" : null,
              color: state.isFocused ? "white" : null,
              ":hover": {
                cursor: "pointer",
                backgroundColor: "#4284C7",
              },
              ":active": {
                backgroundColor: "#4284C7",
              },
            };
          },
          input: (provided: any, state: any) => ({
            ...provided,
            paddingBottom: "0px",
          }),
        }}
        {...props.inputProps}
        placeholder={props?.placeholder ?? "Select .."}
        // isLoading={loading}
        debounceTimeout={500}
        value={getValue}
        defaultValue={props?.defaultValue}
        loadOptions={loadPageOptions as any}
        getOptionLabel={(option: any) => option[props.optionLabel]}
        getOptionValue={(option: any) => option[props.optionValue]}
        onChange={onListenChange}
        onBlur={props?.onBlur}
        additional={{
          page: 10,
        }}
      />
    </div>
  );
}
