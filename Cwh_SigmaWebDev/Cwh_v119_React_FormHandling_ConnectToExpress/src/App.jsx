import "./App.css";
import { useForm } from "react-hook-form";

function App() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const onSubmit = async (data) => {
    // await delay(2);

    // send data frontEnd to Backend in server.
    let r = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Specify JSON content type
      },
      body: JSON.stringify(data),
    });

    let res = await r.json();

    if (data.userName !== "Harry") {
      setError("myForm", {
        message: "Your form is not in Good Order! BCZ Credentials is invalid.",
      });
    }
    if (data.userName === "rohan") {
      setError("blockedUsers", {
        message: "Sorry this User is Blocked!.",
      });
    }

    console.log(data, res);
  };

  return (
    <>
      {isSubmitting && <div className="submitting">Submitting...</div>}
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="userName">User Name:</label>
            <input
              {...register("userName", {
                required: "Username is required.",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters.",
                },
                maxLength: {
                  value: 25,
                  message: "Username cannot exceed 25 characters.",
                },
              })}
              type="text"
              placeholder="Enter your username"
              id="userName"
            />
            <p className="error">{errors.userName?.message}</p>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters.",
                },
                maxLength: {
                  value: 52,
                  message: "Password cannot exceed 52 characters.",
                },
              })}
              type="password"
              placeholder="Enter your password"
              id="password"
            />
            <p className="error">{errors.password?.message}</p>
          </div>

          <input
            className="submit"
            type="submit"
            value="Submit"
            disabled={isSubmitting}
          />

          {/* {errors.myForm && (
            <div className="submitting">{errors.myForm.message}</div>
          )}
          {errors.blockedUsers && (
            <div className="submitting">{errors.blockedUsers.message}</div>
          )} */}
        </form>
      </div>
    </>
  );
}

export default App;
