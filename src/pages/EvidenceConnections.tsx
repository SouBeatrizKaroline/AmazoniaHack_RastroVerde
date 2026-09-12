import React, { useState } from 'react'
import { useI18n } from '@/lib/i18n'
import {
  Network,
  Info,
  Layers,
  MapPin,
  Camera,
  FileText,
  User,
  AlertTriangle,
  Compass,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export const EvidenceConnections: React.FC = () => {
  const { t } = useI18n()
  const [selectedNode, setSelectedNode] = useState<string>('evd-014')

  const nodes = [
    { id: 'insp', label: 'RV-DEMO-001', type: 'Fiscalização', x: 400, y: 150, color: '#1B5E3A' },
    { id: 'loc-1', label: 'APA Setor Norte', type: 'Local', x: 200, y: 80, color: '#0F766E' },
    {
      id: 'evd-014',
      label: 'EVD-014 (Foto)',
      type: 'Evidência',
      x: 260,
      y: 260,
      color: '#1B5E3A',
      ref: 'Vegetação suprimida',
    },
    {
      id: 'evd-015',
      label: 'EVD-015 (Foto)',
      type: 'Evidência',
      x: 380,
      y: 320,
      color: '#1B5E3A',
      ref: 'Esteira de trator',
    },
    {
      id: 'evd-016',
      label: 'EVD-016 (Foto)',
      type: 'Evidência',
      x: 520,
      y: 300,
      color: '#1B5E3A',
      ref: 'Toras empilhadas',
    },
    {
      id: 'doc-003',
      label: 'DOC-003 (CAR)',
      type: 'Documento',
      x: 620,
      y: 170,
      color: '#B45309',
      ref: 'Notificação pendente',
    },
    { id: 'usr-01', label: 'Agente Beatriz', type: 'Pessoas', x: 560, y: 80, color: '#143028' },
    {
      id: 'usr-02',
      label: 'Trabalhador Rural',
      type: 'Pessoas',
      x: 180,
      y: 340,
      color: '#143028',
      ref: 'Depoimento informal',
    },
    { id: 'occ-1', label: 'Desmatamento', type: 'Ocorrência', x: 400, y: 40, color: '#B3261E' },
  ]

  const links = [
    { from: 'insp', to: 'occ-1' },
    { from: 'insp', to: 'loc-1' },
    { from: 'insp', to: 'usr-01' },
    { from: 'insp', to: 'evd-014' },
    { from: 'insp', to: 'evd-015' },
    { from: 'insp', to: 'evd-016' },
    { from: 'insp', to: 'doc-003' },
    { from: 'evd-014', to: 'loc-1' },
    { from: 'evd-015', to: 'evd-014' },
    { from: 'evd-016', to: 'doc-003' },
    { from: 'evd-014', to: 'usr-02' },
  ]

  const currentNode = nodes.find((n) => n.id === selectedNode) || nodes[2]

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B5E3A] mb-1">
            <Compass className="w-3.5 h-3.5" />
            <span>Relações de Causa e Efeito</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#143028]">
            {t('connections.title')}
          </h1>
          <p className="text-xs text-[#5B6B63] mt-1">{t('connections.subtitle')}</p>
        </div>

        <div className="text-xs text-[#5B6B63] bg-white px-3 py-1.5 rounded-lg border border-[#E2E8E4]">
          {t('map.demo_notice')}
        </div>
      </div>

      {/* Main Canvas and Details Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Graph Canvas */}
        <div className="lg:col-span-2 relative rounded-3xl border border-[#E2E8E4] bg-white p-4 shadow-xs overflow-hidden min-h-[440px]">
          <svg
            viewBox="0 0 800 420"
            className="w-full h-[420px] select-none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background pattern */}
            <defs>
              <pattern id="conn-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#E2E8E4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#conn-grid)" />

            {/* Links */}
            <g stroke="#E2E8E4" strokeWidth="2">
              {links.map((link, idx) => {
                const fromNode = nodes.find((n) => n.id === link.from)!
                const toNode = nodes.find((n) => n.id === link.to)!
                const isConnected = selectedNode === link.from || selectedNode === link.to

                return (
                  <line
                    key={idx}
                    x1={fromNode.x}
                    y1={fromNode.y}
                    x2={toNode.x}
                    y2={toNode.y}
                    stroke={isConnected ? '#1B5E3A' : '#E2E8E4'}
                    strokeWidth={isConnected ? 3 : 1.5}
                    strokeDasharray={isConnected ? 'none' : '4,4'}
                    className="transition-all duration-300"
                  />
                )
              })}
            </g>

            {/* Nodes */}
            {nodes.map((node) => {
              const isSelected = selectedNode === node.id
              return (
                <g
                  key={node.id}
                  onClick={() => setSelectedNode(node.id)}
                  className="cursor-pointer transition-transform hover:scale-110"
                >
                  {isSelected && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r="28"
                      fill={node.color}
                      fillOpacity="0.2"
                      className="animate-ping"
                    />
                  )}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={isSelected ? '20' : '16'}
                    fill={node.color}
                    stroke="#FFFFFF"
                    strokeWidth="3"
                    className="shadow-md"
                  />
                  <text
                    x={node.x}
                    y={node.y + 30}
                    textAnchor="middle"
                    fill="#143028"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    {node.label}
                  </text>
                  <text x={node.x} y={node.y + 42} textAnchor="middle" fill="#5B6B63" fontSize="9">
                    {node.type}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        {/* Selected Node Details Side Panel */}
        <div className="rounded-3xl border border-[#E2E8E4] bg-white p-6 shadow-xs space-y-4">
          <div className="border-b border-[#E2E8E4] pb-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#5B6B63]">
              Elemento Selecionado
            </span>
            <h2 className="text-lg font-bold text-[#143028] mt-1">{currentNode.label}</h2>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#E7F2EC] text-[#1B5E3A]">
              Tipo: {currentNode.type}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            {currentNode.ref && (
              <div className="p-3 rounded-xl bg-[#F7F9F8] border border-[#E2E8E4] space-y-1">
                <span className="font-semibold text-[#143028]">Vínculo de Campo:</span>
                <p className="text-[#5B6B63]">{currentNode.ref}</p>
              </div>
            )}

            <div>
              <span className="font-semibold text-[#143028]">Conexões Diretas:</span>
              <ul className="mt-2 space-y-1.5 text-[11px] text-[#5B6B63]">
                {links
                  .filter((l) => l.from === selectedNode || l.to === selectedNode)
                  .map((l, idx) => {
                    const otherId = l.from === selectedNode ? l.to : l.from
                    const other = nodes.find((n) => n.id === otherId)
                    return (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B5E3A]" />
                        <span>
                          Conectado a: <strong>{other?.label}</strong> ({other?.type})
                        </span>
                      </li>
                    )
                  })}
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8E4] text-[11px] text-[#5B6B63]">
            Clique em qualquer nó do grafo para auditar suas correlações e ramificações dentro do
            caso ambiental.
          </div>
        </div>
      </div>
    </div>
  )
}
export default EvidenceConnections
