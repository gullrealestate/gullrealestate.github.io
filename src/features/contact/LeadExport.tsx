import { useTranslation } from '../../lib/i18n/useTranslation';
import { Download } from 'lucide-react';

const LEADS_KEY = 'gull_leads';

export default function LeadExport() {
    const { t } = useTranslation();

    const handleExport = () => {
        const leadsRaw = sessionStorage.getItem(LEADS_KEY);
        if (!leadsRaw) {
            alert(t.noLeadsToExport);
            return;
        }

        const leads = JSON.parse(leadsRaw) as Record<string, string>[];
        if (leads.length === 0) {
            alert(t.noLeadsToExport);
            return;
        }

        const headers = Object.keys(leads[0]);
        const csvRows = [
            headers.join(','),
            ...leads.map(lead =>
                headers.map(h => `"${(lead[h] || '').replace(/"/g, '""')}"`).join(',')
            )
        ];

        const csvContent = csvRows.join('\n');
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `gull-leads-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-gruvbox-bg2 text-gruvbox-fg/70 font-medium py-2 px-4 rounded-xl border border-gruvbox-bg3 hover:bg-gruvbox-bg3 hover:text-gruvbox-fg transition-all text-sm"
        >
            <Download className="h-4 w-4" />
            {t.exportLeads}
        </button>
    );
}
