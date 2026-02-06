import React, { useState } from 'react';
import { User, ModuleType, ActionType, Permission, Role } from '../types';
import { getAllRoles, getRoleInfo } from '../services/permissionService';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';

interface PermissionsManagerProps {
  selectedUser: User | null;
  allUsers: User[];
}

export const PermissionsManager: React.FC<PermissionsManagerProps> = ({
  selectedUser,
  allUsers,
}) => {
  const [expandedRoles, setExpandedRoles] = useState<Set<string>>(new Set());
  const roles = getAllRoles();

  const toggleRoleExpanded = (roleId: string) => {
    const newExpanded = new Set(expandedRoles);
    if (newExpanded.has(roleId)) {
      newExpanded.delete(roleId);
    } else {
      newExpanded.add(roleId);
    }
    setExpandedRoles(newExpanded);
  };

  const getModuleLabel = (module: ModuleType): string => {
    const labels: Record<ModuleType, string> = {
      [ModuleType.DASHBOARD]: 'Dashboard',
      [ModuleType.INVOICE_MANAGEMENT]: 'Gerenciamento de Faturas',
      [ModuleType.LOAD_MAPS]: 'Mapas de Carga',
      [ModuleType.SEPARATION]: 'Separação',
      [ModuleType.OPERATION]: 'Operação',
      [ModuleType.ADMIN]: 'Administração',
      [ModuleType.SETTINGS]: 'Configurações',
    };
    return labels[module];
  };

  const getActionLabel = (action: ActionType): string => {
    const labels: Record<ActionType, string> = {
      [ActionType.VIEW]: 'Visualizar',
      [ActionType.CREATE]: 'Criar',
      [ActionType.EDIT]: 'Editar',
      [ActionType.DELETE]: 'Deletar',
      [ActionType.APPROVE]: 'Aprovar',
      [ActionType.EXPORT]: 'Exportar',
    };
    return labels[action];
  };

  if (!selectedUser) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-border/50 text-center text-text-secondary">
        <p className="text-lg font-bold">Selecione um usuário para visualizar suas permissões</p>
      </div>
    );
  }

  const userRole = selectedUser.role;
  const roleInfo = getRoleInfo(userRole);

  if (!roleInfo) {
    return (
      <div className="bg-white rounded-3xl p-8 border border-border/50 text-center text-red-500">
        <p className="text-lg font-bold">Cargo não encontrado</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-8 border border-border/50">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-text-main mb-2">{selectedUser.name}</h3>
          <p className="text-text-secondary">
            Cargo: <span className="font-bold text-primary">{roleInfo.name}</span>
          </p>
          <p className="text-sm text-text-light mt-2">{roleInfo.description}</p>
        </div>

        <div className="space-y-4">
          <h4 className="text-lg font-bold text-text-main">Permissões Ativas</h4>

          {Object.values(ModuleType).map((module) => {
            const modulePermissions = roleInfo.permissions.filter(
              (p) => p.module === module
            );

            if (modulePermissions.length === 0) return null;

            return (
              <div
                key={module}
                className="border border-border/50 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleRoleExpanded(module)}
                  className="w-full px-6 py-4 bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-text-main">
                      {getModuleLabel(module)}
                    </span>
                    <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {modulePermissions.length} permissões
                    </span>
                  </div>
                  {expandedRoles.has(module) ? (
                    <ChevronUp size={20} className="text-text-secondary" />
                  ) : (
                    <ChevronDown size={20} className="text-text-secondary" />
                  )}
                </button>

                {expandedRoles.has(module) && (
                  <div className="px-6 py-4 bg-white space-y-3 border-t border-border/50">
                    {modulePermissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                      >
                        <Check size={20} className="text-green-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-sm text-text-main">
                            {getActionLabel(permission.action)}
                          </p>
                          <p className="text-xs text-text-light">
                            {permission.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-3xl p-8">
        <h4 className="text-lg font-bold text-blue-900 mb-3">Informações sobre Permissões</h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>As permissões são atribuídas por cargo (role)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>Cada cargo possui um conjunto de permissões predefinidas</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>Alterações de cargo refletem imediatamente nas permissões</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold mt-0.5">•</span>
            <span>Cargos de administrador têm acesso completo</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
