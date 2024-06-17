package galidev.galiphone.mc.rest;

import galidev.galiphone.mc.model.Producto;
import galidev.galiphone.mc.service.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;


@RestController
@RequestMapping("/productos/")
public class ProductoREST {
	
	@Autowired
	private ProductoService productoService;
	
	@GetMapping
	private ResponseEntity<List<Producto>> getAllProductos (){
		return ResponseEntity.ok(productoService.findAll());
	}
	
	@PostMapping
	private ResponseEntity<Producto> saveProducto (@RequestBody Producto producto){
		try {
			Producto productoGuardado = productoService.save(producto);
		return ResponseEntity.created(new URI("/productos/"+productoGuardado.getId())).body(productoGuardado);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
		}
	}
	
	@DeleteMapping (value = "delete/{id}")
	private ResponseEntity<Boolean> deleteProducto (@PathVariable ("id") Long id){
		return ResponseEntity.ok(productoService.deleteById(id));
	}

}
