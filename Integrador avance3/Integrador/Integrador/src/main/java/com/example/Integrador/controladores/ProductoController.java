package com.example.Integrador.controladores;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.Integrador.modelos.Producto;
import com.example.Integrador.servicios.ProductoService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping("/categoria/{categoria}")
    public List<Producto> listarPorCategoria(@PathVariable String categoria) {
        return productoService.listarPorCategoria(categoria);
    }
}