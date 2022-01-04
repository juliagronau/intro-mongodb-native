import { MongoClient, ObjectId } from "mongodb";

//Connectionstring
const url = process.env.MONGO_URI;
//MongoClient Instanz erstellen
const client = new MongoClient(url);
//Namen den DB in einer variable speichern
const dbName = "test";

//am Client die connect Methode verwenden, db Modul erstellen

try {
  await client.connect();
  console.log("Connected successfully to server");
} catch (error) {
  console.log(error);
}

//Da all unsere Queries an der "test" DB durchgeführt werden sollen, legen wir die db einmal im client fest und müssen
//daher nicht in jeder einzelnen Query spezifizieren, an welceh DB wir ranwollen
const db = client.db(dbName);

//Modul exportieren
export {db as default, ObjectId};
