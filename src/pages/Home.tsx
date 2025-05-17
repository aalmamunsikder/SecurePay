import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CreditCard, ShieldCheck, RefreshCw, DollarSign } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary-600 via-secondary-500 to-accent-500 leading-tight mb-6">
            Secure Payment Solutions for Your Business
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Streamline your payment operations with our comprehensive platform. Accept payments, manage withdrawals, and keep track of all transactions in one place.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/register" className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center">
              Create Account <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link to="/auth/login" className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300 flex items-center justify-center">
              Login to Platform
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white rounded-2xl shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
            Features <span className="text-primary-500">That Set Us Apart</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-primary-50 to-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center mb-4">
                <CreditCard className="text-primary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Seamless Payments</h3>
              <p className="text-gray-600">
                Integrate with multiple payment processors to offer your customers flexible payment options.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-secondary-50 to-purple-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-secondary-100 flex items-center justify-center mb-4">
                <ShieldCheck className="text-secondary-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Enhanced Security</h3>
              <p className="text-gray-600">
                Industry-standard security measures to protect sensitive financial data and transactions.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-accent-50 to-pink-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-accent-100 flex items-center justify-center mb-4">
                <RefreshCw className="text-accent-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Real-time Processing</h3>
              <p className="text-gray-600">
                Instant transaction processing with real-time notifications and status updates.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-success-50 to-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300 transform hover:-translate-y-1">
              <div className="w-14 h-14 rounded-full bg-success-100 flex items-center justify-center mb-4">
                <DollarSign className="text-success-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Flexible Withdrawals</h3>
              <p className="text-gray-600">
                Managed withdrawal system with approval workflows and customizable limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            How It <span className="text-primary-500">Works</span>
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Our platform is designed to be simple yet powerful, catering to all your payment needs.
          </p>
          
          <div className="space-y-12">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Create Your Account</h3>
                <p className="text-gray-600">
                  Sign up for a free account to get started. Based on your role, you'll have access to different features and capabilities within the platform.
                </p>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-secondary-500 to-accent-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Set Up Your Payment Links</h3>
                <p className="text-gray-600">
                  Create custom payment links for your business that you can share with customers. Each link can be customized with your branding and payment options.
                </p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Receive Payments</h3>
                <p className="text-gray-600">
                  Your customers can now make payments through your payment links. All transactions are processed securely and recorded in your dashboard.
                </p>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-success-500 to-success-700 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Manage Your Business</h3>
                <p className="text-gray-600">
                  Use our comprehensive dashboard to monitor transactions, handle withdrawal requests, manage users, and generate reports for your business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 mt-8 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-2xl shadow-lg text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of businesses that trust our platform for their payment needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/register" className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300">
              Create Account
            </Link>
            <Link to="/auth/login" className="px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition duration-300">
              Log In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 mt-16 text-center text-gray-600">
        <p>© {new Date().getFullYear()} SecurePay. All rights reserved.</p>
        <div className="flex justify-center gap-8 mt-4">
          <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-primary-500 transition-colors">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;