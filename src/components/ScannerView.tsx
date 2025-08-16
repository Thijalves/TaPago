import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Flashlight, RotateCcw, Camera } from 'lucide-react';
import { Product } from '@/types/grocery';
import { mockProducts } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import BarcodeScanner from "react-qr-barcode-scanner";

interface ScannerViewProps {
  onProductFound: (product: Product) => void;
}

export const ScannerView = ({ onProductFound }: ScannerViewProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [flashOn, setFlashOn] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [scannerKey, setScannerKey] = useState(0);
  const isHandlingRef = useRef(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleCamera = () => {
    setFacingMode(current => current === 'user' ? 'environment' : 'user');
    setScannerKey(prev => prev + 1);
  };

  const toggleFlash = () => {
    setFlashOn(!flashOn);
    toast({
      title: "Flash",
      description: `Flash ${!flashOn ? 'ligado' : 'desligado'}`,
    });
  };

  const handleBarcodeResult = (err: any, result: any) => {
    if (err) {
      setCameraError(null);
      return;
    }

    if (result && result.text && !isHandlingRef.current) {
      isHandlingRef.current = true;
      setIsScanning(true);

      const code = result.text;
      console.log("Código escaneado:", code);

      const product = mockProducts.find(p => p.id === code);

      if (product) {
        console.log("Produto encontrado:", product);
        const productUrl = `/produto/${product.id}?ref=barcode&code=${encodeURIComponent(code)}`;
        setTimeout(() => {
          navigate(productUrl);
          onProductFound(product);
        }, 300);
      } else {
        toast({
          title: "Código não encontrado",
          description: "Nenhum produto corresponde a este código de barras.",
          variant: "destructive"
        });
      }

      setTimeout(() => {
        isHandlingRef.current = false;
        setIsScanning(false);
      }, 1000);
    }
  };

  const retryCamera = () => {
    setCameraError(null);
    setScannerKey(prev => prev + 1);
  };

  if (cameraError) {
    return (
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
    );
  }

  return (
    <div className="relative h-[calc(100vh-5rem)] bg-black animate-fade-in overflow-hidden">
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <BarcodeScanner
          key={scannerKey}
          width="100%"
          height="100%"
          facingMode={facingMode}
          torch={flashOn}
          onUpdate={handleBarcodeResult}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>

      {/* Scanning overlay */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-80 h-48 border-2 border-white border-dashed rounded-lg">
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
            {isScanning ? 'Processando código...' : 'Aponte para o código de barras'}
          </p>
          <p className="text-white/80 text-sm drop-shadow-lg">
            Mantenha o código dentro da moldura
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center gap-8">
        <Button
          variant="ghost"
          size="lg"
          onClick={toggleFlash}
          className={`text-white hover:bg-white/20 ${flashOn ? 'bg-white/20' : ''}`}
        >
          <Flashlight className={`h-6 w-6 ${flashOn ? 'text-yellow-300' : ''}`} />
        </Button>

        <Button
          variant="ghost"
          size="lg"
          onClick={toggleCamera}
          className="text-white hover:bg-white/20"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      {isScanning && (
        <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center animate-pulse">
          <div className="bg-card p-6 rounded-lg shadow-lg animate-scale-in">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-foreground font-medium">Processando código...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
