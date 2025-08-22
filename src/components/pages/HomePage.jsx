import { motion } from "framer-motion";
import Header from "@/components/organisms/Header";
import FileUploadArea from "@/components/organisms/FileUploadArea";
import ApperIcon from "@/components/ApperIcon";
import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-gray-900 to-surface">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-8"
        >
          {/* Welcome Section */}
          <div className="text-center space-y-4 py-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
            >
              Upload Files{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Effortlessly
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Drag, drop, and upload multiple files with real-time progress tracking. 
              Support for images, documents, videos, and more.
            </motion.p>
          </div>

          {/* Upload Area */}
          <FileUploadArea />
          
          {/* Features Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="grid md:grid-cols-3 gap-6 py-8"
          >
            {[
              {
                icon: "Zap",
                title: "Lightning Fast",
                description: "Optimized upload speeds with chunked file processing for the best performance."
              },
              {
                icon: "Shield",
                title: "Secure & Safe",
                description: "Your files are processed securely with industry-standard encryption protocols."
              },
              {
                icon: "FileType",
                title: "Multiple Formats",
                description: "Support for images, documents, videos, audio files, and many other formats."
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
className="card-elevated p-6 text-center hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
>
<div className="flex items-center justify-center w-12 h-12 bg-gradient-primary/20 rounded-lg mx-auto mb-4">
  <ApperIcon name={feature.icon} size={24} className="text-primary" />
</div>
<h3 className="text-lg font-semibold text-white mb-2">
  {feature.title}
</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </main>
      
      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.8 }}
        className="border-t border-gray-700/50 bg-surface/30 backdrop-blur-sm"
      >
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Files Manager Pro. Built with React + Vite.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;