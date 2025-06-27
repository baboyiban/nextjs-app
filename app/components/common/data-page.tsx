"use client";

import TableWithSearch from "./table-with-search";

type DataPageProps<T> = {
  initialData: T[];
  columns: any;
  apiPath: string;
};

export default function DataPage<T>({
  initialData,
  columns,
  apiPath,
}: DataPageProps<T>) {
  return (
    <TableWithSearch
      initialData={initialData}
      columns={columns}
      apiPath={apiPath}
    />
  );
}
