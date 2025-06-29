"use client";

import React, { useRef, useEffect } from "react";
import SearchBar, { Field } from "./search-bar";
import { Column, DataTable } from "../data/data-table";

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
}: SearchTableSectionProps<T>) {
  const searchBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function updateVar() {
      if (searchBarRef.current) {
        document.documentElement.style.setProperty(
          "--search-bar-height",
          `${searchBarRef.current.offsetHeight}px`,
        );
      }
    }
    updateVar();
    window.addEventListener("resize", updateVar);
    return () => window.removeEventListener("resize", updateVar);
  }, []);

  return (
    <div className="flex flex-col gap-[0.5rem]">
      <SearchBar
        ref={searchBarRef}
        fields={fields}
        setDataAction={setDataAction}
        apiPath={apiPath}
      />
      <DataTable data={data} columns={columns} />
    </div>
  );
}
