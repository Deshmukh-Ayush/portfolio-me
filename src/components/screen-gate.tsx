"use client";

import { useEffect, useState } from "react";

export default function ScreenGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 768); // You can change 768px to your breakpoint
    };

    // Run once on mount
    checkScreenSize();

    // Listen for window resize
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (isSmallScreen) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-black">
        <p className="text-sm font-extralight">work in progress</p>
        <p className="text-sm font-light">work in progress</p>
        <p className="text-sm">work in progress</p>
        <p className="text-sm font-semibold">work in progress</p>
        <p className="text-sm font-bold">work in progress</p>

        <div className="absolute bottom-0">
          <p className="text-sm">
            Please visit this in laptop or desktop. This will be live in few
            days.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
