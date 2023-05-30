package com.core.perabot.model.repository;

import com.core.perabot.model.models.Barang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BarangRepository extends JpaRepository <Barang, Long>, JpaSpecificationExecutor<Barang> {
    @Query("SELECT b FROM Barang b WHERE b.status_aktif = :status")
    List<Barang> findAllBy(@Param("status") Boolean status);

    @Query("SELECT b FROM Barang b WHERE LOWER(b.nama_barang) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<Barang> findByName(@Param("name") String name);

    @Query("SELECT b FROM Barang b WHERE b.id_kategori  = :id")
    List<Barang> findByCategory(@Param("id") String id);

    @Query(value = "SELECT b FROM Barang b")
    List<Barang> filterProducts(@Param("filterquery") String filterquery);

    @Query("SELECT COUNT(b) FROM Barang b WHERE b.id_kategori = :id AND b.stok = true")
    Long countByCategoryAndStockTrue(@Param("id") String id);
}