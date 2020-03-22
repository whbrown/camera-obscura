CREATE TABLE persons (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  gname VARCHAR(255),
  surname VARCHAR(255) NOT NULL,
  DOB Date,
  DOD Date,
  description VARCHAR(255),
  image VARCHAR(255),
  ref_person_id INT UNSIGNED UNIQUE,
  record_created_at TIMESTAMP DEFAULT NOW(),
  record_last_updated TIMESTAMP DEFAULT NOW(),
  UNIQUE INDEX ref_person_id (ref_person_id),
  UNIQUE INDEX name (gname, surname, DOB, DOD)
) ENGINE = innodb DEFAULT CHARSET = UTF8MB4 DEFAULT COLLATE = UTF8MB4_unicode_ci;