import { EDUCATION } from '../constants/profile';

export const Experience = () => (
  <section className="max-w-4xl mx-auto py-12 px-6">
    <h2 className="text-xs uppercase tracking-[0.3em] text-blue-600 font-bold mb-12 flex items-center gap-4">
      Education <span className="h-[1px] flex-1 bg-slate-100"></span>
    </h2>
    <div className="space-y-16">
      {EDUCATION.map((edu, index) => (
        <div key={index} className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-4 md:gap-12 group">
          <div className="text-sm font-semibold text-slate-300 tabular-nums pt-1 transition-colors group-hover:text-blue-400">
            {edu.period}
          </div>
          <div className="relative">
            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
              {edu.school}
            </h3>
            <p className="text-slate-500 font-semibold mb-3">{edu.degree}</p>
            <div className="p-4 bg-slate-50/50 border-l-2 border-slate-200 rounded-r-lg group-hover:bg-blue-50/30 group-hover:border-blue-400 transition-all">
              <p className="text-sm text-slate-500 leading-relaxed italic">
                {edu.highlights}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);