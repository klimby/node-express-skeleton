/**
 * App locales
 */
export enum Locales {
  ru = 'ru',
  en = 'en'
}

/**
 * Language entity
 */
export interface Lang {
  ru: string;
  en: string;
}

/**
 * Common controller response
 */
export interface JsonResponse<T> {
  data: T | T[];
  meta: object;
}

/**
 * Model controller response
 */
export interface JsonModelResponse<T> {
  data: T;
  meta: object;
}

/**
 * Array controller response
 */
export interface JsonArrayResponse<T> {
  data: T[];
  meta: object;
}
