/**
 * Utility function to open Calendly popup
 */

// Declare Calendly type for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      showPopupWidget: (url: string) => void;
    };
  }
}

export const openCalendlyPopup = () => {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({
      url: "https://calendly.com/clientreachai/free-ai-discovery",
    });
  }
};
