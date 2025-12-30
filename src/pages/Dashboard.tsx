import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentOrders } from '@/components/dashboard/RecentOrders';
import {
  OSBySpecialtyChart,
  OSByMonthChart,
  OSByStatusChart,
} from '@/components/dashboard/Charts';
import { dashboardStats } from '@/data/mockData';
import {
  ClipboardList,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Building2,
} from 'lucide-react';

export default function Dashboard() {
  return (
    <MainLayout
      title="Dashboard"
      subtitle="Visão geral do sistema de ordens de serviço"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        <StatCard
          title="OS Abertas"
          value={dashboardStats.osAbertas}
          subtitle="Aguardando início"
          icon={ClipboardList}
          variant="primary"
          delay={0}
        />
        <StatCard
          title="Em Andamento"
          value={dashboardStats.osEmAndamento}
          subtitle="Em execução"
          icon={Clock}
          variant="warning"
          delay={0.05}
        />
        <StatCard
          title="Concluídas"
          value={dashboardStats.osConcluidas}
          subtitle="Este mês"
          icon={CheckCircle2}
          variant="success"
          delay={0.1}
        />
        <StatCard
          title="Atrasadas"
          value={dashboardStats.osAtrasadas}
          subtitle="Atenção necessária"
          icon={AlertTriangle}
          delay={0.15}
        />
        <StatCard
          title="Funcionários"
          value={dashboardStats.totalFuncionariosAtivos}
          subtitle="Ativos"
          icon={Users}
          delay={0.2}
        />
        <StatCard
          title="Empresas"
          value={dashboardStats.totalEmpresas}
          subtitle="Cadastradas"
          icon={Building2}
          delay={0.25}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-6">
        <OSBySpecialtyChart />
        <OSByMonthChart />
        <OSByStatusChart />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </MainLayout>
  );
}
