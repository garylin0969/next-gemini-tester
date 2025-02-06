'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TokenInputProps {
    onTokenSubmit: (token: string) => void;
}

export function TokenInput({ onTokenSubmit }: TokenInputProps) {
    const [token, setToken] = useState('');
    const [showToken, setShowToken] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onTokenSubmit(token.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <div className="relative flex-1">
                <Input
                    type={showToken ? 'text' : 'password'}
                    placeholder="Enter your API token"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className={cn('pr-10 bg-slate-800 border-slate-600 focus:border-slate-400')}
                />
                <button
                    type="button"
                    onClick={() => setShowToken(!showToken)}
                    className={cn(
                        'absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-50 text-sm'
                    )}
                >
                    {showToken ? '○' : '⦿'}
                </button>
            </div>
            <Button
                type="submit"
                className={cn('bg-slate-700 hover:bg-slate-600 text-slate-100 border border-slate-600')}
            >
                Set Token
            </Button>
        </form>
    );
}
