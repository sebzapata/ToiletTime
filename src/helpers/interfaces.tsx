import { DateTime } from 'luxon';

export interface TimeAndRankingRaw {
  DateTime: string;
  Ranking: number;
}

export interface TimeAndRanking {
  time: DateTime;
  ranking: number;
}