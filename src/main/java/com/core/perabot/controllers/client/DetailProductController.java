package com.core.perabot.controllers.client;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DetailProductController {

    @GetMapping("/detail-product/tes")
    public String index(){
        return "detail-product";
    }
}
