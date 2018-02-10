import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestComponentInterface } from './testComponent';
import { Direction } from '../../src/component/interfaces/direction';
import { Datasource } from '../../src/component/interfaces/datasource';
import { UiScrollComponent } from '../../src/ui-scroll.component';

export class Padding {
  direction: Direction;
  element: DebugElement;
  style: CSSStyleDeclaration;

  constructor(fixture: ComponentFixture <any>, direction: Direction) {
    this.direction = direction;
    this.element = fixture.debugElement.query(By.css(`[data-padding-${direction}]`));
    this.style = this.element.nativeElement.style;
  }
}

export class Misc {

  fixture: ComponentFixture <TestComponentInterface>;
  testComponent: TestComponentInterface;
  datasource: Datasource;
  uiScrollElement: DebugElement;
  uiScrollComponent: UiScrollComponent;
  padding = {};

  constructor(fixture: ComponentFixture <any>) {
    this.fixture = fixture;
    this.testComponent = fixture.componentInstance;
    this.datasource = this.testComponent.datasource;
    this.uiScrollElement = this.elementByAttr('ui-scroll');
    this.uiScrollComponent = this.uiScrollElement.componentInstance;
    this.padding[Direction.forward] = new Padding(fixture, Direction.forward);
    this.padding[Direction.backward] = new Padding(fixture, Direction.backward);
  }

  elementByAttr(attr) {
    return this.fixture.debugElement.query(By.css(attr));
  }
}
