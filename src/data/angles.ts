// Tier-1 angle catalogue. Source: workspaces/cairo/skills/racing/
// RESEARCH_blackbook_angles_2026-05-11.md §2 + PUBLIC_ANGLE_META in
// build_bb_angle.py. All ten passed 4/4 yearly stability (2022, 2023, 2024,
// 2025) with positive lift over per-code BSP baseline.
//
// Vocab rule (feedback_blackbook_public_vocab):
//   - "master_sr" / "master" rating  -> "speed rating"
//   - never surface raw rk_* or sr_* field names
//   - aggregate %s, hit rates, lift in pp, bio facts are OK

export type RaceCode = 'FLT' | 'AWF' | 'HDL' | 'CHS' | 'NHF';

export interface AngleEntry {
  id: string;                 // bb_<...> as in inspect_bb_angle.ANGLES
  code: RaceCode;
  kind: 'forward' | 'lookback';
  label: string;              // public-vocab title
  signal: string;             // one-line public-vocab summary
  definition: string;         // 2-3 sentence customer-facing explanation
  n: number;                  // backtest matches 2022-2025
  hit_pct: number;            // historical hit rate %
  roi_pct: number;            // historical ROI %
  baseline_pct: number;       // per-code BSP back-everything yield
  lift_pp: number;            // roi_pct minus baseline_pct (in percentage points)
  alerts_per_year: number;
}

export const CODE_LABEL: Record<RaceCode, string> = {
  FLT: 'Flat (turf)',
  AWF: 'All-Weather',
  HDL: 'Hurdles',
  CHS: 'Chase',
  NHF: 'Bumpers',
};

export const TIER1_ANGLES: AngleEntry[] = [
  {
    id: 'bb_strong_signal_loser_LTO_FLT_21',
    code: 'FLT',
    kind: 'lookback',
    label: 'Strong-signal close-up loser (Flat)',
    signal: 'narrowly beaten last time out on the Flat, was top of the field on speed rating',
    definition:
      'Horse finished 2nd to 4th last time out on the Flat, but topped the field on speed rating plus at least one other rating line. The market often lengthens the next-time price after a visible loss while the underlying rating is unchanged. Alert fires when the horse appears on tomorrow’s Betfair card within 21 days of the qualifying run.',
    n: 1102, hit_pct: 19.6, roi_pct: 19.0, baseline_pct: -1.6, lift_pp: 20.6, alerts_per_year: 334,
  },
  {
    id: 'bb_hot_jockey_top_master_FLT',
    code: 'FLT',
    kind: 'forward',
    label: 'Hot jockey, top speed rating (Flat)',
    signal: 'tops the field on speed rating; in-form jockey on board',
    definition:
      'Horse tops the field on speed rating in a turf Flat race. Booked jockey has won at least 3 races at a 20%+ strike rate over the last 14 days. Modest per-alert edge that scales with volume.',
    n: 7048, hit_pct: 21.6, roi_pct: 5.8, baseline_pct: -1.6, lift_pp: 7.4, alerts_per_year: 2136,
  },
  {
    id: 'bb_absence_returner_winner_AWF',
    code: 'AWF',
    kind: 'forward',
    label: 'Past winner back from a break (All-Weather)',
    signal: 'past winner returning from a 60+ day absence',
    definition:
      'Horse has at least one career win and is returning to the all-weather track after 60+ days off. Suggests a layoff campaign: trainer giving a known winner time off, then bringing them back with intent.',
    n: 7201, hit_pct: 10.6, roi_pct: 5.1, baseline_pct: -4.8, lift_pp: 9.9, alerts_per_year: 2182,
  },
  {
    id: 'bb_tj_course_spec_top_AWF',
    code: 'AWF',
    kind: 'forward',
    label: 'Trainer-jockey course specialist (All-Weather)',
    signal: 'trainer-jockey pairing has a strong winning record at this course',
    definition:
      'Trainer and jockey have at least three combined wins at this course. Course specialisation is one of the most robust angles in racing — large alert volume, modest per-alert edge that compounds.',
    n: 15311, hit_pct: 15.1, roi_pct: 4.7, baseline_pct: -4.8, lift_pp: 9.6, alerts_per_year: 4640,
  },
  {
    id: 'bb_tj_course_spec_top_HDL',
    code: 'HDL',
    kind: 'forward',
    label: 'Trainer-jockey course specialist (Hurdles)',
    signal: 'trainer-jockey pairing has a strong winning record at this course',
    definition:
      'Same trainer-jockey course-specialist filter as the All-Weather version, applied to hurdles. Hurdles baseline ROI is meaningfully positive on its own; this angle adds a further 17pp on top.',
    n: 12898, hit_pct: 17.9, roi_pct: 27.8, baseline_pct: 10.8, lift_pp: 17.0, alerts_per_year: 3909,
  },
  {
    id: 'bb_trainer_hot_top_HDL',
    code: 'HDL',
    kind: 'forward',
    label: 'Hot trainer top pick (Hurdles)',
    signal: 'ranked highest of the field; in-form trainer',
    definition:
      'Horse tops the field on speed rating in a hurdle race. Trainer has at least 5 wins in the last 14 days. The highest-volume hurdles angle in the catalogue.',
    n: 24223, hit_pct: 15.3, roi_pct: 19.5, baseline_pct: 10.8, lift_pp: 8.8, alerts_per_year: 7340,
  },
  {
    id: 'bb_chs_any4_top_rating_CHS',
    code: 'CHS',
    kind: 'forward',
    label: 'Quadruple-confluence top rating (Chase)',
    signal: 'tops the field on four or more independent rating lines',
    definition:
      'In a chase, horse tops the field on at least four of five independent rating lines — speed rating, last-time-out rating, BHA mark, ability score, and recent form. Small volume, very high conviction.',
    n: 472, hit_pct: 35.8, roi_pct: 56.9, baseline_pct: 26.3, lift_pp: 30.6, alerts_per_year: 143,
  },
  {
    id: 'bb_chs_form_top_CHS',
    code: 'CHS',
    kind: 'forward',
    label: 'Top recent form (Chase)',
    signal: 'best recent form figure of any runner in the field',
    definition:
      'Horse has the best recent form figure of any runner in a chase. Large-volume chase angle that pays a steady 17pp over baseline year in, year out.',
    n: 4595, hit_pct: 15.2, roi_pct: 43.2, baseline_pct: 26.3, lift_pp: 16.9, alerts_per_year: 1393,
  },
  {
    id: 'bb_chs_market_overlay_CHS',
    code: 'CHS',
    kind: 'forward',
    label: 'Market overlay, top speed rating (Chase)',
    signal: 'tops the field on speed rating but offered at a longshot price',
    definition:
      'In a chase, horse tops the field on speed rating but the Betfair back price is 8.0 or longer. The market disagrees with the rating; the rating wins on average.',
    n: 1672, hit_pct: 10.6, roi_pct: 45.2, baseline_pct: 26.3, lift_pp: 18.9, alerts_per_year: 507,
  },
  {
    id: 'bb_nhf_tj_specialist_master_NHF',
    code: 'NHF',
    kind: 'forward',
    label: 'Course-specialist trainer-jockey + top speed rating (Bumper)',
    signal: 'tops the field on speed rating; trainer-jockey pairing proven at this course',
    definition:
      'In a National Hunt Flat race (bumper), horse tops the field on speed rating and the trainer-jockey pairing has at least 2 prior wins together at this course. The only bumper angle to clear the stability bar.',
    n: 386, hit_pct: 23.8, roi_pct: 33.8, baseline_pct: 0.1, lift_pp: 33.7, alerts_per_year: 117,
  },
];

export const TIER1_BY_ID: Record<string, AngleEntry> = Object.fromEntries(
  TIER1_ANGLES.map((a) => [a.id, a])
);

// Tier-2: borderline (3/4 yearly stable). Surfaced transparently as
// "under review" — not yet wired to live alerts.
// Source: RESEARCH_blackbook_angles_2026-05-11.md §3.
export interface Tier2Entry {
  research_id: string;        // research-doc id (e.g. T_bha_uplifted_top1)
  code: RaceCode;
  label: string;              // public-vocab title
  n: number;
  hit_pct: number;
  roi_pct: number;
  lift_pp: number;
  caveat: string;             // why this is Tier-2 not Tier-1
}

export const TIER2_ANGLES: Tier2Entry[] = [
  { research_id: 'T_bha_uplifted_top1',        code: 'FLT', label: 'BHA-uplifted top pick (Flat)',                      n: 1620,  hit_pct: 27.1, roi_pct: 11.5, lift_pp: 13.1, caveat: '2023 down 22pp before 2024 recovery — high single-year variance.' },
  { research_id: 'T_cd_winner_master',         code: 'FLT', label: 'Course + distance winner, top speed rating (Flat)', n: 1816,  hit_pct: 19.3, roi_pct: 7.3,  lift_pp: 9.0,  caveat: '2026-partial sample size flag (n=39).' },
  { research_id: 'T_course_winner_master',     code: 'FLT', label: 'Course winner, top speed rating (Flat)',            n: 2572,  hit_pct: 18.9, roi_pct: 5.9,  lift_pp: 7.5,  caveat: '2026-partial sample size flag (n=50).' },
  { research_id: 'T_bha_uplifted',             code: 'AWF', label: 'BHA-uplifted (All-Weather)',                        n: 7880,  hit_pct: 15.6, roi_pct: 12.5, lift_pp: 17.3, caveat: 'Mild 2023 miss; otherwise strong across the cuts.' },
  { research_id: 'A_form_top',                 code: 'AWF', label: 'Top recent form (All-Weather)',                     n: 10714, hit_pct: 6.5,  roi_pct: 9.3,  lift_pp: 14.1, caveat: 'Mild 2023 miss.' },
  { research_id: 'T_class_drop_top1',          code: 'AWF', label: 'Class drop top pick (All-Weather)',                 n: 2795,  hit_pct: 19.9, roi_pct: 6.1,  lift_pp: 10.9, caveat: '2026-partial showing recent fade (-15pp).' },
  { research_id: 'A_jockey_hot_top',           code: 'AWF', label: 'Hot jockey top pick (All-Weather)',                 n: 28171, hit_pct: 12.7, roi_pct: 4.6,  lift_pp: 9.4,  caveat: '2026-partial recent fade.' },
  { research_id: 'LB_master_improver_lost_21', code: 'AWF', label: 'Improving speed-rating loser, LTO within 21d (All-Weather)', n: 591, hit_pct: 20.6, roi_pct: 14.0, lift_pp: 18.9, caveat: 'One bad year (2023 down 25pp).' },
  { research_id: 'B_headgear_changed',         code: 'HDL', label: 'Headgear change (Hurdles)',                         n: 7045,  hit_pct: 11.5, roi_pct: 26.2, lift_pp: 15.4, caveat: '2026-partial showing recent fade.' },
  { research_id: 'T_market_overlook_top_master', code: 'HDL', label: 'Market overlay, top speed rating (Hurdles)',      n: 2772,  hit_pct: 8.6,  roi_pct: 22.0, lift_pp: 11.3, caveat: 'Flat 2024 year (-1pp).' },
  { research_id: 'B_first_time_visor',         code: 'HDL', label: 'First-time visor (Hurdles)',                        n: 431,   hit_pct: 14.6, roi_pct: 36.4, lift_pp: 25.6, caveat: 'Low 2026 sample.' },
  { research_id: 'LB_top_form_close_21',       code: 'CHS', label: 'Top recent form, beaten close-up LTO (Chase)',      n: 561,   hit_pct: 18.2, roi_pct: 92.5, lift_pp: 66.2, caveat: 'Massive headline variance — large single-year swings.' },
  { research_id: 'T_absence_returner_master_top_CHS', code: 'CHS', label: 'Past winner returning, top speed rating (Chase)', n: 966, hit_pct: 21.7, roi_pct: 51.0, lift_pp: 24.7, caveat: 'One bad year (2025 down 18pp).' },
  { research_id: 'LB_close_up_no_signal_21',   code: 'CHS', label: 'Close-up no-signal loser, LTO within 21d (Chase)',  n: 1059,  hit_pct: 19.8, roi_pct: 63.8, lift_pp: 37.5, caveat: 'Flat 2025 year (-3pp).' },
  { research_id: 'T_absence_returner_master_top_NHF', code: 'NHF', label: 'Past winner returning, top speed rating (Bumper)', n: 321, hit_pct: 22.4, roi_pct: 28.0, lift_pp: 28.0, caveat: 'One bad year (2024 down 44pp).' },
  { research_id: 'A_lto1_top',                 code: 'NHF', label: 'Top last-time-out rating (Bumper)',                 n: 1146,  hit_pct: 20.2, roi_pct: 16.9, lift_pp: 16.8, caveat: 'Flat 2024 year (-6pp).' },
];
