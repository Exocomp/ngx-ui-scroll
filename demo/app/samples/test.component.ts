import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { Datasource } from '../../../public_api'; // from 'ngx-ui-scroll';

const MAX = 500;
const MIN = -10000;

@Component({
  selector: 'app-samples-test-inner',
  template: '<b><ng-content></ng-content></b>'
})
export class TestInnerComponent {

  constructor() {
  }
}

@Component({
  selector: 'app-samples-test',
  templateUrl: './test.component.html'
})
export class TestComponent {

  reloadIndex = 1;
  readonly data: Array<any>;

  constructor() {
    this.data = [];
    for (let i = 0; i <= MAX - MIN; i++) {
      this.data.push({
        id: i + MIN,
        text: 'item #' + (i + MIN)
      });
    }
  }

  datasource = new Datasource({
    get: (index: number, count: number) =>
      this.fetchData(index, count)
    ,
    settings: {
      bufferSize: 20,
      minIndex: MIN,
      itemSize: 40
    },
    devSettings: {
      debug: true
    }
  });

  doReload() {
    // this.data.forEach(item => item.text += '+');
    this.datasource.adapter.reload(this.reloadIndex);
  }

  fetchData(index: number, count: number): Observable<Array<any>> {
    const data: Array<any> = [];
    const start = Math.max(MIN, index);
    const end = Math.min(MAX, index + count - 1);
    if (start <= end) {
      for (let i = start; i <= end; i++) {
        data.push(this.data[i - MIN]);
      }
    }
    return Observable.create((observer: Observer<any>) => {
      // setTimeout(() => observer.next(data), 500);
      observer.next(data);
    });
  }
}
