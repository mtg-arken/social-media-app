import { useEffect, useState } from "react";
import { FaHorseHead } from "react-icons/fa";
import { IoRefreshSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { getRandomUsers } from "../Services/Http/api";

export default function FindUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers=async() =>{
      const response = await getRandomUsers();
        const data = response.data;
        setUsers(data);
    }
    fetchUsers()
  }, []);
  return (
    <div className="card my-3">
      <div className="card-head d-flex justify-content-center justify-content-evenly mt-2">
        <FaHorseHead />

        <h5 className="card-text">Find users</h5>
        <IoRefreshSharp />
      </div>
      <hr className="my-2" />
      <div className=" card-body p-0 ">
        <ul className=" px-3">
          {users?.map((user, i) => (
            <li
              className=" d-flex  justify-content-between align-items-center"
              key={i}
            >
              <img
                src={user.image}
                alt="Logo"
                style={{
                  clipPath: "circle(40%) ",
                  width: "40px",
                  height: "40px",
                }}
              />
              {user.username}

              <Link to={`/Profile/${user._id}`}>View</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
