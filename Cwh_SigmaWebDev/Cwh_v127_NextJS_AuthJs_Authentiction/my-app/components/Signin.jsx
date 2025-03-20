import { signIn } from "@/auth";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <button
        type='submit'
        className='bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-500 hover:text-white transition-all'
      >
        Signin with GitHub
      </button>
    </form>
  );
}
