package galidev.galiphone.mc.rest;

import java.net.URI;
import java.util.List;

import galidev.galiphone.mc.model.FTTH;
import galidev.galiphone.mc.service.FTTHService;
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
@RequestMapping("/ftth/")
public class FTTHREST {

	@Autowired
	private FTTHService FTTHService;

	@GetMapping
	private ResponseEntity<List<FTTH>> getAllCloud (){
		return ResponseEntity.ok(FTTHService.findAll());
	}

	@PostMapping
	private ResponseEntity<FTTH> saveFTTH (@RequestBody FTTH FTTH){
		try {
			FTTH FTTHGuardado = FTTHService.save(FTTH);
			return ResponseEntity.created(new URI("/ftth/"+FTTHGuardado.getId())).body(FTTHGuardado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}

	@DeleteMapping (value = "delete/{id}")
	private ResponseEntity<Boolean> deleteCloud (@PathVariable ("id") Long id){
		return ResponseEntity.ok(FTTHService.deleteById(id));
	}

}


