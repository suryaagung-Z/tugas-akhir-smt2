package com.core.perabot.model.repository;

import com.core.perabot.model.models.Barang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface BarangRepository extends JpaRepository <Barang, Long>, JpaSpecificationExecutor<Barang> {
}