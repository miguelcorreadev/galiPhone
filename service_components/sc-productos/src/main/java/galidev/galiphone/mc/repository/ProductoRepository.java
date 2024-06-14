package galidev.galiphone.mc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface ProductoRepository extends JpaRepository<galidev.galiphone.mc.model.Producto, Long>{

}
