package com.core.perabot.services;

import com.dropbox.core.DbxException;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.sharing.SharedLinkMetadata;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;

@Service
public class ImageService {

    private final DbxClientV2 dropboxClient;

    public ImageService(DbxClientV2 dropboxClient) {
        this.dropboxClient = dropboxClient;
    }

    public String uploadImage(MultipartFile file) {
        try {
            // Mendapatkan nama file asli
            String filename = file.getOriginalFilename();
            // Membuat file sementara
            Path tempFile = Files.createTempFile("temp", filename);
            // Menyalin isi file ke file sementara
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, tempFile, StandardCopyOption.REPLACE_EXISTING);
            }
            // Membaca isi file sementara
            try (InputStream inputStream = new ByteArrayInputStream(Files.readAllBytes(tempFile))) {
                // Mengunggah file ke Dropbox
                FileMetadata metadata = dropboxClient.files().uploadBuilder("/_perabotshop/" + filename)
                        .uploadAndFinish(inputStream);
                // Membuat tautan berbagi untuk file yang diunggah
                SharedLinkMetadata sharedLink = dropboxClient.sharing().createSharedLinkWithSettings(metadata.getPathLower());

                // Mendapatkan URL berbagi dan mengubahnya menjadi URL unduhan langsung
                String sharedUrl = sharedLink.getUrl();
                String directDownloadUrl = sharedUrl.replace("www.dropbox.com", "dl.dropboxusercontent.com");
                directDownloadUrl = directDownloadUrl.replace("?dl=0", "");

                return directDownloadUrl;
            } finally {
                // Menghapus file sementara
                Files.delete(tempFile);
            }
        } catch (DbxException | IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to upload image.");
        }
    }
}
