export type ChatLang = "es" | "en";

export interface ChatDict {
  placeholder: string;
  send: string;
  connecting: string;
  emptyHint: string;
  suggestions: string[];
  errorGeneric: string;
  errorConfig: string;
  agentLabel: string;
  youLabel: string;
  handoffNote: string;
  sectionLabel: string;
}

const CHAT_I18N: Record<ChatLang, ChatDict> = {
  es: {
    placeholder: "¿Qué quieres saber?",
    send: "Enviar",
    connecting: "Conectando…",
    emptyHint: "Pregunta lo que quieras.",
    suggestions: ["¿Qué hace Adeptos?"],
    errorGeneric: "No se pudo enviar. Prueba otra vez.",
    errorConfig: "No se pudo conectar con el agente.",
    agentLabel: "Agente",
    youLabel: "Tú",
    handoffNote: "Un especialista puede continuar esta conversación en breve.",
    sectionLabel: "Habla con tu agente",
  },
  en: {
    placeholder: "What would you like to know?",
    send: "Send",
    connecting: "Connecting…",
    emptyHint: "Ask anything.",
    suggestions: ["What does Adeptos do?"],
    errorGeneric: "Could not send. Try again.",
    errorConfig: "Could not connect to the agent.",
    agentLabel: "Agent",
    youLabel: "You",
    handoffNote: "A specialist can continue this conversation shortly.",
    sectionLabel: "Talk to your agent",
  },
};

export function getChatDict(lang: ChatLang): ChatDict {
  return CHAT_I18N[lang];
}
