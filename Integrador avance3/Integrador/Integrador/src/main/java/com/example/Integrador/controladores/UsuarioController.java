package com.example.Integrador.controladores;

import com.example.Integrador.modelos.Carrito;
import com.example.Integrador.modelos.Usuario;
import com.example.Integrador.repositorios.CarritoRepository;
import com.example.Integrador.repositorios.UsuarioRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

@Controller
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CarritoRepository carritoRepository;

 @PostMapping("/iniciar-sesion")
public String login(@RequestParam String email,
                    @RequestParam String password,
                    HttpSession session,
                    Model model) {

    Usuario usuario = usuarioRepository.findByEmail(email);

    if (usuario == null ||
        usuario.getPassword() == null ||
        !usuario.getPassword().trim().equals(password.trim())) {

        model.addAttribute("error", "Credenciales incorrectas");
        return "miCuenta";
    }

    session.setAttribute("usuario", usuario);

    // CARRO SEGURO
    Carrito carrito = carritoRepository.findByUsuario(usuario);

    if (carrito == null) {
        carrito = new Carrito();
        carrito.setUsuario(usuario);
        carrito.setItems(new ArrayList<>());
        carritoRepository.save(carrito);
    }

    return "redirect:/miCuenta";
}
    // REGISTRO
    @PostMapping("/registro")
    @ResponseBody
    public Map<String, Object> registrar(@ModelAttribute Usuario u) {

        Map<String, Object> res = new HashMap<>();

        if (usuarioRepository.existsByEmail(u.getEmail())) {
            res.put("ok", false);
            res.put("error", "Email ya registrado");
            return res;
        }

        if (usuarioRepository.existsByDni(u.getDni())) {
            res.put("ok", false);
            res.put("error", "DNI ya registrado");
            return res;
        }

        usuarioRepository.save(u);

        res.put("ok", true);
        return res;
    }

    // CERRRA SESION
    @PostMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/miCuenta";
    }

    // ELIMINAR CUENTA
    @PostMapping("/usuario/eliminar")
    @ResponseBody
    public Map<String, Object> eliminar(HttpSession session) {

        Map<String, Object> res = new HashMap<>();

        Usuario usuario = (Usuario) session.getAttribute("usuario");

        if (usuario != null) {
            usuarioRepository.deleteById(usuario.getId());
            session.invalidate();
            res.put("ok", true);
        } else {
            res.put("ok", false);
            res.put("error", "No hay sesión");
        }

        return res;
    }
}