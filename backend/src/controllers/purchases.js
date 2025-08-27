import Purchases from "../models/Purchases.js";

function insertionSort(items) {
  for (let i = 1; i < items.length; i++) {
    for (let j = i; j > 0; j--) {
      if (items[j].purchased_date > items[j - 1].purchased_date) {
        [items[j - 1], items[j]] = [items[j], items[j - 1]];
      } else {
        break;
      }
    }
  }
  return items;
}

export const getPurchases = async (req, res) => {
  try {
    const purchases = await Purchases.find({ userId: req.body.userId });

    // Flatten all items into one array
    let results = [];
    for (const purchase of purchases) {
      let items = [...purchase.items];
      for (let item of items) {
        item.purchased_date = purchase.purchased_date;
      }
      results = [...results, ...items];
    }

    // Sort by purchase date - newest to oldest
    results = insertionSort(results);

    res.json(results);
  } catch (e) {
    console.error(e.message);
    res
      .status(400)
      .json({ status: "ok", msg: "cannot get purchases from database" });
  }
};
