import { useEffect, useState } from "react";

const recommendations = {
  Happy: [
    { type: "Movie", title: "Paddington 2" },
    { type: "Music", title: "Pharrell Williams – HAPPY" },
    { type: "Movie", title: "Yeh Jawaani Hai Deewani" }, 
    { type: "Album", title: "Dua Lipa – Future Nostalgia" },
    { type: "Movie", title: "Zindagi Na Milegi Dobara" }, 
    { type: "Album", title: "Shankar-Ehsaan-Loy – Dil Chahta Hai (Soundtrack)" }, 
    { type: "Album", title: "Arijit Singh – Best of Arijit Singh" }, 
    { type: "Movie", title: "Queen" }, 
  ],
  Okay: [
    { type: "Movie", title: "The Secret Life of Walter Mitty" },
    { type: "Music", title: "Vance Joy – Riptide" },
    { type: "Movie", title: "Wake Up Sid" }, 
    { type: "Album", title: "Ed Sheeran – ÷ (Divide)" },
    { type: "Movie", title: "Dear Zindagi" }, 
    { type: "Album", title: "Pritam – Yeh Jawaani Hai Deewani (Soundtrack)" }, 
    { type: "Album", title: "Ritviz – Ved" }, 
    { type: "Movie", title: "Barfi!" }, 
  ],
  Meh: [
    { type: "Movie", title: "Chef" },
    { type: "Music", title: "John Mayer – Gravity" },
    { type: "Movie", title: "Taare Zameen Par" }, 
    { type: "Album", title: "Taylor Swift – Folklore" },
    { type: "Movie", title: "Swades" }, 
    { type: "Album", title: "Anuv Jain – GUL" }, 
    { type: "Album", title: "A. R. Rahman – Rockstar (Soundtrack)" }, 
    { type: "Movie", title: "Chhichhore" }, 
  ],
  Sad: [
    { type: "Movie", title: "Amélie" },
    { type: "Music", title: "BTS – Magic Shop" },
    { type: "Movie", title: "Tamasha" }, 
    { type: "Album", title: "Adele – 25" },
    { type: "Movie", title: "Masaan" }, 
    { type: "Album", title: "Armaan Malik – Love Songs" }, 
    { type: "Album", title: "Prateek Kuhad – cold/mess" },  
    { type: "Movie", title: "October" }, 
  ],
  Stressed: [
    { type: "Movie", title: "My Neighbor Totoro" },
    { type: "Music", title: "Lo-fi Chill Playlist" },
    { type: "Movie", title: "Barfi!" }, 
    { type: "Album", title: "Ludovico Einaudi – Islands" },
    { type: "Album", title: "Anoushka Shankar – Traces of You" },  
    { type: "Album", title: "Rahul Sharma – Santoor Chill" },  
    { type: "Movie", title: "English Vinglish" }, 
    { type: "Album", title: "A. R. Rahman – Highway (Soundtrack)" }, 
  ],
};


const moodToEmoji = {
  Happy: "😄",
  Okay: "🙂",
  Meh: "😐",
  Sad: "😔",
  Stressed: "😤"
};

// FIXED typo in storage key!
function getLatestMood() {
  const moodLogRaw = localStorage.getItem("lifeDashboard_moods");
  const moodLog = moodLogRaw ? JSON.parse(moodLogRaw) : [];
  if (!moodLog.length) return null;
  const latest = [...moodLog].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
  return latest.label;
}

function getRandomSuggestion(mood) {
  if (!mood || !recommendations[mood]) return null;
  const moodRecs = recommendations[mood];
  return moodRecs[Math.floor(Math.random() * moodRecs.length)];
}

function EntertainmentPage() {
  const [latestMood, setLatestMood] = useState(null);
  const [suggestion, setSuggestion] = useState(null);

  //fetch latest mood
  const refresh = () => {
    const mood = getLatestMood();
    setLatestMood(mood);
    setSuggestion(getRandomSuggestion(mood));
  };

  useEffect(() => {
    refresh();
    
  }, []);

  
  const handleAnother = () => {
    if (!latestMood) return;
    const options = recommendations[latestMood];
    if (!options || options.length === 0) return;
    let newSuggestion;
    do {
      newSuggestion = options[Math.floor(Math.random() * options.length)];
    } while (options.length > 1 && suggestion && newSuggestion.title === suggestion.title);
    setSuggestion(newSuggestion);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#03070a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, Arial",
        padding: 0,
      }}
    >
      <div
        style={{
          background: "#590a7640",
          borderRadius: 30,
          boxShadow: "0 10px 36px #dbaeeb40",
          padding: "2.5rem 2.5rem 2rem",
          width: "100%",
          maxWidth: 430,
          textAlign: "center",
        }}
      >
        {latestMood ? (
          <>
            <h2 style={{ marginBottom: 10, color: "#4a3781", fontWeight: 700 }}>
              Based on your last mood log:
            </h2>
            <div style={{ fontSize: 30, marginBottom: 10 }}>
              <span>{moodToEmoji[latestMood]} {latestMood}</span>
            </div>
            {suggestion ? (
              <div style={{
                background: "#62458eff",
                borderRadius: 16,
                padding: "1.5rem 1rem 1.2rem",
                margin: "1.1rem auto 0.8rem",
                maxWidth: 330,
                boxShadow: "0 4px 18px #b39ddb55",
                textAlign: "center"
              }}>
                <div style={{ fontSize: "2.3rem", marginBottom: 10 }}>
                  {suggestion.type === "Movie" && "🎬"}
                  {suggestion.type === "Show" && "📺"}
                  {suggestion.type === "Music" && "🎵"}
                  {suggestion.type === "Album" && "💿"}
                </div>
                <span style={{
                  fontWeight: 700,
                  fontSize: "1.12rem",
                  lineHeight: "1.38"
                }}>
                  {suggestion.type}:<br />{suggestion.title}
                </span>
              </div>
            ) : (
              <div style={{ color: "#af2e5d", margin: "1.5rem 0" }}>
                Sorry, no recommendation for your mood yet!
              </div>
            )}
            <button
              style={{
                background: "#42a5f5",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                fontWeight: 600,
                padding: "10px 23px",
                marginTop: 12,
                fontSize: 15,
                cursor: "pointer",
                transition: "background 0.17s, transform .17s",
                boxShadow: "0 1px 8px #b3e5fc33"
              }}
              onClick={handleAnother}
            >
              Show Another
            </button>
            <br />
            <button
              style={{
                marginTop: 14,
                padding: "5px 12px",
                borderRadius: 7,
                border: "none",
                background: "#9fa8da",
                color: "#fff",
                fontSize: 13,
                cursor: "pointer",
                opacity: 0.85
              }}
              onClick={refresh}
              title="Reload recommendation (in case you log a new mood!)"
            >
              Refresh if you just logged a new mood
            </button>
          </>
        ) : (
          <div>
            <h2 style={{ color: "#4a3781", marginBottom: 12 }}>
              Log your mood first!
            </h2>
            <div style={{ fontSize: 40, margin: "24px 0" }}>😎</div>
            <div style={{ color: "#875899" }}>Go track a mood to get pro recommendations.</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EntertainmentPage;
