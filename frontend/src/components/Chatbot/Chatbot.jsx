import { Panel, Stack, StackItem, Text } from "@fluentui/react";
import { DeepChat } from "deep-chat-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BarChart } from "../GridLayout/Charts";

export function Chatbot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [panelText, setIsPanelText] = useState("");

  const dismissPanel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleMessage = useCallback((data) => {
    console.log("In Message - ", data);
    if (data.message.role === "user") {
      setIsModalOpen(true);
    }
  }, []);

  const handleResponse = useCallback((data) => {
    console.log("In response - ", data);
    setIsPanelText(data.body.messages[0].text);
    setIsChartVisible(true);
    return {
      text: "This is mock Response",
      user: "ai",
    };
  }, []);

  const handleSubmit = useCallback((ev) => {
    ev.preventDefault();
  }, []);

  return (
    <Stack horizontal tokens={{ childrenGap: 16 }}>
      <StackItem>
        <DeepChat
          onMessage={handleMessage}
          introMessage={{
            text: "Hey! I am Aakar! How can I help you today?",
          }}
          //   demo={{ response: handleResponse }}
          // requestInterceptor={handleResponse}
          // onSubmit={handleSubmit}
          connect={{
            url: "http://127.0.0.1:5000/api/chat",
            method: "POST",
          }}
          mixedFiles={true}
          style={{ height: "100%", width: "400px" }}
        />
      </StackItem>

      <StackItem>
        <Panel 
          headerText="Report"
          isOpen={isModalOpen}
          onDismiss={dismissPanel}
          closeButtonAriaLabel="Close"
          hasCloseButton={true}
          styles={{
            main: { minWidth: "500px" },
            subComponentStyles: {
              closeButton: {
                root: {
                  backgroundColor: "black",
                },
              },
            },
          }}
        >
          <Stack>
            <StackItem>{isChartVisible && <BarChart />}</StackItem>
            <StackItem>
              {panelText.length > 0 && <Text>{panelText}</Text>}
            </StackItem>
          </Stack>
        </Panel>
      </StackItem> 
    </Stack>
  );
}
