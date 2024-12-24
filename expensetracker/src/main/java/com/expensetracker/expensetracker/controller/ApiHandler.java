package com.expensetracker.expensetracker.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.expensetracker.expensetracker.entity.Bills;
import com.expensetracker.expensetracker.entity.Users;
import com.expensetracker.expensetracker.services.BillService;
import com.expensetracker.expensetracker.services.ImageService;
import com.expensetracker.expensetracker.services.UserServices;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping(value = "/api")
public class ApiHandler {

    @Autowired
    private UserServices userServices;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ImageService imageService;

    @Autowired
    private BillService billService;

    @Autowired
    private HttpSession session;

    // durign login time check: email is available or password is correct or not
    @PostMapping(value = "/checkEmail")
    public String checkEmail(@RequestBody Map<String, String> requestBody) {
        String email = requestBody.get("email");
        String pass = requestBody.get("pass");

        if (userServices.existsByEmail(email)) {

            Users user = userServices.findByEmail(email).orElseThrow(null);
            if (passwordEncoder.matches(pass, user.getPassword())) {
                return "{\"msg\" : \"done\"}";
            } else {
                return "{\"msg\" : \"password\"}";
            }
        }
        return "{\"msg\": \"email\"}";
    }

    // for fetch data
    @PostMapping(value = "/getUserData")
    public ResponseEntity<Users> userData(@RequestBody Map<String, String> requestBody) {

        String email = requestBody.get("email");

        Users user = userServices.findByEmail(email).orElseThrow(null);
        // making some changes for security purpose
        Users user2 = Users.builder()
                .name(user.getName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .emailVerified(user.isEmailVerified())
                .phoneVerified(user.isPhoneVerified())
                .profilePicture(user.getProfilePicture()).build();
        user.setPassword("abc");
        return ResponseEntity.ok(user2);
    }

    // for update data
    @PutMapping(value = "/update")
    public void updateUser(@RequestParam("name") String newName, @RequestParam("phone") String newPhone,
            @RequestParam("email") String email, @RequestParam(value = "file", required = false) MultipartFile pic) {

        String fileName = UUID.randomUUID().toString();

        String fileUrl = null;
        if (pic != null && !pic.isEmpty()) {
            fileUrl = imageService.uploadImg(pic, fileName);
        }

        userServices.update(email, newName, newPhone, fileUrl);
        System.out.println("Update successfully...................................");
    }

    // This is for adding bills in to the database
    @PostMapping(value = "/addbill")
    public ResponseEntity<String> addBill(@RequestParam("name") String name,
            @RequestParam("rate") double rate,
            @RequestParam("method") String method,
            @RequestParam("currency") String currency,
            @RequestParam("status") String status,
            @RequestParam("description") String description,
            @RequestParam("categories") String categories,
            @RequestParam("dueDate") String dueDate,
            @RequestParam("biller") String biller,
            @RequestParam("billerPhone") String billerPhone,
            @RequestParam(value="image", required=false) MultipartFile image) {

        System.out.println("Add bill Api...........");

        Bills bill = new Bills();
        bill.setTitle(name);
        bill.setRate(rate);
        bill.setMethod(method);
        bill.setCurrency(currency);
        bill.setStatus(status);
        bill.setDescription(description);
        bill.setCategories(categories);
        bill.setDueDate(dueDate);
        bill.setBiller(biller);
        bill.setBillerPhone(billerPhone);

        LocalDateTime time = LocalDateTime.now();

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm yyyy-mm-dd");
        String newTime = time.format(formatter);

        bill.setDate(newTime);

        if(image != null && !image.isEmpty()){
            String fileUrl = imageService.uploadImg(image, UUID.randomUUID().toString());
            bill.setBillAttachement(fileUrl);
        }

        try {
            billService.saveBill(bill);
            System.out.println("Bill saved Successfully");
            return ResponseEntity.ok("{\"msg\" : \"Saved\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"msg\" : \"Error\"}");
        }
    }

    // Delete bill api
    @DeleteMapping("/bill/delete")
    public void deleteBill(@RequestParam String billId){

        System.out.println("IN deleting bill api");
        System.out.println(billId);
        billService.deleteById(billId);
    }
}
