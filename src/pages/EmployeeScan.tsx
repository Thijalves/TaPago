import { useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import BarcodeScanner, { BarcodeFormat }  from "react-qr-barcode-scanner";
import { Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeScan = () => {
  const [scannerKey, setScannerKey] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const isHandlingRef = useRef(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleBarcodeResult = (err: any, result: any) => {
    if (err) {
      setCameraError(null);
      return;
    }
    if (result && result.text && !isHandlingRef.current) {
      isHandlingRef.current = true;
      setIsScanning(true);

      // Redirect to order view page with QR code data
      setTimeout(() => {
        navigate(`/employee-order-view?qr=${encodeURIComponent(result.text)}`);
      }, 500);

      setTimeout(() => {
        isHandlingRef.current = false;
        setIsScanning(false);
      }, 1200);
    } 
  };

  const retryCamera = () => {
    setCameraError(null);
    setScannerKey(prev => prev + 1);
  };

  return (
    <MobileLayout title="Scanner Funcionário" showBack onBack={() => window.history.back()} showBottomNav={false}>
      {cameraError ? (
        <div className="relative h-[calc(100vh-8rem)] bg-black animate-fade-in flex items-center justify-center">
          <div className="text-center text-white p-6">
            <Camera className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h2 className="text-xl font-semibold mb-2">Erro na Câmera</h2>
            <p className="text-white/80 mb-4">{cameraError}</p>
            <Button
              onClick={retryCamera}
              variant="outline"
              className="text-black bg-white hover:bg-white/90"
            >
              Tentar Novamente
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative h-[calc(100vh-8rem)] bg-black animate-fade-in overflow-hidden">
          <div className="absolute inset-0 w-full h-full flex items-center justify-center">
            <BarcodeScanner
              key={scannerKey}
              width="100%"
              height="100%"
              onUpdate={handleBarcodeResult}
              formats={[BarcodeFormat.QR_CODE]}
            />
          </div>
          <div className="absolute inset-0 bg-black/10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-60 h-60 border-2 border-white border-dashed rounded-lg">
                {/* corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-white rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-white rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-white rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-white rounded-br-lg"></div>
                {isScanning && (
                  <div className="absolute inset-x-0 top-1/2 h-0.5 bg-green-400 animate-pulse"></div>
                )}
              </div>
            </div>
            <div className="absolute bottom-32 left-0 right-0 text-center px-4">
              <p className="text-white text-lg mb-2 drop-shadow-lg">
                {isScanning ? 'Processando QR Code...' : 'Aponte para o QR Code'}
              </p>
              <p className="text-white/80 text-sm drop-shadow-lg">
                Mantenha o QR Code dentro da moldura
              </p>
            </div>
          </div>
          {isScanning && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center animate-pulse">
              <div className="bg-card p-6 rounded-lg shadow-lg animate-scale-in">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-foreground font-medium">Processando QR Code...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </MobileLayout>
  );
};

export default EmployeeScan;
