export interface LookupLetterRefPerson {
  letter_id: number;
  person_id: number;
  direct_ref: boolean;
  record_created_at?: Date;
  record_last_updated?: Date;
}