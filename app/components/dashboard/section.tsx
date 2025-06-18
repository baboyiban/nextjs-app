type DashboardSectionProps<T> = {
  title: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  bgColor: "red" | "blue" | "yellow";
};

export function DashboardSection<T>({
  title,
  items,
  renderItem,
  bgColor,
}: DashboardSectionProps<T>) {
  return (
    <div className="grid gap-[0.5rem]">
      <h2 className="text-[1.125rem] font-bold">{title}</h2>
      {items.length > 0 ? (
        <div
          className={`grid gap-2 *:flex *:gap-2 *:rounded-lg *:p-[0.5rem] ${bgColor == "red" ? "*:bg-red" : bgColor == "blue" ? "*:bg-blue" : bgColor == "yellow" ? "*:bg-yellow" : "*:bg-gray"}`}
        >
          {items.map((item, index) => (
            <div key={index}>{renderItem(item)}</div>
          ))}
        </div>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
}
