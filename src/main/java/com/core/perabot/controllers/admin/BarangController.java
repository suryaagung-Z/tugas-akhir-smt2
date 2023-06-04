package com.core.perabot.controllers.admin;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class BarangController {

    @GetMapping("/admin/barang")
    public String index(){
        return "admin/kategori";
    }
}
