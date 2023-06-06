package com.core.perabot.controllers.admin;

import com.core.perabot.model.models.Barang;
import com.core.perabot.model.models.Kategori;
import com.core.perabot.model.repository.BarangRepository;
import com.core.perabot.model.repository.KategoriRepository;
import com.core.perabot.model.specifications.BarangSpecifications;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class KategoriController {

    private final KategoriRepository kategoriRepository;
    private final BarangRepository barangRepository;

    public KategoriController(KategoriRepository kategoriRepository, BarangRepository barangRepository) {
        this.kategoriRepository = kategoriRepository;
        this.barangRepository = barangRepository;
    }

    @GetMapping("/admin/kategori")
    public String index(Model model){
        List<Kategori> categories = kategoriRepository.findAll();

        // Count Product By category
        List<Long> productCounts = new ArrayList<>();
        for (Kategori kategori : categories) {
            Specification<Barang> spec = BarangSpecifications.hitungBarangByKategori(kategori);
            Long count = barangRepository.count(spec);
            productCounts.add(count);
        }

        model.addAttribute("kategori", categories);
        model.addAttribute("productCounts", productCounts);

        return "admin/kategori";
    }
}
