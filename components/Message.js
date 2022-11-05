
export default function Message({ avatar, username, description, children }) {
  return (
    <div className=" mt-6 bg-white shadow-lg p-6">
      <div className="flex items-center gap-4">
        <img src={avatar} className="w-8 h-8 rounded-full" />
        <p>{username}</p>
      </div>
      <p className=" mt-2  text-sm">{description}</p>
      <div>{children}</div>
    </div>
  );
}
