CREATE TABLE `users` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` integer NOT NULL,
  `avatar` varchar(255),
  `created_at` timestamp DEFAULT now()
);

CREATE TABLE `role` (
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
