'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface ChatInputProps {
    onSendMessage: (content: string) => void;
    disabled: boolean;
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Textarea
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={disabled}
                className={cn(
                    'flex-1 bg-slate-800 border-slate-600 focus:border-slate-400 min-h-[44px] max-h-32 resize-none'
                )}
            />
            <Button
                type="submit"
                disabled={disabled}
                className={cn('bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600')}
            >
                Send
            </Button>
        </form>
    );
}
