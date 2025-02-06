'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

export const GEMINI_MODELS = {
    'gemini-2.0-flash-001': 'Gemini 2.0 Flash',
    'gemini-2.0-flash-lite-preview-02-05': 'Gemini 2.0 Flash Lite',
    'gemini-1.5-flash': 'Gemini 1.5 Flash',
    'gemini-1.5-flash-8b': 'Gemini 1.5 Flash 8B',
    'gemini-1.5-pro': 'Gemini 1.5 Pro',
} as const;

export type ModelType = keyof typeof GEMINI_MODELS;

interface ModelSelectProps {
    value: ModelType;
    onChange: (value: ModelType) => void;
    disabled?: boolean;
}

export function ModelSelect({ value, onChange, disabled }: ModelSelectProps) {
    return (
        <Select value={value} onValueChange={(value) => onChange(value as ModelType)} disabled={disabled}>
            <SelectTrigger className={cn('bg-slate-800 border-slate-600 focus:border-slate-400')}>
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
                {Object.entries(GEMINI_MODELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                        {label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
