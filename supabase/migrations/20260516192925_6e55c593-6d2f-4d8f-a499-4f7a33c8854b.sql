
create table public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Section 1: Patient info
  full_name text not null,
  date_of_birth text,
  age text,
  gender text,
  address text,
  phone text not null,
  email text not null,
  occupation text,
  marital_status text,
  emergency_contact text,
  referred_by text,

  -- Section 2: Chief complaint
  main_complaint text not null,
  complaint_duration text,
  complaint_onset text,
  complaint_location text,
  complaint_sensation text,
  complaint_causation text,
  complaint_intensity text,
  complaint_frequency text,
  complaint_associated text,
  complaint_treatment_tried text,

  -- Section 3: Past complaints & medical history
  previous_illnesses text,
  childhood_diseases text,
  current_medications text,
  known_allergies text,
  family_history text,

  -- Section 4: Modalities (JSON: { temperature: {better, worse}, ... })
  modalities jsonb,
  modality_notes text,

  -- Section 5: Mental & emotional state
  fears_phobias text,
  anxiety_triggers text,
  sleep_quality text,
  appetite text,
  thirst text,
  food_cravings text,
  perspiration text,

  -- Section 6: Consent
  consent_given boolean not null default false,
  research_opt_out boolean not null default false,
  patient_signature text not null,
  signed_date date not null default current_date,

  -- Meta
  consultation_type text
);

alter table public.intake_submissions enable row level security;

-- Anyone can submit a new intake (including anonymous visitors).
create policy "Anyone can submit intake"
  on public.intake_submissions
  for insert
  to anon, authenticated
  with check (true);

-- No SELECT/UPDATE/DELETE policies => data is locked down. Only service role can read.
