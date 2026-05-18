const steps = [
  {
    number: "01",
    title: "Share Your Idea",
    description:
      "Submit your startup idea with a title, description, category, and problem statement. Takes less than 2 minutes.",
  },
  {
    number: "02",
    title: "Get Community Feedback",
    description:
      "Innovators from around the world comment, discuss, and help refine your concept with real insights.",
  },
  {
    number: "03",
    title: "Validate & Build",
    description:
      "Use the feedback to validate your idea, find co-founders, and take the first step toward building.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10">

        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Simple Process
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-2">
            How It Works
          </h2>
          <p className="mt-3 text-sm md:text-base text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            From idea to validation in three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative">

          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-8 left-1/4 right-1/4 h-px bg-slate-200 dark:bg-slate-700 z-0" />

          {steps.map((step) => (
            <div key={step.number} className="relative z-10 flex flex-col items-center text-center">

              {/* Number */}
              <div className="w-14 h-14 rounded-full bg-white dark:bg-slate-800 border-2 border-violet-200 dark:border-violet-800 flex items-center justify-center mb-5 shadow-sm">
                <span className="text-lg font-bold text-violet-600 dark:text-violet-400">
                  {step.number}
                </span>
              </div>

              <h3 className="text-base md:text-lg font-semibold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;