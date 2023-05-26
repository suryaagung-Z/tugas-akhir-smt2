CREATE TABLE IF NOT EXISTS detail_nota (
    id_detail_nota SERIAL PRIMARY KEY,
    id_nota BIGINT NOT NULL,
    id_barang BIGINT NOT NULL,
    jumlah INTEGER NOT NULL,
    harga INTEGER NOT NULL,
    FOREIGN KEY (id_nota)
    REFERENCES nota (id_nota)
);