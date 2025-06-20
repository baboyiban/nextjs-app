import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  cell?: (item: T) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
};

export function DataTable<T>({
  data,
  columns,
  emptyMessage = "데이터가 없습니다.",
}: DataTableProps<T>) {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="p-[1rem]">{emptyMessage}</div>;
  }

  return (
    <div className="bg-white p-[1rem] rounded-lg max-w-[calc(100dvw-15rem-1rem-0.5rem)]">
      <div className="overflow-x-auto rounded-lg border border-gray w-full">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray">
            <tr className="*:p-[0.5rem] *:whitespace-nowrap *:font-normal text-left">
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray">
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-blue *:p-[0.5rem] *:whitespace-nowrap"
              >
                {columns.map((col, colIdx) => {
                  let renderedValue: React.ReactNode;

                  if (col.cell) {
                    renderedValue = col.cell(item);
                  } else if (typeof col.accessor === "function") {
                    renderedValue = col.accessor(item);
                  } else {
                    const rawValue = item[col.accessor as keyof T];
                    renderedValue = React.isValidElement(rawValue)
                      ? rawValue
                      : rawValue == null
                        ? ""
                        : String(rawValue);
                  }

                  return <td key={colIdx}>{renderedValue}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
