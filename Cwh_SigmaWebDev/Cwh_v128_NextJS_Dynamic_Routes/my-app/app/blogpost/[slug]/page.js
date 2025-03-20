export default async function Blogpost({ params }) {
  const slug = (await params).slug;

  let cloths = ["java", "python", "javaScript", "c++", "c#"];

  if (cloths.includes(slug)) {
    return (
      <div className="bg-red-600 text-white text-2xl text-center ">
        My Shop: {slug}
      </div>
    );
  } else {
    return (
      <div className="text-orange-400 h-screen flex justify-center items-center text-4xl">
        {slug} Post Not Found...
      </div>
    );
  }
}
