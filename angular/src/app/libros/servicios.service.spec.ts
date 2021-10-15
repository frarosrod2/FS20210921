import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerService } from 'src/lib/my-core';
import { NotificationService } from '../common-services';

import { LibrosViewModelService } from './servicios.service';

describe('LibrosViewModelService', () => {
  let service: LibrosViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientTestingModule, RouterTestingModule ],
      providers: [ NotificationService, LoggerService ],});
    service = TestBed.inject(LibrosViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
