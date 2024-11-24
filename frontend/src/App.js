import { Stack, StackItem } from "@fluentui/react";
import "./App.css";
import { Dashboard } from "./components/GridLayout/GridLayout";
import HeaderWithModal from "./components/Header/Header";
import { Chatbot } from "./components/Chatbot/Chatbot";
import Table from "./components/Table/Table";

function App() {
  return (
    <div className="App">
      <Stack verticalFill tokens={{ childrenGap: 16 }}>
        <StackItem>
          <HeaderWithModal />
        </StackItem>
        {/* <StackItem>
          <Dashboard />
        </StackItem> */}

        <StackItem>
          <Table />
        </StackItem>
      </Stack>
    </div>
  );
}

export default App;
