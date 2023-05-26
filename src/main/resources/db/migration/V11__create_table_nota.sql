CREATE TABLE IF NOT EXISTS nota (
    id_nota SERIAL PRIMARY KEY,
    id_pembeli BIGINT NOT NULL,
    waktu_pesan TIMESTAMP NOT NULL,
    total INTEGER NOT NULL,
    FOREIGN KEY (id_pembeli)
    REFERENCES pembeli (id_pembeli)
);