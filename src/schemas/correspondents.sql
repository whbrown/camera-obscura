CREATE TABLE correspondents (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  DOB Date,
  DOD Date,
  description VARCHAR(255),
  image VARCHAR(255),
  record_created_at TIMESTAMP DEFAULT NOW(),
  INDEX name (fname, lname)
) ENGINE = innodb DEFAULT CHARSET = UTF8MB4 DEFAULT COLLATE = UTF8MB4_unicode_ci;