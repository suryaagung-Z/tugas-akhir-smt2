CREATE TABLE IF NOT EXISTS kategori (
    id_kategori VARCHAR (255) PRIMARY KEY NOT NULL,
    id_admin BIGINT NOT NULL,
    nama_kategori VARCHAR (255) NOT NULL,
    gambar_url VARCHAR (255) NOT NULL,
    waktu_ditambahkan TIMESTAMP NOT NULL,
    terakhir_diperbarui TIMESTAMP NOT NULL,
    FOREIGN KEY (id_admin)
    REFERENCES user_admin (id_admin)
);