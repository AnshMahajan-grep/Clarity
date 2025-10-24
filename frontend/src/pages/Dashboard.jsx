import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import AnnouncementsList from "../components/AnnouncementsList";
import TasksList from "../components/TasksList";
import AddAnnouncementForm from "../components/AddAnnouncementForm";
import AddTaskForm from "../components/AddTaskForm";

const batches = ["All", 2027, 2028, 2029];

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(user ? getUserBatch(user.email) : "All");
  const [announcements, setAnnouncements] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showAnnForm, setShowAnnForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // Helper: extract batch from email (safe fallback)
  function getUserBatch(email) {
    try {
      const parts = email.split(".");
      if (parts.length < 2) return "All";
      const year = parts[1].slice(0, 2); // "24" from "ansh.24bcs10345"
      return 2000 + parseInt(year, 10);
    } catch (e) {
      return "All";
    }
  }

  // Fetch announcements
  const fetchAnnouncements = async (batch) => {
    setLoadingAnnouncements(true);
    try {
      let url = "/announcements";
      if (batch !== "All") url += `?batch=${batch}`;
      const res = await API.get(url);
      setAnnouncements(res.data || []);
    } catch (err) {
      console.error("Failed to load announcements", err);
      setAnnouncements([]);
    }
    setLoadingAnnouncements(false);
  };

  // Fetch personal tasks for the logged in user
  const fetchTasks = async () => {
    setLoadingTasks(true);
    try {
      const res = await API.get('/tasks');
      setTasks(res.data || []);
    } catch (err) {
      console.error('Failed to load tasks', err);
      setTasks([]);
    }
    setLoadingTasks(false);
  };

  useEffect(() => {
    fetchAnnouncements(activeTab);
  }, [activeTab]);

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <Header />
      <main className="container dashboard-grid">
        <section className="left-col">
          <div className="panel">
            <div className="panel-header">
              <h2>Announcements</h2>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Tabs batches={batches} active={activeTab} onChange={setActiveTab} />
                <button className="btn" onClick={() => setShowAnnForm((s) => !s)}>+ Add</button>
              </div>
            </div>

            <div className="panel-body">
              {showAnnForm && (
                <AddAnnouncementForm onCreated={(ann) => { setAnnouncements((p) => [ann, ...p]); setShowAnnForm(false); }} />
              )}

              {loadingAnnouncements ? (
                <div className="loading">Loading announcements...</div>
              ) : (
                <AnnouncementsList announcements={announcements} />
              )}
            </div>
          </div>
        </section>

        <aside className="right-col">
          <div className="panel">
            <div className="panel-header">
              <h2>My Tasks</h2>
              <button className="btn" onClick={() => setShowTaskForm((s) => !s)}>+ Add</button>
            </div>
            <div className="panel-body">
              {showTaskForm && (
                <AddTaskForm onCreated={(t) => { setTasks((p) => [t, ...p]); setShowTaskForm(false); }} />
              )}

              {loadingTasks ? (
                <div className="loading">Loading tasks...</div>
              ) : (
                <TasksList tasks={tasks} />
              )}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Dashboard;
