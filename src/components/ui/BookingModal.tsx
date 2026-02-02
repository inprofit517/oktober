import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { X } from "lucide-react";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "erstgesprach" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm">
      <div className="relative h-[85vh] w-full max-w-5xl rounded-2xl bg-white shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 p-2 bg-white/80 rounded-full text-gray-600 hover:text-black hover:bg-white transition-all shadow-lg"
        >
          <X size={20} />
        </button>

        <Cal
          namespace="erstgesprach"
          calLink="automaticly/erstgesprach"
          style={{ width: "100%", height: "100%", overflow: "scroll" }}
          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
        />
      </div>
    </div>
  );
}
