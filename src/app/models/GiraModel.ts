export interface Gira 
{
    id: string;
    startDate: Date;
    endDate: Date;
    name: string;
    description: string;
    urlImage: string;
    closedEvent: boolean;
    registrationPeriod: boolean;
    registrationsClosed: boolean;

    acceptWatcher: boolean;
    acceptConsultation: boolean;
    acceptCleanse: boolean;

    approvedForReceiveCleanse: number;
    approvedForSpiritualConsultation: number;  
}

export interface GiraPagination{
    items: Gira[],
    total: number,
    page: number,
    size: number,
    totalPages: number
}