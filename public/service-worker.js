

self.addEventListener('push', (event) => {
  console.log('푸시 이벤트 발생(사운드):', event);
  const data = event.data.json();
  console.log('data', event.data, data)
  // const title= '주문요청'
  const { title, tid, prod, total  }= data
  
  const cont= prod.map(item=>
    `[${item.key}] ${item.name} ${item.price}원 - ${item.qty}개`
  )
  cont.push(`금액: ${total}원`)
  console.log(cont, cont.join(',\n'))
  
  event.waitUntil(
    self.registration.showNotification(`${tid}번${title}`, {
      // body: `${data[0].key}\n${data[0].name}\n${data[0].price}\n`,
      body: cont.join(',\n'),
      icon: '/img/logo/logo.svg',
      // 추가 옵션들...
      data: {
        url: `http://localhost:5173/menus?tid=${tid}`
      },
    })
  );
  
});


self.addEventListener('notificationclick', function(event) {
  console.log('notificationclick', event,)
  const clickAction = event.notification.data.url;
  // console.log(clickAction)
  // return;
  if (clickAction) {
    event.notification.close();
    event.waitUntil(clients.openWindow(clickAction));
  }
});