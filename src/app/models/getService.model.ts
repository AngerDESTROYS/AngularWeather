import { Observable } from "rxjs";

export interface GetService<T> {
  getData(query: string): Observable<T[]>;
}
