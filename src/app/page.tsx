import PaymentDashboard from '@/components/PaymentDashboard';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <PaymentDashboard />
      </main>
    </div>
  );
}

// Task Instructions:

// TODO 1 - Fix and Enhance Existing Functionality
// Optimize the handleCheckTransactions function to improve performance and
// handle edge cases (e.g., empty transactions or invalid inputs).

// TODO  2 - Add Input Validation
// Ensure users cannot add transactions with duplicate IDs or negative amounts.

// TODO 3 - Extend Functionality
// Add a feature that calculates and dynamically displays the total sum of all transactions as new ones are added.

// TODO 4 - Optional Bonus Task
// Style the application minimally to improve readability and usability. Use inline styles or
// basic CSS classes (this step is not mandatory).

// TODO Important: All tasks should be completed and shared via a public repository. Ensure the repository includes:
// -The complete code.
// -A README.md file with instructions for running and testing the project.
// -Clear commit messages documenting your progress.
