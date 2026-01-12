// Google Analytics gtag type declarations
interface GtagEventParams {
  [key: string]: string | number | boolean | undefined;
}

interface Window {
  gtag: (
    command: "config" | "event" | "js" | "set",
    targetId: string | Date,
    config?: GtagEventParams
  ) => void;
  dataLayer: unknown[];
}
