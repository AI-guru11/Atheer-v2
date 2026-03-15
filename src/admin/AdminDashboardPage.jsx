import Section from '../components/layout/Section';
import Card from '../components/ui/Card';

export default function AdminDashboardPage() {
  return (
    <Section>
      <div className="section-heading">
        <p className="eyebrow">Admin Dashboard</p>
        <h1>لوحة الإدارة ستُبنى لاحقًا كمرحلة مستقلة.</h1>
      </div>
      <Card className="placeholder-card">
        <p>
          لن نكرر كارثة ملف واحد يبتلع النظام كاملًا. الـ admin سيُبنى بوحدات واضحة:
          overview, orders, requests, analytics.
        </p>
      </Card>
    </Section>
  );
}
