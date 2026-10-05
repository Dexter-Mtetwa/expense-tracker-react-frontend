import React, { useState, useEffect } from 'react';
import Badge from '../UI/Badge';
import { SkeletonTable } from '../UI/LoadingSkeleton';
import { Users, ShieldCheck, Mail, Calendar, ShieldAlert } from 'lucide-react';
import { fetchUsers } from '../../services/userService';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';

export default function UsersView() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAdmin } = useAuth();
  const { addToast } = useToast();

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data || []);
    } catch (err) {
      addToast(err.message || 'Error fetching users from server', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return (
      <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <ShieldAlert size={40} style={{ color: 'var(--danger)', marginBottom: '0.75rem' }} />
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)' }}>Access Restricted</h3>
        <p style={{ fontSize: '0.8125rem', marginTop: '0.25rem' }}>
          The User Directory endpoint (<code>GET /api/v1/users</code>) requires the <strong>ADMIN</strong> role.
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Users size={22} style={{ color: 'var(--primary)' }} />
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            System User Directory ({users.length})
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Role-Based Access Control (RBAC) Admin view
          </span>
        </div>
      </div>

      {loading ? (
        <SkeletonTable />
      ) : (
        <div className="card" style={{ overflow: 'hidden' }}>
          <div className="table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Email Address</th>
                  <th>Role</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                      {u.id}
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        <Mail size={14} style={{ color: 'var(--text-muted)' }} />
                        <span>{u.email}</span>
                      </div>
                    </td>
                    <td>
                      <Badge variant={u.role === 'ADMIN' ? 'primary' : 'success'} icon={u.role === 'ADMIN' ? ShieldCheck : undefined}>
                        {u.role}
                      </Badge>
                    </td>
                    <td style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                        <span>{new Date(u.created_at).toLocaleString()}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
