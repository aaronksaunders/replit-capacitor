import { useState, useEffect } from "react";
import { Shield, ShieldCheck, User, Smartphone } from "lucide-react";
import AuthForm from "@/components/auth-form";
import StatusDisplay from "@/components/status-display";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getStoredToken, removeStoredToken, isTokenValid } from "@/lib/auth";

export default function AuthPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing token on mount
  useEffect(() => {
    const token = getStoredToken();
    if (token && isTokenValid(token)) {
      // Decode token to get user email
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUserEmail(payload.email);
        setIsAuthenticated(true);
      } catch (error) {
        removeStoredToken();
      }
    }
  }, []);

  const handleAuthSuccess = (user: { email: string }) => {
    setIsAuthenticated(true);
    setUserEmail(user.email);
    setStatusMessage({
      type: 'success',
      message: 'Authentication successful! JWT token stored securely.'
    });
  };

  const handleLogout = () => {
    removeStoredToken();
    setIsAuthenticated(false);
    setUserEmail(null);
    setStatusMessage({
      type: 'info',
      message: 'Successfully logged out. JWT token cleared from storage.'
    });
  };

  const handleFetchProtectedData = async () => {
    const token = getStoredToken();
    if (!token) {
      setStatusMessage({
        type: 'error',
        message: 'No authentication token found. Please log in first.'
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage({
          type: 'success',
          message: `Protected data retrieved successfully for ${data.user.email}. Server timestamp: ${new Date(data.timestamp).toLocaleString()}`
        });
      } else {
        if (response.status === 401) {
          handleLogout();
        }
        setStatusMessage({
          type: 'error',
          message: data.message || 'Failed to fetch protected data'
        });
      }
    } catch (error) {
      setStatusMessage({
        type: 'error',
        message: 'Network error occurred while fetching protected data'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header Section */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">JWT Auth Demo</h1>
          </div>
          <p className="text-sm text-muted-foreground text-center mt-2">
            Mobile-optimized authentication flow
          </p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <div className="max-w-md mx-auto w-full px-6 py-8 flex-1">
          
          {/* Authentication Status Card */}
          <Card className="mb-6" data-testid="card-auth-status">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-card-foreground">Authentication Status</h2>
                <div className="flex items-center space-x-2" data-testid="indicator-auth-status">
                  <div className={`w-3 h-3 rounded-full ${isAuthenticated ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-sm text-muted-foreground">
                    {isAuthenticated ? 'Authenticated' : 'Not logged in'}
                  </span>
                </div>
              </div>
              
              {/* User Info Display */}
              {isAuthenticated && userEmail && (
                <div className="flex items-center space-x-3 p-3 bg-muted rounded-md" data-testid="display-user-info">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate" data-testid="text-user-email">
                      {userEmail}
                    </p>
                    <p className="text-xs text-muted-foreground">Authenticated user</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Authentication Form */}
          {!isAuthenticated && (
            <AuthForm 
              onSuccess={handleAuthSuccess}
              onStatusChange={setStatusMessage}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          )}

          {/* Protected Actions */}
          <Card className="mb-6" data-testid="card-protected-actions">
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium text-card-foreground mb-4">Protected Actions</h3>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleFetchProtectedData}
                  disabled={!isAuthenticated || isLoading}
                  className="w-full bg-accent hover:bg-accent/80 text-accent-foreground"
                  data-testid="button-fetch-protected"
                >
                  <ShieldCheck className="w-4 h-4 mr-2" />
                  Fetch Protected Data
                </Button>

                <Button 
                  onClick={handleLogout}
                  disabled={!isAuthenticated}
                  variant="destructive"
                  className="w-full"
                  data-testid="button-logout"
                >
                  <User className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Messages */}
          <StatusDisplay 
            message={statusMessage}
            isLoading={isLoading}
            onClear={() => setStatusMessage(null)}
          />

          {/* Development Info */}
          <Card className="bg-muted" data-testid="card-dev-info">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Smartphone className="w-4 h-4 text-muted-foreground mt-0.5" />
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-foreground mb-1">Development Mode</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    This is a JWT authentication demo. CORS is configured for mobile testing. 
                    JWT secret should be stored in Replit Secrets in production.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>JWT Auth Demo</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Ready for mobile testing</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
