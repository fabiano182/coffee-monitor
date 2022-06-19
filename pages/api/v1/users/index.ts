import type { NextApiRequest, NextApiResponse } from 'next'
import usersRepository from '../../../../database/users_helpers'
import Users from '../../../../models/users'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Users | Users[] | string>
) {
  switch (req.method) {
    case 'GET':
      readAll(req, res)
      break
    case 'POST':
      create(req, res)
      break
    default:
      res.status(501).send("Wrong method")
  }
}

// Async function to read all users from database and return a response
async function readAll(req: NextApiRequest, res: NextApiResponse<Users[] | string>): Promise<void> {
  usersRepository.readAll((users) => {
    if (users) {
      res.status(200).json(users)
    } else {
      res.status(404).send("Not found")
    }
  })
}

// Async function to add a new user to database and return an id as response
async function create(req: NextApiRequest, res: NextApiResponse<Users | string>): Promise<void> {

  usersRepository.readAll(
    (users) => {
      // if user exists, return error
      const user_exist = users.find(user => user.email === req.body.email)
      if (user_exist) {
        res.status(400).send(`Error: User already exists with id ${user_exist.id}`)
      } else {
        // add new user to database
        const user: Users = req.body
        user.joinedAt = new Date
        user.active = true
        usersRepository.create(user, (id) => {
          if (id) {
            res.status(201).redirect(`/api/v1/users/${id}`)
          } else {
            res.status(400).send("Bad request")
          }
        })
      }
    }
  )

}