/// <reference path="./Object.d.ts" />

var until = {
    isArray:function(arr:any[]){
      return arr instanceof Array;
    },
    isFunction:function(func:()=>any){
      return func instanceof Function;
    },
    isNumber:function(n:number){
      return typeof n === 'number' || n instanceof Number;
    },
    isString:function(s:string){
      return typeof s === 'string' || s instanceof String;
    },
    isJson:function(json:object){
      return json.toString() === '[object Object]';
    },
    cloneArray:function(arr:any[]){
      if(!this.isArray(arr)) return arr;
      var newArray:any[] = [];
      arr.forEach(function(item,index){
        newArray[index] = item;
      });
      return newArray;
    },
    cloneJson:function(json){
      if(!this.isJson(json)) return json;

      interface Output{
          [key:string]:string
      }
      var output:Output = {}
      for(var n in json){
        if(this.isJson(json[n])){
          output[n] = this.cloneJson(json[n]);
          continue;
        }
        if(this.isArray(json[n])){
          output[n] = this.cloneArray(json[n]);
          continue;
        }
        output[n] = json[n];
      }
      return output;
    }
  }
Object.prototype.clone = function(o:object):object{
    return until.cloneJson(o)
}
Object.prototype.merge = function(...items:object[]):object{
    
}