import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelBuilderComponent } from './model-builder.component';

describe('ModelBuilderComponent', () => {
  let component: ModelBuilderComponent;
  let fixture: ComponentFixture<ModelBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
