import { useEffect } from "react";
import "./App.css";
import { useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };         
    console.log(user);

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("Users added successfully");
          form.reset();
        }
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/students")
      .then((res) => res.json())
      .then((data) => {
        setStudents(data);
      });
  }, []);

  console.log(students, "students");

  return (
    <>
      <h1>Simple CRUD</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {students.map((student, ind) => {
          return (
            <div
              key={ind}
              className="border border-2 p-4 bg-blue-500 bg-opacity-20 space-y-2 text-white"
            >
              <p className="font-semibold text-xl">{student.name}</p>
              <p className="font-semibold text-xl">{student.age}</p>
              <p className="font-bold py-1 px-2 rounded-md bg-black animate-pulse">
                See Details
              </p>
            </div>
          );
        })}
      </div>

    </>
  );
}

export default App;


 