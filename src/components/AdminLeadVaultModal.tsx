import { useState, type ReactElement } from 'react';
import { Download, X, Database, ShieldAlert, Trash2 } from 'lucide-react';
import { getStoredLeads } from '../lib/leadPersistence';
import { type PersistedLead } from '../features/contact/types';
import { content } from '../content';

export interface AdminLeadVaultModalProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

export default function AdminLeadVaultModal({ isOpen, onClose }: AdminLeadVaultModalProps): ReactElement | null {
    if (!isOpen) {
        return null;
    }

    return <AdminLeadVaultContent onClose={onClose} />;
}

function AdminLeadVaultContent({ onClose }: { readonly onClose: () => void }): ReactElement {
    const [leads, setLeads] = useState<PersistedLead[]>(() => getStoredLeads());

    const exportCsv = () => {
        if (leads.length === 0) return;

        const headers = [
            'ID',
            'Timestamp',
            'Name',
            'Phone',
            'Intent',
            'PropertyType',
            'Location',
            'Budget',
            'Agent',
            'Status',
        ];

        const rows = leads.map(l => [
            `"${l.id}"`,
            `"${l.timestamp}"`,
            `"${l.name.replace(/"/g, '""')}"`,
            `"${l.phone}"`,
            `"${l.intent}"`,
            `"${l.propertyType}"`,
            `"${l.location.replace(/"/g, '""')}"`,
            `"${l.budget}"`,
            `"${l.agent}"`,
            `"${l.status}"`,
        ]);

        const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `gull-leads-vault-${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const clearVault = () => {
        if (window.confirm('Are you sure you want to clear archived local leads?')) {
            try {
                localStorage.removeItem('gull_leads');
                setLeads([]);
            } catch {
                // Ignore storage errors
            }
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="vault-title"
        >
            <div className="bg-ds-surface border border-ds-border-strong w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl rounded-none">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-ds-border">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-ds-primary-muted border border-ds-primary/30 flex items-center justify-center">
                            <Database className="w-5 h-5 text-ds-primary" />
                        </div>
                        <div>
                            <h2 id="vault-title" className="font-headline font-bold text-lg text-ds-on">
                                {content.adminLeadVault}
                            </h2>
                            <p className="text-xs text-ds-on-faint">
                                {content.adminLeadVaultDesc}
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-ds-on-faint hover:text-ds-on p-1 cursor-pointer"
                        aria-label="Close modal"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-5 overflow-y-auto flex-1 space-y-4">
                    {leads.length === 0 ? (
                        <div className="text-center py-12 text-ds-on-faint space-y-2">
                            <ShieldAlert className="w-10 h-10 mx-auto text-ds-on-faint/50" />
                            <p className="text-sm">{content.noSavedLeads}</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs border border-ds-border">
                                <thead className="bg-ds-surface-low border-b border-ds-border font-headline uppercase tracking-wider text-ds-on-faint">
                                    <tr>
                                        <th className="p-2.5">Lead ID</th>
                                        <th className="p-2.5">Client</th>
                                        <th className="p-2.5">Intent</th>
                                        <th className="p-2.5">Location</th>
                                        <th className="p-2.5">Budget</th>
                                        <th className="p-2.5">Agent</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-ds-border font-body">
                                    {leads.map(lead => (
                                        <tr key={lead.id} className="hover:bg-ds-surface-high/50 transition-colors">
                                            <td className="p-2.5 font-mono text-ds-secondary font-semibold">
                                                {lead.id}
                                            </td>
                                            <td className="p-2.5 text-ds-on font-medium">
                                                <div>{lead.name}</div>
                                                <div className="text-[11px] font-mono text-ds-on-faint">{lead.phone}</div>
                                            </td>
                                            <td className="p-2.5 capitalize text-ds-primary font-semibold">
                                                {lead.intent}
                                            </td>
                                            <td className="p-2.5 text-ds-on-faint">
                                                {lead.location}
                                            </td>
                                            <td className="p-2.5 text-ds-on-faint">
                                                {lead.budget}
                                            </td>
                                            <td className="p-2.5 text-ds-on">
                                                {lead.agent}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Footer Controls */}
                <div className="p-4 border-t border-ds-border bg-ds-surface-low flex items-center justify-between flex-wrap gap-2">
                    <div className="text-xs text-ds-on-faint font-headline">
                        Total Archived: <span className="font-bold text-ds-on">{leads.length}</span> leads
                    </div>

                    <div className="flex items-center gap-2">
                        {leads.length > 0 && (
                            <>
                                <button
                                    type="button"
                                    onClick={clearVault}
                                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs border border-ds-error/30 text-ds-error hover:bg-ds-error/10 font-headline uppercase tracking-wider cursor-pointer"
                                >
                                    <Trash2 className="w-3.5 h-3.5" />
                                    Clear
                                </button>
                                <button
                                    type="button"
                                    onClick={exportCsv}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs bg-ds-primary text-ds-primary-dark hover:bg-ds-primary/90 font-headline font-bold uppercase tracking-wider cursor-pointer shadow"
                                >
                                    <Download className="w-3.5 h-3.5" />
                                    {content.exportCsv}
                                </button>
                            </>
                        )}
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-xs bg-ds-surface-high border border-ds-border text-ds-on hover:border-ds-primary/40 font-headline uppercase tracking-wider cursor-pointer"
                        >
                            {content.closeVault}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
