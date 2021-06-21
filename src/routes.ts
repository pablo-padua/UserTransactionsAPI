import { Router } from "express";
import UsersControllers from "./Controllers/UsersControllers";
import AuthControllers from "./Controllers/AuthControllers";
import TransactionsControllers from './Controllers/TransactionsControllers'

const routes = Router();
const users = UsersControllers;
const auth = AuthControllers;
const trans = TransactionsControllers;


routes.get("/api/v1/list-users", users.getUsers);
routes.post("/api/v1/user", users.createUser);
routes.delete("/api/v1/user/:id", users.deleteUser);
routes.post("/api/v1/auth", auth.userLogin);
routes.get("/api/v1/auth", auth.checkAuthenticated);
routes.post("/api/v1/transaction", trans.createTransaction);
routes.put("/api/v1/transaction/:transactionId", trans.updateTransaction);
routes.get("/api/v1/transaction/:transactionId", trans.getTransaction);
routes.delete("/api/v1/transaction/:transactionId", trans.deleteTransaction);
routes.get("/api/v1/transaction/:description?/:date?/:income?/:outflow?", trans.transactionsByUser);


export default routes;