export const  getDataType  = (data: any): string =>{
  return Object.prototype.toString.call(data).toLowerCase();
}


export const isFunction = (data: any): boolean => getDataType(data) === '[object function]';
export const isObject = (data: any): boolean => getDataType(data) === '[object object]';
