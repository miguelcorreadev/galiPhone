package galidev.galiphone.mc.rest;

import java.net.URI;
import java.util.List;

import galidev.galiphone.mc.model.Mobile;
import galidev.galiphone.mc.service.MobileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@RequestMapping("/mobile/")
public class MobileREST {

	@Autowired
	private MobileService mobileService;

	@GetMapping
	private ResponseEntity<List<Mobile>> getAllMobile (){
		return ResponseEntity.ok(mobileService.findAll());
	}

	@PostMapping
	private ResponseEntity<Mobile> saveMobile (@RequestBody Mobile mobile){
		try {
			Mobile mobileGuardado = mobileService.save(mobile);
			return ResponseEntity.created(new URI("/mobile/"+mobileGuardado.getId())).body(mobileGuardado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@DeleteMapping (value = "delete/{id}")
	private ResponseEntity<Boolean> deleteMobile (@PathVariable ("id") Long id){
		return ResponseEntity.ok(mobileService.deleteById(id));
	}

}


