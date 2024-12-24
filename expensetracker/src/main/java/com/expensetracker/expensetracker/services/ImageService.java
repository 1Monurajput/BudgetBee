package com.expensetracker.expensetracker.services;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {

    String uploadImg(MultipartFile file,String fileName);
    String getImageFromPublicId(String publicId);
}
