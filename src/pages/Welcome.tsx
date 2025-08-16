import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const markets = [
	{ id: 'market1', name: 'Mercado Central' },
	{ id: 'market2', name: 'Super Econômico' },
	{ id: 'market3', name: 'Mini Preço' },
];

const Welcome = () => {
	const navigate = useNavigate();
	const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

	const handleSelectMarket = (marketId: string) => {
		setSelectedMarket(marketId);
		setTimeout(() => {
			navigate('/home');
		}, 300);
	};

	const handleEmployeeLogin = () => {
		navigate('/employee-login');
	};

	return (
		<MobileLayout title="Bem-vindo!" showBack={false} showBottomNav={false}>
			<div className="flex flex-col items-center justify-center min-h-[70vh] space-y-8 p-6">
				<Card className="w-full max-w-xs p-6">
					<h2 className="mb-4 text-center text-xl font-bold">
						Selecione o mercado
					</h2>
					<div className="space-y-3">
						{markets.map(market => (
							<Button
								key={market.id}
								className="w-full"
								variant={
									selectedMarket === market.id ? 'default' : 'outline'
								}
								onClick={() => handleSelectMarket(market.id)}
							>
								{market.name}
							</Button>
						))}
					</div>
				</Card>
				<div className="mt-6 text-center">
					<Button
						variant="link"
						className="text-sm text-muted-foreground"
						onClick={handleEmployeeLogin}
					>
						Log in como funcionário do mercado
					</Button>
				</div>
			</div>
		</MobileLayout>
	);
};

export default Welcome;
