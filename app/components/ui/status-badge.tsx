type StatusBadgeProps = {
  status: string;
  variant: "success" | "warning" | "danger" | "neutral" | "process";
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const variantClasses = {
    success: "bg-green",
    warning: "bg-yellow",
    danger: "bg-red",
    neutral: "bg-gray",
    process: "bg-blue",
  };

  return (
    <div
      className={`p-[0.5rem] rounded-lg text-[0.75rem] w-fit ${variantClasses[variant]}`}
    >
      {status}
    </div>
  );
}
