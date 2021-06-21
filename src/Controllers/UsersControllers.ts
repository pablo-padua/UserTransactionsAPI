import { isOverEighteen, salt, validEmail, validPassword } from '../utils';
import { Users } from "../Interfaces/Users";
import { Request, Response } from 'express';
import { getRepository } from "typeorm";
import bcrypt from 'bcrypt';
import cache from '../Config/cache';

export const getUsers = async (req: Request, res: Response) => {
    const users = await getRepository(Users).find();
    return res.json(users);
};

export const createUser = async (req: Request, res: Response) => {

    const user: Users = req.body;
    const login = await Users.find({ where: { login: user.login } });

    if (login[0]) {
        return res.status(400).send({ error: "Username already exists" });
    }
    if (!user.birthDate || !isOverEighteen(user.birthDate))
        return res.status(400).send({ error: "Invalid birthdate" });

    if (user.password.match(validPassword) && user.email.match(validEmail))
        user.password = bcrypt.hashSync(req.body.password, salt);
    else
        return res.status(400).send({ error: "Invalid Email or Password" });

    await getRepository(Users).save(user);
    return res.json(user);

};

export const deleteUser = async (req: Request, res: Response) => {

    const urlParam = req.params['id'];
    const user: Users["id"] = await cache.get(req.headers.authorization?.substring(7))
    if (!user)
        return res.status(400).send({ authenticated: "false", error: "No permission" });
    await getRepository(Users).delete(urlParam);
    return res.send({UserID: urlParam, Status: "Deleted"});

};

export default { getUsers, createUser, deleteUser };