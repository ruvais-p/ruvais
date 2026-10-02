const achievements = [
  {
    title: "Code reCET – Kerala Hackathon, Trivandrum",
    result: "🏆 WINNERS",
    desc: 'Built "ARGUS" — a mobile application using Flutter with integrated object detection model that alerts supervisors when workers lack safety gear. 36-hour hackathon at CET, Trivandrum.',
  },
  {
    title: "GistAthon – Kerala Hackathon, SNGIST",
    result: "🥈 RUNNERS UP",
    desc: 'Built "Data Bot" — uses Gemini API to query databases with natural language prompts without requiring technical database knowledge.',
  },
  {
    title: "Magnathon 2.0 – Kerala Hackathon, Calicut",
    result: "🥉 THIRD PRIZE",
    desc: "Built a platform for weather, climate, and disaster updates with offline/online alert features for rescue camp and facility locations.",
  },
];

export default function AchievementsWindow() {
  return (
    <div>
      <div className="section-title">🏆 Achievements</div>
      {achievements.map((achievement) => (
        <div className="achievement-card" key={achievement.title}>
          <div className="achievement-title">{achievement.title}</div>
          <div className="achievement-result">{achievement.result}</div>
          <div className="achievement-desc">{achievement.desc}</div>
        </div>
      ))}
    </div>
  );
}
