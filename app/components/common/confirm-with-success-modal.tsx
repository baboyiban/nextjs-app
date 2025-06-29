import React from "react";
import Modal from "./modal";

type ConfirmWithSuccessModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  loading?: boolean;
  confirmText?: string;
  cancelText?: string;
  confirmMessage: React.ReactNode;
  successMessage: React.ReactNode;
  showSuccess: boolean;
};

export default function ConfirmWithSuccessModal({
  open,
  onClose,
  onConfirm,
  loading = false,
  confirmText = "확인",
  cancelText = "취소",
  confirmMessage,
  successMessage,
  showSuccess,
}: ConfirmWithSuccessModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      className={`flex flex-col gap-[0.5rem] ${showSuccess ? "bg-green" : "bg-white"}`}
    >
      {showSuccess ? (
        <div className="text-center">{successMessage}</div>
      ) : (
        <>
          <div>{confirmMessage}</div>
          <div className="flex gap-[0.5rem] justify-center">
            <button
              onClick={onConfirm}
              disabled={loading}
              className="p-[0.5rem] bg-red rounded-lg"
            >
              {confirmText}
            </button>
            <button
              onClick={onClose}
              disabled={loading}
              className="p-[0.5rem] bg-gray rounded-lg"
            >
              {cancelText}
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
