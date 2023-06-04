package com.core.perabot.controllers.customer;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class AuthController {

    @GetMapping("/auth")
    public String index(){
        return "customer/auth";
    }
}
