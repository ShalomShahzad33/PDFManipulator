import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-3xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          PDF Toolkit
        </h1>

        <p className="text-slate-400 text-lg mb-10">
          Merge and split PDFs instantly in your browser. No uploads. No server.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Merge */}
          <Link
            to="/merge"
            className="group bg-slate-900/60 border border-slate-700 rounded-2xl p-8
            hover:border-indigo-500 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-2xl font-semibold text-white mb-2 group-hover:text-indigo-400">
              Merge PDFs
            </div>

            <p className="text-slate-400 text-sm mb-6">
              Combine multiple PDF files into a single document with ease.
            </p>

            <div className="inline-flex items-center gap-2 text-indigo-400 font-medium">
              Open Tool →
            </div>
          </Link>

          {/* Split */}
          <Link
            to="/split"
            className="group bg-slate-900/60 border border-slate-700 rounded-2xl p-8
            hover:border-emerald-500 hover:shadow-xl transition-all duration-300"
          >
            <div className="text-2xl font-semibold text-white mb-2 group-hover:text-emerald-400">
              Split PDF
            </div>

            <p className="text-slate-400 text-sm mb-6">
              Break a PDF into individual pages and download them separately.
            </p>

            <div className="inline-flex items-center gap-2 text-emerald-400 font-medium">
              Open Tool →
            </div>
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-12 space-y-3">
          <p className="text-xs text-slate-600">
            Runs fully in your browser using pdf-lib • No data leaves your
            device
          </p>

          <p className="text-sm text-slate-400">
            Made by{" "}
            <span className="text-white font-medium">Shalom Shahzad</span>
          </p>

          <a
            href="https://github.com/ShalomShahzad33/PDFManipulator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-indigo-400 hover:text-indigo-300 text-sm underline underline-offset-4"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
