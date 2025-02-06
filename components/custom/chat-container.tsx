'use client';

import { useState } from 'react';
import { TokenInput } from './token-input';
import { ChatRoom } from './chat-room';
import { ModelSelect, ModelType } from './model-select';
import { Button } from '@/components/ui/button';

export function ChatContainer() {
    const [token, setToken] = useState('');
    const [model, setModel] = useState<ModelType>('gemini-1.5-flash');

    const handleReset = () => {
        setToken('');
        setModel('gemini-1.5-flash');
    };

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
            <h1 className="text-2xl font-bold text-center text-slate-50">Gemini API Tester</h1>
            <div className="flex flex-col gap-4">
                <div className="flex gap-2">
                    <div className="flex-1">
                        <TokenInput onTokenSubmit={setToken} />
                    </div>
                    <Button onClick={handleReset} variant="destructive" className="bg-red-600 hover:bg-red-700">
                        Reset
                    </Button>
                </div>
                <ModelSelect value={model} onChange={setModel} disabled={!token} />
            </div>
            <div className="w-full h-[60vh] sm:h-[600px]">
                <ChatRoom token={token} model={model} />
            </div>
        </div>
    );
}
