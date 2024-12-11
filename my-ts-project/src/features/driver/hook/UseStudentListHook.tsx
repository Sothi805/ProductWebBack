// import { AuthorizationContext } from "@/contexts/useAuthorizationContext";

import request from "@/services";
import React, { useCallback, useState } from "react";
import { useQuery } from "react-query";
import { Sheet } from "@/lib/excell/type";
import { exportDefaulExcelTemplate } from "@/lib/excell/Export_excell";
import { useParams } from "react-router-dom";
import { displayTextDate } from "@/utilies";
import { showTextStatus } from "../pages/ProductMasterPages";

export const UseListHook = () => {
  const [filter, setFilter] = useState<any>({}); // Initialize as an empty object
  const [waiting, setWaiting] = React.useState(false);
  const [refresh, setRefresh] = useState(0);
  const { id } = useParams();

  const dataQuery = useQuery({
    queryKey: [`form_${JSON.stringify(filter)}` + id + refresh],
    queryFn: () =>
      request(
        "GET",
        `/form${
          Object.keys(filter).length === 0
            ? ""
            : "?$filter=" + JSON.stringify(filter)
        }`
      ),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const data: any = React.useMemo(() => {
    return (dataQuery?.data as any)?.data ?? [];
  }, [dataQuery, filter]);

  const totalRecords: number = React.useMemo(
    () => (dataQuery?.data as any)?.data?.length ?? 0,
    [dataQuery]
  );

  const loading: boolean = React.useMemo(() => {
    return dataQuery.isFetching || dataQuery.isLoading;
  }, [dataQuery.isFetching, dataQuery.isLoading]);

  const exportExcelTemplate = useCallback(async () => {
    setWaiting(true);
    const reponse: any = await request("GET", `/form`);
    const lists: string[][] = [];
    const arr: any[] = reponse?.data ?? ([] as any[]);
    for (const [_index, product] of arr?.entries()) {
      lists.push([
        product.product_name,
        product.product_type,
        product.title,
        showTextStatus(product.status),
        displayTextDate(product.createdAt?.split("T")[0]),
      ]);
    }
    //
    const headers = [
      "Product Name",
      "Product Type",
      "Title",
      "Status",
      "Created Date",
    ];
    const sheet: Sheet = {
      filename: "Product Excell",
      sheetName: "Products",
      header: {
        value: headers.map((e) => ({ value: e })),
        startCol: 1,
        startRow: 7,
      },
      body: {
        value: lists,
      },
    };
    await exportDefaulExcelTemplate(sheet);
    // setLoadingDialog(false);
    setWaiting(false);
  }, []);

  return {
    data,
    totalRecords,
    loading,
    setFilter,
    // setSort,
    refresh,
    setRefresh,
    exportExcelTemplate,
    waiting,
  };
};
