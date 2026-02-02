import { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

declare global {
  interface Window {
    Cal: any;
  }
}

export default function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isBookingFormView, setIsBookingFormView] = useState(false);
  const initRef = useRef(false);

  useEffect(() => {
    if (!isOpen || initRef.current) return;
    initRef.current = true;

    (function (C: any, A: string, L: string) {
      let p = function (a: any, ar: any) { a.q.push(ar); };
      let d = C.document;
      C.Cal = C.Cal || function () {
        let cal = C.Cal;
        let ar = arguments;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).src = A;
          cal.loaded = true;
        }
        if (ar[0] === L) {
          const api: any = function () { p(api, arguments); };
          const namespace = ar[1];
          api.q = api.q || [];
          if (typeof namespace === "string") {
            cal.ns[namespace] = cal.ns[namespace] || api;
            p(cal.ns[namespace], ar);
            p(cal, ["initNamespace", namespace]);
          } else p(cal, ar);
          return;
        }
        p(cal, ar);
      };
    })(window, "https://app.cal.eu/embed/embed.js", "init");

    window.Cal("init", "erstgesprach", { origin: "https://app.cal.eu" });

    window.Cal.ns.erstgesprach("inline", {
      elementOrSelector: "#my-cal-inline-erstgesprach",
      config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
      calLink: "automaticly/erstgesprach",
    });

    window.Cal.ns.erstgesprach("ui", { hideEventTypeDetails: false, layout: "month_view" });

    window.Cal.ns.erstgesprach("on", {
      action: "__routeChanged",
      callback: (e: any) => {
        if (e?.detail?.data?.url) {
          const url = e.detail.data.url;
          const isFormView = url.includes("?") || url.includes("/book");
          setIsBookingFormView(isFormView);
        }
      }
    });

    window.Cal.ns.erstgesprach("on", {
      action: "__slotSelected",
      callback: () => {
        setIsBookingFormView(true);
      }
    });

    window.Cal.ns.erstgesprach("on", {
      action: "__stepChanged",
      callback: (e: any) => {
        if (e?.detail?.data?.step === "date") {
          setIsBookingFormView(false);
        }
      }
    });
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
