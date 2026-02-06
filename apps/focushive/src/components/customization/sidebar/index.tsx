import { useState } from "react";

const CustomizationSidebar = () => {
  const [selectedPreset, setSelectedPreset] = useState("deep-focus");
  const [opacity, setOpacity] = useState(85);

  const presets = [
    { id: "deep-focus", name: "Deep Focus", active: true },
    { id: "gamers-grind", name: "Gamer's Grind", active: false },
    { id: "wellness-warrior", name: "Wellness Warrior", active: false },
  ];

  const themes = [
    { id: "sunrise", name: "Sunrise" },
    { id: "morning", name: "Morning" },
    { id: "starry-night", name: "Starry Night" },
  ];

  return (
    <aside className="w-80 glass-panel border-l border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h2 className="text-lg font-semibold text-white mb-1">
              Customize Space
            </h2>
            <p className="text-xs text-white/60">
              Personalize your layout & themes.
            </p>
          </div>
          <button className="w-8 h-8 rounded-full hover:bg-white/10 transition-colors flex items-center justify-center text-white/70 hover:text-white">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* Layout Presets */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-medium text-white/90">
              Layout Presets
            </h3>
            <button className="text-xs text-blue-400 hover:text-blue-300">
              View all
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => setSelectedPreset(preset.id)}
                className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                  selectedPreset === preset.id
                    ? "border-blue-500 shadow-lg shadow-blue-500/20"
                    : "border-white/20 hover:border-white/40"
                }`}
              >
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20"></div>
                {selectedPreset === preset.id && (
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-blue-500 text-white text-xs font-medium">
                    ACTIVE
                  </div>
                )}
                <p className="py-2 text-xs text-white/80 font-medium">
                  {preset.name}
                </p>
              </button>
            ))}

            <button className="aspect-square rounded-lg border-2 border-dashed border-white/20 hover:border-white/40 transition-colors flex flex-col items-center justify-center gap-2">
              <svg
                className="w-6 h-6 text-white/40"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="text-xs text-white/60 font-medium">Create New</p>
            </button>
          </div>
        </section>

        {/* Background Themes */}
        <section className="border-t border-white/10 pt-8">
          <h3 className="text-sm font-medium text-white/90 mb-4">
            Background Themes
          </h3>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {themes.map((theme) => (
              <div key={theme.id} className="flex-shrink-0">
                <button className="w-24 h-16 rounded-lg bg-gradient-to-br from-orange-500/40 to-pink-500/40 border border-white/20 hover:border-blue-500 transition-colors"></button>
                <p className="mt-2 text-xs text-white/70 text-center">
                  {theme.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Appearance Controls */}
        <section className="border-t border-white/10 pt-8">
          <h3 className="text-sm font-medium text-white/90 mb-6">Appearance</h3>

          {/* Widget Opacity */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <label className="text-xs text-white/70">Widget Opacity</label>
              <span className="px-2 py-0.5 rounded bg-white/10 text-xs text-blue-400 font-medium">
                {opacity}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={opacity}
              onChange={(e) => setOpacity(Number(e.target.value))}
              className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>

          {/* Accent Color */}
          <div className="space-y-3">
            <label className="text-xs text-white/70 block">Accent Color</label>
            <div className="flex gap-2">
              {["blue", "purple", "green", "pink", "orange"].map((color) => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full bg-${color}-500 border-2 border-white/20 hover:border-white/60 transition-colors`}
                  style={{ backgroundColor: `var(--focushive-accent)` }}
                ></button>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Footer Actions */}
      <div className="p-6 border-t border-white/10 bg-black/20">
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors text-white text-sm font-medium shadow-lg">
            Apply Changes
          </button>
          <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white text-sm font-medium">
            Reset
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CustomizationSidebar;
