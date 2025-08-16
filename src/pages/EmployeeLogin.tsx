import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '@/components/MobileLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement authentication logic here
    navigate('/'); // Redirect to main app after login
  };

  return (
    <MobileLayout title="Login Funcionário" showBack onBack={() => navigate(-1)} showBottomNav={false}>
      <div className="p-6 flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full max-w-xs p-6 space-y-4">
          <h2 className="text-xl font-bold text-center mb-4">Entrar como funcionário</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <Input
              type="text"
              placeholder="Usuário"
              value={username}
              onChange={e => setUsername(e.target.value)}
            //   required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={e => setPassword(e.target.value)}
            //   required
            />
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default EmployeeLogin;
