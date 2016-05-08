# PracticaNode
**Created by Michel Barbou Salvador**
Práctica de node.js para el Master Keepcoding

# Arranque conexión MongoDB

En donde tengamos instalado MongoDB ejecutamos  **./start.sh**
que contiene el comando **bin/mongod --dbpath ./data/db --directoryperdb**

# Populate de la BD.
https://github.com/toymachiner62/node-mongo-seeds

- Run $ npm install -g node-mongo-seeds
- Run $ seed-setup from the root of your project to generate a seed.json file
- Replace "localhost/LOCAL_DB_NAME" with the path to your mongodb in your brand new seed.json file
- Create a /seeds folder in your project root and put .json files in there. The name of the file is going to be the collection name in mongo and the contents of the file will be populated into that mongo collection.
- Run $ seed to seed your mongodb with all your data from your /seeds folder.

**Note:** Every time you run $ seed it will blow away all the data in your collections and re-populate them with whatever is in your /seeds directory.




