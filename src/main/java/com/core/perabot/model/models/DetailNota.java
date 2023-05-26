package com.core.perabot.model.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "detail_nota")
@Entity
public class DetailNota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_detail_nota")
    private Long id_detail_nota;

    @Column(name = "id_nota")
    private Long id_nota;

    @Column(name = "id_barang")
    private Long id_barang;

    @Column(name = "jumalh")
    private Integer jumlah;

    @Column(name = "harga")
    private Integer harga;
}
