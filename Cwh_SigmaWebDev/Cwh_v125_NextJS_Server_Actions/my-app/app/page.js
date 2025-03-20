import { submitAction } from "@/actions/form";

export default function Home () {
  return (
    <div>
      <form action={submitAction} className='container  text-center '>
        <div className=' p-4  '>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            id='name'
            required={true}
            className='text-black rounded-lg px-2'
          />
        </div>

        <div className=' p-4 '>
          <label htmlFor='add'>Address:</label>
          <input
            type='text'
            name='add'
            id='add'
            required={true}
            className='text-black rounded-lg px-2'
          />
        </div>
        <div>
          <input
            type='submit'
            value='submit'
            className='bg-red-600 p-1 px-8 rounded-md cursor-pointer'
          />
        </div>
      </form>
    </div>
  );
}
