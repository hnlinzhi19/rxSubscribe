// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { isFunction } from './util'

interface ObserverInterface {
  next: Function
  complete: Function
  error: Function
  nextCb: Function[]
  addNext: Function
  clearNext: Function
}

interface ObserverDataInterface {
  next: Function
  complete?: Function
  error?: Function
  // ? error: Function
}

class Observer implements ObserverInterface {
  nextCb: Function[]
  completeCb: Function | null
  errorCb: Function | null
  constructor() {
    this.nextCb = []
    this.completeCb = null
    this.errorCb = null
  }

  next = (data: any) => {
    // console.log('next', data);
    if (this.nextCb.length) {
      this.nextCb.forEach(item => {
        item(data)
      })
    }
  }

  complete = () => {
    this.completeCb && this.completeCb()
  }

  error = (func: Function, observer: Observer | null) => {
    this.errorCb && this.errorCb()
  }

  addNext = (func: Function) => {
    this.nextCb.push(func)
  }
  clearNext = () => {
    this.nextCb = []
  }
  addComplete = (func: Function, observer: Observer | null) => {
    this.completeCb = () => {
      func()
      this.clearAll();
      observer = null
    }
  }
  addError = (func: Function, observer: Observer | null) => {
    this.errorCb = () => {
      func()
      this.clearAll();
      observer = null
    }
  }
  clearAll = () => {
    this.completeCb = null
    this.errorCb = null
    this.clearNext()
  }
}

class Observable {
  initFunc: Function
  constructor(observFunc: Function) {
    // this.test = subscriber();
    if (!isFunction(observFunc)) {
      throw Error('必须有初始化函数')
    }
    // this.test = new MyTest();
    this.initFunc = (observer: Observer) => {
      observFunc(observer)
    }
    return this
  }
  public subscribe = (subObj: ObserverDataInterface) => {
    let observer: Observer | null = new Observer()

    if (subObj.next && isFunction(subObj.next)) {
      // this.nextCb.push(subObj.next);
      observer.addNext(subObj.next)
    }
    if (subObj.complete && isFunction(subObj.complete)) {
      // this.nextCb.push(subObj.next);
      observer.addComplete(subObj.complete, observer)
    }

    if (subObj.error && isFunction(subObj.error)) {
      // this.nextCb.push(subObj.next);
      observer.addError(subObj.error, observer)
    }
    // this.test.run();
    this.initFunc(observer)
  }
}

export default Observable
