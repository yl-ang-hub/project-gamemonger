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
      const purchases = fetchData(
        "/purchases",
        "POST",
        { userId: authCtx.userId },
        authCtx.accessToken
      );
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
    <div className="overflow-scroll" style={{ maxHeight: "400px" }}>
      {/* Map items */}
      {mutation?.data?.map((item, idx) => (
        <div className="card my-1 px-2 py-2" key={idx}>
          <div className="card-header text-bg-dark fw-bold">{item.name}</div>
          <div className="card-body">
            <div>Cost: ${item.cost}</div>
            <div>Purchased on: {getFormattedDate(item.purchased_date)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserpagePurchases;
