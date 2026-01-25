import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "erstgesprach" });
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: {
            "cal-brand": "#5da0ff"
          }
        },
        hideEventTypeDetails: false,
        layout: "month_view"
      });
    })();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative h-[650px] w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <button onClick={onClose} className="absolute right-4 top-4 z-10 p-2 text-gray-500 hover:text-black">
          <X size={24} />
        </button>

        <Cal
          namespace="erstgesprach"
          calLink="aitomaticly/erstgesprach"
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" }}
        />
      </div>
    </div>
  );
}
