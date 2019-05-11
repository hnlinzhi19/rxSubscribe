interface ObserverDataInterface {
    next: Function;
    complete?: Function;
    error?: Function;
}
declare class Observable {
    initFunc: Function;
    constructor(observFunc: Function);
    subscribe: (subObj: ObserverDataInterface) => void;
}
export default Observable;
