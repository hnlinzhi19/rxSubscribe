// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import "core-js/fn/array.find"
// ...
import { isFunction, isObject } from './util'

interface SubscriberInterface {
  next: Function
  complete?: Function
  error?: Function
}
interface AllInterface {
  nextCb: Function[]
  completeCb?: Function | null
  errorCb?: Function | null
}
interface FuncInterface {
  (obj: SubscriberInterface): void
}

const subscriber = (obj: SubscriberInterface): AllInterface => {
  let objCb: AllInterface = {
    nextCb: []
  }
  if (isObject(obj) && isFunction(obj.next)) {
    objCb.nextCb.push(obj.next)
  }
  if (isObject(obj) && isFunction(obj.complete)) {
    objCb.completeCb = obj.complete
  }
  if (isObject(obj) && isFunction(obj.error)) {
    objCb.errorCb = obj.complete
  }
  return objCb
  // run();
}
const observable = (func: FuncInterface) => {
  return (obj: SubscriberInterface) => {
    let objCb: AllInterface = subscriber(obj)

    const clearAll = () => {
      objCb.errorCb = null
      objCb.completeCb = null
      objCb.nextCb = []
    }
    func({
      next: (data: any) => {
        objCb.nextCb.forEach(item => {
          item(data)
        })
      },
      complete: (data: any) => {
        objCb.completeCb && objCb.completeCb(data)
        clearAll()
      },
      error: (data: any) => {
        objCb.errorCb && objCb.errorCb(data)
        clearAll()
      }
    })
  }
}

export default observable
