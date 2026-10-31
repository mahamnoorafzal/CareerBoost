// Add Job Description Page
// Add job description for analysis

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import api from '../utils/api';

const AddJobDescriptionPage = () => {
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.jobTitle || !formData.companyName || !formData.description) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      await api.post('/resume/job-description', formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving job description');
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
                Job Description Saved! ✅
              </h2>
              <p className="text-gray-600">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Add Job Description
              </h1>
              <p className="text-gray-600 mb-8">
                Paste a job description to analyze it against your resume
              </p>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Title *
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="e.g., Senior React Developer"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g., Google, Microsoft, Startup"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent outline-none transition"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Job Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Paste the complete job description here..."
                    rows="12"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B1E3F] focus:border-transparent outline-none transition resize-vertical"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Include all requirements, responsibilities, and desired skills
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Job Description'}
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

export default AddJobDescriptionPage;
