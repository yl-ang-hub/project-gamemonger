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

#### Search feature

### Gamepage

The gamepage was designed to showcase the basic information of each game that routered from other paths/endpoints and to serve as a favourite and purchase point for the user to proceed to next course of action. And also to leave reviews after playing the game.

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

### Cartpage

#### Payment feature

### Loginpage

## Backend
