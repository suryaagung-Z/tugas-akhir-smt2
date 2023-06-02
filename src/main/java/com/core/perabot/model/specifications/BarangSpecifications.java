package com.core.perabot.model.specifications;

import com.core.perabot.model.models.Barang;
import com.core.perabot.model.models.Kategori;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

public class BarangSpecifications {
    public static Specification<Barang> getAllAndJoinKategori(){
        return (root, query, criteriaBuilder) -> {
            // Join kategori didalam barang, dengan foreign key "id_kategori" pada entitas barang
            Join<Barang, Kategori> joinKategori = root.join("id_kategori", JoinType.INNER);
            // Menghindari duplikat data
            query.distinct(true);
            return null;
        };
    }

    public static Specification<Barang> hasCategory(String ctg){
        return (root, query, criteriaBuilder) -> {
            if(ctg != null){
                return criteriaBuilder.equal(root.get("id_kategori").get("id_kategori"), ctg);
            }
            return null;
        };
    }

    public static Specification<Barang> hasSearch(String src){
        return (root, query, criteriaBuilder) -> {
            if(src != null){
                String likeExpression = "%" + src.toLowerCase() + "%";
                return criteriaBuilder.like(criteriaBuilder.lower(root.get("nama_barang")), likeExpression);
            }
            return null;
        };
    }

    public static Specification<Barang> rangePrice(String[] price){
        return (root, query, criteriaBuilder) -> {
            if(price != null){
                Predicate harga = criteriaBuilder.between(root.get("harga"), price[0], price[1]);
                return harga;
            }
            return null;
        };
    }

    public static Specification<Barang> bestSeller(Boolean bestSeller){
        return (root, query, criteriaBuilder) -> {
          if(bestSeller){
              query.orderBy(criteriaBuilder.asc(root.get("terjual")));
          }
          return null;
        };
    }

    public static Specification<Barang> latest(Boolean latest){
        return (root, query, criteriaBuilder) -> {
            if(latest){
                query.orderBy(criteriaBuilder.asc(root.get("id_barang")));
            }
            return null;
        };
    }

    public static Specification<Barang> lowToHigh(Boolean lowToHigh){
        return (root, query, criteriaBuilder) -> {
            if(lowToHigh){
                query.orderBy(criteriaBuilder.asc(root.get("harga")));
            }
            return null;
        };
    }

    public static Specification<Barang> highToLow(Boolean highToLow){
        return (root, query, criteriaBuilder) -> {
            if(highToLow){
                query.orderBy(criteriaBuilder.desc(root.get("harga")));
            }
            return null;
        };
    }

}
