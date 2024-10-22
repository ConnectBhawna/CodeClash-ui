"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/navbar";
import { LandingPage } from "@/components/landing-page";
import { signIn, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { GameInfoComponent } from "@/components/game-info";
import { GamePage } from "@/components/avatar-selection-tech-logos";
import { GameDashboardComponent } from "@/components/game-dashboard";

const ClientComponent = dynamic(() => import("./ClientComponent"), {
  ssr: false,
});

export default function Home() {
  const { data: session } = useSession();
  const [gameState, setGameState] = useState("Login");

  console.log(gameState);

  const renderGameContent = () => {
    switch (gameState) {
      case "Login":
        return renderLoginPage();
      case "game_info":
        return renderGameInfoPage();
      case "select":
        return renderSelectPage();
      case "waiting":
        return renderSelectPage();
      // case "InProgress":
      //   return (
      //     <>
      //       {renderQuestion()}
      //       <button onClick={nextQuestion}>Next Question</button>
      //       {renderLeaderboard()}
      //     </>
      //   );
      // case "Finished":
      //   return (
      //     <>
      //       <h2>Game Over!</h2>
      //       {renderLeaderboard()}
      //     </>
      //   );
      default:
        return renderLoginPage();
    }
  };

  const renderLoginPage = () => {
    return <LandingPage session={session} setGameState={setGameState} />;
  };

  const renderGameInfoPage = () => {
    return <GameInfoComponent setGameState={setGameState} />;
  };

  const renderSelectPage = () => {
    return <GamePage session={session} setGameState={setGameState} />;
  };

  const renderWaitingPage = () => {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          Waiting ...
          <Button
            className="w-full"
            variant="outline"
            onClick={() => signIn("google")}
          >
            Start Game
          </Button>
        </div>
      </div>
    );
  };

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>
          Please Login{" "}
          <Button
            className="w-full"
            variant="outline"
            onClick={() => signIn("google")}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Sign in with Google
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      {renderGameContent()}
    </>
  );
}
