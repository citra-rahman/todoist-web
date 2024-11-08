export interface UserProps {
    accessToken: string | any;
    auth: any;
    displayName: string;
    email: string | any;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: any;
    phoneNumber: any;
    photoURL: string | any;
    proactiveRefresh: any;
    providerData: any;
    providerId: string | any;
    reloadListener: any | null;
    reloadUserInfo: any;
    tenantId: any | null;
    uid: string;
  }
  
  export interface ToDoProps {
    id: string;
    name: string;
    date: Date;
    isImportant: boolean;
    isCompleted: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ToDoShortProps{
    id: string;
    name: string;
    isImportant: boolean;
    isCompleted: boolean;
  }