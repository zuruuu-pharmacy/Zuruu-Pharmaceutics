import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service - Zuruu Pharmaceutics",
  description: "Terms of service for Zuruu Pharmaceutics platform",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing and using Zuruu Pharmaceutics, you accept and agree to be bound by 
                the terms and provision of this agreement.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Use License</h2>
              <p className="text-gray-700 mb-4">
                Permission is granted to temporarily use Zuruu Pharmaceutics for personal, 
                non-commercial transitory viewing only.
              </p>
              <p className="text-gray-700">
                This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
              <p className="text-gray-700">
                The materials on Zuruu Pharmaceutics are provided on an 'as is' basis. 
                Zuruu Pharmaceutics makes no warranties, expressed or implied, and hereby 
                disclaims and negates all other warranties including without limitation, 
                implied warranties or conditions of merchantability, fitness for a particular 
                purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Limitations</h2>
              <p className="text-gray-700">
                In no event shall Zuruu Pharmaceutics or its suppliers be liable for any 
                damages (including, without limitation, damages for loss of data or profit, 
                or due to business interruption) arising out of the use or inability to use 
                the materials on Zuruu Pharmaceutics, even if Zuruu Pharmaceutics or an 
                authorized representative has been notified orally or in writing of the 
                possibility of such damage.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms of Service, please contact us at 
                <a href="mailto:legal@zuruupharmaceutics.com" className="text-blue-600 hover:text-blue-800">
                  legal@zuruupharmaceutics.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
