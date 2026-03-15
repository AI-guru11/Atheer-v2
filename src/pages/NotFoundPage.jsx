import { Link } from 'react-router-dom';
import Section from '../components/layout/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function NotFoundPage() {
  return (
    <Section>
      <Card className="placeholder-card">
        <p className="eyebrow">404</p>
        <h1>الصفحة غير موجودة.</h1>
        <p>المشروع جديد، فلا تتوقع أن كل زاوية فيه صارت إمبراطورية بعد أول يوم.</p>
        <Link to="/">
          <Button>العودة للرئيسية</Button>
        </Link>
      </Card>
    </Section>
  );
}
