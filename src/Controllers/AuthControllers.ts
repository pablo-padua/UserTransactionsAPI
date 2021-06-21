import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { secret } from '../Config/authconfig.json';
import { Users } from '../Interfaces/Users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cache from '../Config/cache';

export const userLogin = async (req: Request, res: Response) => {

    var { login, password } = req.body;
    const result = await getRepository(Users).createQueryBuilder("users").where("users.login = :login ", { login }).getOne();

    if (result) {

        const user: Users = result;

        const pw = await bcrypt.compare(password, user.password);

        if (!pw)
            return res.status(400).send({ error: 'Incorrect password' });

        const token = jwt.sign({ id: user.id }, secret, {
            expiresIn: 43200
        });

        cache.set(token, user.id, 43200);
        return res.json({ token });
    }
    else
        return res.status(400).send({ error: 'Incorrect login', Expected: "JSON" });
};

export const checkAuthenticated = async (req: Request, res: Response) => {

    const userId = await cache.get((req.headers.authorization)?.substring(7));

    if (userId) {
        const result = await getRepository(Users).createQueryBuilder("users").where(`users.id = ${userId}`).getOne();
        return res.send({ authenticated: "true", id: result?.id, nome: result?.name });

    } else
        return res.send({ authenticated: "false" });
};


export default { userLogin, checkAuthenticated };