// src/pages/Home.js

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import axios from "axios";
import { Modal, Stack, Text } from "@fluentui/react";
import FileUpload from "../components/FileUpload";
import DatabaseConnect from "../components/DatabaseConnect";
import ProductReviewInput from "../components/ProductReviewInput";
import KaggleDatasetSelector from "../components/KaggleDatasetSelector";
import ProtectedRoute from "../components/ProtectedRoute";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import StorageIcon from "@mui/icons-material/Storage";
import RateReviewIcon from "@mui/icons-material/RateReview";
import DatasetIcon from "@mui/icons-material/Dataset";

const Home = () => {
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [reportSection, setReportSection] = useState(null);
  const [connectedData, setConnectedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Open/Close Data Ingestion Modal
  const openDataModal = () => setIsDataModalOpen(true);
  const closeDataModal = () => setIsDataModalOpen(false);

  // Handle successful data ingestion
  const handleDataIngested = (dataSource) => {
    setReportGenerated(true);
    setIsDataModalOpen(false);

    let arrMessages = [];
    arrMessages.push({
      text: "Data has been successfully ingested. Start chatting to generate your report.",
      sender: "ai",
      type: "normal",
    });
    if ("viewer" in dataSource) {
      arrMessages.push({
        text: dataSource["viewer"],
        sender: "ai",
        type: "jsx viewer",
      });
    }
    if ("prompts" in dataSource) {
      arrMessages.push({
        text: dataSource["prompts"].slice(0, 3),
        sender: "ai",
        type: "array buttons",
        filepath: dataSource["prompts"][3],
        indexDir: dataSource["prompts"][4],
      });
    }
    console.log("all data - ", arrMessages);

    setMessages(arrMessages);
    setConnectedData((prev) => [...prev, dataSource["connectedData"]]);
  };

  // Handle sending user message
  const handleSend = async () => {
    if (input.trim()) {
      setIsLoading(true);
      const userMessage = { text: input, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/api/chat`,
          {
            query: input,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { chatResponse, report } = response.data;

        setMessages((prev) => [
          ...prev,
          { text: chatResponse, sender: "ai", type: "normal" },
        ]);
        setReportSection(report);
      } catch (error) {
        console.error("Error:", error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, something went wrong. Please try again.",
            sender: "ai",
            type: "normal",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle Enter key press in input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  // Function to get icon based on data source type
  const getDataSourceIcon = (type) => {
    switch (type) {
      case "File Upload":
        return <InsertDriveFileIcon />;
      case "Database":
        return <StorageIcon />;
      case "Product Reviews":
        return <RateReviewIcon />;
      case "Kaggle Dataset":
        return <DatasetIcon />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  const handleDataCleaningTask = async (text, i, filepath, indexDir) => {
    console.log("text given clean - ", text, i, filepath, indexDir);
    let req_data = {};
    if (i === 0) {
      req_data["type"] = "outlier";
    } else if (i === 1) {
      req_data["type"] = "missing";
    } else {
      req_data["type"] = "duplicate";
    }
    req_data["text"] = text;
    req_data["filepath"] = filepath;
    req_data["indexDir"] = indexDir;
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/data-clean`,
      req_data
    );

    if (response.status === 200) {
      const { message, viewer } = response.data;
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          sender: "ai",
          type: "normal",
        },
        {
          text: viewer,
          sender: "ai",
          type: "jsx viewer",
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: `Sorry, something went wrong.${response.data.error}`,
          sender: "ai",
          type: "normal",
        },
      ]);
    }
  };

  // Function to render different chart types
  const renderChart = (chart, idx) => {
    const commonProps = {
      data: chart.data,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    };

    switch (chart.type.toLowerCase()) {
      case "bar":
        return (
          <ResponsiveContainer key={idx} width="100%" height={300} className="mb-6">
            <BarChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={chart.xAxis} stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Bar dataKey={chart.dataKey} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer key={idx} width="100%" height={300} className="mb-6">
            <LineChart {...commonProps}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey={chart.xAxis} stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey={chart.dataKey} stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer key={idx} width="100%" height={300} className="mb-6">
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                data={chart.data}
                dataKey={chart.dataKey}
                nameKey={chart.xAxis}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <div key={idx} className="mb-6 text-red-500">
            Unsupported chart type: {chart.type}
          </div>
        );
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Main Content */}
        <div className="flex flex-1">
          {/* Left Sidebar */}
          <div className="w-64 bg-white shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Reports</h1>
            <button
              onClick={openDataModal}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 w-full hover:bg-gray-200 transition duration-300"
            >
              <ArrowUpwardIcon />
              <span className="font-medium">Connect Data</span>
            </button>

            {/* Connected Data List */}
            <div className="mt-6">
              <Typography variant="h6" gutterBottom>
                Connected Data
              </Typography>
              <List>
                {connectedData.length === 0 && (
                  <Typography variant="body2" color="textSecondary">
                    No data connected yet.
                  </Typography>
                )}
                {connectedData.map((data, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>{getDataSourceIcon(data.type)}</ListItemIcon>
                    <ListItemText primary={data.name} secondary={data.type} />
                  </ListItem>
                ))}
              </List>
            </div>

            <Divider className="mt-6" />

            {/* Data Ingestion Modal */}
            <Modal
              isOpen={isDataModalOpen}
              onDismiss={closeDataModal}
              isBlocking={false}
              styles={{ main: { padding: "20px", maxWidth: "1200px" } }}
            >
              <Stack tokens={{ childrenGap: 20 }}>
                <Text variant="large" styles={{ root: { fontWeight: "bold" } }}>
                  Connect Your Data
                </Text>
                <Stack horizontal tokens={{ childrenGap: 20 }}>
                  <FileUpload onIngestSuccess={handleDataIngested} />
                  <DatabaseConnect onIngestSuccess={handleDataIngested} />
                  <ProductReviewInput onIngestSuccess={handleDataIngested} />
                  <KaggleDatasetSelector onIngestSuccess={handleDataIngested} />
                </Stack>
              </Stack>
            </Modal>
          </div>

          {/* Chat Section */}
          <div className="flex-1 border-r border-gray-200">
            <div className="p-8 h-full flex flex-col">
              <h1 className="text-3xl font-bold mb-8 text-gray-800">Aakar AI</h1>

              {reportGenerated ? (
                <div className="flex flex-col flex-1 bg-white rounded-xl shadow-md p-6">
                  <div
                    className="flex-1 overflow-auto space-y-4 mb-4"
                    style={{ maxHeight: "500px", overflowY: "auto" }}
                  >
                    {messages.map((message, index) => {
                      if (message.type === "jsx viewer") {
                        return (
                          <div
                            key={index}
                            className="p-4 rounded-lg bg-green-50 text-green-800"
                          >
                            {/* Safely render JSX content */}
                            <div
                              style={{
                                overflowX: "auto",
                                maxWidth: "50%",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                padding: "20px",
                                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                              }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: message.text,
                                }}
                              />
                            </div>
                          </div>
                        );
                      } else if (message.type === "array") {
                        return (
                          <div
                            key={index}
                            className="p-4 rounded-lg bg-yellow-50 text-yellow-800"
                          >
                            {/* Render array items */}
                            <ul>
                              {message.text.map((item, i) => (
                                <li key={i}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        );
                      } else if (message.type === "array buttons") {
                        return (
                          <div key={index}>
                            {message.text.map((item, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  handleDataCleaningTask(
                                    item,
                                    i,
                                    message.filepath,
                                    message.indexDir
                                  );
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "start",
                                  gap: "8px",
                                  padding: "10px 15px",
                                  margin: "8px 0",
                                  fontSize: "14px",
                                  fontWeight: "500",
                                  color: "#333",
                                  backgroundColor: "#f5f7fb",
                                  border: "1px solid #ddd",
                                  borderRadius: "20px",
                                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                  cursor: "pointer",
                                  textAlign: "left",
                                  width: "99%",
                                  maxWidth: "400px",
                                  wordWrap: "break-word",
                                  transition: "all 0.3s ease",
                                }}
                                onMouseOver={(e) =>
                                  (e.target.style.backgroundColor = "#eef4ff")
                                }
                                onMouseOut={(e) =>
                                  (e.target.style.backgroundColor = "#f5f7fb")
                                }
                              >
                                <span
                                  style={{
                                    display: "inline-block",
                                    width: "20px",
                                    height: "20px",
                                    backgroundImage:
                                      "url('https://cdn-icons-png.flaticon.com/512/1828/1828970.png')",
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                ></span>
                                {item}
                              </button>
                            ))}
                          </div>
                        );
                      } else {
                        // Default for 'normal' and other types
                        return (
                          <div
                            key={index}
                            className={`p-4 rounded-lg ${
                              message.sender === "ai"
                                ? "bg-blue-50 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {message.text}
                          </div>
                        );
                      }
                    })}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                      onKeyPress={handleKeyPress}
                    />
                    <button
                      onClick={handleSend}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                    >
                      <ArrowUpwardIcon />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-8">
                  <h2 className="text-2xl font-semibold mb-6 text-gray-700">
                    Connect Your Data
                  </h2>
                  <p className="text-gray-600">
                    Please connect your data sources using the "Connect Data"
                    button in the sidebar to start generating reports.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Report Display */}
          <div className="w-96 p-8 overflow-y-auto">
            {reportSection && (
              <>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Report: {reportSection.name}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {reportSection.description}
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Report Insights
                  </h3>
                  {reportSection.text && (
                    <p className="mb-4 text-gray-700">{reportSection.text}</p>
                  )}
                  {reportSection.charts &&
                    reportSection.charts.map((chart, idx) => renderChart(chart, idx))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Home;
