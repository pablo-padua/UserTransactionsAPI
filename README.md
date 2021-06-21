# :moneybag: User Transactions

This is an api with authorization bearer token.
You can create a user and set up some transaction's details such as income, outflow, description and date.
NodeJS (TypeScript), PostgreSQL, Redis and Postman was used during development.

Synchronize is set to true on the ormconfig file, meaning it will auto create tables (Users and Transactions) upon server start.

Authorization type: bearer token, using the standard authentication method: 
Authorization will only work with bearer token auth, as specified in this README.md file.

Default postgres database connection is on the ormconfig.json file, default redis connection is on the src/Config/cache.ts file.

## :monorail: Routes
- GET("/api/v1/list-users")
  * Returns a list of all users in the database.
  
- POST("/api/v1/user")
  * Requires a json body with a new user info, returns a json with the newly created user.
  
- DELETE("/api/v1/user/:id")
  * Returns the id of the user that was just deleted.
  
- POST("/api/v1/auth")
  * Returns an authorized bearer token.
  
- GET("/api/v1/auth")
  * Returns true if user's bearer token is authorized.
  
- POST("/api/v1/transaction")
  * Requires a json body with the new transaction's info, returns a json with the newly created transaction.
  
- PUT("/api/v1/transaction/:transactionId")
  * Requires an id param and a json body with the updated transaction's info, returns a json with the updated transaction.
  
- GET("/api/v1/transaction/:transactionId")
  * Requires an id param and returns a json with the transaction's body.
  
- DELETE("/api/v1/transaction/:transactionId")
  * Requires an id param and returns the id of the recently deleted transaction.
  
- GET("/api/v1/transaction/:description?/:date?/:income?/:outflow?")
  * Possible to pass in some params, returns information about all of the user's transactions.
