// // ...

// // подготовка базы данных к тестам
// await postCollection.drop();
// const info = await postCollection.insertMany([
//   { title: "x1" },
//   { title: "x2" },
// ]);

// // CRUD
// const insertedInfo = (await postCollection.insertOne(post)(
//   await postCollection
//     .find({ title: "xxx" }, { projection: { title: 1, _id: 0 } })
//     .toArray()
// )) as { title: string }[];
// await postCollection.findOne({ _id: insertedInfo.insertedId });
// await postCollection.updateOne(
//   { _id: insertedInfo.insertedId },
//   {
//     $set: { title: "x4" },
//   }
// );
// await postCollection.deleteOne({ _id: insertedInfo.insertedId });

// // работа с ид
// new ObjectId(req.params.id);
// createdInfo.id.toString();
