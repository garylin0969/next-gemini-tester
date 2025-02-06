import { ChatContainer } from '@/components/custom/chat-container';

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            <main className="container mx-auto px-4 flex-1 flex items-center">
                <ChatContainer />
            </main>
            <footer className="p-4 text-center text-slate-400">
                <a
                    href="https://github.com/garylin0969"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-slate-50 transition-colors"
                >
                    @garylin0969
                </a>
            </footer>
        </div>
    );
}
