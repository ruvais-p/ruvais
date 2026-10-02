const skills = {
  Languages: ["Python", "Dart", "C++", "Java", "C", "Kotlin", "SQL"],
  "Frameworks / Tools": [
    "Flutter",
    "Django",
    "Arduino IDE",
    "OpenCV",
    "LangChain",
    "Gemini API",
    "ROS",
  ],
  Technologies: [
    "IMU Navigation",
    "REST APIs",
    "SQLite",
    "Mapbox",
    "Notification Channels",
    "Supabase",
    "Clean Architecture",
  ],
};

export default function SkillsWindow() {
  return (
    <div>
      <div className="section-title">⚡ Technical Skills</div>
      {Object.entries(skills).map(([category, skillList]) => (
        <div className="skills-category" key={category}>
          <div className="skills-category-title">{category}</div>
          <div className="skills-grid">
            {skillList.map((skill) => (
              <span className="skill-chip" key={skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
