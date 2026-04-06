import { Suspense } from "react";
import { IdeaHubContent } from "@/components/IdeaHubContent";

export default function OnboardingPage() {
  return (
    <Suspense>
      <IdeaHubContent />
    </Suspense>
  );
}
