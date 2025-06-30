// NAME
const STORE_NAME = "state";

// NETWORK
const NETWORK_CONFIG = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
  TIMEOUT: 30000,
  RETRY: false,
  USE_TOKEN: true,
  WITH_METADATA: false,
  DISPLAY_ERROR: true,
};

// PATHNAME
const PATHNAME = {
  HOME: "/",
  LOGIN: "/login",
};

// LAYOUT
const LAYOUT_CONFIG = {
  useSidebar: true,
  useNavbar: true,
  useFooter: true,
  useBottomNavigator: true,
};

// LANGUAGE
const LANGUAGE = {
  DEFAULT: "lo",
};

// FIREBASE
const FIREBASE_DEV = {

};

const FIREBASE = {

};

export default {
  STORE_NAME,
  NETWORK_CONFIG,
  PATHNAME,
  LAYOUT_CONFIG,
  LANGUAGE,
  FIREBASE,
  FIREBASE_DEV,
};
