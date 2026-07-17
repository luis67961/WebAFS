package com.example.Integrador.servicios;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Integrador.modelos.Producto;
import com.example.Integrador.repositorios.ProductoRepository;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;

    // Traer todos por categoría
    public List<Producto> listarPorCategoria(String categoria) {
        return productoRepository.findByCategoria(categoria);
    }

    // traer todos
    public List<Producto> listarTodos() {
        return productoRepository.findAll();
    }
}