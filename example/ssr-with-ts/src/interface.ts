
export interface IApiResult {
  news: NewsItem[]
}

interface NewsItem {
  id: string,
  title: string
}
/**
 * @description Api-Service abstractions
 */
export interface IApiService {
  index (): Promise<IApiResult>
}
