interface SubscriberInterface {
    next: Function;
    complete?: Function;
    error?: Function;
}
interface FuncInterface {
    (obj: SubscriberInterface): void;
}
declare const observable: (func: FuncInterface) => {
    subscriber: (obj: SubscriberInterface) => void;
};
export default observable;
