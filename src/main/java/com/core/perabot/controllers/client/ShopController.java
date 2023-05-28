package com.core.perabot.controllers.client;

import com.core.perabot.model.models.Barang;
import com.core.perabot.model.models.Kategori;
import com.core.perabot.model.repository.BarangRepository;
import com.core.perabot.model.repository.CategoryRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class ShopController {

    private final BarangRepository barangRepository;
    private final CategoryRepository categoryRepository;

    public ShopController(BarangRepository barangRepository, CategoryRepository categoryRepository) {
        this.barangRepository = barangRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/shop")
    public String index(Model model, HttpServletRequest req) {
        List<Barang> products = barangRepository.findAllBy(true);
        List<Kategori> categories = categoryRepository.findAll();

        // Query parameters to Map : {src=val}
        String queryString = req.getQueryString();
        Map<String, String> queryParams = parseQueryParams(queryString);
        List<Barang> productsByName = barangRepository.findByName(queryParams.get("src"));
        if(productsByName.size() != 0){
            products = productsByName;
        }

        // Count Product By category
        List<Long> productCounts = new ArrayList<>();
        for (Kategori kategori : categories) {
            Long count = barangRepository.countByCategoryAndStockTrue(kategori.getId_kategori());
            productCounts.add(count);
        }

        model.addAttribute("databarang", products);
        model.addAttribute("datakategori", categories);
        model.addAttribute("productCounts", productCounts);
//        model.addAttribute("query", productsByName);

        return "shop";
    }

    private Map<String, String> parseQueryParams(String queryString){
        Map<String, String> queryParams = new HashMap<>();
        if (queryString != null) {
            String[] params = queryString.split("&");
            for (String param : params) {
                String[] keyValue = param.split("=");

                if( keyValue.length == 2){
                    try {
                        String key = URLDecoder.decode(keyValue[0], "UTF-8");
                        String value = URLDecoder.decode(keyValue[1], "UTF-8");
                        queryParams.put(key, value);
                    }catch (UnsupportedEncodingException e){}
                }
            }
        }
        return queryParams;
    }
}