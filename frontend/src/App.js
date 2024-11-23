import { Stack, StackItem } from "@fluentui/react";
import "./App.css";
import { Dashboard } from "./components/GridLayout/GridLayout";
import HeaderWithModal from "./components/Header/Header";

function App() {
  return (
    <div className="App">
      <Stack verticalFill tokens={{childrenGap: 16}}>
        <StackItem>
          <HeaderWithModal />
        </StackItem>
        <StackItem>
          <Dashboard />
        </StackItem>
      </Stack>
    </div>
  );
}

export default App;
