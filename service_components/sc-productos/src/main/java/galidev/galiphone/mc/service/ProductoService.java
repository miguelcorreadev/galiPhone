package galidev.galiphone.mc.service;

import galidev.galiphone.mc.model.Producto;
import galidev.galiphone.mc.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {


	@Autowired
	private ProductoRepository productoRepository;

	public List<Producto> findAll() {
		return productoRepository.findAll();
	}

	public List<Producto> findAll(Sort sort) {
		return productoRepository.findAll(sort);
	}


	public Page<galidev.galiphone.mc.model.Producto> findAll(Pageable pageable) {
		return productoRepository.findAll(pageable);
	}

	public <S extends galidev.galiphone.mc.model.Producto> S save(S entity) {
		return productoRepository.save(entity);
	}

	public Optional<Producto> findById(Long id) {
		return productoRepository.findById(id);
	}


	public Boolean deleteById(Long id) {
		if (productoRepository.existsById(id)) {
			productoRepository.deleteById(id);
			return !productoRepository.existsById(id);
		}
		return false;
	}

	public void delete(Producto entity) {
		productoRepository.delete(entity);
	}

}
