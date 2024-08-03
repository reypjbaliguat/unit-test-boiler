"use client";

import LoginForm from "@/components/LoginForm";

export default function Home() {
  const login = () => {
    console.log("login");
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LoginForm onLogin={login} />
    </main>
  );
}
