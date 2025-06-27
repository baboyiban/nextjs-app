"use client";

import TableWithSearch from "./table-with-search";

type DataPageProps<T> = {
  initialData: T[];
  columns: any;
  apiPath: string;
  emptyMessage?: string;
};

export default function DataPage<T>({
  initialData,
  columns,
  apiPath,
  emptyMessage = "데이터가 없습니다.",
}: DataPageProps<T>) {
  return (
    <TableWithSearch
      initialData={initialData}
      columns={columns}
      apiPath={apiPath}
      emptyMessage={emptyMessage}
    />
  );
}
