package galidev.galiphone.mc.service;

import galidev.galiphone.mc.model.Cloud;
import galidev.galiphone.mc.repository.CloudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CloudService {

    @Autowired
    private CloudRepository cloudRepository;

	public List<Cloud> findAll() {
		return cloudRepository.findAll();
	}

	public List<Cloud> findAll(Sort sort) {
		return cloudRepository.findAll(sort);
	}


	public Page<galidev.galiphone.mc.model.Cloud> findAll(Pageable pageable) {
		return cloudRepository.findAll(pageable);
	}

	public <S extends galidev.galiphone.mc.model.Cloud> S save(S entity) {
		return cloudRepository.save(entity);
	}

	public Optional<Cloud> findById(Long id) {
		return cloudRepository.findById(id);
	}


	public Boolean deleteById(Long id) {
		if (cloudRepository.existsById(id)) {
			cloudRepository.deleteById(id);
			return !cloudRepository.existsById(id);
		}
		return false;
	}

	public void delete(Cloud entity) {
		cloudRepository.delete(entity);
	}

}
