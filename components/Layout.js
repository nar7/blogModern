import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <div className="md:max-w-2xl md:mx-auto p-4 mx-6 ">
      <Nav />
      {children}
    </div>
  );
}
