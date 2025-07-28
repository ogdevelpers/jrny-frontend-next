export default function getPortfolioSidebarTabs(portfolio: any[]) {
  const portfolioTabSet = new Set<string>();
  portfolioTabSet.add("All Categories"); 
  portfolio.forEach((item: any) => {
    item?.categories?.forEach((category: any) => {
      if (category?.name) {
        portfolioTabSet.add(category.name);
      }
    });
  });

  return Array.from(portfolioTabSet);
}