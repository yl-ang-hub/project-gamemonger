// export const fetchData = async (endpoint, method, body, queryParams = {}) => {
//   const searchParams = new URLSearchParams({
//     key: process.env.RAWG_API_KEY,
//     ...queryParams,
//   });

//   const finalUrl = `${
//     process.env.RAWG_API_DATABASE
//   }${endpoint}?${searchParams.toString()}`;
//   console.log("✅ FETCHING URL:", finalUrl);

//   const res = await fetch(
//     `${process.env.RAWG_API_DATABASE}${endpoint}?${searchParams.toString()}`,
//     {
//       method,
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     }
//   );
//   const data = await res.json();

//   if (!res.ok) {
//     if (data?.errors) {
//       console.error("data.errors", data.errors[0].msg);
//       throw data.errors[0].msg;
//     } else if (data.status === "error") {
//       console.error("data.msg", data.msg);
//       throw data.msg;
//     } else {
//       console.error("final", data);
//       throw "an unknown error has occurred, please try again later";
//     }
//   }
//   return data;
// };

export const fetchData = async (endpoint, method, body) => {
  console.log("no params");
  const uri = `${process.env.RAWG_API_DATABASE}${endpoint}?key=${process.env.RAWG_API_KEY}`;
  console.log("✅ FETCHING URL:", uri);
  const res = await fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (!res.ok) {
    if (data?.errors) {
      console.error("data.errors", data.errors[0].msg);
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

export const fetchDataWithParams = async (endpoint, method, body, params) => {
  const uri = `${process.env.RAWG_API_DATABASE}${endpoint}?key=${process.env.RAWG_API_KEY}&search=${params}`;
  console.log("✅ FETCHING URL:", uri);
  const res = await fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (!res.ok) {
    if (data?.errors) {
      console.error("data.errors", data.errors[0].msg);
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

export const fetchDataWithParams2 = async (endpoint, method, body, params) => {
  const uri = `${process.env.RAWG_API_DATABASE}${endpoint}?key=${process.env.RAWG_API_KEY}&page=${params}`;
  console.log("✅ FETCHING URL:", uri);
  const res = await fetch(uri, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  if (!res.ok) {
    if (data?.errors) {
      console.error("data.errors", data.errors[0].msg);
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
