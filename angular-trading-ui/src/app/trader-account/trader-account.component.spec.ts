import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderAccountComponent } from './trader-account.component';

describe('TraderAccountComponent', () => {
  let component: TraderAccountComponent;
  let fixture: ComponentFixture<TraderAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraderAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraderAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
