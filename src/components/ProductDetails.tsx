import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { Product } from '@/types/grocery';
import { mockCartItems } from '@/data/mockData';

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Verifica se o produto já existe no carrinho
    const existingIndex = mockCartItems.findIndex(item => item.product.id === product.id);

    if (existingIndex >= 0) {
      // Incrementa a quantidade
      mockCartItems[existingIndex].quantity += quantity;
    } else {
      // Adiciona novo item
      mockCartItems.push({ id: product.id, product, quantity });
    }
    console.log('Carrinho atual:', mockCartItems);

    // navigate back to scan
    window.history.back();
  };

  const incrementQuantity = () => setQuantity(q => q + 1);
  const decrementQuantity = () => setQuantity(q => Math.max(1, q - 1));

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      {/* Product Image */}
      <div className="relative w-full h-64 bg-gradient-to-br from-muted to-muted/50 rounded-xl flex items-center justify-center overflow-hidden">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain rounded-xl"
          />
        ) : (
          <div className="text-6xl">🥤</div>
        )}
        <Badge className="absolute top-3 right-3 bg-success text-success-foreground">
          Em estoque
        </Badge>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-foreground">
              R$ {product.price.toFixed(2)}
            </span>
          </div>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
      </div>

      {/* Quantity Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <span className="font-medium text-foreground">Quantidade</span>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={decrementQuantity}
              disabled={quantity <= 1}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-lg font-semibold w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={incrementQuantity}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Add to Cart & Cancel Buttons */}
      <div className="sticky bottom-4">
        <div className="flex gap-3 w-full">
          <Button
            onClick={handleAddToCart}
            className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
            size="lg"
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Adicionar ao carrinho
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex-1 min-w-0 max-w-[200px] bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:text-white"
            size="lg"
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};