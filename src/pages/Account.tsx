import { PageHeader } from "../components/PageHeader";
import { Card } from "../components/Card";

export function Account() {
  return (
    <main id="account" className="max-w-2xl mx-auto px-6 pt-10 pb-48">
      <PageHeader
        title="Account"
        subtitle="Manage your profile and subscription."
      />

      <Card id="profile" title="Profile">
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-11 h-11 rounded-full bg-brand text-white flex items-center justify-center font-semibold text-[15px]">
            JD
          </div>
          <div>
            <div className="font-semibold">Jane Doe</div>
            <div className="text-muted text-sm">jane@example.com</div>
          </div>
        </div>
        <dl>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-muted">Member since</dt>
            <dd className="font-medium">March 2024</dd>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-muted">Two-factor auth</dt>
            <dd className="font-medium text-green-600">Enabled</dd>
          </div>
        </dl>
      </Card>

      <Card id="billing" title="Billing">
        <dl>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-slate-500">Plan</dt>
            <dd className="font-medium">
              <span className="inline-block rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-white">
                Pro
              </span>{" "}
              — $59/mo
            </dd>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-slate-500">Renews</dt>
            <dd className="font-medium">July 1, 2026</dd>
          </div>
          <div className="flex justify-between py-2 border-t border-slate-100 text-sm">
            <dt className="text-slate-500">Payment method</dt>
            <dd className="font-medium">Visa ending 4242</dd>
          </div>
        </dl>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <button className="text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg px-4 py-2 transition-colors">
            Cancel subscription
          </button>
        </div>
      </Card>
    </main>
  );
}
