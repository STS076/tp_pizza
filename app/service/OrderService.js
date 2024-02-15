const { MongoClient } = require("mongodb");
const uri = "mongodb://sophie_toussaint:caolso14vylb@localhost:27018/";
const client = new MongoClient(uri);

async function getOrdersByPizza(name) {
    const database = client.db('pizzas_orders_db');
    const orders = database.collection('orders');

    const query = { name: name };
    const order = await orders.findOne(query);
    console.log(order);

}

async function getOrdersBySize(size) {
    const database = client.db('pizzas_orders_db');
    const orders = database.collection('orders');

    const query = { size: size };
    const order = await orders.findOne(query);
    console.log(order);
}


async function getOrders(){

    
}