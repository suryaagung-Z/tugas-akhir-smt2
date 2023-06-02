package com.core.perabot.model.models;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@Table(name = "kategori")
@Entity
public class Kategori {

    @Id
    @Column(name = "id_kategori")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id_kategori;

    @Column(name = "id_admin")
    private  Long id_admin;

    @Column(name = "nama_kategori")
    private String nama_kategori;

    @Column(name = "gambar_url")
    private String gambar_url;

    @CreationTimestamp
    @Column (name = "waktu_ditambahkan")
    private String waktu_ditambahkan;

    @UpdateTimestamp
    @Column (name = "terakhir_diperbarui")
    private String terakhir_diperbarui;
}

