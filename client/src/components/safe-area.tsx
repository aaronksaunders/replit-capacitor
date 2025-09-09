import React, { useEffect } from "react";
import { SafeArea } from "@capacitor-community/safe-area";
import { Capacitor } from "@capacitor/core";

/**
 * SafeArea component that handles safe area insets for mobile devices
 * This ensures the UI doesn't overlap with system elements like the notch or status bar
 */
export const SafeAreaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    // Only run on native platforms
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    // Set up safe area listener
    const setupSafeArea = async () => {
      try {
        // Get initial safe area insets
        const { insets } = await SafeArea.getSafeAreaInsets();

        // Apply CSS variables for safe area insets
        document.documentElement.style.setProperty(
          "--safe-area-inset-top",
          `${insets.top}px`
        );
        document.documentElement.style.setProperty(
          "--safe-area-inset-bottom",
          `${insets.bottom}px`
        );
        document.documentElement.style.setProperty(
          "--safe-area-inset-left",
          `${insets.left}px`
        );
        document.documentElement.style.setProperty(
          "--safe-area-inset-right",
          `${insets.right}px`
        );

        // Listen for safe area changes (e.g., orientation changes)
        const listener = await SafeArea.addListener(
          "safeAreaChanged",
          ({ insets }) => {
            document.documentElement.style.setProperty(
              "--safe-area-inset-top",
              `${insets.top}px`
            );
            document.documentElement.style.setProperty(
              "--safe-area-inset-bottom",
              `${insets.bottom}px`
            );
            document.documentElement.style.setProperty(
              "--safe-area-inset-left",
              `${insets.left}px`
            );
            document.documentElement.style.setProperty(
              "--safe-area-inset-right",
              `${insets.right}px`
            );
          }
        );

        // Cleanup function
        return () => {
          listener.remove();
        };
      } catch (error) {
        console.warn("Safe Area plugin not available:", error);
      }
    };

    const cleanup = setupSafeArea();

    return () => {
      cleanup.then((cleanupFn) => cleanupFn?.());
    };
  }, []);

  return <>{children}</>;
};

/**
 * Hook to get safe area insets
 */
export const useSafeAreaInsets = () => {
  const [insets, setInsets] = React.useState({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) {
      return;
    }

    const getInsets = async () => {
      try {
        const { insets } = await SafeArea.getSafeAreaInsets();
        setInsets(insets);
      } catch (error) {
        console.warn("Failed to get safe area insets:", error);
      }
    };

    getInsets();
  }, []);

  return insets;
};
