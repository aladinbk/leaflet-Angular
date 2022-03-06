import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArchiveService {
  host = environment.apiUrl + '/archive';

  constructor(private httpClient: HttpClient) {
  }
  getArchive(): Observable<any[]> {
    return this.httpClient
      .get<any[]>(this.host + '/list');
  }
}
