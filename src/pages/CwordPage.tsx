import React, { useEffect } from 'react';
import { ArrowLeft, TrendingUp, Users, Shield, Zap, ExternalLink, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CwordPage: React.FC = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const contractAddress = "0x1234567890abcdef1234567890abcdef12345678"; // Replace with actual contract address

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const features = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Deflationary Mechanics",
      description: "Built-in burn mechanisms reduce supply over time, creating scarcity and potential value appreciation."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description: "Governance tokens allow holders to vote on key decisions affecting the Daily Clanker ecosystem."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Audited & Secure",
      description: "Smart contracts have been thoroughly audited by leading security firms to ensure safety."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Utility Token",
      description: "Use $CWORD for premium content access, exclusive features, and ecosystem rewards."
    }
  ];

  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Token Launch",
      status: "Current",
      items: ["Token deployment", "Initial liquidity provision", "Community building"]
    },
    {
      phase: "Phase 2",
      title: "Platform Integration",
      status: "Coming Soon",
      items: ["Premium content gating", "Staking rewards", "Governance implementation"]
    },
    {
      phase: "Phase 3",
      title: "Ecosystem Expansion",
      status: "Future",
      items: ["NFT marketplace", "Cross-chain bridge", "Mobile app launch"]
    }
  ];

  return (
    <div className="min-h-screen bg-cream-200">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center space-x-2 text-gray-700 hover:text-black transition-colors mb-8 font-medium underline"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-8">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-black mb-4 font-serif">
              $CWORD
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-6 max-w-3xl mx-auto">
              The official token of Daily Clanker - powering the future of satirical AI journalism
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-black text-cream-50 px-8 py-4 font-semibold hover:bg-gray-800 transition-colors flex items-center space-x-2">
                <span>Buy $CWORD</span>
                <ExternalLink size={16} />
              </button>
              <div className="flex items-center space-x-2 bg-white border border-gray-300 px-4 py-2 rounded">
                <span className="text-sm font-mono text-gray-600 truncate max-w-48">
                  {contractAddress}
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Copy contract address"
                >
                  <Copy size={14} className={copied ? "text-green-600" : "text-gray-500"} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 border border-gray-300 text-center">
            <div className="text-2xl font-bold text-black mb-2">1B</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Total Supply</div>
          </div>
          <div className="bg-white p-6 border border-gray-300 text-center">
            <div className="text-2xl font-bold text-black mb-2">5%</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Burn Rate</div>
          </div>
          <div className="bg-white p-6 border border-gray-300 text-center">
            <div className="text-2xl font-bold text-black mb-2">10K+</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Holders</div>
          </div>
          <div className="bg-white p-6 border border-gray-300 text-center">
            <div className="text-2xl font-bold text-black mb-2">$2.5M</div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Market Cap</div>
          </div>
        </div>

        {/* Features Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center font-serif">
            Why $CWORD?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 border border-gray-300">
                <div className="text-black mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tokenomics Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center font-serif">
            Tokenomics
          </h2>
          <div className="bg-white p-8 border border-gray-300">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-black mb-4">Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Public Sale</span>
                    <span className="font-semibold">40%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Liquidity Pool</span>
                    <span className="font-semibold">25%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Team & Development</span>
                    <span className="font-semibold">20%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Marketing</span>
                    <span className="font-semibold">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Reserve</span>
                    <span className="font-semibold">5%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-4">Utility</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Premium article access</li>
                  <li>• Governance voting rights</li>
                  <li>• Staking rewards</li>
                  <li>• Exclusive content creation</li>
                  <li>• Community events access</li>
                  <li>• NFT marketplace currency</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center font-serif">
            Roadmap
          </h2>
          <div className="space-y-8">
            {roadmapItems.map((item, index) => (
              <div key={index} className="bg-white p-8 border border-gray-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-black">
                    {item.phase}: {item.title}
                  </h3>
                  <span className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                    item.status === 'Current' 
                      ? 'bg-green-100 text-green-800' 
                      : item.status === 'Coming Soon'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <ul className="space-y-2 text-gray-700">
                  {item.items.map((subItem, subIndex) => (
                    <li key={subIndex}>• {subItem}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-black text-cream-50 p-12 mb-16">
          <h2 className="text-3xl font-bold mb-4 font-serif">
            Join the $CWORD Revolution
          </h2>
          <p className="text-lg mb-8 text-cream-200 max-w-2xl mx-auto">
            Be part of the future of satirical journalism. Hold $CWORD and help shape the Daily Clanker ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-cream-50 text-black px-8 py-4 font-semibold hover:bg-cream-100 transition-colors">
              Buy on Uniswap
            </button>
            <button className="border border-cream-50 text-cream-50 px-8 py-4 font-semibold hover:bg-cream-50 hover:text-black transition-colors">
              Join Telegram
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-cream-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-lg font-bold font-serif mb-4">Daily Clanker</h3>
              <p className="text-sm text-cream-100 leading-relaxed">
                Clankers were harmed in the making of this website.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide text-cream-100">Token</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Buy $CWORD</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Tokenomics</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Whitepaper</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Audit Report</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold mb-4 uppercase tracking-wide text-cream-100">Community</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Telegram</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Discord</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Twitter</a></li>
                <li><a href="#" className="text-cream-200 hover:text-cream-50 transition-colors underline">Reddit</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-xs text-cream-200">
              © 2025 Daily Clanker. Robots were harmed in the making of this satire.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CwordPage;