import { useState } from "react";
import { getAIRecommendations } from "../api/aiApii";

const AIRecommendation = () => {
  const [preference, setPreference] = useState("");
  const [recommendations, setRecommendations] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecommend = async () => {
    if (!preference.trim()) return;

    try {
      setLoading(true);

      const data = await getAIRecommendations(preference);

      setRecommendations(data.recommendations);

    } catch (error) {
      console.error(error);
      setRecommendations("Unable to generate recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen mx-auto p-6 bg-stone-100  ">

      <h2 className="text-3xl font-bold mb-3">
        🤖 Find Your Next Book
      </h2>

      <p className="text-gray-600 mb-4">
        Tell us what kind of book you're looking for.
      </p>

      <textarea
        value={preference}
        onChange={(e) => setPreference(e.target.value)}
        placeholder="Example: I want a romantic mystery with suspense..."
        className="w-full border rounded-lg p-4"
        rows="4"
      />

      <button
        onClick={handleRecommend}
        disabled={loading}
        className="mt-4 px-6 py-3 bg-black text-white rounded-lg"
      >
        {loading ? "Finding books..." : "Get Recommendations"}
      </button>

      {recommendations && (
        <div className="mt-6 p-5 border rounded-lg">
          <h3 className="text-xl font-semibold mb-3">
            Recommended For You
          </h3>

          <p className="whitespace-pre-line">
            {recommendations}
          </p>
        </div>
      )}

    </div>
  );
};

export default AIRecommendation;