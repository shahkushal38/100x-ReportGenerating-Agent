import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import { BarChart, LineChart, PieChart, ScatterPlot } from "./Charts";

export function Dashboard() {
  const layout = [
    { i: "bar", x: 0, y: 0, w: 6, h: 3, viewContent: <BarChart /> },
    { i: "line", x: 6, y: 0, w: 6, h: 3, viewContent: <LineChart /> },
    { i: "pie", x: 0, y: 3, w: 6, h: 3, viewContent: <PieChart /> },
    { i: "scatter", x: 6, y: 3, w: 6, h: 3, viewContent: <ScatterPlot /> },
  ];

  function renderContent() {
    return layout.map((item) => {
      return <div key={item.i}>{item.viewContent}</div>;
    });
  }
  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={12}
      rowHeight={150}
      width={1200}
      isDraggable={false}
    >
      {renderContent()}
    </GridLayout>
  );
}
