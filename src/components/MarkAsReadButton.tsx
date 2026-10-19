import { useState, useEffect } from "react";

interface MarkAsReadButtonProps {
  sectionId: string;
  sectionTitle: string;
}

const STORAGE_KEY = "dani-academy-read-sections";

export default function MarkAsReadButton({
  sectionId,
  sectionTitle,
}: MarkAsReadButtonProps) {
  const [isRead, setIsRead] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[];
      setIsRead(saved.includes(sectionId));
    } catch {
      setIsRead(false);
    }
  }, [sectionId]);

  const toggleRead = () => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[];
      const next = isRead
        ? saved.filter((id) => id !== sectionId)
        : [...new Set([...saved, sectionId])];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setIsRead(!isRead);
      window.dispatchEvent(
        new CustomEvent("section-read-changed", {
          detail: { sectionId, isRead: !isRead },
        })
      );
    } catch {
      setIsRead(!isRead);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-surface-2 bg-surface px-5 py-4">
      <div>
        <p className="font-sans text-xs font-semibold tracking-wider text-muted uppercase">
          Progreso de la lección · {sectionId}
        </p>
        <p className="mt-1 font-serif text-base text-fg">
          {isRead
            ? `Completaste "${sectionTitle}".`
            : `¿Terminaste de practicar "${sectionTitle}"?`}
        </p>
      </div>
      <button
        type="button"
        onClick={toggleRead}
        className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2.5 font-sans text-sm font-semibold transition ${
          isRead
            ? "border border-accent bg-accent/15 text-accent-strong"
            : "bg-accent text-white hover:bg-accent-strong"
        }`}
      >
        <span>{isRead ? "✓ Leída" : "Marcar como leído"}</span>
      </button>
    </div>
  );
}
