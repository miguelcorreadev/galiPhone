package galidev.galiphone.mc.service;


import galidev.galiphone.mc.model.Estado;
import galidev.galiphone.mc.repository.EstadoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EstadoService {
	
	
	@Autowired
	private EstadoRepository estadoRepository;

	public List<Estado> findAll() {
		return estadoRepository.findAll();
	}

	public List<Estado> findAll(Sort sort) {
		return estadoRepository.findAll(sort);
	}


	public Page<Estado> findAll(Pageable pageable) {
		return estadoRepository.findAll(pageable);
	}

	public <S extends Estado> S save(S entity) {
		return estadoRepository.save(entity);
	}

	public Optional<Estado> findById(Long id) {
		return estadoRepository.findById(id);
	}


	public Boolean deleteById(Long id) {
		if (estadoRepository.existsById(id)) {
			estadoRepository.deleteById(id);
			return !estadoRepository.existsById(id);
		}
		return false;
	}

	public void delete(Estado entity) {
		estadoRepository.delete(entity);
	}

}
