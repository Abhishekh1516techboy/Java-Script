export default async function Shop({ params }) {
  const slug = (await params).slug;

  return (
    <div className="bg-red-600 text-white text-2xl text-center ">
      My Shop: {slug}
    </div>
  );
}
