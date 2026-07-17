package com.example.Integrador.controladores;

import com.example.Integrador.servicios.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class ContactoController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/contacto")
    public String enviarContacto(
            @RequestParam String nombre,
            @RequestParam String correo,
            @RequestParam String telefono,
            @RequestParam String mensaje) {

        emailService.sendContactMessage(
                nombre, correo, telefono, mensaje
        );

        return "ok";
    }
}
