import { createBrowserRouter } from "react-router";
import { LandingPage } from "./pages/LandingPage";
import { UploadPage } from "./pages/UploadPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SummaryPage } from "./pages/SummaryPage";
import { QuizPage } from "./pages/QuizPage";
import { ResultsPage } from "./pages/ResultsPage";
import { ChatPage } from "./pages/ChatPage";
import { ProfilePage } from "./pages/ProfilePage";
import { Layout } from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: "upload", Component: UploadPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "summary/:id", Component: SummaryPage },
      { path: "quiz/:id", Component: QuizPage },
      { path: "results/:id", Component: ResultsPage },
      { path: "chat/:id", Component: ChatPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
