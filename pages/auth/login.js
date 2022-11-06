import { useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookSquare } from "react-icons/fa";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslation } from "react-i18next";

export default function login() {
  const { t, i18n } = useTranslation();
  const [user, loading, error] = useAuthState(auth);
  const route = useRouter();
  const Googleprovider = new GoogleAuthProvider();
  const Facebookprovider = new FacebookAuthProvider();
  //Google Login
  const googleSingin = async () => {
    try {
      const result = await signInWithPopup(auth, Googleprovider);
      return route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  //Facebook login
  const facebookSingin = async () => {
    try {
      const result = await signInWithPopup(auth, Facebookprovider);
      return route.push("/");
    } catch (error) {}
  };

  //user
  useEffect(() => {
    if (user) route.push("/dashboard");
  }, [user, loading]);

  return (
    <div className=" bg-white shadow-lg mt-32 p-6 space-y-4 rounded">
      <p className=" text-2xl font-medium">{t("titleLogin")}</p>
      <p className=" text-sm">{t("paraLogin")}</p>
      <button
        onClick={googleSingin}
        className=" bg-gray-700 w-full text-white flex p-2 gap-2 rounded align-middle font-medium "
      >
        <FcGoogle className=" text-2xl" />
        {t("googleLogin")}
      </button>
      <button
        onClick={facebookSingin}
        className=" bg-blue-700 w-full text-white flex p-2 gap-2 rounded align-middle font-medium "
      >
        <FaFacebookSquare className=" text-2xl" />
        {t("facebookLogin")}
      </button>
    </div>
  );
}
