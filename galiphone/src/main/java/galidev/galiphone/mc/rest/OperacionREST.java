package galidev.galiphone.mc.rest;

import galidev.galiphone.mc.model.Operacion;
import galidev.galiphone.mc.service.OperacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/operacion/")
public class OperacionREST {
	
	@Autowired
	private OperacionService operacionService;
	
	@GetMapping
	private ResponseEntity<List<Operacion>> getAllOperacion (){
		return ResponseEntity.ok(operacionService.findAll());
	}
	
	@PostMapping
	private ResponseEntity<Operacion> saveOperacion (@RequestBody Operacion operacion){
		try {
			Operacion operacionGuardado = operacionService.save(operacion);
		return ResponseEntity.created(new URI("/operaciones/"+operacionGuardado.getId())).body(operacionGuardado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@DeleteMapping (value = "delete/{id}")
	private ResponseEntity<Boolean> deleteOperacion (@PathVariable ("id") Long id){
		return ResponseEntity.ok(operacionService.deleteById(id));
	}

}
