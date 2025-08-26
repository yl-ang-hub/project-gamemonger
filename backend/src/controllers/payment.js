import { Stripe } from "stripe";
import dotenv from "dotenv";
import Purchases from "../models/Purchases.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SANDBOX_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    console.log("running backend createCheckoutSession");
    const cart = req.body.cart;
    console.log(cart);
    const lineItems = cart.map((item) => {
      return {
        price_data: {
          currency: "sgd",
          product_data: {
            name: item.name,
          },
          unit_amount: parseInt(Math.ceil(item.price * 100)),
        },
        quantity: item.quantity,
      };
    });
    console.log(lineItems);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      cancel_url: `http://localhost:5173/cart`,
      success_url: `http://localhost:5173/checkout/success`,
    });

    console.log("gotten response from stripe");
    console.log(JSON.stringify(session));

    // res.redirect(session.url);
    res.json(session);
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({ status: "error", msg: "error creating checkout session" });
  }
};

export const retrieveCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
    console.log("outcome of retrieveCheckoutSession", session);
    res.json(session);
  } catch (e) {
    console.error(e.message);
    res
      .status(500)
      .json({ status: "error", msg: "error retrieving checkout session" });
  }
};

export const saveSuccessfulPurchase = async (req, res) => {
  try {
    const sessionLineItems = await stripe.checkout.sessions.listLineItems(
      req.body.checkoutSessionId,
      { limit: 100 }
    );
    console.log("sessionLineItems from stripe", sessionLineItems);

    const items = sessionLineItems.data.map((item) => {
      return {
        id: item.id,
        name: item.description,
        cost: item.amount_total / 100,
        quantity: item.quantity,
      };
    });
    console.log(JSON.stringify(items));

    // New purchase record
    const settledOrder = {
      userId: req.body.userId,
      sessionId: req.body.checkoutSessionId,
      amount: req.body.amount / 100,
      items,
    };

    // Find by session ID and update if exists
    const order = await Purchases.findOne({
      sessionId: req.body.checkoutSessionId,
    });
    if (order) {
      console.log("found existing order in db");
      await Purchases.findOneAndUpdate(
        { sessionId: req.body.checkoutSessionId },
        settledOrder
      );
    } else {
      // Else create new record
      await Purchases.create(settledOrder);
    }

    res.json({
      status: "ok",
      msg: "purchase saved in database",
      items: sessionLineItems,
    });
  } catch (e) {
    console.error(e.message);
    res
      .status(400)
      .json({ status: "error", msg: "error saving purchase to DB" });
  }
};

const sessionRes = {
  id: "cs_test_b1k4CO7i182LP2ULomeMySOxO5BZtECXQEkWxwAfSxlI9s2JOsSdXkl4wa",
  object: "checkout.session",
  adaptive_pricing: { enabled: true },
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 14995,
  amount_total: 14995,
  automatic_tax: {
    enabled: false,
    liability: null,
    provider: null,
    status: null,
  },
  billing_address_collection: null,
  cancel_url: "http://localhost:5173/cart",
  client_reference_id: null,
  client_secret: null,
  collected_information: null,
  consent: null,
  consent_collection: null,
  created: 1756217628,
  currency: "sgd",
  currency_conversion: null,
  custom_fields: [],
  custom_text: {
    after_submit: null,
    shipping_address: null,
    submit: null,
    terms_of_service_acceptance: null,
  },
  customer: null,
  customer_creation: "if_required",
  customer_details: null,
  customer_email: null,
  discounts: [],
  expires_at: 1756304028,
  invoice: null,
  invoice_creation: {
    enabled: false,
    invoice_data: {
      account_tax_ids: null,
      custom_fields: null,
      description: null,
      footer: null,
      issuer: null,
      metadata: {},
      rendering_options: null,
    },
  },
  livemode: false,
  locale: null,
  metadata: {},
  mode: "payment",
  origin_context: null,
  payment_intent: null,
  payment_link: null,
  payment_method_collection: "if_required",
  payment_method_configuration_details: {
    id: "pmc_1S02SGRiJtKZEKpaRho8gaxc",
    parent: null,
  },
  payment_method_options: { card: { request_three_d_secure: "automatic" } },
  payment_method_types: ["card", "paynow", "link"],
  payment_status: "unpaid",
  permissions: null,
  phone_number_collection: { enabled: false },
  recovered_from: null,
  saved_payment_method_options: null,
  setup_intent: null,
  shipping_address_collection: null,
  shipping_cost: null,
  shipping_options: [],
  status: "open",
  submit_type: null,
  subscription: null,
  success_url: "http://localhost:5173/checkout/success",
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  ui_mode: "hosted",
  url: "https://checkout.stripe.com/c/pay/cs_test_b1k4CO7i182LP2ULomeMySOxO5BZtECXQEkWxwAfSxlI9s2JOsSdXkl4wa#fidkdWxOYHwnPyd1blpxYHZxWjA0VjU3V25XbE9xTl9ATnVkRkNCSk1dMzxkZlE2TkJhQW1kUFRVbUNKY3Q1aE5UUVZORjFnZDdqTkhBMkpjQnZCUF18XGJLR3dJaEluSU5jXTZWRENUcjJ8NTU1ZlVdUVRJMicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl",
  wallet_options: null,
};
