# Docker + MongoDB Starter Kit

## En option, création de la base de données au lancement du service MongoDB

- Choisissez entre les 2 options suivantes :
  - Option 1 : Création de la base de données, puis import manuel
  - Option 2 : Création de la base de données, puis import automatique de données JSON (adaptez le contenu du fichier ./mongo_db/import/data.json)

- Adaptez le fichier ./mongo_db/init-mongo.sh en fonction de l'option choisie

- Adaptez le fichier ./docker-compose.yml en fonction de l'option choisie (cf. volumes du service mongo_db)

Attention, si les données du ./mongo_db/import/data.json sont incorrectes, l'import échouera et le service mongo_db peut ne pas se lancer.

## Connexion à la base de données MongoDB

```SH
mongosh admin --username <user> --password <password> --port <port>
```

- Exemple :

```SH
mongosh admin --username us3r --password ap4ssw0rd --port <port>
```

## Connection String URI

`mongodb://johndoe:azerty@localhost:27018/?authSource=books_db`

## Sauvegarde de la base de données MongoDB

```SH
docker exec -i <docker-mongodb-service> /usr/bin/mongodump --username <user> --password <password> --authenticationDatabase admin --db <db> --archive > ./mongodb.dump
```

- Exemple :

```SH
docker exec -i mongo_db /usr/bin/mongodump --username us3r --password ap4ssW0rd --authenticationDatabase admin --db books_db --archive > ./mongodb.dump
```

## Restauration de la base de données MongoDB

```SH
docker exec -i <docker-mongodb-service> /usr/bin/mongorestore --username <user> --password <password> --authenticationDatabase admin --nsInclude="<database_name>.*" --archive < ./mongodb.dump
```

- Exemple :

```SH
docker exec -i mongo_db /usr/bin/mongorestore --username us3r --password ap4ssW0rd --authenticationDatabase admin --nsInclude="books_db.*" --archive < ./mongodb.dump
```

## Crédits

Collection "books" (./mongo_db/import/data.json) : <https://www.mongodbtutorial.org/>

--

!["Logotype Shrp"](https://shrp.dev/images/shrp.png)

__Alexandre Leroux__  
_Enseignant / Formateur_  
_Développeur logiciel web & mobile_

Nancy (Grand Est, France)

<https://shrp.dev>
