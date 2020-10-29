CREATE DATABASE shuar;
use shuar;

CREATE TABLE users (
    id INT(11) NOT NULL PRIMARY KEY,
    username varchar(100) NOT NULL,
    password varchar(100) NOT NULL,
    correo varchar(100) NOT NULL,
	UNIQUE KEY unique_username (username)
  );

ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE servicios(
	id_servicio serial NOT NULL PRIMARY KEY,
	nombre varchar(100),
	imagen varchar(255),
	estado boolean NOT NULL,
	id_usuario varchar (25),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_servicios FOREIGN KEY(id_usuario) REFERENCES users(username)
);

ALTER TABLE servicios MODIFY id_servicio INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE asociados(
    id INT(11) NOT NULL PRIMARY KEY,
	nombre_empresa varchar(255) NOT NULL,
	actividad_comercial varchar(255) NOT NULL,
	direccion varchar(255),
	correo VARCHAR(100) NOT NULL,
	foto_asociado varchar(255),
	estado boolean NOT NULL,
    username varchar(25),
    created_at timestamp NOT NULL DEFAULT current_timestamp
);
ALTER TABLE asociados MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;
ALTER TABLE asociados ADD CONSTRAINT fk_asociado_user FOREIGN KEY(username) REFERENCES users(username);

CREATE TABLE conductores(
    id INT(11) NOT NULL PRIMARY KEY,
	nombre varchar(255),
	apellido varchar(255),
	telefono varchar(100),
	curriculum varchar(255),
	foto_conductor varchar(255),
	estado boolean NOT NULL,
	username varchar(25),
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

ALTER TABLE conductores ADD CONSTRAINT fk_conductor_user FOREIGN KEY(username) REFERENCES users(username);

ALTER TABLE conductores MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE tipo_vehiculo(
	id_tipo_ve  INT(11) NOT NULL PRIMARY KEY,
	nombre_tipo_vehiculo varchar(200)
);

ALTER TABLE tipo_vehiculo MODIFY id_tipo_ve INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE vehiculos(
	id_vehiculo INT(11) NOT NULL PRIMARY KEY,
	num_placa varchar(100),
	modelo varchar(200),
	marca varchar(200),
	ano_vehiculo varchar(10),
	color varchar(100),
	foto_vehiculo varchar(255),
	estado boolean NOT NULL,
	id_conductor varchar (25),
    tipo_vehiculo varchar(200) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

-- ALTER TABLE vehiculos ADD CONSTRAINT fk_vehiculo FOREIGN KEY(tipo_vehiculo) REFERENCES tipo_vehiculo(id_tipo_ve);
-- ALTER TABLE vehiculos ADD CONSTRAINT fk_conductor FOREIGN KEY(id_conductor) REFERENCES conductores(id);
ALTER TABLE vehiculos MODIFY id_vehiculo INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE catalogo_producto(
	id_catalogo  INT(11) NOT NULL PRIMARY KEY,
	nombre varchar(20) NOT NULL
);
ALTER TABLE catalogo_producto MODIFY id_catalogo INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

CREATE TABLE productos(
	id_producto  INT(11) NOT NULL PRIMARY KEY,
	nombre_producto varchar(255) NOT NULL,
	valor float,
	fecha_elab date,
	fecha_cadu date,
	cantidad  INT(6),
	foto_producto varchar(255),
	estado boolean NOT NULL,
	id_asociado varchar (25),
    catalogo_producto  varchar(200)  NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp
);

-- ALTER TABLE productos ADD CONSTRAINT fk_catalogo_Producto FOREIGN KEY(catalogo_producto) REFERENCES catalogo_producto(id_catalogo);
ALTER TABLE productos MODIFY id_producto INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

-- Insertar datos en catalogos y tipo vehiculo
INSERT INTO tipo_vehiculo VALUES(1,'Rentado');
INSERT INTO tipo_vehiculo VALUES(2,'Propio');
INSERT INTO tipo_vehiculo VALUES(3,'Cooperativa');

INSERT INTO catalogo_producto VALUES(1,'Alimenticio');
INSERT INTO catalogo_producto VALUES(2,'Educativo');
INSERT INTO catalogo_producto VALUES(3,'Tecnologico');



-- ALTER TABLE vehiculos DROP FOREIGN KEY fk_conductor;

-- ALTER TABLE productos DROP FOREIGN KEY fk_asociado;

-- ALTER TABLE vehiculos MODIFY COLUMN id_conductor varchar (25);

--  ALTER TABLE productos MODIFY COLUMN id_asociado varchar (25);

create unique index idx_conductor1 on  conductores(username);

create unique index idx_asociado1 on  asociados(username);

ALTER TABLE vehiculos ADD CONSTRAINT fk_conductor FOREIGN KEY(id_conductor) REFERENCES conductores(username);

ALTER TABLE productos ADD CONSTRAINT fk_asociado FOREIGN KEY(id_asociado) REFERENCES asociados(username);