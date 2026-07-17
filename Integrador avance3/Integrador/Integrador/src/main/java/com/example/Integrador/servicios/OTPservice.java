package com.example.Integrador.servicios;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;


@Service
public class OTPservice {

    private final Map<String, String> codes = new HashMap<>();

    private final Set<String> allowedEmails = new HashSet<>();

    private final String password = "1234";

    public OTPservice() {
        allowedEmails.add("david08af@gmail.com");
        allowedEmails.add("prololol1234@gmail.com");
        allowedEmails.add("elgatosonso@gmail.com");
         allowedEmails.add("juandavid@gmail.com");
          allowedEmails.add("moralesyupanqui190971@gmail.com");
    }

    public String generateCode(String email) {
        String code = String.valueOf((int) (Math.random() * 900000) + 100000);
        codes.put(email, code);
        return code;
    }

    public boolean validateCode(String email, String code) {
        String storedCode = codes.get(email);
        return storedCode != null && storedCode.equals(code);
    }

    public boolean isAllowedEmail(String email) {
        return allowedEmails.contains(email.trim().toLowerCase());
    }

    public boolean checkPassword(String pass) {
        return password.equals(pass.trim());
    }
}