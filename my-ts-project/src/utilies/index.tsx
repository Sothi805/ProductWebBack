
import dayjs from "dayjs";

export const dateFormat = (str: string): string => str ?? 'N/A';

export const sleep = (ms: number) =>
    new Promise((resolve) => {
        setTimeout(() => {
            resolve(undefined);
        }, ms);
    });


export const getQueryString = (data: any): string => {
    let query = '$filter=';
    for (const key in data) {
        if (data[key] !== '' && data[key]) {
            query += `contains(${key}, '${data[key]}') and`
        }
    }

    if (query === '$filter=') return '';

    return query.substring(0, query.length - 3);
}

export const displayTextDate = (date:any) => {
  if (!date || date === "") return "";

  return dayjs(date).format("DD.MMM.YYYY");
};
