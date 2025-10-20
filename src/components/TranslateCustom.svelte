<script module>
  import { writable } from "svelte/store";
  export const viewWidget = writable(false);
</script>
<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import _ from "lodash";
  import { cn } from "~/lib/utils";
  
  const languages = [
    { value: "ko", label: "🇰🇷 한국어" },
    { value: "en", label: "🇺🇸 English" },
    { value: "ja", label: "🇯🇵 日本語" },
    { value: "zh-CN", label: "🇨🇳 中文" },
  ]


  onMount(() => {
    console.log("onMount TranslateCustom");
    if (typeof window === "undefined") return;

    (window as any).googleTranslateElementInit = () => {
      new (window as any).google.translate.TranslateElement(
        {
          pageLanguage: "ko",
          includedLanguages: _.map(languages, "value").join(","),
          autoDisplay: false
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);
  });

  

  let language = $state(document.documentElement.lang || "ko");
  let observer: MutationObserver | null = null;
  const triggerContent = $derived(
    languages.find((f) => f.value === language)?.label ?? "Select a language"
  );

  function setLanguage(lang) {
    console.log(lang);
    language = lang;
    const select:any = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  }

  
  onMount(() => {
    // 1. 감시할 HTML 요소 (<html> 태그)를 가져옵니다.
    const htmlElement = document.documentElement;

    // 2. 콜백 함수 정의: 속성(Attributes)이 변경될 때 실행됩니다.
    const callback = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        // 변경된 것이 '속성(attribute)'인지, 그리고 그 속성이 'lang'인지 확인합니다.
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
          // 변경된 새 값을 가져와 Svelte 상태를 업데이트합니다.
          const newLang = htmlElement.lang;
          if (newLang) {
            language = newLang;
            viewWidget.set(true);
            console.log('Google 번역 위젯에 의해 lang 속성이 변경되었습니다:', language);
          }
        }
      }
    };

    // 3. MutationObserver 인스턴스 생성
    observer = new MutationObserver(callback);

    // 4. 감시 시작: <html> 태그의 속성(attributes) 변경만 감시하도록 설정합니다.
    const config = { attributes: true, subtree: false, childList: false };
    observer.observe(htmlElement, config);
  });
  
  // 5. 컴포넌트 파괴 시 감시 중지 (매우 중요!)
  onDestroy(() => {
    if (observer) {
      observer.disconnect();
    }
  });
</script>

<!-- 숨김 영역 -->
<div id="google_translate_element" style="display: none;"></div>

<div class={cn("relative top-0 right-0 z-50 ", {
  // "top-10": $viewWidget,
})}>
<Select.Root type="single" onValueChange={(value) => setLanguage(value)} bind:value={language} >
  <Select.Trigger class="w-[120px] notranslate bg-white">{triggerContent}</Select.Trigger>
  <Select.Content class="">
    <Select.Group>
      <!-- <Select.Label class="">언어</Select.Label> -->
      <Select.Item value="ko" class="notranslate font-[family-name:var(--font-normal-kr)]">🇰🇷 한국어</Select.Item>
      <Select.Item value="en" class="notranslate font-[family-name:var(--font-normal-en)]">🇺🇸 English</Select.Item>
      <Select.Item value="ja" class="notranslate font-[family-name:var(--font-normal-ja)]">🇯🇵 日本語</Select.Item>
      <Select.Item value="zh-CN" class="notranslate font-[family-name:var(--font-normal-zh-CN)]">🇨🇳 中文</Select.Item>
    </Select.Group>

  </Select.Content>
</Select.Root>
</div>

<!-- 내가 만든 커스텀 버튼 -->
<!-- <div class="lang-buttons font-basic fixed top-0 right-0">
  <button onclick={() => setLanguage("ko")}>🇰🇷 한국어</button>
  <button onclick={() => setLanguage("en")}>🇺🇸 English</button>
  <button onclick={() => setLanguage("ja")}>🇯🇵 日本語</button>
  <button onclick={() => setLanguage("zh-CN")}>🇨🇳 中文</button>
</div> -->
