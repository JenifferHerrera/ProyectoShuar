-- Database generated with pgModeler (PostgreSQL Database Modeler).
-- pgModeler  version: 0.7.2
-- PostgreSQL version: 9.4
-- Project Site: pgmodeler.com.br
-- Model Author: ---

SET check_function_bodies = false;
-- ddl-end --


-- Database creation must be done outside an multicommand file.
-- These commands were put in this file only for convenience.
-- -- object: "ShuarProyecto" | type: DATABASE --
-- -- DROP DATABASE "ShuarProyecto";
-- CREATE DATABASE "ShuarProyecto"
-- ;
-- -- ddl-end --
-- 

-- object: public.users | type: TABLE --
-- DROP TABLE public.users;
CREATE TABLE public.users(
	id_user serial NOT NULL,
	username varchar(20),
	correo varchar(20) NOT NULL,
	password varchar(20) NOT NULL,
	CONSTRAINT pk_id_user PRIMARY KEY (id_user)

);
-- ddl-end --
COMMENT ON TABLE public.users IS 'Es la tabla de los usuarios';
COMMENT ON COLUMN public.users.id_user IS 'Es la primary Key de la tabla user';
COMMENT ON COLUMN public.users.username IS 'Es el nombre del usuario';
COMMENT ON COLUMN public.users.correo IS 'Es el correo del usuario';
COMMENT ON CONSTRAINT pk_id_user ON public.users IS 'Es el Id de la tabla user';
-- ddl-end --

-- object: public.asociados | type: TABLE --
-- DROP TABLE public.asociados;
CREATE TABLE public.asociados(
	num_identificacion varchar(20) NOT NULL,
	nombre_empresa varchar(50) NOT NULL,
	actividad_comercial varchar(100) NOT NULL,
	direccion varchar(50),
	contrasena varchar(20) NOT NULL,
	foto_asociado varchar(50),
	estado bool NOT NULL,
	id_servicio integer NOT NULL,
	id_user integer NOT NULL,
	CONSTRAINT pk_asociados PRIMARY KEY (num_identificacion)

);
-- ddl-end --
COMMENT ON TABLE public.asociados IS 'Es la tabla de asociados';
COMMENT ON COLUMN public.asociados.num_identificacion IS 'Es el numero de identificacion de la tabla asociados';
COMMENT ON COLUMN public.asociados.nombre_empresa IS 'Es el nombre de la empresa';
COMMENT ON COLUMN public.asociados.actividad_comercial IS 'La actividad comercial a a que se dedica la empresa';
COMMENT ON COLUMN public.asociados.direccion IS 'Es la direccion de la empresa';
-- ddl-end --

-- object: public.vehiculos | type: TABLE --
-- DROP TABLE public.vehiculos;
CREATE TABLE public.vehiculos(
	id_vehiculo serial NOT NULL,
	tipo_vehiculo integer NOT NULL,
	num_placa varchar(10),
	modelo varchar(20),
	marca varchar(20),
	ano_vehiculo varchar(4),
	color varchar(10),
	foto_vehiculo varchar(50),
	estado bool NOT NULL,
	id_conductor varchar(20) NOT NULL,
	CONSTRAINT pk_id_conductores PRIMARY KEY (id_vehiculo)

);
-- ddl-end --
COMMENT ON TABLE public.vehiculos IS 'Es la tabla de vehiculos';
COMMENT ON COLUMN public.vehiculos.id_vehiculo IS 'Es el id de la tabla vehiculos';
COMMENT ON COLUMN public.vehiculos.tipo_vehiculo IS 'Es el tipo de vehiculo que maneja el conductor';
COMMENT ON COLUMN public.vehiculos.num_placa IS 'Es el numero de la placa del vehiculo';
COMMENT ON COLUMN public.vehiculos.modelo IS 'Es el model del vehiculo';
COMMENT ON COLUMN public.vehiculos.marca IS 'Es la marca del vehiculo';
COMMENT ON COLUMN public.vehiculos.ano_vehiculo IS 'Es el año del vehiculo';
COMMENT ON COLUMN public.vehiculos.color IS 'Es el color del vehiculo';
-- ddl-end --

-- object: public.conductores | type: TABLE --
-- DROP TABLE public.conductores;
CREATE TABLE public.conductores(
	ci_conductor varchar(20) NOT NULL,
	nombre varchar(20),
	apellido varchar(20),
	telefono varchar(10),
	curriculum varchar(100),
	estado bool NOT NULL,
	id_user integer NOT NULL,
	CONSTRAINT id_conductor_pk PRIMARY KEY (ci_conductor)

);
-- ddl-end --
COMMENT ON TABLE public.conductores IS 'Es la tabla de conductores';
COMMENT ON COLUMN public.conductores.ci_conductor IS 'Es el id de la tabla conductores';
COMMENT ON COLUMN public.conductores.nombre IS 'Es el nombre del conductor';
COMMENT ON COLUMN public.conductores.telefono IS 'Es el numero del contacto del conductor';
COMMENT ON COLUMN public.conductores.curriculum IS 'Es la hoja de vida del conductor';
COMMENT ON CONSTRAINT id_conductor_pk ON public.conductores IS 'Es el la primary key de conductores';
-- ddl-end --

-- object: public.productos | type: TABLE --
-- DROP TABLE public.productos;
CREATE TABLE public.productos(
	id_producto serial NOT NULL,
	nombre_producto varchar(20),
	catalogo_producto integer NOT NULL,
	valor float,
	fecha_elab date,
	fecha_cadu date,
	cantidad integer,
	foto_producto varchar(50),
	estado bool NOT NULL,
	id_asociado varchar(20) NOT NULL,
	CONSTRAINT fk_productos PRIMARY KEY (id_producto)

);
-- ddl-end --
COMMENT ON COLUMN public.productos.valor IS 'Es el precio del producto';
COMMENT ON COLUMN public.productos.fecha_elab IS 'Fecha de elaboracion';
COMMENT ON COLUMN public.productos.fecha_cadu IS 'Es la fecha de caducacion';
COMMENT ON COLUMN public.productos.cantidad IS 'Es la cantidad de unidades del producto';
-- ddl-end --

-- object: public.servicios | type: TABLE --
-- DROP TABLE public.servicios;
CREATE TABLE public.servicios(
	id_servicio serial NOT NULL,
	nombre varchar(20),
	imagen varchar(50),
	estado bool NOT NULL,
	id_usuario integer NOT NULL,
	CONSTRAINT pk_id_servicio PRIMARY KEY (id_servicio)

);
-- ddl-end --
COMMENT ON TABLE public.servicios IS 'Son los servicios que exiten dentro de la empresa';
COMMENT ON COLUMN public.servicios.imagen IS 'Una foto del servicio';
COMMENT ON COLUMN public.servicios.estado IS 'muestra el estado de actividad o inactividad';
-- ddl-end --

-- object: public.catalogo_producto | type: TABLE --
-- DROP TABLE public.catalogo_producto;
CREATE TABLE public.catalogo_producto(
	id_catalogo serial NOT NULL,
	nombre_producto varchar(20) NOT NULL,
	CONSTRAINT pk_catalogo_productos PRIMARY KEY (id_catalogo)

);
-- ddl-end --
-- object: public.tipo_vehiculo | type: TABLE --
-- DROP TABLE public.tipo_vehiculo;
CREATE TABLE public.tipo_vehiculo(
	id_tipo_ve serial NOT NULL,
	nombre_tipo_vehiculo varchar(20),
	CONSTRAINT fk_tipo_vehiculo PRIMARY KEY (id_tipo_ve)

);
-- ddl-end --
-- object: fk_servicio | type: CONSTRAINT --
-- ALTER TABLE public.asociados DROP CONSTRAINT fk_servicio;
ALTER TABLE public.asociados ADD CONSTRAINT fk_servicio FOREIGN KEY (id_servicio)
REFERENCES public.servicios (id_servicio) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: fk_id_user | type: CONSTRAINT --
-- ALTER TABLE public.asociados DROP CONSTRAINT fk_id_user;
ALTER TABLE public.asociados ADD CONSTRAINT fk_id_user FOREIGN KEY (id_user)
REFERENCES public.users (id_user) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: fk_id_conductores | type: CONSTRAINT --
-- ALTER TABLE public.vehiculos DROP CONSTRAINT fk_id_conductores;
ALTER TABLE public.vehiculos ADD CONSTRAINT fk_id_conductores FOREIGN KEY (id_conductor)
REFERENCES public.conductores (ci_conductor) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: fk_tipo_vehiculo | type: CONSTRAINT --
-- ALTER TABLE public.vehiculos DROP CONSTRAINT fk_tipo_vehiculo;
ALTER TABLE public.vehiculos ADD CONSTRAINT fk_tipo_vehiculo FOREIGN KEY (tipo_vehiculo)
REFERENCES public.tipo_vehiculo (id_tipo_ve) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: fk_id_user | type: CONSTRAINT --
-- ALTER TABLE public.conductores DROP CONSTRAINT fk_id_user;
ALTER TABLE public.conductores ADD CONSTRAINT fk_id_user FOREIGN KEY (id_user)
REFERENCES public.users (id_user) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: fk_catalogo | type: CONSTRAINT --
-- ALTER TABLE public.productos DROP CONSTRAINT fk_catalogo;
ALTER TABLE public.productos ADD CONSTRAINT fk_catalogo FOREIGN KEY (catalogo_producto)
REFERENCES public.catalogo_producto (id_catalogo) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: fk_asociados | type: CONSTRAINT --
-- ALTER TABLE public.productos DROP CONSTRAINT fk_asociados;
ALTER TABLE public.productos ADD CONSTRAINT fk_asociados FOREIGN KEY (id_asociado)
REFERENCES public.asociados (num_identificacion) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --


-- object: fk_servicios | type: CONSTRAINT --
-- ALTER TABLE public.servicios DROP CONSTRAINT fk_servicios;
ALTER TABLE public.servicios ADD CONSTRAINT fk_servicios FOREIGN KEY (id_usuario)
REFERENCES public.users (id_user) MATCH FULL
ON DELETE CASCADE ON UPDATE CASCADE;
-- ddl-end --
