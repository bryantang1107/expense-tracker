const formatCurrency = (amount: number) => {
  return `RM${amount.toFixed(2)}`;
};

const formatAmountWithSymbol = (amount: number, precision: number = 2) => {
  if (amount >= 1000000) {
    if (amount % 1000000 === 0) {
      return `RM${(amount / 1000000).toFixed(0)}M+`;
    }
    return `RM${(amount / 1000000).toFixed(1)}M+`;
  }
  if (amount >= 1000) {
    if (amount % 1000 === 0) {
      return `RM${(amount / 1000).toFixed(0)}K+`;
    }
    return `RM${(amount / 1000).toFixed(1)}K+`;
  }
  return `RM${amount.toFixed(precision)}`;
};

export { formatCurrency, formatAmountWithSymbol };
