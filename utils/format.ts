export const formatCurrency = (amount: number | null) => {
  const value = amount || 0;
  // We return the international number format 
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    // We take in the integer & return the currency 
  }).format(value);
};