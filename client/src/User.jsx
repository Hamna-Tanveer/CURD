import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://curd-production-0769.up.railway.app")
      .then((result) => {
        console.log("Response from backend:", result.data);
        setUsers(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // on Delete
  const deleteHandler = (id) => {
    axios
      .delete(`https://curd-production-0769.up.railway.app/${id}`)
      .then((user) => {
        console.log(user);
        // to reload the page
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <Link to="/create" className="btn btn-success">
          + Add
        </Link>
        <table className="table ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>
                    <Link
                      to={`/update/${user._id}`}
                      className="btn btn-success"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteHandler(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
