export class Currencies {
  meta: Meta;
  links: Links;
  data?: (Currency)[] | null;
}
export class Meta {
  total: number;
  pages: number;
}
export class Links {
  first: string;
  next: string;
  last: string;
}
export class Currency {
  type: string;
  id: string;
  attributes: Attributes;
  relationships: Relationships;
  links: Links1;
}
export class Attributes {
  code: string;
  name: string;
  currency_type: string;
  code_iso_numeric3?: string | null;
  code_iso_alpha3?: string | null;
  code_estandards_alpha?: string | null;
  code_jsons_alpha?: string | null;
  symbol?: string | null;
  native_symbol?: string | null;
  exponent: number;
  parent_currency_multiplier: number;
  category: string;
  created: number;
  updated: number;
  icon: Icon;
  issuer?: string | null;
}
export interface Icon {
  timestamp?: null;
  image?: null;
}
export interface Relationships {
  countries: Countries;
  parent: IssuerOrParent;
  issuer: IssuerOrParent;
  translations: Translations;
}
export interface Countries {
  links: Links2;
}
export interface Links2 {
  related: string;
}
export interface IssuerOrParent {
  data?: DataOrDataEntity | null;
  links: Links2;
}
export interface DataOrDataEntity {
  type: string;
  id: string;
}
export interface Translations {
  data?: (DataOrDataEntity1)[] | null;
  links: Links2;
}
export interface DataOrDataEntity1 {
  type: string;
  id: string;
}
export interface Links1 {
  self: string;
}
