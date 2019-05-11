interface SubscriberInterface {
    next: Function;
    complete?: Function;
    error?: Function;
}
declare const observable: (func: Function) => {
    subscriber: (obj: SubscriberInterface) => void;
};
export default observable;
