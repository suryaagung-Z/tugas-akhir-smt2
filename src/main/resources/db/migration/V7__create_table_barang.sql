CREATE TABLE IF NOT EXISTS barang (
    id_barang SERIAL PRIMARY KEY NOT NULL,
    id_kategori VARCHAR (255) NOT NULL,
    id_admin BIGINT NOT NULL,
    nama_barang VARCHAR (255) NOT NULL,
    deskripsi TEXT NOT NULL,
    harga INT NOT NULL,
    stok BOOLEAN NOT NULL,
    gambar_url VARCHAR (255) NOT NULL,
    waktu_ditambahkan TIMESTAMP NOT NULL,
    terakhir_diperbarui TIMESTAMP NOT NULL,
    status_aktif BOOLEAN NOT NULL,
    terjual INT NOT NULL,
    FOREIGN KEY (id_kategori)
    REFERENCES kategori (id_kategori),
    FOREIGN KEY (id_admin)
    REFERENCES user_admin (id_admin)
);