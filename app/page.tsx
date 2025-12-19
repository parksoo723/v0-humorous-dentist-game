"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

const TOOTH_PROBLEMS = [
  { id: 1, name: "메가 충치", icon: "🦷", severity: "critical", description: "분화구만해요!" },
  { id: 2, name: "설탕 괴물", icon: "🍭", severity: "high", description: "사탕 너무 많이!" },
  { id: 3, name: "플라그 도시", icon: "🏙️", severity: "medium", description: "깊은 세척 필요!" },
  { id: 4, name: "흔들이 치아", icon: "🎢", severity: "low", description: "엄청 흔들려요!" },
]

const PATIENT_EXPRESSIONS = [
  { id: "scared", emoji: "😱", text: "안돼요 드릴은 싫어요!", sound: "*헉!*" },
  { id: "crying", emoji: "😭", text: "치실 열심히 할게요!", sound: "*흑흑!*" },
  { id: "shocked", emoji: "😵", text: "그게 착암기에요?!", sound: "*꿀꺽!*" },
  { id: "nervous", emoji: "😰", text: "이가 얼얼해요!", sound: "*떨림*" },
  { id: "relief", emoji: "😌", text: "생각보다 괜찮네요!", sound: "*휴~*" },
]

const DENTAL_TOOLS = [
  { id: "drill", name: "드릴 머신", icon: "🔧", sound: "위이이잉!", power: 30 },
  { id: "water", name: "워터 캐논", icon: "💦", sound: "슈우우욱!", power: 20 },
  { id: "mirror", name: "마법 거울", icon: "🪞", sound: "빙!", power: 10 },
  { id: "floss", name: "메가 치실", icon: "🧵", sound: "슉슉!", power: 25 },
]

export default function DentistGame() {
  const [selectedTooth, setSelectedTooth] = useState<number | null>(null)
  const [currentExpression, setCurrentExpression] = useState(0)
  const [toothHealth, setToothHealth] = useState(0)
  const [selectedTool, setSelectedTool] = useState<string | null>(null)
  const [isFixing, setIsFixing] = useState(false)
  const [score, setScore] = useState(0)

  const handleToolUse = () => {
    if (!selectedTool || !selectedTooth) return

    setIsFixing(true)
    const tool = DENTAL_TOOLS.find((t) => t.id === selectedTool)

    // Cycle through expressions during treatment
    const expressionInterval = setInterval(() => {
      setCurrentExpression((prev) => (prev + 1) % (PATIENT_EXPRESSIONS.length - 1))
    }, 300)

    setTimeout(() => {
      clearInterval(expressionInterval)
      setCurrentExpression(PATIENT_EXPRESSIONS.length - 1) // Relief face
      setToothHealth((prev) => Math.min(100, prev + (tool?.power || 0)))
      setScore((prev) => prev + (tool?.power || 0))
      setIsFixing(false)

      if (toothHealth + (tool?.power || 0) >= 100) {
        setTimeout(() => {
          alert("🎉 치아 구출 성공! 당신은 치과 영웅이에요!")
          resetGame()
        }, 500)
      }
    }, 1500)
  }

  const resetGame = () => {
    setSelectedTooth(null)
    setToothHealth(0)
    setCurrentExpression(0)
    setSelectedTool(null)
  }

  const currentPatient = PATIENT_EXPRESSIONS[currentExpression]

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-200 via-blue-200 to-purple-200 p-4">
      {/* Header */}
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 text-center">
          <h1 className="font-black text-6xl text-purple-600 tracking-tight drop-shadow-lg [text-shadow:3px_3px_0_#fff,6px_6px_0_#a855f7]">
            깔깔 치과
          </h1>
          <p className="text-2xl font-bold text-pink-600 mt-2">치아 대소동!</p>
          <div className="mt-4 inline-block bg-yellow-400 px-6 py-2 rounded-full border-4 border-black shadow-lg">
            <span className="text-2xl font-black">점수: {score} ⭐</span>
          </div>
        </div>

        {/* Main Game Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Patient Card */}
          <Card className="p-8 bg-white border-4 border-black shadow-[8px_8px_0_0_#000]">
            <div className="text-center">
              <h2 className="text-3xl font-black text-purple-600 mb-4">진료 의자 🦷</h2>

              {/* Patient Face */}
              <div
                className={`relative bg-gradient-to-br from-pink-200 to-pink-300 rounded-full w-64 h-64 mx-auto border-8 border-black shadow-lg transition-all duration-300 ${isFixing ? "animate-bounce" : ""}`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-9xl animate-pulse">{currentPatient.emoji}</span>
                </div>
              </div>

              {/* Speech Bubble */}
              <div className="mt-6 relative">
                <div className="bg-white border-4 border-black rounded-3xl px-6 py-4 shadow-lg inline-block">
                  <p className="text-2xl font-black text-purple-600">{currentPatient.text}</p>
                  <p className="text-lg font-bold text-pink-500 mt-1">{currentPatient.sound}</p>
                </div>
              </div>

              {/* Tooth Health Bar */}
              {selectedTooth && (
                <div className="mt-6 bg-gradient-to-r from-red-400 to-green-400 p-4 rounded-xl border-4 border-black">
                  <p className="text-xl font-black mb-2">치아 건강도</p>
                  <Progress value={toothHealth} className="h-8 border-4 border-black" />
                  <p className="text-2xl font-black mt-2">{toothHealth}%</p>
                </div>
              )}
            </div>
          </Card>

          {/* Tools & Problems */}
          <div className="space-y-6">
            {/* Tooth Problems */}
            <Card className="p-6 bg-yellow-300 border-4 border-black shadow-[8px_8px_0_0_#000]">
              <h2 className="text-3xl font-black text-purple-600 mb-4 text-center">문제를 골라요! 🚨</h2>
              <div className="grid grid-cols-2 gap-4">
                {TOOTH_PROBLEMS.map((tooth) => (
                  <button
                    key={tooth.id}
                    onClick={() => {
                      setSelectedTooth(tooth.id)
                      setToothHealth(0)
                      setCurrentExpression(Math.floor(Math.random() * (PATIENT_EXPRESSIONS.length - 1)))
                    }}
                    className={`p-4 rounded-xl border-4 border-black font-black text-center transition-all hover:scale-105 active:scale-95 ${
                      selectedTooth === tooth.id ? "bg-pink-500 text-white shadow-lg" : "bg-white hover:bg-pink-200"
                    }`}
                  >
                    <div className="text-5xl mb-2">{tooth.icon}</div>
                    <div className="text-lg">{tooth.name}</div>
                    <div className="text-sm mt-1 text-red-600">{tooth.description}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Dental Tools */}
            <Card className="p-6 bg-cyan-300 border-4 border-black shadow-[8px_8px_0_0_#000]">
              <h2 className="text-3xl font-black text-purple-600 mb-4 text-center">도구를 선택하세요! ⚡</h2>
              <div className="grid grid-cols-2 gap-4">
                {DENTAL_TOOLS.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool.id)}
                    disabled={!selectedTooth}
                    className={`p-4 rounded-xl border-4 border-black font-black text-center transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedTool === tool.id ? "bg-green-500 text-white shadow-lg" : "bg-white hover:bg-green-200"
                    }`}
                  >
                    <div className="text-5xl mb-2">{tool.icon}</div>
                    <div className="text-lg">{tool.name}</div>
                    <div className="text-sm mt-1 text-orange-600">{tool.sound}</div>
                    <div className="text-xs mt-1 font-bold">+{tool.power} HP</div>
                  </button>
                ))}
              </div>

              {/* Action Button */}
              <Button
                onClick={handleToolUse}
                disabled={!selectedTool || !selectedTooth || isFixing}
                className="w-full mt-6 h-16 text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 border-4 border-black shadow-[4px_4px_0_0_#000] rounded-xl disabled:opacity-50"
              >
                {isFixing ? "⚡ 치료 중... ⚡" : "🦷 치아를 고쳐요! 🦷"}
              </Button>
            </Card>
          </div>
        </div>

        {/* Instructions */}
        <Card className="mt-6 p-6 bg-gradient-to-r from-orange-300 to-yellow-300 border-4 border-black shadow-[8px_8px_0_0_#000]">
          <h3 className="text-2xl font-black text-center mb-4 text-purple-600">게임 방법! 🎮</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-xl p-4 border-4 border-black">
              <p className="text-6xl mb-2">1️⃣</p>
              <p className="font-bold text-lg">치아 문제를 고르세요!</p>
            </div>
            <div className="bg-white rounded-xl p-4 border-4 border-black">
              <p className="text-6xl mb-2">2️⃣</p>
              <p className="font-bold text-lg">도구를 선택하세요!</p>
            </div>
            <div className="bg-white rounded-xl p-4 border-4 border-black">
              <p className="text-6xl mb-2">3️⃣</p>
              <p className="font-bold text-lg">100%까지 치료하세요!</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
