export interface Application {
    id: string,
    name: string;
    phoneNumber: string;
    email: string;
    observation: string;
    ConsentReceiveNews: boolean;
    ConsentTermsOfUseTermsOfServicePrivacyPolicy: boolean;
    companions: string;
    giraForm: GiraForm[];
    gira: GiraOpen;
    inscriptionAt: Date;
    receiveCleanse: boolean;
    spiritualConsultation: boolean;
    approvedAt?: Date;
    approved?: boolean;
    cancelledByUser?: boolean;
    invalidInscription?: boolean;
    numberOfCompanions: number;
    listCompanions: ApplicationForm[]
  }
  
  export interface GiraForm {
    giraId: string;
    receiveCleanse: boolean;
    spiritualConsultation: boolean;
  }

  export interface ApplicationForm {
    name: string;
    receiveCleanse: boolean;
    spiritualConsultation: boolean;
  }

  export interface ApplicationPagination{
    items: Application[],
    total: number,
    page: number,
    size: number,
    totalPages: number
}

export interface GiraOpen {
  name: string, 
  startDate: string, 
  endDate: string, 
  acceptWatcher: boolean, 
  acceptConsultation: boolean, 
  acceptCleanse: boolean
}