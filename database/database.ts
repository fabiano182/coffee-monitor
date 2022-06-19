import sqlite3 from 'sqlite3'

const DBSOURCE = './database/database.sqlite'

const SQL_USERS_CREATE = `
	CREATE TABLE users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT,
		email TEXT,
		joinedAt DATE,
		active INTEGER
	)`

const Database = new sqlite3.Database(DBSOURCE, (err) => {
	if (err) {
		console.error(err.message)
		throw err
	} else {
		console.log('Connected to Database')
		Database.run(SQL_USERS_CREATE, (err) => {
		if (err) {
            console.log(err.message)
        } else {
			console.log('Created users table successfully!')
		}
	})
	}
})

export default Database