package com.example.Integrador.controladores;




import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Integrador.servicios.EmailService;
import com.example.Integrador.servicios.OTPservice;

import jakarta.servlet.http.HttpSession;

@RestController 
@RequestMapping("/auth")  
@CrossOrigin(origins = "*") 
public class AutenticacionController {
    

    @Autowired
    private OTPservice otpService;

    @Autowired
    private EmailService emailService;


    private String normalizeEmail(String email) {
    return email == null ? "" : email.trim().toLowerCase();
}

    

    @PostMapping("/send-code")
    public ResponseEntity<?> sendCode(@RequestBody Map<String, String> body) {

        String email = normalizeEmail(body.get("email")); 

        if (email.isBlank()) { 
            return ResponseEntity.badRequest().body(
                    Map.of("ok", false, "message", "Email requerido"));
        }

        if (!otpService.isAllowedEmail(email)) { 
            return ResponseEntity.status(403).body(
                    Map.of("ok", false, "message", "Email no autorizado"));
        }

        String code = otpService.generateCode(email);
        emailService.sendCode(email, code); 

        return ResponseEntity.ok( 
                Map.of("ok", true, "message", "Código enviado"));
    }

   

@PostMapping("/verify-admin") 
public ResponseEntity<?> verify(@RequestBody Map<String, String> body,
                                HttpSession session) {

    String email = normalizeEmail(body.get("email")); 
    String pass = body.get("password") != null ? body.get("password").trim() : "";
    String code = body.get("code") != null ? body.get("code").trim() : "";

    if (email.isBlank() || pass.isBlank() || code.isBlank()) {
        return ResponseEntity.badRequest().body(
                Map.of("ok", false, "message", "Campos incompletos"));
    }

    if (!otpService.isAllowedEmail(email)) { 
        return ResponseEntity.status(403).body(
                Map.of("ok", false, "message", "Email no autorizado"));
    }

    if (!otpService.checkPassword(pass)) { 
        return ResponseEntity.ok(
                Map.of("ok", false, "message", "Contraseña incorrecta"));
    }

    if (!otpService.validateCode(email, code)) { 
        return ResponseEntity.ok(
                Map.of("ok", false, "message", "Código incorrecto"));
    }

    
    session.setAttribute("user", email);
    session.setAttribute("role", "ADMIN");

    return ResponseEntity.ok(
            Map.of("ok", true, "message", "Acceso permitido"));
}
}