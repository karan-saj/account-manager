export interface BalanceSheetPayload {
    date?: string;
    periods?: number;
    timeframe?: 'MONTH' | 'QUARTER' | 'YEAR';
    trackingOptionID1?: string;
    trackingOptionID2?: string;
    standardLayout?: boolean;
    paymentsOnly?: boolean;
}

export interface BalanceSheetQueryParams {
    date?: string;
    periods?: string;
    timeframe?: string;
    trackingOptionID1?: string;
    trackingOptionID2?: string;
    standardLayout?: string;
    paymentsOnly?: string;
}

export interface BalanceSheetCell {
    Value: string;
    Attributes: Array<{
      Value: string;
      Id: string;
    }>;
  }

export interface BalanceSheetRow {
    RowType: 'Header' | 'Section' | 'Row' | 'SummaryRow';
    Title?: string;
    Cells: BalanceSheetCell[];
    Rows?: BalanceSheetRow[];
  }

export interface BalanceSheetReport {
    ReportID: string;
    ReportName: string;
    ReportType: string;
    ReportTitles: string[];
    ReportDate: string;
    UpdatedDateUTC: string;
    Rows: BalanceSheetRow[];
}

export interface BalanceSheetResponse {
    Reports: BalanceSheetReport[];
}
  