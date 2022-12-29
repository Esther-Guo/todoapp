-- ALTER USER 'root@localhost' IDENTIFIED WITH mysql_native_password BY 'Qwer123456!';

CREATE TABLE `todoapp`.`todolist` (
  `id` INT NOT NULL,
  `text` VARCHAR(255) NULL,
  `checked` TINYINT NULL DEFAULT 0,
  PRIMARY KEY (`id`));

INSERT INTO `todoapp`.`todolist` (`id`, `text`, `checked`) VALUES ('0', 'Complete online JS course', '1');
INSERT INTO `todoapp`.`todolist` (`id`, `text`, `checked`) VALUES ('1', 'Jog around the park', '0');
INSERT INTO `todoapp`.`todolist` (`id`, `text`, `checked`) VALUES ('2', 'Read for 1 hour', '0');
INSERT INTO `todoapp`.`todolist` (`id`, `text`, `checked`) VALUES ('3', 'Pick up groceries', '0');
INSERT INTO `todoapp`.`todolist` (`id`, `text`, `checked`) VALUES ('4', 'Complete Todo app project', '0');
