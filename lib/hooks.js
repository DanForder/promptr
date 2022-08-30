import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const docRef = doc(firestore, "users", user.uid);
      unsubscribe = onSnapshot(docRef, (doc) => {
        setDisplayName(doc.data()?.displayName);
      });
    } else {
      setDisplayName(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, displayName };
};

export const useSpeechInput = (language = "en") => {
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [finalTranscript, setFinalTranscript] = useState("");
  const [interimTranscript, setInterimTranscript] = useState("");

  useEffect(() => {
    setSpeechRecognition(new webkitSpeechRecognition());
  }, []);

  const onResult = (event) => {
    let inProgressTranscript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        setFinalTranscript((prev) => prev + event.results[i][0].transcript);
      } else {
        inProgressTranscript += event.results[i][0].transcript;
        setInterimTranscript(inProgressTranscript);
      }
    }
  };

  const startSpeech = () => {
    try {
      speechRecognition?.start();
    } catch {
      console.log("speech already started");
    }
  };

  const stopSpeech = () => {
    try {
      speechRecognition?.stop();
    } catch {
      console.log("speech already stopped");
    }
  };

  if (speechRecognition) {
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = language;
    speechRecognition.onresult = onResult;
  }

  return { startSpeech, stopSpeech, interimTranscript, finalTranscript };
};
