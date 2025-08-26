import { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, Zap } from "lucide-react";

interface CountdownTimerProps {
  targetDate?: Date;
  onExpire?: () => void;
}

const CountdownTimer = ({ targetDate, onExpire }: CountdownTimerProps) => {
  // Default to 24 hours from now if no target date provided
  const defaultTarget = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const target = targetDate || defaultTarget;
  
  const [timeLeft, setTimeLeft] = useState(target.getTime() - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = target.getTime() - Date.now();
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        onExpire?.();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [target, onExpire]);

  if (timeLeft <= 0) {
    return (
      <Badge variant="destructive" className="animate-pulse">
        <Zap className="h-3 w-3 mr-1" />
        EXPIRED
      </Badge>
    );
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="flex items-center gap-2">
      <Clock className="h-4 w-4 text-destructive animate-pulse" />
      <Badge variant="destructive" className="font-mono animate-pulse">
        {hours.toString().padStart(2, '0')}:
        {minutes.toString().padStart(2, '0')}:
        {seconds.toString().padStart(2, '0')}
      </Badge>
    </div>
  );
};

export default CountdownTimer;