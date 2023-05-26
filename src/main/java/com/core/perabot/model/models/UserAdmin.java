package com.core.perabot.model.models;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "user_admin")
@Entity
public class UserAdmin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_admin")
    private Long id_admin;

    @Column(name = "nama_admin")
    private  String nama_admin;

    @Column(name = "terakhir_masuk")
    private String terakhir_masuk;

    @Column(name = "email")
    private String email;

    @Column (name = "password")
    private String password;

}
