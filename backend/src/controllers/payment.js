import { Stripe } from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SANDBOX_SECRET_KEY);

// export const createPaymentIntent = async (req, res) => {
//   try {
//     const cart = req.body.cart;
//     const totalAmount = cart.reduce((acc, item) => acc + item.price * 100, 0);

//     // Create PaymentIntent in Stripe
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: totalAmount,
//       currency: "sgd",
//       payment_method_types: ["card"],
//     });

//     res.json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (e) {
//     console.error(e.message);
//     res
//       .status(500)
//       .json({ status: "error", msg: "error creating payment intent" });
//   }
// };

export const createCheckoutSession = async (req, res) => {
  try {
    console.log("running backend createCheckoutSession");
    const cart = req.body.cart;
    const lineItems = cart.map((item) => {
      return {
        price_data: {
          currency: "sgd",
          product_data: {
            name: item.name,
          },
          unit_amount: parseInt(item.price * 100),
        },
        quantity: item.quantity,
      };
    });
    console.log(lineItems);

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      cancel_url: `http://localhost:5173/cart`,
      return_url: `http://localhost:5173/cart`,
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

const sessionRes = {
  id: "cs_test_b1bbNuO4rGgNQb5FBA4bS5U1hCOawAw6VSfobWlfJFqwueV3orCHkdblRz",
  object: "checkout.session",
  adaptive_pricing: { enabled: true },
  after_expiration: null,
  allow_promotion_codes: null,
  amount_subtotal: 12997,
  amount_total: 12997,
  automatic_tax: {
    enabled: false,
    liability: null,
    provider: null,
    status: null,
  },
  billing_address_collection: null,
  cancel_url: "http://localhost:5001/cart",
  client_reference_id: null,
  client_secret: null,
  collected_information: null,
  consent: null,
  consent_collection: null,
  created: 1756190390,
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
  expires_at: 1756276790,
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
  success_url: "http://localhost:5001/user",
  total_details: { amount_discount: 0, amount_shipping: 0, amount_tax: 0 },
  ui_mode: "hosted",
  url: "https://checkout.stripe.com/c/pay/cs_test_b1bbNuO4rGgNQb5FBA4bS5U1hCOawAw6VSfobWlfJFqwueV3orCHkdblRz#fidkdWxOYHwnPyd1blpxYHZxWjA0VjU3V25XbE9xTl9ATnVkRkNCSk1dMzxkZlE2TkJhQW1kUFRVbUNKY3Q1aE5UUVZORjFnZDdqTkhBMkpjQnZCUF18XGJLR3dJaEluSU5jXTZWRENUcjJ8NTU1ZlVdUVRJMicpJ2N3amhWYHdzYHcnP3F3cGApJ2lkfGpwcVF8dWAnPydocGlxbFpscWBoJyknYGtkZ2lgVWlkZmBtamlhYHd2Jz9xd3BgeCUl",
  wallet_options: null,
};
