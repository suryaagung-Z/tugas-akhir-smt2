package com.core.perabot.model.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Table(name = "barang")
@Entity
public class Barang {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_barang")
    private Long id_barang;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_kategori", referencedColumnName = "id_kategori")
    private Kategori id_kategori;

    @Column(name = "id_admin")
    private  Long id_admin;

    @Column(name = "nama_barang")
    private String nama_barang;

    @Column(name = "deskripsi")
    private String deskripsi;

    @Column(name = "harga")
    private Integer harga;

    @Column(name = "stok")
    private Boolean stok;

    @Column(name = "gambar_url")
    private String gambar_url;

    @CreationTimestamp
    @Column (name = "waktu_ditambahkan")
    private String waktu_ditambahkan;

    @UpdateTimestamp
    @Column (name = "terakhir_diperbarui")
    private String terakhir_diperbarui;

    @Column(name = "status_aktif")
    private Boolean status_aktif;

    @Column(name = "terjual")
    private Integer terjual;
}

