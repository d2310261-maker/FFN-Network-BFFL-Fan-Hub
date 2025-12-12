export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-24 flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-8">BFFL - Archived</h1>
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg p-8 mb-8">
            <p className="text-lg md:text-xl text-foreground mb-4">
              The Discord community that powered BFFL has unfortunately been shut down.
            </p>
            <p className="text-muted-foreground mb-4">
              Thank you for being part of the BFFL journey. While this chapter has closed, we appreciate the memories and good times we shared together.
            </p>
            <p className="text-sm text-muted-foreground">
              This site is no longer actively maintained.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
