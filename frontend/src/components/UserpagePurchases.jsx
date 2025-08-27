import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { use } from "react";
import AuthCtx from "../context/authContext";
import { useMutation } from "@tanstack/react-query";

const UserpagePurchases = (props) => {
  const fetchData = useFetch();
  const authCtx = use(AuthCtx);

  const mutation = useMutation({
    mutationFn: async () => {
      console.log("Running");
      const purchases = fetchData(
        "/purchases",
        "POST",
        { userId: authCtx.userId },
        authCtx.accessToken
      );
      console.log(JSON.stringify(purchases));
      return purchases;
    },
  });

  const getFormattedDate = (date) => {
    const d = new Date(date);
    const shortDate = new Intl.DateTimeFormat("en-SG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(d);

    return shortDate;
  };
  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <>
      {/* Map items */}
      {mutation?.data?.map((item, idx) => (
        <div className="card" key={idx}>
          <div className="card-header">{item.name}</div>
          <div>Cost: ${item.cost}</div>
          <div>Purchased on: {getFormattedDate(item.purchased_date)}</div>
          {/* <div>{item.quantity}</div> */}
        </div>
      ))}
    </>
  );
};

export default UserpagePurchases;
