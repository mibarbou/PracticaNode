# PracticaNode
**Created by Michel Barbou Salvador**
Práctica de node.js para el Master Keepcoding

# Arranque conexión MongoDB

En donde tengamos instalado MongoDB ejecutamos  **./start.sh**
que contiene el comando **bin/mongod --dbpath ./data/db --directoryperdb**

# Populate de la BD. Instrucciones de instalación.
https://github.com/toymachiner62/node-mongo-seeds

- Run $ npm install -g node-mongo-seeds
- Run $ seed-setup from the root of your project to generate a seed.json file
- Replace "localhost/LOCAL_DB_NAME" with the path to your mongodb in your brand new seed.json file
- Create a /seeds folder in your project root and put .json files in there. The name of the file is going to be the collection name in mongo and the contents of the file will be populated into that mongo collection.
- Run $ seed to seed your mongodb with all your data from your /seeds folder.

**Note:** Every time you run $ seed it will blow away all the data in your collections and re-populate them with whatever is in your /seeds directory.


# Funcionalidades realizadas en la API
- Servicio de registro/modificación de pust tokens put **apiv1/pushtokens**

    - plataforma: "ios" | "android"
    - token: String
    - usuario: String

- Servicios de registro y autenticación de usuario. post **apiv1/usuarios**  post **apiv1/usuarios/authenticate**

    **Registro**
    - nombre: String
    - clave: String
    - email: String

    **Autenticación**
    - nombre: String
    - clave: String


- Servicio de listado de anuncios con filtros,nombre,tag,venta,precio. get **apiv1/anuncios**

    **Header**
    - x-access-token: "token recibido en la respuesta de autenticación de usuario".

    **filtros por parámetro**
    - nombre
    - tag
    - venta
    - precio
    - sort
    - limit
    - start

- Autenticación JsonWebToken.
- Hash de las claves de usuario.
- Populate del la base de datos con el módulo npm node-mongo-seeds. *Usar el comando seed*
- Implementado el **cluster** para aprovechar todos los hilos de la máquina
- Servicio express static para las imagenes de los anuncios **/images/anuncios/<anuncio.foto>**

    - Ej. http://localhost/apiv1/images/anuncios/*iphone.jpg*

