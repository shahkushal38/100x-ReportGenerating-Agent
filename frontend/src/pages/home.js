// src/pages/Home.js

import React, { useState, useRef, useEffect } from 'react';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import ArrowUpIcon from '@mui/icons-material/ArrowUp';
import axios from 'axios';
import { Modal, Stack, Text } from '@fluentui/react';
import FileUpload from '../components/FileUpload';
import DatabaseConnect from '../components/DatabaseConnect';
import ProductReviewInput from '../components/ProductReviewInput';
import KaggleDatasetSelector from '../components/KaggleDatasetSelector';

const Home = () => {
  const [isDataModalOpen, setIsDataModalOpen] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [reportSection, setReportSection] = useState(null);

  // Open/Close Data Ingestion Modal
  const openDataModal = () => setIsDataModalOpen(true);
  const closeDataModal = () => setIsDataModalOpen(false);

  // Handle successful data ingestion
  const handleDataIngested = () => {
    setReportGenerated(true);
    setIsDataModalOpen(false);
    setMessages([{ text: "Data has been successfully ingested. Start chatting to generate your report.", sender: 'ai' }]);
  };

  // Handle sending user message
  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user' };
      setMessages(prev => [...prev, userMessage]);
      setInput('');

      // Send the message to backend
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, {
          query: input,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const { chatResponse, report } = response.data;

        // Update chat messages
        setMessages(prev => [...prev, { text: chatResponse, sender: 'ai' }]);

        // Update report section
        setReportSection(report);
      } catch (error) {
        console.error('Error communicating with backend:', error);
        setMessages(prev => [...prev, { text: "Sorry, something went wrong. Please try again.", sender: 'ai' }]);
      }
    }
  };

  // Handle Enter key press in input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="flex flex-1">
        <div className="w-64 bg-white shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Reports</h1>
          <button
            onClick={openDataModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 w-full hover:bg-gray-200 transition duration-300"
          >
            <ArrowUpIcon />
            <span className="font-medium">Connect Data</span>
          </button>

          {/* Data Ingestion Modal */}
          <Modal
            isOpen={isDataModalOpen}
            onDismiss={closeDataModal}
            isBlocking={false}
            styles={{ main: { padding: '20px', maxWidth: '800px' } }}
          >
            <Stack tokens={{ childrenGap: 20 }}>
              <Text variant="large" styles={{ root: { fontWeight: 'bold' } }}>
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
            <h1 className="text-3xl font-bold mb-8 text-gray-800">AI Report Generator</h1>

            {reportGenerated ? (
              <div className="flex flex-col flex-1 bg-white rounded-xl shadow-md p-6">
                <div className="flex-1 overflow-auto space-y-4 mb-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg ${
                        message.sender === 'ai' ? 'bg-blue-50 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.text}
                    </div>
                  ))}
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
                    <ArrowUpIcon />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="text-2xl font-semibold mb-6 text-gray-700">Connect Your Data</h2>
                <p className="text-gray-600">Please connect your data sources using the "Connect Data" button in the sidebar to start generating reports.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar - Report Display */}
        <div className="w-96 p-8">
          {reportSection && (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Report: {reportSection.name}</h2>
                <p className="text-sm text-gray-600 mt-1">{reportSection.description}</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Report Insights</h3>
                {reportSection.text && <p className="mb-4 text-gray-700">{reportSection.text}</p>}
                {reportSection.charts && reportSection.charts.map((chart, idx) => (
                  <ResponsiveContainer key={idx} width="100%" height={300} className="mb-6">
                    <ReBarChart data={chart.data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey={chart.xAxis} stroke="#888" />
                      <YAxis stroke="#888" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey={chart.dataKey} fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </ReBarChart>
                  </ResponsiveContainer>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
