import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const Userpage = () => {
  const [allLists, setAllLists] = useState([]);

  const fetchLists = async () => {
    try {
      // TODO:(ISSUE) Fetch API cannot load http://localhost:27017/api/user/lists due to access control checks.
      const res = await fetch("http://localhost:5001/api/user/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          userId: "68a0cc104bc0904a639c915a",
        },
      });
      if (!res.ok) {
        throw new Error("Request error");
      }
      const data = await res.json();
      console.log(JSON.stringify(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const queryListsForUser = useQuery({
    queryKey: ["queryListsForUser"],
    queryFn: fetchLists,
  });

  return (
    <div>
      <select name="userlists" id="userlists">
        {queryListsForUser.data?.map((list) => {
          <option value={list._id}>{list.name}</option>;
        })}
      </select>
    </div>
  );
};

export default Userpage;
