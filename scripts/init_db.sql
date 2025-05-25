DROP TABLE IF EXISTS adoptions;
DROP TABLE IF EXISTS users;

CREATE TABLE adoptions (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    age INTEGER,
    breed TEXT,
    state TEXT,
    species TEXT NOT NULL
);

CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);