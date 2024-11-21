'use client'

import { useState } from 'react'
import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { chakra } from '@chakra-ui/react'
import { QuestionCard } from './components/QuestionCard'
import { ResultCard } from './components/ResultCard'
import { FloatingIcons } from './components/FloatingIcons'
import { questions } from './data/questions'
import { bundles } from './data/bundles'

const MotionBox = chakra(motion.div)

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({
    lowRisk: 0,
    balanced: 0,
    growth: 0,
    defi: 0
  })
  const [showResult, setShowResult] = useState(false)
  const [language, setLanguage] = useState<"en" | "gr">("gr")

  const handleAnswer = (score: any) => {
    const newScores = { ...scores }
    Object.entries(score).forEach(([key, value]) => {
      if (typeof value === 'number') {
        newScores[key as keyof typeof scores] = (newScores[key as keyof typeof scores] || 0) + value
      }
    })
    setScores(newScores)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const getRecommendedBundle = () => {
    const maxScore = Math.max(...Object.values(scores))
    const recommendation = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || 'balanced'
    return bundles[recommendation as keyof typeof bundles]
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScores({
      lowRisk: 0,
      balanced: 0,
      growth: 0,
      defi: 0
    })
    setShowResult(false)
  }

  return (
    <Box minH="100vh" bg="gray.900" position="relative" overflow="hidden">
      <FloatingIcons />
      
      <Button
        position="fixed"
        top={4}
        right={4}
        variant="ghost"
        size="lg"
        onClick={() => setLanguage(language === "gr" ? "en" : "gr")}
        zIndex={20}
        color="white"
        _hover={{ bg: 'whiteAlpha.200' }}
      >
        {language === "gr" ? "🇬🇧" : "🇬🇷"}
      </Button>

      <Container maxW="container.lg" py={{ base: 8, md: 16 }} px={4} position="relative" zIndex={10}>
        <VStack spacing={8} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            textAlign="center"
          >
            <Heading
              as="h1"
              size={{ base: "2xl", md: "3xl" }}
              mb={4}
              bgGradient="linear(to-r, blue.400, purple.400)"
              bgClip="text"
              fontWeight="bold"
            >
              {language === "gr" 
                ? "Ξεκινήστε το Ταξίδι σας στο Web3"
                : "Start Your Web3 Journey"}
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="whiteAlpha.900"
              maxW="2xl"
              mx="auto"
            >
              {language === "gr"
                ? "Ανακαλύψτε το ιδανικό επενδυτικό πακέτο για εσάς"
                : "Discover your ideal investment package"}
            </Text>
          </MotionBox>

          {!showResult ? (
            <QuestionCard
              question={questions[currentQuestion][language]}
              options={questions[currentQuestion].options}
              onAnswer={handleAnswer}
              progress={(currentQuestion / questions.length) * 100}
              language={language}
            />
          ) : (
            <ResultCard
              bundle={getRecommendedBundle()}
              onRestart={handleRestart}
              language={language}
            />
          )}
        </VStack>
      </Container>
    </Box>
  )
}