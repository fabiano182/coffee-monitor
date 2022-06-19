import Users from '../models/users'
import Database from './database'

const usersRepository = {
	create: (user: Users, callback: (id?: number) => void) => {
		const sql = 'INSERT INTO users (name, email, joinedAt, active) VALUES (?, ?, ?, ?)'
		const params = [user.name, user.email, user.joinedAt, user.active]
		Database.run(sql, params, function(_err) {
			callback(this?.lastID)
		})
	},

	readAll: (callback: (users: Users[]) => void) => {
		const sql = 'SELECT * FROM users'
		const params: any[] = []
		Database.all(sql, params, (_err, rows) => callback(rows))
	},

	read: (id: number, callback: (users?: Users) => void) => {
		const sql = 'SELECT * FROM users WHERE id = ?'
		const params = [id]
		Database.get(sql, params, (_err, row) => callback(row))
	},

	update: (id: number, users: Users, callback: (notFound: boolean) => void) => {
		const sql = 'UPDATE users SET name = ?, email = ?, active = ? WHERE id = ?'
		const params = [users.name, users.email, users.active, id]
		Database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},

	delete: (id: number, callback: (notFound: boolean) => void) => {
		const sql = 'DELETE FROM users WHERE id = ?'
		const params = [id]
		Database.run(sql, params, function(_err) {
			callback(this.changes === 0)
		})
	},
}

export default usersRepository