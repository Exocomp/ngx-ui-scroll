import { BehaviorSubject, Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { VALIDATORS } from './validation';
import {
  AdapterPropType as Prop,
  IAdapterProp,
  ItemAdapter,
  IAdapter,
  IAdapterMethodParam as IParam,
  ValidatorType
} from '../interfaces/index';

export const itemAdapterEmpty = <ItemAdapter>{
  data: {},
  element: {}
};

const noop = () => null;

export const ADAPTER_PROPS: IAdapterProp[] = [
  {
    type: Prop.Scalar,
    name: 'version',
    value: ''
  },
  {
    type: Prop.Scalar,
    name: 'isLoading',
    value: false
  },
  {
    type: Prop.Scalar,
    name: 'loopPending',
    value: false
  },
  {
    type: Prop.Scalar,
    name: 'cyclePending',
    value: false
  },
  {
    type: Prop.Scalar,
    name: 'firstVisible',
    value: itemAdapterEmpty
  },
  {
    type: Prop.Scalar,
    name: 'lastVisible',
    value: itemAdapterEmpty
  },
  {
    type: Prop.Scalar,
    name: 'itemsCount',
    value: 0
  },
  {
    type: Prop.Scalar,
    name: 'bof',
    value: false
  },
  {
    type: Prop.Scalar,
    name: 'eof',
    value: false
  },
  {
    type: Prop.Function,
    name: 'reload',
    value: noop
  },
  {
    type: Prop.Function,
    name: 'append',
    value: noop
  },
  {
    type: Prop.Function,
    name: 'prepend',
    value: noop
  },
  {
    type: Prop.Function,
    name: 'check',
    value: noop
  },
  {
    type: Prop.Function,
    name: 'remove',
    value: noop
  },
  {
    type: Prop.Function,
    name: 'clip',
    value: noop
  },
  {
    type: Prop.Function,
    name: 'insert',
    value: noop
  },
  {
    type: Prop.Function,
    name: 'showLog',
    value: noop
  },
  {
    type: Prop.Function,
    name: 'fix',
    value: noop
  },
  {
    type: Prop.Observable,
    name: 'isLoading$',
    value: new Subject<boolean>()
  },
  {
    type: Prop.Observable,
    name: 'loopPending$',
    value: new Subject<boolean>()
  },
  {
    type: Prop.Observable,
    name: 'cyclePending$',
    value: new Subject<boolean>()
  },
  {
    type: Prop.Observable,
    name: 'firstVisible$',
    value: new BehaviorSubject<ItemAdapter>(itemAdapterEmpty)
  },
  {
    type: Prop.Observable,
    name: 'lastVisible$',
    value: new BehaviorSubject<ItemAdapter>(itemAdapterEmpty)
  },
  {
    type: Prop.Observable,
    name: 'bof$',
    value: new Subject<boolean>()
  },
  {
    type: Prop.Observable,
    name: 'eof$',
    value: new Subject<boolean>()
  }
];

interface AdapterMethodParams {
  [key: string]: IParam;
}

interface AdapterMethods {
  [key: string]: AdapterMethodParams;
}

const { INTEGER_UNLIMITED, BOOLEAN, ITERATOR_CALLBACK, ONE_OF } = VALIDATORS;

const FIX_METHOD_PARAMS: AdapterMethodParams = {
  scrollPosition: {
    name: 'scrollPosition',
    validators: [INTEGER_UNLIMITED]
  },
  minIndex: {
    name: 'minIndex',
    validators: [INTEGER_UNLIMITED]
  },
  maxIndex: {
    name: 'maxIndex',
    validators: [INTEGER_UNLIMITED]
  },
  updater: {
    name: 'updater',
    validators: [ITERATOR_CALLBACK]
  }
};

const INSERT_METHOD_PARAMS: AdapterMethodParams = {
  before: {
    name: 'before',
    validators: [ITERATOR_CALLBACK, ONE_OF(['after'])]
  },
  after: {
    name: 'after',
    validators: [ITERATOR_CALLBACK, ONE_OF(['before'])]
  },
  decrease: {
    name: 'decrease',
    validators: [BOOLEAN]
  }
};

export const ADAPTER_METHODS_PARAMS: AdapterMethods = {
  FIX: FIX_METHOD_PARAMS,
  INSERT: INSERT_METHOD_PARAMS
};
