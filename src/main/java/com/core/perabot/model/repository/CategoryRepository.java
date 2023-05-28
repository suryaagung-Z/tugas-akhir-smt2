package com.core.perabot.model.repository;

import com.core.perabot.model.models.Kategori;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryRepository extends JpaRepository <Kategori, Long> {

}