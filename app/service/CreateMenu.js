const { MongoClient } = require("mongodb");
require("dotenv").config();
const uri = "mongodb://sophie_toussaint:caolso14vylb@localhost:27018";
const client = new MongoClient(uri);
const fs = require("fs");


async function createMenuCollection() {
    const database = client.db("pizzas_orders_db");
    const orders = database.collection("orders");

    const menu = await orders.aggregate([
        {
            $group: {
                _id: "$pizza",
                menuItems: {
                    $push: {
                        _id: "$_id",
                        name: "$name",
                        size: "$size",
                        price: "$price",
                    },
                },
            },
        },
    ]).toArray();

    const menuJSON = JSON.stringify(menu);
    fs.writeFileSync("menu.json", menuJSON);
}

createMenuCollection();
