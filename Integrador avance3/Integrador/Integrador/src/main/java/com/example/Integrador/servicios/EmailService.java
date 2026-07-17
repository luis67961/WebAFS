package com.example.Integrador.servicios;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    //   OTP
    public void sendCode(String to, String code) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Código de acceso admin");
        message.setText("Tu código es: " + code);

        mailSender.send(message);
    }



    //envia el codigo 

   public void sendContactMessage(String nombre, String correo, String telefono, String mensaje) {
    
    SimpleMailMessage mail = new SimpleMailMessage();

    mail.setTo("empresa@gmail.com");


    mail.setReplyTo(correo);

    mail.setSubject("Nuevo contacto web - " + nombre);

    mail.setText(
            "Nombre: " + nombre + "\n" +
            "Correo: " + correo + "\n" +
            "Teléfono: " + telefono + "\n\n" +
            mensaje
    );

    mailSender.send(mail);
}
}