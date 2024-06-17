package galidev.galiphone.mc.rest;

import galidev.galiphone.mc.model.Operadora;
import galidev.galiphone.mc.service.OperadoraService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/operadoras/")
public class OperadoraREST {
	
	@Autowired
	private OperadoraService operadoraService;
	
	@GetMapping
	private ResponseEntity<List<Operadora>> getAllOperadora (){
		return ResponseEntity.ok(operadoraService.findAll());
	}
	
	@PostMapping
	private ResponseEntity<Operadora> saveOperadora (@RequestBody Operadora operadora){
		try {
			Operadora operadoraGuardado = operadoraService.save(operadora);
		return ResponseEntity.created(new URI("/operadoras/"+operadoraGuardado.getId())).body(operadoraGuardado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@DeleteMapping (value = "delete/{id}")
	private ResponseEntity<Boolean> deleteOperadora (@PathVariable ("id") Long id){
		return ResponseEntity.ok(operadoraService.deleteById(id));
	}

}
