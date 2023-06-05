package com.core.perabot.services;

import com.core.perabot.model.repository.KategoriRepository;
import com.dropbox.core.DbxException;
import com.dropbox.core.v2.DbxClientV2;
import com.dropbox.core.v2.files.FileMetadata;
import com.dropbox.core.v2.files.ListFolderResult;
import com.dropbox.core.v2.files.Metadata;
import com.dropbox.core.v2.sharing.SharedLinkMetadata;
import org.apache.commons.io.FilenameUtils;
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
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class Services {

    private final KategoriRepository kategoriRepository;

    private final DbxClientV2 dropboxClient;

    private final String pathRoot = "_perabotshop";

    public Services(KategoriRepository kategoriRepository, DbxClientV2 dropboxClient) {
        this.kategoriRepository = kategoriRepository;
        this.dropboxClient = dropboxClient;
    }

    public boolean isImageExists(String directory, String sourceFilename) {
        String filenameParse = this.filenameParse(sourceFilename);
        try {
            Metadata metadata = dropboxClient.files().getMetadata(
                    "/" + this.pathRoot + "/" + directory + "/" + filenameParse
            );
            return metadata != null;
        } catch (DbxException e) {
            e.printStackTrace();
            return false;
        }
    }

    public String uploadImage(MultipartFile foto, String directory) {
        // Dapatkan nama asli file
        String originalFileName = foto.getOriginalFilename();
        // Dapatkan ekstensi file
        String extension = FilenameUtils.getExtension(originalFileName);
        // Dapatkan basename file
        String baseName = FilenameUtils.getBaseName(originalFileName);
        // Buat nama baru di concat dengan random string
        String newFileName = baseName + "_" + UUID.randomUUID().toString() + "." + extension;

        byte[] fileData;
        try {
            // Dapatkan file asli/fisik
            fileData = foto.getBytes();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        try {
            // Membuat file sementara
            Path tempFile = Files.createTempFile("temp", newFileName);
            // Menyalin isi file ke file sementara
            try (InputStream inputStream = new ByteArrayInputStream(fileData)) {
                Files.copy(inputStream, tempFile, StandardCopyOption.REPLACE_EXISTING);
            }
            // Membaca isi file sementara
            try (InputStream inputStream = new ByteArrayInputStream(Files.readAllBytes(tempFile))) {
                // Mengunggah file ke Dropbox
                FileMetadata metadata = dropboxClient.files().uploadBuilder("/" + this.pathRoot + "/" + directory + "/" + newFileName)
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
            return null;
        }
    }

    public void deleteImage(String directory, String sourceFilename) {
        String filenameParse = this.filenameParse(sourceFilename);

        try {
            dropboxClient.files().delete("/" + this.pathRoot + "/" + directory + "/" + filenameParse);
        } catch (DbxException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    public void moveImage(String sourceDirectory, String destinationDirectory, String sourceFilename) {
        String filenameParse = this.filenameParse(sourceFilename);

        try {
            String sourcePath = "/" + this.pathRoot + "/" + sourceDirectory + "/" + filenameParse;
            String destinationPath = "/" + this.pathRoot + "/" + destinationDirectory + "/" + filenameParse;

            Metadata metadata = dropboxClient.files().move(sourcePath, destinationPath);
        } catch (DbxException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

    public String filenameParse(String imgurl){
        String[] urlParts = imgurl.split("/");
        String filenameParse = urlParts[urlParts.length - 1];
        return filenameParse;
    }

    public String currentTime(){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return dateFormat.format(new Date());
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
