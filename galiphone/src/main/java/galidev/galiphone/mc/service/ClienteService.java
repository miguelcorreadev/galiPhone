package galidev.galiphone.mc.service;

import galidev.galiphone.mc.model.Cliente;
import galidev.galiphone.mc.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {
	
	
	@Autowired
	private ClienteRepository clienteRepository;

	public List<Cliente> findAll() {
		return clienteRepository.findAll();
	}

	public List<Cliente> findAll(Sort sort) {
		return clienteRepository.findAll(sort);
	}


	public Page<galidev.galiphone.mc.model.Cliente> findAll(Pageable pageable) {
		return clienteRepository.findAll(pageable);
	}

	public <S extends galidev.galiphone.mc.model.Cliente> S save(S entity) {
		return clienteRepository.save(entity);
	}

	public Optional<Cliente> findById(Long id) {
		return clienteRepository.findById(id);
	}


	public Boolean deleteById(Long id) {
		if (clienteRepository.existsById(id)) {
			clienteRepository.deleteById(id);
			return !clienteRepository.existsById(id);
		}
		return false;
	}

	public void delete(Cliente entity) {
		clienteRepository.delete(entity);
	}

}
