package com.core.perabot.model.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "nota")
@Entity
public class Nota {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_nota")
    private Long id_nota;

    @Column(name = "id_pembeli")
    private Long id_pembeli;

    @Column(name = "waktu_pesan")
    private String waktu_pesan;

    @Column(name = "total")
    private Integer total;

}
