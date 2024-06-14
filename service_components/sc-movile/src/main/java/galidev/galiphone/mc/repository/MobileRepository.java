package galidev.galiphone.mc.repository;

import galidev.galiphone.mc.model.Mobile;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface MobileRepository extends JpaRepository<Mobile, Long>{

}
