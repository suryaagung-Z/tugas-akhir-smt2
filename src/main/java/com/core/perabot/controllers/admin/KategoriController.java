package com.core.perabot.controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class KategoriController {

    @GetMapping("/admin/kategori")
    public String index(){
        return "admin/kategori";
    }
}
