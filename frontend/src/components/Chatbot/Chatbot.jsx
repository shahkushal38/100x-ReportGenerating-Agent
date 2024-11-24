import { Panel, Stack, StackItem, Text } from "@fluentui/react";
import { DeepChat } from "deep-chat-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { BarChart } from "../GridLayout/Charts";

export function Chatbot() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);
  const [panelText, setIsPanelText] = useState("");

  const initialMessages = [
    // { role: "user", text: "Hey, how are you today?" },
    { role: "ai", text: "Hey! I am Aakar! How can I help you today?" },
    {
      role: "ai",
      html: "<p> Ask me anything related to - <br></p><ul><li>Give me a course related to python</li><li>Provide the summary of the course 'Python Fundamentals'</li><li>Test my knowledge</li><li>Ask anything</li></ul>",
    },
  ];
  const chatElementRef = useRef(null);

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

  useEffect(() => {
    if (chatElementRef.current) {
      // chatElementRef.current.messageStyles = {
      //   html: {
      //     shared: {
      //       bubble: {
      //         backgroundColor: "unset",
      //         padding: "0px",
      //         width: "100%",
      //         textAlign: "right",
      //       },
      //     },
      //   },
      // };

      // chatElementRef.current.submitButtonStyles = {
      //   disabled: { container: { default: { opacity: 0, cursor: "auto" } } },
      // };

      chatElementRef.current.onNewMessage = ({ message, isInitial }) => {
        console.log("checking isinitial - ",isInitial)
        setIsModalOpen(true);
        setIsPanelText(message.text);
        setIsChartVisible(true);
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

        // if (
        //   !isInitial &&
        //   allMessages.length !== 0 &&
        //   allMessages[allMessages.length - 2].role === "ai" &&
        //   allMessages[allMessages.length - 2].html &&
        //   allMessages[allMessages.length - 2].html.search(/<button/g) !== -1 &&
        //   allMessages[allMessages.length - 2].html.match(/<button/g).length >= 4
        // ) {
        //   const correctAnsMatch = allMessages[
        //     allMessages.length - 2
        //   ].html.match(/<button id="correct-ans"[^>]*>(.*?)<\/button>/);
        //   if (correctAnsMatch && correctAnsMatch[1]) {
        //     if (message.text === correctAnsMatch[1]) {
        //       chatElementRef.current._addMessage({
        //         text: "Woah! You nailed it!",
        //         role: "ai",
        //       });
        //     } else {
        //       chatElementRef.current._addMessage({
        //         text: `Uh Oh! the correct answer was - "${correctAnsMatch[1]}"`,
        //         role: "ai",
        //       });
        //     }
        //   }
        // }
      };

      chatElementRef.current.responseInterceptor = (a) => {
        return a[0];
      };
    }
  }, []);

  return (
    <Stack horizontal tokens={{ childrenGap: 16 }}>
      <StackItem>
        <DeepChat
          ref={chatElementRef}
          // onMessage={handleMessage}
          introMessage = {{"text":"Hey! I am Aakar! How can I help you today?"}}
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
