package com.core.perabot.model.repository;

import com.core.perabot.model.models.Barang;
import com.core.perabot.model.models.Kategori;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

public interface BarangRepository extends JpaRepository <Barang, Long>, JpaSpecificationExecutor<Barang> {
    @Query("SELECT COUNT(b) FROM Barang b WHERE b.id_kategori = :kategori AND b.stok = true")
    Long countByCategoryAndStockTrue(Kategori kategori);
}