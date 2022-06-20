import type { NextApiRequest, NextApiResponse } from 'next'
import usersRepository from '../../../../database/users_helpers'
import Users from '../../../../models/users'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Users | Users[] | string>
) {
    console.log("req.method:", req.method)
    switch (req.method) {
        // case 'GET' or 'POST'
        case 'GET' || 'POST':
            read(req, res)
            break
        case 'PUT':
            update(req, res)
            break
        case 'DELETE':
            delete_user(req, res)
            break
        default:
            res.status(501).send("Wrong method")
    }
}

// Async function to read a user with req.id from database and return a response
async function read(req: NextApiRequest, res: NextApiResponse<Users | string>): Promise<void> {
    const id: number = +req.query.id
    usersRepository.read(id, (user) => {
        if (user) {
            res.json(user)
        } else {
            res.status(404).send("Error: User not found")
        }
    })
}

// Async function to update a user with req.id from database and return a response
async function update(req: NextApiRequest, res: NextApiResponse<Users | string>): Promise<void> {
    const id: number = +req.query.id
    const user: Users = req.body

    usersRepository.update(id, user, (notFound) => {
        if (notFound) {
            res.status(404).send("User not found")
        } else {
            read(req, res)
        }
    })
}

// Async function to delete a user with req.id from database and return a response
async function delete_user(req: NextApiRequest, res: NextApiResponse<Users | string>): Promise<void> {
    const id: number = +req.query.id
    usersRepository.delete(id, (notFound) => {
        if (notFound) {
            res.status(404).send("User not found")
        } else {
            return res.status(204).send("User deleted")
        }
    })
}