import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { osPorEspecialidade, osPorMes, osPorStatus } from '@/data/mockData';

export function OSBySpecialtyChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-card rounded-xl border border-border/50 shadow-sm p-6"
    >
      <h3 className="text-lg font-semibold mb-4">OS por Especialidade</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={osPorEspecialidade}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {osPorEspecialidade.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function OSByMonthChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-card rounded-xl border border-border/50 shadow-sm p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Evolução Mensal de OS</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={osPorMes}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="mes"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="abertas"
              name="Abertas"
              stroke="hsl(217, 91%, 45%)"
              strokeWidth={2}
              dot={{ fill: 'hsl(217, 91%, 45%)' }}
            />
            <Line
              type="monotone"
              dataKey="concluidas"
              name="Concluídas"
              stroke="hsl(142, 76%, 40%)"
              strokeWidth={2}
              dot={{ fill: 'hsl(142, 76%, 40%)' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

export function OSByStatusChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="bg-card rounded-xl border border-border/50 shadow-sm p-6"
    >
      <h3 className="text-lg font-semibold mb-4">Distribuição por Status</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={osPorStatus} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis
              dataKey="name"
              type="category"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {osPorStatus.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
