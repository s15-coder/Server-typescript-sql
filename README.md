# Express server + Typescript + Sequelize

A basic express server using typescript and Sequelize to handle a MySQL DB.

## Getting started

1. First at all, download the required packages:

    ```
    npm install
    ```

2. Once you have installed the dependencies you can start to modify the files and execute our server. To watch or observe our Typescript code changes execute in the root of the project:

    ```
    tsc --watch
    ```
3. The last command shown, listen the changes made in the typescript code and regenerate our javascript code recreating the ```/dist/``` folder. You can execute the entrypoint generated by typing:

    ```
    node /dist/app.js
    ```
    Is recommended install [nodemon](https://www.npmjs.com/package/nodemon) globally or as a dev dependency to listen the changes simultaneously your javascript code changes.
