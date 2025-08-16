import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ShoppingCart, Search, List} from 'lucide-react';

interface MobileLayoutProps {
  children: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  showBottomNav?: boolean;
  currentView?: string;
  onNavigate?: (view: string) => void;
}

export const MobileLayout = ({ 
  children, 
  showBack = false, 
  onBack,
  showBottomNav = true,
  currentView = '',
  onNavigate
}: MobileLayoutProps) => {
  return (
    <div className="min-h-screen bg-background max-w-md mx-auto relative">

      {/* Content */}
      <div className={`${showBottomNav ? 'pb-20' : 'pb-4'}`}>
        {children}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && onNavigate && (
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-card border-t border-border z-50">
          <div className="flex items-center justify-around py-2">
            <Button 
              variant={currentView === 'shopping-list' ? 'default' : 'ghost'} 
              size="sm" 
              className={`flex flex-col items-center gap-1 h-auto py-2 transition-colors ${
                currentView === 'shopping-list' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onNavigate('shopping-list')}
            >
              <List className="h-5 w-5" />
              <span className="text-xs">Lista de compras</span>
            </Button>
            <Button 
              variant={currentView === 'scanner' ? 'default' : 'ghost'} 
              size="sm" 
              className={`flex flex-col items-center gap-1 h-auto py-2 transition-colors ${
                currentView === 'scanner' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onNavigate('scanner')}
            >
              <Search className="h-5 w-5" />
              <span className="text-xs">Escanear</span>
            </Button>
            <Button 
              variant={currentView === 'cart' ? 'default' : 'ghost'} 
              size="sm" 
              className={`flex flex-col items-center gap-1 h-auto py-2 transition-colors ${
                currentView === 'cart' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => onNavigate('cart')}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="text-xs">Carrinho</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};