package galidev.galiphone.mc.rest;

import java.net.URI;
import java.util.List;

import galidev.galiphone.mc.model.Producto;
import galidev.galiphone.mc.service.ProductoService;
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
@RequestMapping("/productos/")
public class ProductoREST {

	@Autowired
	private ProductoService productoService;

	@GetMapping
	private ResponseEntity<List<galidev.galiphone.mc.model.Producto>> getAllProductos (){
		return ResponseEntity.ok(productoService.findAll());
	}

	@PostMapping
	private ResponseEntity<galidev.galiphone.mc.model.Producto> saveProducto (@RequestBody galidev.galiphone.mc.model.Producto producto){
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


