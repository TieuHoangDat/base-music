/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_LAOID_CLIENT_ID: string;
  readonly VITE_LAOID_REDIRECT_URI: string;
  readonly VITE_LAOID_SSO_SCRIPT_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
