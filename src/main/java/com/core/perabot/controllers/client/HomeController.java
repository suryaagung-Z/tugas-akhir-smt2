package com.core.perabot.controllers.client;

import com.core.perabot.model.models.User;
import com.core.perabot.model.repository.UserRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeController {

    private final UserRepository userRepository;

    public HomeController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String index(Model model){
        List<User> users = userRepository.findAll();
        List<User> nama = userRepository.findByNamaPembeli("Budy");
        model.addAttribute("data", users);
        model.addAttribute("data2", nama);
        return "home";
    }
}
