  const test = new observable(function(subscribe){
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
    test.subscribe({
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
