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
    <div className="bg-white p-[1rem] rounded-lg">
      <div className="overflow-x-auto rounded-lg border border-gray">
        <table className="min-w-full bg-white">
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
                    // cell이 정의되어 있으면 cell의 결과를 사용합니다.
                    renderedValue = col.cell(item);
                  } else if (typeof col.accessor === "function") {
                    // accessor가 함수이면 그 함수의 결과를 사용합니다.
                    renderedValue = col.accessor(item);
                  } else {
                    // accessor가 keyof T이면 해당 속성 값을 사용합니다.
                    const rawValue = item[col.accessor as keyof T];
                    // JSX가 아니면 문자열로 변환하여 안전하게 렌더링합니다.
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
