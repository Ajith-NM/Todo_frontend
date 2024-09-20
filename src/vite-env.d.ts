/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_Base_Url: string;
    readonly VITE_clientId: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }