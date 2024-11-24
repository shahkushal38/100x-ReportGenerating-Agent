import { Panel, Stack, StackItem, Text } from "@fluentui/react";
import { DeepChat } from "deep-chat-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BarChart } from "../GridLayout/Charts";

export function Chatbot() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [panelText, setPanelText] = useState("");
  const panelTextRef = useRef("");
  const chatElementRef = useRef(null);

  const dismissPanel = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  useEffect(() => {
    console.log("paneltextref useffect");
    setPanelText(panelTextRef.current);
  }, [panelTextRef]);

  useEffect(() => {
    if (chatElementRef.current) {
      chatElementRef.current.onNewMessage = ({ message, isInitial }) => {
        console.log("checking isinitial - ", isInitial);
        if (!isInitial && message.role === "ai") {
          // setIsModalOpen(true);
          panelTextRef.current = message.text;
          setPanelText(message.text);
          // setIsChartVisible(true);
          // console.log("paneltextref here", panelTextRef.current);
        }

        const allMessages = chatElementRef.current.getMessages();
        if (
          !isInitial &&
          message.role === "ai" &&
          message.text !== "Thanks recorded!" &&
          message.html &&
          message.html.search(/<button/g) === -1
        ) {
          console.log("in ref : ", isInitial, message);

          chatElementRef.current._addMessage({
            text: "Was the response satisfactory?",
            role: "ai",
          });
          chatElementRef.current._addMessage({
            role: "user",
            html: `
            <div class="deep-chat-temporary-message">
              <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid green">Yes</button>
              <button class="deep-chat-button deep-chat-suggestion-button" style="border: 1px solid #d80000">No</button>
            </div>`,
          });
        }
      };

      chatElementRef.current.responseInterceptor = (a) => {
        console.log("coming here too - ", a);
        return a[0];
      };
    }
  }, []);

  return (
    <Stack horizontal tokens={{ childrenGap: 16 }}>
      <StackItem>
        <DeepChat
          ref={chatElementRef}
          introMessage={{ text: "Hey! I am Aakar! How can I help you today?" }}
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
          isBlocking={false}
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
                  backgroundColor: "white",
                },
              },
            },
          }}
        >
          <Stack>
            <StackItem>{isChartVisible && <BarChart />}</StackItem>
            <StackItem>
              {/* {panelText && <Text>{panelText}</Text>} */}
              {panelText && <Text>{panelText}</Text>}
            </StackItem>
          </Stack>
        </Panel>
      </StackItem>
    </Stack>
  );
}
