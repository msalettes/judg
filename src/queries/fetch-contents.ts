import { SupportedLocale } from '../intl';

export default async function fetchContents(language: SupportedLocale, page: number = 1) {
  return fetch(`https://api.themoviedb.org/3/discover/`);
}
