import React, { useEffect, useState, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import EmojiPicker from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeContext from "./context/ThemeContext";

function ChatPage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const [theme] = useContext(ThemeContext);
  const isDark = theme === "dark";

  // Load selected user from message.json
  useEffect(() => {
    fetch("/message.json")
      .then((res) => res.json())
      .then((data) => {
        const selectedUser = data.users.find((u) => u.id == id);
        setUser(selectedUser);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Load messages for this user from message.json
  useEffect(() => {
    fetch("/message.json")
      .then((res) => res.json())
      .then((data) => {
        const userMsgs = data.messages.filter((m) => m.userId == id);
        setMessages(userMsgs);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Add new message (temporary, UI only)
  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      userId: Number(id),
      text: input,
      sender: "me",
      timestamp: new Date().toLocaleTimeString(),
      delivered: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  // Add emoji to input
  const handleEmojiClick = (emojiData) =>
    setInput((prev) => prev + emojiData.emoji);

  return (
    <div
      className={`flex flex-col h-full rounded-xl shadow-xl overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-gray-900 text-white" : "bg-indigo-50 text-gray-900"
      }`}
    >
      {/* Chat Header */}
      <div
        className={`flex-shrink-0 p-4 border-b flex items-center gap-3 ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white/80 border-gray-200"
        }`}
      >
        {user ? (
          <>
            <img
              src={user.photo}
              alt={user.name}
              className="w-10 h-10 rounded-full border-2 border-indigo-400"
            />
            <div>
              <h2 className="font-semibold text-lg text-indigo-400">
                {user.name}
              </h2>
              <span
                className={`text-sm ${
                  user.status === "online" ? "text-green-500" : "text-red-500"
                }`}
              >
                {user.status}
              </span>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
            <div className="flex flex-col">
              <div className="h-4 w-20 bg-gray-300 rounded animate-pulse mb-1"></div>
              <div className="h-3 w-10 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-transparent">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${
                msg.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-xl max-w-xs md:max-w-md shadow-md ${
                  msg.sender === "me"
                    ? isDark
                      ? "bg-indigo-700 hover:bg-indigo-600"
                      : "bg-indigo-200 hover:bg-indigo-300"
                    : isDark
                    ? "bg-gray-700 hover:bg-gray-600"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <span className="text-xs text-gray-400 block mt-1">
                  {msg.timestamp}
                </span>
                {msg.reaction && (
                  <span className="text-xl mt-1 block">{msg.reaction}</span>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className={`flex-shrink-0 p-4 border-t flex gap-2 items-center ${
          isDark ? "bg-gray-800 border-gray-700" : "bg-white/80 border-gray-200"
        }`}
      >
        <button
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-2xl"
        >
          😊
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
          className={`flex-1 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition placeholder-gray-500 ${
            isDark
              ? "bg-gray-700 border border-gray-600 text-white"
              : "bg-white border border-gray-300 text-gray-900"
          }`}
        />
        <button
          onClick={handleSend}
          className="bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition flex items-center gap-2 shadow-md"
        >
          <FiSend className="text-lg" /> Send
        </button>
        {showEmojiPicker && (
          <div className="absolute bottom-20 left-4 z-50">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPage;
