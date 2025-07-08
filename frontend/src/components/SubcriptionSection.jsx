import { useEffect, useState } from 'react';
import PlanCard from '../components/PlainCard';

export default function SubscriptionSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className={`text-center mb-14 transition-all duration-700 transform opacity-0 translate-y-6 ${isLoaded ? 'opacity-100 translate-y-0' : ''}`}>
            <h3 className="text-4xl font-bold text-slate-800 mb-4">
              Choose Your <span className="text-blue-600">Plan</span>
            </h3>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Unlock unlimited access to thousands of ebooks with our flexible subscription options.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
            <PlanCard
              title="Weekly Plan"
              price="₹2.99"
              billingCycle="week"
              features={[
                "Access to 5,000+ ebooks",
                "1 active rental at a time",
                "Email support",
              ]}
              buttonText="Start Weekly"
              bgGradient="bg-gradient-to-br from-teal-50 to-emerald-100"
              borderColor="border-emerald-300"
              textColor="text-emerald-600"
              buttonColor="bg-emerald-500 hover:bg-emerald-600"
              badgeText="BEST FOR BEGINNERS"
              badgeColor="bg-emerald-500"
              delay="delay-75"
            />

            <PlanCard
              title="Monthly Plan"
              price="₹9.99"
              billingCycle="month"
              features={[
                "Access to 10,000+ ebooks",
                "3 simultaneous rentals",
                "Standard support",
              ]}
              buttonText="Get Started"
              delay="delay-150"
            />

            <PlanCard
              title="Yearly Plan"
              price="₹89.99"
              billingCycle="year"
              features={[
                "Access to 10,000+ ebooks",
                "5 simultaneous rentals",
                "Priority support",
                "Early access to new releases",
              ]}
              buttonText="Get Started"
              bgGradient="bg-gradient-to-br from-blue-50 to-indigo-100"
              borderColor="border-blue-200"
              textColor="text-blue-600"
              buttonColor="bg-blue-600 hover:bg-blue-700"
              badgeText="MOST POPULAR"
              badgeColor="bg-blue-600"
              delay="delay-200"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
