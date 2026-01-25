import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isBookingFormView, setIsBookingFormView] = useState(false);

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

      // Listen for route changes in Cal.com embed
      cal("on", {
        action: "__routeChanged",
        callback: (e: any) => {
          // Check if we're on the booking form page
          if (e?.detail?.data?.url) {
            const url = e.detail.data.url;
            // Booking form URLs typically contain query parameters or specific paths
            const isFormView = url.includes("?") || url.includes("/book");
            setIsBookingFormView(isFormView);
          }
        }
      });

      // Also listen for when a slot is selected
      cal("on", {
        action: "__slotSelected",
        callback: () => {
          setIsBookingFormView(true);
        }
      });

      // Listen for when user goes back to calendar
      cal("on", {
        action: "__stepChanged",
        callback: (e: any) => {
          if (e?.detail?.data?.step === "date") {
            setIsBookingFormView(false);
          }
        }
      });
    })();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-2 sm:p-4 backdrop-blur-sm">
      <div
        className={`relative h-[85vh] w-full rounded-2xl bg-white shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          isBookingFormView ? "max-w-3xl" : "max-w-5xl"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 p-2 bg-white/80 rounded-full text-gray-600 hover:text-black hover:bg-white transition-all shadow-lg"
        >
          <X size={20} />
        </button>

        <Cal
          namespace="erstgesprach"
          calLink="aitomaticly/erstgesprach"
          style={{ width: "100%", height: "100%" }}
          config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true", theme: "light" }}
        />
      </div>
    </div>
  );
}
