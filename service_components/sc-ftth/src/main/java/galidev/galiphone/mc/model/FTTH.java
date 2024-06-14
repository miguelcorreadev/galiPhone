package galidev.galiphone.mc.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;


@Entity
@Data
@Table(name = "FTTH")
public class FTTH implements Serializable {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String email;
	private String nombre;
	private int velocidad;
	private String fijo;
	private String portabilidad;
	private String operacion;
	private String estado;
	private String operadora;
	private Date fechaAlta;
	private Date fechaModif;
	private Date fechaBaja;
}
