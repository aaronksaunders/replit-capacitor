import { CheckCircle, AlertTriangle, Info, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface StatusDisplayProps {
  message: {
    type: 'success' | 'error' | 'info';
    message: string;
  } | null;
  isLoading: boolean;
  onClear: () => void;
}

export default function StatusDisplay({ message, isLoading, onClear }: StatusDisplayProps) {
  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-600" />;
      default:
        return null;
    }
  };

  const getMessageStyles = (type: string) => {
    switch (type) {
      case 'success':
        return "bg-green-50 border-green-200 text-green-800";
      case 'error':
        return "bg-red-50 border-red-200 text-red-800";
      case 'info':
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "";
    }
  };

  return (
    <Card className="mb-6" data-testid="card-status-display">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-card-foreground">Status Messages</h3>
          {message && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClear}
              className="text-muted-foreground hover:text-foreground"
              data-testid="button-clear-status"
            >
              Clear
            </Button>
          )}
        </div>
        
        <div className="min-h-[120px]">
          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center space-x-3 p-8" data-testid="display-loading-state">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <span className="text-muted-foreground">Processing request...</span>
            </div>
          )}

          {/* Status Messages */}
          {!isLoading && message && (
            <div className={`p-4 rounded-md border ${getMessageStyles(message.type)}`} data-testid={`display-${message.type}-message`}>
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {getMessageIcon(message.type)}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-medium capitalize">
                    {message.type}
                  </h4>
                  <p className="text-sm mt-1" data-testid="text-status-message">
                    {message.message}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Default State */}
          {!isLoading && !message && (
            <div className="flex flex-col items-center justify-center space-y-3 p-8 text-center" data-testid="display-default-state">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                API responses and status messages will appear here
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
