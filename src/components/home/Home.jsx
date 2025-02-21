import { useState, useContext, useEffect } from "react";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import axios from "axios";
import { FaLaptopCode } from "react-icons/fa";
import { RxMagicWand } from "react-icons/rx";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";
import { IoSparklesOutline } from "react-icons/io5";
import { LuFileCode2, LuArrowRight } from "react-icons/lu";
import Navbar from "../Navbar/Navbar";
import { AppContext } from '../../context/AppContext';
import { useNavigate } from "react-router-dom";

function Home() {
  const { backendUrl, isLoggedin } = useContext(AppContext);
  const [code, setCode] = useState(`function sum() {
    return 1 + 1
  }`);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [reviewStatus, setReviewStatus] = useState("idle");
  const navigate = useNavigate();
  
  

  useEffect(() => {
    if (!isLoggedin) {
      navigate('/auth');
    }
  }, [isLoggedin, navigate]);

  useEffect(() => {
    prism.highlightAll();
    setTimeout(() => setMounted(true), 100);
  }, []);

  async function reviewCode() {
    setIsLoading(true);
    setReviewStatus("idle");
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${backendUrl}/ai/get-review`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const reviewText = response.data?.response || "No review text available";
      setReview(reviewText);
      setReviewStatus("success");
    } catch (error) {
      console.error("Error reviewing code:", error);
      setReview("Error occurred while reviewing code");
      setReviewStatus("error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-all duration-500 overflow-hidden pt-20">
        {/* Subtle Animated Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-100/10 dark:bg-blue-900/10 rounded-full blur-3xl animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-100/10 dark:bg-purple-900/10 rounded-full blur-3xl animate-float-delayed" />
          </div>
        </div>

        <div
          className={`relative transition-all duration-1000 transform ${mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          {/* Header */}
          <div className="relative pt-16 pb-12 text-center">
            <div className="flex justify-center mb-8">
              <div className="relative group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 opacity-0 group-hover:opacity-20 rounded-full transition-all duration-300" />
                <LuFileCode2 className="w-24 h-24 text-gray-800 dark:text-gray-100 animate-floating" />
              </div>
            </div>

            <div className="space-y-8 slide-up-animation">
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tighter inline-flex items-center justify-center gap-4">
                <span className="bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Code Kami
                </span>
                <span className="inline-block animate-bounce-subtle">
                  <IoSparklesOutline className="w-8 sm:w-12 h-8 sm:h-12 text-blue-400 dark:text-blue-500" />
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg sm:text-xl font-light leading-relaxed">
                Elevate your code with AI-powered insights and professional review
              </p>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-12 fade-in-animation">
              <div className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-200 transition-all duration-300">
                <RxMagicWand className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 animate-pulse" />
                <span>AI Powered</span>
              </div>
              <div className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 text-sm sm:text-base text-gray-700 dark:text-gray-200 transition-all duration-300">
                <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500 animate-pulse" />
                <span>Real-time Analysis</span>
              </div>
            </div>
          </div>

          <div className="container mx-auto max-w-7xl px-4 sm:px-6 pb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Editor Panel */}
              <div className="flex flex-col gap-6 slide-in-left">
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-xl opacity-50 blur group-hover:opacity-75 transition-all duration-500" />

                  <div className="relative rounded-xl overflow-hidden backdrop-blur-lg border border-gray-200 dark:border-gray-700">
                    <div className="h-12 sm:h-16 bg-white dark:bg-gray-800 flex items-center px-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4 sm:space-x-6">
                        <div className="flex space-x-2">
                          {["bg-red-400", "bg-yellow-400", "bg-green-400"].map((color, i) => (
                            <div
                              key={i}
                              className={`w-2 sm:w-3 h-2 sm:h-3 rounded-full ${color} transform hover:scale-125 transition-transform duration-300`}
                            />
                          ))}
                        </div>
                        <div className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-300">
                          <FaLaptopCode className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-500 dark:text-blue-400 animate-pulse" />
                          <span className="font-medium">code_review.js</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-900 shadow-2xl h-[400px] sm:h-[500px] transition-all duration-300">
                      <Editor
                        value={code}
                        onValueChange={setCode}
                        highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
                        padding={16}
                        style={{
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: 14,
                          backgroundColor: "transparent",
                          height: "100%",
                          width: "100%",
                          color: "white",
                        }}
                        className="h-full w-full focus:outline-none text-gray-800 dark:text-gray-100"
                      />
                    </div>
                  </div>
                </div>

                {/* Review Button */}
                <button
                  onClick={reviewCode}
                  disabled={isLoading}
                  className={`
                    group relative overflow-hidden px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-medium text-sm sm:text-base
                    transform transition-all duration-500 ease-out
                    ${
                      isLoading
                        ? "bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                        : "bg-gradient-to-r from-gray-800 to-gray-700 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-400/10 hover:-translate-y-1"
                    }
                  `}
                >
                  <span
                    className={`relative z-10 flex items-center justify-center gap-3 ${isLoading ? "opacity-0" : "opacity-100"}`}
                  >
                    <span>Review Code</span>
                    {!isLoading && (
                      <LuArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform" />
                    )}
                  </span>
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-current border-t-transparent rounded-full animate-spin" />
                    </div>
                  )}
                </button>
              </div>

              {/* Review Panel */}
              <div className="group relative slide-in-right">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-200 to-blue-200 dark:from-purple-800 dark:to-blue-800 rounded-xl opacity-50 blur group-hover:opacity-75 transition-all duration-500" />

                <div className="relative min-h-[400px] sm:min-h-[500px] bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 backdrop-blur-lg transition-all duration-300">
                  <div className="h-12 sm:h-16 bg-white dark:bg-gray-800 flex items-center justify-between px-4 sm:px-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-3">
                      <IoSparklesOutline className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 dark:text-purple-400 animate-pulse" />
                      <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300">
                        AI Review Output
                      </span>
                    </div>
                    {reviewStatus !== "idle" && (
                      <div
                        className={`flex items-center gap-2 text-xs sm:text-sm font-medium ${
                          reviewStatus === "success"
                            ? "text-blue-500 dark:text-blue-400"
                            : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {reviewStatus === "success" ? (
                          <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce-subtle" />
                        ) : (
                          <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 animate-bounce-subtle" />
                        )}
                        <span>{reviewStatus === "success" ? "Review Complete" : "Review Failed"}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4 sm:p-8 h-[400px] sm:h-[500px] overflow-auto custom-scrollbar">
                    <div className="prose dark:prose-invert max-w-none">
                      <Markdown rehypePlugins={[rehypeHighlight]} className="text-gray-800 dark:text-gray-100">
                        {review || "Your AI-powered code review will appear here..."}
                      </Markdown>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Element */}
        <div className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200 dark:from-blue-800 dark:via-purple-800 dark:to-blue-800 opacity-50" />
      </main>
    </>
  );
}

export default Home;
