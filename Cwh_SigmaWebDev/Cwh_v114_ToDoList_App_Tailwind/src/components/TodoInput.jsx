import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

const TodoInput = () => {
  const [form, setForm] = useState({ title: "", desc: "" });
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const todo = JSON.parse(localStorage.getItem("todos"));
    if (todo) setTodos(todo);
  }, []);

  const handleFormData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (!form.title || !form.desc) return;

    let updatedTodos;
    if (editId) {
      updatedTodos = todos.map((todo) =>
        todo.id === editId
          ? { ...todo, title: form.title, desc: form.desc }
          : todo
      );
      setEditId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        title: form.title,
        desc: form.desc,
        time: new Date().toLocaleString(),
      };
      updatedTodos = [...todos, newTodo];
    }

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setForm({ title: "", desc: "" });
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setForm({ title: todoToEdit.title, desc: todoToEdit.desc });
    setEditId(id);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    <div className="flex justify-center items-start p-4 sm:p-6 md:p-8 min-h-[90vh] ">
      <div className="bg-slate-600 w-full min-h-[80vh] max-w-5xl rounded-2xl overflow-hidden flex flex-col  md:flex-row">
        <div className="bg-black w-full md:w-1/2 p-4 sm:p-6 md:p-8 flex-shrink-0">
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label htmlFor="title" className="text-white block mb-2">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleFormData}
                placeholder="Enter title"
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="desc" className="text-white block mb-2">
                Description
              </label>
              <input
                id="desc"
                type="text"
                name="desc"
                value={form.desc}
                onChange={handleFormData}
                placeholder="Enter description"
                className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={handleAdd}
              type="button"
              className="w-full bg-blue-500 text-white p-2 rounded-md font-bold hover:bg-blue-600 transition-colors"
            >
              {editId ? "Update Todo" : "Add Todo"}
            </button>
          </form>
        </div>

        <div className="bg-slate-600 w-full md:w-1/2 flex flex-col min-h-[300px]">
          <h1 className="bg-black h-10 text-center text-xl sm:text-2xl font-medium text-white flex items-center justify-center flex-shrink-0">
            ToDo List&apos;s
          </h1>
          <div className="flex-1 p-3 overflow-y-auto min-h-[150px] max-h-[calc(100vh-20rem)] md:max-h-[calc(100vh-10rem)]">
            {todos.length > 0 ? (
              <TodoCard todos={todos} onDelete={handleDelete} onEdit={handleEdit} />
            ) : (
              <div className="text-white text-center mt-5 text-lg">
                No tasks available. Add a new task!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoInput;
