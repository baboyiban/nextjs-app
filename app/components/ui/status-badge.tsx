type StatusBadgeProps = {
  status: string;
  variant: "success" | "warning" | "danger" | "neutral";
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  const variantClasses = {
    success: "bg-green",
    warning: "bg-yellow",
    danger: "bg-red",
    neutral: "bg-gray"
  };

  return (
    <div className={`p-[0.5rem] rounded-lg text-[13px] w-fit ${variantClasses[variant]}`}>
      {status}
    </div>
  );
}
