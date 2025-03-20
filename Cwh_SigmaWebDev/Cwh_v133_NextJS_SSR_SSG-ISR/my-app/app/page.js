

export default async function Page() {
  const data = await fetch('https://api.vercel.app/blog', {cache:"no-store"})
  const posts = await data.json()
  return (
    <ul className="flex flex-col items-center p-2 ">
      {posts.map((post) => (
        <li className="bg-gray-800 mb-2 p-2 w-[50vw] rounded-xl" key={post.id}>{post.title}-
        <span className="text-sm text-gray-400">{post.category}-{post.date}</span>
        <span>-{post.author}</span>
        </li>
      ))}
    </ul>
  )
}