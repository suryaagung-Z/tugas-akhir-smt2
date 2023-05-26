package com.core.perabot.model.repository;

import com.core.perabot.model.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {

    @Query("SELECT u FROM User u WHERE u.nama_pembeli = :namaPembeli")
    List<User> findByNamaPembeli(String namaPembeli);
}
