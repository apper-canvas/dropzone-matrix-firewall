import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading files..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-gray-300">{message}</p>
        <div className="flex items-center justify-center space-x-1 text-sm text-gray-500">
          <ApperIcon name="Upload" size={16} className="animate-pulse" />
          <span>Processing your files...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;