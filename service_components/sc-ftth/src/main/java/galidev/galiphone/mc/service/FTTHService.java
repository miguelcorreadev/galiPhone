package galidev.galiphone.mc.service;

import galidev.galiphone.mc.model.FTTH;
import galidev.galiphone.mc.repository.FTTHRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FTTHService {

    @Autowired
    private FTTHRepository FTTHRepository;

	public List<FTTH> findAll() {
		return FTTHRepository.findAll();
	}

	public List<FTTH> findAll(Sort sort) {
		return FTTHRepository.findAll(sort);
	}


	public Page<FTTH> findAll(Pageable pageable) {
		return FTTHRepository.findAll(pageable);
	}

	public <S extends FTTH> S save(S entity) {
		return FTTHRepository.save(entity);
	}

	public Optional<FTTH> findById(Long id) {
		return FTTHRepository.findById(id);
	}


	public Boolean deleteById(Long id) {
		if (FTTHRepository.existsById(id)) {
			FTTHRepository.deleteById(id);
			return !FTTHRepository.existsById(id);
		}
		return false;
	}

	public void delete(FTTH entity) {
		FTTHRepository.delete(entity);
	}

}
