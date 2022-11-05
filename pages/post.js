import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../utils/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function Post() {
  const [post, setPost] = useState({ description: "" });
  const route = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const DataUpdate = route.query;

  //submit post
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!post.description) {
      toast.error("description is empty", {
        position: "top-center",
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    if (post.description.length > 300) {
      toast.error("length is very long", {
        position: "top-center",
        autoClose: 1500,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    // update Post
    if (post?.hasOwnProperty("id")) {
      const Ref = doc(db, "posts", post.id);
      // Set the "capital" field of the city 'DC'
      await updateDoc(Ref, {
        ...post,
        timestamp: serverTimestamp(),
      });
      return route.push("/");
    }

    try {
      await addDoc(collection(db, "posts"), {
        ...post,
        timestamp: serverTimestamp(),
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });
      setPost({ description: "" });
      return route.push("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  useEffect(() => {
    if (!user) route.push("/auth/login");
    if (DataUpdate?.id) {
      setPost(DataUpdate);
    } else {
      setPost({ description: "" });
    }
  }, [user, loading, DataUpdate]);

  return (
    <div className=" mt-32 bg-white shadow-lg p-12 rounded-lg">
      <form onSubmit={handleSubmit} className=" space-y-6">
        <h1 className=" font-bold text-xl">
          {post?.hasOwnProperty("id") ? "Edit Post" : "Create a new post"}
        </h1>
        <div className=" space-y-2">
          <p>Description</p>
          <textarea
            value={post.description}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            className="bg-gray-800 h-48 w-full text-white p-2 rounded-lg"
          ></textarea>
          <p
            className={` text-cyan-600 font-medium text-sm ${
              post.description.length > 300 ? "text-red-600" : ""
            }`}
          >
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white py-1 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
