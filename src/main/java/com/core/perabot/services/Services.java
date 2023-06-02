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
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.HashMap;
import java.util.Map;

@Service
public class Services {

    private final DbxClientV2 dropboxClient;

    public Services(DbxClientV2 dropboxClient) {
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

    public Map<String, String> parseQueryParams(String queryString){
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
