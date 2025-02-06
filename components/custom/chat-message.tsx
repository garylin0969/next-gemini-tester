import { cn } from '@/lib/utils';

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
}

interface ChatMessageProps {
    message: ChatMessage;
}

export function ChatMessage({ message }: ChatMessageProps) {
    return (
        <div className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}>
            <div
                className={cn(
                    'max-w-[80%] rounded-lg p-3',
                    message.role === 'user'
                        ? 'bg-blue-600 text-slate-50'
                        : 'bg-slate-700 text-slate-50 border border-slate-600'
                )}
            >
                <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
        </div>
    );
}
