export const fetchData = async (endpoint, method, body) => {
  const uri = `${process.env.RAWG_API_DATABASE}${endpoint}?key=${process.env.RAWG_API_KEY}`;
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
      throw data.errors[0].msg;
    } else if (data.status === "error") {
      throw data.msg;
    } else {
      throw "an unknown error has occurred, please try again later";
    }
  } else {
    return data;
  }
};

export const fetchDataWithParams = async (endpoint, method, body, params) => {
  const uri = `${process.env.RAWG_API_DATABASE}${endpoint}?key=${process.env.RAWG_API_KEY}&search=${params}`;

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
      throw data.errors[0].msg;
    } else if (data.status === "error") {
      throw data.msg;
    } else {
      throw "an unknown error has occurred, please try again later";
    }
  }
  return data;
};

export const fetchDataWithParams2 = async (endpoint, method, body, params) => {
  const searchParams = new URLSearchParams({
    key: process.env.RAWG_API_KEY,
    ...params,
  });
  const uri = `${
    process.env.RAWG_API_DATABASE
  }${endpoint}?${searchParams.toString()}`;
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
      throw data.errors[0].msg;
    } else if (data.status === "error") {
      throw data.msg;
    } else {
      throw "an unknown error has occurred, please try again later";
    }
  }
  return data;
};

export const fetchDataWithParams3 = async (
  endpoint,
  method,
  body,
  params = {}
) => {
  // params should be an object, e.g. { page: 2, search: 'zelda' }
  const searchParams = new URLSearchParams({
    key: process.env.RAWG_API_KEY,
    ...params,
  });
  const uri = `${
    process.env.RAWG_API_DATABASE
  }${endpoint}?${searchParams.toString()}`;
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
      throw data.errors[0].msg;
    } else if (data.status === "error") {
      throw data.msg;
    } else {
      throw "an unknown error has occurred, please try again later";
    }
  }
  return data;
};
