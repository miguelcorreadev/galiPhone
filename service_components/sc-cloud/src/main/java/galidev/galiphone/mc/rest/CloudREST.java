package galidev.galiphone.mc.rest;

import java.net.URI;
import java.util.List;

import galidev.galiphone.mc.model.Cloud;
import galidev.galiphone.mc.service.CloudService;
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
@RequestMapping("/cloud/")
public class CloudREST {

	@Autowired
	private CloudService cloudService;

	@GetMapping
	private ResponseEntity<List<galidev.galiphone.mc.model.Cloud>> getAllCloud (){
		return ResponseEntity.ok(cloudService.findAll());
	}

	@PostMapping
	private ResponseEntity<galidev.galiphone.mc.model.Cloud> saveCloud (@RequestBody galidev.galiphone.mc.model.Cloud cloud){
		try {
			Cloud cloudGuardado = cloudService.save(cloud);
			return ResponseEntity.created(new URI("/cloud/"+cloudGuardado.getId())).body(cloudGuardado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@DeleteMapping (value = "delete/{id}")
	private ResponseEntity<Boolean> deleteCloud (@PathVariable ("id") Long id){
		return ResponseEntity.ok(cloudService.deleteById(id));
	}

}


