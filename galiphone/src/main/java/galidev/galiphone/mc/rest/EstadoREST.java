package galidev.galiphone.mc.rest;

import galidev.galiphone.mc.model.Estado;
import galidev.galiphone.mc.service.EstadoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/estados/")
public class EstadoREST {
	
	@Autowired
	private EstadoService estadoService;
	
	@GetMapping
	private ResponseEntity<List<Estado>> getAllEstados (){
		return ResponseEntity.ok(estadoService.findAll());
	}
	
	@PostMapping
	private ResponseEntity<Estado> saveEstado (@RequestBody Estado estado){
		try {
			Estado estadoGuardado = estadoService.save(estado);
		return ResponseEntity.created(new URI("/estados/"+estadoGuardado.getId())).body(estadoGuardado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@DeleteMapping (value = "delete/{id}")
	private ResponseEntity<Boolean> deleteEstado (@PathVariable ("id") Long id){
		return ResponseEntity.ok(estadoService.deleteById(id));
	}

}
