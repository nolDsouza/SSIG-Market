import { TestBed, inject } from '@angular/core/testing';

import { TransactionAccountService } from './transaction-account.service';

describe('TransactionAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionAccountService]
    });
  });

  it('should be created', inject([TransactionAccountService], (service: TransactionAccountService) => {
    expect(service).toBeTruthy();
  }));
});
