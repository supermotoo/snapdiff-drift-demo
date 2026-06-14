import { PageHeader } from '../components/PageHeader';
import { Card } from '../components/Card';

export function Settings() {
  return (
    <main id="settings" className="max-w-2xl mx-auto px-6 pt-10 pb-48">
      <PageHeader title="Settings" subtitle="Configure notifications and security." />

      <Card id="notifications" title="Notifications">
        <dl>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-muted">Product updates</dt>
            <dd className="font-medium text-green-600">On</dd>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-muted">Weekly digest</dt>
            <dd className="font-medium text-green-600">On</dd>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-muted">Marketing emails</dt>
            <dd className="font-medium text-slate-400">Off</dd>
          </div>
        </dl>
      </Card>

      <Card id="security" title="Security">
        <dl>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-muted">Password</dt>
            <dd className="font-medium">Updated 2 months ago</dd>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-muted">Two-factor auth</dt>
            <dd className="font-medium text-green-600">Enabled</dd>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-muted">Active sessions</dt>
            <dd className="font-medium">3 devices</dd>
          </div>
        </dl>
      </Card>
    </main>
  );
}
