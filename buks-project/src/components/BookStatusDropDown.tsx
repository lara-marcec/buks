import { useState, useRef, useEffect } from "react";
import PickerIcon from "../assets/status-button.svg?react";
import type { Book } from "../types/book";

interface Props {
  book: Book;
  updateStatus: (id: string, status: Book["status"]) => void;
  placeholder?: string;
}

const StatusDropdown = ({ book, updateStatus, placeholder }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<Book["status"] | undefined>(book.status);

  const statuses: { label: string; value: NonNullable<Book["status"]> }[] = [
    { label: "want to read", value: "want_to_read" },
    { label: "currently reading", value: "currently_reading" },
    { label: "did not finish", value: "did_not_finish" },
    { label: "read", value: "read" },
  ];

  useEffect(() => {
    setSelectedStatus(book.status);
  }, [book.status]);

  const labelToShow = selectedStatus
    ? statuses.find(s => s.value === selectedStatus)?.label
    : placeholder ?? "add to library";

  const handleStatusClick = (status: NonNullable<Book["status"]>) => {
    setSelectedStatus(status);
    updateStatus(book.id, status);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className={`status-dropdown-wrapper ${isOpen ? "open" : ""}`} ref={wrapperRef}>
      <button
        type="button"
        className="status-dropdown-button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <span className="status-label">{labelToShow}</span>
        <PickerIcon className="status-icon" />
      </button>

      <div className={`status-dropdown-menu ${isOpen ? "open" : ""}`}>
        <div className="dropdown-content">
          {statuses.map((status) => (
            <div
              key={status.value}
              className={`status-dropdown-item ${
                status.value === selectedStatus ? "selected" : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleStatusClick(status.value);
              }}
            >
              {status.label}
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default StatusDropdown;
