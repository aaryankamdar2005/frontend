import { useState } from "react";
import axios from "axios";

export default function Screening() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const backendurl = import.meta.env.VITE_BACKEND_URL;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError(null);
    }
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Please upload a resume file (.pdf or .docx)");
      return;
    }
    
    if (!jobDescription.trim()) {
      setError("Please enter a job description");
      return;
    }

    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post(
        `${backendurl}/api/screen/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          timeout: 60000, // 60 seconds timeout
        }
      );

      if (response.data.process) {
        const text = response.data.process;
        
        // More robust parsing that handles multi-line content
        const extractMultiLine = (label, text) => {
          const regex = new RegExp(`\\*\\*${label}:\\*\\*([\\s\\S]*?)(?=\\*\\*\\w+:\\*\\*|$)`, 'i');
          const match = text.match(regex);
          return match ? match[1].trim() : "Not Provided";
        };

        // Extract single line items
        const extractSingleLine = (label, text) => {
          const regex = new RegExp(`\\*\\*${label}:\\*\\* ([^\\n]*)`, 'i');
          const match = text.match(regex);
          return match ? match[1].trim() : "Not Provided";
        };

        // Extract feedback items
        const feedbackSection = text.split("**Constructive Feedback:**")[1] || "";
        const feedbackItems = feedbackSection
          .split(/\d+\.|\+|-/)
          .filter(item => item.trim().length > 0)
          .map(item => item.trim());

        // Extract match score more reliably
        const scoreRegex = /\*\*Match Score:\*\* (\d+)/i;
        const scoreMatch = text.match(scoreRegex);
        const matchScore = scoreMatch ? parseInt(scoreMatch[1]) : 0;

        setResult({
          name: extractSingleLine("Name", text),
          contact: extractMultiLine("Contact Info", text),
          skills: extractMultiLine("Skills", text),
          experience: extractMultiLine("Experience", text),
          education: extractMultiLine("Education", text),
          certifications: extractMultiLine("Certifications", text),
          summary: extractMultiLine("Summary", text),
          matchScore: matchScore,
          constructiveFeedback: feedbackItems,
          rawResponse: text // Store the raw response for debugging
        });
      } else {
        setError("The response doesn't contain the expected data format");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setError(
        error.response?.data?.message || 
        "Failed to process resume. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to format multiline text with bullet points if needed
  const formatMultiline = (text) => {
    if (text.includes("\n") || text.includes("-")) {
      // If text has bullet points or multiple lines, render it properly
      return (
        <ul className="list-disc list-inside">
          {text.split(/\n|-/).filter(line => line.trim()).map((line, idx) => (
            <li key={idx}>{line.trim()}</li>
          ))}
        </ul>
      );
    }
    return text;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">
        AI Resume Screening
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Upload Resume:</label>
            <div className="flex items-center">
              <label className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-500 rounded cursor-pointer border border-blue-300 hover:bg-blue-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className="truncate">{fileName}</span>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-1">Supports PDF and DOCX formats</p>
          </div>

          <div>
            <label className="block font-semibold mb-1">Job Description:</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3 border rounded h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the job description here..."
            />
          </div>

          <button
            onClick={handleSubmit}
            className={`w-full py-3 rounded font-medium transition-colors ${
              loading 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </span>
            ) : (
              "Analyze Resume"
            )}
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-5 bg-gray-50 rounded-lg border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Analysis Results</h2>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-lg font-semibold text-blue-600">
                    Match Score: {result.matchScore}/100
                  </div>
                  <div className="text-sm font-medium text-gray-600">
                    {result.matchScore < 50 ? "Low Match" : 
                     result.matchScore < 70 ? "Moderate Match" : 
                     result.matchScore < 90 ? "Good Match" : "Excellent Match"}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      result.matchScore < 50 ? "bg-red-500" : 
                      result.matchScore < 70 ? "bg-yellow-500" :
                      result.matchScore < 90 ? "bg-blue-500" : "bg-green-500"
                    }`}
                    style={{ width: `${result.matchScore}%` }}
                  ></div>
                </div>
              </div>

              

              <div className="mt-6">
                <h3 className="font-semibold text-gray-700 mb-2">Constructive Feedback:</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {result.constructiveFeedback.length > 0 ? 
                    result.constructiveFeedback.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    )) : 
                    <li>No specific feedback provided</li>
                  }
                </ul>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  className="text-blue-500 text-sm hover:underline"
                  onClick={() => {
                    const element = document.createElement("a");
                    const file = new Blob([JSON.stringify(result, null, 2)], {type: 'text/plain'});
                    element.href = URL.createObjectURL(file);
                    element.download = "resume-analysis.json";
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                >
                  Export Analysis
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}