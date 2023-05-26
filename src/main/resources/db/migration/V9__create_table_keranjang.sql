CREATE TABLE IF NOT EXISTS keranjang (
    id_keranjang SERIAL PRIMARY KEY NOT NULL,
    id_pembeli BIGINT NOT NULL,
    id_barang BIGINT NOT NULL,
    jumlah INT NOT NULL,
    sub_total INT NOT NULL,
    status_pesan BOOLEAN NOT NULL,
    FOREIGN KEY (id_pembeli)
    REFERENCES pembeli (id_pembeli),
    FOREIGN KEY (id_barang)
    REFERENCES barang (id_barang)
);