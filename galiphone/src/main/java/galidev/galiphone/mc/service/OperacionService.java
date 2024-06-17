package galidev.galiphone.mc.service;

import galidev.galiphone.mc.model.Operacion;
import galidev.galiphone.mc.repository.OperacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OperacionService {
	
	
	@Autowired
	private OperacionRepository operacionRepository;

	public List<Operacion> findAll() {
		return operacionRepository.findAll();
	}

	public List<Operacion> findAll(Sort sort) {
		return operacionRepository.findAll(sort);
	}


	public Page<Operacion> findAll(Pageable pageable) {
		return operacionRepository.findAll(pageable);
	}

	public <S extends Operacion> S save(S entity) {
		return operacionRepository.save(entity);
	}

	public Optional<Operacion> findById(Long id) {
		return operacionRepository.findById(id);
	}


	public Boolean deleteById(Long id) {
		if (operacionRepository.existsById(id)) {
			operacionRepository.deleteById(id);
			return !operacionRepository.existsById(id);
		}
		return false;
	}

	public void delete(Operacion entity) {
		operacionRepository.delete(entity);
	}

}
