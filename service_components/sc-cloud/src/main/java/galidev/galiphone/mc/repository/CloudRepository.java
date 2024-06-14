package galidev.galiphone.mc.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

@Repository
public interface CloudRepository extends JpaRepository<galidev.galiphone.mc.model.Cloud, Long>{

}
