import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Gift } from 'lucide-react';

const OfferPopup = ({ isOpen, onOpenChange }) => {
  const navigate = useNavigate();

  const handleClaim = () => {
    navigate('/launch-offer');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent-blue/20 mb-4">
            <Gift className="h-6 w-6 text-accent-blue" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-gradient">
            Exclusive Launch Offer!
          </DialogTitle>
          <DialogDescription className="text-center text-text-secondary text-base pt-2">
            Claim your free clinic or hospital website with an ArogyaLens subscription. Doctors can get their portfolio site for just ₹999. Offer valid for verified profiles only.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center pt-4">
          <Button 
            onClick={handleClaim} 
            size="lg" 
            className="w-full bg-accent-cyan text-dark-primary font-bold hover:bg-accent-cyan/90 transition-all duration-300 transform hover:scale-105"
          >
            Claim Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OfferPopup;