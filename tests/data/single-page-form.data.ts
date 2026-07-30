export interface SinglePageFormData {
  abn: string;
  acn: string;
  businessName: string;
  registrationDate: string;
  entityName: string;
  entityNumber: string;

  periodActiveStartDate: string;
  periodActiveEndDate: string;

  streetAddress: string;
  suburb: string;
  state: string;
  postcode: string;
}

export const validSinglePageFormData: SinglePageFormData = {
  abn: "123456789",
  acn: "12345",
  businessName: "Single Page",
  registrationDate: "01/07/2025",
  entityName: "Single",
  entityNumber: "1234",

  periodActiveStartDate: "01/07/2026",
  periodActiveEndDate: "31/07/2026",

  streetAddress: "1 Main Street",
  suburb: "Test",
  state: "VIC",
  postcode: "3000",
};
