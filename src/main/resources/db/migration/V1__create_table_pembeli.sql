CREATE TABLE IF NOT EXISTS pembeli (
    id_pembeli SERIAL PRIMARY KEY,
    nama_pembeli VARCHAR(255) NOT NULL,
    no_hp VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);