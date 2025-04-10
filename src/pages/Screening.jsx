import { useState } from "react";
import axios from "axios";

export default function Screening() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await axios.post(
        backendurl+"/api/screen/upload",
        formData
      );

    
      let matchScore = 0;
      let feedback = {};
      let constructiveFeedback = "No constructive feedback available.";

      if (response.data.process) {
        const lines = response.data.process.split("\n");
        matchScore = parseInt(lines.find((line) => line.includes("Match Score"))?.split(": ")[1] || "0", 10);

    
        feedback = {
    
          summary: lines.find((line) => line.includes("Summary"))?.split(": ")[1] || "Not Provided",
        };

        constructiveFeedback = lines.find((line) => line.includes("Constructive Feedback"))?.split(": ")[1] || "Not Provided";
      }

      setResult({ matchScore, feedback, constructiveFeedback });

      console.log("Match Score:", matchScore);
      console.log("Feedback:", feedback);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to process resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-4">
        AI Resume Screening
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Upload Resume:</label>
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Job Description:</label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-2 border rounded h-32"
              placeholder="Enter the job description here..."
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">Analysis Results</h2>
              <div className="mb-4">
                <div className="text-lg font-semibold text-blue-600">
                  Match Score: {result.matchScore}/100
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${result.matchScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Feedback:</h3>
                <ul className="list-disc list-inside text-gray-700">
               
                  <li><strong>Summary:</strong> {result.feedback.summary}</li>
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Constructive Feedback:</h3>
                <p className="text-gray-700">{result.constructiveFeedback}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
