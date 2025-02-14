import { useState, useEffect } from 'react';
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import axios from 'axios';
import { FaLaptopCode } from "react-icons/fa";
import { RxMagicWand } from "react-icons/rx";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { LuFileCode2, LuArrowRight } from "react-icons/lu";

function Home() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`);
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reviewStatus, setReviewStatus] = useState('idle');

  useEffect(() => {
    prism.highlightAll();
    setTimeout(() => setMounted(true), 100);
  }, []);

  async function reviewCode() {
    setIsLoading(true);
    setReviewStatus('idle');
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      const reviewText = response.data && typeof response.data.response === 'string'
        ? response.data.response
        : 'No review text available';
      setReview(reviewText);
      setReviewStatus('success');
    } catch (error) {
      console.error('Error reviewing code:', error);
      setReview('Error occurred while reviewing code');
      setReviewStatus('error');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 transition-all duration-500 overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-200/20 via-purple-200/20 to-pink-200/20 dark:from-blue-800/20 dark:via-purple-800/20 dark:to-pink-800/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-green-200/20 via-teal-200/20 to-cyan-200/20 dark:from-green-800/20 dark:via-teal-800/20 dark:to-cyan-800/20 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-tr from-yellow-200/20 via-orange-200/20 to-red-200/20 dark:from-yellow-800/20 dark:via-orange-800/20 dark:to-red-800/20 rounded-full blur-3xl animate-pulse" />
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      </div>

      <div className={`relative transition-all duration-1000 transform ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        {/* Enhanced Header with 3D Effect */}
        <div className="relative pt-16 pb-12 text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-zinc-400 to-transparent animate-pulse" />
          
          <div className="flex justify-center mb-8 perspective-animation">
            <div className="relative group cursor-pointer transform-style-3d">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500" />
              <div className="relative transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                <LuFileCode2 className="w-20 h-20 text-black dark:text-white animate-floating" />
              </div>
            </div>
          </div>

          <div className="space-y-6 slide-up-animation">
            <h1 className="text-6xl font-bold tracking-tighter inline-flex items-center justify-center gap-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                Code Kami
              </span>
              <span className="inline-block animate-bounce-subtle">
                <IoSparklesOutline className="w-10 h-10 text-purple-500 dark:text-purple-400" />
              </span>
            </h1>
            <p className="text-white dark:text-zinc-400 max-w-2xl mx-auto text-xl font-light leading-relaxed">
              Elevate your code with AI-powered insights and professional review
            </p>
          </div>

          {/* Enhanced Feature Pills with Hover Effects */}
          <div className="flex justify-center gap-6 mt-10 fade-in-animation">
            <div className="px-6 py-3 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 transition-all duration-300">
              <RxMagicWand className="w-5 h-5 text-purple-500 animate-pulse" />
              <span>AI Powered</span>
            </div>
            <div className="px-6 py-3 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400 transition-all duration-300">
              <FiCheckCircle className="w-5 h-5 text-green-500 animate-pulse" />
              <span>Real-time Analysis</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Enhanced Editor Panel with Glass Effect */}
            <div className="flex flex-col gap-6 slide-in-left">
              <div className="group relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl opacity-50 blur group-hover:opacity-75 transition-all duration-500" />
                
                <div className="relative rounded-lg overflow-hidden backdrop-blur-lg">
                  <div className="h-14 bg-white/90 dark:bg-zinc-900/90 flex items-center px-6 border-b border-zinc-200/50 dark:border-zinc-700/50">
                    <div className="flex items-center space-x-6">
                      <div className="flex space-x-2">
                        {['bg-red-400', 'bg-yellow-400', 'bg-green-400'].map((color, i) => (
                          <div key={i} className={`w-3 h-3 rounded-full ${color} transform hover:scale-125 transition-transform duration-300`} />
                        ))}
                      </div>
                      <div className="flex items-center text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors duration-300">
                        <FaLaptopCode className="w-5 h-5 mr-2 animate-pulse" />
                        <span className="font-medium">code_review.js</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/90 dark:bg-zinc-900/90 shadow-2xl h-[500px] transition-all duration-300">
                    <Editor
                      value={code}
                      onValueChange={code => setCode(code)}
                      highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                      padding={24}
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 14,
                        backgroundColor: 'transparent',
                        height: '100%',
                        width: '100%',
                        color:'white',
                      }}
                      className="h-full w-full focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Enhanced Review Button with Animation */}
              <button
                onClick={reviewCode}
                disabled={isLoading}
                className={`
                  group relative overflow-hidden px-8 py-4 rounded-lg font-medium text-sm
                  transform transition-all duration-500 ease-out
                  ${isLoading ? 
                    'bg-zinc-200 dark:bg-zinc-800 cursor-not-allowed' : 
                    'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 text-white hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-400/20 hover:-translate-y-1'
                  }
                `}
              >
                <span className={`
                  relative z-10 flex items-center justify-center gap-3 text-base
                  ${isLoading ? 'opacity-0' : 'opacity-100'}
                `}>
                  <span>Review Code</span>
                  {!isLoading && (
                    <LuArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  )}
                </span>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
              </button>
            </div>

            {/* Enhanced Review Panel with Glass Effect */}
            <div className="group relative slide-in-right">
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl opacity-50 blur group-hover:opacity-75 transition-all duration-500" />
              
              <div className="relative min-h-[500px] bg-white/90 dark:bg-zinc-900/90 rounded-lg shadow-2xl border border-zinc-200/50 dark:border-zinc-800/50 backdrop-blur-lg transition-all duration-300">
                <div className="h-14 bg-white/90 dark:bg-zinc-900/90 flex items-center justify-between px-6 border-b border-zinc-200/50 dark:border-zinc-700/50">
                  <div className="flex items-center space-x-3">
                    <IoSparklesOutline className="w-5 h-5 text-purple-500 animate-pulse" />
                    <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">AI Review Output</span>
                  </div>
                  {reviewStatus !== 'idle' && (
                    <div className={`flex items-center gap-2 text-sm font-medium ${
                      reviewStatus === 'success' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {reviewStatus === 'success' ? (
                        <FiCheckCircle className="w-5 h-5 animate-bounce-subtle" />
                      ) : (
                        <FiAlertCircle className="w-5 h-5 animate-bounce-subtle" />
                      )}
                      <span>{reviewStatus === 'success' ? 'Review Complete' : 'Review Failed'}</span>
                    </div>
                  )}
                </div>
                <div className="p-8 h-[500px] overflow-auto custom-scrollbar">
                  <div className="prose dark:prose-invert max-w-none">
                    <Markdown rehypePlugins={[rehypeHighlight]} className={"text-white"} >
                      {review || 'Your AI-powered code review will appear here...'}
                    </Markdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Bottom Decorative Element */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />
    </main>
  );
}

// Previous component code remains the same until the style constant...

const style = `
@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-20px) rotate(5deg); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-20px) rotate(-5deg); }
}

@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes floating {
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-8px) scale(1.05); }
}

@keyframes scale {
  0% { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes slideUp {
  0% { transform: translateY(20px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes slideInLeft {
  0% { transform: translateX(-20px) translateY(20px); opacity: 0; }
  100% { transform: translateX(0) translateY(0); opacity: 1; }
}

@keyframes slideInRight {
  0% { transform: translateX(20px) translateY(20px); opacity: 0; }
  100% { transform: translateX(0) translateY(0); opacity: 1; }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite;
  animation-delay: 4s;
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

.animate-floating {
  animation: floating 3s ease-in-out infinite;
}

.scale-animation {
  animation: scale 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-up-animation {
  animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.fade-in-animation {
  animation: fadeIn 1s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-in-left {
  animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-in-right {
  animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.perspective-animation {
  perspective: 1000px;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #52525b;
  border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #71717a;
}
`;

export default Home;