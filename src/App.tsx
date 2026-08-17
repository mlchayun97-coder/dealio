import { useState } from "react";
import { OnboardingScreen } from "./screens/Onboarding/OnboardingScreen";
import { HomeScreen } from "./screens/Home/HomeScreen";
import { SearchScreen } from "./screens/Search/SearchScreen";
import { MatchesScreen } from "./screens/Matches/MatchesScreen";
import { ProfileScreen } from "./screens/Profile/ProfileScreen";
import { DealRoom } from "./screens/DealRoom/DealRoom";
import { GoalEngine } from "./screens/GoalEngine/GoalEngine";
import { SuccessFeed } from "./screens/SuccessFeed/SuccessFeed";
import { AddModal } from "./modals/AddModal";
import { DetailModal } from "./modals/DetailModal";
import { BottomNav } from "./components/BottomNav";
import { FEED_DATA } from "./data/mock";
import type { OnboardingData, Opportunity, Profile } from "./types";

export default function App() {
  const [onboarded, setOnboarded] = useState(false);
  const [tab, setTab] = useState("home");
  const [feed, setFeed] = useState<Opportunity[]>(FEED_DATA);
  const [detail, setDetail] = useState<Opportunity | null>(null);
  const [chat, setChat] = useState<Opportunity | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showGoal, setShowGoal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const handleOnboard = (data: OnboardingData) => {
    setProfile({
      name: data.name || "משתמש",
      userType: data.userType || "entrepreneur",
      city: "תל אביב",
      bio: "",
      verified: false,
      verifiedMethod: "",
      hasAssets: data.hasAssets || [],
      seekingTypes: data.seekingTypes || [],
      domains: [],
      goalTitle: "",
      journeyPct: 0,
      journeyDone: [],
      journeyLeft: [],
    });
    setOnboarded(true);
  };
  const openChat = (o: Opportunity) => {
    setDetail(null);
    setChat(o);
  };

  if (!onboarded)
    return (
      <div style={{ maxWidth: 540, margin: "0 auto" }}>
        <OnboardingScreen onDone={handleOnboard} />
      </div>
    );
  if (chat)
    return (
      <div style={{ maxWidth: 540, margin: "0 auto" }}>
        <DealRoom opp={chat} onBack={() => setChat(null)} />
      </div>
    );

  return (
    <div style={{ maxWidth: 540, margin: "0 auto", minHeight: "100vh", position: "relative" }}>
      {tab === "home" && <HomeScreen feed={feed} setFeed={setFeed} onView={setDetail} onAdd={() => setShowAdd(true)} userName={profile?.name} onShowSuccess={() => setShowSuccess(true)} />}
      {tab === "search" && <SearchScreen feed={feed} onView={setDetail} />}
      {tab === "matches" && <MatchesScreen feed={feed} onView={setDetail} onChat={openChat} />}
      {tab === "goal" && <GoalEngine onClose={() => setTab("home")} />}
      {tab === "profile" && <ProfileScreen profile={profile} setProfile={setProfile} onGoal={() => setShowGoal(true)} />}

      <BottomNav tab={tab} setTab={setTab} />

      {detail && <DetailModal o={detail} onClose={() => setDetail(null)} onChat={openChat} />}
      {showAdd && (
        <AddModal
          onClose={() => setShowAdd(false)}
          onAdd={(o) => {
            setFeed((p) => [o, ...p]);
            setShowAdd(false);
          }}
        />
      )}
      {showGoal && <GoalEngine onClose={() => setShowGoal(false)} />}
      {showSuccess && <SuccessFeed onClose={() => setShowSuccess(false)} />}
    </div>
  );
}
