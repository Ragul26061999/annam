'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  MoreVertical,
  UserPlus,
  Calendar,
  Phone,
  MapPin,
  Heart,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Clock,
  RefreshCw,
  Hash,
  AlertTriangle
} from 'lucide-react';
import { getAllPatients } from '../../src/lib/patientService';

interface Patient {
  id: string;
  patient_id: string;
  name: string;
  date_of_birth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  blood_group: string;
  allergies: string;
  status: string;
  primary_complaint: string;
  admission_type: string;
  department_ward: string;
  room_number: string;
  created_at: string;
}

export default function PatientsPage() {
  const router = useRouter();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [totalPatients, setTotalPatients] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, [currentPage, statusFilter, searchTerm]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const result = await getAllPatients({
        page: currentPage,
        limit: 20,
        status: statusFilter || undefined,
        searchTerm: searchTerm || undefined
      });
      
      setPatients(result.patients);
      setTotalPatients(result.total);
    } catch (err) {
      console.error('Error fetching patients:', err);
      setError(err instanceof Error ? err.message : 'Failed to load patients');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPatients();
    setRefreshing(false);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const calculateAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return 'N/A';
    const birth = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'stable':
        return 'bg-green-100 text-green-800';
      case 'recovering':
        return 'bg-orange-100 text-orange-800';
      case 'active':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTruncatedText = (text: string, maxLength: number = 30) => {
    if (!text) return 'Not specified';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const getGradientColors = (name: string) => {
    const colors = [
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-red-500',
      'from-indigo-500 to-purple-500',
      'from-pink-500 to-rose-500',
      'from-cyan-500 to-blue-500',
      'from-emerald-500 to-green-500'
    ];
    
    const hash = name.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  // Calculate stats from real data
  const stats = {
    total: totalPatients,
    newToday: patients.filter(p => {
      const today = new Date().toDateString();
      return new Date(p.created_at).toDateString() === today;
    }).length,
    critical: patients.filter(p => p.status?.toLowerCase() === 'critical').length,
    admitted: patients.filter(p => p.admission_type || p.department_ward).length
  };

  if (loading && patients.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patients</h1>
          <p className="text-gray-500 mt-1">Manage patient records and information</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link href="/patients/emergency-register">
            <button className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md">
              <AlertTriangle size={16} className="mr-2" />
              Emergency Register
            </button>
          </Link>
          <Link href="/patients/register">
            <button className="flex items-center bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 shadow-sm hover:shadow-md">
              <UserPlus size={16} className="mr-2" />
              Register New Patient
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total.toLocaleString()}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">Active</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">New Today</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.newToday}</p>
              <div className="flex items-center mt-2">
                <Clock className="h-3 w-3 text-orange-500 mr-1" />
                <span className="text-sm font-medium text-orange-600">Recently registered</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <UserPlus className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Critical</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.critical}</p>
              <div className="flex items-center mt-2">
                <AlertCircle className="h-3 w-3 text-red-500 mr-1" />
                <span className="text-sm font-medium text-red-600">Requires attention</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <Heart className="text-white" size={20} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Admitted</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.admitted}</p>
              <div className="flex items-center mt-2">
                <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">In hospital</span>
              </div>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Calendar className="text-white" size={20} />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search patients by name, UHID, phone..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter size={16} className="mr-2" />
              Filter
            </button>
            <select 
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
              className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="critical">Critical</option>
              <option value="stable">Stable</option>
              <option value="recovering">Recovering</option>
            </select>
          </div>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <div>
              <p className="text-red-800 font-medium">Error loading patients</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Patients Grid */}
      {patients.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {patients.map((patient) => (
            <div key={patient.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${getGradientColors(patient.name)} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                    {getInitials(patient.name)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-semibold text-gray-900">{patient.name}</h3>
                    <div className="flex items-center gap-2">
                      <Hash className="h-3 w-3 text-gray-400" />
                      <p className="text-sm text-orange-600 font-mono">{patient.patient_id}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                    {patient.status?.charAt(0).toUpperCase() + patient.status?.slice(1) || 'Active'}
                  </span>
                  <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical size={16} className="text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar size={14} className="mr-2" />
                  Age: {calculateAge(patient.date_of_birth)} • {patient.gender?.charAt(0).toUpperCase() + patient.gender?.slice(1)} • {patient.blood_group || 'Unknown'}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={14} className="mr-2" />
                  {patient.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={14} className="mr-2" />
                  {getTruncatedText(patient.address, 35)}
                </div>
              </div>

              {patient.primary_complaint && (
                <div className="bg-orange-50 rounded-xl p-3 mb-4">
                  <p className="text-xs font-medium text-orange-700 mb-1">Primary Complaint</p>
                  <p className="text-sm text-orange-900">{getTruncatedText(patient.primary_complaint, 50)}</p>
                </div>
              )}

              {patient.department_ward && (
                <div className="bg-blue-50 rounded-xl p-3 mb-4">
                  <p className="text-xs font-medium text-blue-700 mb-1">Current Department</p>
                  <p className="text-sm text-blue-900">{patient.department_ward} {patient.room_number && `- ${patient.room_number}`}</p>
                </div>
              )}

              {patient.allergies && (
                <div className="bg-red-50 rounded-xl p-3 mb-4 border border-red-200">
                  <p className="text-xs font-medium text-red-700 mb-1 flex items-center">
                    <AlertCircle size={12} className="mr-1" />
                    Allergies
                  </p>
                  <p className="text-sm text-red-900">{getTruncatedText(patient.allergies, 40)}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Link href={`/patients/${patient.patient_id}`} className="flex-1">
                  <button className="w-full flex items-center justify-center bg-orange-50 text-orange-600 py-2 px-3 rounded-xl text-sm font-medium hover:bg-orange-100 transition-colors">
                    <Eye size={14} className="mr-1" />
                    View
                  </button>
                </Link>
                <button 
                  onClick={() => router.push(`/patients/${patient.patient_id}/edit`)}
                  className="flex-1 flex items-center justify-center bg-gray-50 text-gray-700 py-2 px-3 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  <Edit3 size={14} className="mr-1" />
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || statusFilter ? 'Try adjusting your search or filters.' : 'Start by registering your first patient.'}
            </p>
            <Link href="/patients/register">
              <button className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors font-medium">
                Register New Patient
              </button>
            </Link>
          </div>
        )
      )}

      {/* Pagination could be added here */}
      {totalPatients > 20 && (
        <div className="flex justify-center">
          <div className="bg-white rounded-xl border border-gray-200 p-2">
            <p className="text-sm text-gray-600 px-4 py-2">
              Showing {patients.length} of {totalPatients} patients
            </p>
          </div>
        </div>
      )}
    </div>
  );
}