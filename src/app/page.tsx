import PaymentDashboard from '@/components/PaymentDashboard';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px]'>
      <main className='flex row-start-2'>
        <PaymentDashboard />
      </main>
    </div>
  );
}
