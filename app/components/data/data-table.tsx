import React from "react";

export type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  cell?: (item: T, idx: number, context?: any) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  cellContext?: any; // 추가: cell에 내려줄 context
};

export function DataTable<T>({
  data,
  columns,
  cellContext,
}: DataTableProps<T>) {
  return (
    <div className="bg-white p-[1rem] rounded-lg ">
      <div
        className="max-w-[calc(100dvw-240px-24px-32px)] overflow-auto rounded-lg border border-gray w-full"
        style={{
          maxHeight: "calc(100dvh - 24px - var(--search-bar-height) - 32px)",
        }}
      >
        <table className="min-w-full bg-white border-collapse">
          <thead className="sticky top-0 bg-gray">
            <tr className="*:p-[0.5rem] *:whitespace-nowrap *:font-normal text-left">
              {columns.map((col, idx) => (
                <th key={idx}>{col.header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray">
            {Array.isArray(data) && data.length > 0
              ? data.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-blue *:p-[0.5rem] *:whitespace-nowrap"
                  >
                    {columns.map((col, colIdx) => {
                      let renderedValue: React.ReactNode;

                      if (col.cell) {
                        renderedValue = col.cell(item, idx, cellContext);
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
                ))
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
