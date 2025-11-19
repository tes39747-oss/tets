import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface CampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  factoryAddress: string;
}

const CampaignModal = ({ isOpen, onClose, factoryAddress }: CampaignModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">Create New Campaign</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground">
            Factory Address: <span className="font-mono text-sm">{factoryAddress}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            Campaign creation form will be implemented here.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignModal;
