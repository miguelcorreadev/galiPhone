package galidev.galiphone.mc.service;

import galidev.galiphone.mc.model.Operadora;
import galidev.galiphone.mc.repository.OperadoraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OperadoraService {
	
	
	@Autowired
	private OperadoraRepository operadoraRepository;

	public List<Operadora> findAll() {
		return operadoraRepository.findAll();
	}

	public List<Operadora> findAll(Sort sort) {
		return operadoraRepository.findAll(sort);
	}


	public Page<Operadora> findAll(Pageable pageable) {
		return operadoraRepository.findAll(pageable);
	}

	public <S extends Operadora> S save(S entity) {
		return operadoraRepository.save(entity);
	}

	public Optional<Operadora> findById(Long id) {
		return operadoraRepository.findById(id);
	}


	public Boolean deleteById(Long id) {
		if (operadoraRepository.existsById(id)) {
			operadoraRepository.deleteById(id);
			return !operadoraRepository.existsById(id);
		}
		return false;
	}

	public void delete(Operadora entity) {
		operadoraRepository.delete(entity);
	}

}
