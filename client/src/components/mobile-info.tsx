import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

/**
 * Mobile information component that displays device capabilities and Capacitor status
 * This component demonstrates the integration with Capacitor plugins
 */
export const MobileInfo: React.FC = () => {
  const [isNative, setIsNative] = useState(false);
  const [platform, setPlatform] = useState<string>('web');
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // Check if we're running in a native environment
    const checkNativeEnvironment = async () => {
      try {
        // Dynamic import to avoid issues in web environment
        const { Capacitor } = await import('@capacitor/core');
        setIsNative(Capacitor.isNativePlatform());
        setPlatform(Capacitor.getPlatform());
      } catch (error) {
        console.log('Running in web environment');
        setIsNative(false);
        setPlatform('web');
      }
    };

    checkNativeEnvironment();

    // Monitor online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Mobile App Status</CardTitle>
        <CardDescription>
          Capacitor integration information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Platform:</span>
          <Badge variant={isNative ? "default" : "secondary"}>
            {platform}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Environment:</span>
          <Badge variant={isNative ? "default" : "outline"}>
            {isNative ? "Native" : "Web"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Connection:</span>
          <Badge variant={isOnline ? "default" : "destructive"}>
            {isOnline ? "Online" : "Offline"}
          </Badge>
        </div>

        {isNative && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200">
              🎉 Running in native mobile environment!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
