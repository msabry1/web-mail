CREATE TABLE `User`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL
);
ALTER TABLE
    `User` ADD UNIQUE `user_username_unique`(`username`);
CREATE TABLE `Contact`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `user_id` BIGINT NOT NULL
);
CREATE TABLE `Contact_emails`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `email` VARCHAR(255) NOT NULL,
    `contact_id` BIGINT NOT NULL
);
CREATE TABLE `Folder`(
    `id` BIGINT NOT NULL,
    `name` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id` BIGINT NOT NULL
);
CREATE TABLE `Mail`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `content` VARCHAR(255) NOT NULL,
    `sender` BIGINT NOT NULL
);
CREATE TABLE `Mail/Receiver`(
    `id` BIGINT NOT NULL,
    `receiver_id` BIGINT NOT NULL,
    `mail_id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(`id`)
);
CREATE TABLE `Mail_attachement`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `mail_id` BIGINT NOT NULL,
    `link` VARCHAR(255) NOT NULL
);
CREATE TABLE `Folder/Mail`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `folder_id` BIGINT NOT NULL,
    `mail_id` BIGINT NOT NULL,
    `date` DATETIME NOT NULL
);
ALTER TABLE
    `Contact_emails` ADD CONSTRAINT `contact_emails_contact_id_foreign` FOREIGN KEY(`contact_id`) REFERENCES `Contact`(`id`);
ALTER TABLE
    `Mail_attachement` ADD CONSTRAINT `mail_attachement_mail_id_foreign` FOREIGN KEY(`mail_id`) REFERENCES `Mail`(`id`);
ALTER TABLE
    `Folder/Mail` ADD CONSTRAINT `folder/mail_mail_id_foreign` FOREIGN KEY(`mail_id`) REFERENCES `Mail`(`id`);
ALTER TABLE
    `Mail/Receiver` ADD CONSTRAINT `mail/receiver_receiver_id_foreign` FOREIGN KEY(`receiver_id`) REFERENCES `User`(`id`);
ALTER TABLE
    `Mail` ADD CONSTRAINT `mail_sender_foreign` FOREIGN KEY(`sender`) REFERENCES `User`(`id`);
ALTER TABLE
    `Contact` ADD CONSTRAINT `contact_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User`(`id`);
ALTER TABLE
    `Folder/Mail` ADD CONSTRAINT `folder/mail_folder_id_foreign` FOREIGN KEY(`folder_id`) REFERENCES `Folder`(`id`);
ALTER TABLE
    `Mail/Receiver` ADD CONSTRAINT `mail/receiver_mail_id_foreign` FOREIGN KEY(`mail_id`) REFERENCES `Mail`(`id`);
ALTER TABLE
    `Folder` ADD CONSTRAINT `folder_user_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `User`(`id`);