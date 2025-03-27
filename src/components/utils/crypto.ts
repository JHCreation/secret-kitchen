export async function verifyJWT(token, secretKey) {
  try {
    const [headerB64, payloadB64, signatureB64] = token.split(".");
    if (!headerB64 || !payloadB64 || !signatureB64) {
      throw new Error("잘못된 JWT 형식입니다.");
    }

    // 🔹 Base64URL → Uint8Array 변환 함수
    function base64UrlToUint8Array(base64Url) {
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const binaryString = atob(base64);
      const uint8Array = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8Array[i] = binaryString.charCodeAt(i);
      }
      return uint8Array;
    }

    // 🔹 HMAC-SHA256 서명을 생성하는 키 가져오기
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(secretKey),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // 🔹 JWT의 서명을 검증
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      base64UrlToUint8Array(signatureB64),
      new TextEncoder().encode(`${headerB64}.${payloadB64}`)
    );

    if (isValid) {
      console.log("✅ JWT 검증 성공!");
      return JSON.parse(atob(payloadB64)); // 디코딩한 페이로드 반환
    } else {
      throw new Error("❌ JWT 검증 실패! 위조된 토큰일 수 있습니다.");
    }
  } catch (error) {
    console.error("JWT 검증 오류:", error.message);
    return null;
  }
}





export async function createJWT(payload, secretKey) {
  // 1️⃣ 헤더(Header) 생성 (alg: HMAC-SHA256, typ: JWT)
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  // 2️⃣ Base64URL 인코딩 함수 (공백 없는 Base64)
  function base64UrlEncode(obj) {
    return btoa(JSON.stringify(obj))
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }

  // 3️⃣ Base64URL로 변환된 Header와 Payload 생성
  const headerB64 = base64UrlEncode(header);
  const payloadB64 = base64UrlEncode(payload);
  const dataToSign = `${headerB64}.${payloadB64}`;

  // 4️⃣ Web Crypto API를 사용하여 HMAC-SHA256 서명 생성
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secretKey),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(dataToSign)
  );

  // 5️⃣ 서명을 Base64URL로 변환
  function base64UrlFromArrayBuffer(buffer) {
    const binary = String.fromCharCode(...new Uint8Array(buffer));
    return btoa(binary)
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  }

  const signatureB64 = base64UrlFromArrayBuffer(signature);

  // ✅ 최종 JWT 반환
  return `${headerB64}.${payloadB64}.${signatureB64}`;
}



export async function generateSecretKey() {
  // 🔹 1️⃣ HMAC-SHA256 키 생성
  const key = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-256" }, // HMAC-SHA256 알고리즘 사용
    true, // key를 내보낼(exportable) 수 있도록 설정
    ["sign", "verify"] // 서명(sign)과 검증(verify) 용도로 사용
  );

  // 🔹 2️⃣ 키를 Base64로 변환하여 출력 (브라우저에서 사용하기 편리하게)
  const rawKey = await crypto.subtle.exportKey("raw", key);
  const base64Key = btoa(String.fromCharCode(...new Uint8Array(rawKey)))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  console.log("✅ 생성된 Secret Key:", base64Key);
  return base64Key;
}

