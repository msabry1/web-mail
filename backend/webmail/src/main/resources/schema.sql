CREATE DATABASE IF NOT EXISTS webmail;
use webmail;

CREATE TABLE user (
                      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                      username VARCHAR(255) NOT NULL UNIQUE,
                      password VARCHAR(255) NOT NULL,
                      first_name VARCHAR(255) NOT NULL,
                      last_name VARCHAR(255) NOT NULL,
                      created_at datetime NOT NULL,
                      created_by varchar(255) NOT NULL,
                      updated_at datetime,
                      updated_by varchar(255)
);

CREATE TABLE contact (
                         id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         name VARCHAR(255) NOT NULL,
                         user_id BIGINT UNSIGNED NOT NULL,
                         created_at datetime NOT NULL,
                         created_by varchar(255) NOT NULL,
                         updated_at datetime,
                         updated_by varchar(255),
                         CONSTRAINT contact_user_id_fk FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE contact_emails (
                                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                email VARCHAR(255) NOT NULL UNIQUE,
                                contact_id BIGINT UNSIGNED NOT NULL,
                                created_at datetime NOT NULL,
                                created_by varchar(255) NOT NULL,
                                updated_at datetime,
                                updated_by varchar(255),
                                CONSTRAINT contact_emails_contact_id_fk FOREIGN KEY (contact_id) REFERENCES contact (id)
);

CREATE TABLE folder (
                        id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        user_id BIGINT UNSIGNED NOT NULL,
                        created_at datetime NOT NULL,
                        created_by varchar(255) NOT NULL,
                        updated_at datetime,
                        updated_by varchar(255),
                        CONSTRAINT folder_user_id_fk FOREIGN KEY (user_id) REFERENCES user (id)
);

CREATE TABLE mail (
                      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                      body TEXT NOT NULL,
                      sender_id BIGINT UNSIGNED NOT NULL,
                      status VARCHAR(255) NOT NULL,
                      subject VARCHAR(255) NOT NULL,
                      date DATETIME NOT NULL,
                      importance VARCHAR(50) NULL,
                      is_stared BOOLEAN DEFAULT FALSE,
                      is_seen BOOLEAN DEFAULT FALSE,
                      created_at DATETIME NOT NULL,
                      created_by VARCHAR(255) NOT NULL,
                      updated_at DATETIME,
                      updated_by VARCHAR(255),
                      CONSTRAINT mail_sender_id_fk FOREIGN KEY (sender_id) REFERENCES user (id)
);


CREATE TABLE mail_receiver (
                               receiver_id BIGINT UNSIGNED NOT NULL,
                               mail_id BIGINT UNSIGNED NOT NULL,
                               CONSTRAINT mail_receiver_receiver_id_fk FOREIGN KEY (receiver_id) REFERENCES user (id),
                               CONSTRAINT mail_receiver_mail_id_fk FOREIGN KEY (mail_id) REFERENCES mail (id),
                               PRIMARY KEY (receiver_id,mail_id)
);
CREATE TABLE mail_attachment (
                                 id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                 mail_id BIGINT UNSIGNED NOT NULL,
                                 front_id VARCHAR(255) NOT NULL,
                                 name VARCHAR(255) NOT NULL,
                                 link VARCHAR(255) NOT NULL,
                                 created_at datetime NOT NULL,
                                 created_by varchar(255) NOT NULL,
                                 updated_at datetime,
                                 updated_by varchar(255),
                                 CONSTRAINT mail_attachment_mail_id_fk FOREIGN KEY (mail_id) REFERENCES mail (id)
);

CREATE TABLE folder_mail (
                             folder_id BIGINT UNSIGNED NOT NULL,
                             mail_id BIGINT UNSIGNED NOT NULL,
                             CONSTRAINT folder_mail_folder_id_fk FOREIGN KEY (folder_id) REFERENCES folder (id),
                             CONSTRAINT folder_mail_mail_id_fk FOREIGN KEY (mail_id) REFERENCES mail (id),
                             PRIMARY KEY (folder_id,mail_id)
);
