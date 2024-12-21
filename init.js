const db = require('better-sqlite3')
const sql = new db('data.db')


sql.exec(`DROP TABLE IF EXISTS users`)
sql.exec(`
    CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        surname TEXT,
        login TEXT,
        password TEXT
    )
`)


sql.exec(`DROP TABLE IF EXISTS tests`)
sql.exec(`
    CREATE TABLE IF NOT EXISTS tests(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        user_id INTEGER,
        img_url TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`)


sql.exec(`DROP TABLE IF EXISTS questions`)
sql.exec(`
    CREATE TABLE IF NOT EXISTS questions(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        text TEXT,
        test_id INTEGER,
        FOREIGN KEY (test_id) REFERENCES tests(id)
    )
`)


sql.exec(`DROP TABLE IF EXISTS answers`)
sql.exec(`
    CREATE TABLE IF NOT EXISTS answers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        option TEXT,
        correct_answer TEXT,
        question_id INTEGER,
        FOREIGN KEY (question_id) REFERENCES questions(id)
    )
`)


sql.exec(`DROP TABLE IF EXISTS scores`)
sql.exec(`
    CREATE TABLE IF NOT EXISTS scores(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        result TEXT,
        user_id INTEGER,
        test_id INTEGER,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (test_id) REFERENCES tests(id)
    )
`)


sql.exec(`DROP TABLE IF EXISTS results`)
sql.exec(`
    CREATE TABLE IF NOT EXISTS results(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        quest_id INTEGER,
        user_id INTEGER,
        selected_answer TEXT,
        FOREIGN KEY (quest_id) REFERENCES questions(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
    )
`)
