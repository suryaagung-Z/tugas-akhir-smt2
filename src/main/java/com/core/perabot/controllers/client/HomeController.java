package com.core.perabot.controllers.client;

//import com.core.perabot.model.models.Pembeli;
//import com.core.perabot.model.repository.UserRepository;
//import com.core.perabot.services.ImageService;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.util.List;

@Controller
public class HomeController {

//    private final UserRepository userRepository;
//    private final ImageService imageService;
//
//    public HomeController(UserRepository userRepository, ImageService imageService) {
//        this.userRepository = userRepository;
//        this.imageService = imageService;
//    }

    @GetMapping("/")
    public String index(Model model){
//        List<Pembeli> users = userRepository.findByNamaPembeli("Eky");
//
//        model.addAttribute("data1", users);
        return "home";
    }

//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
//        try {
//            String imageUrl = imageService.uploadImage(file);
//            return ResponseEntity.ok(imageUrl);
//        } catch (RuntimeException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");
//        }
//    }
}
