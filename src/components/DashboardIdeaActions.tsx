"use client";

import { useState } from "react";
import IdeaLikeDislike from "@/components/IdeaLikeDislike";

type Props = {
  ideaId: string;
  onDelete?: () => void;
  onLiked?: () => void;
};

export default function DashboardIdeaActions({ ideaId, onDelete, onLiked }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleting) return;
    const confirmed = window.confirm("Delete this idea? This cannot be undone.");
    if (!confirmed) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/ideas/${ideaId}/delete`, {
        method: "DELETE",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        alert(data.error || "Failed to delete idea.");
        setDeleting(false);
        return;
      }
      onDelete?.();
    } catch {
      alert("Network error. Try again.");
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-3">
      <IdeaLikeDislike ideaId={ideaId} showDislike={false} onLiked={onLiked} />
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        className="text-xs text-red-400 hover:text-red-300 disabled:opacity-50 whitespace-nowrap"
      >
        {deleting ? "Deleting…" : "Delete"}
      </button>
    </div>
  );
}
