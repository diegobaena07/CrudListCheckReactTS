/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cyidu5ka1s0ikbt")

  collection.name = "Tareas"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cyidu5ka1s0ikbt")

  collection.name = "Tareas_Diarias"

  return dao.saveCollection(collection)
})
