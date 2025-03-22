const TodoCard = ({ todos, onDelete, onEdit }) => {
  return (
    <div>
      {todos.map((item) => (
        <div
          key={item.id}
          className="bg-black h-[120px] rounded-xl mb-3 overflow-hidden"
        >
          <div className="border-b-2 flex w-full h-10 ">
            <div className="h-full w-full text-left content-center px-3 font-semibold text-xl">
              {item.title}
            </div>
            <div className="w-full h-full flex items-center justify-end px-5 gap-7">
              <svg
                onClick={() => onDelete(item.id)}
                xmlns="http://www.w3.org/2000/svg"
                className="cursor-pointer"
                width="24"
                height="24"
                fill="white"
                viewBox="0 0 16 16"
              >
                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
              </svg>
              <svg
                onClick={() => onEdit(item.id)}
                className="cursor-pointer"
                width="24"
                height="24"
                fill="white"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
              </svg>
            </div>
          </div>
          <div className="relative h-20 shadow-lg">
            <div className="px-3 py-1 font-medium text-sm">{item.desc}</div>
            <small className="absolute bottom-0 right-0 p-2 text-xs text-gray-400">
              {item.time}
            </small>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoCard;