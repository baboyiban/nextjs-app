import React from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  className,
}: ModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-10 flex items-center justify-center p-[0.5rem]"
      onClick={onClose}
    >
      <div
        className={`p-[0.5rem] rounded-lg z-20 ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
