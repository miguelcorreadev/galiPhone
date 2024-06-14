package galidev.galiphone.mc.rest;

import java.net.URI;
import java.util.List;

import galidev.galiphone.mc.model.Cliente;
import galidev.galiphone.mc.service.ClienteService;
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
@RequestMapping("/clientes/")
public class ClienteREST {
	
	@Autowired
	private ClienteService clienteService;
	
	@GetMapping
	private ResponseEntity<List<galidev.galiphone.mc.model.Cliente>> getAllClientes (){
		return ResponseEntity.ok(clienteService.findAll());
	}
	
	@PostMapping
	private ResponseEntity<galidev.galiphone.mc.model.Cliente> saveCliente (@RequestBody galidev.galiphone.mc.model.Cliente cliente){
		try {
			Cliente clienteGuardado = clienteService.save(cliente);
		return ResponseEntity.created(new URI("/clientes/"+clienteGuardado.getId())).body(clienteGuardado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@DeleteMapping (value = "delete/{id}")
	private ResponseEntity<Boolean> deleteCliente (@PathVariable ("id") Long id){
		return ResponseEntity.ok(clienteService.deleteById(id));
	}

}
