"use client";

import SearchBar, { Field } from "./search-bar";
import { Column, DataTable } from "./data-table";

type SearchTableSectionProps<T> = {
  fields: Field[];
  setDataAction: (data: T[]) => void;
  apiPath: string;
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
};

export default function SearchTableSection<T>({
  fields,
  setDataAction,
  apiPath,
  data,
  columns,
  emptyMessage = "데이터가 없습니다.",
}: SearchTableSectionProps<T>) {
  return (
    <div className="flex flex-col gap-[0.5rem]">
      <SearchBar
        fields={fields}
        setDataAction={setDataAction}
        apiPath={apiPath}
      />
      <DataTable data={data} columns={columns} emptyMessage={emptyMessage} />
    </div>
  );
}
