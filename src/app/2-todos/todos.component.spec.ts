/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';

//NOTE: I've deliberately excluded this suite from running
// because the test will fail. This is because we have not
// provided the TodoService as a dependency to TodosComponent.
//
// When you get to Lecture 6 (Providing Dependencies), be sure
// to remove "x" from "xdescribe" below.

xdescribe('TodosComponent', () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      declarations: [ TodosComponent ],
      providers: [ TodoService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit', () => {
    // use TestBed to get dependencies. We can get TodoService here b/c we imported it into our testing module
    let todoService = TestBed.get(TodoService);
    let todoServiceSpy = spyOn(todoService, 'getTodos').and.returnValue([1, 2, 3]);

    // IMPORTANT: this detectchanges needs to be here b/c angular will run ngOnInit when it executes.
    // before, this was instead in the beforeEach and we got an error b/c it caused ngOnInit to run before
    // we had our spy set up.
    fixture.detectChanges();

    expect(component.todos.length).toBe(3);
  });

  it('should test async stuff', fakeAsync(() => {
    let promise = spyOn(component, 'getTodosWithPromise');

    // tick wait until all microtasks are completed (promises for example).
    // used in conjunction with fakeAsync.
    tick();
    expect(component).toBeTruthy();
  }));
});
