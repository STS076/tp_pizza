const { MongoClient } = require("mongodb");
const uri = "mongodb://sophie_toussaint:caolso14vylb@localhost:27018/";
const client = new MongoClient(uri);


class OrderService {
    getOrdersByPizza(name) {
        const database = client.db('pizzas_orders_db');
        const orders = database.collection('orders');

        const query = { name: name };
        const order = orders.find(query);
        order.forEach(console.log);
    }


    getOrdersBySize(size) {
        const database = client.db('pizzas_orders_db');
        const orders = database.collection('orders');

        const query = { size: size };
        const order = orders.find(query);
        order.forEach(console.log);
    }


    getOrders() {
        const db = client.db("pizzas_orders_db");
        const coll = db.collection("orders");

        const orders = coll.find();
        // iterate code goes here
        orders.forEach(console.log);
    }
}

const order = new OrderService()
console.log( order.getOrdersByPizza("Pepperoni") )
console.log( order.getOrdersBySize("small") )
console.log( order.getOrders() )