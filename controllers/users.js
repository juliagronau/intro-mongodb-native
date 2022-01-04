import db, { ObjectId } from "../db/client.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await db.collection("users").find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
// Geht auch mich .then() & .catch() statt try-catch  
//   await db
//     .collection("users")
//     .find()
//     .toArray()
//     .then((data) => res.status(200).json({ users: data }))
//     .catch((error) => res.status(500).json({ error: error.message }));
};
export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db
      .collection("users")
      .findOne({ _id: ObjectId(id) });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const createUser = async (req, res) => {
  try {
    const { first_name, last_name } = req.body;
    const newUser = await db
      .collection("users")
      .insertOne({ first_name: first_name, last_name: last_name });
    res.status(201).json(newUser); //schickt uns nicht das neu erstellte Document zurück, sondern den Status ("acknowledged": true)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await db
      .collection("users")
      .deleteOne({ _id: ObjectId(id) });
    res.status(200).json(deletedUser); //schickt uns nicht das gelöschte Document zurück, sondern den Status ("acknowledged": true)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name } = req.body;
    const updatedUser = await db
      .collection("users")
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { first_name, last_name } }
      );
    res.status(200).json(updatedUser); //schickt uns nicht das aktualisierte Document zurück, sondern den Status ("acknowledged": true)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
