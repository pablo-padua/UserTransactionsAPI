import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import cache from '../Config/cache';
import { Transactions } from '../Interfaces/Transactions';
import { Users } from '../Interfaces/Users';

export const createTransaction = async (req: Request, res: Response) => {

    const user: Users["id"] = await cache.get((req.headers.authorization)?.substring(7));

    if (!user)
        return res.status(400).send({ error: "No permission! User not authenticated" });
    const { date, description, income, outflow }: Transactions = req.body;

    if (!date)
        return res.status(400).send({ error: "Invalid Date!" });

    if (description && income >= 0 && outflow >= 0) {
        const result = await getRepository(Transactions).save({ date, description, income, outflow, user });
        return res.status(201).send(result);
    } else
        return res.status(400).send({ errorCode: res.statusCode, error: "Expected json data: date, description, income and outflow!" });

};

export const updateTransaction = async (req: Request, res: Response) => {

    const urlParam = req.params['transactionId'];
    const user: Users["id"] = await cache.get((req.headers.authorization)?.substring(7));

    if (!user)
        return res.status(400).send({ error: "No permission! User not authenticated" });

    const { date, description, income, outflow }: Transactions = req.body;

    if (!date)
        return res.status(400).send({ error: "Invalid Date!" });
    if (description && income >= 0 && outflow >= 0) {
        await getRepository(Transactions).update(urlParam, { date: date, description: description, income: income, outflow: outflow, user: user });
        return res.status(201).json(await getRepository(Transactions).findOne({ where: { id: urlParam } }));
    } else
        return res.status(400).send({ errorCode: res.statusCode, error: "Expected json data: date, description, income and outflow!" });
};

export const getTransaction = async (req: Request, res: Response) => {

    const urlParam = req.params['transactionId'];
    const user: Users["id"] = await cache.get((req.headers.authorization)?.substring(7));
    if (!user)
        return res.status(400).send({ authenticated: "false", error: "No permission" });
    return res.status(200).send(await getRepository(Transactions).findOne({ where: { id: urlParam } }));

};

export const transactionsByUser = async (req: Request, res: Response) => {
    const { description, date, income, outflow } = req.params;
    var recordsArray: any[] = [];
    const user: Users["id"] = await cache.get((req.headers.authorization)?.substring(7));
    if (!user)
        return res.status(400).send({ authenticated: "false", error: "No permission" });

    const records = await getRepository(Users).find({ where: { id: user }, relations: ["transactions"] });
    var inc: number = 0;
    var outf: number = 0;
    //Getting the transactions array according to user ID
    recordsArray = records[0].transactions;
    const recordsTotal = recordsArray.length;
    for (let index = 0; index < recordsArray.length; index++) {
        inc += recordsArray[index].income;
        outf += recordsArray[index].outflow;
    }
    return res.json({ "records": recordsArray, "recordsTotal": recordsTotal , "Balance" : (inc-outf)})

}

export const deleteTransaction = async (req: Request, res: Response) => {

    const urlParam = req.params['transactionId'];
    const user: Users["id"] = await cache.get((req.headers.authorization)?.substring(7));
    if (!user)
        return res.status(400).send({ authenticated: "false", error: "No permission" });
    await getRepository(Transactions).delete(urlParam);
    return res.send({ TransactionID: urlParam, Status: "Deleted" });
}

export default { createTransaction, updateTransaction, getTransaction, deleteTransaction, transactionsByUser };