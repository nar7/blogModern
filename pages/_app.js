import Layout from "../components/Layout";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: {
          joinNow: "Join Now",
          titleHome: "See what other people are saying",
          titleLogin: "Join Today",
          paraLogin: "Sign in with one of the providers",
          googleLogin: "Sign in with Google",
          facebookLogin: "Sing in with facebook",
        },
      },
      fr: {
        translation: {
          joinNow: "Joindre Maintenant",
          titleHome: "Voir ce que disent les autres",
          titleLogin: "Joignez aujourd'hui",
          paraLogin: "Connectez-vous avec l'un des fournisseurs",
          googleLogin: "Connectez-vous avec Google",
          facebookLogin: "Connectez-vous avec Facebook",
        },
      },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
  });

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ToastContainer />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
