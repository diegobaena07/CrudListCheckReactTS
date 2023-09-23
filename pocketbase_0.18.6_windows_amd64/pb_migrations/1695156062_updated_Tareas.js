/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cyidu5ka1s0ikbt")

  // remove
  collection.schema.removeField("j6ifvitb")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2acfzs6n",
    "name": "fecha",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cyidu5ka1s0ikbt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "j6ifvitb",
    "name": "fecha",
    "type": "date",
    "required": true,
    "presentable": true,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  // remove
  collection.schema.removeField("2acfzs6n")

  return dao.saveCollection(collection)
})
