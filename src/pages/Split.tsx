import { useState } from "react";
import { PDFDocument } from "pdf-lib";

const Split = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const splitPDF = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      const numPages = pdfDoc.getPageCount();

      for (let i = 0; i < numPages; i++) {
        const newPdfDoc = await PDFDocument.create();
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
        newPdfDoc.addPage(copiedPage);

        const pdfBytes = await newPdfDoc.save();

        const blob = new Blob([new Uint8Array(pdfBytes)], {
          type: "application/pdf",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `page_${i + 1}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <form
        onSubmit={splitPDF}
        className="w-full max-w-lg bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-2">Split PDF Tool</h1>
        <p className="text-slate-400 text-sm mb-6">
          Upload a PDF and split it into individual pages.
        </p>

        {/* File Input */}
        <div className="mb-6">
          <label className="block text-sm text-slate-300 mb-2">
            Upload PDF file
          </label>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0 file:bg-emerald-600 file:text-white
            hover:file:bg-emerald-500 cursor-pointer"
          />
        </div>

        {/* File Info */}
        {file && (
          <div className="mb-6 bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-3">
            <p className="text-slate-200 text-sm truncate">{file.name}</p>
            <p className="text-slate-500 text-xs">
              {(file.size / 1024).toFixed(1)} KB
            </p>
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={!file || loading}
          className="w-full py-3 rounded-xl font-semibold transition
          bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700
          disabled:cursor-not-allowed text-white shadow-lg"
        >
          {loading ? "Splitting PDF..." : "Split PDF"}
        </button>

        {/* Hint */}
        <p className="text-xs text-slate-500 mt-4 text-center">
          Each page will download automatically after processing
        </p>
      </form>
    </div>
  );
};

export default Split;
