package com.core.perabot.controllers.client;

import com.core.perabot.model.models.Barang;
import com.core.perabot.model.models.Kategori;
import com.core.perabot.model.repository.BarangRepository;
import com.core.perabot.model.repository.CategoryRepository;
import com.core.perabot.model.specifications.BarangSpecifications;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
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
        Map<String, String> queryParams = parseQueryParams(req.getQueryString());

        List<Barang> products = barangRepository.findAllBy(true);
        List<Kategori> categories = categoryRepository.findAll();

        List<Barang> ptes = null;
        Boolean filterEmpty = false;
        if(!queryParams.isEmpty()){
            String ctg = queryParams.getOrDefault("ctg", null);
            String src = queryParams.getOrDefault("src", null);
            Specification<Barang> spec = Specification.where(BarangSpecifications.hasCategory(ctg))
                    .and(BarangSpecifications.hasSearch(src));
            ptes = barangRepository.findAll(spec);
        }

        // Count Product By category
        List<Long> productCounts = new ArrayList<>();
        for (Kategori kategori : categories) {
            Long count = barangRepository.countByCategoryAndStockTrue(kategori.getId_kategori());
            productCounts.add(count);
        }

        // Products
        model.addAttribute("databarang", products);
        // Filter barang is empty
        model.addAttribute("filterEmpty", filterEmpty);
        // Categories
        model.addAttribute("datakategori", categories);
        // Product count
        model.addAttribute("productCounts", productCounts);

        model.addAttribute("tes", ptes);

        return "shop";
    }

    private Map<String, String> parseQueryParams(String queryString){
        Map<String, String> queryParams = new HashMap<>();
        if (queryString != null) {
            String[] params = queryString.split("&");
            for (String param : params) {
                String[] keyValue = param.split("=");

                if( keyValue.length == 2){
                    String key = URLDecoder.decode(keyValue[0], StandardCharsets.UTF_8);
                    String value = URLDecoder.decode(keyValue[1], StandardCharsets.UTF_8);
                    queryParams.put(key, value);
                }
            }
        }
        return queryParams;
    }
}