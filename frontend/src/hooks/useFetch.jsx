const useFetch = () => {
  try {
    const fetchData = async (endpoint, method, body, token) => {
      const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        // to map all the errors (msg) from express-validator (array)
        if (Array.isArray(data.msg)) {
          const returnValue = data.msg.map((item, idx) => <p key={idx}>{item.msg}</p>);
          return { ok: false, msg: returnValue };
        } else {
          // to reflect any other errors (not array)
          return { ok: false, msg: data.msg };
        }
      } else {
        return { ok: true, data };
      }
    };

    return fetchData;
  } catch (err) {
    console.error(err.message);
    return { ok: false, msg: "data error" };
  }
};

export default useFetch;
