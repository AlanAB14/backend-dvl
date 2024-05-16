CREATE TABLE `users` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` integer NOT NULL,
  `avatar` longtext,
  `created_at` timestamp DEFAULT now()
);

CREATE TABLE `contacts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `company` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp DEFAULT now()
);

CREATE TABLE `roles` (
  `role_id` integer PRIMARY KEY AUTO_INCREMENT,
  `role` varchar(255) NOT NULL
);

CREATE TABLE `info_us` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NULL,
  `image` longtext NOT NULL,
  `text` text NOT NULL,
  `updated_by` integer
);

CREATE TABLE `numbers_us` (
  `number` integer NOT NULL,
  `type` ENUM ('empleados', 'estructura', 'anios'),
  `updated_by` integer
);

CREATE TABLE `policies` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `text` text,
  `updated_by` integer
);

CREATE TABLE `certifications` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `title` varchar(255) NOT NULL,
  `img_preview` longtext,
  `image` longtext,
  `text` text NOT NULL,
  `updated_by` integer
);

CREATE TABLE `news` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `img_preview` longtext,
  `image` longtext,
  `text` text NOT NULL,
  `updated_by` integer
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `stars` ENUM ('1', '2', '3', '4', '5') NOT NULL,
  `title` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `profession` varchar(255),
  `avatar` longtext,
  `updated_by` integer
);

ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`);

ALTER TABLE `info_us` ADD FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `numbers_us` ADD FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `policies` ADD FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `certifications` ADD FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `news` ADD FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);


insert into roles (role_id, role) values (1, 'super_admin');
insert into roles (role_id, role) values (2, 'admin');
insert into roles (role_id, role) values (3, 'guest');

-- insert into users (user_id, username, email, password, role_id, avatar, created_at) values (1, 'admin', 'admin@admin.com', 'admin', 1, '', '');

insert into policies (id, text, updated_by) values (1, 'PRIORIZAR la capacitación permanente para asegurar las competencias del personal en los diferentes niveles de la organización y generar un ambiente de trabajo motivador, brindando el apoyo y los recursos necesarios para garantizar la mejora continua.', 1);
insert into policies (id, text, updated_by) values (2, 'ADAPTARSE a las nuevas demandas, focalizando permanentemente en la innovación de la tecnología y los procesos, mediante una organización flexible que sea capaz de dar respuesta a las necesidades de los clientes, actuales y potenciales.', 1);
insert into policies (id, text, updated_by) values (3, 'PROVEER bienes y servicios que constantemente satisfagan los requerimientos de los clientes, el capital humano y la dirección estratégica de la empresa.', 1);
insert into policies (id, text, updated_by) values (4, 'ADOPTAR una estrategia de estandarización de los procesos para mejorar la eficiencia y obtener los mejores costos, estableciendo metas y objetivos específicos.', 1);
insert into policies (id, text, updated_by) values (5, 'TRABAJAR en conjunto con nuestros proveedores para alcanzar su compromiso con la calidad, y así poder garantizarla a nuestros clientes.', 1);
insert into policies (id, text, updated_by) values (6, 'CONTRIBUIR de manera activa y responsable con el desarrollo sustentable.', 1);

insert into numbers_us (number, type, updated_by) values (100, 'empleados', 1);
insert into numbers_us (number, type, updated_by) values (6500, 'estructura', 1);
insert into numbers_us (number, type, updated_by) values (25, 'anios', 1);

insert into info_us (title, subtitle, image, text, updated_by) values ('#Unacompañíadecompañías', 'Ofrecemos soluciones innovadoras que incorporan los últimos avances tecnológicos para integrar y monitorear remotamente los activos de nuestros clientes.', 'asd', 'Somos una empresa dedicada a la prestación de servicios a personas y vehículos. Tenemos una estructura edilicia que ocupa una superficie de 5700 m2, donde se encuentran las oficinas de la administración general y desde donde proyectamos los servicios de nuestras Unidades de Negocios: DVL Satelital, TeleAssistance, Taller ASA y Venado Rent a Car.', 1);

insert into comments (id, stars, title, name,	profession,	avatar,	updated_by) values (1, 5, 'Lorem ipsum dolor sit amet consectetur adipiscing, elit porta bibendum fermentum lobortis.', 'Pablo Lopez', 'Agrónomo', 'asd', 1);
insert into comments (id, stars, title, name,	profession,	avatar,	updated_by) values (2, 5, 'Lorem ipsum dolor sit amet consectetur adipiscing, elit porta bibendum fermentum lobortis.', 'Sebastián Loeb', 'Analista en Logística', 'asd', 1);
insert into comments (id, stars, title, name,	profession,	avatar,	updated_by) values (3, 5, 'Lorem ipsum dolor sit amet consectetur adipiscing, elit porta bibendum fermentum lobortis.', 'Jesica Andra', 'Analista en Logísitica', 'asd', 1);

insert into certifications (id,	date,	title, img_preview,	image, text, updated_by) values (1, '10 December 2020', 'Certificación Cesvi', 'asd', 'asd', 'Informacion del certificado', 1);
insert into certifications (id,	date,	title, img_preview,	image, text, updated_by) values (2, '10 December 2020', 'Certificación ISO 9001', 'asd', 'asd', 'Informacion del certificado', 1);
insert into certifications (id,	date,	title, img_preview,	image, text, updated_by) values (3, '10 December 2020', 'Políticas de Calidad – Documentación ISO 9001:2015', 'asd', 'asd', 'Informacion del certificado', 1);
insert into certifications (id,	date,	title, img_preview,	image, text, updated_by) values (4, '10 December 2020', 'Políticas de Calidad – Ej ISO 9001:2015', 'asd', 'asd', 'Informacion del certificado', 1);
