import { createClient } from '@supabase/supabase-js';
import { Problem } from '../types';

const env = (import.meta as any).env || {};
const SUPABASE_URL =
  env.VITE_SUPABASE_URL || 'https://yepjhuuvdqfrbfjagciz.supabase.co';
const SUPABASE_ANON_KEY =
  env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_HxD1DaFKucxcvzLl_UqNMw_-9k4rd-P';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface SupabaseProblemRow {
  id: string;
  title: string;
  description: string;
  category?: string;
  district?: string;
  state?: string;
  location_details?: string;
  people_affected?: number;
  severity?: string;
  status?: string;
  submitted_by_name?: string;
  submitted_by_contact?: string;
  submitted_date?: string;
  cluster_id?: string;
  cluster_name?: string;
  images?: string[];
  problem_dna?: any;
  created_at?: string;
  locationDetails?: string;
  peopleAffected?: number;
  submittedByName?: string;
  submittedByContact?: string;
  submittedDate?: string;
  clusterId?: string;
  clusterName?: string;
  problemDna?: any;
}

/**
 * Save a newly reported problem to Supabase backend table with offline-resilience
 */
export async function saveProblemToSupabase(problem: Problem): Promise<{ success: boolean; isOfflineSaved?: boolean; error?: any }> {
  const rowData: Record<string, any> = {
    id: problem.id,
    title: problem.title,
    description: problem.description,
    category: problem.category,
    district: problem.district,
    state: problem.state,
    location_details: problem.locationDetails,
    people_affected: problem.peopleAffected,
    severity: problem.severity,
    status: problem.status,
    submitted_by_name: problem.submittedBy?.name,
    submitted_by_contact: problem.submittedBy?.phoneOrEmail,
    submitted_date: problem.submittedDate,
    cluster_id: problem.clusterId,
    cluster_name: problem.clusterName,
    images: problem.images || [],
    problem_dna: problem.problemDna || null,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('problems')
      .upsert(rowData, { onConflict: 'id' })
      .select();

    if (error) {
      // Check if it's a schema mismatch (e.g. column names with camelCase)
      if (error.message && !error.message.includes('fetch') && !error.message.includes('Network')) {
        const fallbackRow: Record<string, any> = {
          id: problem.id,
          title: problem.title,
          description: problem.description,
          category: problem.category,
          district: problem.district,
          state: problem.state,
          locationDetails: problem.locationDetails,
          peopleAffected: problem.peopleAffected,
          severity: problem.severity,
          status: problem.status,
          submittedByName: problem.submittedBy?.name,
          submittedByContact: problem.submittedBy?.phoneOrEmail,
          submittedDate: problem.submittedDate,
          clusterId: problem.clusterId,
          clusterName: problem.clusterName,
          images: problem.images || [],
          problemDna: problem.problemDna || null
        };

        const { error: fallbackError } = await supabase
          .from('problems')
          .upsert(fallbackRow, { onConflict: 'id' });

        if (!fallbackError) {
          return { success: true };
        }
      }

      console.info('[Supabase Sync Notice] Remote sync deferred:', error.message || 'Network unavailable');
      // Store in pending queue in localStorage so it can sync when online
      saveToOfflineQueue(rowData);
      return { success: true, isOfflineSaved: true };
    }

    console.info('[Supabase] Problem successfully synchronized with cloud database:', data);
    return { success: true };
  } catch (err: any) {
    console.info('[Supabase Sync Notice] Cloud sync deferred (saved locally):', err?.message || err);
    saveToOfflineQueue(rowData);
    return { success: true, isOfflineSaved: true };
  }
}

function saveToOfflineQueue(row: Record<string, any>) {
  try {
    const raw = localStorage.getItem('samasya_offline_queue');
    const queue = raw ? JSON.parse(raw) : [];
    const exists = queue.some((item: any) => item.id === row.id);
    if (!exists) {
      queue.push(row);
      localStorage.setItem('samasya_offline_queue', JSON.stringify(queue));
    }
  } catch {
    // ignore local storage errors
  }
}

/**
 * Fetch all reported problems from Supabase with safe fallback
 */
export async function fetchProblemsFromSupabase(): Promise<Problem[] | null> {
  try {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return null;
    }

    if (!data || data.length === 0) {
      return null;
    }

    const mapped: Problem[] = data.map((row: any) => ({
      id: row.id,
      title: row.title,
      description: row.description,
      category: row.category || 'Water & Sanitation',
      district: row.district || 'Unspecified',
      state: row.state || 'Jharkhand',
      locationDetails: row.location_details || row.locationDetails || '',
      submittedBy: {
        name: row.submitted_by_name || row.submittedByName || 'Citizen',
        phoneOrEmail: row.submitted_by_contact || row.submittedByContact || '',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80'
      },
      submittedDate: row.submitted_date || row.submittedDate || new Date().toISOString().split('T')[0],
      peopleAffected: row.people_affected || row.peopleAffected || 100,
      severity: row.severity || 'Medium',
      status: row.status || 'Submitted',
      stageProgress: 10,
      clusterId: row.cluster_id || row.clusterId,
      clusterName: row.cluster_name || row.clusterName,
      images: row.images || [],
      problemDna: row.problem_dna || row.problemDna,
      tasks: [],
      industryPartners: [],
      feedback: []
    }));

    return mapped;
  } catch {
    return null;
  }
}
