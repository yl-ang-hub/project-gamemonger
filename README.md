# Abstract

Gamemonger is a demo of a MERN stack game storefront. It pulls in game data from [RawG](https://rawg.io/), and allow users to register and login in order to leave reviews or to purchase games.

> Disclaimer: This project is for demostration purposes only. The Stripe protocol used in this project is a sandbox and will not actually work as an real storefront.

# Enviroment Variables

### Frontend

- VITE_SERVER: the URI of the backend server

### Backend

- MONGODB_URI: the uri which MongoDB runs in
- PORT: the port the Express app runs in
- ACCESS_SECRET: secret key to access login function
- REFRESH_SECRET: secret key to enter a logged in session
- RAWG_API_KEY: key required to access the external API
  -RAWG_API_DATABASE: The URI to access to RAWG api (https://api.rawg.io/api)
- STRIPE_SANDBOX_SECRET_KEY: secret key for payment pages

# React Component Tree

![Component Tree](treediagram.png)

# MongoDB Database schema

![Component Tree](schema.png)

# App Development

## Frontend

### Homepage

#### Pagination

#### Search feature

### Gamepage

The gamepage was designed to showcase the basic information of each game that routered from other paths/endpoints and to serve as a favourite and purchase point for the user to proceed to next course of action. And also to leave reviews after playing the game.

#### Screenshot & trailer carousel

User will be served with the game's screenshots and trailers to have the first visual impression of the gameplay. This is designed with carousel concept by mapping the URLs and only displaying the selected one via `const [slide, setSlide] = useState(0)` and condtional `styles.css`.

Conditional css for `Arrow indicators`:

```Javascript
className={ slide === idx ? styles.slide : styles.slideHidden }
```

Conditional css for `Button indicators`:

```Javascript
className={ slide === idx ? styles.indicator : `${styles.indicator} ${styles.indicatorInactive}`}
```

The slide's state is controlled by both the `Arrow indicators` located on the left and right.

```Javascript
  const nextSlide = () => {
    setSlide((prev) =>
      prev === queryGameScreenShots.data.results.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setSlide((prev) =>
      prev === 0 ? queryGameScreenShots.data.results.length - 1 : prev - 1
    );
  };
```

#### Review feature

![Review Feature](./frontend/src/assets/readMeFiles/gamePageReview.png)
Easy-to-click rating is implemented using stars icon so that provides an interactive experience with the user.

### Cartpage

#### Payment feature

### Loginpage

---

## Backend

### Process flow after HTTP request begains

#### Server to Routers to Controllers to Middleware or Models

1. First HTTP request comes in

```javascript
app.use("/api", rawgApi);
```

2. Diverted to Router

```javascript
router.get("/games", rawgApi.getGamesPaginated);
```

3. Invoked functions within controllers

```javascript
export const getGamesPaginated = async (req, res) => {
  try {
    const data = await fetchDataWithParams2("/games", "GET", undefined, {
      page: req.query.page,
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
```

4. Fetch data

```javascript
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
```

#### Various checks in place throughout the API calls

Basic checks on the incoming HTTP Request

```javascript
app.use(cors());
app.use(helmet());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
```

# Thank you!

Thanks for reading this project! If you have any question, do feel free to contact us!
