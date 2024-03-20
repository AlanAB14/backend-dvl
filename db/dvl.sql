CREATE TABLE `users` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` integer NOT NULL,
  `avatar` varchar(255),
  `created_at` timestamp DEFAULT now()
);

CREATE TABLE `roles` (
  `role_id` integer PRIMARY KEY AUTO_INCREMENT,
  `role` varchar(255) NOT NULL
);

CREATE TABLE `info_us` (
  `title` varchar(255) NOT NULL,
  `subtitle` varchar(255) NOT NULL,
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

CREATE TABLE `certificaciones` (
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

ALTER TABLE `certificaciones` ADD FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `news` ADD FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`updated_by`) REFERENCES `users` (`user_id`);


insert into roles (role_id, role) values (1, 'super_admin');
insert into roles (role_id, role) values (2, 'admin');
insert into roles (role_id, role) values (3, 'guest');

-- insert into users (user_id, username, email, password, role_id, avatar, created_at) values (1, 'admin', 'admin@admin.com', 'admin', 1, '', '');

insert into policies (id, text, updated_by) values (1, 'PRIORIZAR la capacitación permanente para asegurar las competencias del personal en los diferentes niveles de la organización y generar un ambiente de trabajo motivador, brindando el apoyo y los recursos necesarios para garantizar la mejora continua.', 5);
insert into policies (id, text, updated_by) values (2, 'ADAPTARSE a las nuevas demandas, focalizando permanentemente en la innovación de la tecnología y los procesos, mediante una organización flexible que sea capaz de dar respuesta a las necesidades de los clientes, actuales y potenciales.', 5);
insert into policies (id, text, updated_by) values (3, 'PROVEER bienes y servicios que constantemente satisfagan los requerimientos de los clientes, el capital humano y la dirección estratégica de la empresa.', 5);
insert into policies (id, text, updated_by) values (4, 'ADOPTAR una estrategia de estandarización de los procesos para mejorar la eficiencia y obtener los mejores costos, estableciendo metas y objetivos específicos.', 5);
insert into policies (id, text, updated_by) values (5, 'TRABAJAR en conjunto con nuestros proveedores para alcanzar su compromiso con la calidad, y así poder garantizarla a nuestros clientes.', 5);
insert into policies (id, text, updated_by) values (6, 'CONTRIBUIR de manera activa y responsable con el desarrollo sustentable.', 5);