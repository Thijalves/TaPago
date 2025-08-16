import { useLocation, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { MobileLayout } from '@/components/MobileLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { mockProducts } from '@/data/mockData';
import { CartItem } from '@/types/grocery';

function parseCartItems(qr: string): CartItem[] {
  try {
    const items = JSON.parse(qr);
    // Map to CartItem with product info from mockProducts
    return items.map((item: any, idx: number) => {
      const product = mockProducts.find(p => p.id === item.id);
      return {
        id: item.id + '-' + idx,
        product: product
          ? product
          : {
              id: item.id,
              name: item.name,
              price: item.price,
              image: '',
              description: '',
              category: '',
            },
        quantity: item.quantity,
      };
    });
  } catch {
    return [];
  }
}

const EmployeeOrderView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const qr = params.get('qr') || '';

  const cartItems = useMemo(() => parseCartItems(qr), [qr]);
  const total = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <MobileLayout title="Itens do Cliente" showBack onBack={() => navigate(-1)} showBottomNav={false}>
      <div className="p-4 space-y-6 animate-fade-in">
        <Card className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Itens comprados</h2>
          {cartItems.length === 0 ? (
            <div className="text-center text-muted-foreground">Nenhum item encontrado no QR Code.</div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-4 border-b pb-3 last:border-b-0 last:pb-0">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    {item.product.image ? (
                      <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-3xl">🛒</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{item.product.name}</h3>
                    <div className="text-sm text-muted-foreground">R$ {item.product.price.toFixed(2)}</div>
                    <Badge variant="secondary">{item.product.category || 'Produto'}</Badge>
                  </div>
                  <div className="text-lg font-bold text-foreground">x{item.quantity}</div>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card className="p-4">
          <div className="flex justify-between">
            <span className="font-semibold text-foreground">Total</span>
            <span className="font-bold text-xl text-foreground">R$ {total.toFixed(2)}</span>
          </div>
        </Card>
        <Button onClick={() => navigate('/employee-scan')} className="w-full h-16 bg-green-400 text-white text-lg" variant="outline">
          Escanear outro QR Code
        </Button>
      </div>
    </MobileLayout>
  );
};

export default EmployeeOrderView;
