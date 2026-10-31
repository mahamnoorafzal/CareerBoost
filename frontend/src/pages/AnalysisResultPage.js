// Analysis Result Page
// Display resume-JD analysis results

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BarChart3, Check, X, Lightbulb } from 'lucide-react';
import api from '../utils/api';

const AnalysisResultPage = () => {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/analysis/${id}`);
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching analysis');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-[#8B1E3F] rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link
            to="/dashboard"
            className="inline-block bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] text-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (!analysis) {
    return null;
  }

  const scoreColor = analysis.compatibilityScore >= 70 ? 'text-green-600' : 
                     analysis.compatibilityScore >= 50 ? 'text-yellow-600' : 'text-red-600';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resume Analysis Report
          </h1>
          <p className="text-gray-600">
            {analysis.jobTitle} at {analysis.companyName}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Compatibility Score Card */}
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="flex justify-center mb-4">
              <BarChart3 size={48} className={scoreColor} />
            </div>
            <p className="text-gray-600 text-sm mb-2">Compatibility Score</p>
            <p className={`text-5xl font-bold ${scoreColor}`}>
              {analysis.compatibilityScore}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div
                className="bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] h-2 rounded-full transition-all duration-500"
                style={{ width: `${analysis.compatibilityScore}%` }}
              ></div>
            </div>
          </div>

          {/* Matched Skills */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center space-x-2 mb-4">
              <Check size={24} className="text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Matched Skills
              </h3>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-4">
              {analysis.totalMatchedSkills}
            </p>
            <p className="text-sm text-gray-600">
              out of {analysis.totalRequiredSkills} required
            </p>
          </div>

          {/* Missing Skills */}
          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center space-x-2 mb-4">
              <X size={24} className="text-red-600" />
              <h3 className="text-xl font-semibold text-gray-900">
                Missing Skills
              </h3>
            </div>
            <p className="text-3xl font-bold text-red-600 mb-4">
              {analysis.missingSkills?.length || 0}
            </p>
            <p className="text-sm text-gray-600">
              skills to develop
            </p>
          </div>
        </div>

        {/* Matched Skills Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Check size={28} className="text-green-600" />
            <span>Your Matching Skills</span>
          </h2>
          {analysis.matchedSkills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {analysis.matchedSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  ✓ {skill}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No matching skills found</p>
          )}
        </div>

        {/* Missing Skills Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <X size={28} className="text-red-600" />
            <span>Skills You Need to Develop</span>
          </h2>
          {analysis.missingSkills?.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {analysis.missingSkills.map((skill, idx) => (
                <div
                  key={idx}
                  className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium"
                >
                  ✗ {skill}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Great! You have all required skills</p>
          )}
        </div>

        {/* Suggestions Section */}
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
            <Lightbulb size={28} className="text-yellow-600" />
            <span>Recommendations</span>
          </h2>
          <div className="space-y-3">
            {analysis.suggestions?.map((suggestion, idx) => (
              <div
                key={idx}
                className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"
              >
                <p className="text-gray-900">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Link
            to="/dashboard"
            className="flex-1 bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] text-white py-3 rounded-lg font-semibold hover:shadow-lg transition text-center"
          >
            Back to Dashboard
          </Link>
          <button
            onClick={() => window.print()}
            className="flex-1 border-2 border-[#8B1E3F] text-[#8B1E3F] py-3 rounded-lg font-semibold hover:bg-[#8B1E3F] hover:text-white transition"
          >
            Print Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResultPage;
