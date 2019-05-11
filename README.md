## 纯函数好用一点

```
const test = observable(function(subscribe){
      subscribe.next(1231);

      setTimeout(() => {
        subscribe.next(654);
      }, 5000);

      setTimeout(() => {
        subscribe.complete();
      }, 2110);
      setTimeout(() => {
        subscribe.error();
      }, 2200);
    });
    test.subscriber({
      next:function (res) {
        console.log(res,'tes')
      },
      complete: function(){
        console.log('testese complete')
      },
      error: function(){
        console.log('error compotet')
      }
    })
```
