import { useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import Message from "../components/Message";
import Spinner from "../components/Spinner";
import { TbEdit } from "react-icons/tb";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";

function dashboard() {
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);
  const [postUser, setpostUser] = useState([]);

  const getData = async () => {
    const id = user?.uid;
    const colRef = collection(db, "posts");
    const q = query(colRef, where("user", "==", id));
    const querySnapshot = await getDocs(q);
    const data = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data.push({ ...doc.data(), id: doc.id });
    });
    setpostUser(data);
  };
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    getData();
  };
  useEffect(() => {
    if (user) {
      getData();
    } else {
      router.push("/");
    }
  }, [user, loading]);

  return (
    <div>
      <h1>Your posts</h1>
      <div></div>
      <div>
        {postUser.length == 0 && <Spinner />}
        {postUser &&
          postUser.map((item) => (
            <Message key={item.id} {...item}>
              <div className="flex gap-4 mt-2">
                <Link
                  href={{
                    pathname: "/post/",
                    query: item,
                  }}
                >
                  <TbEdit className="cursor-pointer hover:text-cyan-600" />
                </Link>
                <FaTrash
                  onClick={() => handleDelete(item.id)}
                  className="cursor-pointer"
                />
              </div>
            </Message>
          ))}
      </div>

      <button
        className=" bg-gray-800 text-white px-2 py-1 mt-4"
        onClick={() => auth.signOut()}
      >
        Sign out
      </button>
    </div>
  );
}

export default dashboard;
