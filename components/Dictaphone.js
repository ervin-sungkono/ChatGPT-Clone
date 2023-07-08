"use client"
import { useEffect } from 'react'
import 'regenerator-runtime/runtime'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill'

import { BsFillMicFill } from "react-icons/bs"

const speechlyAppId = process.env.NEXT_PUBLIC_SPEECHLY_APP_ID
if(speechlyAppId){
  const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(speechlyAppId)
  SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition)
}

export default function Dictaphone({ setPreviewSpeech, handleSpeechEnd }){
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable
  } = useSpeechRecognition()

  useEffect(() => {
    if(transcript.length > 0){
      setPreviewSpeech(transcript)
    }
    if(!listening) {
      handleSpeechEnd()
      resetTranscript()
    }
  }, [listening, transcript]);

  const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'en-US' });

  if (!browserSupportsSpeechRecognition) return null

  return (
    <button 
        type='button' 
        disabled={!isMicrophoneAvailable} id='mic-btn'
        className={`${listening ? "bg-green text-white" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-900 border-black/10 dark:border-white/10"} disabled:text-gray-600/40 dark:disabled:text-gray-400/40 border p-3 shadow-md rounded-full transition-colors duration-200`}
        onTouchStart={startListening}
        onMouseDown={startListening}
        onTouchEnd={SpeechRecognition.stopListening}
        onMouseUp={SpeechRecognition.stopListening}
    >
        <BsFillMicFill/>
    </button>
  )
}