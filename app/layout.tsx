import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
    title: 'Gemini API Tester',
    description: 'Gemini API Tester',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className="bg-slate-900 text-slate-50">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
