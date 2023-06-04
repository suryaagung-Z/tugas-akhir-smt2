package com.core.perabot.controllers.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DetailProductController {

    @GetMapping("/detail-product/tes")
    public String index(){
        return "detail-product";
    }
}
