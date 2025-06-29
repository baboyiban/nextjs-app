type StatusBadgeProps = {
  status: string;
  variant: "green" | "yellow" | "red" | "gray" | "blue" | "deepGray";
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const variantClasses = {
    green: "bg-green",
    yellow: "bg-yellow",
    red: "bg-red",
    gray: "bg-gray",
    blue: "bg-blue",
    deepGray: "bg-deep-gray",
  };

  return (
    <div
      className={`p-[0.5rem] rounded-lg text-[0.75rem] w-fit ${variantClasses[variant]}`}
    >
      {status}
    </div>
  );
}
