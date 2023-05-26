CREATE TABLE IF NOT EXISTS user_admin (
    id_admin SERIAL PRIMARY KEY,
    nama_admin VARCHAR (255) NOT NULL,
    terakhir_masuk TIMESTAMP NOT NULL,
    email VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL
);