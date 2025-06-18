import React from "react";

export type Column<T> = {
  header: string;
  // accessor는 이제 항상 keyof T 또는 함수여야 합니다.
  // cell이 정의되지 않은 경우 accessor의 결과가 직접 렌더링됩니다.
  accessor: keyof T | ((item: T) => React.ReactNode);
  // cell은 accessor가 keyof T일 때 커스텀 렌더링을 제공하거나,
  // accessor가 함수일 때 그 결과를 오버라이드할 수 있습니다.
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
  if (data.length === 0) {
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
