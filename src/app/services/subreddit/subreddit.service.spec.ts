import { TestBed } from '@angular/core/testing';

import { SubredditService } from './subreddit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SubredditService', () => {
  let service: SubredditService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SubredditService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
