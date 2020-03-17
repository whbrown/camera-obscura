CREATE TABLE letters (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  recorded_date DATE,
  date_precision TINYINT UNSIGNED NOT NULL,
  -- 0. unknown; 1. ok; 2. close-approx; 3. known range; 4. range, first date known, second approx.; 5. range first approx, second known; 6. both approx., 7. distant approximation
  date_info VARCHAR(255),
  origin_loc VARCHAR(255),
  origin_country VARCHAR(255),
  destination_loc VARCHAR(255),
  destination_country VARCHAR(255),
  repository VARCHAR(255),
  inventory_code VARCHAR(255),
  catalogue_code VARCHAR(255),
  source_status VARCHAR(255),
  additional_info VARCHAR(255),
  original_text TEXT,
  en_translation TEXT,
  hasSketches BOOLEAN,
  ref_url VARCHAR(255),
  record_created_at TIMESTAMP DEFAULT NOW(),
  record_last_updated TIMESTAMP DEFAULT NOW(),
  INDEX recorded_date (recorded_date),
  INDEX origin_loc (origin_loc),
  INDEX destination_loc (destination_loc),
  INDEX catalogue_code (catalogue_code)
) ENGINE = innodb DEFAULT CHARSET = UTF8MB4 DEFAULT COLLATE = UTF8MB4_unicode_ci;

select case 
when surname like '%van gogh%' then 'van gogh'
else 'other'
end as family,
count(*) as members
from persons
group by family;