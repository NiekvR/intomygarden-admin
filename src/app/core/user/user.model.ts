export interface User {
  uid?: string;
  email: string;
  permission: boolean;
  roles: { [role: string]: boolean };
  projects: { [project: string]: boolean };
}
