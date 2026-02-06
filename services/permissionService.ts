import { User, ModuleType, ActionType, Permission, Role } from '../types';

const ROLE_PERMISSIONS: Record<string, Role> = {
  ADMIN: {
    id: 'role-admin',
    name: 'Administrador',
    description: 'Acesso completo a todos os módulos',
    permissions: [
      { id: 'p1', module: ModuleType.DASHBOARD, action: ActionType.VIEW, description: 'Visualizar Dashboard' },
      { id: 'p2', module: ModuleType.INVOICE_MANAGEMENT, action: ActionType.VIEW, description: 'Visualizar Faturas' },
      { id: 'p3', module: ModuleType.INVOICE_MANAGEMENT, action: ActionType.CREATE, description: 'Criar Faturas' },
      { id: 'p4', module: ModuleType.INVOICE_MANAGEMENT, action: ActionType.EDIT, description: 'Editar Faturas' },
      { id: 'p5', module: ModuleType.INVOICE_MANAGEMENT, action: ActionType.DELETE, description: 'Deletar Faturas' },
      { id: 'p6', module: ModuleType.LOAD_MAPS, action: ActionType.VIEW, description: 'Visualizar Mapas de Carga' },
      { id: 'p7', module: ModuleType.LOAD_MAPS, action: ActionType.CREATE, description: 'Criar Mapas de Carga' },
      { id: 'p8', module: ModuleType.LOAD_MAPS, action: ActionType.EDIT, description: 'Editar Mapas de Carga' },
      { id: 'p9', module: ModuleType.LOAD_MAPS, action: ActionType.DELETE, description: 'Deletar Mapas de Carga' },
      { id: 'p10', module: ModuleType.LOAD_MAPS, action: ActionType.EXPORT, description: 'Exportar Mapas de Carga' },
      { id: 'p11', module: ModuleType.SEPARATION, action: ActionType.VIEW, description: 'Visualizar Separação' },
      { id: 'p12', module: ModuleType.SEPARATION, action: ActionType.EDIT, description: 'Editar Separação' },
      { id: 'p13', module: ModuleType.SEPARATION, action: ActionType.APPROVE, description: 'Aprovar Separação' },
      { id: 'p14', module: ModuleType.OPERATION, action: ActionType.VIEW, description: 'Visualizar Operação' },
      { id: 'p15', module: ModuleType.OPERATION, action: ActionType.EDIT, description: 'Editar Operação' },
      { id: 'p16', module: ModuleType.ADMIN, action: ActionType.VIEW, description: 'Visualizar Admin' },
      { id: 'p17', module: ModuleType.ADMIN, action: ActionType.EDIT, description: 'Editar Admin' },
      { id: 'p18', module: ModuleType.SETTINGS, action: ActionType.VIEW, description: 'Visualizar Configurações' },
      { id: 'p19', module: ModuleType.SETTINGS, action: ActionType.EDIT, description: 'Editar Configurações' },
    ],
  },
  LOGISTICA_PLANEJAMENTO: {
    id: 'role-planning',
    name: 'Logística - Planejamento',
    description: 'Acesso a planejamento de cargas',
    permissions: [
      { id: 'p1', module: ModuleType.DASHBOARD, action: ActionType.VIEW, description: 'Visualizar Dashboard' },
      { id: 'p2', module: ModuleType.INVOICE_MANAGEMENT, action: ActionType.VIEW, description: 'Visualizar Faturas' },
      { id: 'p3', module: ModuleType.INVOICE_MANAGEMENT, action: ActionType.EDIT, description: 'Editar Faturas' },
      { id: 'p6', module: ModuleType.LOAD_MAPS, action: ActionType.VIEW, description: 'Visualizar Mapas de Carga' },
      { id: 'p7', module: ModuleType.LOAD_MAPS, action: ActionType.CREATE, description: 'Criar Mapas de Carga' },
      { id: 'p8', module: ModuleType.LOAD_MAPS, action: ActionType.EDIT, description: 'Editar Mapas de Carga' },
      { id: 'p10', module: ModuleType.LOAD_MAPS, action: ActionType.EXPORT, description: 'Exportar Mapas de Carga' },
      { id: 'p11', module: ModuleType.SEPARATION, action: ActionType.VIEW, description: 'Visualizar Separação' },
    ],
  },
  SEPARACAO: {
    id: 'role-separation',
    name: 'Separação',
    description: 'Acesso a separação de itens',
    permissions: [
      { id: 'p1', module: ModuleType.DASHBOARD, action: ActionType.VIEW, description: 'Visualizar Dashboard' },
      { id: 'p11', module: ModuleType.SEPARATION, action: ActionType.VIEW, description: 'Visualizar Separação' },
      { id: 'p12', module: ModuleType.SEPARATION, action: ActionType.EDIT, description: 'Editar Separação' },
    ],
  },
  STATUS_OPERACAO: {
    id: 'role-operation',
    name: 'Status - Operação',
    description: 'Acesso a monitoramento de operações',
    permissions: [
      { id: 'p1', module: ModuleType.DASHBOARD, action: ActionType.VIEW, description: 'Visualizar Dashboard' },
      { id: 'p6', module: ModuleType.LOAD_MAPS, action: ActionType.VIEW, description: 'Visualizar Mapas de Carga' },
      { id: 'p14', module: ModuleType.OPERATION, action: ActionType.VIEW, description: 'Visualizar Operação' },
      { id: 'p15', module: ModuleType.OPERATION, action: ActionType.EDIT, description: 'Editar Operação' },
    ],
  },
};

export const getPermissionsForUser = (user: User): Permission[] => {
  const role = ROLE_PERMISSIONS[user.role];
  if (!role) return [];
  return role.permissions;
};

export const canUserAccess = (
  user: User,
  module: ModuleType,
  action: ActionType = ActionType.VIEW
): boolean => {
  const permissions = getPermissionsForUser(user);
  return permissions.some(
    (p) => p.module === module && p.action === action
  );
};

export const canViewModule = (user: User, module: ModuleType): boolean => {
  return canUserAccess(user, module, ActionType.VIEW);
};

export const canCreateInModule = (user: User, module: ModuleType): boolean => {
  return canUserAccess(user, module, ActionType.CREATE);
};

export const canEditInModule = (user: User, module: ModuleType): boolean => {
  return canUserAccess(user, module, ActionType.EDIT);
};

export const canDeleteInModule = (user: User, module: ModuleType): boolean => {
  return canUserAccess(user, module, ActionType.DELETE);
};

export const canApproveInModule = (user: User, module: ModuleType): boolean => {
  return canUserAccess(user, module, ActionType.APPROVE);
};

export const canExportFromModule = (user: User, module: ModuleType): boolean => {
  return canUserAccess(user, module, ActionType.EXPORT);
};

export const getAccessibleModules = (user: User): ModuleType[] => {
  const permissions = getPermissionsForUser(user);
  const modules = new Set<ModuleType>();
  permissions.forEach((p) => {
    if (p.action === ActionType.VIEW) {
      modules.add(p.module);
    }
  });
  return Array.from(modules);
};

export const getRoleInfo = (roleId: string): Role | undefined => {
  return ROLE_PERMISSIONS[roleId];
};

export const getAllRoles = (): Role[] => {
  return Object.values(ROLE_PERMISSIONS);
};
