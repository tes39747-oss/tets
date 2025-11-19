import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, X, Send, Wallet, DollarSign, TrendingUp, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface CampaignData {
  address: string;
  name: string;
  description: string;
  creator: string;
  admin: string;
  goal: number;
  raised: number;
  ethBalance: number;
  wbtcBalance: number;
  status: number;
  paidOut: boolean;
  deadline: number;
  tokenEnabled: boolean;
  metadataHash: string;
  factory: string;
  startedDate: string;
}

const CampaignDetails = () => {
  const { address } = useParams<{ address: string }>();
  const navigate = useNavigate();

  const [campaign, setCampaign] = useState<CampaignData | null>(null);
  const [ethAmount, setEthAmount] = useState('');
  const [wbtcAmount, setWbtcAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    action: string;
    title: string;
    description: string;
  }>({ open: false, action: '', title: '', description: '' });
  const [transferAddress, setTransferAddress] = useState('');

  useEffect(() => {
    const mockCampaign: CampaignData = {
      address: address || '',
      name: 'Konklux Innovation Fund',
      description: 'A revolutionary campaign to fund the next generation of blockchain innovations. This project aims to bring cutting-edge technology to market.',
      creator: '0x1111111111111111111111111111111111111111',
      admin: '0x2222222222222222222222222222222222222222',
      goal: 100000,
      raised: 23500,
      ethBalance: 10.5,
      wbtcBalance: 0.25,
      status: 1,
      paidOut: false,
      deadline: Date.now() + 30 * 24 * 60 * 60 * 1000,
      tokenEnabled: true,
      metadataHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
      factory: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      startedDate: '2024-01-15',
    };

    setCampaign(mockCampaign);
  }, [address]);

  if (!campaign) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  const statusMap: Record<number, { label: string; variant: 'default' | 'secondary' | 'destructive'; icon: any }> = {
    0: { label: 'Pending', variant: 'secondary', icon: Clock },
    1: { label: 'Active', variant: 'default', icon: CheckCircle },
    2: { label: 'Successful', variant: 'default', icon: CheckCircle },
    3: { label: 'Failed', variant: 'destructive', icon: AlertCircle },
    4: { label: 'Paused', variant: 'secondary', icon: Pause },
    5: { label: 'Cancelled', variant: 'destructive', icon: X },
    6: { label: 'Donation', variant: 'default', icon: DollarSign },
  };

  const status = statusMap[campaign.status] || statusMap[0];
  const StatusIcon = status.icon;
  const progress = (campaign.raised / campaign.goal) * 100;
  const daysLeft = Math.ceil((campaign.deadline - Date.now()) / (1000 * 60 * 60 * 24));

  const formatAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  const formatDate = (timestamp: number) => new Date(timestamp).toLocaleDateString();

  const handleAction = (action: string, title: string, description: string) => {
    setActionDialog({ open: true, action, title, description });
  };

  const executeAction = async () => {
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      toast.success(`${actionDialog.title} executed successfully!`);
      setActionDialog({ open: false, action: '', title: '', description: '' });

      if (actionDialog.action === 'activate') {
        setCampaign(prev => prev ? { ...prev, status: 1 } : null);
      } else if (actionDialog.action === 'pause') {
        setCampaign(prev => prev ? { ...prev, status: 4 } : null);
      } else if (actionDialog.action === 'cancel') {
        setCampaign(prev => prev ? { ...prev, status: 5 } : null);
      }
    } catch (error) {
      toast.error('Action failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContributeETH = async () => {
    if (!ethAmount || parseFloat(ethAmount) <= 0) {
      toast.error('Please enter a valid ETH amount');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const amount = parseFloat(ethAmount);
      setCampaign(prev => prev ? {
        ...prev,
        ethBalance: prev.ethBalance + amount,
        raised: prev.raised + (amount * 2300)
      } : null);

      toast.success(`Successfully contributed ${ethAmount} ETH!`);
      setEthAmount('');
    } catch (error) {
      toast.error('Contribution failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleContributeWBTC = async () => {
    if (!wbtcAmount || parseFloat(wbtcAmount) <= 0) {
      toast.error('Please enter a valid WBTC amount');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const amount = parseFloat(wbtcAmount);
      setCampaign(prev => prev ? {
        ...prev,
        wbtcBalance: prev.wbtcBalance + amount,
        raised: prev.raised + (amount * 45000)
      } : null);

      toast.success(`Successfully contributed ${wbtcAmount} WBTC!`);
      setWbtcAmount('');
    } catch (error) {
      toast.error('Contribution failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTransferCreator = async () => {
    if (!transferAddress || !/^0x[a-fA-F0-9]{40}$/.test(transferAddress)) {
      toast.error('Please enter a valid Ethereum address');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      setCampaign(prev => prev ? { ...prev, creator: transferAddress } : null);
      toast.success('Creator transferred successfully!');
      setTransferAddress('');
      setActionDialog({ open: false, action: '', title: '', description: '' });
    } catch (error) {
      toast.error('Transfer failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      setCampaign(prev => prev ? { ...prev, paidOut: true } : null);
      toast.success('Funds withdrawn successfully!');
      setActionDialog({ open: false, action: '', title: '', description: '' });
    } catch (error) {
      toast.error('Withdrawal failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{campaign.name}</h1>
            <p className="text-sm text-muted-foreground">Campaign Address: {formatAddress(campaign.address)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Campaign Overview</CardTitle>
                  <Badge variant={status.variant} className="gap-1">
                    <StatusIcon className="h-3 w-3" />
                    {status.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm font-semibold">{progress.toFixed(1)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>${campaign.raised.toLocaleString()} raised</span>
                    <span>${campaign.goal.toLocaleString()} goal</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">ETH Balance</p>
                    <p className="text-lg font-bold text-foreground">{campaign.ethBalance.toFixed(4)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">WBTC Balance</p>
                    <p className="text-lg font-bold text-foreground">{campaign.wbtcBalance.toFixed(4)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Days Left</p>
                    <p className="text-lg font-bold text-foreground">{daysLeft}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Paid Out</p>
                    <p className="text-lg font-bold text-foreground">{campaign.paidOut ? 'Yes' : 'No'}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-sm font-semibold mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {campaign.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-1">Creator</p>
                    <p className="font-mono text-xs">{campaign.creator}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Admin</p>
                    <p className="font-mono text-xs">{campaign.admin}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Factory</p>
                    <p className="font-mono text-xs">{formatAddress(campaign.factory)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Deadline</p>
                    <p className="font-medium">{formatDate(campaign.deadline)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Started</p>
                    <p className="font-medium">{campaign.startedDate}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-1">Token Enabled</p>
                    <p className="font-medium">{campaign.tokenEnabled ? 'Yes' : 'No'}</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-muted-foreground mb-1 text-sm">Metadata Hash</p>
                  <p className="font-mono text-xs break-all">{campaign.metadataHash}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Controls</CardTitle>
                <CardDescription>Manage campaign state and operations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleAction('activate', 'Activate Campaign', 'This will activate the campaign and allow contributions.')}
                        disabled={campaign.status === 1}
                      >
                        <Play className="h-4 w-4" />
                        Activate
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Activate the campaign</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleAction('pause', 'Pause Campaign', 'This will temporarily pause the campaign.')}
                        disabled={campaign.status === 4}
                      >
                        <Pause className="h-4 w-4" />
                        Pause
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Pause the campaign</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="destructive"
                        className="gap-2"
                        onClick={() => handleAction('cancel', 'Cancel Campaign', 'This will permanently cancel the campaign. This action cannot be undone.')}
                        disabled={campaign.status === 5}
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Cancel the campaign permanently</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleAction('transfer', 'Transfer Creator', 'Transfer campaign ownership to a new address.')}
                      >
                        <Send className="h-4 w-4" />
                        Transfer
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Transfer creator ownership</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        className="gap-2"
                        onClick={() => handleAction('finalize', 'Finalize Campaign', 'Finalize the campaign after deadline.')}
                      >
                        <CheckCircle className="h-4 w-4" />
                        Finalize
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Finalize campaign after deadline</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="gap-2"
                        onClick={() => handleAction('withdraw', 'Withdraw Funds', 'Withdraw raised funds to creator address.')}
                        disabled={campaign.paidOut}
                      >
                        <Wallet className="h-4 w-4" />
                        Withdraw
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Withdraw raised funds</TooltipContent>
                  </Tooltip>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contribute ETH</CardTitle>
                <CardDescription>Support this campaign with ETH</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eth-amount">Amount (ETH)</Label>
                  <Input
                    id="eth-amount"
                    type="number"
                    placeholder="0.0"
                    value={ethAmount}
                    onChange={(e) => setEthAmount(e.target.value)}
                    step="0.001"
                    min="0"
                  />
                </div>
                <Button
                  className="w-full gap-2"
                  onClick={handleContributeETH}
                  disabled={loading || !ethAmount}
                >
                  <DollarSign className="h-4 w-4" />
                  Contribute ETH
                </Button>
              </CardContent>
            </Card>

            {campaign.tokenEnabled && (
              <Card>
                <CardHeader>
                  <CardTitle>Contribute WBTC</CardTitle>
                  <CardDescription>Support this campaign with WBTC</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="wbtc-amount">Amount (WBTC)</Label>
                    <Input
                      id="wbtc-amount"
                      type="number"
                      placeholder="0.0"
                      value={wbtcAmount}
                      onChange={(e) => setWbtcAmount(e.target.value)}
                      step="0.0001"
                      min="0"
                    />
                  </div>
                  <Button
                    className="w-full gap-2"
                    onClick={handleContributeWBTC}
                    disabled={loading || !wbtcAmount}
                  >
                    <DollarSign className="h-4 w-4" />
                    Contribute WBTC
                  </Button>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Campaign Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Goal Status</span>
                  </div>
                  <span className="text-sm font-semibold">
                    {progress >= 100 ? 'Goal Achieved!' : progress >= 75 ? 'Almost There!' : `${(100 - progress).toFixed(0)}% Remaining`}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Backers</span>
                  </div>
                  <span className="text-sm font-semibold">127</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Time Remaining</span>
                  </div>
                  <span className="text-sm font-semibold">{daysLeft} days</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-sm">Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">KYC Verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Smart Contract Audited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">Team Verified</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <AlertDialog open={actionDialog.open} onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{actionDialog.title}</AlertDialogTitle>
              <AlertDialogDescription>{actionDialog.description}</AlertDialogDescription>
            </AlertDialogHeader>

            {actionDialog.action === 'transfer' && (
              <div className="space-y-2 py-4">
                <Label htmlFor="transfer-address">New Creator Address</Label>
                <Input
                  id="transfer-address"
                  placeholder="0x..."
                  value={transferAddress}
                  onChange={(e) => setTransferAddress(e.target.value)}
                />
              </div>
            )}

            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={(e) => {
                  e.preventDefault();
                  if (actionDialog.action === 'transfer') {
                    handleTransferCreator();
                  } else if (actionDialog.action === 'withdraw') {
                    handleWithdraw();
                  } else {
                    executeAction();
                  }
                }}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};

export default CampaignDetails;
