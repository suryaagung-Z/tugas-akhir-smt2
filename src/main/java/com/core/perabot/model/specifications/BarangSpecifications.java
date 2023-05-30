package com.core.perabot.model.specifications;

import com.core.perabot.model.models.Barang;
import org.springframework.data.jpa.domain.Specification;

public class BarangSpecifications {
    public static Specification<Barang> hasCategory(String ctg){
        return (root, query, criteriaBuilder) -> {
            if(ctg != null){
                return criteriaBuilder.equal(root.get("id_kategori"), ctg);
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
}
