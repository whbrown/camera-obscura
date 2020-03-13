CREATE TABLE lookup_letters_persons (
  letter_id INT UNSIGNED NOT NULL,
  sender_id INT UNSIGNED NOT NULL,
  recipient_id INT UNSIGNED NOT NULL,
  record_created_at TIMESTAMP DEFAULT NOW(),
  record_last_updated TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (letter_id) REFERENCES letters(id),
  FOREIGN KEY (sender_id) REFERENCES persons(id),
  FOREIGN KEY (recipient_id) REFERENCES persons(id),
  PRIMARY KEY (letter_id, sender_id, recipient_id)
) ENGINE = innodb DEFAULT CHARSET = UTF8MB4 DEFAULT COLLATE = UTF8MB4_unicode_ci;