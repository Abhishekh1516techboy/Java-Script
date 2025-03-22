export const metadata = {
  title: "Admin-Page: Facebook",
  description:
    "Admin: Facebook is a social utility that connects people with friends.",
};

export default function Layout({ children }) {
  return (
    <section>
      <h1 className="bg-blue-500 text-center text-1xl font-semibold">
        Admin navbar
      </h1>
      {children}
    </section>
  );
}
