"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "./components/ui/loading";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 메인 페이지 접근 시 로그인 페이지로 리다이렉트
    router.push("/login");
  }, [router]);

  return <Loading fullScreen />;
}
