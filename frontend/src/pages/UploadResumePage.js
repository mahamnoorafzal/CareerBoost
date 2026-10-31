// Upload Resume Page
// Resume file upload with preview

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import api from '../utils/api';

const UploadResumePage = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Only PDF and DOCX files are allowed');
        setFile(null);
        return;
      }
      // Validate file size (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await api.post('/resume/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading resume');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {success ? (
            <div className="text-center">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Resume Uploaded Successfully! ✅
              </h2>
              <p className="text-gray-600">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Upload Your Resume
              </h1>
              <p className="text-gray-600 mb-8">
                Upload a PDF or DOCX file to get started with analysis
              </p>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6 hover:border-[#8B1E3F] transition">
                  <input
                    type="file"
                    id="file-input"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    {file ? (
                      <>
                        <FileText size={48} className="text-[#8B1E3F] mx-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-900">
                          {file.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload size={48} className="text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-semibold text-gray-900">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-sm text-gray-600">
                          PDF or DOCX (Max 10MB)
                        </p>
                      </>
                    )}
                  </label>
                </div>

                {/* File Info */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">
                    Supported Formats:
                  </h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ PDF Documents (.pdf)</li>
                    <li>✓ Word Documents (.docx)</li>
                    <li>✓ Maximum file size: 10MB</li>
                  </ul>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={!file || loading}
                    className="flex-1 bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                  >
                    {loading ? 'Uploading...' : 'Upload Resume'}
                  </button>
                  <button
                    type="button"
                    onClick={() => window.history.back()}
                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadResumePage;
