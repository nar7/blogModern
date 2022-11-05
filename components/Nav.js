import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase";

function Nav() {
  const [user, loading, error] = useAuthState(auth);
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
        <Link href={"/auth/login"}>
          <button className=" border bg-cyan-500 px-4 py-2 text-sm   rounded-lg font-medium text-white">
            Join Now
          </button>
        </Link>
      )}
    </div>
  );
}

export default Nav;
