package galidev.galiphone.mc.service;

import galidev.galiphone.mc.model.Mobile;
import galidev.galiphone.mc.repository.MobileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MobileService {

    @Autowired
    private MobileRepository mobileRepository;

	public List<Mobile> findAll() {
		return mobileRepository.findAll();
	}

	public List<Mobile> findAll(Sort sort) {
		return mobileRepository.findAll(sort);
	}


	public Page<Mobile> findAll(Pageable pageable) {
		return mobileRepository.findAll(pageable);
	}

	public <S extends Mobile> S save(S entity) {
		return mobileRepository.save(entity);
	}

	public Optional<Mobile> findById(Long id) {
		return mobileRepository.findById(id);
	}


	public Boolean deleteById(Long id) {
		if (mobileRepository.existsById(id)) {
			mobileRepository.deleteById(id);
			return !mobileRepository.existsById(id);
		}
		return false;
	}

	public void delete(Mobile entity) {
		mobileRepository.delete(entity);
	}

}
