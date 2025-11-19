import Dashboard from './Dashboard';

const Index = () => {
  // This would typically come from your Web3 connection
  const factoryAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';
  
  return <Dashboard factoryAddress={factoryAddress} />;
};

export default Index;
