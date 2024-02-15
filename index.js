const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://LaMouettas:root@localhost:27018/";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('pizzas_orders_db');
    const orders = database.collection('orders');
  
    const query = { name: 'Pepperoni' };
    const order = await orders.findOne(query);
    console.log(order);


  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);