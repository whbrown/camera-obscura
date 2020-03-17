-- references to people in letters
CREATE TABLE lookup_letters_refpersons (
  letter_id INT UNSIGNED NOT NULL,
  person_id INT UNSIGNED NOT NULL,
  direct_ref BOOLEAN,
  record_created_at TIMESTAMP DEFAULT NOW(),
  record_last_updated TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (letter_id) REFERENCES letters(id),
  FOREIGN KEY (person_id) REFERENCES persons(id),
  PRIMARY KEY (letter_id, person_id)
) ENGINE = innodb DEFAULT CHARSET = UTF8MB4 DEFAULT COLLATE = UTF8MB4_unicode_ci;
