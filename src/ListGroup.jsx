import React, { useState } from "react";

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div>
      <div className="flex border-b border-gray-700">
        {React.Children.map(children, (child, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium focus:outline-none ${
              activeTab === index
                ? "border-b-2 border-green-500 text-green-500"
                : "text-gray-400 hover:text-white"
            }`}
            onClick={() => handleTabClick(index)}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className="p-4">{children[activeTab]}</div>
    </div>
  );
};

const MoodList = ({ moodEntries, deleteMoodEntry, undoDelete }) => {
  const [undoItem, setUndoItem] = useState(null);

  const handleDelete = (index) => {
    const deletedEntry = moodEntries[index];
    setUndoItem(deletedEntry);
    deleteMoodEntry(index);
  };

  const handleUndo = () => {
    if (undoItem) {
      undoDelete(undoItem);
      setUndoItem(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mood Entries</h2>
      <ul className="space-y-4">
        {moodEntries.map((entry, index) => (
          <li
            key={index}
            className="bg-gray-800 p-4 rounded-md flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <p className="text-1xl">{entry.date}</p>
              <p className="text-1xl">{entry.mood}</p>
            </div>
            <div className="bg-gray-700 px-4 py-2 rounded-md">
              <p className="text-gray-400">Mood</p>
            </div>
            <button
              onClick={() => handleDelete(index)}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md focus:outline-none cursor-pointer"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {undoItem && (
        <div className="mt-4">
          <button
            onClick={handleUndo}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md focus:outline-none cursor-pointer"
          >
            Undo ({undoItem.mood})
          </button>
        </div>
      )}
    </div>
  );
};

const MoodAnalytics = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mood Analytics</h2>
      <p>Coming Soon....................</p>
    </div>
  );
};

const MoodTracker = () => {
  const [mood, setMood] = useState("");
  const [moodEntries, setMoodEntries] = useState([]);
  const [deletedEntries, setDeletedEntries] = useState([]);

  const handleMoodChange = (event) => {
    setMood(event.target.value);
  };

  const addMoodEntry = () => {
    if (mood) {
      const currentDate = new Date().toLocaleString();
      setMoodEntries([...moodEntries, { date: currentDate, mood }]);
      setMood("");
    }
  };

  const deleteMoodEntry = (index) => {
    const deletedEntry = moodEntries[index];
    const updatedEntries = [...moodEntries];
    updatedEntries.splice(index, 1);
    setMoodEntries(updatedEntries);
    setDeletedEntries([deletedEntry, ...deletedEntries]);
  };

  const undoDelete = (entry) => {
    setMoodEntries([...moodEntries, entry]);
    setDeletedEntries(deletedEntries.filter((e) => e !== entry));
  };

  const clearAllEntries = () => {
    setMoodEntries([]);
    setDeletedEntries([]);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-8">How are you feeling now...</h1>

      <div className="flex items-center mb-8">
        <select
          value={mood}
          onChange={handleMoodChange}
          className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none w-70 cursor-pointer"
        >
          <option value="">Select a mood</option>
          <option value="😊 Happy">😊</option>
          <option value="😔 Sad">😔</option>
          <option value="😢 Angry">😢</option>
        </select>
        <button
          onClick={addMoodEntry}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-r-md focus:outline-none cursor-pointer"
        >
          Enter
        </button>
      </div>

      <Tabs>
        <div title="Mood List">
          <MoodList
            moodEntries={moodEntries}
            deleteMoodEntry={deleteMoodEntry}
            undoDelete={undoDelete}
          />
        </div>
        <div title="Mood Analytics">
          <MoodAnalytics />
        </div>
      </Tabs>

      {moodEntries.length > 0 && (
        <button
          onClick={clearAllEntries}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md mt-4 focus:outline-none cursor-pointer"
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default MoodTracker;
