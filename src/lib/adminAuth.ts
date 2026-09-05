import { supabase } from './supabase';

export interface AdminAccount {
  id: string;
  email: string;
  name: string;
  created_at: string;
  last_login?: string;
  role: 'super_admin';
}

const STORAGE_KEY_ADMIN_CLAIM = 'samasya_admin_account_v1';
const STORAGE_KEY_SESSION = 'samasya_admin_session_v1';

/**
 * Check if the single admin account slot is already claimed
 */
export async function getAdminAccountInfo(): Promise<{ isClaimed: boolean; account: AdminAccount | null }> {
  // 1. Check Supabase 'admin_users' table if accessible
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('id, email, name, created_at, last_login')
      .limit(1);

    if (!error && data && data.length > 0) {
      const acc: AdminAccount = {
        id: data[0].id,
        email: data[0].email,
        name: data[0].name || 'Super Admin',
        created_at: data[0].created_at || new Date().toISOString(),
        last_login: data[0].last_login,
        role: 'super_admin'
      };
      localStorage.setItem(STORAGE_KEY_ADMIN_CLAIM, JSON.stringify(acc));
      return { isClaimed: true, account: acc };
    }
  } catch (err) {
    // Network/table not present yet; fall through to local persistence
  }

  // 2. Fallback to localStorage persistence
  const local = localStorage.getItem(STORAGE_KEY_ADMIN_CLAIM);
  if (local) {
    try {
      const parsed: AdminAccount = JSON.parse(local);
      return { isClaimed: true, account: parsed };
    } catch {
      // ignore parse error
    }
  }

  return { isClaimed: false, account: null };
}

/**
 * Register / Claim the SINGLE admin slot.
 * If an admin already exists, this rejects any subsequent registration.
 */
export async function claimAdminSlot(params: {
  email: string;
  name: string;
  password: string;
}): Promise<{ success: boolean; error?: string; account?: AdminAccount }> {
  const current = await getAdminAccountInfo();
  if (current.isClaimed) {
    return {
      success: false,
      error: 'The single Admin slot has already been claimed. Only the registered administrator can log in.'
    };
  }

  const adminId = 'ADM-' + Math.random().toString(36).substring(2, 9).toUpperCase();
  const newAccount: AdminAccount = {
    id: adminId,
    email: params.email.trim().toLowerCase(),
    name: params.name.trim(),
    created_at: new Date().toISOString(),
    last_login: new Date().toISOString(),
    role: 'super_admin'
  };

  // Attempt to store in Supabase table if available
  try {
    await supabase.from('admin_users').insert({
      id: newAccount.id,
      email: newAccount.email,
      name: newAccount.name,
      password_hash: btoa(params.password),
      role: 'super_admin',
      created_at: newAccount.created_at,
      last_login: newAccount.last_login
    });
  } catch (err) {
    // Handled via local persistence below
  }

  // Persist locally
  localStorage.setItem(
    STORAGE_KEY_ADMIN_CLAIM,
    JSON.stringify({
      ...newAccount,
      password_hash: btoa(params.password)
    })
  );

  // Set active session
  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(newAccount));

  return { success: true, account: newAccount };
}

/**
 * Log into the claimed admin account
 */
export async function loginAdmin(params: {
  email: string;
  password: string;
}): Promise<{ success: boolean; error?: string; account?: AdminAccount }> {
  const normalizedEmail = params.email.trim().toLowerCase();
  const passwordHash = btoa(params.password);

  // 1. Try Supabase
  try {
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', normalizedEmail)
      .limit(1);

    if (!error && data && data.length > 0) {
      const user = data[0];
      if (user.password_hash === passwordHash || user.password === params.password) {
        const acc: AdminAccount = {
          id: user.id,
          email: user.email,
          name: user.name || 'Administrator',
          created_at: user.created_at || new Date().toISOString(),
          last_login: new Date().toISOString(),
          role: 'super_admin'
        };

        try {
          await supabase
            .from('admin_users')
            .update({ last_login: acc.last_login })
            .eq('id', user.id);
        } catch {
          // ignore
        }

        localStorage.setItem(STORAGE_KEY_ADMIN_CLAIM, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(acc));
        return { success: true, account: acc };
      } else {
        return { success: false, error: 'Incorrect password. Please verify your admin credentials.' };
      }
    }
  } catch (err) {
    // Network fallback
  }

  // 2. Local check
  const local = localStorage.getItem(STORAGE_KEY_ADMIN_CLAIM);
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (parsed.email === normalizedEmail) {
        if (parsed.password_hash === passwordHash) {
          const acc: AdminAccount = {
            id: parsed.id,
            email: parsed.email,
            name: parsed.name || 'Administrator',
            created_at: parsed.created_at,
            last_login: new Date().toISOString(),
            role: 'super_admin'
          };
          localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(acc));
          return { success: true, account: acc };
        } else {
          return { success: false, error: 'Incorrect password. Please verify your admin credentials.' };
        }
      }
    } catch {
      // ignore
    }
  }

  return {
    success: false,
    error: 'Admin account not found with this email. If not created yet, please set up the single admin account.'
  };
}

/**
 * Get current active admin session
 */
export function getActiveAdminSession(): AdminAccount | null {
  const session = localStorage.getItem(STORAGE_KEY_SESSION);
  if (!session) return null;
  try {
    return JSON.parse(session) as AdminAccount;
  } catch {
    return null;
  }
}

/**
 * Logout admin
 */
export function logoutAdmin(): void {
  localStorage.removeItem(STORAGE_KEY_SESSION);
}
