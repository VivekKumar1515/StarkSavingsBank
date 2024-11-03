export class Notice {
    public noticeId: number;
    public noticeSummary: string;
    public noticeDetails: string;
    public issuedDate: string;
    public houseAffiliation: string

    constructor(noticeId: number, noticeSummary: string, noticeDetails: string, issuedDate: string, houseAffiliation: string) {
        this.noticeId = noticeId;
        this.noticeSummary = noticeSummary;
        this.noticeDetails = noticeDetails;
        this.issuedDate = issuedDate;
        this.houseAffiliation = houseAffiliation;
    }

}