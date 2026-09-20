import React, { useState, useRef, useEffect } from 'react';
import { Shield, Send, Sparkles, Copy, CheckCircle2, User, Bot, AlertTriangle, Scale } from 'lucide-react';
import { ChatMessage } from '../types';

interface AdvocateChatProps {
  onSaveToAuditLog?: (draft: string, title: string) => void;
}

export const AdvocateChat: React.FC<AdvocateChatProps> = ({ onSaveToAuditLog }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `I am **ParentShield**, your AI Legal Advocate and Case Buffer for interactions with Texas DFPS (CPS).

My core mission is to preserve your parental rights under the **U.S. Constitution (4th & 14th Amendments)** and the **Texas Family Code**:
- **TFC § 261.307 (HB 730):** Required verbal and written notice of rights (counsel, recording, entry refusal, drug test refusal). If required notices are missing, information obtained may be **inadmissible in civil proceedings**—not a criminal bar or automatic win.
- **TFC § 261.303:** Refusing warrantless home entry is generally protected absent a court order or recognized exception. DFPS may petition for an "Order in Aid of Investigation" signed by a judge.
- **TFC § 262.201 & § 263.401:** Generally applicable 14-day adversary hearing and 1-year dismissal deadlines (subject to statutory exceptions, including a possible 180-day extension).

**How can I protect your case right now?** You can paste what the caseworker said, ask about your rights, or have me draft a formal response.`,
      timestamp: new Date().toISOString(),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Worker demands to interview my child at school alone",
    "They threatened to take my kids if I refuse a drug test",
    "Worker wants me to sign a 'Safety Plan' (PCSP) tonight",
    "How does the TFC § 261.307 exclusionary bar protect me?",
    "Draft a post-phone-call confirmation email for today",
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const content = (textToSend || input).trim();
    if (!content || loading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/advocate/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: data.reply || 'I am here to protect your parental rights. Please describe the caseworker demand.',
        timestamp: new Date().toISOString(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          content: 'An error occurred contacting ParentShield. Under Texas Family Code § 261.303 and the 4th Amendment, you retain the lawful right to refuse warrantless administrative entry and demand all inquiries in writing.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="flex flex-col h-[740px] bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
      {/* Top Banner */}
      <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              ParentShield AI Advocate
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono">
                ACTIVE BUFFER
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              U.S. Const. Amends. IV & XIV &bull; TFC § 261.307 HB 730 &bull; TFC § 261.303
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-400">
          <Scale className="w-3.5 h-3.5 text-amber-400" />
          <span>Radical De-escalation & Legal Neutrality</span>
        </div>
      </div>

      {/* Quick Prompts Bar */}
      <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Quick Triage:
        </span>
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition-colors cursor-pointer shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-xl p-4 text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-amber-500 text-slate-950 font-medium ml-8'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 mr-8'
                }`}
              >
                {/* Text render */}
                <div className="whitespace-pre-wrap font-sans space-y-2">
                  {msg.content}
                </div>

                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px] text-slate-400">
                    <span className="font-serif italic">
                      ParentShield Case Buffer
                    </span>
                    <button
                      onClick={() => handleCopyMessage(msg.id, msg.content)}
                      className="inline-flex items-center gap-1 text-slate-400 hover:text-white cursor-pointer px-2 py-0.5 rounded hover:bg-slate-800 transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Response</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-400 flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
              <span>Analyzing against Texas Family Code & constitutional authorities...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Grounded Disclaimer Banner */}
      <div className="bg-slate-950 px-4 py-1.5 border-t border-slate-800 text-[11px] text-slate-400 text-center">
        ParentShield is a parental-support tool that provides legal information, documentation, and communication drafting—not formal legal counsel or representation. Outcomes depend on your facts and court orders. Consult a licensed Texas family law attorney for active litigation or court deadlines.
      </div>

      {/* Input Field */}
      <div className="bg-slate-950 p-4 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type caseworker statements, requests, or questions regarding Texas DFPS..."
            disabled={loading}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold transition-colors shadow-sm cursor-pointer shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
