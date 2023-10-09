export interface Gira 
{
    id: string;
    startDate: Date;
    endDate: Date;
    name: string;
    description: string;
    capacity: number;
    pending: number;
    approved: number;
    rejected: number;
    urlImage: string;
    acceptRegistration: boolean;
    registrationPeriod: boolean;
    giraTypeId: string;
    giraType: GiraType;

    approvedForReceiveCleanse: number;
    approvedForSpiritualConsultation: number;  
}

export interface GiraType{
    id: string;
    name: string;
    description: string;
    urlImage: string;
}

export interface GiraPagination{
    items: Gira[],
    total: number,
    page: number,
    size: number,
    totalPages: number
}