package galidev.galiphone.mc.repository;

import galidev.galiphone.mc.model.Operacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OperacionRepository extends JpaRepository<Operacion, Long>{

}
