package com.core.perabot.controllers.admin;

import com.core.perabot.model.models.Kategori;
import com.core.perabot.model.repository.KategoriRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class KategoriController {

    private final KategoriRepository kategoriRepository;

    public KategoriController(KategoriRepository kategoriRepository) {
        this.kategoriRepository = kategoriRepository;
    }

    @GetMapping("/admin/kategori")
    public String index(Model model){
        List<Kategori> categories = kategoriRepository.findAll();

        model.addAttribute("kategori", categories);

        return "admin/kategori";
    }
}
