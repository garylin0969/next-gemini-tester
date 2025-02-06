'use client';

import { useState, useRef, useEffect } from 'react';
import { ChatInput } from './chat-input';
import { ChatMessage } from './chat-message';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useMutation } from '@tanstack/react-query';
import { ModelType } from './model-select';
import { cn } from '@/lib/utils';

interface ChatRoomProps {
    token: string;
    model: ModelType;
}

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function ChatRoom({ token, model }: ChatRoomProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const genAI = new GoogleGenerativeAI(token);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const generateResponse = async (content: string) => {
        const modelInstance = genAI.getGenerativeModel({ model });
        const result = await modelInstance.generateContent(content);
        const response = await result.response;
        return response.text();
    };

    const mutation = useMutation({
        mutationFn: generateResponse,
        onMutate: (content) => {
            // 立即添加用戶消息
            setMessages((prev) => [...prev, { role: 'user', content }]);
            // 添加一個臨時的助手消息
            setMessages((prev) => [...prev, { role: 'assistant', content: 'Thinking...' }]);
        },
        onSuccess: (response) => {
            // 更新最後一條消息為實際回應
            setMessages((prev) => {
                const newMessages = prev.slice(0, -1); // 移除臨時消息
                return [...newMessages, { role: 'assistant', content: response }];
            });
        },
        onError: (error) => {
            console.error('Error:', error);
            setMessages((prev) => {
                const newMessages = prev.slice(0, -1); // 移除臨時消息
                return [
                    ...newMessages,
                    {
                        role: 'assistant',
                        content: 'Sorry, there was an error processing your request.',
                    },
                ];
            });
        },
    });

    const handleSendMessage = (content: string) => {
        mutation.mutate(content);
    };

    return (
        <div
            className={cn(
                'flex flex-col h-full border border-slate-600 rounded-lg bg-slate-800/50 shadow-lg overflow-hidden'
            )}
        >
            <div className={cn('flex-1 overflow-y-auto space-y-4 p-4 min-h-0')}>
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message} />
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className={cn('p-4 border-t border-slate-600 bg-slate-800')}>
                <ChatInput onSendMessage={handleSendMessage} disabled={!token || mutation.isPending} />
            </div>
        </div>
    );
}
