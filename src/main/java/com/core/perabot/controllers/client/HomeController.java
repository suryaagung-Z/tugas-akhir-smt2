package com.core.perabot.controllers.client;

import com.core.perabot.controllers.model.models.User;
import com.core.perabot.controllers.model.repository.UserRepository;
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
        model.addAttribute("data", users);
        return "home";
    }
}
