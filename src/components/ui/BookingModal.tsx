import { useEffect, useState } from "react";
import { X } from "lucide-react";

declare global {
  interface Window {
    Cal: any;
  }
}

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isBookingFormView, setIsBookingFormView] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const script = document.createElement("script");
    script.src = "https://app.cal.eu/embed/embed.js";
    script.async = true;

    script.onload = () => {
      const Cal = window.Cal;
      if (!Cal) return;

      Cal("init", "erstgesprach", { origin: "https://app.cal.eu" });

      Cal.ns.erstgesprach("inline", {
        elementOrSelector: "#my-cal-inline-erstgesprach",
        config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
        calLink: "automaticly/erstgesprach",
      });

      Cal.ns.erstgesprach("ui", { hideEventTypeDetails: false, layout: "month_view" });

      Cal.ns.erstgesprach("on", {
        action: "__routeChanged",
        callback: (e: any) => {
          if (e?.detail?.data?.url) {
            const url = e.detail.data.url;
            const isFormView = url.includes("?") || url.includes("/book");
            setIsBookingFormView(isFormView);
          }
        }
      });

      Cal.ns.erstgesprach("on", {
        action: "__slotSelected",
        callback: () => {
          setIsBookingFormView(true);
        }
      });

      Cal.ns.erstgesprach("on", {
        action: "__stepChanged",
        callback: (e: any) => {
          if (e?.detail?.data?.step === "date") {
            setIsBookingFormView(false);
          }
        }
      });
    };

    if (!document.querySelector('script[src="https://app.cal.eu/embed/embed.js"]')) {
      document.head.appendChild(script);
    } else {
      script.onload(null as any);
    }

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isOpen]);

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

        <div style={{ width: "100%", height: "100%", overflow: "scroll" }} id="my-cal-inline-erstgesprach"></div>
      </div>
    </div>
  );
}
