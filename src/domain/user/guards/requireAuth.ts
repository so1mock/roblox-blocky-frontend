import { redirect } from "@tanstack/react-router";
import { useAuthStore } from "@user/stores/authStore";

// selector 구독 기반 대기: true면 resolve, false면 reject, timeout시 reject
const waitForAuthBySubscribe = (timeoutMs = 3000) =>
  new Promise<void>((resolve, reject) => {
    let done = false;
    const timer = setTimeout(() => {
      if (done) return;
      done = true;
      unsub();
      alert("timeout");
      reject(new Error("timeout"));
    }, timeoutMs);

    const unsub = useAuthStore.subscribe(
      (s) => s.isLogin,
      (cur) => {
        if (done) return;
        if (cur === true) {
          done = true;
          clearTimeout(timer);
          unsub();
          resolve();
        } else if (cur === false) {
          done = true;
          clearTimeout(timer);
          unsub();
          alert("unauth");
          reject(new Error("unauth"));
        }
      },
      { fireImmediately: true }, // 현재 상태도 즉시 평가
    );
  });

export const requireAuth = async () => {
  try {
    await waitForAuthBySubscribe(3000);
    // 통과(로그인 확정)
    return;
  } catch {
    // 비인증/타임아웃 → 원하는 목적지로 리다이렉트
    throw redirect({ to: "/", search: { redirect: window.location.pathname } });
  }
};
