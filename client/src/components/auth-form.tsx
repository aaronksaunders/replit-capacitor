import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, UserPlus, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { storeToken } from "@/lib/auth";
import { API_CONFIG } from "@/lib/config";

interface AuthFormProps {
  onSuccess: (user: { email: string }) => void;
  onStatusChange: (status: { type: 'success' | 'error' | 'info'; message: string } | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export default function AuthForm({ onSuccess, onStatusChange, isLoading, setIsLoading }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (isRegister: boolean) => {
    if (!email || !password) {
      onStatusChange({
        type: 'error',
        message: 'Please enter both email and password'
      });
      return;
    }

    if (password.length < 6) {
      onStatusChange({
        type: 'error',
        message: 'Password must be at least 6 characters long'
      });
      return;
    }

    setIsLoading(true);
    onStatusChange(null);

    try {
      const endpoint = isRegister ? '/api/register' : '/api/login';
      const apiUrl = API_CONFIG.getApiUrl(endpoint);
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (isRegister) {
          onStatusChange({
            type: 'success',
            message: 'Account created successfully! You can now log in.'
          });
          setPassword("");
        } else {
          // Store JWT token
          await storeToken(data.token);
          onSuccess(data.user);
          setEmail("");
          setPassword("");
        }
      } else {
        onStatusChange({
          type: 'error',
          message: data.message || `${isRegister ? 'Registration' : 'Login'} failed`
        });
      }
    } catch (error) {
      onStatusChange({
        type: 'error',
        message: 'Network error occurred. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6" data-testid="card-auth-form">
      <CardContent className="pt-6">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Email Input */}
          <div className="space-y-2 mb-4">
            <Label htmlFor="email" className="text-sm font-medium text-card-foreground">
              Email Address
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-11 pr-4 py-3 text-base"
                placeholder="Enter your email"
                required
                data-testid="input-email"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2 mb-6">
            <Label htmlFor="password" className="text-sm font-medium text-card-foreground">
              Password
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-muted-foreground" />
              </div>
              <Input 
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-11 pr-12 py-3 text-base"
                placeholder="Enter your password"
                required
                minLength={6}
                data-testid="input-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute inset-y-0 right-0 pr-3 flex items-center h-full"
                onClick={() => setShowPassword(!showPassword)}
                data-testid="button-toggle-password"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Minimum 6 characters required</p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={() => handleSubmit(false)}
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3 text-base"
              data-testid="button-login"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <LogIn className="w-4 h-4 mr-2" />
              )}
              Sign In
            </Button>

            <Button 
              onClick={() => handleSubmit(true)}
              disabled={isLoading}
              variant="secondary"
              className="w-full font-medium py-3 text-base"
              data-testid="button-register"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Create Account
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
