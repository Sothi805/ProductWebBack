export type OptionType = {
  value: any;
  label: string;
};

export type AdditionalType = {
  page: number;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, ms);
  });
