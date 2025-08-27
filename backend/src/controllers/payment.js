import { Stripe } from "stripe";
import dotenv from "dotenv";
import Purchases from "../models/Purchases.js";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SANDBOX_SECRET_KEY);

export const createCheckoutSession = async (req, res) => {
  try {
    const cart = req.body.cart;

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

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      cancel_url: `http://localhost:5173/cart`,
      success_url: `http://localhost:5173/checkout/success`,
    });

    res.json(session);
  } catch (e) {
    res
      .status(500)
      .json({ status: "error", msg: "error creating checkout session" });
  }
};

export const retrieveCheckoutSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.body.sessionId);
    res.json(session);
  } catch (e) {
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

    const items = sessionLineItems.data.map((item) => {
      return {
        id: item.id,
        name: item.description,
        cost: item.amount_total / 100,
        quantity: item.quantity,
      };
    });

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
    res
      .status(400)
      .json({ status: "error", msg: "error saving purchase to DB" });
  }
};
