import { Suspense } from "react";
import { IdeaHubContent } from "@/components/IdeaHubContent";

export default function IdeaHubPage() {
  return (
    <Suspense>
      <IdeaHubContent />
    </Suspense>
  );
}

