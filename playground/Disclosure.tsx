import { useId, useState, type ReactNode } from "react";

interface DisclosureProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export default function Disclosure({
  title,
  children,
  defaultOpen = false,
}: DisclosureProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const contentId = useId();

  return (
    <div>
      <button
      className="disclosure-button"
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((open) => !open)}
      >
        {title}
      </button>

      <div
      className="disclosure-content"
        id={contentId}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}