/**
 * Permission definitions for the system
 * This file defines all available permissions and their groupings
 */

/**
 * All available permissions in the system
 * Each permission should have a unique code and be categorized
 */
const PERMISSIONS = {
  // User Management
  CREATE_USER: "create_user",
  UPDATE_USER: "update_user",
  DELETE_USER: "delete_user",

  // Customer Management
  VIEW_CUSTOMERS: "view_customers",
  CREATE_CUSTOMERS: "create_customers",
  UPDATE_CUSTOMERS: "update_customers",
  DELETE_CUSTOMERS: "delete_customers",

  // Role Management
  CREATE_ROLE: "create_role",
  UPDATE_ROLE: "update_role",
  DELETE_ROLE: "delete_role",
  VIEW_ROLE: "view_role",
  ASSIGN_ROLE: "assign_role",

  // Ticket Management
  CREATE_TICKET: "create_ticket",
  UPDATE_TICKET: "update_ticket",
  DELETE_TICKET: "delete_ticket",
  VIEW_TICKET: "view_ticket",
  ASSIGN_TICKET: "assign_ticket",
  RESOLVE_TICKET: "resolve_ticket",
  APPROVE_TICKET: "approve_ticket",
  VIEW_ALL_CUSTOMERS: "view_all_customers",
  CREATE_NEW_CUSTOMER: "create_new_customer",

  // Problem Management
  CREATE_PROBLEM: "create_problem",
  UPDATE_PROBLEM: "update_problem",
  DELETE_PROBLEM: "delete_problem",
  VIEW_PROBLEM: "view_problem",

  // Installation Management
  CREATE_INSTALLATION: "create_installation",
  UPDATE_INSTALLATION: "update_installation",
  DELETE_INSTALLATION: "delete_installation",
  VIEW_INSTALLATION: "view_installation",
  ASSIGN_INSTALLATION: "assign_installation",
  COMPLETE_INSTALLATION: "complete_installation",

  // Inventory Management
  CREATE_ITEM: "create_item",
  UPDATE_ITEM: "update_item",
  DELETE_ITEM: "delete_item",
  VIEW_ITEM: "view_item",
  IMPORT_ITEMS: "import_items",
  MANAGE_INVENTORY: "manage_inventory",

  // System Settings
  MANAGE_SETTINGS: "manage_settings",
  VIEW_SETTINGS: "view_settings",
  VIEW_AUDIT_LOGS: "view_audit_logs",
  VIEW_ACTIVITY_LOGS: "view_activity_logs",

  VIEW_DASHBOARD: "view_dashboard",
  VIEW_CUSTOMER: "view_customer",
  VIEW_LOG: "view_log",
  VIEW_ROLE: "view_role",
  VIEW_TICKET: "view_ticket",
  VIEW_USER: "view_user",
};

/**
 * Permission groups for UI display and organization
 */
const PERMISSION_GROUPS = {
  USER_MANAGEMENT: {
    name: "User Management",
    permissions: [
      PERMISSIONS.CREATE_USER,
      PERMISSIONS.UPDATE_USER,
      PERMISSIONS.DELETE_USER,
      PERMISSIONS.VIEW_USER,
    ],
  },
  CUSTOMER_MANAGEMENT: {
    name: "Customer Management",
    permissions: [
      PERMISSIONS.VIEW_CUSTOMERS,
      PERMISSIONS.CREATE_CUSTOMERS,
      PERMISSIONS.UPDATE_CUSTOMERS,
      PERMISSIONS.DELETE_CUSTOMERS,
    ],
  },
  ROLE_MANAGEMENT: {
    name: "Role Management",
    permissions: [
      PERMISSIONS.CREATE_ROLE,
      PERMISSIONS.UPDATE_ROLE,
      PERMISSIONS.DELETE_ROLE,
      PERMISSIONS.VIEW_ROLE,
      PERMISSIONS.ASSIGN_ROLE,
    ],
  },
  TICKET_MANAGEMENT: {
    name: "Ticket Management",
    permissions: [
      PERMISSIONS.CREATE_TICKET,
      PERMISSIONS.UPDATE_TICKET,
      PERMISSIONS.DELETE_TICKET,
      PERMISSIONS.VIEW_TICKET,
      PERMISSIONS.ASSIGN_TICKET,
      PERMISSIONS.RESOLVE_TICKET,
      PERMISSIONS.APPROVE_TICKET,
      PERMISSIONS.VIEW_ALL_CUSTOMERS,
      PERMISSIONS.CREATE_NEW_CUSTOMER,
    ],
  },
  PROBLEM_MANAGEMENT: {
    name: "Problem Management",
    permissions: [
      PERMISSIONS.CREATE_PROBLEM,
      PERMISSIONS.UPDATE_PROBLEM,
      PERMISSIONS.DELETE_PROBLEM,
      PERMISSIONS.VIEW_PROBLEM,
    ],
  },
  INSTALLATION_MANAGEMENT: {
    name: "Installation Management",
    permissions: [
      PERMISSIONS.CREATE_INSTALLATION,
      PERMISSIONS.UPDATE_INSTALLATION,
      PERMISSIONS.DELETE_INSTALLATION,
      PERMISSIONS.VIEW_INSTALLATION,
      PERMISSIONS.ASSIGN_INSTALLATION,
      PERMISSIONS.COMPLETE_INSTALLATION,
    ],
  },
  INVENTORY_MANAGEMENT: {
    name: "Inventory Management",
    permissions: [
      PERMISSIONS.CREATE_ITEM,
      PERMISSIONS.UPDATE_ITEM,
      PERMISSIONS.DELETE_ITEM,
      PERMISSIONS.VIEW_ITEM,
      PERMISSIONS.IMPORT_ITEMS,
      PERMISSIONS.MANAGE_INVENTORY,
    ],
  },
  SYSTEM_SETTINGS: {
    name: "System Settings",
    permissions: [
      PERMISSIONS.MANAGE_SETTINGS,
      PERMISSIONS.VIEW_SETTINGS,
      PERMISSIONS.VIEW_AUDIT_LOGS,
      PERMISSIONS.VIEW_ACTIVITY_LOGS,
    ],
  },
};

/**
 * Get all permission names for display in UI
 */
const PERMISSION_NAMES = {
  // User Management
  create_user: "Create User",
  update_user: "Update User",
  delete_user: "Delete User",
  view_user: "View User",

  // Customer Management
  view_customers: "View Customers",
  create_customers: "Create Customers",
  update_customers: "Update Customers",
  delete_customers: "Delete Customers",

  // Role Management
  create_role: "Create Role",
  update_role: "Update Role",
  delete_role: "Delete Role",
  view_role: "View Role",
  assign_role: "Assign Role",

  // Ticket Management
  create_ticket: "Create Ticket",
  update_ticket: "Update Ticket",
  delete_ticket: "Delete Ticket",
  view_ticket: "View Ticket",
  assign_ticket: "Assign Ticket",
  resolve_ticket: "Resolve Ticket",
  approve_ticket: "Approve Ticket",
  view_all_customers: "View All Customers",
  create_new_customer: "Create New Customer",

  // Problem Management
  create_problem: "Create Problem",
  update_problem: "Update Problem",
  delete_problem: "Delete Problem",
  view_problem: "View Problem",

  // Installation Management
  create_installation: "Create Installation",
  update_installation: "Update Installation",
  delete_installation: "Delete Installation",
  view_installation: "View Installation",
  assign_installation: "Assign Installation",
  complete_installation: "Complete Installation",

  // Inventory Management
  create_item: "Create Item",
  update_item: "Update Item",
  delete_item: "Delete Item",
  view_item: "View Item",
  import_items: "Import Items",
  manage_inventory: "Manage Inventory",

  // System Settings
  manage_settings: "Manage Settings",
  view_settings: "View Settings",
  view_audit_logs: "View Audit Logs",
  view_activity_logs: "View Activity Logs",
};

/**
 * Default role permissions
 */
const ROLE_PERMISSIONS = {
  SUPER_ADMIN: Object.values(PERMISSIONS),

  SUPPORT_MANAGER: [
    PERMISSIONS.CREATE_USER,
    PERMISSIONS.UPDATE_USER,
    PERMISSIONS.VIEW_USER,
    PERMISSIONS.VIEW_ROLE,
    PERMISSIONS.CREATE_TICKET,
    PERMISSIONS.UPDATE_TICKET,
    PERMISSIONS.VIEW_TICKET,
    PERMISSIONS.ASSIGN_TICKET,
    PERMISSIONS.APPROVE_TICKET,
    PERMISSIONS.CREATE_PROBLEM,
    PERMISSIONS.UPDATE_PROBLEM,
    PERMISSIONS.VIEW_PROBLEM,
    PERMISSIONS.DELETE_PROBLEM,
    PERMISSIONS.CREATE_INSTALLATION,
    PERMISSIONS.UPDATE_INSTALLATION,
    PERMISSIONS.VIEW_INSTALLATION,
    PERMISSIONS.ASSIGN_INSTALLATION,
    PERMISSIONS.CREATE_ITEM,
    PERMISSIONS.UPDATE_ITEM,
    PERMISSIONS.VIEW_ITEM,
    PERMISSIONS.IMPORT_ITEMS,
    PERMISSIONS.VIEW_SETTINGS,
    PERMISSIONS.VIEW_ALL_CUSTOMERS,
    PERMISSIONS.CREATE_NEW_CUSTOMER,
  ],

  ENGINEER: [
    PERMISSIONS.VIEW_USER,
    PERMISSIONS.VIEW_TICKET,
    PERMISSIONS.UPDATE_TICKET,
    PERMISSIONS.RESOLVE_TICKET,
    PERMISSIONS.VIEW_PROBLEM,
    PERMISSIONS.VIEW_INSTALLATION,
    PERMISSIONS.UPDATE_INSTALLATION,
    PERMISSIONS.COMPLETE_INSTALLATION,
    PERMISSIONS.VIEW_ITEM,
    PERMISSIONS.VIEW_ALL_CUSTOMERS,
  ],

  INVENTORY_MANAGER: [
    PERMISSIONS.VIEW_USER,
    PERMISSIONS.CREATE_ITEM,
    PERMISSIONS.UPDATE_ITEM,
    PERMISSIONS.DELETE_ITEM,
    PERMISSIONS.VIEW_ITEM,
    PERMISSIONS.IMPORT_ITEMS,
    PERMISSIONS.MANAGE_INVENTORY,
    PERMISSIONS.VIEW_TICKET,
    PERMISSIONS.VIEW_PROBLEM,
    PERMISSIONS.VIEW_INSTALLATION,
    PERMISSIONS.VIEW_ALL_CUSTOMERS,
  ],
};

/**
 * Check if the given permissions set contains a specific permission
 */
const hasPermission = (permissions, permission) => {
  if (!permissions || !Array.isArray(permissions)) return false;
  return permissions.includes(permission);
};

/**
 * Get display name for a permission code
 */
const getPermissionName = (permissionCode) => {
  return PERMISSION_NAMES[permissionCode] || permissionCode;
};

module.exports = {
  PERMISSIONS,
  PERMISSION_GROUPS,
  PERMISSION_NAMES,
  ROLE_PERMISSIONS,
  hasPermission,
  getPermissionName,
};
