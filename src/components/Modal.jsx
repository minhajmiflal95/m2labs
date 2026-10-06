import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";

export default function Modal({ children, onClose, title, className = "" }) {
  const ref = useRef(null);
  const returnFocus = useRef(document.activeElement);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      dialog.close();
      requestAnimationFrame(() => {
        if (!document.querySelector("dialog[open]"))
          returnFocus.current?.focus?.({ preventScroll: true });
      });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`modal ${className}`}
      aria-label={title}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-body">
        <button
          className="icon-button modal-close"
          onClick={onClose}
          aria-label="Close dialog"
          autoFocus
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </dialog>
  );
}
