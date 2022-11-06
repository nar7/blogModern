import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";
import { useTranslation } from "react-i18next";

function Nav() {
  const [user, loading, error] = useAuthState(auth);
  const { t, i18n } = useTranslation();
  const handleLangChange = (e) => {
    i18n.changeLanguage(e.target.value);
  };
  return (
    <div className=" flex justify-between  font-poppins items-center">
      <Link href="/">
        <button className=" text-lg font-medium">Creative Minds</button>
      </Link>
      {user ? (
        <div className=" flex items-center gap-2">
          <Link href={"/post"}>
            <button className=" border bg-cyan-500 px-4 py-2 text-sm  font-medium text-white">
              Post
            </button>
          </Link>
          <Link href={"/dashboard"}>
            <img
              className=" w-8 h-8 rounded-full"
              src={user.photoURL}
              alt="photo profile"
            />
          </Link>
        </div>
      ) : (
        <div className="gap-2">
          <Link href={"/auth/login"}>
            <button className=" border bg-cyan-500 px-4 py-2 text-sm   rounded-lg font-medium text-white">
              {t("joinNow")}
            </button>
          </Link>
          <select
            className=" ml-2  py-1   border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={handleLangChange}
            name=""
            id=""
          >
            <option value="en" selected>
              EN
            </option>
            <option value="fr">FR</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default Nav;
