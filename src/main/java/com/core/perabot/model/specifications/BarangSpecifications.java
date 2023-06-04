package com.core.perabot.model.specifications;

import com.core.perabot.model.models.Barang;
import com.core.perabot.model.models.Kategori;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class BarangSpecifications {
    public static Specification<Barang> barangBesertaKategori(){
        return (root, query, criteriaBuilder) -> {
            Join<Barang, Kategori> joinKategori = root.join("id_kategori", JoinType.LEFT);
            return null;
        };
    }

    public static Specification<Barang> hitungBarangByKategori(Kategori kategori) {
        return (root, query, criteriaBuilder) -> {
            return criteriaBuilder.and(
                    criteriaBuilder.equal(root.get("id_kategori"), kategori),
                    criteriaBuilder.isTrue(root.get("stok"))
            );
//            return predicate;
        };
    }

    public static Specification<Barang> cariBarangByKategori(String ctg){
        return (root, query, criteriaBuilder) -> {
            if(ctg != null){
                return criteriaBuilder.equal(root.get("id_kategori").get("id_kategori"), ctg);
            }
            return null;
        };
    }

    public static Specification<Barang> cariByNamaBarang(String src){
        return (root, query, criteriaBuilder) -> {
            if(src != null){
                String likeExpression = "%" + src.toLowerCase() + "%";
                return criteriaBuilder.like(criteriaBuilder.lower(root.get("nama_barang")), likeExpression);
            }
            return null;
        };
    }

    public static Specification<Barang> cariByBetweenHarga(String[] price){
        return (root, query, criteriaBuilder) -> {
            if(price != null){
                return criteriaBuilder.between(root.get("harga"), price[0], price[1]);
            }
            return null;
        };
    }

    public static Specification<Barang> cariByTerlaris(Boolean bestSeller){
        return (root, query, criteriaBuilder) -> {
          if(bestSeller){
              query.orderBy(criteriaBuilder.asc(root.get("terjual")));
          }
          return null;
        };
    }

    public static Specification<Barang> cariByTerbaru(Boolean latest){
        return (root, query, criteriaBuilder) -> {
            if(latest){
                query.orderBy(criteriaBuilder.asc(root.get("id_barang")));
            }
            return null;
        };
    }

    public static Specification<Barang> hargaRendahKeTinggi(Boolean lowToHigh){
        return (root, query, criteriaBuilder) -> {
            if(lowToHigh){
                query.orderBy(criteriaBuilder.asc(root.get("harga")));
            }
            return null;
        };
    }

    public static Specification<Barang> hargaTinggiKeRendah(Boolean highToLow){
        return (root, query, criteriaBuilder) -> {
            if(highToLow){
                query.orderBy(criteriaBuilder.desc(root.get("harga")));
            }
            return null;
        };
    }

}
