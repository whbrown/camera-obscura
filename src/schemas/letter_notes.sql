CREATE TABLE letter_notes (
  letter_id INT UNSIGNED NOT NULL,
  ref_code CHAR(3),
  -- ref_code for inline placement. letter has $1, $2, $3, etc... in original_text and translation body for interpolation of notes
  content TEXT,
  record_created_at TIMESTAMP DEFAULT NOW(),
  record_last_updated TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (letter_id) REFERENCES letters(id),
  PRIMARY KEY (letter_id, ref_code)
) ENGINE = innodb DEFAULT CHARSET = UTF8MB4 DEFAULT COLLATE = UTF8MB4_unicode_ci;