CREATE DATABASE shuar;
use shuar;

  CREATE TABLE users (
    id INT(11) NOT NULL PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    correo VARCHAR(100) NOT NULL
  );

ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE servicios(
	id_servicio serial NOT NULL PRIMARY KEY,
	nombre varchar(20),
	imagen varchar(50),
	estado boolean NOT NULL,
	id_usuario INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_servicios FOREIGN KEY(id_usuario) REFERENCES users(id)
);

ALTER TABLE servicios MODIFY id_servicio INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE asociados(
    id INT(11) NOT NULL PRIMARY KEY,
	nombre_empresa varchar(50) NOT NULL,
	actividad_comercial varchar(100) NOT NULL,
	direccion varchar(50),
	correo VARCHAR(100) NOT NULL,
	foto_asociado varchar(50),
	estado boolean NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

CREATE TABLE detalle_asociados(
	id INT(11) NOT NULL PRIMARY KEY,
	id_servicio INT(11) NOT NULL,
	id_user INT(11) NOT NULL,
    CONSTRAINT fk_asociados FOREIGN KEY(id_user) REFERENCES users(id)
);

ALTER TABLE detalle_asociados ADD CONSTRAINT fk_detalle_asociados FOREIGN KEY(id_servicio) REFERENCES servicios(id_servicio);
ALTER TABLE asociados MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
ALTER TABLE detalle_asociados MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE conductores(
    id INT(11) NOT NULL PRIMARY KEY,
	nombre varchar(20),
	apellido varchar(20),
	telefono varchar(10),
	curriculum varchar(100),
	estado boolean NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);
CREATE TABLE detalle_conductores(
	id INT(11) NOT NULL PRIMARY KEY,
	id_conductor INT(11) NOT NULL,
	id_user INT(11) NOT NULL,
    CONSTRAINT fk_detalle_conductores FOREIGN KEY(id_user) REFERENCES users(id)
);

ALTER TABLE conductores MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
ALTER TABLE detalle_conductores MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE tipo_vehiculo(
	id_tipo_ve  INT(11) NOT NULL PRIMARY KEY,
	nombre_tipo_vehiculo varchar(20)
);

ALTER TABLE tipo_vehiculo MODIFY id_tipo_ve INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE vehiculos(
	id_vehiculo INT(11) NOT NULL PRIMARY KEY,
	num_placa varchar(10),
	modelo varchar(20),
	marca varchar(20),
	ano_vehiculo varchar(4),
	color varchar(10),
	foto_vehiculo varchar(50),
	estado boolean NOT NULL,
	id_conductor INT(11) NOT NULL,
    tipo_vehiculo INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE vehiculos ADD CONSTRAINT fk_vehiculo FOREIGN KEY(tipo_vehiculo) REFERENCES tipo_vehiculo(id_tipo_ve);
ALTER TABLE vehiculos ADD CONSTRAINT fk_conductor FOREIGN KEY(id_conductor) REFERENCES conductores(id)
ALTER TABLE vehiculos MODIFY id_vehiculo INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE catalogo_producto(
	id_catalogo  INT(11) NOT NULL PRIMARY KEY,
	nombre_producto varchar(20) NOT NULL
);
ALTER TABLE catalogo_producto MODIFY id_catalogo INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE productos(
	id_producto  INT(11) NOT NULL PRIMARY KEY,
	nombre_producto varchar(20),
	valor float,
	fecha_elab date,
	fecha_cadu date,
	cantidad  INT(6),
	foto_producto varchar(50),
	estado boolean NOT NULL,
	id_asociado INT(11) NOT NULL,
    catalogo_producto  INT(11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_asociado FOREIGN KEY(id_asociado) REFERENCES asociados(id)
);

ALTER TABLE productos ADD CONSTRAINT fk_catalogo_Producto FOREIGN KEY(catalogo_producto) REFERENCES catalogo_producto(id_catalogo);
ALTER TABLE productos MODIFY id_producto INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

--Insertar datos en catalogos y tipo vehiculo
INSERT INTO tipo_vehiculo VALUES(1,'Rentado');
INSERT INTO tipo_vehiculo VALUES(2,'Propio');
INSERT INTO tipo_vehiculo VALUES(3,'Cooperativa');

INSERT INTO catalogo_producto VALUES(1,'Alimenticio');
INSERT INTO catalogo_producto VALUES(2,'Educativo');
INSERT INTO catalogo_producto VALUES(3,'Tecnologico');