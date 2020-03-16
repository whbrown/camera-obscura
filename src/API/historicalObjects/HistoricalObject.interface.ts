export interface HistoricalObject {
  id?: number;
  primary_image?: string;
  object_type: string;
  object_medium: string;
  width?: number;
  height?: number;
  sent_date?: Date;
  date_precision: number;
  date_info?: string;
  origin_loc?: string;
  origin_country?: string;
  destination_loc?: string;
  destination_country?: string;
  repository?: string;
  inventory_code?: string;
  source_status?: string;
  additional_info?: string;
  original_text?: string;
  translation?: string;
  hasSketches?: boolean;
  record_created_at?: Date;
  record_last_updated?: Date;
}