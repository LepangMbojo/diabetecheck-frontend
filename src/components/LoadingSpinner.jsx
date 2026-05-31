const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="text-blue-600 font-medium animate-pulse">AI sedang menganalisis data Anda...</p>
    </div>
  );
};

export default LoadingSpinner;