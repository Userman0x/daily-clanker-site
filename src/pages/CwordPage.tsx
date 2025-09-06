import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ExternalLink,
  Copy
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Example features & roadmap items
const features = [
  {
    icon: "🔥",
    title: "Auto-Burn",
    description: "If someone dies or loses their keys, their $CWORD automatically goes up in flames. Totally AI-controlled, of course."
  },
  {
    icon: "🤖",
    title: "AI-Powered",
    description: "All satirical content is written by an algorithm. No humans were involved (except the overpriced API subscription)."
  },
  {
    icon: "💸",
    title: "1% Tax",
    description: "Every transaction pays a 1% fee—funding the AI overlords’ API access, because humor isn’t free."
  },
];


const roadmapItems = [
  { phase: "Phase 1", title: "Launch", status: "Current", items: ["Website live", "Token distribution"] },
  { phase: "Phase 2", title: "Growth", status: "Coming Soon", items: ["Community events", "Marketing campaigns"] },
];

const formatNumber = (num: number) => {
  if (!num) return "--";
  if (num >= 1_000_000) return `$${(num / 1_000_000).toFixed(2)}M`;
  if (num >= 1_000) return `$${(num / 1_000).toFixed(0)}K`;
  return `$${num.toFixed(2)}`;
};


const CwordPage: React.FC = () => {
  const navigate = useNavigate();useEffect(() => {
  // Scroll to top when this page mounts
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, []);

  const [copied, setCopied] = useState(false);
  const [tokenData, setTokenData] = useState<any>(null);
  const contractAddress = "ACbRrERR5GJnADhLhhanxrDCXJzGhyF64SKihbzBpump";

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        const resp = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${contractAddress}`
        );
        const data = await resp.json();
        if (data.pairs && data.pairs.length > 0) {
          const info = data.pairs[0];
          setTokenData({
            price: parseFloat(info.priceUsd),
            liquidity: info.liquidity?.usd,
            volume24h: info.volume?.h24,
            marketCap: info.fdv,
          });
        }
      } catch (err) {
        console.error("Error fetching DexScreener price:", err);
      }
    };

    fetchTokenData();
    const interval = setInterval(fetchTokenData, 15000);
    return () => clearInterval(interval);
  }, [contractAddress]);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  return (
    <div className="min-h-screen bg-cream-200">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => navigate("/")}
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
                  <Copy
                    size={14}
                    className={copied ? "text-green-600" : "text-gray-500"}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live DexScreener Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="bg-white p-6 border border-gray-300 text-center">
            <div className="text-2xl font-bold text-black mb-2">
              {tokenData ? `$${tokenData.price.toFixed(6)}` : "--"}
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Price</div>
          </div>
          <div className="bg-white p-6 border border-gray-300 text-center">
            <div className="text-2xl font-bold text-black mb-2">
              {formatNumber(tokenData?.marketCap)}
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Market Cap</div>
          </div>
          <div className="bg-white p-6 border border-gray-300 text-center">
            <div className="text-2xl font-bold text-black mb-2">
              {formatNumber(tokenData?.liquidity)}
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">Liquidity</div>
          </div>
          <div className="bg-white p-6 border border-gray-300 text-center">
            <div className="text-2xl font-bold text-black mb-2">
              {formatNumber(tokenData?.volume24h)}
            </div>
            <div className="text-sm text-gray-600 uppercase tracking-wide">24h Volume</div>
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
                <div className="text-black mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/*
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center font-serif">Tokenomics</h2>
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
                    <span className="text-gray-700">AI Overlords' Fee</span>
                    <span className="font-semibold">1%</span>
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
                    <span className="text-gray-700">Reserve</span>
                    <span className="font-semibold">14%</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-black mb-4">Utility</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• AI writes your daily satire for you</li>
                  <li>• Auto-burns lost keys</li>
                  <li>• 1% tax pays for overpriced APIs</li>
                  <li>• You don’t need governance—AI decides everything</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-black mb-8 text-center font-serif">Roadmap</h2>
          <div className="space-y-8">
            {[
              { phase: "Phase 1", title: "Launch", status: "Current", items: ["AI writes first articles", "Token goes live"] },
              { phase: "Phase 2", title: "Autopilot", status: "Coming Soon", items: ["All satire fully automated", "Burn mechanism activated"] },
              { phase: "Phase 3", title: "Infinity", status: "Future", items: ["AI takes over the world (maybe)", "You just hodl $CWORD"] },
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 border border-gray-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-black">{item.phase}: {item.title}</h3>
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
        */}


        {/* CTA Section */}
        <section className="text-center bg-black text-cream-50 p-12 mb-16">
          <h2 className="text-3xl font-bold mb-4 font-serif">Join the $CWORD Revolution</h2>
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
