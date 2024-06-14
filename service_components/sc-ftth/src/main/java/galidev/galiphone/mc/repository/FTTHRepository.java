package galidev.galiphone.mc.repository;

import galidev.galiphone.mc.model.FTTH;
import org.springframework.data.jpa.repository.JpaRepository;


import org.springframework.stereotype.Repository;

@Repository
public interface FTTHRepository extends JpaRepository<FTTH, Long>{

}
