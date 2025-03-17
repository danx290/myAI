"use client";

import ChatInput from "@/components/chat/input";
import ChatMessages from "@/components/chat/messages";
import useApp from "@/hooks/use-app";
import ChatHeader from "@/components/chat/header";

export default function Chat() {
  const {
    messages,
    handleInputChange,
    handleSubmit,
    input,
    isLoading,
    indicatorState,
    clearMessages,
  } = useApp();

  return (
    <>
      <ChatHeader clearMessages={clearMessages} />
      <div
        className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="flex flex-col max-w-screen-lg w-full h-full p-5 bg-white bg-opacity-75 rounded-lg shadow-lg">
          {/* Make ChatMessages scrollable */}
          <div className="flex-1 overflow-y-auto max-h-[90vh] p-2">
            <ChatMessages messages={messages} indicatorState={indicatorState} />
          </div>
        </div>
      </div>
      <ChatInput
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        input={input}
        isLoading={isLoading}
      />
    </>
  );
}
