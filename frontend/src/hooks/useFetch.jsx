const useFetch = () => {
  try {
    const fetchData = async (endpoint, method, body, token) => {
      const uri = import.meta.env.VITE_SERVER + endpoint;
      console.log(uri);
      const res = await fetch(uri, {
        method,
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });
      console.log("Ok");
      const data = await res.json();

      if (!res.ok) {
        if (data?.errors) {
          const errorMsgArray = data.msg.map((error) => error.msg);
          const errorMsgs = errorMsgArray.join(", ");
          console.error("data.errors: ", errorMsgs);
          throw data.errors[0].msg;
        } else if (data.status === "error") {
          console.error("data.msg", data.msg);
          throw data.msg;
        } else {
          console.error("final", data);
          throw "an unknown error has occurred, please try again later";
        }
      }

      return data;
    };

    return fetchData;
  } catch (err) {
    console.error(err.message);
    return { ok: false, msg: "data error" };
  }
};

export default useFetch;
