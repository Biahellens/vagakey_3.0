import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // necessário para uso no front
});

interface Message {
  id: string;
  text: string;
  sender: "user" | "viky";
}

export default function ChatViky() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "0",
      text: "Olá! 👋 Eu sou a Viky, sua assistente pessoal. Como posso te ajudar hoje?",
      sender: "viky",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await gerarRespostaViky(userMsg.text);
      const vikyMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: reply,
        sender: "viky",
      };
      setMessages((prev) => [...prev, vikyMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: "Desculpe 😔, estou com dificuldades para responder agora.",
          sender: "viky",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const gerarRespostaViky = async (texto: string): Promise<string> => {
    const res = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Você é Viky, uma assistente pessoal simpática e prestativa. Você ajuda o usuário com rotas, produtividade, estudos, saúde e tecnologia. Responda de forma amigável, breve e natural.",
        },
        { role: "user", content: texto },
      ],
      temperature: 0.8,
      max_tokens: 100,
    });

    return res.choices[0].message?.content ?? "Não entendi muito bem 😅";
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMsg : styles.vikyMsg,
      ]}
    >
      {item.sender === "viky" && (
        <Image source={require("../assets/vicky.png")} style={styles.avatar} />
      )}
      <Text
        style={[
          styles.messageText,
          item.sender === "user" ? styles.userText : styles.vikyText,
        ]}
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.chatContainer}
          contentContainerStyle={{ paddingBottom: 120 }}
        />

        {loading && (
          <View style={styles.typingContainer}>
            <Image source={require("../assets/vicky.png")} style={styles.avatarSmall} />
            <Text style={styles.typingText}>Viky está digitando...</Text>
            <ActivityIndicator size="small" color="#0052cc" />
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder="Digite sua mensagem..."
            style={styles.input}
            placeholderTextColor="#999"
            editable={!loading}
          />
          <TouchableOpacity
            style={[styles.sendButton, loading && { opacity: 0.5 }]}
            onPress={handleSend}
            disabled={loading}
          >
            <Text style={styles.sendText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start", alignItems: "flex-start", backgroundColor: "#fff", padding: 20, paddingTop: 5 },
  header: {
    alignItems: "center",
    marginBottom: 10,
  },
  greeting: {
    fontSize: 16,
    color: "#444",
  },
  title: { fontSize: 32, marginTop: 10, fontWeight: "400", textAlign: 'center' },
  bold: {
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  robot: {
    width: 185,
    height: 240,
    alignSelf: "center",
    marginVertical: 20,
  },
  chatContainer: {
    flex: 1,
    width: "100%",
  },
  messageContainer: {
    borderRadius: 10,
    marginVertical: 6,
    maxWidth: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  vikyMsg: {
    backgroundColor: "#f0f0f5",
    alignSelf: "flex-start",
    minWidth: 80,
    minHeight: 40
  },
  userMsg: {
    backgroundColor: "#0054B0",
    alignSelf: "flex-end",
    minWidth: 80,
    minHeight: 40
  },
  messageText: {
    fontSize: 16,
    maxWidth: '90%'
  },
  vikyText: {
    color: "#000",
  },
  userText: {
    color: "#fff",
  },
  inputContainer: {
    width: '100%',
    flexDirection: "row",
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    gap: 10
  },
  input: { width: "70%", height: 50, borderWidth: 1, backgroundColor: '#D9D9D9', borderColor: "#ccc", borderRadius: 10, paddingHorizontal: 10 },
  sendButton: { width: "30%", height: 50, backgroundColor: "#022743", borderRadius: 10, justifyContent: "center", alignItems: "center", paddingHorizontal: 10, },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  avatarSmall: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 6,
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  typingText: { color: "#555", marginRight: 8 },
});
