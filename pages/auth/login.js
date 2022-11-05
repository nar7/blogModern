import { useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function login() {
  const [user, loading, error] = useAuthState(auth);
  const route = useRouter();
  const Googleprovider = new GoogleAuthProvider();
  const googleSingin = async () => {
    try {
      const result = await signInWithPopup(auth, Googleprovider);
      return route.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  //user
  useEffect(() => {
    if (user) route.push("/dashboard");
  }, [user, loading]);

  return (
    <div className=" bg-white shadow-lg mt-32 p-6 space-y-4 rounded">
      <p className=" text-2xl font-medium">Join Today</p>
      <p className=" text-sm">Sign in with one of the providers</p>
      <button
        onClick={googleSingin}
        className=" bg-gray-700 w-full text-white flex p-2 gap-2 rounded align-middle font-medium "
      >
        <FcGoogle className=" text-2xl" />
        Sign in with Google
      </button>
    </div>
  );
}
