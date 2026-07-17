package com.example.Integrador.controladores;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Integrador.dto.VisitaTecnicaDTO;
import com.example.Integrador.modelos.VisitaTecnica;
import com.example.Integrador.repositorios.VisitaTecnicaRepository;

@RestController
@RequestMapping("/api/visitas")
public class VisitaTecnicaController {

    @Autowired
    private VisitaTecnicaRepository repo;

    // CREAR VISITA
    @PostMapping
    public ResponseEntity<?> crear(@RequestBody VisitaTecnicaDTO dto) {

        List<String> estadosActivos = List.of("PENDIENTE", "PROGRAMADA");

        boolean existe = repo.existsByUsuarioTelefonoAndEstadoIn(
                dto.getUsuarioTelefono(),
                estadosActivos);

        if (existe) {
            return ResponseEntity
                    .badRequest()
                    .body("Ya tienes una solicitud activa. Espera a que sea finalizada.");
        }

        VisitaTecnica v = new VisitaTecnica();
        v.setUsuario(dto.getUsuario());
        v.setUsuarioTelefono(dto.getUsuarioTelefono());
        v.setEstado("PENDIENTE");
        v.setFechaSolicitud(LocalDateTime.now());

        repo.save(v);

        return ResponseEntity.ok("OK");
    }

    // LISTAR
    @GetMapping
    public List<VisitaTecnica> listar() {
        return repo.findAll();
    }

    // PROGRAMAR
    @PutMapping("/{id}/programar")
    public String programar(@PathVariable Long id,
            @RequestBody Map<String, String> data) {

        VisitaTecnica v = repo.findById(id).orElseThrow();

        String fecha = data.get("fecha");
        String especialista = data.get("especialista");

        if (fecha == null || fecha.trim().isEmpty()) {
            return "ERROR: Fecha obligatoria";
        }

        try {
            v.setFechaProgramada(
                    java.time.LocalDateTime.of(
                            java.time.LocalDate.parse(fecha),
                            java.time.LocalTime.of(9, 0)));

            v.setEspecialista(especialista);
            v.setEstado("PROGRAMADA");

            repo.save(v);

            return v.getEstado() + " | " + v.getFechaProgramada() + " | " + v.getEspecialista();
        } catch (Exception e) {
            e.printStackTrace();
            return "ERROR: " + e.getMessage();
        }
    }

    // finalizar visita tecnica

    @PutMapping("/{id}/finalizar")
    public String finalizar(@PathVariable Long id) {

        VisitaTecnica v = repo.findById(id).orElseThrow();

        v.setEstado("FINALIZADA");

        repo.save(v);

        return "OK";
    }

    @GetMapping("/buscar")
    public List<VisitaTecnica> buscar(@RequestParam String q) {
        return repo.buscarPorUsuarioOID(q);
    }

}

/*
 * @PostMapping
 * public String crear(@RequestBody VisitaTecnicaDTO dto) {
 * 
 * VisitaTecnica v = new VisitaTecnica();
 * 
 * v.setUsuario(dto.getUsuario());
 * v.setUsuarioTelefono(dto.getUsuarioTelefono());
 * 
 * v.setFechaSolicitud(LocalDateTime.now());
 * v.setEstado("PENDIENTE");
 * v.setFechaCreacion(LocalDateTime.now());
 * 
 * repo.save(v);
 * 
 * return "OK";
 * }
 */
