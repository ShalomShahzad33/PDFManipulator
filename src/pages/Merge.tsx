import { PDFDocument } from "pdf-lib";
import { useState } from "react";

const Merge = () => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    if (!files) return;

    setFiles(files);
  };

  const mergePDFs = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (files.length < 2) {
      alert("Please select at least two PDF files to merge.");
      return;
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);

      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());

      copiedPages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedPdfFile = await mergedPdf.save();

    const blob = new Blob([new Uint8Array(mergedPdfFile)], {
      type: "application/pdf",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "merged.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-6">
      <form
        onSubmit={mergePDFs}
        className="w-full max-w-xl bg-slate-900/60 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8"
      >
        {/* Header */}
        <h1 className="text-2xl font-bold text-white mb-2">Merge PDF Tool</h1>
        <p className="text-slate-400 text-sm mb-6">
          Select multiple PDFs and merge them into one file.
        </p>

        {/* File Input */}
        <div className="mb-6">
          <label className="block text-sm text-slate-300 mb-2">
            Upload PDF files
          </label>

          <input
            type="file"
            multiple
            accept="application/pdf"
            onChange={handleFileChange}
            className="w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0 file:bg-indigo-600 file:text-white
            hover:file:bg-indigo-500 cursor-pointer"
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mb-6">
            <h3 className="text-slate-200 font-medium mb-3">
              Selected Files ({files.length})
            </h3>

            <div className="max-h-48 overflow-y-auto space-y-2 pr-2">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2"
                >
                  <span className="text-slate-200 text-sm truncate max-w-[70%]">
                    {file.name}
                  </span>

                  <span className="text-slate-400 text-xs">
                    {(file.size / 1024).toFixed(1)} KB
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={files.length < 2}
          className="w-full py-3 rounded-xl font-semibold transition
          bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700
          disabled:cursor-not-allowed text-white shadow-lg"
        >
          Merge PDFs
        </button>

        {/* Footer hint */}
        <p className="text-xs text-slate-500 mt-4 text-center">
          Tip: Select at least 2 PDFs to enable merging
        </p>
      </form>
    </div>
  );
};

export default Merge;
