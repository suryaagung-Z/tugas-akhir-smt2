package com.core.perabot.model.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "pembeli")
@Entity
public class Pembeli {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pembeli")
    private Long id_pembeli;

    @Column(name = "nama_pembeli")
    private String nama_pembeli;

    @Column(name = "no_hp")
    private String email;

    @Column(name = "password")
    private String password;
}
