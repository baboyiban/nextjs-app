"use client";

import { useState } from "react";
import SearchTableSection from "@/app/components/search/search-table-section";
import { Column } from "@/app/components/data/data-table";

type TableWithSearchProps<T> = {
  initialData: T[];
  columns: Column<T>[];
  apiPath: string;
  emptyMessage?: string;
};

export default function TableWithSearch<T>({
  initialData,
  columns,
  apiPath,
}: TableWithSearchProps<T>) {
  const [data, setData] = useState(initialData);

  return (
    <SearchTableSection
      fields={columns.map(({ header, accessor }) => ({
        key: accessor as string,
        label: header,
      }))}
      setDataAction={setData}
      apiPath={apiPath}
      data={data}
      columns={columns}
    />
  );
}
