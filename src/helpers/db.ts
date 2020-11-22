import { Dexie } from "dexie";

const db = new Dexie("ShoppingDB");
db.version(1).stores({
  cart: "_id, name, size, quantity, price, image_cover",
});