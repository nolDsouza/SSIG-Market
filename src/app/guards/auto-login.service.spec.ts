import { TestBed, inject } from '@angular/core/testing';

import { AutoLoginService } from './auto-login.service';

describe('AutoLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AutoLoginService]
    });
  });

  it('should be created', inject([AutoLoginService], (service: AutoLoginService) => {
    expect(service).toBeTruthy();
  }));
});
