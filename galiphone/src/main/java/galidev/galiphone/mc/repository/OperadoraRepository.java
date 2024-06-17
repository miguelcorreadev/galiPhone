package galidev.galiphone.mc.repository;

import galidev.galiphone.mc.model.Operadora;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OperadoraRepository extends JpaRepository<Operadora, Long>{

}
