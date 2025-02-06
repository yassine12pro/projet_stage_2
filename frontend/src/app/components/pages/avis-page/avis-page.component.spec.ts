import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvisPageComponent } from './avis-page.component';

describe('AvisPageComponent', () => {
  let component: AvisPageComponent;
  let fixture: ComponentFixture<AvisPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvisPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvisPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
