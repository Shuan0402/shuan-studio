import { useState, useCallback } from 'react';
import { sendChatMessage } from '../../../../api/chat';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useChat = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const easterEggPattern = /never gonna give you up|rick roll|瑞克搖/i;

    if (easterEggPattern.test(input.trim())) {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
        
        setInput('');
        return;
    }

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: '抱歉，我現在遇到一點問題。' }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading]);

  return {
    input,
    setInput,
    messages,
    isLoading,
    handleSend
  };
};