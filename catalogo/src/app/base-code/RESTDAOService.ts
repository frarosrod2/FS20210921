import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
export abstract class RESTDAOService<T, K> {
protected baseUrl = environment.apiURL;
constructor(protected http: HttpClient, entidad: string, protected option = {}) { this.baseUrl += entidad; }
query(): Observable<Array<T>> { return this.http.get<Array<T>>(this.baseUrl, this.option); }
get(id: K): Observable<T> { return this.http.get<T>(this.baseUrl+ '/' +id, this.option); }
add(item: T, option: T): Observable<T>  { return this.http.post<T>(this.baseUrl, item, option); }
change(id: K, item: T, option: T): Observable<T> {return this.http.put<T>(this.baseUrl + '/' + id, item, option);}
remove(id: K, option: T): Observable<T> { return this.http.delete<T>(this.baseUrl + '/' + id, option); }
}

