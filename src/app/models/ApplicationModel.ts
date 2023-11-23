export interface Application {
    id: string,
    name: string;
    phoneNumber: string;
    email: string;
    observation: string;

    consentReceiveNews: boolean;
    consentTermsOfUseTermsOfServicePrivacyPolicy: boolean;

    companions: string;
    giraForm: GiraForm[];

    inscriptionAt: Date;
    receiveCleanse: boolean;
    spiritualConsultation: boolean;
    approvedAt?: Date;
    approved?: boolean;
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