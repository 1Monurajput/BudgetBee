package com.expensetracker.expensetracker.services.impl;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import com.expensetracker.expensetracker.services.ImageService;

@Service
public class ImageServiceImpl implements ImageService {

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public String getImageFromPublicId(String publicId) {
        return cloudinary.url()
                .transformation(
                        new Transformation<>()
                                .width(500)
                                .height(500)
                                .crop("fill"))
                .generate(publicId);
    }

    @Override
    public String uploadImg(MultipartFile file, String fileName) {

        try {
            byte[] data = new byte[file.getInputStream().available()];
            file.getInputStream().read(data);
            cloudinary.uploader().upload(data, ObjectUtils.asMap(
                    "public_id", fileName));

            return this.getImageFromPublicId(fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public void replaceImg(MultipartFile newfile, String imgUrl) {

        try {
            
            byte[] data = new byte[newfile.getInputStream().available()];
            newfile.getInputStream().read(data);

            String publicId = extractPublicId(imgUrl);

            cloudinary.uploader().upload(data, ObjectUtils.asMap(
                "public_id",publicId,
                "overwrite",true,
                "invalidate",true
            ));

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println(("error replacing image : " + e.getMessage()));
        }
        
    }

    // https://res.cloudinary.com/dibrulapa/image/upload/c_fill,h_500,w_500/8c2b0aa3-dd45-4f5a-83be-f80edde05dc4?_a=DAGAACAWZAA0

    private String extractPublicId(String imageUrl) {
        try {
            // Find the start and end of the public_id
            int uploadIndex = imageUrl.indexOf("/upload/") + 8; // Add 8 to skip "/upload/"
            int startIndex = imageUrl.indexOf("/", uploadIndex) + 1; // Skip transformations
            int endIndex = imageUrl.indexOf("?", startIndex); // Before query parameters
            if (endIndex == -1) {
                endIndex = imageUrl.length(); // No query parameters
            }
            return imageUrl.substring(startIndex, endIndex);
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid Cloudinary URL format: " + imageUrl);
        }
    }
    
}
