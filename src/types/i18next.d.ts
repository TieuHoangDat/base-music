import "i18next";
import vi from "../i18n/vi/translation.json";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "vi";
    resources: {
      vi: typeof vi;
    };
  }
}
