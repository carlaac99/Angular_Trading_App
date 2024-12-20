import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraderListComponent } from './trader-list.component';

describe('TraderListComponent', () => {
  let component: TraderListComponent;
  let fixture: ComponentFixture<TraderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TraderListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TraderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
