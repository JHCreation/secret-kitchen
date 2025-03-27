import { generateShortId } from "./uid";

export async function subscribeToNotifications() {
  console.log('서비스 워커 등록!')
  try {
    // 서비스 워커 등록
    const registration = await navigator.serviceWorker.register(
      '/service-worker.js', 
      // { updateViaCache: "none" }
    );
    
    // 푸시 구독
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY // VAPID 공개키
    });
    // console.log(crypto.randomUUID(), generateShortId(16))
    // return
    // 서버에 구독 정보 전송
    const res= await fetch(`${import.meta.env.VITE_WEBPUSH_URL}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: generateShortId(16),
        subscription: JSON.stringify(subscription)
      })
    });
    console.log(res, JSON.stringify(subscription), subscription)

    return subscription;
  } catch (error) {
    console.error('Failed to subscribe:', error);
    throw error;
  }
}