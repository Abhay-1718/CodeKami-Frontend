import { useState, useContext, useEffect } from "react"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import axios from "axios"
import { FaLaptopCode } from "react-icons/fa"
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi"
import { IoSparklesOutline } from "react-icons/io5"
import Navbar from "../Navbar/Navbar"
import { AppContext } from "../../context/AppContext"
import Homeimage from '../../assets/asking-question.png'

function Home() {
  const { backendUrl,} = useContext(AppContext)
  const [code, setCode] = useState(`function sum() {
    return 1 + 1
  }`)
  const [review, setReview] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [reviewStatus, setReviewStatus] = useState("idle")


  useEffect(() => {
    prism.highlightAll()
    setTimeout(() => setMounted(true), 100)
  }, [])

  async function reviewCode() {
    setIsLoading(true)
    setReviewStatus("idle")
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        `${backendUrl}/ai/get-review`,
        { code },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const reviewText = response.data?.response || "No review text available"
      setReview(reviewText)
      setReviewStatus("success")
    } catch (error) {
      console.error("Error reviewing code:", error)
      setReview("Error occurred while reviewing code")
      setReviewStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="pt-28 pb-16 px-4 sm:px-6 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 z-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-black"
                  style={{
                    width: `${Math.random() * 300 + 50}px`,
                    height: `${Math.random() * 300 + 50}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    opacity: Math.random() * 0.3,
                    animation: `float ${Math.random() * 10 + 15}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="animate-slideInLeft">
                <h1 className="text-4xl sm:text-5xl font-bold text-black mb-4 leading-tight">
                  <span className="relative inline-block after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[5px] after:bg-black after:transform after:scale-x-0 after:origin-bottom-left after:transition-transform after:duration-500 hover:after:scale-x-100">
                    AI-Powered
                  </span>
                  <br />
                  <span className="font-normal">Code Reviews</span>
                </h1>
                <p
                  className="text-gray-700 mb-8 leading-relaxed text-lg animate-fadeIn"
                  style={{ animationDelay: "0.3s" }}
                >
                  Codekami is an intelligent code review platform that helps developers write cleaner, more efficient
                  code. Our AI analyzes your code and provides actionable insights to improve quality and follow best
                  practices.
                </p>
                <div className="flex flex-wrap gap-4 animate-fadeIn" style={{ animationDelay: "0.6s" }}>
                  <button className="px-6 py-3 bg-black text-white font-medium rounded-full hover:shadow-[0_0_15px_rgba(0,0,0,0.3)] transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden group">
                    <span className="relative z-10">Try Now</span>
                    <span className="absolute top-0 left-0 w-full h-0 bg-gray-800 transition-all duration-300 group-hover:h-full z-0"></span>
                  </button>
                  <button className="px-6 py-3 border-2 border-black text-black font-medium rounded-full hover:bg-black hover:text-white transition-colors duration-300">
                    Subscribe
                  </button>
                </div>
              </div>

              {/* Right Column - Illustration */}
              <div className="flex justify-center items-center animate-slideInRight">
                <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-lg">
                  <img 
                    src={Homeimage} 
                    className="object-cover w-full h-auto" 
                    alt="AI Code Review Illustration" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Code Review Section */}
        <section className="py-16 bg-gray-50 relative">
          {/* Background pattern */}
          <div className="absolute inset-0 z-0 opacity-5">
            <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
              {[...Array(100)].map((_, i) => (
                <div key={i} className="border border-black opacity-10"></div>
              ))}
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
            <div className="text-center mb-12 animate-fadeIn">
              <h2 className="text-3xl font-bold text-black mb-4 inline-block relative">
                Code Review
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-black"></span>
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Try our AI-powered code review to improve your code quality and learn best practices.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Editor Panel */}
              <div className="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden transform transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] animate-slideInLeft">
                <div className="px-4 py-3 bg-black text-white border-b border-gray-800 flex items-center">
                  <FaLaptopCode className="w-5 h-5 text-white mr-2" />
                  <span className="text-sm font-medium">Your Code</span>
                </div>
                <div className="p-4 h-96 bg-gray-50">
                  <div className="h-full w-full bg-white rounded-lg shadow-inner p-1 border border-gray-200">
                    <Editor
                      value={code}
                      onValueChange={setCode}
                      highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
                      padding={16}
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: 14,
                        height: "100%",
                        width: "100%",
                        color: "#333",
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                      }}
                      className="h-full w-full focus:outline-none"
                    />
                  </div>
                </div>
                <div className="px-4 py-4 bg-gray-100 border-t border-gray-200">
                  <button
                    onClick={reviewCode}
                    disabled={isLoading}
                    className="w-full py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <IoSparklesOutline className="w-4 h-4 mr-2" />
                          Review Code
                        </>
                      )}
                    </span>
                    <span className="absolute top-0 left-0 w-0 h-full bg-gray-700 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                </div>
              </div>

              {/* Review Panel */}
              <div className="bg-white rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.1)] overflow-hidden transform transition-all duration-300 hover:shadow-[0_15px_35px_rgba(0,0,0,0.2)] animate-slideInRight">
                <div className="px-4 py-3 bg-black text-white border-b border-gray-800 flex items-center justify-between">
                  <div className="flex items-center">
                    <IoSparklesOutline className="w-5 h-5 text-white mr-2" />
                    <span className="text-sm font-medium">AI Review</span>
                  </div>
                  {reviewStatus !== "idle" && (
                    <div className="flex items-center">
                      {reviewStatus === "success" ? (
                        <div className="flex items-center px-2 py-1 bg-gray-800 rounded-full">
                          <FiCheckCircle className="w-4 h-4 text-green-400" />
                          <span className="ml-1 text-xs font-medium text-white">Complete</span>
                        </div>
                      ) : (
                        <div className="flex items-center px-2 py-1 bg-gray-800 rounded-full">
                          <FiAlertCircle className="w-4 h-4 text-red-400" />
                          <span className="ml-1 text-xs font-medium text-white">Failed</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="p-4 h-96 overflow-auto bg-gray-50">
                  <div className="prose max-w-none bg-white p-6 rounded-lg shadow-inner min-h-full border border-gray-200">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <div className="flex flex-col items-center">
                          <div className="relative w-16 h-16">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-black rounded-full animate-spin"></div>
                          </div>
                          <p className="text-gray-500 mt-4">Analyzing your code...</p>
                        </div>
                      </div>
                    ) : (
                      <Markdown rehypePlugins={[rehypeHighlight]}>
                        {review ||
                          "Your AI-powered code review will appear here. Click 'Review Code' to analyze your code and get personalized recommendations."}
                      </Markdown>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.8s ease-out forwards;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #555;
        }
        
        /* Prose styling for markdown */
        .prose pre {
          background-color: #f8f9fa;
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
        }
        
        .prose code {
          color: #333;
          font-weight: 500;
        }
        
        .prose h1, .prose h2, .prose h3 {
          color: #111827;
        }
        
        .prose ul {
          list-style-type: disc;
          padding-left: 1.5rem;
        }
        
        .prose p {
          margin-bottom: 1rem;
        }
      `}</style>
    </>
  )
}

export default Home