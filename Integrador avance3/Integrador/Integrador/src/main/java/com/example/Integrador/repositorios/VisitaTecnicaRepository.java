package com.example.Integrador.repositorios;

import com.example.Integrador.modelos.VisitaTecnica;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


//CONSULTAS REPOSIOTORIO BDD PARA LO DE VISITAS TECNICAS
@Repository
public interface VisitaTecnicaRepository extends JpaRepository<VisitaTecnica, Long> {

    //consultas en la bd busqueda
    @Query("""
            SELECT v FROM VisitaTecnica v
            WHERE LOWER(v.usuario) LIKE LOWER(CONCAT('%', :q, '%'))
               OR CAST(v.id AS string) LIKE CONCAT('%', :q, '%')
            """)


            //busqueda por id o nombre de solicitud del usuario
    List<VisitaTecnica> buscarPorUsuarioOID(@Param("q") String q);


    //duplicados de numero en solicitudes
    boolean existsByUsuarioTelefonoAndEstadoIn(
            String telefono,
            List<String> estados);
}