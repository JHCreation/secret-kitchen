export const attemptParse = (country) => {
  let info= country
  try {
    info = JSON.parse(country) // 여기에 실행하려는 코드를 넣습니다
  } catch (e) {

  }
  return info
}

export function getByteSize(str) {
  const encoder = new TextEncoder();
  const encoded = encoder.encode(str);
  return encoded.length;
}


export function getRandomNumber (min, max) {
  return Math.floor(Math.random()*(max-min+1) + min)
}

export function generateShortId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const randomValues = new Uint8Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    result += chars[randomValues[i] % chars.length];
  }
  return result;
}
