package galidev.galiphone.mc.repository;

import galidev.galiphone.mc.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long>{

}
