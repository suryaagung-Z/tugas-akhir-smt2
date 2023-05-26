package com.core.perabot.model.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "keranjang")
@Entity
public class Keranjang {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_keranjang")
    private Long id_pembeli;

    @Column(name = "id_user")
    private Long id_user;

    @Column(name = "id_barang")
    private Long id_barang;

    @Column(name = "jumlah")
    private Integer jumlah;

    @Column(name = "sub_total")
    private Integer sub_total;

    @Column(name = "setatus_pesan")
    private String setatus_pesan;
}
