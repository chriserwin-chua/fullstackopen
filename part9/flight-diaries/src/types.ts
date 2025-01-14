export enum Weather {
  CLOUDY = 'cloudy',
  RAINY = 'rainy',
  SUNNY = 'sunny',
  WINDY = 'windy',
  STORMY = 'stormy',
}

export enum Visibility {
  GREAT = 'great',
  GOOD = 'good',
  OK = 'ok',
  POOR = 'poor',
}
export interface Diary {
  id: string;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type DiaryFormValues = Omit<Diary, 'id'>;
export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}
