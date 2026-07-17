package com.example.Integrador.modelos;



import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "notificaciones")
public class Notificacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    private String titulo;

    private String mensaje;

    private String tipo;

    private Boolean leida = false;

    private LocalDateTime fechaCreacion;


    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = true)
    private Pedido pedido;

    @ManyToOne
    @JoinColumn(name = "visita_id", nullable = true)
    private VisitaTecnica visita;
}