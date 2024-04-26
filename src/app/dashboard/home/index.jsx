import DashboardLayout from "../../../components/DashboardLayout";

const Home = () => {
  return (
    <DashboardLayout
      body={
        <div className="bg-gray-100 min-h-screen flex items-center gap-9 justify-center">
          <img src="/assets/logo.png" alt="logo" />
          <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold mb-4">
              Welcome to HarvestHub
            </h1>
            <p className="text-gray-700 mb-4">
              Thank you for visiting our website. We are excited to have you
              here!
            </p>
            <p className="text-gray-700 mb-4">
              Whether you need a plumber, electrician, gardener, or any other
              service, our platform makes it easy to find reliable
              professionals.
            </p>
          </div>
        </div>
      }
    />
  );
};

export default Home;
