import type { Metadata } from "next";
import FeedbackPanel from "@/components/FeedbackPanel";

export const metadata: Metadata = {
  title: "[PANEL] Feedback preview sectores · Flame",
  robots: { index: false, follow: false },
};

export default function FeedbackPanelPage() {
  return <FeedbackPanel />;
}
