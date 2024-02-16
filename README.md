TP Pizza
- Sophie Toussaint
- Juventin Nguyen

Etape 3
- a: 2540
- b : 155
- c : 20
- d : 40
- e : 75, Cheese 
- f : medium 
- g : 650, pizza id n° 4

Etape 4 : 
Calcul du nombre moyen de pizzas commandées:

db.orders.aggregate([{$group: {_id : "_id", avgQuantity: { $avg: "$quantity" }}}])
[ { _id: '_id', avgQuantity: 19.375 } ]

Calcul de la quantité de pizzas commandées par format "medium" pour chaque recette de pizza :

 db.orders.aggregate([{$group : { _id : "$name" , mediumQty: {$sum : "$quantity"} }}])
[
  { _id: 'Vegan', mediumQty: 20 },
  { _id: 'Pepperoni', mediumQty: 60 },
  { _id: 'Cheese', mediumQty: 75 }
]