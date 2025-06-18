import { z } from "zod";
import { Column, DataTable } from "./data-table";

// T를 Zod 스키마 자체 (z.AnyZodObject)로 정의합니다.
// 이렇게 하면 DataPage를 사용하는 쪽에서 T를 명시할 필요가 없습니다.
type DataPageProps<T extends z.AnyZodObject> = {
  fetcher: () => Promise<z.infer<T>[]>; // fetcher는 스키마가 추론하는 타입의 배열을 반환합니다.
  schema: T; // schema는 Zod 스키마 자체입니다.
  columns: Column<z.infer<T>>[]; // columns는 스키마가 추론하는 타입에 대한 컬럼 정의입니다.
  emptyMessage?: string;
  errorMessage?: string;
};

// DataPage 함수도 T를 Zod 스키마로 받습니다.
export async function DataPage<T extends z.AnyZodObject>({
  fetcher,
  schema,
  columns,
  emptyMessage = "데이터가 없습니다.",
  errorMessage = "데이터를 불러오지 못했습니다.",
}: DataPageProps<T>) {
  try {
    const data = await fetcher();
    // z.array(schema).parse(data)는 data가 z.infer<T>[] 타입이고 schema가 T이므로 올바르게 작동합니다.
    const validatedData = z.array(schema).parse(data);

    return (
      <DataTable<z.infer<T>> // DataTable에 z.infer<T> 타입을 명시적으로 전달
        data={validatedData}
        columns={columns}
        emptyMessage={emptyMessage}
      />
    );
  } catch (error) {
    console.error("데이터를 불러오는 중 오류가 발생했습니다:", error);
    return (
      <div className="p-[1rem]">{errorMessage} 나중에 다시 시도해주세요.</div>
    );
  }
}
