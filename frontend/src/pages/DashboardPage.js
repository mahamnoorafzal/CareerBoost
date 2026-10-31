// Dashboard Page
// Main user dashboard with resume and JD management

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Upload, Trash2 } from 'lucide-react';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [jobDescriptions, setJobDescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('resumes');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [resumeRes, jdRes] = await Promise.all([
        api.get('/resume/list'),
        api.get('/resume/job-descriptions'),
      ]);
      setResumes(resumeRes.data.resumes || []);
      setJobDescriptions(jdRes.data.jobDescriptions || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await api.delete(`/resume/${id}`);
        setResumes((prev) => prev.filter((r) => r._id !== id));
      } catch (err) {
        alert('Error deleting resume');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Manage your resumes and job descriptions here
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link
            to="/upload-resume"
            className="bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] text-white p-6 rounded-lg hover:shadow-lg transition flex items-center space-x-4"
          >
            <Upload size={32} />
            <div>
              <h3 className="font-semibold text-lg">Upload Resume</h3>
              <p className="text-sm opacity-90">Add a new resume to analyze</p>
            </div>
          </Link>

          <Link
            to="/add-job-description"
            className="bg-white border-2 border-[#8B1E3F] text-[#8B1E3F] p-6 rounded-lg hover:bg-[#8B1E3F] hover:text-white transition flex items-center space-x-4"
          >
            <Plus size={32} />
            <div>
              <h3 className="font-semibold text-lg">Add Job Description</h3>
              <p className="text-sm opacity-90">Paste a job description to analyze</p>
            </div>
          </Link>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b flex">
            <button
              onClick={() => setActiveTab('resumes')}
              className={`px-6 py-4 font-semibold transition ${
                activeTab === 'resumes'
                  ? 'border-b-2 border-[#8B1E3F] text-[#8B1E3F]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📄 Resumes ({resumes.length})
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-6 py-4 font-semibold transition ${
                activeTab === 'jobs'
                  ? 'border-b-2 border-[#8B1E3F] text-[#8B1E3F]'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💼 Job Descriptions ({jobDescriptions.length})
            </button>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin">
                  <div className="w-8 h-8 border-4 border-gray-200 border-t-[#8B1E3F] rounded-full"></div>
                </div>
              </div>
            ) : activeTab === 'resumes' ? (
              <div>
                {resumes.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">No resumes uploaded yet</p>
                    <Link
                      to="/upload-resume"
                      className="inline-block bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
                    >
                      Upload Your First Resume
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {resumes.map((resume) => (
                      <div
                        key={resume._id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition"
                      >
                        <div className="flex items-center space-x-4">
                          <FileText size={32} className="text-[#8B1E3F]" />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {resume.fileName}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {resume.skills?.length || 0} skills detected
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteResume(resume._id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                {jobDescriptions.length === 0 ? (
                  <div className="text-center py-12">
                    <Plus size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600 mb-4">
                      No job descriptions added yet
                    </p>
                    <Link
                      to="/add-job-description"
                      className="inline-block bg-gradient-to-r from-[#8B1E3F] to-[#6D0F2B] text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
                    >
                      Add a Job Description
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobDescriptions.map((jd) => (
                      <div
                        key={jd._id}
                        className="p-4 border rounded-lg hover:bg-gray-50 transition"
                      >
                        <h3 className="font-semibold text-gray-900">
                          {jd.jobTitle} at {jd.companyName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {jd.requiredSkills?.length || 0} required skills
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
