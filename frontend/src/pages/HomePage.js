// Home Page
// Landing page with introduction

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, BarChart3, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Unlock Your{' '}
                <span className="bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] bg-clip-text text-transparent">
                  Career Potential
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Analyze your resume against job descriptions and discover the skills you need to land your dream job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link
                    to="/dashboard"
                    className="bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2"
                  >
                    <span>Go to Dashboard</span>
                    <ArrowRight size={20} />
                  </Link>
                ) : (
                  <>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center space-x-2"
                    >
                      <span>Get Started</span>
                      <ArrowRight size={20} />
                    </Link>
                    <Link
                      to="/login"
                      className="border-2 border-[#8B1E3F] text-[#8B1E3F] px-8 py-3 rounded-lg font-semibold hover:bg-[#8B1E3F] hover:text-white transition"
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Feature Cards Preview */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="w-12 h-12 bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] rounded-lg flex items-center justify-center mb-4">
                  <FileText size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Upload Resume</h3>
                <p className="text-gray-600">
                  Upload your resume in PDF or DOCX format
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="w-12 h-12 bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] rounded-lg flex items-center justify-center mb-4">
                  <Zap size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Smart Analysis</h3>
                <p className="text-gray-600">
                  Get instant skill matching and gap analysis
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                <div className="w-12 h-12 bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 size={24} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Compatibility Score</h3>
                <p className="text-gray-600">
                  See your match percentage with job requirements
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#8B1E3F] mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2">Register</h3>
              <p className="text-gray-600">
                Create your free account to get started
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#8B1E3F] mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-gray-600">
                Upload your resume and job description
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#8B1E3F] mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2">Analyze</h3>
              <p className="text-gray-600">
                Get detailed insights and recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
