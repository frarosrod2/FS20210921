import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { LoggerService } from 'src/lib/my-core';
import { NotificationService } from '../common-services';

import { Blog, BlogViewModelService } from './blog.service';

export class DAOServiceMock{
 constructor(private listado: Array <any>) {}
query(): Observable<any> { return of( this.listado )};
get(id: number ) { return of( this.listado [0])};
add(item : any ) { return of( item )};
change(id: number , item : any ) { return of( item )};
remove(id: number ) { return of(id); }
}

class BlogDAOService extends DAOServiceMock {
  constructor() {
    super([
      {
        "id": 1,
        "titulo": 'Saludo',
        "texto":
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eveniet eum nisi expedita ab dolorum labore similique provident officia ipsa, aliquam recusandae dicta id, praesentium quasi consequatur minus laborum perferendis?',
        "autor": 'Javier',
        "fecha": '2016-02-29',
        "megusta": 0,
        "fotourl":
          'https://cdn-images-1.medium.com/max/800/1*V3Kfghg_jIV0ubxmAnCXBA.jpeg',
      },
    ]);
  }
}

fdescribe('BlogViewModelService', () => {
  let service: BlogViewModelService;
  let dao: BlogDAOService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        NotificationService,
        LoggerService,
        {
          provide: BlogDAOService, useValue : new DAOServiceMock([
            {
              "id": 1,
              "titulo": 'Saludo',
              "texto":
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eveniet eum nisi expedita ab dolorum labore similique provident officia ipsa, aliquam recusandae dicta id, praesentium quasi consequatur minus laborum perferendis?',
              "autor": 'Javier',
              "fecha": '2016-02-29',
              "megusta": 0,
              "fotourl":
                'https://cdn-images-1.medium.com/max/800/1*V3Kfghg_jIV0ubxmAnCXBA.jpeg',
            },
          ])
        }
      ],
    });
    service = TestBed.inject(BlogViewModelService);
    dao = TestBed.inject(BlogDAOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('DAOServiceMock Query', (done: DoneFn) => {
    dao.query().subscribe(
      data => {
        expect(data.length).toBe(1);
        done();
      },
      () => fail()
    );
  });

  it('list', fakeAsync(() => {
    service.list();
    expect(service.Listado.length).toBe(1);
    expect(service.Modo).toBe('list');
  }));
});
