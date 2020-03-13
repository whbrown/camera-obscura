CREATE TABLE facsimiles (
  letter_id INT UNSIGNED NOT NULL,
  image_url VARCHAR(255),
  id CHAR(2),
  -- e.g. 1r (recto), 1v (verso), 2r, etc...
  sketch BOOLEAN,
  record_created_at TIMESTAMP DEFAULT NOW(),
  record_last_updated TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (letter_id) REFERENCES letters(id),
  PRIMARY KEY (letter_id, id)
) ENGINE = innodb DEFAULT CHARSET = UTF8MB4 DEFAULT COLLATE = UTF8MB4_unicode_ci;