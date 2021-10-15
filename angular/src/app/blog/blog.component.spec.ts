import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoggerService } from 'src/lib/my-core';
import { NotificationService } from '../common-services';

import { BlogComponent } from './blog.component';

fdescribe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlogComponent ],
      providers: [ NotificationService, LoggerService ],
      imports: [ HttpClientTestingModule, RouterTestingModule, FormsModule ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('funciones', () => {
    let de = fixture.debugElement;
    // let tag = de.nativeElement;
    let tag: HTMLElement = fixture.debugElement.query(By.css('.Pantalla')).nativeElement;
    expect(tag.textContent?.trim()).toBe('0')
    component.ponOperando(123)
    expect(component.Pantalla).toBe('123')
    fixture.detectChanges()
    expect(tag.textContent?.trim()).toBe('123')
    fixture.debugElement.query(By.css('[value="7"]')).triggerEventHandler('click', null);
    fixture.detectChanges()
    expect(tag.textContent?.trim()).toBe('1237')
    fixture.debugElement.query(By.css('[value="."]')).triggerEventHandler('click', null);
    fixture.debugElement.query(By.css('[value="."]')).triggerEventHandler('click', null);
    expect(notify.add).toHaveBeenCalled();
    expect(notify.add).toHaveBeenCalledWith('Ya está la coma', NotificationType.warn)
  });

});
