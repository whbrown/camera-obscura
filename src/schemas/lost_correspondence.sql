CREATE TABLE lost_correspondence (
  proven BOOLEAN,
  primary_person_id INT UNSIGNED NOT NULL,
  secondary_person_id INT UNSIGNED NOT NULL,
  start_date DATE,
  end_date DATE,
  record_created_at TIMESTAMP DEFAULT NOW(),
  record_last_updated TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (primary_person_id) REFERENCES persons(id),
  FOREIGN KEY (secondary_person_id) REFERENCES persons(id),
  PRIMARY KEY (primary_person_id, secondary_person_id)
) ENGINE = innodb DEFAULT CHARSET = UTF8MB4 DEFAULT COLLATE = UTF8MB4_unicode_ci;