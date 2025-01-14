/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_APP_BASEURL: string;
  readonly VITE_APP_WS: string;
  readonly VITE_APP_IMAGE: string;
  readonly VITE_APP_OPENAI: string;
  readonly VITE_APP_OPENAI_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
