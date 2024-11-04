
export class AccountTransactions {

    public accountNumber: number;
    public customerId: number;
    public transactionDt: Date;
    public transactionSummary: string;
    public transactionType: string;
    public transactionAmount: number;
    public closingBalance: number;
    
    constructor(accountNumber?: number,customerId?: number,transactionDt?: Date, transactionSummary?: string,
      transactionType?: string,transactionAmount?: number, closingBalance?: number){
          this.accountNumber = accountNumber || 0;
          this.customerId = customerId || 0;
          this.transactionDt = transactionDt!;
          this.transactionSummary = transactionSummary || '';
          this.transactionType = transactionType || '';
          this.transactionAmount = transactionAmount || 0;
          this.closingBalance = closingBalance || 0;
    }
  
  }
  