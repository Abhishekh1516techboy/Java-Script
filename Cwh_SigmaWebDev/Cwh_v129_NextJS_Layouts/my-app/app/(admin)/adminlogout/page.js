export default function Logout() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Logging Out...
        </h2>
        <p className="text-gray-600 mb-4">
          You are being logged out. Please wait...
        </p>
        <div className="animate-spin h-8 w-8 border-t-4 border-blue-500 border-solid rounded-full mx-auto"></div>
      </div>
    </div>
  );
}
