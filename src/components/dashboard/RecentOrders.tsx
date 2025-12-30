import { motion } from 'framer-motion';
import { ArrowRight, Clock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockOrdensServico, mockEmpresas } from '@/data/mockData';
import { StatusOSLabels, EspecialidadeLabels, StatusOS } from '@/types';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const statusStyles: Record<StatusOS, string> = {
  aberta: 'status-aberta',
  em_andamento: 'status-em-andamento',
  pausada: 'status-pausada',
  concluida: 'status-concluida',
  cancelada: 'status-cancelada',
};

export function RecentOrders() {
  const recentOrders = mockOrdensServico.slice(0, 5);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-card rounded-xl border border-border/50 shadow-sm"
    >
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Ordens de Serviço Recentes</h3>
            <p className="text-sm text-muted-foreground">
              Últimas OS cadastradas no sistema
            </p>
          </div>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/ordens-servico" className="gap-1">
              Ver todas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border/50">
        {recentOrders.map((os, index) => {
          const empresa = mockEmpresas.find((e) => e.id === os.empresaId);
          return (
            <motion.div
              key={os.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-primary">
                      {os.numero}
                    </span>
                    <Badge className={cn('status-badge', statusStyles[os.status])}>
                      {StatusOSLabels[os.status]}
                    </Badge>
                  </div>
                  <p className="text-sm text-foreground truncate mb-1">
                    {os.descricao}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {format(new Date(os.dataAbertura), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                    <span>{empresa?.nomeFantasia}</span>
                    <span className="px-2 py-0.5 bg-secondary rounded-full">
                      {EspecialidadeLabels[os.tipoServico]}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
