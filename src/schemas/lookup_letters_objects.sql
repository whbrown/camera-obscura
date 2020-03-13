CREATE TABLE lookup_letters_objects (
  letter_id INT UNSIGNED NOT NULL,
  object_id INT UNSIGNED NOT NULL,
  record_created_at TIMESTAMP DEFAULT NOW(),
  record_last_updated TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (letter_id) REFERENCES letters(id),
  FOREIGN KEY (object_id) REFERENCES objects(id),
  PRIMARY KEY (object_id, letter_id)
) ENGINE = innodb DEFAULT CHARSET = UTF8MB4 DEFAULT COLLATE = UTF8MB4_unicode_ci;