package com.core.perabot.controllers.admin;

import com.core.perabot.model.models.Barang;
import com.core.perabot.model.models.Kategori;
import com.core.perabot.model.repository.BarangRepository;
import com.core.perabot.model.repository.KategoriRepository;
import com.core.perabot.model.specifications.BarangSpecifications;
import com.core.perabot.services.Services;
import com.dropbox.core.DbxException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@Controller
public class BarangController {

    private final BarangRepository barangRepository;
    private final KategoriRepository kategoriRepository;
    private final Services services;
    private final String directoryProducts = "products/";

    public BarangController(
            BarangRepository barangRepository,
            KategoriRepository kategoriRepository,
            Services services
    ) {
        this.barangRepository = barangRepository;
        this.kategoriRepository = kategoriRepository;
        this.services = services;
    }

    @GetMapping("/admin/barang")
    public String index(Model model){
        Specification<Barang> getSpec = BarangSpecifications.barangBesertaKategori("admin");
        List<Barang> data = barangRepository.findAll(getSpec);

        model.addAttribute("barang", data);

        return "admin/barang";
    }

    @GetMapping("/admin/barang/{id}")
    public String detail(Model model, RedirectAttributes redirectAttributes, @PathVariable("id") Long id){
        Specification<Barang> getSpec = BarangSpecifications.barangBesertaKategoriByidbarang(id);
        Optional<Barang> data = barangRepository.findOne(getSpec);

        if(data.isPresent()){
            model.addAttribute("barang", data);
            return "admin/detail-barang";
        }
        redirectAttributes.addFlashAttribute("falseMessage", "Barang tidak ditemukan");
        return "redirect:/admin/barang";
    }

    @GetMapping("/admin/addbarang")
    public String add(Model model){
        model.addAttribute("kategori", kategoriRepository.findAll());
        return "admin/add-barang";
    }

    @PostMapping("/admin/addbarang")
    public RedirectView addBarang(
            RedirectAttributes redirectAttributes,
            @RequestParam("nama_barang") String nama_barang,
            @RequestParam("kategori") String kategori,
            @RequestParam("deskripsi") String deskripsi,
            @RequestParam("harga") Integer harga,
            @RequestParam("stok") Boolean stok,
            @RequestParam("status_aktif") Boolean status_aktif,
            @RequestParam("foto") MultipartFile foto
    ){
        Optional<Kategori> getKategori = kategoriRepository.findById(kategori);
        if(getKategori.isEmpty()){
            return new RedirectView("/admin/barang");
        }

        String filename;
        try {
            filename = services.uploadImage(foto, this.directoryProducts + getKategori.get().getNama_kategori());
        }catch (RuntimeException e){
            redirectAttributes.addFlashAttribute("falseMessage", "Terjadi kesalahan pada gambar. Error : " + e);
            return new RedirectView("/admin/barang");
        }

        Barang barang = new Barang();
        barang.setId_kategori(getKategori.get());
        barang.setId_admin(1L); // -> Manual
        barang.setNama_barang(nama_barang);
        barang.setDeskripsi(deskripsi);
        barang.setHarga(harga);
        barang.setStok(stok);
        barang.setGambar_url(filename);
        barang.setWaktu_ditambahkan(services.currentTime());
        barang.setTerakhir_diperbarui(services.currentTime());
        barang.setStatus_aktif(status_aktif);
        barang.setTerjual(0); // -> Manual

        try{
            barangRepository.save(barang);
            redirectAttributes.addFlashAttribute("trueMessage", "Data Berhasil Disimpan");
        }catch (Exception e){
            redirectAttributes.addFlashAttribute("falseMessage", "Gagal menyimpan barang. Error : " + e);
            return new RedirectView("/admin/barang");
        }

        return new RedirectView("/admin/barang");
    }

    @GetMapping("/admin/updatebarang/{id}")
    public String update(Model model, @PathVariable("id") String id){
        Specification<Barang> getSpec = BarangSpecifications.barangBesertaKategoriByidbarang(Long.valueOf(id));
        Optional<Barang> data = barangRepository.findOne(getSpec);
        if (data.isEmpty()) {
            return "redirect:/admin/barang";
        }

        List<Kategori> categories = kategoriRepository.findAll();

        model.addAttribute("kategori", categories);
        model.addAttribute("barang", data);
        return "admin/update-barang";
    }

    @PostMapping("/admin/updatebarang")
    public RedirectView updateBarang(
            RedirectAttributes redirectAttributes,
            @RequestParam("id_barang") Long id_barang,
            @RequestParam("nama_barang") String nama_barang,
            @RequestParam("kategori") String kategori,
            @RequestParam("deskripsi") String deskripsi,
            @RequestParam("harga") Integer harga,
            @RequestParam("stok") boolean stok,
            @RequestParam("status_aktif") Boolean status_aktif,
            @RequestParam("foto") MultipartFile foto
    ){

        // Cek apakah detail barang tersedia di database
        Optional<Kategori> getKategori = kategoriRepository.findById(kategori);
        Optional<Barang> getBarang = barangRepository.findById(id_barang);

        if(getKategori.isEmpty() || getBarang.isEmpty()){
            return new RedirectView("/admin/barang");
        }

        // Dapatkan nama folder & file yang akan di implementasikan pada dropbox
        String newDirectory = getKategori.get().getNama_kategori();
        String oldDirectory = getBarang.get().getId_kategori().getNama_kategori();
        String sourceFilename = getBarang.get().getGambar_url();

        if(!getBarang.get().getId_kategori().getId_kategori().equals(getKategori.get().getId_kategori())){
            try {
                services.moveImage(
                        directoryProducts + oldDirectory,
                        directoryProducts + newDirectory,
                        sourceFilename
                );
            }catch (Exception e){
                redirectAttributes.addFlashAttribute("falseMessage", "Terjadi kesalahan pada gambar. Error : " + e);
                return new RedirectView("/admin/barang");
            }
        }

        Barang barangToUpdate = getBarang.get();
        barangToUpdate.setId_kategori(getKategori.get());
        barangToUpdate.setId_admin(1L); // -> Manual
        barangToUpdate.setNama_barang(nama_barang);
        barangToUpdate.setDeskripsi(deskripsi);
        barangToUpdate.setHarga(harga);
        barangToUpdate.setStok(stok);
        // simpan barang berdasarkan kondisi dibawah
        barangToUpdate.setWaktu_ditambahkan(getBarang.get().getWaktu_ditambahkan());
        barangToUpdate.setTerakhir_diperbarui(services.currentTime());
        barangToUpdate.setStatus_aktif(status_aktif);
        barangToUpdate.setTerjual(0); // -> Manual

        if(!foto.isEmpty()){
            // Jika ada foto yang diupload maka
            // 1. cek apakah gambar tersedia pada dropbox
            // 2. simpan gambar ke dropbox -> jika 1 true
            // 3. hapus gambar pada dropbox -> jika 2 true
            try {
                // Cek ketersediaan pada dropbox
                services.isImageExists(this.directoryProducts + newDirectory, sourceFilename);

                String resultFileName;
                try {
                    resultFileName = services.uploadImage(foto, this.directoryProducts + getKategori.get().getNama_kategori());
                }catch (RuntimeException e){
                    redirectAttributes.addFlashAttribute("falseMessage", "Terjadi kesalahan pada gambar. Error : " + e);
                    return new RedirectView("/admin/barang");
                }

                try {
                    services.deleteImage(this.directoryProducts + newDirectory, sourceFilename);
                }catch (RuntimeException e){
                    redirectAttributes.addFlashAttribute("falseMessage", "Terjadi kesalahan pada gambar. Error : " + e);
                    return new RedirectView("/admin/barang");
                }

                try {
                    barangToUpdate.setGambar_url(resultFileName); // simpan gambar kedatabase
                    barangRepository.save(barangToUpdate);
                }catch (Exception e){
                    redirectAttributes.addFlashAttribute("falseMessage", "Gagal memperbarui barang. Error : " + e);
                    return new RedirectView("/admin/barang");
                }
                // Pesan berhasil
                redirectAttributes.addFlashAttribute("trueMessage", "Barang berhasil diperbarui");
            }catch (RuntimeException e){
                redirectAttributes.addFlashAttribute("falseMessage", "Terjadi kesalahan pada gambar. Error : " + e);
                return new RedirectView("/admin/barang");
            }
        }else{
            // Jika tidak ada foto yang diupload maka
            // 1. simpan kembali foto yang lama ke database

            try {
                barangToUpdate.setGambar_url(sourceFilename); // simpan gambar kedatabase
                barangRepository.save(barangToUpdate);
            }catch (Exception e){
                redirectAttributes.addFlashAttribute("falseMessage", "Gagal memperbarui barang. Error : " + e);
                return new RedirectView("/admin/barang");
            }
            // Pesan berhasil
            redirectAttributes.addFlashAttribute("trueMessage", "Barang berhasil diperbarui");
        }
        return new RedirectView("/admin/barang");
    }

    @GetMapping("/admin/deletebarang/{id}")
    public RedirectView deleteBarang(RedirectAttributes redirectAttributes, @PathVariable("id") Long id){
        // Cek apakah detail barang tersedia di database
        Specification<Barang> getBarangById = BarangSpecifications.barangBesertaKategoriByidbarang(id);
        Optional<Barang> getBarang = barangRepository.findOne(getBarangById);

        if(getBarang.isEmpty()){
            redirectAttributes.addFlashAttribute("falseMessage", "Barang tidak ditemukan");
            return new RedirectView("/admin/barang");
        }

        // Dapatkan nama folder & file yang akan di implementasikan pada dropbox
        String directory = getBarang.get().getId_kategori().getNama_kategori();
        String sourceFilename = getBarang.get().getGambar_url();

        try {
            // Cek ketersediaan pada dropbox
            services.isImageExists(this.directoryProducts + directory, sourceFilename);

            try {
                services.deleteImage(this.directoryProducts + directory, sourceFilename);
            }catch (RuntimeException e){
                redirectAttributes.addFlashAttribute("falseMessage", "Terjadi kesalahan pada gambar. Error : " + e);
                return new RedirectView("/admin/barang");
            }

            try {
                barangRepository.delete(getBarang.get());
                redirectAttributes.addFlashAttribute("trueMessage", "Barang berhasil dihapus");
            } catch (Exception e) {
                redirectAttributes.addFlashAttribute("falseMessage", "Gagal menghapus barang. Error : " + e);
            }
            return new RedirectView("/admin/barang");
        }catch (RuntimeException e){
            redirectAttributes.addFlashAttribute("falseMessage", "Terjadi kesalahan pada gambar. Error : " + e);
            return new RedirectView("/admin/barang");
        }

    }
}
